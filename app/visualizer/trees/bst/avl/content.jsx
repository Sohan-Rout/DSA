"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const MiniTree = ({ nodes, edges, keyPrefix }) => {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
      {edges.map(([from, to], i) => (
        <motion.path
          key={`${keyPrefix}-${from}-${to}`}
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
          key={`${keyPrefix}-${n.id}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.15, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          {n.ring && (
            <circle cx={n.x} cy={n.y} r="18" fill="none" stroke={n.ring} strokeWidth="2" opacity="0.85" />
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r="14"
            fill={n.fill || "#3b82f6"}
            stroke={n.stroke || "#1d4ed8"}
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
    `A plain BST offers no guarantee about its shape: insert values in the wrong order and it degenerates into a linked list with O(n) operations (see BST Insertion). An AVL tree fixes this by adding one rule on top of the normal BST ordering: for every node, the heights of its left and right subtrees may differ by at most 1. This is called the balance factor, and it's recalculated bottom-up after every insertion or deletion.`,
    `Whenever an insertion pushes a node's balance factor to +2 or -2, the tree is out of balance and needs a rotation, a local rearrangement of a few pointers that restores the height rule without breaking the BST ordering. There are four possible imbalance shapes, and each has a matching fix: a single rotation for the two "straight-line" cases (Left-Left, Right-Right), and a double rotation for the two "zig-zag" cases (Left-Right, Right-Left).`,
    `Because at most O(log n) ancestors need their balance factor rechecked after an insertion, and each rotation touches only a constant number of pointers, a single insertion or deletion does at most one rotation (single or double) to restore balance, so the extra bookkeeping AVL trees do is cheap.`,
    `The payoff is that an AVL tree's height is always O(log n), no matter what order values are inserted in. Unlike a plain BST, it can never degrade into a skewed shape. This makes search, insertion, and deletion all worst-case O(log n), not just average-case.`,
  ];

  const cases = [
    { title: "Left-Left", body: "A left-heavy node whose left child is also left-heavy. Fixed with a single right rotation." },
    { title: "Right-Right", body: "A right-heavy node whose right child is also right-heavy. Fixed with a single left rotation." },
    { title: "Left-Right", body: "A left-heavy node whose left child is right-heavy (zig-zag). Fixed by rotating the left child left, then the node right." },
    { title: "Right-Left", body: "A right-heavy node whose right child is left-heavy (zig-zag). Fixed by rotating the right child right, then the node left." },
  ];

  const beforeNodes = [
    { id: "30", x: 140, y: 30, fill: "#dc2626", stroke: "#b91c1c", ring: "#ef4444" },
    { id: "20", x: 90, y: 80, fill: "#8b5cf6", stroke: "#7c3aed", ring: "#8b5cf6" },
    { id: "10", x: 60, y: 130 },
  ];
  const beforeEdges = [
    ["30", "20"],
    ["20", "10"],
  ];

  const afterNodes = [
    { id: "20", x: 100, y: 30, fill: "#10b981", stroke: "#059669" },
    { id: "10", x: 60, y: 80 },
    { id: "30", x: 140, y: 80 },
  ];
  const afterEdges = [
    ["20", "10"],
    ["20", "30"],
  ];

  const algorithm = [
    { points: "Insert the value the normal BST way (compare and recurse left/right)" },
    { points: "On the way back up the recursion, update each ancestor's height" },
    { points: "Compute the balance factor: height(left) − height(right)" },
    {
      points: "If the balance factor is +2 or -2, identify which of the 4 cases applies and rotate:",
      subpoints: [
        "Left-Left → single right rotation",
        "Right-Right → single left rotation",
        "Left-Right → left rotation on the left child, then right rotation on the node",
        "Right-Left → right rotation on the right child, then left rotation on the node",
      ],
    },
    { points: "Return the (possibly new) subtree root to the parent call" },
  ];

  const complexity = [
    { points: "Best/Average/Worst Case: Height is always O(log n) → O(log n)." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is an AVL Tree */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is an AVL Tree?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* How Does It Work */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Do Rotations Work?
          </h1>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {cases.map((c) => (
              <div
                key={c.title}
                className="p-3 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-gray-800"
              >
                <div className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">
                  {c.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{c.body}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
                Inserting 10 unbalances 30 (Left-Left)
              </div>
              <MiniTree keyPrefix="before" nodes={beforeNodes} edges={beforeEdges} />
            </div>
            <div>
              <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
                A right rotation at 30 restores balance
              </div>
              <MiniTree keyPrefix="after" nodes={afterNodes} edges={afterEdges} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              Unbalanced node (bf ±2)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-violet-500 inline-block"></span>
              Pivot that becomes the new subtree root
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              New subtree root after rotation
            </span>
          </div>
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Algorithm Steps (Insertion)
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
              worstCase={(n) => Math.log2(n)}
              maxN={25}
            />
          </div>

          <InContentAd />
        </section>

        {/* Space Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Space Complexity
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[2]}
            </p>
          </div>
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
