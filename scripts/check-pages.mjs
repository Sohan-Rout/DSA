import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "app");
const BASE_URL = process.env.CHECK_BASE_URL || "http://localhost:3000";
const CONCURRENCY = 6;

// Mirrors the route-discovery logic in next-sitemap.config.js so this list
// always matches what actually gets shipped, instead of a hand-kept list
// that silently drifts out of date.
function getAllRoutes(dir, segments = []) {
  const routes = [];
  const items = fs.readdirSync(dir);

  const hasPage = ["page.jsx", "page.tsx", "page.js"].some((f) => items.includes(f));
  if (hasPage) {
    routes.push("/" + segments.filter(Boolean).join("/"));
  }

  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (!fs.statSync(fullPath).isDirectory()) continue;
    if (item === "api" || item.startsWith("_")) continue;
    if (item.includes("[")) continue; // dynamic segment, no known param value to probe

    const isRouteGroup = item.startsWith("(") && item.endsWith(")");
    routes.push(...getAllRoutes(fullPath, [...segments, isRouteGroup ? "" : item]));
  }

  return routes;
}

async function checkRoute(route) {
  const url = BASE_URL + route;
  let result;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const body = res.status < 400 ? await res.text() : "";
    // A 200 that rendered an error boundary is still a broken page, so check
    // the body rather than trusting the status code alone.
    const rendered =
      !body.includes("Application error") &&
      !body.includes("This page could not be found");
    result = {
      route,
      status: res.status,
      ok: res.status < 400 && rendered,
      error: res.status < 400 && !rendered ? "rendered an error page" : undefined,
    };
  } catch (err) {
    result = { route, status: "ERROR", ok: false, error: err.message };
  }

  // Log as each finishes so long runs show progress instead of going silent.
  const mark = result.ok ? "OK  " : "FAIL";
  const detail = result.error ? ` (${result.error})` : "";
  console.log(`${mark} ${result.status}  ${result.route}${detail}`);

  return result;
}

async function runPool(items, worker, concurrency) {
  const results = [];
  let index = 0;

  async function next() {
    while (index < items.length) {
      const current = index++;
      results[current] = await worker(items[current]);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

const routes = [...new Set(getAllRoutes(APP_DIR))].sort();

console.log(`Checking ${routes.length} routes against ${BASE_URL}\n`);

const results = await runPool(routes, checkRoute, CONCURRENCY);

const failures = results.filter((r) => !r.ok);

if (failures.length > 0) {
  console.error(`\n${failures.length} of ${routes.length} route(s) failed:`);
  for (const f of failures) {
    console.error(`  ${f.route} -> ${f.status}${f.error ? ` (${f.error})` : ""}`);
  }
  process.exit(1);
}

console.log(`\nAll ${routes.length} routes returned OK.`);
