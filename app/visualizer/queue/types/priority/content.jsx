"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// A priority queue is almost always a binary heap, so the diagram shows both
// faces of one: the tree that gives the log n behaviour, and the flat array it
// actually lives in.
const HEAP_W = 240;
const NODE_R = 17;
const LEAF_X = [30, 90, 150, 210];

const MARK_COLORS = {
  amber: "#f59e0b",
  violet: "#8b5cf6",
  emerald: "#10b981",
};

const nodePos = (idx) => {
  if (idx === 0) return { x: 120, y: 26 };
  if (idx <= 2) return { x: idx === 1 ? 60 : 180, y: 84 };
  return { x: LEAF_X[idx - 3], y: 142 };
};

const HeapDiagram = ({ nodes, marks = {}, keyPrefix }) => {
  const cellW = 26;
  const cellGap = 4;
  const arrayY = 182;
  const arrayStartX = (HEAP_W - (7 * (cellW + cellGap) - cellGap)) / 2;
  const height = 232;

  const colorFor = (idx) => MARK_COLORS[marks[idx]] || "#3b82f6";
  const isMarked = (idx) => Boolean(marks[idx]);

  return (
    <svg
      viewBox={`0 0 ${HEAP_W} ${height}`}
      className="mx-auto"
      style={{ width: `${HEAP_W}px`, maxWidth: "100%" }}
      role="img"
      aria-label="binary heap diagram"
    >
      {/* Edges first so the nodes sit on top of them */}
      {nodes.map((_, idx) => {
        if (idx === 0) return null;
        const parent = nodePos(Math.floor((idx - 1) / 2));
        const child = nodePos(idx);
        return (
          <line
            key={`${keyPrefix}-edge-${idx}`}
            x1={parent.x}
            y1={parent.y + NODE_R}
            x2={child.x}
            y2={child.y - NODE_R}
            className="stroke-gray-300 dark:stroke-gray-700"
            strokeWidth="1.5"
          />
        );
      })}

      {nodes.map((value, idx) => {
        const { x, y } = nodePos(idx);
        const color = colorFor(idx);
        return (
          <g key={`${keyPrefix}-node-${idx}`}>
            <circle
              cx={x}
              cy={y}
              r={NODE_R}
              fill={color}
              opacity={isMarked(idx) ? "0.9" : "0.25"}
              stroke={color}
              strokeWidth="2"
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              className="fill-gray-800 dark:fill-gray-100"
              fontSize="13"
              fontWeight="700"
            >
              {value}
            </text>
          </g>
        );
      })}

      <text
        x={arrayStartX}
        y={arrayY - 8}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
        fontFamily="monospace"
      >
        stored as an array
      </text>

      {Array.from({ length: 7 }).map((_, idx) => {
        const filled = idx < nodes.length;
        const color = colorFor(idx);
        const x = arrayStartX + idx * (cellW + cellGap);
        return (
          <g key={`${keyPrefix}-cell-${idx}`}>
            <rect
              x={x}
              y={arrayY}
              width={cellW}
              height={22}
              rx="4"
              fill={filled ? color : "none"}
              opacity={filled ? (isMarked(idx) ? "0.9" : "0.25") : "1"}
              stroke={filled ? color : "#94a3b8"}
              strokeWidth={filled ? "1.5" : "1"}
              strokeDasharray={filled ? undefined : "3 3"}
            />
            {filled && (
              <text
                x={x + cellW / 2}
                y={arrayY + 15}
                textAnchor="middle"
                className="fill-gray-800 dark:fill-gray-100"
                fontSize="11"
                fontWeight="700"
              >
                {nodes[idx]}
              </text>
            )}
            <text
              x={x + cellW / 2}
              y={arrayY + 34}
              textAnchor="middle"
              className="fill-gray-400 dark:fill-gray-500"
              fontSize="8"
              fontFamily="monospace"
            >
              {idx}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `A priority queue throws out the "first come, first served" rule that a normal queue follows. Every element carries a priority, and whichever element has the most urgent priority gets dequeued next; it doesn't matter how long it's been sitting there.`,
    `What makes it so useful is that it always hands you the most important item on demand, which is exactly what a lot of algorithms need. Under the hood it's usually built on a heap, though a balanced BST works too, and which one you pick depends on how the application balances insertion speed against extraction speed.`,
  ];

  const characteristic = [
    {
      points: "Priority-based ordering:",
      subpoints: [
        "Elements are processed by priority (highest first or lowest first)",
      ],
    },
    {
      points: "Two core operations:",
      subpoints: [
        "insert(item, priority) - Add with priority",
        "extractMax()/extractMin() - Remove highest/lowest priority item",
      ],
    },
    {
      points: "Peek operation:",
      subpoints: ["View highest/lowest priority item without removal"],
    },
    {
      points: "No FIFO guarantee:",
      subpoints: [
        "Equal priority elements may be processed in arbitrary order",
      ],
    },
  ];

  const implementation = [
    {
      points: "Binary Heap:",
      subpoints: [
        "Most common implementation",
        "O(log n) insert and extract",
        "O(1) peek",
        "Memory efficient",
      ],
    },
    {
      points: "Balanced Binary Search Tree:",
      subpoints: [
        "O(log n) all operations",
        "Supports more operations (like delete-by-value)",
        "Higher memory overhead",
      ],
    },
    {
      points: "Array (Unsorted):",
      subpoints: [
        "O(1) insert, O(n) extract",
        "Simple but inefficient for large datasets",
      ],
    },
    {
      points: "Fibonacci Heap:",
      subpoints: [
        "Amortized O(1) insert",
        "O(log n) extract",
        "Complex implementation",
      ],
    },
  ];

  // A max-heap: every parent outranks its children, which is all the ordering
  // a priority queue actually needs.
  const example = [
    {
      points:
        "A max-heap holding priorities 9, 7, 8, 3, 5. Every parent outranks its children, so the most urgent item is always at the root.",
      nodes: [9, 7, 8, 3, 5],
      marks: { 0: "emerald" },
    },
    {
      points:
        "insert(10): the new item is appended to the end of the array — index 5, whose parent is index 2 holding 8. 10 outranks 8, so the heap rule is broken.",
      nodes: [9, 7, 8, 3, 5, 10],
      marks: { 5: "amber", 2: "amber" },
    },
    {
      points:
        "Swap them. 10 is now at index 2, and its new parent is the root, 9 — still out of order, so it keeps climbing.",
      nodes: [9, 7, 10, 3, 5, 8],
      marks: { 2: "amber", 0: "amber" },
    },
    {
      points:
        "Swap again and 10 reaches the root. Two swaps for six elements — the climb is bounded by the height of the tree, not its size.",
      nodes: [10, 7, 9, 3, 5, 8],
      marks: { 0: "emerald" },
    },
    {
      points:
        "peek(): read the root. It is the highest priority by construction, so no searching is needed — this is the O(1) operation.",
      nodes: [10, 7, 9, 3, 5, 8],
      marks: { 0: "violet" },
    },
    {
      points:
        "extractMax(): 10 is returned and the last element, 8, is moved into the empty root. Now the root is too small, so it has to sink instead.",
      nodes: [8, 7, 9, 3, 5],
      marks: { 0: "amber", 1: "amber", 2: "amber" },
    },
    {
      points:
        "The larger child, 9, is promoted. The heap rule holds again and the queue is ready to serve the next highest priority.",
      nodes: [9, 7, 8, 3, 5],
      marks: { 0: "emerald" },
    },
  ];

  const complexity = [
    { points: "insert(): O(log n)" },
    { points: "extractMax()/extractMin(): O(log n)" },
    { points: "peek(): O(1)" },
    { points: "isEmpty(): O(1)" },
  ];

  const application = [
    { points: "Dijkstra's Algorithm: Finding shortest paths in graphs" },
    { points: "Huffman Coding: Data compression" },
    { points: "Operating Systems: Process scheduling" },
    { points: "Event-driven Simulation: Processing events in time order" },
    { points: "A* Search: Pathfinding in AI" },
    { points: "Bandwidth Management: Prioritizing network packets" },
  ];

  const special = [
    { points: "Min-Priority Queue: Extracts minimum priority first" },
    { points: "Max-Priority Queue: Extracts maximum priority first" },
    {
      points:
        "Double-Ended Priority Queue: Supports both min and max extraction",
    },
    { points: "Indexed Priority Queue: Allows priority updates by key" },
    { points: "Bounded Priority Queue: Fixed capacity with eviction policies" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is a Priority Queue? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is a Priority Queue?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* Key Characteristics */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Key Characteristics
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Priority queues have these fundamental properties:
            </p>
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {characteristic.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  {item.subpoints && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                      {item.subpoints.map((subitem, subindex) => (
                        <li
                          key={subindex}
                          className="text-gray-600 dark:text-gray-400"
                        >
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

        {/* How Does It Work? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              A priority queue does not keep its elements fully sorted — that
              would be far more work than the job needs. It only maintains one
              weaker rule: every parent outranks its children. That is a binary
              heap, and it is enough to guarantee the most urgent item is always
              at the root. Below, the tree and the array underneath it are the
              same six values — a node at index i keeps its children at 2i + 1
              and 2i + 2:
            </p>

            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {example.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  <div className="mt-3 not-prose">
                    <HeapDiagram
                      keyPrefix={`pq-step${index}`}
                      nodes={item.nodes}
                      marks={item.marks}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                Being compared or swapped
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-violet-500 inline-block"></span>
                Read by peek
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                Highest priority, heap valid
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                Waiting
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Both repair routines — climbing after an insert, sinking after an
              extract — only ever move along one path from root to leaf. That
              path is the height of the tree, so doubling the number of items
              adds just one extra step.
            </p>
          </div>
        </section>

        {/* Time Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time Complexity
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              For the usual binary heap implementation:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {complexity.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {item.points.split(":")[0]}:
                  </span>
                  <span className="ml-2">{item.points.split(":")[1]}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              This is the one queue type whose curve is not flat. The lower line
              is peek, which just reads the root. The upper line is insert and
              extract, which walk the height of the tree — still shallow, since
              1,000 items are only about 10 levels deep:
            </p>

            <div className="mt-8">
              <ComplexityGraph
                bestCase={() => 1}
                averageCase={(n) => Math.log2(n)}
                worstCase={(n) => Math.log2(n)}
                maxN={25}
              />
            </div>
          </div>
        </section>

        {/* Implementation Variations */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Implementation Variations
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Common implementation approaches:
            </p>
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {implementation.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-semibold">{item.points}</span>
                  {item.subpoints && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                      {item.subpoints.map((subitem, subindex) => (
                        <li
                          key={subindex}
                          className="text-gray-600 dark:text-gray-400"
                        >
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

        {/* Applications */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Applications
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Priority queues are used in:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {application.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Special Cases */}
        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Special Cases
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Interesting priority queue variations:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {special.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Additional Info */}
        <section className="p-6 border-t border-gray-100 dark:border-gray-700">
          <div className="prose dark:prose-invert max-w-none">
            <div className="px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraphs[1]}
              </p>
            </div>
          </div>
        </section>

        <InContentAd />
      </article>
      <NewsletterEmbed mobile theme={theme} />
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;
