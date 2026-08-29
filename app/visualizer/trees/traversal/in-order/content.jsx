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
    { id: "3", x: 70, y: 80 },
    { id: "1", x: 45, y: 130 },
    { id: "6", x: 90, y: 130 },
    { id: "10", x: 150, y: 80 },
  ];
  const orderMap = { "1": 1, "3": 2, "6": 3, "8": 4, "10": 5 };
  const edges = [
    ["8", "3"],
    ["3", "1"],
    ["3", "6"],
    ["8", "10"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-md mx-auto">
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

      {nodes.map((n) => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + (orderMap[n.id] - 1) * 0.25, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r="14" fill="#10b981" stroke="#059669" strokeWidth="2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {n.id}
          </text>
          <rect x={n.x - 9} y={n.y - 30} width="18" height="13" rx="6.5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
          <text x={n.x} y={n.y - 20.5} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#b45309">
            {orderMap[n.id]}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `In-order traversal visits a node's left subtree, then the node itself, then its right subtree, so the order is Left, Root, Right. The "in" refers to the root being processed in between its two children, rather than before or after both of them.`,
    `In-order traversal has one property that makes it stand out from pre-order and post-order: when run on a Binary Search Tree, it visits every value in strictly ascending sorted order. That falls directly out of the BST invariant: every value in a node's left subtree is smaller than the node, and every value in its right subtree is larger, so visiting left-root-right at every level naturally produces sorted output.`,
    `This is why in-order traversal is the standard way to read a BST's contents in sorted order without needing a separate sort step, and why it's used to validate whether a tree actually satisfies the BST property. If the in-order sequence isn't strictly increasing, the tree isn't a valid BST.`,
    `Traversal needs O(h) extra space for the recursion call stack, where h is the tree's height: O(log n) for a balanced tree, but O(n) in the worst case of a completely skewed tree.`,
  ];

  const walkthrough = [
    { points: "Start at the root (8), but don't visit it yet: first go left" },
    { points: "At 3, go left again first: reach 1 (a leaf) and visit it: 1" },
    { points: "Back at 3, its left is done: visit 3: 1, 3" },
    { points: "Now go right from 3: reach 6 (a leaf) and visit it: 1, 3, 6" },
    { points: "Back at 8, its left subtree is fully done: visit 8: 1, 3, 6, 8" },
    { points: "Go right from 8: reach 10 and visit it: 1, 3, 6, 8, 10 (sorted!)" },
  ];

  const algorithm = [
    { points: "If the current node is null, return immediately (base case)" },
    { points: "Recursively traverse the left subtree" },
    { points: "Visit (process) the current node" },
    { points: "Recursively traverse the right subtree" },
  ];

  const complexity = [
    { points: "Time Complexity: Every node is visited exactly once → O(n)." },
    { points: "Space Complexity: Bounded by the recursion depth → O(h)." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is In-order Traversal */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is In-order Traversal?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* How Does It Work */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {walkthrough.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>
          </div>

          <WalkthroughDiagram />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-400 inline-block"></span>
              Visit order
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Node
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
            {paragraphs[1]}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
            {paragraphs[2]}
          </p>
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
              bestCase={(n) => n}
              averageCase={(n) => n}
              worstCase={(n) => n}
              maxN={25}
            />
          </div>

          <InContentAd />
        </section>

        {/* Space Complexity */}
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
