"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const nodes = [
    { id: "8", x: 110, y: 30 },
    { id: "3", x: 70, y: 80, isPivot: true },
    { id: "10", x: 150, y: 80 },
    { id: "1", x: 50, y: 130, isEndpoint: true },
    { id: "6", x: 90, y: 130 },
    { id: "14", x: 150, y: 130, isEndpoint: true },
  ];
  const edges = [
    ["8", "3"],
    ["8", "10"],
    ["3", "1"],
    ["3", "6"],
    ["10", "14"],
  ];
  const diameterEdges = new Set(["3-1", "3-8", "8-10", "10-14"]);
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 200 165" className="w-full max-w-md mx-auto">
      {edges.map(([from, to], i) => {
        const onDiameter = diameterEdges.has(`${from}-${to}`) || diameterEdges.has(`${to}-${from}`);
        return (
          <motion.path
            key={`${from}-${to}`}
            d={`M ${byId[from].x} ${byId[from].y} L ${byId[to].x} ${byId[to].y}`}
            fill="none"
            stroke={onDiameter ? "#f59e0b" : "#818cf8"}
            strokeWidth={onDiameter ? "3" : "2"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: "easeInOut" }}
          />
        );
      })}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.15, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          {n.isPivot && (
            <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="#10b981" strokeWidth="2.5" />
          )}
          {n.isEndpoint && (
            <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 3" opacity="0.85" />
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r="14"
            fill={n.isPivot ? "#10b981" : "#3b82f6"}
            stroke={n.isPivot ? "#059669" : "#1d4ed8"}
            strokeWidth="2"
          />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {n.id}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `The diameter of a tree is the number of edges on the longest path between any two nodes. That path doesn't have to pass through the root: it can start and end anywhere, and in most trees it actually cuts through some node in the middle where two deep subtrees meet.`,
    `The key insight: for any single node, the longest path that passes *through* it is the height of its left subtree plus the height of its right subtree, one leg going down each side. Checking every node this way and keeping the largest total automatically finds the true diameter, because whichever node happens to be the meeting point of the two longest branches will produce the biggest sum.`,
    `This means diameter can be computed in a single post-order traversal: recursively find the height of the left and right subtrees first, use them to compute this node's own height (1 + the taller side) and its "path-through" value (left height + right height), then update a running maximum. No repeated re-traversal is needed, since every node's height is computed exactly once and reused by its parent.`,
    `Diameter shows up whenever "the two most distant points in a hierarchy" matters: the worst-case latency between two nodes in a network topology tree, the longest chain of dependencies in a build graph, or simply describing how "spread out" or "stringy" versus "bushy" a tree's shape is.`,
  ];

  const algorithm = [
    { points: "Run a post-order traversal, processing both children before the current node" },
    {
      points: "At each node, using the already-computed heights of its children:",
      subpoints: [
        "This node's height = 1 + max(left child height, right child height)",
        "The longest path through this node = left child height + right child height",
      ],
    },
    { points: "Track the maximum path-through value seen across every node: that maximum is the diameter" },
  ];

  const complexity = [
    { points: "Time Complexity: O(n), since every node's height is computed exactly once in a single traversal." },
    { points: "Space Complexity: O(h), where recursion stack depth equals the tree's height (O(log n) balanced, O(n) skewed)." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Diameter */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is the Diameter of a Tree?
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
            Diameter = 4 edges: the path 1 → 3 → 8 → 10 → 14 turns at node 3
          </div>
          <WalkthroughDiagram />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-violet-500 inline-block"></span>
              Path endpoints
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Turning point
            </span>
          </div>
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
              averageCase={(n) => n}
              worstCase={(n) => n}
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
