"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const lowbit = (i) => i & -i;
const BOX = 30;
const GAP = 6;

const ResponsibilityDiagram = () => {
  const N = 8;
  const maxLevel = 4;
  const arrayWidth = N * BOX + (N - 1) * GAP;

  return (
    <svg viewBox={`0 0 ${arrayWidth} ${maxLevel * 20 + 12}`} className="w-full max-w-md mx-auto">
      {Array.from({ length: N }, (_, idx) => idx + 1).map((i, order) => {
        const width = lowbit(i);
        const level = Math.log2(width);
        const startCol = i - width;
        const x = startCol * (BOX + GAP);
        const barWidth = width * BOX + (width - 1) * GAP;
        const y = maxLevel * 20 - level * 20 - 14;
        return (
          <motion.g
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 + order * 0.08, ease: "easeOut" }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            <rect x={x} y={y} width={barWidth} height="14" rx="4" fill="#60a5fa" opacity="0.7" />
            <text x={x + barWidth / 2} y={y + 10.5} textAnchor="middle" fontSize="8" fontWeight="700" fill="#1e293b">
              {i}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `A Fenwick Tree (also called a Binary Indexed Tree, or BIT) solves the same core problem a Segment Tree does, prefix/range sums with fast point updates, but with a much smaller footprint: one plain array, no explicit tree nodes or pointers at all. The "tree" is implicit, encoded entirely in the binary representation of each index.`,
    `Every index i in the BIT array is responsible for a range of the original array whose length is exactly the value of i's lowest set bit (its "lowbit"). Index 6 in binary is 110, whose lowest set bit is 2, so BIT[6] covers a range of 2 elements. Index 8 is 1000, whose lowest set bit is 8, so BIT[8] covers all 8 elements up to it. This single bit trick is the entire structure: no recursion, no children pointers, just index arithmetic.`,
    `Moving between indices uses that same lowbit value: adding it to an index walks up toward larger ranges (used when propagating a point update to every range that includes it), and subtracting it walks down toward smaller ranges (used when accumulating a prefix sum). Both walks take exactly O(log n) steps, because each step clears or sets one more bit in the index.`,
    `The tradeoff for this smaller footprint is flexibility: a Fenwick Tree's range query only works by combining prefix sums (range[l,r] = prefix(r) - prefix(l-1)), which requires the underlying operation to have an inverse. That works great for sum, but not for operations like minimum or maximum, which don't have an inverse, so a Segment Tree is needed for those instead.`,
  ];

  const algorithm = [
    { points: "Build: start with an all-zero BIT array, then apply a point update for every element of the input array" },
    {
      points: "Point Update(index, delta): add delta to the element at index:",
      subpoints: [
        "Convert to 1-indexed: i = index + 1",
        "While i is within bounds: add delta to BIT[i], then move to the next responsible index with i += lowbit(i)",
      ],
    },
    {
      points: "Prefix Sum(index): sum of everything from 0 to index:",
      subpoints: [
        "Convert to 1-indexed: i = index + 1",
        "While i > 0: add BIT[i] to the running total, then move down with i -= lowbit(i)",
      ],
    },
    { points: "Range Sum(l, r) = Prefix Sum(r) - Prefix Sum(l - 1)" },
  ];

  const complexity = [
    { points: "Build: O(n log n) naively (n point updates), or O(n) with a direct construction trick." },
    { points: "Point Update: O(log n), one walk upward through responsible ranges." },
    { points: "Prefix/Range Query: O(log n), one walk downward accumulating partial sums." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is a Fenwick Tree */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is a Fenwick Tree?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* How the implicit structure works */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does the Implicit Structure Work?
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>

          <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
            Each BIT index's responsibility range, sized by its lowest set bit
          </div>
          <ResponsibilityDiagram />

          <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
            {paragraphs[2]}
          </p>
        </section>

        {/* Tradeoff vs segment tree */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Fenwick Tree vs. Segment Tree
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[3]}
            </p>
          </div>
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
        <section className="p-6">
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
