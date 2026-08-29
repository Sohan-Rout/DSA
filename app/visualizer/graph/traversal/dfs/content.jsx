"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const vertices = [
    { id: "A", x: 100, y: 20, order: 1 },
    { id: "B", x: 40, y: 70, order: 2 },
    { id: "D", x: 20, y: 125, order: 3 },
    { id: "E", x: 90, y: 125, order: 4 },
    { id: "C", x: 160, y: 70, order: 5 },
  ];
  const edges = [
    ["A", "B"],
    ["A", "C"],
    ["B", "D"],
    ["B", "E"],
  ];
  const byId = Object.fromEntries(vertices.map((v) => [v.id, v]));

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
          transition={{ duration: 0.4, delay: 0.2 + v.order * 0.25, ease: "backOut" }}
          style={{ transformOrigin: `${v.x}px ${v.y}px` }}
        >
          <circle cx={v.x} cy={v.y} r="14" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <text x={v.x} y={v.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {v.id}
          </text>
          <text x={v.x} y={v.y - 20} textAnchor="middle" fontSize="8" fontWeight="700" className="fill-amber-500">
            {v.order}
          </text>
        </motion.g>
      ))}
      <text x="100" y="142" textAnchor="middle" fontSize="8" fontFamily="monospace" className="fill-gray-500 dark:fill-gray-400">
        visit order: A, B, D, E, C, one path fully explored before backtracking
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Depth-First Search explores a graph by plunging as deep as possible down one path before ever backing up: from the current vertex, move to an unvisited neighbor, then from there to one of its unvisited neighbors, and so on, only backtracking to try a different branch once a path runs out of new vertices to reach. Unlike BFS's expanding rings, DFS traces out one long tendril at a time.`,
    `That behavior comes from using a stack (last-in, first-out) instead of a queue. Whichever vertex was discovered most recently is the one explored next, which is exactly what "keep going deeper" means: the newest neighbor found always jumps ahead of anything discovered earlier and still waiting. A stack can be explicit (an array used as a stack) or implicit, via the call stack of a recursive function; both produce the same traversal order.`,
    `A subtlety worth noting: with an explicit stack, a vertex can end up pushed more than once before it's actually processed, if two different vertices both discover it as a neighbor before it's popped. That's fine: a visited check happens when a vertex is popped, not when it's pushed, so any duplicate is simply skipped once it's already been handled. This is a real difference from BFS, which marks a vertex visited the moment it's enqueued specifically to prevent that kind of duplication.`,
    `DFS is the natural tool whenever "is there a path at all" matters more than "what's the shortest path": detecting cycles, finding connected components, topological sorting of a dependency graph, and solving maze- or puzzle-like search spaces where backtracking through one failed branch to try another is exactly the desired behavior.`,
  ];

  const algorithm = [
    { points: "Push the start vertex onto the stack" },
    {
      points: "While the stack isn't empty, repeat:",
      subpoints: [
        "Pop a vertex; if it's already visited, skip it and continue",
        "Otherwise, mark it visited and process it (this is the visit order)",
        "Push each of its unvisited neighbors onto the stack",
      ],
    },
    { points: "Stop when the stack is empty, since every vertex reachable from the start has been visited" },
  ];

  const complexity = [
    { points: "Time Complexity: O(V + E), since every vertex is popped and processed once, and every edge is examined once across the whole run." },
    { points: "Space Complexity: O(V), for the stack (explicit or via recursion) and the visited set in the worst case." },
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Depth-First Search?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h2>
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
            DFS from A plunges down the B branch completely before ever trying C
          </div>
          <WalkthroughDiagram />
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Algorithm Steps
          </h2>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time Complexity
          </h2>
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
