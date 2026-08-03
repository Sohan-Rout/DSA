"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const nodes = [
    { id: "9", x: 110, y: 25 },
    { id: "5", x: 70, y: 72 },
    { id: "8", x: 150, y: 72 },
    { id: "2", x: 50, y: 119 },
    { id: "4", x: 90, y: 119 },
  ];
  const edges = [
    ["9", "5"],
    ["9", "8"],
    ["5", "2"],
    ["5", "4"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 200 155" className="w-full max-w-md mx-auto">
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
          {n.id === "9" && (
            <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          )}
          <circle cx={n.x} cy={n.y} r="14" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {n.id}
          </text>
        </motion.g>
      ))}

      <motion.text
        x="110"
        y="145"
        textAnchor="middle"
        fontSize="9"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="fill-gray-500 dark:fill-gray-400"
      >
        array: [9, 5, 8, 2, 4] — the same heap, stored flat
      </motion.text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Heap Sort sorts an array in place by first turning it into a max-heap — a binary tree where every parent is greater than or equal to its children — and then repeatedly removing the largest element (the root) and placing it at the end of the unsorted region. Because the largest remaining value is always at the root of a max-heap, this naturally produces the array in ascending order, one extraction at a time.`,
    `A binary heap doesn't need pointers or a separate tree structure at all — it can be stored directly in an array. For a node at index i, its children live at indices 2i+1 and 2i+2, and its parent lives at index floor((i-1)/2). This "implicit tree" is exactly what makes Heap Sort an in-place algorithm: the same array that holds the values also encodes the tree shape.`,
    `The algorithm runs in two phases. First, build a max-heap out of the entire array by sifting down every non-leaf node, starting from the last one and working back to the root — this bottom-up approach builds the heap in linear time. Second, repeatedly swap the root with the last element of the current heap, shrink the heap by one, and sift the new root down to restore the heap property. After n-1 extractions, the array is fully sorted.`,
    `Because it needs no extra memory beyond a few variables and never degrades on any input, Heap Sort is a reliable choice when worst-case O(n log n) time and O(1) space both matter — it's what backs priority queues, and shows up in hybrid sorts like introsort, which falls back to Heap Sort when Quick Sort's recursion gets too deep.`,
  ];

  const algorithm = [
    {
      points: "Build a max-heap from the array:",
      subpoints: [
        "Starting from the last non-leaf node down to the root, sift each node down so it and its descendants satisfy the heap property",
      ],
    },
    {
      points: "Repeatedly extract the maximum:",
      subpoints: [
        "Swap the root (largest value) with the last element of the current heap",
        "Shrink the heap size by one — that swapped element is now in its final sorted position",
        "Sift the new root down to restore the max-heap property",
      ],
    },
    { points: "Stop once the heap size reaches 1 — the array is fully sorted" },
  ];

  const complexity = [
    { points: "Best Case: O(n log n) — building the heap is O(n), and each of the n extractions costs O(log n)." },
    { points: "Average Case: O(n log n) — same shape of work regardless of the input's initial order." },
    { points: "Worst Case: O(n log n) — unlike Quick Sort, there's no pathological input that degrades this." },
    { points: "Space Complexity: O(1) — sorting happens in place within the array." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Heap Sort */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Heap Sort?
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
            A max-heap: every parent is ≥ its children, and the largest value sits at the root
          </div>
          <WalkthroughDiagram />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Root — always the maximum
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
              bestCase={(n) => n * Math.log2(n)}
              averageCase={(n) => n * Math.log2(n)}
              worstCase={(n) => n * Math.log2(n)}
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
