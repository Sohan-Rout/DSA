"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const nodes = [
    { id: "8", order: 1, x: 110, y: 30 },
    { id: "3", order: 2, x: 70, y: 80 },
    { id: "1", order: 3, x: 45, y: 130 },
    { id: "6", order: 4, x: 90, y: 130 },
    { id: "10", order: 5, x: 150, y: 80 },
  ];
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

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + (n.order - 1) * 0.25, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r="14" fill="#10b981" stroke="#059669" strokeWidth="2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {n.id}
          </text>
          <rect x={n.x - 9} y={n.y - 30} width="18" height="13" rx="6.5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
          <text x={n.x} y={n.y - 20.5} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#b45309">
            {n.order}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Pre-order traversal visits a node before either of its subtrees, in the order Root, then Left, then Right. It's called "pre" because the root is processed pre-emptively, ahead of anything below it, which makes it the natural way to reconstruct a tree's structure from scratch: whatever value you see first is guaranteed to be some subtree's root.`,
    `Because the root is always recorded before its children, pre-order output preserves enough structural information to rebuild the exact same tree (given the traversal is unambiguous, e.g. paired with node count or null markers). This is exactly why pre-order is the traversal used for serializing a tree to a file and for copying/cloning a tree, since you can reconstruct it top-down as you read the sequence.`,
    `Pre-order also mirrors how you'd write a prefix (Polish notation) expression from an expression tree: the operator (root) comes before its operands (children), e.g. \`+ 3 4\` instead of \`3 + 4\`.`,
    `Traversal needs O(h) extra space for the recursion call stack, where h is the tree's height: O(log n) for a balanced tree, but O(n) in the worst case of a completely skewed tree.`,
  ];

  const walkthrough = [
    { points: "Visit the root first: 8" },
    { points: "Recurse into the left subtree, visiting its root first: 3" },
    { points: "Recurse further left: 1 (a leaf, so no children to descend into)" },
    { points: "Back up to 3, now recurse right: 6" },
    { points: "All of 8's left subtree is done, so recurse into 8's right subtree: 10" },
    { points: "Final sequence: [8, 3, 1, 6, 10]" },
  ];

  const algorithm = [
    { points: "If the current node is null, return immediately (base case)" },
    { points: "Visit (process) the current node" },
    { points: "Recursively traverse the left subtree" },
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
        {/* What is Pre-order Traversal */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Pre-order Traversal?
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
