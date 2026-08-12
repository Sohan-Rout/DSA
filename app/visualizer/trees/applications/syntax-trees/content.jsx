"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
import { motion } from "framer-motion";

const WalkthroughDiagram = () => {
  const nodes = [
    { id: "plus", x: 110, y: 25, label: "+", leaf: false },
    { id: "3", x: 60, y: 75, label: "3", leaf: true },
    { id: "mul", x: 155, y: 75, label: "*", leaf: false },
    { id: "4", x: 125, y: 122, label: "4", leaf: true },
    { id: "minus", x: 185, y: 122, label: "-", leaf: false },
    { id: "2", x: 165, y: 155, label: "2", leaf: true },
    { id: "1", x: 205, y: 155, label: "1", leaf: true },
  ];
  const edges = [
    ["plus", "3"],
    ["plus", "mul"],
    ["mul", "4"],
    ["mul", "minus"],
    ["minus", "2"],
    ["minus", "1"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 220 170" className="w-full max-w-md mx-auto">
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
          transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease: "backOut" }}
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
    `A syntax tree (also called an expression tree, or more generally an Abstract Syntax Tree/AST) captures the grammatical structure of an expression or piece of code, rather than its raw text. For arithmetic expressions specifically, every operator becomes an internal node with its operands as children, and every literal value becomes a leaf. The shape of the tree, not the order characters appear on the page, is what encodes precedence and grouping.`,
    `Building one from an infix expression like "3 + 4 * (2 - 1)" requires a parser that respects operator precedence and parentheses: multiplication and division bind tighter than addition and subtraction, and anything inside parentheses is parsed as its own self-contained sub-expression first. A common approach is recursive-descent parsing: one function handles addition/subtraction terms, which calls another handling multiplication/division factors, which calls another handling numbers and parenthesized groups, and this recursive call structure mirrors the grammar's precedence levels directly.`,
    `Once built, the tree makes evaluation and notation conversion almost mechanical, because each is just a different tree traversal. Evaluating the expression is a post-order traversal: recursively compute both children's values first, then apply the operator to combine them, since by the time an operator node is processed, both its operands are already known. Reading the tree with a pre-order traversal produces prefix notation, and post-order traversal produces postfix notation; both eliminate the need for parentheses or precedence rules entirely, since the tree structure alone determines evaluation order.`,
    `Syntax trees are the intermediate representation nearly every compiler and interpreter builds after parsing source code, before generating machine code or bytecode from it. The same idea powers calculator apps, spreadsheet formula engines, and query planners in databases: anywhere text needs to become something with an unambiguous, machine-processable structure.`,
  ];

  const algorithm = [
    { points: "Tokenize the input into numbers, operators, and parentheses" },
    {
      points: "Parse recursively, respecting precedence:",
      subpoints: [
        "Parse an expression as a sequence of terms joined by + or -",
        "Parse a term as a sequence of factors joined by * or /",
        "Parse a factor as either a number, or a parenthesized sub-expression parsed from scratch",
      ],
    },
    { points: "Each operator encountered becomes an internal node whose children are the two operands just parsed" },
    { points: "To evaluate: post-order traverse the tree, computing both children before applying the operator at each node" },
  ];

  const complexity = [
    { points: "Parsing Time: O(n), since each token is consumed exactly once by the recursive-descent parser." },
    { points: "Evaluation Time: O(n), since each node in the tree is visited exactly once during the post-order traversal." },
    { points: "Space Complexity: O(n) for the tree, plus O(h) recursion stack depth for parsing and evaluating." },
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
            What is a Syntax Tree?
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
            The syntax tree for 3 + 4 * (2 - 1): its shape alone encodes precedence, no parentheses needed
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
