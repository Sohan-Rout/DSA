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
    { id: "10", x: 150, y: 80 },
    { id: "1", x: 45, y: 130 },
    { id: "6", x: 90, y: 130 },
  ];
  const orderMap = { "8": 1, "3": 2, "10": 3, "1": 4, "6": 5 };
  const edges = [
    ["8", "3"],
    ["8", "10"],
    ["3", "1"],
    ["3", "6"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-md mx-auto">
      {/* level guide lines */}
      {[30, 80, 130].map((ly, i) => (
        <line key={i} x1="10" y1={ly} x2="190" y2={ly} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 4" className="dark:stroke-gray-700" />
      ))}
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
          transition={{ duration: 0.4, delay: 0.15 + (orderMap[n.id] - 1) * 0.2, ease: "backOut" }}
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
    `Level-order traversal visits a tree one depth level at a time: every node at depth 0 (the root), then every node at depth 1, then every node at depth 2, and so on, left to right within each level. It's also called Breadth-First Search (BFS) on a tree, and unlike pre-order, in-order, and post-order, it isn't defined recursively. It's naturally iterative, built around a queue instead of the call stack.`,
    `The algorithm starts by enqueueing the root. Then it repeatedly dequeues the front node, visits it, and enqueues that node's children (left, then right). Because a queue is FIFO, nodes come back out in exactly the order they were discovered, guaranteeing that an entire level finishes before the next one starts.`,
    `This queue-driven, level-by-level structure is why BFS is the traversal used whenever "closer" needs to mean something concrete: finding the shortest path in an unweighted tree/graph, computing a node's minimum depth, or serializing a tree in a way that's easy to reconstruct row by row (e.g. printing a tree layer by layer for display).`,
    `Level-order needs O(w) extra space for the queue, where w is the maximum width of the tree (the largest number of nodes at any single level). This can be as large as O(n) for a wide, shallow tree, unlike the O(h) stack space used by the recursive DFS traversals.`,
  ];

  const walkthrough = [
    { points: "Enqueue the root, 8. Queue: [8]" },
    { points: "Dequeue 8, visit it, enqueue its children 3 and 10. Queue: [3, 10]" },
    { points: "Dequeue 3, visit it, enqueue its children 1 and 6. Queue: [10, 1, 6]" },
    { points: "Dequeue 10, visit it; it has no children. Queue: [1, 6]" },
    { points: "Dequeue 1, visit it; it has no children. Queue: [6]" },
    { points: "Dequeue 6, visit it; it has no children. Queue is now empty, traversal ends" },
    { points: "Final sequence: [8, 3, 10, 1, 6]: notice level 0, then all of level 1, then all of level 2" },
  ];

  const algorithm = [
    { points: "If the root is null, return immediately, since there's nothing to traverse" },
    { points: "Create a queue and enqueue the root" },
    {
      points: "While the queue isn't empty, repeat:",
      subpoints: [
        "Dequeue the front node and visit it",
        "If it has a left child, enqueue it",
        "If it has a right child, enqueue it",
      ],
    },
  ];

  const complexity = [
    { points: "Time Complexity: Every node is enqueued and dequeued exactly once → O(n)." },
    { points: "Space Complexity: The queue can hold up to a full level's worth of nodes → O(w), up to O(n) worst case." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Level-order Traversal */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Level-order Traversal?
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
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>

          <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400 mb-4">
            {walkthrough.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                {item.points}
              </li>
            ))}
          </ol>

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
