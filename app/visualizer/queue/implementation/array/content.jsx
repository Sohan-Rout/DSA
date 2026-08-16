"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// Follows the conventions this page states: front and rear are both -1 when
// empty, and rear indexes the last element (not the next free slot).
const ArrayQueueDiagram = ({ cells, front, rear, keyPrefix }) => {
  const capacity = cells.length;
  const boxSize = 36;
  const gap = 6;
  const paddingX = 8;
  const topPadding = 34;

  const width = capacity * (boxSize + gap) - gap + paddingX * 2;
  const boxY = topPadding;
  const indexY = boxY + boxSize + 12;
  const footerY = boxY + boxSize + 30;
  const height = 110;

  const boxX = (idx) => paddingX + idx * (boxSize + gap);
  const cx = (idx) => boxX(idx) + boxSize / 2;

  const isEmpty = front === -1;
  const size = isEmpty ? 0 : rear - front + 1;
  // Slots before front have been dequeued and, without wrap-around, can never
  // be reused. That dead space is the point of this diagram.
  const wasted = isEmpty ? 0 : front;
  const isFull = rear === capacity - 1;

  const stateFor = (idx) => {
    if (isEmpty) return "free";
    if (idx < front) return "dead";
    if (idx <= rear) return "live";
    return "free";
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="array-backed queue"
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
      </defs>

      {!isEmpty && (
        <>
          <text
            x={cx(front)}
            y="10"
            textAnchor="middle"
            className="fill-blue-500 dark:fill-blue-400"
            fontSize="10"
            fontWeight="700"
          >
            front
          </text>
          <line
            x1={cx(front)}
            y1="14"
            x2={cx(front)}
            y2={boxY - 3}
            stroke="#3b82f6"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-front-arrow)`}
          />
        </>
      )}

      {!isEmpty && rear !== front && (
        <>
          <text
            x={cx(rear)}
            y="10"
            textAnchor="middle"
            className="fill-emerald-500 dark:fill-emerald-400"
            fontSize="10"
            fontWeight="700"
          >
            rear
          </text>
          <line
            x1={cx(rear)}
            y1="14"
            x2={cx(rear)}
            y2={boxY - 3}
            stroke="#10b981"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-rear-arrow)`}
          />
        </>
      )}

      {cells.map((value, idx) => {
        const state = stateFor(idx);
        const color =
          state === "live" ? "#3b82f6" : state === "dead" ? "#f59e0b" : "#94a3b8";
        return (
          <g key={`${keyPrefix}-cell-${idx}`}>
            <rect
              x={boxX(idx)}
              y={boxY}
              width={boxSize}
              height={boxSize}
              rx="6"
              fill={state === "live" ? color : "none"}
              opacity={state === "live" ? (idx === front ? "0.9" : "0.3") : "1"}
              stroke={color}
              strokeWidth={state === "live" ? "2" : "1.5"}
              strokeDasharray={state === "live" ? undefined : "4 3"}
            />
            {state === "live" && (
              <text
                x={cx(idx)}
                y={boxY + boxSize / 2 + 5}
                textAnchor="middle"
                className="fill-gray-800 dark:fill-gray-100"
                fontSize="13"
                fontWeight="700"
              >
                {value}
              </text>
            )}
            {state === "dead" && (
              <text
                x={cx(idx)}
                y={boxY + boxSize / 2 + 4}
                textAnchor="middle"
                className="fill-amber-600 dark:fill-amber-400"
                fontSize="9"
                fontFamily="monospace"
              >
                dead
              </text>
            )}
            <text
              x={cx(idx)}
              y={indexY}
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

      <text
        x={paddingX}
        y={footerY}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
        fontFamily="monospace"
      >
        front = {front}, rear = {rear}, size {size}
      </text>

      {isFull && (
        <text
          x={width - paddingX}
          y={footerY}
          textAnchor="end"
          fill={wasted > 0 ? "#ef4444" : "#94a3b8"}
          fontSize="9"
          fontFamily="monospace"
          fontWeight="700"
        >
          {wasted > 0 ? `FULL — ${wasted} wasted` : "FULL"}
        </text>
      )}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `The simplest way to build a queue is to back it with an array and track a front index and a rear index. As long as those two indices are updated correctly on every enqueue and dequeue, the array behaves like a proper FIFO queue.`,
    `The catch with a plain array is wasted space at the front once you've dequeued a few elements: the circular-array trick fixes that by letting the rear index wrap back around to index 0 once it hits the end.`,
    `Queues are widely used in scenarios like printer job scheduling, call center systems, and network packet handling where order preservation is crucial.`,
  ];

  const implementationSteps = [
    {
      points:
        "Initialize an array of fixed size (for static implementation) or dynamic array",
    },
    {
      points:
        "Initialize two pointers: front (for dequeue) and rear (for enqueue), both set to -1 initially",
    },
    {
      points:
        "Implement boundary checks for overflow (full queue) and underflow (empty queue) conditions",
    },
    {
      points:
        "For circular queue implementation, use modulo arithmetic for pointer updates",
    },
  ];

  const enqueueAlgorithm = [
    {
      points:
        "Check if queue is full (if (rear == capacity - 1) for linear array)",
    },
    { points: "For empty queue, set both front and rear to 0" },
    { points: "For circular queue: rear = (rear + 1) % capacity" },
    { points: "Insert new element at items[rear]" },
    { points: "Increment size counter" },
  ];

  const dequeueAlgorithm = [
    { points: "Check if queue is empty (front == -1)" },
    { points: "Store the front element to return later" },
    { points: "If only one element (front == rear), reset pointers to -1" },
    { points: "For circular queue: front = (front + 1) % capacity" },
    { points: "Decrement size counter" },
    { points: "Return the stored element" },
  ];

  // Capacity 5, linear (non-circular) array so the dead space is visible.
  const example = [
    {
      points:
        "An empty queue of capacity 5. Both pointers start at -1, which is how the code tells empty apart from holding one element at index 0.",
      cells: [null, null, null, null, null],
      front: -1,
      rear: -1,
    },
    {
      points:
        "enqueue(10), enqueue(20), enqueue(30): front is set to 0 on the first insert, and rear steps forward with each one.",
      cells: [10, 20, 30, null, null],
      front: 0,
      rear: 2,
    },
    {
      points:
        "dequeue() twice: 10 and 20 are returned and front moves to index 2. Nothing is shifted — which is what keeps dequeue O(1) — but slots 0 and 1 are now stranded.",
      cells: [10, 20, 30, null, null],
      front: 2,
      rear: 2,
    },
    {
      points:
        "enqueue(40), enqueue(50): rear reaches index 4, the last slot. The check rear == capacity - 1 now reports the queue as full even though it only holds 3 of 5 elements.",
      cells: [10, 20, 30, 40, 50],
      front: 2,
      rear: 4,
    },
  ];

  const complexity = [
    {
      points:
        "Enqueue Operation: O(1) - Amortized constant time for dynamic arrays",
    },
    {
      points:
        "Dequeue Operation: O(1) - No shifting needed with pointer approach",
    },
    { points: "Peek Operation: O(1) - Direct access via front pointer" },
    { points: "Space Usage: O(n) - Linear space for storing elements" },
  ];

  const prosCons = [
    {
      points:
        "Pros: Simple implementation, cache-friendly (array elements contiguous in memory)",
    },
    { points: "Pros: Efficient O(1) operations with pointer tracking" },
    { points: "Cons: Fixed size limitation in static array implementation" },
    {
      points:
        "Cons: Wasted space in linear array implementation without circular approach",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Queue Array Implementation Overview */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Queue Implementation Using Array
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
              The array never moves — only the two indices do. front marks the
              element that leaves next, rear marks the last one that arrived,
              and every operation is just an index update:
            </p>

            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {example.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  <div className="mt-3 not-prose">
                    <ArrayQueueDiagram
                      keyPrefix={`aq-step${index}`}
                      cells={item.cells}
                      front={item.front}
                      rear={item.rear}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                Holds a live element
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm border-2 border-dashed border-amber-500 inline-block"></span>
                Dequeued — stranded behind front
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm border-2 border-dashed border-gray-400 inline-block"></span>
                Never used yet
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Step 4 is the flaw in the plain array approach. Two perfectly good
              slots sit empty at the start, but front only ever moves right, so
              nothing can reach them again. You can reclaim them by shifting
              every element down on each dequeue — at which point dequeue costs
              O(n) instead of O(1) — or you can let rear wrap around to index 0
              with modulo arithmetic, which is exactly what a circular queue
              does and why it is the version normally used in practice.
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
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
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
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
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
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
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
              Because both enqueue and dequeue only touch an index and a single
              slot, none of them get slower as the queue fills up:
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
        <section className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <div className="px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Practical Considerations
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph[1]}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                {paragraph[2]}
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
