"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const BuildDiagram = () => {
  const nodes = [
    { id: "0-3", label: "12", range: "[0,3]", x: 110, y: 25 },
    { id: "0-1", label: "7", range: "[0,1]", x: 60, y: 70 },
    { id: "2-3", label: "5", range: "[2,3]", x: 160, y: 70 },
    { id: "0-0", label: "2", range: "[0,0]", x: 35, y: 115, leaf: true },
    { id: "1-1", label: "5", range: "[1,1]", x: 85, y: 115, leaf: true },
    { id: "2-2", label: "1", range: "[2,2]", x: 135, y: 115, leaf: true },
    { id: "3-3", label: "4", range: "[3,3]", x: 185, y: 115, leaf: true },
  ];
  const edges = [
    ["0-3", "0-1"],
    ["0-3", "2-3"],
    ["0-1", "0-0"],
    ["0-1", "1-1"],
    ["2-3", "2-2"],
    ["2-3", "3-3"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 220 145" className="w-full max-w-md mx-auto">
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
      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r="15" fill={n.leaf ? "#10b981" : "#3b82f6"} stroke={n.leaf ? "#059669" : "#1d4ed8"} strokeWidth="2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">
            {n.label}
          </text>
          <text x={n.x} y={n.y - 20} textAnchor="middle" fontSize="7.5" fontWeight="600" className="fill-gray-500 dark:fill-gray-400">
            {n.range}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `A Segment Tree answers a question that neither a plain array nor a running-total (prefix-sum) array handles well at the same time: "what's the sum (or min, max, gcd...) of elements from index l to r?", while also supporting fast updates to individual elements. A prefix-sum array answers range queries in O(1), but a single update forces you to recompute every prefix after it — O(n) per update. A segment tree gets both operations down to O(log n).`,
    `Every node in a segment tree represents a contiguous range of the underlying array. Leaves represent single elements; every internal node represents the union of its two children's ranges, and stores the combined result of some associative operation (sum, min, max, etc.) over that whole range — computed once and cached, not recomputed from scratch on every query.`,
    `A range query works by decomposing the query range into a small number of these pre-combined node ranges. Starting from the root, if a node's range falls entirely outside the query, it's skipped. If it falls entirely inside the query, its cached value is used directly — no need to look at its children at all. Only when a node's range partially overlaps the query does the search recurse into both children. This decomposition never needs more than O(log n) nodes to cover any range.`,
    `A point update walks straight from the root down to the one leaf that needs to change, updates it, and then recomputes each ancestor's cached value on the way back up — exactly one path of length O(log n), touching nothing else in the tree.`,
  ];

  const algorithm = [
    { points: "Build: recursively split [l, r] at its midpoint until reaching single-element leaves, then combine each pair of children's results going back up" },
    {
      points: "Range Query(ql, qr) on the current node's range [l, r]:",
      subpoints: [
        "If [l, r] is entirely outside [ql, qr], return the operation's identity (0 for sum) and stop",
        "If [l, r] is entirely inside [ql, qr], return this node's cached value directly",
        "Otherwise, recurse into both children and combine their results",
      ],
    },
    { points: "Point Update(index, value): descend to the leaf for that index, set its value, then recompute every ancestor's cached value on the way back up" },
  ];

  const complexity = [
    { points: "Build: O(n) — every node is computed exactly once." },
    { points: "Range Query: O(log n) — at most a constant number of nodes per level are visited." },
    { points: "Point Update: O(log n) — exactly one root-to-leaf path is touched." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is a Segment Tree */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is a Segment Tree?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* Structure + diagram */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Is It Built?
          </h1>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>

          <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
            Sum segment tree built over [2, 5, 1, 4]
          </div>
          <BuildDiagram />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Leaf (single element)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Internal (cached range sum)
            </span>
          </div>
        </section>

        {/* How queries decompose */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does a Range Query Work?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[2]}
            </p>
          </div>
        </section>

        {/* Point updates */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does a Point Update Work?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[3]}
            </p>
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
        <section className="p-6">
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
      </article>
      <NewsletterEmbed mobile theme={theme} />
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;
