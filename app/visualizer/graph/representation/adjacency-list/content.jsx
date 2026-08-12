"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const vertices = [
    { id: "A", x: 110, y: 30 },
    { id: "B", x: 40, y: 90 },
    { id: "C", x: 180, y: 90 },
  ];
  const edges = [
    ["A", "B"],
    ["A", "C"],
    ["B", "C"],
  ];
  const byId = Object.fromEntries(vertices.map((v) => [v.id, v]));
  const list = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <svg viewBox="0 0 220 120" className="w-full max-w-[220px]">
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
            transition={{ duration: 0.4, delay: 0.15 + i * 0.15, ease: "backOut" }}
            style={{ transformOrigin: `${v.x}px ${v.y}px` }}
          >
            <circle cx={v.x} cy={v.y} r="16" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            <text x={v.x} y={v.y + 5} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
              {v.id}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="space-y-2 text-sm">
        {Object.entries(list).map(([v, neighbors]) => (
          <div key={v} className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-600 text-white text-xs font-bold">{v}</span>
            <span className="text-gray-400">→</span>
            <div className="flex gap-1">
              {neighbors.map((n) => (
                <span key={n} className="px-2 py-1 rounded-md bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-xs font-medium">
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `An adjacency list represents a graph as a collection of per-vertex neighbor lists: one entry per vertex, holding only the vertices it's actually connected to. Instead of a full V×V grid of mostly zeros, each vertex stores exactly as many entries as it has edges, nothing more.`,
    `Adding an edge (u, v) appends v to u's list. For an undirected graph, u is also appended to v's list, since the edge goes both ways; for a directed graph, only u's list gets the new entry. Checking whether an edge exists means scanning through one vertex's list looking for the target, proportional to that vertex's degree (its number of neighbors), not the whole graph.`,
    `This is the mirror image of an adjacency matrix's tradeoffs. A matrix spends O(V²) space no matter what, in exchange for O(1) edge-existence checks. A list spends space proportional to the actual number of edges, O(V + E), but checking a specific edge now costs O(degree) instead of O(1). For the vast majority of real-world graphs, which are sparse (E is much smaller than V²), that tradeoff strongly favors the list.`,
    `Adjacency lists are the default choice for most graph algorithms: BFS, DFS, Dijkstra's algorithm, and topological sort all need to repeatedly ask "what are this vertex's neighbors?", which a list answers by directly returning exactly the relevant entries, without wasting time scanning past vertices that aren't connected at all.`,
  ];

  const algorithm = [
    { points: "Create an empty list (or map) for every vertex" },
    { points: "For every edge (u, v) with weight w: append (v, w) to u's list" },
    { points: "If the graph is undirected, also append (u, w) to v's list, since the same edge is recorded from both directions" },
    { points: "To check if an edge exists between two vertices, scan the source vertex's list for the target" },
  ];

  const complexity = [
    { points: "Space Complexity: O(V + E), proportional to the actual number of vertices and edges, not V²." },
    { points: "Check if edge (u, v) exists: O(degree(u)), scan u's list, which is only as long as u's actual neighbor count." },
    { points: "Iterate over a vertex's neighbors: O(degree(u)), the list already holds exactly the relevant entries." },
    { points: "Add an edge: O(1), appending to a list." },
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
            What is an Adjacency List?
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
            The same triangle graph: every vertex's list holds only its actual neighbors
          </div>
          <WalkthroughDiagram />
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Building the List
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {algorithm.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Time Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Complexity
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
              worstCase={(n) => n * n}
              maxN={20}
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
