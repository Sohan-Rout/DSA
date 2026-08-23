"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const QueueDiagram = ({ values, highlight, keyPrefix }) => {
  const boxSize = 40;
  const gap = 8;
  const paddingX = 8;
  const topPadding = 34;
  const width = Math.max(values.length, 1) * (boxSize + gap) - gap + paddingX * 2;
  const height = boxSize + topPadding + 10;

  const boxX = (idx) => paddingX + idx * (boxSize + gap);
  const boxY = topPadding;
  const cx = (idx) => boxX(idx) + boxSize / 2;

  const colorFor = (idx) => (highlight === idx ? "#10b981" : "#3b82f6");

  if (values.length === 0) {
    return (
      <svg
        viewBox={`0 0 200 ${height}`}
        className="mx-auto"
        style={{ width: "200px", maxWidth: "100%" }}
        role="img"
        aria-label="empty queue"
      >
        <rect x={paddingX} y={boxY} width={boxSize} height={boxSize} rx="6" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
        <text x={paddingX + boxSize + 12} y={boxY + boxSize / 2 + 5} className="fill-gray-400 dark:fill-gray-500" fontSize="12" fontFamily="monospace">
          queue is empty
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="queue diagram"
    >
      <defs>
        <marker id={`${keyPrefix}-front-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#3b82f6" />
        </marker>
        <marker id={`${keyPrefix}-rear-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#10b981" />
        </marker>
      </defs>

      <text x={cx(0)} y="10" textAnchor="middle" className="fill-blue-500 dark:fill-blue-400" fontSize="10" fontWeight="700">
        front
      </text>
      <line x1={cx(0)} y1="14" x2={cx(0)} y2={boxY - 3} stroke="#3b82f6" strokeWidth="1.5" markerEnd={`url(#${keyPrefix}-front-arrow)`} />

      {values.length > 1 && (
        <>
          <text x={cx(values.length - 1)} y="10" textAnchor="middle" className="fill-emerald-500 dark:fill-emerald-400" fontSize="10" fontWeight="700">
            rear
          </text>
          <line
            x1={cx(values.length - 1)}
            y1="14"
            x2={cx(values.length - 1)}
            y2={boxY - 3}
            stroke="#10b981"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-rear-arrow)`}
          />
        </>
      )}

      {values.map((val, idx) => (
        <g key={`${keyPrefix}-box-${idx}`}>
          <rect
            x={boxX(idx)}
            y={boxY}
            width={boxSize}
            height={boxSize}
            rx="6"
            fill={colorFor(idx)}
            opacity={idx === highlight ? "0.9" : "0.25"}
            stroke={colorFor(idx)}
            strokeWidth="2"
          />
          <text
            x={cx(idx)}
            y={boxY + boxSize / 2 + 5}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="14"
            fontWeight="700"
          >
            {val}
          </text>
        </g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `A queue works exactly like a line of people waiting: whoever joins first at the back gets served first at the front. In data-structure terms, new items go in at the rear through enqueue, and items come out from the front through dequeue, first in, first out.`,
    `The space complexity is O(n) where n is the number of elements in the queue, as it needs to store all elements.`,
    `Queues are fundamental in computer science and are used in various applications like CPU scheduling, disk scheduling, handling interrupts, breadth-first search, and any scenario where you need to maintain order of processing.`,
  ];

  const enqueue = [
    { points : "Check if the queue is full (in case of fixed-size implementation)" },
    { points : "If full, return overflow error (or resize in dynamic implementation)" },
    { points : "Increment the rear pointer" },
    { points : "Add the new element at the rear position" },
  ];

  const dequeue = [
    { points : "Check if the queue is empty" },
    { points : "If empty, return underflow error" },
    { points : "Access the data at the front of the queue" },
    { points : "Increment the front pointer to the next element" },
    { points : "Return the accessed data" },
  ];

  const complexity = [
    { points : "Enqueue Operation: O(1) - Constant time to add to the end" },
    { points : "Dequeue Operation: O(1) - Constant time to remove from the front" },
  ];

    return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is a Queue? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is a Queue?
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[0]}
        </p>
      </div>
    </section>

    {/* Enqueue Operation */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Enqueue Operation
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Enqueue adds an element to the end (rear) of the queue. The front pointer never moves, and the new element becomes the new rear.
        </p>

        <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto not-prose">
          <QueueDiagram values={["10", "20", "30"]} keyPrefix="enq-before" />
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ enqueue(40) ↓</p>
          <QueueDiagram values={["10", "20", "30", "40"]} highlight={3} keyPrefix="enq-after" />
        </div>

        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          The new element always goes to the end of the queue.
        </p>
      </div>
    </section>

    {/* Dequeue Operation */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Dequeue Operation
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Dequeue removes and returns the element from the front (head) of the queue. The rear pointer never moves, and whichever element was second in line becomes the new front.
        </p>

        <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto not-prose">
          <QueueDiagram values={["10", "20", "30", "40"]} keyPrefix="deq-before" />
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ dequeue() → returns 10 ↓</p>
          <QueueDiagram values={["20", "30", "40"]} keyPrefix="deq-after" />
        </div>

        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          The oldest element (first one added) is always removed first.
        </p>
      </div>
    </section>

    {/* Algorithm Steps for Enqueue */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithm Steps for Enqueue
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {enqueue.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Algorithm Steps for Dequeue */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithm Steps for Dequeue
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {dequeue.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
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

        <div className="mt-8">
              <ComplexityGraph
                bestCase={(n) => 1}
                averageCase={(n) => 1}
                worstCase={(n) => 1}
                maxN={25}
              />
            </div>

        <InContentAd />
      </div>
    </section>

    {/* Space Complexity */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Space Complexity
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[1]}
        </p>
      </div>
    </section>

    {/* Additional Info */}
    <section className="p-6">
      <div className="prose dark:prose-invert max-w-none">
        <div className="px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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