"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const MiniTree = ({ nodes, edges, keyPrefix }) => {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
      {edges.map(([from, to], i) => (
        <motion.path
          key={`${keyPrefix}-${from}-${to}`}
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
          key={`${keyPrefix}-${n.id}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.15, ease: "backOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          {n.ring && (
            <circle cx={n.x} cy={n.y} r="18" fill="none" stroke={n.ring} strokeWidth="2" opacity="0.85" />
          )}
          <circle cx={n.x} cy={n.y} r="14" fill={n.fill} stroke={n.stroke} strokeWidth="2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
            {n.id}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

const RED_FILL = "#ef4444";
const RED_STROKE = "#b91c1c";
const BLACK_FILL = "#1e293b";
const BLACK_STROKE = "#020617";

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `A Red-Black Tree is a self-balancing Binary Search Tree that keeps itself roughly balanced by coloring every node either red or black and enforcing a small set of rules about how those colors can be arranged. Unlike an AVL tree, which balances strictly by height, a Red-Black Tree balances by color, and that looser constraint is exactly what makes it cheaper to maintain.`,
    `The five rules (the "red-black properties") together guarantee that the longest possible root-to-leaf path is never more than twice as long as the shortest one. That's a weaker balance guarantee than AVL's, but it's enough to keep every operation at O(log n), and it means Red-Black Trees need at most one or two rotations per insertion or deletion, compared to AVL, which can cascade rotations back up the tree. This is why Red-Black Trees are the default choice inside C++'s \`std::map\`/\`std::set\`, Java's \`TreeMap\`/\`TreeSet\`, and the Linux kernel's process scheduler and virtual memory management.`,
    `Insertion always starts the same way a plain BST insertion does, and the new node is always colored red. Coloring it red (rather than black) means it can never violate the "same black-height on every path" rule by itself: the only rule a fresh red leaf can break is "a red node can't have a red parent." If that happens, a fixup procedure runs, walking back up the tree recoloring nodes and, when recoloring alone isn't enough, performing at most two rotations to restore all five properties.`,
    `Insertion (with fixup) needs O(1) extra space beyond the recursion/loop state: only a constant number of pointers get rewired or recolored, no matter how large the tree is.`,
  ];

  const properties = [
    { title: "1. Every node is red or black", body: "Each node stores one extra bit of information: its color." },
    { title: "2. The root is always black", body: "If an insertion colors the root red, it's flipped back to black once the fixup finishes." },
    { title: "3. Every NIL leaf is black", body: "The (implicit) null children at the bottom of the tree are treated as black leaves." },
    { title: "4. No red node has a red child", body: "Two reds can never appear back-to-back on any path; this is the rule a new red insertion can violate." },
    { title: "5. Equal black-height on every path", body: "Every path from a node to any of its descendant NIL leaves passes through the same number of black nodes." },
  ];

  const beforeNodes = [
    { id: "10", x: 100, y: 30, fill: BLACK_FILL, stroke: BLACK_STROKE, ring: "#ef4444" },
    { id: "5", x: 60, y: 80, fill: RED_FILL, stroke: RED_STROKE, ring: "#ef4444" },
    { id: "3", x: 40, y: 130, fill: RED_FILL, stroke: RED_STROKE },
  ];
  const beforeEdges = [
    ["10", "5"],
    ["5", "3"],
  ];

  const afterNodes = [
    { id: "5", x: 100, y: 30, fill: BLACK_FILL, stroke: BLACK_STROKE },
    { id: "3", x: 60, y: 80, fill: RED_FILL, stroke: RED_STROKE },
    { id: "10", x: 140, y: 80, fill: RED_FILL, stroke: RED_STROKE },
  ];
  const afterEdges = [
    ["5", "3"],
    ["5", "10"],
  ];

  const algorithm = [
    { points: "Insert the new node the normal BST way, and color it red" },
    {
      points: "While the new node's parent is red (property 4 is violated), look at the uncle (the grandparent's other child):",
      subpoints: [
        "Uncle is red → recolor the parent and uncle to black, the grandparent to red, then continue fixing up from the grandparent",
        "Uncle is black (or missing) and the node forms a 'zig-zag' with its parent → rotate at the parent first to straighten it into a line",
        "Uncle is black (or missing) and the node forms a straight line with its parent → recolor parent black and grandparent red, then rotate at the grandparent",
      ],
    },
    { points: "Color the root black (in case it was colored red during the loop)" },
  ];

  const complexity = [
    { points: "Best/Average/Worst Case: Height is always O(log n) → O(log n)." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is a Red-Black Tree */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is a Red-Black Tree?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* Properties */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            The Five Red-Black Properties
          </h1>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {properties.map((p) => (
              <div
                key={p.title}
                className="p-3 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-gray-800"
              >
                <div className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">
                  {p.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{p.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How fixup works */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does Insertion Fix a Violation?
          </h1>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[2]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
                Inserting 3 creates a red-red violation (5 → 3)
              </div>
              <MiniTree keyPrefix="before" nodes={beforeNodes} edges={beforeEdges} />
            </div>
            <div>
              <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-2">
                A right rotation at 10 fixes it, black-height unchanged
              </div>
              <MiniTree keyPrefix="after" nodes={afterNodes} edges={afterEdges} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              Red node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-800 inline-block"></span>
              Black node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-red-500 inline-block"></span>
              Violation (red parent, red child)
            </span>
          </div>
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Algorithm Steps (Insertion)
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
              worstCase={(n) => Math.log2(n)}
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
