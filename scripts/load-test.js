import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Rate } from "k6/metrics";

// Run with:
//   k6 run scripts/load-test.js                          # default: load profile
//   k6 run -e PROFILE=smoke scripts/load-test.js
//   k6 run -e PROFILE=stress -e BASE_URL=https://... scripts/load-test.js

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
const PROFILE = __ENV.PROFILE || "load";

// A realistic visitor mix rather than uniform coverage of all 79 routes.
// Weights approximate how traffic actually distributes: landing pages get hit
// far more than any individual algorithm page.
const ROUTES = [
  { path: "/", weight: 20 },
  { path: "/visualizer", weight: 15 },
  { path: "/visualizer/sorting/bubblesort", weight: 8 },
  { path: "/visualizer/sorting/quicksort", weight: 6 },
  { path: "/visualizer/searching/linearsearch", weight: 6 },
  { path: "/visualizer/searching/binarysearch", weight: 6 },
  { path: "/visualizer/stack/push-pop", weight: 5 },
  { path: "/visualizer/queue/operations/enqueue-dequeue", weight: 5 },
  { path: "/visualizer/linkedList/types/singly", weight: 5 },
  { path: "/visualizer/linkedList/operations/search", weight: 4 },
  { path: "/visualizer/trees/bst/insertion", weight: 4 },
  { path: "/visualizer/trees/advanced/red-black", weight: 4 },
  { path: "/visualizer/graph/traversal/bfs", weight: 4 },
  { path: "/blogs", weight: 4 },
  { path: "/login", weight: 4 },
];

// Expand weights into a flat pick-list once, at init time.
const WEIGHTED = [];
for (const route of ROUTES) {
  for (let i = 0; i < route.weight; i++) WEIGHTED.push(route.path);
}

const PROFILES = {
  // Does it work at all? Use as a gate before spending time on real load.
  smoke: {
    stages: [{ duration: "30s", target: 1 }],
  },
  // Expected steady-state traffic. This is the regression-detection profile.
  load: {
    stages: [
      { duration: "30s", target: 20 },
      { duration: "2m", target: 20 },
      { duration: "30s", target: 0 },
    ],
  },
  // Push past expected traffic to find where latency degrades.
  stress: {
    stages: [
      { duration: "1m", target: 50 },
      { duration: "2m", target: 100 },
      { duration: "2m", target: 200 },
      { duration: "1m", target: 0 },
    ],
  },
  // Sudden burst, e.g. the site getting shared somewhere popular.
  spike: {
    stages: [
      { duration: "10s", target: 5 },
      { duration: "20s", target: 200 },
      { duration: "1m", target: 5 },
      { duration: "10s", target: 0 },
    ],
  },
};

const ttfb = new Trend("ttfb", true);
const errorRate = new Rate("page_errors");

export const options = {
  stages: PROFILES[PROFILE].stages,
  thresholds: {
    // Fail the run if the site degrades past these. Tune to your real baseline
    // once you have one; these are starting points, not measured targets.
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1500", "p(99)<3000"],
    ttfb: ["p(95)<1000"],
    page_errors: ["rate<0.01"],
  },
  summaryTrendStats: ["avg", "min", "med", "p(90)", "p(95)", "p(99)", "max"],
};

export default function () {
  const path = WEIGHTED[Math.floor(Math.random() * WEIGHTED.length)];
  const res = http.get(`${BASE_URL}${path}`, {
    tags: { path },
    headers: { "Accept-Encoding": "gzip" },
  });

  ttfb.add(res.timings.waiting);

  // A 200 that rendered Next.js's error boundary is still a broken page,
  // so assert on the body too rather than trusting the status code alone.
  const ok = check(res, {
    "status is 200": (r) => r.status === 200,
    "body is not an error page": (r) =>
      typeof r.body === "string" &&
      !r.body.includes("Application error") &&
      !r.body.includes("This page could not be found"),
  });

  errorRate.add(!ok);

  // Model a reader pausing on the page rather than hammering in a tight loop.
  sleep(Math.random() * 3 + 1);
}
