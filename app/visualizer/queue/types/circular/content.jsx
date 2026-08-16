"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// Drawn as a ring rather than a row: the wrap-around is the whole point, and
// a straight line can't show index 4 handing over to index 0.
// Follows the conventions stated on this page — front marks the first element,
// rear marks the next free slot, so front === rear means empty and one slot is
// always left unused.
const SIZE = 208;
const CENTER = SIZE / 2;
const RING_R = 54;
const SLOT_R = 18;

const CircularQueueDiagram = ({ cells, front, rear, keyPrefix }) => {
  const capacity = cells.length;
  const count = cells.filter((cell) => cell !== null).length;
  const isEmpty = count === 0;
  const isFull = (rear + 1) % capacity === front;

  const angle = (idx) => (-90 + idx * (360 / capacity)) * (Math.PI / 180);
  const pointAt = (idx, radius) => ({
    x: CENTER + radius * Math.cos(angle(idx)),
    y: CENTER + radius * Math.sin(angle(idx)),
  });

  const pointer = (idx, radius) => pointAt(idx, radius);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="mx-auto"
      style={{ width: `${SIZE}px`, maxWidth: "100%" }}
      role="img"
      aria-label="circular queue diagram"
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

      {/* The ring the indices travel around */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RING_R}
        fill="none"
        className="stroke-gray-300 dark:stroke-gray-700"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />

      {cells.map((value, idx) => {
        const { x, y } = pointAt(idx, RING_R);
        const filled = value !== null;
        return (
          <g key={`${keyPrefix}-slot-${idx}`}>
            <circle
              cx={x}
              cy={y}
              r={SLOT_R}
              fill={filled ? "#3b82f6" : "none"}
              opacity={filled ? (idx === front ? "0.9" : "0.3") : "1"}
              stroke={filled ? "#3b82f6" : "#94a3b8"}
              strokeWidth={filled ? "2" : "1.5"}
              strokeDasharray={filled ? undefined : "4 3"}
            />
            {filled && (
              <text
                x={x}
                y={y - 1}
                textAnchor="middle"
                className="fill-gray-800 dark:fill-gray-100"
                fontSize="13"
                fontWeight="700"
              >
                {value}
              </text>
            )}
            <text
              x={x}
              y={filled ? y + 12 : y + 4}
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

      {/* Pointers sit outside the ring and aim inward at their slot */}
      <g>
        <line
          x1={pointer(front, RING_R + SLOT_R + 17).x}
          y1={pointer(front, RING_R + SLOT_R + 17).y}
          x2={pointer(front, RING_R + SLOT_R + 4).x}
          y2={pointer(front, RING_R + SLOT_R + 4).y}
          stroke="#3b82f6"
          strokeWidth="1.5"
          markerEnd={`url(#${keyPrefix}-front-arrow)`}
        />
        <text
          x={pointer(front, RING_R + SLOT_R + 25).x}
          y={pointer(front, RING_R + SLOT_R + 25).y + 3}
          textAnchor="middle"
          className="fill-blue-500 dark:fill-blue-400"
          fontSize="10"
          fontWeight="700"
        >
          front
        </text>
      </g>

      <g>
        <line
          x1={pointer(rear, RING_R + SLOT_R + 17).x}
          y1={pointer(rear, RING_R + SLOT_R + 17).y}
          x2={pointer(rear, RING_R + SLOT_R + 4).x}
          y2={pointer(rear, RING_R + SLOT_R + 4).y}
          stroke="#10b981"
          strokeWidth="1.5"
          markerEnd={`url(#${keyPrefix}-rear-arrow)`}
        />
        <text
          x={pointer(rear, RING_R + SLOT_R + 25).x}
          y={pointer(rear, RING_R + SLOT_R + 25).y + 3}
          textAnchor="middle"
          className="fill-emerald-500 dark:fill-emerald-400"
          fontSize="10"
          fontWeight="700"
        >
          rear
        </text>
      </g>

      <text
        x={CENTER}
        y={CENTER - 2}
        textAnchor="middle"
        className="fill-gray-500 dark:fill-gray-400"
        fontSize="11"
        fontFamily="monospace"
      >
        size {count}/{capacity - 1}
      </text>
      <text
        x={CENTER}
        y={CENTER + 12}
        textAnchor="middle"
        fill={isFull ? "#ef4444" : isEmpty ? "#94a3b8" : "#10b981"}
        fontSize="9"
        fontFamily="monospace"
        fontWeight="700"
      >
        {isFull ? "FULL" : isEmpty ? "EMPTY" : "has room"}
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `A circular queue takes a regular array-based queue and wraps its rear index back to the beginning once it hits the end: instead of a straight line, the underlying array is treated like a loop.`,
    `That one change fixes the biggest annoyance with a plain array queue: slots freed up by earlier dequeues no longer go to waste. It keeps every operation running in constant time, which is why circular queues show up so often in fixed-size buffers, like the ones used in low-level or real-time systems.`,
  ];

  const characteristics = [
    { points : "Fixed capacity: Size is predetermined at creation" },
    { points : "Two pointers:",
      subpoints : [
        "Front: Points to the first element",
        "Rear: Points to the last element",
      ],
     },
    { points : "Circular behavior: When pointers reach the end, they wrap around to the start" },
    { points : "Efficient space utilization: Reuses empty spaces created after dequeues" },
  ];

  const implementation = [
    { points : "Pointer Movement:", 
      subpoints : [
        "front = (front + 1) % capacity",
        "rear = (rear + 1) % capacity",
      ],
    },
    { points : "Full/Empty Conditions:", 
      subpoints : [
        "Full: (rear + 1) % capacity == front",
        "Empty: front == rear",
      ],
    },
    { points : "Always one empty slot:", 
      subpoints : [
        "Needed to distinguish between full and empty states",
      ],
    },
  ];

  // Capacity 5, so at most 4 elements — the fifth slot is the one deliberately
  // left free to tell "full" apart from "empty".
  const example = [
    {
      points: "Start empty. front and rear both sit on index 0.",
      cells: [null, null, null, null, null],
      front: 0,
      rear: 0,
    },
    {
      points:
        "enqueue(10), enqueue(20), enqueue(30) — each write lands on rear, then rear steps forward.",
      cells: [10, 20, 30, null, null],
      front: 0,
      rear: 3,
    },
    {
      points:
        "dequeue() twice — 10 and 20 leave, and front steps forward to index 2. Slots 0 and 1 are now free again.",
      cells: [null, null, 30, null, null],
      front: 2,
      rear: 3,
    },
    {
      points:
        "enqueue(40), enqueue(50) — rear fills index 3, then 4, and wraps back around to index 0.",
      cells: [null, null, 30, 40, 50],
      front: 2,
      rear: 0,
    },
    {
      points:
        "enqueue(60) — it reuses slot 0, freed way back by the first dequeue. Now (rear + 1) % 5 === front, so the queue reports full.",
      cells: [60, null, 30, 40, 50],
      front: 2,
      rear: 1,
    },
  ];

  const complexity = [
    { points : "enqueue(): O(1)" },
    { points : "dequeue(): O(1)" },
    { points : "peekFront(): O(1)" },
    { points : "peekRear(): O(1)" },
    { points : "isEmpty(): O(1)" },
    { points : "isFull(): O(1)" },
  ];

  const application = [
    { points : "CPU Scheduling: Round-robin scheduling algorithms" },
    { points : "Memory Management: Circular buffers in memory systems" },
    { points : "Traffic Systems: Controlling the flow of traffic signals" },
    { points : "Data Streams: Handling continuous data streams (audio/video buffers)" },
    { points : "Producer-Consumer Problems: Where producers and consumers operate at different rates" },
  ];

  const advantages = [
    { points : "Better memory utilization: Reuses empty spaces" },
    { points : "Efficient operations: No need to shift elements" },
    { points : "Fixed memory footprint: Predictable memory usage" },
    { points : "Real-time systems friendly: Bounded execution time" },
  ];

    return (
          <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is a Circular Queue? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is a Circular Queue?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[0]}
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
          Circular queues have these fundamental properties:
        </p>
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {characteristics.map((item, index) => (
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

    {/* How Does It Work? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        How Does It Work?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          The array is the same as ever — only the arithmetic changes. Picture
          the five slots bent into a ring so index 4 hands straight over to
          index 0. front marks the first element, rear marks the next free slot,
          and both advance with{" "}
          <span className="font-mono">(i + 1) % capacity</span>:
        </p>

        <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {example.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
              <div className="mt-3 not-prose">
                <CircularQueueDiagram
                  keyPrefix={`cq-step${index}`}
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
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
            Occupied slot
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-dashed border-gray-400 inline-block"></span>
            Free slot
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          Step 5 is what a linear array queue cannot do. There, once rear
          reached the end the queue was &quot;full&quot; even with two empty
          slots at the start, and the only fix was shifting every element down.
          Here rear simply wraps to index 0 and reuses that space in constant
          time.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          It also shows why one slot is always sacrificed: front and rear
          landing on the same index has to mean something definite. Kept as
          &quot;empty&quot;, a full queue must stop one slot short — which is
          why capacity 5 holds at most 4 elements.
        </p>
      </div>
    </section>

    {/* Implementation Details */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Implementation Details
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Key implementation aspects:
        </p>
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {implementation.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              <span className="font-semibold">{item.points}</span>
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
          The modulo keeps every operation to a single index update, with no
          shifting and no scanning, so the cost never grows with the queue:
        </p>

        <div className="mt-8">
          <ComplexityGraph
            bestCase={() => 1}
            averageCase={() => 1}
            worstCase={() => 1}
            maxN={25}
          />
        </div>

        <InContentAd />
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
          Circular queues are used in:
        </p>
        <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {application.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Advantages Over Linear Queue */}
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Advantages Over Linear Queue
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {advantages.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
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
            {paragraph[1]}
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