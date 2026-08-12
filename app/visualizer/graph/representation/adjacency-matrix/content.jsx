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
  const matrix = {
    A: { A: 0, B: 1, C: 1 },
    B: { A: 1, B: 0, C: 1 },
    C: { A: 1, B: 1, C: 0 },
  };

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

      <table className="text-sm border-collapse">
        <thead>
          <tr>
            <th className="w-8 h-8"></th>
            {["A", "B", "C"].map((c) => (
              <th key={c} className="w-8 h-8 text-gray-500 dark:text-gray-400">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {["A", "B", "C"].map((r) => (
            <tr key={r}>
              <th className="w-8 h-8 text-gray-500 dark:text-gray-400">{r}</th>
              {["A", "B", "C"].map((c) => (
                <td
                  key={c}
                  className={`w-8 h-8 text-center border border-gray-200 dark:border-gray-700 ${
                    matrix[r][c] ? "bg-blue-100 dark:bg-blue-900/40 font-semibold" : "bg-gray-50 dark:bg-neutral-900"
                  }`}
                >
                  {matrix[r][c]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `An adjacency matrix represents a graph as a 2D grid: a V×V table where V is the number of vertices. The cell at row i, column j holds a nonzero value (often just 1, or an edge's weight) if there's an edge from vertex i to vertex j, and 0 otherwise. For an undirected graph, an edge sets both cell (i, j) and cell (j, i), so the matrix is symmetric across its diagonal; for a directed graph, only the one cell matching the edge's direction is set.`,
    `The main advantage is speed for a very specific question: "is there an edge between these two vertices?" Checking cell (i, j) is a single array lookup, O(1), regardless of how many edges the graph has. Iterating over all of a vertex's neighbors, though, means scanning an entire row, which costs O(V) even if that vertex only has one or two actual edges.`,
    `That scanning cost is what makes adjacency matrices a poor fit for sparse graphs, graphs where the number of edges is much smaller than V². A social network with millions of users but only a few hundred friends each would waste almost the entire matrix on zeros, both in memory (O(V²) regardless of edge count) and in wasted iteration time. Adjacency lists exist specifically to fix this by only storing the edges that actually exist.`,
    `Adjacency matrices earn their keep on dense graphs (where edges approach V²), in algorithms that need fast edge-existence checks (like Floyd-Warshall's all-pairs shortest paths, which is naturally matrix-based), and in small, fixed-size graphs where the O(V²) memory cost is negligible and the O(1) lookup is worth it.`,
  ];

  const algorithm = [
    { points: "Create a V×V grid, initialized to all zeros" },
    { points: "For every edge (u, v) with weight w: set matrix[u][v] = w" },
    { points: "If the graph is undirected, also set matrix[v][u] = w, since the same edge is recorded from both directions" },
    { points: "To check if an edge exists between two vertices, read matrix[u][v] directly" },
  ];

  const complexity = [
    { points: "Space Complexity: O(V²), regardless of how many edges actually exist." },
    { points: "Check if edge (u, v) exists: O(1), a single cell lookup." },
    { points: "Iterate over a vertex's neighbors: O(V), the entire row must be scanned." },
    { points: "Add or remove an edge: O(1), updating a single (or mirrored pair of) cells." },
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
            What is an Adjacency Matrix?
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
            An undirected triangle graph: its matrix is symmetric, and the diagonal stays 0 (no self-loops)
          </div>
          <WalkthroughDiagram />
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Building the Matrix
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
              bestCase={(n) => n * n}
              averageCase={(n) => n * n}
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
