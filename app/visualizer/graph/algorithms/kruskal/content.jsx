"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const vertices = [
    { id: "A", x: 20, y: 75 },
    { id: "B", x: 100, y: 20 },
    { id: "C", x: 100, y: 130 },
    { id: "D", x: 180, y: 75 },
  ];
  const edges = [
    ["A", "C", 1, true],
    ["C", "B", 2, true],
    ["A", "B", 4, false],
    ["B", "D", 3, true],
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
          transition={{ duration: 0.4, delay: 0.2 + i * 0.15, ease: "backOut" }}
          style={{ transformOrigin: `${v.x}px ${v.y}px` }}
        >
          <circle cx={v.x} cy={v.y} r="14" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <text x={v.x} y={v.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {v.id}
          </text>
        </motion.g>
      ))}
      <text x="100" y="145" textAnchor="middle" fontSize="8" fontFamily="monospace" className="fill-gray-500 dark:fill-gray-400">
        solid = in MST (total 6) · dashed = rejected (would cycle)
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `A minimum spanning tree (MST) of a connected, undirected, weighted graph is a subset of its edges that connects every vertex together, contains no cycles, and has the smallest possible total edge weight among all such subsets. "Spanning" means every vertex is included; "tree" means there's exactly one path between any two vertices in it (n vertices, n-1 edges, no cycles); "minimum" means no other spanning tree costs less.`,
    `Kruskal's algorithm builds one with a simple greedy rule: sort every edge in the graph by weight, from cheapest to most expensive, then walk through them in that order, adding each edge to the tree unless doing so would create a cycle. An edge creates a cycle exactly when its two endpoints are already connected to each other through edges already accepted — so the only real question at each step is "are these two vertices already in the same connected piece?"`,
    `That question is answered efficiently with a Union-Find (disjoint-set) structure, which tracks which connected component each vertex currently belongs to. Checking whether two vertices are in the same component is a "find" operation; accepting an edge and merging two components is a "union" operation. Both run in close to constant time with the right implementation, which is what keeps the whole algorithm fast even though it needs one check per edge.`,
    `Kruskal's algorithm is the standard choice when a graph is sparse (relatively few edges compared to vertices) since sorting the edge list dominates its cost. It's used to design minimum-cost networks — laying cable or pipe to connect a set of locations as cheaply as possible, building efficient road or utility networks, and as a subroutine in clustering algorithms that group data points by cutting the most expensive edges out of a spanning tree.`,
  ];

  const algorithm = [
    { points: "Sort all edges in the graph by weight, ascending" },
    {
      points: "Process edges in that order, and for each one:",
      subpoints: [
        "If its two endpoints are in different components, accept the edge — add it to the tree and merge the two components",
        "If its two endpoints are already in the same component, reject the edge — accepting it would create a cycle",
      ],
    },
    { points: "Stop once the tree has (number of vertices − 1) edges — every vertex is now connected" },
  ];

  const complexity = [
    { points: "Time Complexity: O(E log E) — dominated by sorting the edge list; the Union-Find operations that follow are nearly O(1) each." },
    { points: "Space Complexity: O(V + E) — for the edge list and the Union-Find structure." },
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
            What is a Minimum Spanning Tree?
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
            How Does Kruskal's Algorithm Work?
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
            Cheapest edges are taken first; A-B and C-D are rejected since they'd close a cycle
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
              averageCase={(n) => n * Math.log2(n)}
              worstCase={(n) => n * Math.log2(n)}
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
