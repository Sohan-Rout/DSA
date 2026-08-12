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
    `Deleting from a Binary Search Tree starts the same way insertion does: you search for the value by comparing and moving left or right. But once you find it, keeping the tree a valid BST afterward takes more care than insertion ever did, because removing a node can leave a gap that needs to be patched correctly.`,
    `There are exactly three shapes the node-to-delete can have, and each is handled differently: a leaf is simply removed, a node with one child is replaced by that child, and a node with two children is trickier, since you can't just delete it without breaking the ordering, so you borrow a replacement value from elsewhere in the tree.`,
    `Deletion needs O(1) extra space beyond the recursion stack, since no matter which of the three cases applies, only a constant number of pointers get rewired.`,
    `Repeated deletions (and insertions) can gradually unbalance a BST even if it started out balanced, which is exactly the problem self-balancing trees like AVL and Red-Black trees are designed to prevent: they perform extra rotation work on every insert/delete specifically to keep the height close to log n.`,
  ];

  const cases = [
    {
      title: "Case 1: Deleting a leaf",
      body: "No children to worry about, just remove the node outright. The parent's pointer to it becomes null.",
    },
    {
      title: "Case 2: Deleting a node with one child",
      body: "Splice the node out by connecting its parent directly to its single child, skipping over the deleted node entirely.",
    },
    {
      title: "Case 3: Deleting a node with two children",
      body: "Find the in-order successor (the smallest value in the right subtree), copy that value into the node being deleted, then delete the successor from its original spot, which is guaranteed to be a leaf or have only a right child, so it reduces to Case 1 or Case 2.",
    },
  ];

  const beforeNodes = [
    { id: "8", x: 100, y: 30, fill: "#dc2626", stroke: "#b91c1c", ring: "#ef4444" },
    { id: "3", x: 60, y: 80 },
    { id: "12", x: 140, y: 80 },
    { id: "10", x: 120, y: 130, fill: "#8b5cf6", stroke: "#7c3aed", ring: "#8b5cf6" },
    { id: "14", x: 160, y: 130 },
  ];
  const beforeEdges = [
    ["8", "3"],
    ["8", "12"],
    ["12", "10"],
    ["12", "14"],
  ];

  const afterNodes = [
    { id: "10", x: 100, y: 30, fill: "#10b981", stroke: "#059669" },
    { id: "3", x: 60, y: 80 },
    { id: "12", x: 140, y: 80 },
    { id: "14", x: 160, y: 130 },
  ];
  const afterEdges = [
    ["10", "3"],
    ["10", "12"],
    ["12", "14"],
  ];

  const algorithm = [
    { points: "Search for the value the same way you would for lookup" },
    {
      points: "Once found, check how many children the node has:",
      subpoints: [
        "Zero children → remove it directly",
        "One child → replace the node with that child",
        "Two children → find the in-order successor, copy its value up, then delete the successor",
      ],
    },
    { points: "Return the (possibly modified) subtree to the parent call" },
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
        {/* What is BST Deletion */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is BST Deletion?
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
            How Does It Work?
          </h1>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
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
                Deleting 8 (two children)
              </div>
              <MiniTree keyPrefix="before" nodes={beforeNodes} edges={beforeEdges} />
            </div>
            <div>
              <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
                10 (successor) takes its place
              </div>
              <MiniTree keyPrefix="after" nodes={afterNodes} edges={afterEdges} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              Node being deleted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-violet-500 inline-block"></span>
              In-order successor
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Successor's new position
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
              bestCase={(n) => Math.log2(n)}
              averageCase={(n) => Math.log2(n)}
              worstCase={(n) => n}
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
