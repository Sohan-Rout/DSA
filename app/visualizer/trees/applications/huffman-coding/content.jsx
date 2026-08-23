"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const nodes = [
    { id: "8", x: 110, y: 25, label: "•" },
    { id: "a5", x: 60, y: 75, label: "a", leaf: true },
    { id: "3", x: 155, y: 75, label: "•" },
    { id: "b2", x: 130, y: 122, label: "b", leaf: true },
    { id: "c1", x: 180, y: 122, label: "c", leaf: true },
  ];
  const edges = [
    ["8", "a5", "0"],
    ["8", "3", "1"],
    ["3", "b2", "0"],
    ["3", "c1", "1"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 200 145" className="w-full max-w-md mx-auto">
      {edges.map(([from, to, bit], i) => {
        const midX = (byId[from].x + byId[to].x) / 2;
        const midY = (byId[from].y + byId[to].y) / 2;
        return (
          <g key={`${from}-${to}`}>
            <motion.path
              d={`M ${byId[from].x} ${byId[from].y} L ${byId[to].x} ${byId[to].y}`}
              fill="none"
              stroke="#818cf8"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: "easeInOut" }}
            />
            <motion.text
              x={midX}
              y={midY - 4}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="fill-indigo-500 dark:fill-indigo-400"
            >
              {bit}
            </motion.text>
          </g>
        );
      })}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.15, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r="14" fill={n.leaf ? "#10b981" : "#3b82f6"} stroke={n.leaf ? "#059669" : "#1d4ed8"} strokeWidth="2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Huffman coding compresses data by giving frequent symbols short binary codes and rare symbols longer ones, the opposite of fixed-width encodings like ASCII, where every character costs the same 8 bits regardless of how often it appears. The codes it produces are prefix-free: no character's code is a prefix of another's, which means a stream of bits can be decoded unambiguously without any separators between codes.`,
    `The codes come directly out of a binary tree built specifically for this purpose. Every leaf holds one symbol, and a symbol's code is the sequence of left/right turns (0s and 1s) on the path from the root down to its leaf. Because frequent symbols end up near the root and rare ones get pushed deeper, frequent symbols naturally get shorter codes.`,
    `That tree is built greedily, bottom-up: start with every symbol as its own single-node tree, weighted by its frequency. Repeatedly take the two trees with the smallest total weight and merge them under a new parent node (weight = the sum of the two), putting the result back into the pool. After enough merges only one tree remains, the Huffman tree, and it's provably optimal: no other prefix-free code achieves a shorter total encoded length for that exact frequency distribution.`,
    `Huffman coding is a building block inside many real compression formats: it's the final entropy-coding stage in DEFLATE (used by ZIP and gzip), JPEG, and MP3, typically applied after some other transform has already reduced redundancy in the data.`,
  ];

  const algorithm = [
    { points: "Count how often each symbol appears in the input" },
    { points: "Put every symbol into a priority queue as a single-node tree, ordered by frequency" },
    {
      points: "Repeat until one tree remains:",
      subpoints: [
        "Remove the two trees with the smallest frequency",
        "Merge them under a new internal node whose frequency is their sum",
        "Insert the merged tree back into the queue",
      ],
    },
    { points: "Assign each symbol's code by reading the path from the root to its leaf, using 0 for left and 1 for right" },
  ];

  const complexity = [
    { points: "Time Complexity: O(n log n), where n is the number of distinct symbols, since each of the n-1 merges costs O(log n) with a priority queue." },
    { points: "Space Complexity: O(n) for the tree and the code table." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is it */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Huffman Coding?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* How it works */}
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
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[2]}
            </p>
          </div>

          <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
            a is frequent and gets the short code 0; b and c are rarer and get longer codes 10, 11
          </div>
          <WalkthroughDiagram />
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
