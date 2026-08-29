"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const KEY_W = 36;
const NODE_H = 30;

const BoxNode = ({ keys, x, y, fill = "#3b82f6", stroke = "#1d4ed8", ring, delay = 0 }) => {
  const width = keys.length * KEY_W;
  const left = x - width / 2;
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: "backOut" }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {ring && (
        <rect x={left - 4} y={y - NODE_H / 2 - 4} width={width + 8} height={NODE_H + 8} rx="9" fill="none" stroke={ring} strokeWidth="2" opacity="0.85" />
      )}
      <rect x={left} y={y - NODE_H / 2} width={width} height={NODE_H} rx="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {keys.slice(1).map((_, i) => (
        <line key={i} x1={left + (i + 1) * KEY_W} y1={y - NODE_H / 2} x2={left + (i + 1) * KEY_W} y2={y + NODE_H / 2} stroke={stroke} strokeWidth="1" opacity="0.6" />
      ))}
      {keys.map((k, i) => (
        <text key={i} x={left + i * KEY_W + KEY_W / 2} y={y + 5} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
          {k}
        </text>
      ))}
    </motion.g>
  );
};

const SplitDiagram = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
    <div>
      <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
        Node [10, 20, 30] is full: inserting 25 triggers a split
      </div>
      <svg viewBox="0 0 200 90" className="w-full max-w-xs mx-auto">
        <BoxNode keys={[10, 20, 30]} x={100} y={45} ring="#ef4444" delay={0.1} />
      </svg>
    </div>
    <div>
      <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
        Median 20 moves up; 25 lands in the right half
      </div>
      <svg viewBox="0 0 200 130" className="w-full max-w-xs mx-auto">
        <motion.path
          d="M 100 30 L 55 75"
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        <motion.path
          d="M 100 30 L 145 75"
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        <BoxNode keys={[20]} x={100} y={30} fill="#8b5cf6" stroke="#7c3aed" delay={0.15} />
        <BoxNode keys={[10]} x={55} y={80} delay={0.3} />
        <BoxNode keys={[25, 30]} x={150} y={80} fill="#10b981" stroke="#059669" delay={0.35} />
      </svg>
    </div>
  </div>
);

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `A B-Tree generalizes the Binary Search Tree by letting each node hold multiple sorted keys and have more than two children. Instead of "smaller left, larger right," a node with k keys has k+1 children, and each child's entire range of values falls between two adjacent keys in the parent (or before the first / after the last).`,
    `This wide branching factor is the entire point: B-Trees were designed for data that lives on disk, not in memory. Reading from disk is orders of magnitude slower than reading from RAM, and each disk read typically pulls in a whole block regardless of how much of it you actually need, so it makes sense to pack as many keys as possible into a single node/block and minimize the number of levels (and therefore disk reads) needed to find anything. This is exactly why B-Trees (and their variant, B+ Trees) are the standard on-disk index structure in databases like PostgreSQL and MySQL's InnoDB, and in filesystems like NTFS and ext4.`,
    `Every B-Tree has a minimum degree t that fixes its shape: every node (except the root) must hold at least t-1 keys and at most 2t-1 keys, giving it between t and 2t children. Crucially, every leaf sits at exactly the same depth: a B-Tree never becomes lopsided the way an unbalanced BST can, because it grows upward from the root instead of downward from the leaves.`,
    `Insertion needs O(1) extra space per split: no recursion stack proportional to the tree's key count, just a constant amount of bookkeeping per level the insertion touches, and the visualizer here uses t = 2 (so nodes can hold up to 3 keys) purely to keep the diagram small; real-world B-Trees typically use a t sized to match a disk block, often in the hundreds.`,
  ];

  const properties = [
    { title: "Every node holds sorted keys", body: "A node with k keys has exactly k+1 children, one for each gap between (and around) its keys." },
    { title: "Keys per node are bounded", body: "Every non-root node holds between t-1 and 2t-1 keys, where t is the tree's minimum degree." },
    { title: "All leaves are at the same depth", body: "Unlike a plain BST, a B-Tree grows in height only by splitting the root: every leaf is always exactly the same distance from the root." },
    { title: "Splits happen proactively", body: "This visualizer splits a full node on the way down before inserting into it, so a single insertion never has to backtrack up the tree." },
  ];

  const algorithm = [
    { points: "If the tree is empty, create a new leaf node holding just the new key" },
    { points: "If the root itself is full (has 2t-1 keys), split it first: this is the only way the tree grows taller" },
    {
      points: "Walk down from the root looking for the leaf where the key belongs. At each internal node:",
      subpoints: [
        "Find which child's range the key falls into",
        "If that child is full, split it before descending into it",
        "Move into that child and repeat",
      ],
    },
    { points: "Once a non-full leaf is reached, insert the key into its sorted position" },
  ];

  const complexity = [
    { points: "Time Complexity: Height is O(log_t n), so search, insert, and delete all cost O(log_t n)." },
    { points: "Disk I/O: Since each node is one block, height directly bounds the number of disk reads needed." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is a B-Tree */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is a B-Tree?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* Why B-Trees */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Why Use a B-Tree?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>
        </section>

        {/* Properties */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Key Properties
          </h2>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[2]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {properties.map((p) => (
              <div key={p.title} className="p-3 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-gray-800">
                <div className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">{p.title}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{p.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How a split works */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does a Node Split Work?
          </h2>
          <SplitDiagram />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border-2 border-red-500 inline-block"></span>
              Full node (violation)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-violet-500 inline-block"></span>
              Median key, promoted up
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
              Half that received the new key
            </span>
          </div>
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Algorithm Steps (Insertion)
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

          <div className="mt-6 px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 py-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[3]}
            </p>
          </div>
        </section>
      </article>
      <NewsletterEmbed mobile theme={theme} />
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;
