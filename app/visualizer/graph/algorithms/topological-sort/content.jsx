"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const vertices = [
    { id: "Shirt", x: 30, y: 30, order: 1 },
    { id: "Belt", x: 170, y: 30, order: 3 },
    { id: "Pants", x: 30, y: 90, order: 2 },
    { id: "Shoes", x: 170, y: 90, order: 4 },
  ];
  const edges = [
    ["Shirt", "Belt"],
    ["Pants", "Belt"],
    ["Pants", "Shoes"],
  ];
  const byId = Object.fromEntries(vertices.map((v) => [v.id, v]));

  return (
    <svg viewBox="0 0 200 115" className="w-full max-w-md mx-auto">
      <defs>
        <marker id="topo-diagram-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
        </marker>
      </defs>
      {edges.map(([from, to], i) => (
        <motion.line
          key={`${from}-${to}`}
          x1={byId[from].x}
          y1={byId[from].y}
          x2={byId[to].x}
          y2={byId[to].y}
          stroke="#818cf8"
          strokeWidth="2"
          markerEnd="url(#topo-diagram-arrow)"
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
          transition={{ duration: 0.4, delay: 0.2 + v.order * 0.25, ease: "backOut" }}
          style={{ transformOrigin: `${v.x}px ${v.y}px` }}
        >
          <rect x={v.x - 26} y={v.y - 12} width="52" height="24" rx="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <text x={v.x} y={v.y + 4} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">
            {v.id}
          </text>
          <text x={v.x} y={v.y - 18} textAnchor="middle" fontSize="8" fontWeight="700" className="fill-amber-500">
            {v.order}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `A topological sort takes a directed acyclic graph (a DAG, meaning directed edges and no cycles) and arranges every vertex into a linear order such that, for every edge u → v, u appears before v in that order. Think of each edge as a "must come before" constraint: topological sort finds an order that satisfies every constraint at once. Multiple valid orders can exist for the same graph, and the algorithm just needs to find one of them.`,
    `Kahn's algorithm builds the order using each vertex's in-degree, the number of edges pointing into it, which represents "how many prerequisites are left." Any vertex with in-degree 0 has no unmet prerequisites, so it's safe to place next in the order right away. Whenever a vertex is placed, its outgoing edges are "removed" by decrementing the in-degree of everything it points to, which may free up new vertices to become in-degree 0 and get queued themselves.`,
    `That queue-driven process is exactly why the algorithm doubles as a cycle detector: if the graph really is acyclic, every vertex eventually reaches in-degree 0 and gets processed. But if a cycle exists, every vertex in that cycle keeps at least one unmet prerequisite forever; none of them can ever reach in-degree 0, so they're never queued. If the final order doesn't include every vertex, the graph must contain a cycle, and no valid topological order exists at all.`,
    `Topological sort is the standard tool for scheduling problems with dependencies: build systems compiling files in the right order, package managers installing dependencies before the packages that need them, course prerequisite planning, and task schedulers in project management tools that need to respect "this must finish before that starts" constraints.`,
  ];

  const algorithm = [
    { points: "Compute the in-degree (number of incoming edges) for every vertex" },
    { points: "Initialize a queue with every vertex that already has in-degree 0" },
    {
      points: "While the queue isn't empty, repeat:",
      subpoints: [
        "Dequeue a vertex and place it next in the output order",
        "For each of its outgoing edges, decrement the target vertex's in-degree",
        "If a target vertex's in-degree just reached 0, enqueue it",
      ],
    },
    { points: "If the final order includes every vertex, it's a valid topological order; if not, the graph contains a cycle" },
  ];

  const complexity = [
    { points: "Time Complexity: O(V + E), since every vertex is enqueued once and every edge is examined once during in-degree updates." },
    { points: "Space Complexity: O(V), for the in-degree array and the queue." },
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
            What is Topological Sort?
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
            How Does Kahn's Algorithm Work?
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
            Getting dressed: Shirt and Pants have no prerequisites, so either can go first
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
