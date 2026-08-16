"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// Each node is drawn as a data cell plus a next cell holding the address it
// points at, so the links the algorithm rewires are literally readable.
// Addresses are keyed by value so a node keeps the same one across every step.
const ADDRESSES = { 10: "0x1A", 20: "0x2F", 30: "0x3C" };

const DATA_W = 28;
const NEXT_W = 36;
const NODE_W = DATA_W + NEXT_W;
const NODE_H = 34;
const GAP = 14;
const PITCH = NODE_W + GAP;
const PAD_X = 8;
const TOP_PAD = 30;
const SLOTS = 3;

const LinkedQueueDiagram = ({ nodes, arrived, freed, keyPrefix }) => {
  const offset = freed ? 1 : 0;
  const width = PAD_X * 2 + SLOTS * PITCH - GAP;
  const nodeY = TOP_PAD;
  const addrY = nodeY + NODE_H + 11;
  const noteY = nodeY + NODE_H + 24;
  const footerY = nodeY + NODE_H + 40;
  const height = footerY + 8;

  const slotX = (slot) => PAD_X + slot * PITCH;
  const nodeX = (idx) => slotX(idx + offset);
  const midY = nodeY + NODE_H / 2;

  const isEmpty = nodes.length === 0;
  const colorFor = (idx) => (idx === arrived ? "#10b981" : "#3b82f6");
  const addrOf = (value) => ADDRESSES[value] ?? "0x??";

  const pointerLabel = (x, text, color, className) => (
    <>
      <text
        x={x}
        y="10"
        textAnchor="middle"
        className={className}
        fontSize="10"
        fontWeight="700"
      >
        {text}
      </text>
      <line
        x1={x}
        y1="14"
        x2={x}
        y2={nodeY - 3}
        stroke={color}
        strokeWidth="1.5"
        markerEnd={`url(#${keyPrefix}-${text}-arrow)`}
      />
    </>
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="linked list queue"
    >
      <defs>
        <marker
          id={`${keyPrefix}-front-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#3b82f6" />
        </marker>
        <marker
          id={`${keyPrefix}-rear-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#10b981" />
        </marker>
        <marker
          id={`${keyPrefix}-link-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
        </marker>
      </defs>

      {isEmpty ? (
        <>
          <text
            x={PAD_X + 34}
            y="10"
            textAnchor="middle"
            className="fill-blue-500 dark:fill-blue-400"
            fontSize="10"
            fontWeight="700"
          >
            front / rear
          </text>
          <line
            x1={PAD_X + 34}
            y1="14"
            x2={PAD_X + 34}
            y2={nodeY - 3}
            stroke="#3b82f6"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-front-arrow)`}
          />
          <rect
            x={PAD_X}
            y={nodeY}
            width={68}
            height={NODE_H}
            rx="6"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x={PAD_X + 34}
            y={midY + 4}
            textAnchor="middle"
            className="fill-gray-400 dark:fill-gray-500"
            fontSize="11"
            fontFamily="monospace"
          >
            null
          </text>
        </>
      ) : (
        <>
          {pointerLabel(
            nodeX(0) + DATA_W / 2,
            "front",
            "#3b82f6",
            "fill-blue-500 dark:fill-blue-400"
          )}
          {nodes.length > 1 &&
            pointerLabel(
              nodeX(nodes.length - 1) + DATA_W / 2,
              "rear",
              "#10b981",
              "fill-emerald-500 dark:fill-emerald-400"
            )}
        </>
      )}

      {/* The detached node keeps its old spot with its link already cut */}
      {freed && (
        <g>
          <rect
            x={slotX(0)}
            y={nodeY}
            width={NODE_W}
            height={NODE_H}
            rx="6"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.8"
          />
          <text
            x={slotX(0) + DATA_W / 2}
            y={midY + 4}
            textAnchor="middle"
            className="fill-gray-400 dark:fill-gray-500"
            fontSize="13"
            fontWeight="700"
          >
            {freed}
          </text>
          <text
            x={slotX(0) + NODE_W / 2}
            y={addrY}
            textAnchor="middle"
            className="fill-gray-400 dark:fill-gray-500"
            fontSize="8"
            fontFamily="monospace"
          >
            {addrOf(freed)}
          </text>
          <text
            x={slotX(0) + NODE_W / 2}
            y={noteY}
            textAnchor="middle"
            className="fill-amber-600 dark:fill-amber-400"
            fontSize="9"
            fontFamily="monospace"
            fontWeight="700"
          >
            detached
          </text>
        </g>
      )}

      {nodes.map((value, idx) => {
        const x = nodeX(idx);
        const color = colorFor(idx);
        const isLast = idx === nodes.length - 1;
        return (
          <g key={`${keyPrefix}-node-${idx}`}>
            <rect
              x={x}
              y={nodeY}
              width={NODE_W}
              height={NODE_H}
              rx="6"
              fill={color}
              opacity={idx === arrived || idx === 0 ? "0.9" : "0.25"}
              stroke={color}
              strokeWidth="2"
            />
            <line
              x1={x + DATA_W}
              y1={nodeY}
              x2={x + DATA_W}
              y2={nodeY + NODE_H}
              stroke={color}
              strokeWidth="1.5"
              opacity="0.7"
            />
            <text
              x={x + DATA_W / 2}
              y={midY + 5}
              textAnchor="middle"
              className="fill-gray-800 dark:fill-gray-100"
              fontSize="13"
              fontWeight="700"
            >
              {value}
            </text>

            {/* next holds the address of the following node, or null */}
            <text
              x={x + DATA_W + NEXT_W / 2}
              y={midY + 4}
              textAnchor="middle"
              className="fill-gray-700 dark:fill-gray-200"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="700"
            >
              {isLast ? "null" : addrOf(nodes[idx + 1])}
            </text>

            {/* This node's own address in memory */}
            <text
              x={x + NODE_W / 2}
              y={addrY}
              textAnchor="middle"
              className="fill-gray-400 dark:fill-gray-500"
              fontSize="8"
              fontFamily="monospace"
            >
              {addrOf(value)}
            </text>

            {!isLast && (
              <line
                x1={x + NODE_W + 1}
                y1={midY}
                x2={nodeX(idx + 1) - 3}
                y2={midY}
                stroke="#94a3b8"
                strokeWidth="1.5"
                markerEnd={`url(#${keyPrefix}-link-arrow)`}
              />
            )}
          </g>
        );
      })}

      {arrived !== undefined && nodes.length > 1 && (
        <text
          x={nodeX(arrived) + NODE_W / 2}
          y={noteY}
          textAnchor="middle"
          className="fill-emerald-600 dark:fill-emerald-400"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="700"
        >
          new node
        </text>
      )}

      {/* The pointers are just addresses — spelling them out is the point */}
      <text
        x={PAD_X}
        y={footerY}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
        fontFamily="monospace"
      >
        front = {isEmpty ? "null" : addrOf(nodes[0])}, rear ={" "}
        {isEmpty ? "null" : addrOf(nodes[nodes.length - 1])}, size{" "}
        {nodes.length}
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `Building a queue on top of a linked list sidesteps the fixed-capacity problem that array-backed queues have: nodes get allocated on demand, so the queue can keep growing as long as there's memory available.`,
    `Two pointers are all it takes to manage it: a front pointer that tracks the node to dequeue next, and a rear pointer that tracks where new nodes get attached during an enqueue.`,
    `Linked list queues are particularly useful when the maximum size isn't known in advance or when frequent insertions/deletions are required.`,
  ];

  const implementationSteps = [
    { points: "Define a Node class with data and next pointer attributes" },
    { points: "Create Queue class with front and rear pointers initialized to null" },
    { points: "Implement enqueue by adding nodes at the rear" },
    { points: "Implement dequeue by removing nodes from the front" },
    { points: "Maintain proper pointer connections during operations" },
  ];

  const enqueueAlgorithm = [
    { points: "Create a new node with the given data" },
    { points: "If queue is empty, set both front and rear to the new node" },
    { points: "Else, set rear.next to the new node and update rear pointer" },
    { points: "Increment the size counter" },
  ];

  const dequeueAlgorithm = [
    { points: "Check if queue is empty (front === null)" },
    { points: "Store the front node to return later" },
    { points: "Move front pointer to front.next" },
    { points: "If front becomes null (queue is now empty), set rear to null" },
    { points: "Decrement the size counter" },
    { points: "Return the stored node's data" },
  ];

  const example = [
    {
      points:
        "An empty queue is just two null pointers. There is no array to allocate and no capacity to pick up front.",
      nodes: [],
    },
    {
      points:
        "enqueue(10): memory hands back a node at 0x1A. The queue was empty, so both front and rear now store that address, and the node's next is null.",
      nodes: [10],
      arrived: 0,
    },
    {
      points:
        "enqueue(20): the new node lives at 0x2F, so 0x1A's next is changed from null to 0x2F and rear is updated to 0x2F. front still holds 0x1A and never had to be touched.",
      nodes: [10, 20],
      arrived: 1,
    },
    {
      points:
        "enqueue(30): the same two writes again — 0x2F's next becomes 0x3C, and rear becomes 0x3C. Nothing scans the list looking for the end, because rear already holds its address; that is what keeps enqueue O(1).",
      nodes: [10, 20, 30],
      arrived: 2,
    },
    {
      points:
        "dequeue(): front is overwritten with the address stored in 0x1A's next, which is 0x2F. The node at 0x1A is now unreachable from the queue and can be freed. No other node moved, and none of the addresses changed.",
      nodes: [20, 30],
      freed: 10,
    },
  ];

  const complexity = [
    { points: "Enqueue Operation: O(1) - Constant time to add at tail" },
    { points: "Dequeue Operation: O(1) - Constant time to remove from head" },
    { points: "Peek Operation: O(1) - Direct access via front pointer" },
    { points: "Space Usage: O(n) - Linear space for storing elements plus pointer overhead" },
  ];

  const prosCons = [
    { points: "Pros: No fixed size limitation - grows dynamically" },
    { points: "Pros: Efficient O(1) operations for both enqueue and dequeue" },
    { points: "Pros: No wasted memory (only allocates what's needed)" },
    { points: "Cons: Extra memory for node pointers (next references)" },
    { points: "Cons: Not cache-friendly (nodes may be scattered in memory)" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Queue Linked List Implementation Overview */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Queue Implementation Using Linked List
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[0]}
            </p>
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
              Every node sits somewhere in memory at its own address, shown in
              grey underneath it. Each box has two cells: the value on the left,
              and on the right the <span className="font-mono">next</span> field
              — which does not contain the following node, only{" "}
              <em>the address where it lives</em>. The queue itself stores
              nothing but two addresses of its own, front and rear. The
              addresses below are made up and kept short for readability; real
              ones are much longer, but they behave exactly like this:
            </p>

            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {example.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  <div className="mt-3 not-prose">
                    <LinkedQueueDiagram
                      keyPrefix={`lq-step${index}`}
                      nodes={item.nodes}
                      arrived={item.arrived}
                      freed={item.freed}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Node just allocated
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm border-2 border-dashed border-amber-500 inline-block"></span>
                Detached by dequeue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                In the queue
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Follow one address through the whole sequence and the structure
              gives itself away: 0x2F is written into 0x1A&apos;s next field in
              step 3, is held by rear in step 3, and becomes the new front in
              step 5 — all without the node at 0x2F ever moving. A linked list
              is reordered by rewriting addresses, never by relocating data.
              That is also why the nodes need not be next to each other in
              memory at all.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Compare this with the array version. There, the capacity is fixed
              at creation and dequeued slots strand behind front unless the
              indices wrap around. Here the queue only ever holds as many nodes
              as it needs, and a dequeued node is handed straight back to
              memory. The trade is in the next reference itself: every element
              costs an extra pointer, and because nodes are allocated separately
              they can end up scattered in memory rather than sitting
              contiguously the way array elements do.
            </p>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Implementation Steps
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {implementationSteps.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Enqueue Algorithm */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Enqueue Algorithm
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {enqueueAlgorithm.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Dequeue Algorithm */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Dequeue Algorithm
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {dequeueAlgorithm.map((item, index) => (
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
            Time & Space Complexity
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {complexity.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {item.points.split(':')[0]}:
                  </span>
                  <span className="ml-2">{item.points.split(':')[1]}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Both ends are held by a pointer, so neither operation ever walks
              the list. The cost stays flat however long the queue gets:
            </p>

            <div className="mt-8">
              <ComplexityGraph
                bestCase={() => 1}
                averageCase={() => 1}
                worstCase={() => 1}
                maxN={25}
              />
            </div>
          </div>

          <InContentAd />
        </section>

        {/* Pros and Cons */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Pros and Cons
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {prosCons.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Additional Info */}
        <section className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <div className="px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">When to Use Linked List Queue</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph[2]}
              </p>
              <ul className="mt-2 space-y-1 list-disc pl-5 marker:text-blue-500 dark:marker:text-blue-400">
                <li className="text-gray-700 dark:text-gray-300">When the maximum queue size is unpredictable</li>
                <li className="text-gray-700 dark:text-gray-300">When memory efficiency is more important than cache performance</li>
                <li className="text-gray-700 dark:text-gray-300">In applications with frequent dynamic memory allocation/deallocation</li>
              </ul>
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