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
    { id: "1", x: 50, y: 130 },
    { id: "6", x: 90, y: 130 },
  ];
  const edges = [
    ["8", "3"],
    ["8", "10"],
    ["3", "1"],
    ["3", "6"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 200 165" className="w-full max-w-md mx-auto">
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
          <circle cx={n.x} cy={n.y} r="14" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {n.id}
          </text>
        </motion.g>
      ))}

      <motion.text
        x="110"
        y="160"
        textAnchor="middle"
        fontSize="9"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fill-gray-500 dark:fill-gray-400"
      >
        8,3,1,null,null,6,null,null,10,null,null
      </motion.text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Serialization converts a tree into a flat string (or byte stream) that can be saved to disk, sent over a network, or stored in a database. Deserialization is the reverse: reading that string back and rebuilding a tree that's structurally identical to the original: same shape, same values, same left/right placement everywhere.`,
    `The tricky part isn't encoding the values; it's encoding the *shape*. A plain list of values loses information about which nodes were children of which, and where branches were missing. The standard fix is to explicitly record empty children with a marker (commonly "null" or "#") at every point a node is absent, using a preorder traversal: visit the node, then recurse left, then recurse right, writing a marker whenever a child doesn't exist.`,
    `Because every empty spot is explicitly recorded, deserialization can rebuild the exact structure by reading tokens in that same preorder sequence: read one token, and if it's a null marker, that subtree is empty; otherwise create a node from it, then recursively build its left child from the next tokens, then its right child. The reader never needs to guess where one subtree ends and another begins.`,
    `This pattern shows up anywhere tree-shaped data needs to survive outside memory: saving a game's scene graph, sending a parsed expression tree between services, caching a computed index structure, or simply persisting any hierarchical data model to JSON or a file.`,
  ];

  const algorithm = [
    {
      points: "Serialize (preorder, with null markers):",
      subpoints: [
        "If the current node is empty, write a null marker and return",
        "Otherwise, write the node's value",
        "Recurse into the left child, then the right child",
      ],
    },
    {
      points: "Deserialize (read tokens in the same order they were written):",
      subpoints: [
        "Read the next token",
        "If it's a null marker, this subtree is empty, so return immediately",
        "Otherwise, create a node from it, then recursively read its left child, then its right child",
      ],
    },
  ];

  const complexity = [
    { points: "Time Complexity: O(n) for both serialize and deserialize, since every node and every null marker is visited exactly once." },
    { points: "Space Complexity: O(n) for the output string, plus O(h) recursion stack for the traversal." },
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Serialization?
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
            Preorder with null markers: visit 8, then 3, then 1 (both children null), back up, 6 (both children null), back up, 10 (both children null)
          </div>
          <WalkthroughDiagram />
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
              bestCase={(n) => n}
              averageCase={(n) => n}
              worstCase={(n) => n}
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
