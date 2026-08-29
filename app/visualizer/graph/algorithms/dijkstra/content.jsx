"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const vertices = [
    { id: "A", x: 20, y: 75, dist: 0 },
    { id: "B", x: 100, y: 20, dist: 3 },
    { id: "C", x: 100, y: 130, dist: 1 },
    { id: "D", x: 180, y: 75, dist: 6 },
  ];
  const edges = [
    ["A", "B", 3],
    ["A", "C", 1],
    ["C", "B", 1],
    ["B", "D", 3],
    ["C", "D", 8],
  ];
  const byId = Object.fromEntries(vertices.map((v) => [v.id, v]));
  const shortestEdges = new Set(["A-C", "C-B", "B-D"]);

  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-md mx-auto">
      {edges.map(([from, to, w], i) => {
        const onPath = shortestEdges.has(`${from}-${to}`) || shortestEdges.has(`${to}-${from}`);
        const midX = (byId[from].x + byId[to].x) / 2;
        const midY = (byId[from].y + byId[to].y) / 2;
        return (
          <g key={`${from}-${to}`}>
            <motion.line
              x1={byId[from].x}
              y1={byId[from].y}
              x2={byId[to].x}
              y2={byId[to].y}
              stroke={onPath ? "#8b5cf6" : "#818cf8"}
              strokeWidth={onPath ? "3" : "2"}
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
          <text x={v.x} y={v.y - 20} textAnchor="middle" fontSize="8" fontWeight="700" className="fill-emerald-600 dark:fill-emerald-400">
            {v.dist}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Dijkstra's algorithm finds the shortest-distance path from a single start vertex to every other vertex in a weighted graph: "shortest" meaning the smallest total edge weight along the path, not the fewest edges (which is what plain BFS finds on an unweighted graph). It requires every edge weight to be non-negative; a single negative weight can break its core assumption and produce wrong answers.`,
    `The algorithm keeps a tentative distance for every vertex, starting at 0 for the source and infinity for everything else. At each step, it finalizes whichever unvisited vertex currently has the smallest tentative distance. Once a vertex is finalized, its distance is guaranteed correct and will never be revised again. Then it "relaxes" every edge out of that vertex: for each neighbor, if going through the just-finalized vertex would produce a shorter distance than what's currently recorded, the neighbor's distance is updated.`,
    `The key insight behind why picking the smallest unvisited distance is always safe: since every edge weight is non-negative, any path to that vertex through a still-unvisited (and therefore farther-or-equal) vertex could only be equal or longer. There's no way a shortcut could still be waiting to be discovered. That guarantee is exactly what breaks down if a negative edge weight is allowed: a path through a vertex that currently looks farther away could later turn out shorter, and algorithms like Bellman-Ford exist specifically to handle that case.`,
    `Dijkstra's algorithm (typically implemented with a min-priority-queue for efficiency) is the standard tool behind GPS and mapping route-finding, network routing protocols that pick the cheapest path between routers, and any scenario where "cheapest route through a weighted network" needs an exact answer rather than an approximation.`,
  ];

  const algorithm = [
    { points: "Set the start vertex's distance to 0, and every other vertex's distance to infinity" },
    {
      points: "While unvisited vertices remain, repeat:",
      subpoints: [
        "Pick the unvisited vertex with the smallest tentative distance and mark it finalized",
        "For each of its neighbors, if the path through this vertex is shorter than the neighbor's current recorded distance, update it (this is a \"relaxation\")",
      ],
    },
    { points: "Once every reachable vertex is finalized, each vertex's recorded distance is its true shortest distance from the start" },
    { points: "To reconstruct the actual shortest path to any vertex, follow the chain of \"came from\" pointers recorded during relaxation, back to the start" },
  ];

  const complexity = [
    { points: "Time Complexity: O((V + E) log V) with a binary heap priority queue, since each vertex is extracted once and each edge triggers at most one relaxation, both at logarithmic cost." },
    { points: "Space Complexity: O(V), for the distance array, the previous-vertex pointers, and the priority queue." },
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
            What is Dijkstra's Algorithm?
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
            Shortest distances from A: the path A→C→B→D (1+1+3=5) beats A→B→D directly (3+3=6)
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
