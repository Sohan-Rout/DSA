"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const ThreadDiagram = () => {
  const nodes = [
    { id: "8", x: 110, y: 30 },
    { id: "3", x: 70, y: 80 },
    { id: "1", x: 45, y: 130 },
    { id: "6", x: 90, y: 130 },
    { id: "10", x: 150, y: 80 },
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
          transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: "easeInOut" }}
        />
      ))}

      {/* temporary thread: 6 (in-order predecessor of 8) linked back to 8 */}
      <motion.path
        d={`M ${byId["6"].x} ${byId["6"].y} Q ${(byId["6"].x + byId["8"].x) / 2 + 40} ${(byId["6"].y + byId["8"].y) / 2} ${byId["8"].x} ${byId["8"].y}`}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd="url(#thread-arrow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
      />
      <defs>
        <marker id="thread-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#8b5cf6" />
        </marker>
      </defs>

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.12, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle
            cx={n.x}
            cy={n.y}
            r="14"
            fill={n.id === "6" || n.id === "8" ? "#8b5cf6" : "#3b82f6"}
            stroke={n.id === "6" || n.id === "8" ? "#7c3aed" : "#1d4ed8"}
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
    `Every traversal seen so far (pre-order, in-order, post-order, level-order) needs extra memory to remember "where to come back to": recursive traversals use the call stack, and level-order uses an explicit queue. Morris traversal is a clever technique that produces the exact same in-order sequence using O(1) extra space, no stack and no queue at all.`,
    `The trick is to temporarily repurpose the tree's own empty pointers to remember the way back. For any node with a left child, Morris traversal finds that node's in-order predecessor, the rightmost node in its left subtree, and threads a temporary link from the predecessor's (normally null) right pointer back to the current node. This thread is exactly the "return address" a stack frame or queue entry would otherwise store.`,
    `Once a node with a thread pointing at it is reached again, the algorithm recognizes the thread (its predecessor's right pointer already points at the current node), visits the node, and then removes the thread, restoring the original tree structure exactly as it was before traversal started. By the time the traversal finishes, no threads remain and the tree is completely unmodified.`,
    `Morris traversal needs O(1) extra space, with no recursion and no explicit stack or queue, which is exactly why it's used in memory-constrained environments or when a tree needs to stay usable by other code while being traversed without paying any extra memory cost.`,
  ];

  const algorithm = [
    { points: "Set curr to the root" },
    {
      points: "While curr is not null, repeat:",
      subpoints: [
        "If curr has no left child: visit curr, then move curr to curr.right",
        "Otherwise, find curr's in-order predecessor, the rightmost node in curr's left subtree",
        "If the predecessor's right pointer is null: thread it to curr (predecessor.right = curr), then move curr to curr.left",
        "If the predecessor's right pointer already points to curr: remove the thread (predecessor.right = null), visit curr, then move curr to curr.right",
      ],
    },
  ];

  const complexity = [
    { points: "Time Complexity: Each edge is traversed at most twice (once to create the thread, once to remove it) → O(n)." },
    { points: "Space Complexity: No recursion stack, no queue, only a couple of pointer variables → O(1)." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Morris Traversal */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Morris Traversal?
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

          <ThreadDiagram />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-violet-500 inline-block"></span>
              Predecessor & current node
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="18" height="8"><line x1="0" y1="4" x2="18" y2="4" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 3" /></svg>
              Temporary thread
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
