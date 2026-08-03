"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const vertices = [
    { id: "A", x: 110, y: 20, ring: 0 },
    { id: "B", x: 50, y: 70, ring: 1 },
    { id: "C", x: 170, y: 70, ring: 1 },
    { id: "D", x: 20, y: 125, ring: 2 },
    { id: "E", x: 90, y: 125, ring: 2 },
  ];
  const edges = [
    ["A", "B"],
    ["A", "C"],
    ["B", "D"],
    ["B", "E"],
  ];
  const byId = Object.fromEntries(vertices.map((v) => [v.id, v]));
  const ringColors = ["#f59e0b", "#3b82f6", "#10b981"];

  return (
    <svg viewBox="0 0 200 145" className="w-full max-w-md mx-auto">
      {edges.map(([from, to], i) => (
        <motion.line
          key={`${from}-${to}`}
          x1={byId[from].x}
          y1={byId[from].y}
          x2={byId[to].x}
          y2={byId[to].y}
          stroke="#818cf8"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
        />
      ))}
      {vertices.map((v, i) => (
        <motion.g
          key={v.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 + v.ring * 0.35, ease: "backOut" }}
          style={{ transformOrigin: `${v.x}px ${v.y}px` }}
        >
          <circle cx={v.x} cy={v.y} r="14" fill={ringColors[v.ring]} stroke="white" strokeWidth="2" />
          <text x={v.x} y={v.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {v.id}
          </text>
        </motion.g>
      ))}
      <text x="100" y="142" textAnchor="middle" fontSize="8" fontFamily="monospace" className="fill-gray-500 dark:fill-gray-400">
        visit order: A, B, C, D, E — by distance from A
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Breadth-First Search explores a graph outward from a starting vertex one "ring" of distance at a time: first the start vertex itself, then all of its direct neighbors, then all of their unvisited neighbors, and so on. The result is that every vertex gets visited in order of its distance (in number of edges) from the start — nothing two hops away is visited before everything one hop away.`,
    `That ordering comes entirely from using a queue (first-in, first-out) instead of a stack. The start vertex is enqueued first. Then, repeatedly: dequeue a vertex, mark it visited, and enqueue any of its neighbors that haven't been visited yet. Because a queue preserves arrival order, every vertex discovered while processing distance-d vertices gets enqueued *after* all the other distance-d vertices already in the queue — which guarantees they'll all be dequeued (and their own neighbors discovered) before any distance-(d+1) vertex is dequeued.`,
    `A visited set is essential alongside the queue: without one, a vertex reachable from multiple directions would be enqueued (and processed) more than once, and a graph with a cycle could loop forever. Marking a vertex visited *at the moment it's enqueued* — not when it's dequeued — is what prevents the same vertex from being added to the queue twice while it's still waiting its turn.`,
    `BFS is the standard choice whenever "shortest path in terms of number of edges" is what's needed — it's how the "N degrees of separation" between two people in a social graph is found, how the fewest moves to solve a sliding puzzle is computed, and how the shortest route in an unweighted road network is found. For weighted graphs where edges have different costs, Dijkstra's algorithm generalizes this same expanding-frontier idea.`,
  ];

  const algorithm = [
    { points: "Enqueue the start vertex and mark it visited" },
    {
      points: "While the queue isn't empty, repeat:",
      subpoints: [
        "Dequeue a vertex and process it (this is the visit order)",
        "For each of its neighbors, if not already visited: mark it visited and enqueue it",
      ],
    },
    { points: "Stop when the queue is empty — every vertex reachable from the start has been visited" },
  ];

  const complexity = [
    { points: "Time Complexity: O(V + E) — every vertex is dequeued once and every edge is examined once across the whole run." },
    { points: "Space Complexity: O(V) — for the queue and the visited set in the worst case." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is it */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Breadth-First Search?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h1>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[2]}
            </p>
          </div>

          <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
            BFS from A visits every vertex in order of distance — amber, then blue, then emerald
          </div>
          <WalkthroughDiagram />
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Algorithm Steps
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {algorithm.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                  {item.subpoints && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                      {item.subpoints.map((subitem, subindex) => (
                        <li key={subindex} className="text-gray-600 dark:text-gray-400">
                          {subitem}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Time Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time Complexity
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {complexity.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {item.points.split(":")[0]}:
                  </span>
                  <span className="ml-2">{item.points.split(":")[1]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <ComplexityGraph
              bestCase={(n) => n}
              averageCase={(n) => n + n}
              worstCase={(n) => n + n}
              maxN={25}
            />
          </div>

          <InContentAd />
        </section>

        {/* Additional Info */}
        <section className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <div className="px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraphs[3]}
              </p>
            </div>
          </div>
        </section>
      </article>
      <NewsletterEmbed mobile theme={theme} />
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;
