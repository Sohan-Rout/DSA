"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const TrieDiagram = () => {
  const nodes = [
    { id: "root", label: "•", x: 110, y: 20, end: false },
    { id: "c", label: "c", x: 60, y: 60, end: false },
    { id: "d", label: "d", x: 160, y: 60, end: false },
    { id: "ca", label: "a", x: 60, y: 100, end: false },
    { id: "do", label: "o", x: 160, y: 100, end: false },
    { id: "car", label: "r", x: 35, y: 140, end: true },
    { id: "cat", label: "t", x: 85, y: 140, end: true },
    { id: "dog", label: "g", x: 160, y: 140, end: true },
  ];
  const edges = [
    ["root", "c", "c"],
    ["root", "d", "d"],
    ["c", "ca", "a"],
    ["d", "do", "o"],
    ["ca", "car", "r"],
    ["ca", "cat", "t"],
    ["do", "dog", "g"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 220 165" className="w-full max-w-md mx-auto">
      {edges.map(([from, to, ch], i) => {
        const a = byId[from];
        const b = byId[to];
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        return (
          <g key={`${from}-${to}`}>
            <motion.path
              d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
              fill="none"
              stroke="#818cf8"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: "easeInOut" }}
            />
            <rect x={midX - 7} y={midY - 8} width="14" height="14" rx="4" className="fill-white dark:fill-neutral-950" />
            <text x={midX} y={midY + 4} textAnchor="middle" fontSize="9" fontWeight="700" className="fill-gray-600 dark:fill-gray-300">
              {ch}
            </text>
          </g>
        );
      })}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r="13" fill={n.end ? "#10b981" : "#3b82f6"} stroke={n.end ? "#059669" : "#1d4ed8"} strokeWidth="2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">
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
    `A Trie (pronounced "try", from re-"trie"-val, and also called a Prefix Tree) stores a set of strings by turning shared prefixes into shared paths through the tree. Unlike a BST, a trie doesn't store a whole key per node — each edge represents a single character, and the string you get by reading the characters from the root down to any node is that node's prefix. A small boolean flag on a node marks whether the prefix ending there is also a complete word that was inserted.`,
    `This "shared paths for shared prefixes" structure is what makes tries so effective for prefix-based operations: "cat" and "car" and "cart" all share the same "ca"/"car" path and only branch where they actually differ. That single property is why tries are the standard structure behind autocomplete and search-as-you-type suggestions, spell-checkers, and IP routing tables (where the longest matching prefix determines the route) — all workloads built entirely around "find everything starting with X."`,
    `Both insertion and search walk one character at a time from the root: insertion follows existing edges where they already exist and creates new nodes only where the path doesn't yet exist, then marks the final node as end-of-word. Search does the same walk — if it ever needs an edge that doesn't exist, the word (or prefix) definitely isn't in the trie; if it reaches the end of the word, it still has to check that node's end-of-word flag, because the path existing only proves the string is a prefix of something, not that it was inserted as its own word.`,
    `Both operations run in O(L) time, where L is the length of the word — not O(log n) or O(n) in terms of how many words are already stored. A hash set can also do exact lookups in roughly that time, but it can't efficiently answer "what words start with this prefix" the way a trie can, since a matching prefix's subtree already holds exactly the words that share it.`,
  ];

  const algorithm = [
    { points: "Insertion: start at the root; for each character in the word, follow the matching child edge if it exists, or create a new node for it if it doesn't; after the last character, mark that node as end-of-word" },
    { points: "Search: start at the root; for each character, follow the matching child edge — if it's missing at any point, the word isn't in the trie" },
    { points: "If every character is matched, the word is in the trie only if the final node's end-of-word flag is set — otherwise it's merely a prefix of other stored words" },
  ];

  const complexity = [
    { points: "Time Complexity: Insertion and search both cost O(L), where L is the word's length." },
    { points: "Space Complexity: Up to O(total characters) across all inserted words, though shared prefixes reduce this in practice." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is a Trie */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is a Trie (Prefix Tree)?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* Why use a Trie + diagram */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Why Use a Trie?
          </h1>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>

          <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
            "cat", "car", "cart", and "dog" stored in one trie
          </div>
          <TrieDiagram />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Character node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              End of a word
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
            {paragraphs[2]}
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
              bestCase={(n) => Math.min(n, 12)}
              averageCase={(n) => Math.min(n, 12)}
              worstCase={(n) => Math.min(n, 12)}
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
