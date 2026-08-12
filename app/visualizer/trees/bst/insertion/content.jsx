"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const nodes = [
    { id: "8", x: 110, y: 30, highlighted: true },
    { id: "3", x: 70, y: 80, highlighted: true },
    { id: "10", x: 150, y: 80, highlighted: false },
    { id: "1", x: 50, y: 130, highlighted: false },
    { id: "6", x: 90, y: 130, highlighted: true },
    { id: "5", x: 75, y: 175, highlighted: false, isNew: true },
  ];
  const edges = [
    ["8", "3"],
    ["8", "10"],
    ["3", "1"],
    ["3", "6"],
    ["6", "5"],
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
          transition={{ duration: 0.4, delay: 0.15 + i * 0.15, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          {n.highlighted && (
            <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.8" />
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r="14"
            fill={n.isNew ? "#10b981" : "#3b82f6"}
            stroke={n.isNew ? "#059669" : "#1d4ed8"}
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
    `A Binary Search Tree keeps every node's left subtree smaller and its right subtree larger, and insertion is what builds that ordering up one value at a time. To insert a new value, you walk down from the root exactly the way you'd search for it: go left when the value is smaller, go right when it's larger, and the moment you fall off the tree (hit a null pointer), that's where the new node gets attached.`,
    `Because every insertion is really just a failed search, the new node always becomes a leaf. Nothing above it has to move or shift, since inserting into a BST never requires shuffling existing nodes around, only adding one new connection at the bottom.`,
    `Insertion needs O(1) extra space beyond the recursion stack, since it only ever creates a single new node.`,
    `The shape you end up with depends entirely on insertion order. Insert already-sorted data and you get a degenerate, linked-list-shaped tree (see Binary Tree Types) with Θ(n) height. Insert in a randomized order and the tree tends to stay close to balanced, keeping height near Θ(log n), which is exactly why self-balancing trees like AVL exist.`,
  ];

  const walkthrough = [
    { points: "Insert 5 into a tree rooted at 8" },
    { points: "8: 5 < 8 → go left" },
    { points: "3: 5 > 3 → go right" },
    { points: "6: 5 < 6 → go left" },
    { points: "Left of 6 is empty → attach 5 here as a new leaf" },
  ];

  const algorithm = [
    { points: "Start at the root" },
    {
      points: "Compare the new value with the current node:",
      subpoints: [
        "If smaller, move to the left child",
        "If larger, move to the right child",
        "If equal, stop (duplicate, which most BSTs ignore or reject)",
      ],
    },
    { points: "Repeat until you reach a null (empty) pointer" },
    { points: "Attach the new node there as a leaf" },
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
        {/* What is BST Insertion */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is BST Insertion?
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
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Comparison path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Newly inserted node
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
            {paragraphs[1]}
          </p>
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
