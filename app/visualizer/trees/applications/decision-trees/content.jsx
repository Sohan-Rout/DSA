"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const nodes = [
    { id: "root", x: 110, y: 25, label: "?", color: "#3b82f6", sub: "temp ≤ 62.5" },
    { id: "leafNo", x: 55, y: 80, label: "No", color: "#ef4444", sub: "n=4" },
    { id: "mid", x: 165, y: 80, label: "?", color: "#3b82f6", sub: "temp ≤ 82.5" },
    { id: "leafYes", x: 130, y: 135, label: "Yes", color: "#10b981", sub: "n=6" },
    { id: "leafNo2", x: 200, y: 135, label: "No", color: "#ef4444", sub: "n=2" },
  ];
  const edges = [
    ["root", "leafNo", "≤"],
    ["root", "mid", ">"],
    ["mid", "leafYes", "≤"],
    ["mid", "leafNo2", ">"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 220 155" className="w-full max-w-md mx-auto">
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
          <circle cx={n.x} cy={n.y} r="14" fill={n.color} stroke="white" strokeWidth="2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">
            {n.label}
          </text>
          <text x={n.x} y={n.y + 25} textAnchor="middle" fontSize="8" className="fill-gray-500 dark:fill-gray-400">
            {n.sub}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `A decision tree makes predictions by asking a sequence of yes/no questions about the data, one per internal node, until it reaches a leaf that holds the answer. To classify a new example, start at the root, follow the branch that matches its features, and repeat at each node down to a leaf: the leaf's label is the prediction. The appeal is that the tree itself is readable: the path from root to leaf is a plain-language explanation of the decision.`,
    `Building the tree from data is a greedy, recursive process. At each node, every possible way of splitting the remaining data on a feature is scored by how well it separates the classes, using the standard measure of Gini impurity, which is 0 for a perfectly pure group (every example the same class) and higher the more mixed a group is. The split chosen is whichever one minimizes the weighted impurity of the two resulting groups.`,
    `That same scoring process then repeats independently inside each of the two new groups, splitting further and further until a stopping condition is met: usually that a group is already pure, or a maximum depth is reached, or too few examples remain to split meaningfully. The result is a tree where each split is locally optimal, even though the overall tree isn't guaranteed to be the single best possible tree for the data.`,
    `Decision trees are valued for being interpretable: a doctor, loan officer, or engineer can read the exact chain of thresholds that led to a prediction, unlike many other models. They're rarely used alone at the state of the art, but they're the building block of ensemble methods like Random Forests and Gradient Boosted Trees, which combine many decision trees to trade away some interpretability for substantially better accuracy.`,
  ];

  const algorithm = [
    { points: "Compute the impurity of the current node's data (how mixed the classes are)" },
    { points: "If the data is already pure, or a stopping condition (max depth, minimum samples) is met, make this node a leaf labeled with the majority class" },
    {
      points: "Otherwise, find the best split:",
      subpoints: [
        "Try splitting on candidate thresholds for the available feature(s)",
        "For each candidate, compute the weighted impurity of the two resulting groups",
        "Keep whichever split minimizes that weighted impurity",
      ],
    },
    { points: "Recurse into the left and right groups independently, building each subtree the same way" },
  ];

  const complexity = [
    { points: "Time Complexity: O(n · f · log n) to build, where n is the number of samples and f the number of features, since each level considers every feature and threshold across roughly n samples." },
    { points: "Space Complexity: O(n) for the tree in the worst case (one leaf per sample), though depth limits keep real trees far smaller." },
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
            What is a Decision Tree?
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
            Predicting "play outside?" from temperature: two splits fully separate the classes
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
              worstCase={(n) => n * n}
              maxN={20}
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
