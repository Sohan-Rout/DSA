"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const LabeledTreeDiagram = () => {
  const nodes = [
    { id: "A", x: 110, y: 30, depth: 0, leaf: false },
    { id: "B", x: 80, y: 80, depth: 1, leaf: false },
    { id: "C", x: 140, y: 80, depth: 1, leaf: false },
    { id: "D", x: 65, y: 130, depth: 2, leaf: true },
    { id: "E", x: 95, y: 130, depth: 2, leaf: true },
    { id: "F", x: 125, y: 130, depth: 2, leaf: true },
    { id: "G", x: 155, y: 130, depth: 2, leaf: true },
  ];
  const edges = [
    ["A", "B"],
    ["A", "C"],
    ["B", "D"],
    ["B", "E"],
    ["C", "F"],
    ["C", "G"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const levelRows = [
    { y: 30, label: "Depth 0" },
    { y: 80, label: "Depth 1" },
    { y: 130, label: "Depth 2" },
  ];

  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-md mx-auto">
      {levelRows.map((row) => (
        <g key={row.label}>
          <line
            x1="18"
            y1={row.y}
            x2="192"
            y2={row.y}
            stroke="currentColor"
            className="text-gray-300 dark:text-gray-700"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x="0"
            y={row.y + 4}
            fontSize="8"
            className="fill-gray-500 dark:fill-gray-400"
          >
            {row.label}
          </text>
        </g>
      ))}

      {edges.map(([from, to], i) => (
        <motion.path
          key={`${from}-${to}`}
          d={`M ${byId[from].x} ${byId[from].y} L ${byId[to].x} ${byId[to].y}`}
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: "easeInOut" }}
        />
      ))}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.15 + n.depth * 0.25 + i * 0.03,
            ease: "backOut",
          }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle
            cx={n.x}
            cy={n.y}
            r="14"
            fill={n.leaf ? "#10b981" : "#3b82f6"}
            stroke={n.leaf ? "#059669" : "#1d4ed8"}
            strokeWidth="2"
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
          >
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
    `A Binary Tree is a hierarchical structure built from nodes, where every node has at most two children, conventionally called the left and right child. That two-child limit is what separates it from a general tree, and it's what makes every property below meaningful and calculable.`,
    `Height and depth are the two measurements that come up constantly when reasoning about a tree's performance — most tree operations run in time proportional to the height, not the number of nodes, which is exactly why keeping a tree balanced matters so much.`,
    `Space Complexity for storing a binary tree with n nodes is O(n), since each node needs a fixed amount of memory (its value plus two child pointers) regardless of the tree's shape.`,
    `These structural properties aren't just theory — they're what a balancing algorithm (like in AVL or Red-Black trees) is actively trying to protect. A tree that's allowed to grow unchecked can degrade to the same O(n) worst case as a linked list.`,
  ];

  const terminology = [
    { term: "Root", def: "The single node at the top of the tree with no parent." },
    { term: "Parent / Child", def: "A node directly connected one level above/below another." },
    { term: "Sibling", def: "Nodes that share the same parent." },
    { term: "Leaf", def: "A node with no children (both left and right are null)." },
    { term: "Internal Node", def: "Any node with at least one child (includes the root)." },
    { term: "Edge", def: "The connection/link between a parent and its child." },
    { term: "Depth of a node", def: "Number of edges from the root down to that node." },
    { term: "Height of a node", def: "Number of edges on the longest path from that node down to a leaf." },
    { term: "Height of the tree", def: "The height of the root node — the longest root-to-leaf path." },
  ];

  const nodeCountFormulas = [
    { label: "Max nodes at depth d", formula: "2^d" },
    { label: "Max total nodes for height h", formula: "2^(h+1) − 1" },
    { label: "Min total nodes for height h", formula: "h + 1" },
    { label: "Min possible height for n nodes", formula: "⌊log₂ n⌋" },
  ];

  const balanceComparison = [
    { points: "Balanced tree, n = 7 nodes → height = 2 (as close to log₂ 7 as possible)" },
    { points: "Skewed tree, n = 7 nodes → height = 6 (every node has exactly one child)" },
    { points: "Same node count, wildly different performance — height is what actually matters" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is a Binary Tree */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is a Binary Tree?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* Terminology */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Key Terminology
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {terminology.map((item) => (
              <div
                key={item.term}
                className="p-3 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-gray-800"
              >
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {item.term}:
                </span>{" "}
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.def}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Height, Depth & Level */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Height, Depth &amp; Level
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>

          <LabeledTreeDiagram />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Internal node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Leaf node
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
            In this tree, node A sits at depth 0 (the root), B and C sit at depth 1, and
            D, E, F, G all sit at depth 2. Since the deepest node is at depth 2, the
            tree's height is 2.
          </p>
        </section>

        {/* Node Count Formulas */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Node Count Formulas
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-neutral-900">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    Property
                  </th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    Formula
                  </th>
                </tr>
              </thead>
              <tbody>
                {nodeCountFormulas.map((row, index) => (
                  <tr
                    key={row.label}
                    className={index % 2 ? "bg-gray-50 dark:bg-neutral-900" : "bg-white dark:bg-neutral-950"}
                  >
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      {row.label}
                    </td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-blue-600 dark:text-blue-400">
                      {row.formula}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Balanced vs Skewed */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Why Balance Matters
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {balanceComparison.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Complexity Implications
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Since most tree operations (search, insert, delete) walk from the root
              down to a leaf, their time complexity is O(height) — O(log n) for a
              balanced tree, degrading to O(n) for a skewed one.
            </p>
          </div>

          <div className="mt-4">
            <ComplexityGraph
              bestCase={(n) => Math.log2(n)}
              averageCase={(n) => Math.log2(n)}
              worstCase={(n) => n}
              maxN={25}
            />
          </div>

          <InContentAd />

          <p className="text-gray-700 dark:text-gray-300 mt-6 leading-relaxed">
            {paragraphs[2]}
          </p>
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
