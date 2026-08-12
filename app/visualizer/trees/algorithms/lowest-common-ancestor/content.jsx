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
    { id: "3", x: 70, y: 80, highlighted: true, isLca: true },
    { id: "10", x: 150, y: 80 },
    { id: "1", x: 50, y: 130, isTarget: true },
    { id: "6", x: 90, y: 130, isTarget: true },
  ];
  const edges = [
    ["8", "3"],
    ["8", "10"],
    ["3", "1"],
    ["3", "6"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 200 165" className="w-full max-w-md mx-auto">
      {edges.map(([from, to], i) => (
        <motion.path
          key={`${from}-${to}`}
          d={`M ${byId[from].x} ${byId[from].y} L ${byId[to].x} ${byId[to].y}`}
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: "easeInOut" }}
        />
      ))}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.15, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          {n.isLca && (
            <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="#10b981" strokeWidth="2.5" />
          )}
          {n.isTarget && (
            <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 3" opacity="0.85" />
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r="14"
            fill={n.isLca ? "#10b981" : "#3b82f6"}
            stroke={n.isLca ? "#059669" : "#1d4ed8"}
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
    `The Lowest Common Ancestor of two nodes A and B is the deepest node in the tree that has both A and B as descendants (a node counts as its own descendant, so LCA(A, A) is just A). It's "lowest" in the sense of being as far from the root as possible while still being an ancestor of both: the point where the paths from A and B up to the root first merge.`,
    `On a general binary tree (no ordering guarantee), finding the LCA needs to search the whole tree: recursively check the left and right subtrees for A and B. If a node's left subtree contains one of them and its right subtree contains the other, that node is the split point: the LCA. If only one subtree contains either of them, the LCA must be further down inside that subtree.`,
    `A Binary Search Tree's ordering turns this into something far cheaper. Starting at the root and comparing both values against the current node: if both A and B are smaller, the LCA must be somewhere in the left subtree (skip the right entirely). If both are larger, it must be in the right subtree. The moment they're no longer both on the same side (one is smaller-or-equal and the other is larger-or-equal), the paths to A and B have just diverged, and the current node is the LCA. No backtracking, no exploring the "wrong" subtree at all.`,
    `LCA queries show up any time a "closest shared point" needs to be found across two positions in a hierarchy: git's merge-base command (the common ancestor commit two branches diverged from), routing decisions in network topology trees, and evolutionary/phylogenetic trees (the most recent common ancestor of two species). When the same tree needs many repeated LCA queries, the answers are often precomputed into an O(1)-per-query structure using techniques built on top of range-minimum queries.`,
  ];

  const algorithm = [
    { points: "Start at the root" },
    {
      points: "Compare both target values against the current node's value:",
      subpoints: [
        "If both are smaller, move to the left child",
        "If both are larger, move to the right child",
        "Otherwise (one is smaller-or-equal and the other is larger-or-equal), the current node is the LCA, so stop",
      ],
    },
    { points: "Repeat until the split point is found" },
  ];

  const complexity = [
    { points: "Best/Average Case: Roughly balanced tree → O(log n)." },
    { points: "Worst Case: Degenerate/skewed tree → O(n)." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is LCA */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is the Lowest Common Ancestor?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* General tree vs BST */}
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
            LCA(1, 6): paths to 1 and 6 split apart at node 3
          </div>
          <WalkthroughDiagram />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-violet-500 inline-block"></span>
              Node A / Node B
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Lowest Common Ancestor
            </span>
          </div>
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Algorithm Steps (BST)
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
              bestCase={(n) => Math.log2(n)}
              averageCase={(n) => Math.log2(n)}
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
