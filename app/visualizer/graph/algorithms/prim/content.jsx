"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const vertices = [
    { id: "A", x: 20, y: 75, order: 1 },
    { id: "C", x: 100, y: 130, order: 2 },
    { id: "B", x: 100, y: 20, order: 3 },
    { id: "D", x: 180, y: 75, order: 4 },
  ];
  const edges = [
    ["A", "C", 1, true],
    ["C", "B", 2, true],
    ["A", "B", 4, false],
    ["B", "D", 5, true],
    ["C", "D", 8, false],
  ];
  const byId = Object.fromEntries(vertices.map((v) => [v.id, v]));

  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-md mx-auto">
      {edges.map(([from, to, w, inMst], i) => {
        const midX = (byId[from].x + byId[to].x) / 2;
        const midY = (byId[from].y + byId[to].y) / 2;
        return (
          <g key={`${from}-${to}`}>
            <motion.line
              x1={byId[from].x}
              y1={byId[from].y}
              x2={byId[to].x}
              y2={byId[to].y}
              stroke={inMst ? "#10b981" : "#c7d2fe"}
              strokeWidth={inMst ? "3" : "2"}
              strokeDasharray={inMst ? "0" : "4 3"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
            />
            <rect x={midX - 7} y={midY - 8} width="14" height="12" rx="3" className="fill-white dark:fill-neutral-900" />
            <text x={midX} y={midY + 2} textAnchor="middle" fontSize="8" fontWeight="700" className="fill-gray-500 dark:fill-gray-400">
              {w}
            </text>
          </g>
        );
      })}
      {vertices.map((v, i) => (
        <motion.g
          key={v.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 + v.order * 0.25, ease: "backOut" }}
          style={{ transformOrigin: `${v.x}px ${v.y}px` }}
        >
          <circle cx={v.x} cy={v.y} r="14" fill="#059669" stroke="white" strokeWidth="2" />
          <text x={v.x} y={v.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {v.id}
          </text>
          <text x={v.x} y={v.y - 20} textAnchor="middle" fontSize="8" fontWeight="700" className="fill-amber-500">
            {v.order}
          </text>
        </motion.g>
      ))}
      <text x="100" y="145" textAnchor="middle" fontSize="8" fontFamily="monospace" className="fill-gray-500 dark:fill-gray-400">
        tree grows A → C → B → D, always via the cheapest edge out of it
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Prim's algorithm builds a minimum spanning tree the same way Kruskal's does — greedily, ending up with the cheapest possible set of edges connecting every vertex with no cycles — but it grows outward from a single starting vertex instead of considering edges from the whole graph in sorted order. At every step, the tree adds whichever edge is cheapest among all the edges connecting the current tree to a vertex not yet in it.`,
    `Rather than sorting the whole edge list up front, Prim's algorithm tracks a "key" value for every vertex outside the tree: the weight of the cheapest edge discovered so far connecting it directly to the tree (infinity if none is known yet). At each step, the algorithm pulls in whichever outside vertex has the smallest key, adds the edge that earned it that key, and then checks whether any of its edges give some other outside vertex an even cheaper way into the (now larger) tree.`,
    `This "key" is deliberately different from Dijkstra's "distance": Dijkstra's distance is the cumulative weight of the entire path from the start, while Prim's key is just the weight of one direct edge into the tree, regardless of how far the tree has traveled to get there. That's exactly why Prim's algorithm finds a minimum spanning tree — cheapest total connections — while Dijkstra finds shortest paths — cheapest cumulative routes. They look almost identical in code, but they're solving genuinely different problems.`,
    `Prim's algorithm tends to be the better choice on dense graphs (many edges relative to vertices), since it never needs to sort the full edge list the way Kruskal's does — with a good priority queue it can outperform Kruskal's as edge count grows. Like Kruskal's, it's used for minimum-cost network design: wiring, piping, or cabling a set of locations together as cheaply as possible.`,
  ];

  const algorithm = [
    { points: "Set the start vertex's key to 0, and every other vertex's key to infinity" },
    {
      points: "While vertices remain outside the tree, repeat:",
      subpoints: [
        "Pull in whichever outside vertex currently has the smallest key, and add the edge that produced that key to the tree",
        "For each of its edges to a still-outside vertex, if that edge is cheaper than the outside vertex's current key, update the key",
      ],
    },
    { points: "Once every reachable vertex is in the tree, the accepted edges form the minimum spanning tree" },
  ];

  const complexity = [
    { points: "Time Complexity: O((V + E) log V) with a binary heap priority queue — comparable to Dijkstra's, and often faster than Kruskal's on dense graphs." },
    { points: "Space Complexity: O(V) — for the key array, the parent pointers, and the priority queue." },
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
            What is Prim's Algorithm?
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
            Starting from A, the tree grows one cheapest-edge step at a time
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
              bestCase={(n) => n * Math.log2(n)}
              averageCase={(n) => (n + n) * Math.log2(n)}
              worstCase={(n) => (n + n) * Math.log2(n)}
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
