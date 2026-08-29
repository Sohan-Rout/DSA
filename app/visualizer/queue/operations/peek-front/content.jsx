"use client";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const QueuePeekDiagram = ({ values, mode, departed, keyPrefix }) => {
  const boxSize = 40;
  const gap = 8;
  const paddingX = 8;
  const topPadding = 34;

  // A departed element keeps its old slot as a ghost, so the live queue sits
  // in the same place across diagrams and the removal is visible.
  const offset = departed ? 1 : 0;
  const slots = values.length + offset;
  const width = slots * (boxSize + gap) - gap + paddingX * 2;

  const boxY = topPadding;
  const boxX = (idx) => paddingX + (idx + offset) * (boxSize + gap);
  const cx = (idx) => boxX(idx) + boxSize / 2;

  const returnsY = boxY + boxSize + 18;
  const footerY = boxY + boxSize + 34;
  const height = footerY + 8;

  // Violet marks a read-only look, matching the stack's peek diagrams.
  const isPeek = mode === "peek";
  const frontColor = isPeek ? "#8b5cf6" : "#3b82f6";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="queue diagram"
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
          <path d="M0,0 L7,3.5 L0,7 Z" fill={frontColor} />
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
          id={`${keyPrefix}-read-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#8b5cf6" />
        </marker>
      </defs>

      <text
        x={cx(0)}
        y="10"
        textAnchor="middle"
        fill={frontColor}
        fontSize="10"
        fontWeight="700"
      >
        front
      </text>
      <line
        x1={cx(0)}
        y1="14"
        x2={cx(0)}
        y2={boxY - 3}
        stroke={frontColor}
        strokeWidth="1.5"
        markerEnd={`url(#${keyPrefix}-front-arrow)`}
      />

      {values.length > 1 && (
        <>
          <text
            x={cx(values.length - 1)}
            y="10"
            textAnchor="middle"
            className="fill-emerald-500 dark:fill-emerald-400"
            fontSize="10"
            fontWeight="700"
          >
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

      {departed && (
        <g>
          <rect
            x={paddingX}
            y={boxY}
            width={boxSize}
            height={boxSize}
            rx="6"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.8"
          />
          <text
            x={paddingX + boxSize / 2}
            y={boxY + boxSize / 2 + 5}
            textAnchor="middle"
            className="fill-gray-400 dark:fill-gray-500"
            fontSize="14"
            fontWeight="700"
          >
            {departed}
          </text>
          <text
            x={paddingX + boxSize / 2}
            y={returnsY}
            textAnchor="middle"
            className="fill-amber-600 dark:fill-amber-400"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="700"
          >
            removed
          </text>
        </g>
      )}

      {values.map((val, idx) => (
        <g key={`${keyPrefix}-box-${idx}`}>
          <rect
            x={boxX(idx)}
            y={boxY}
            width={boxSize}
            height={boxSize}
            rx="6"
            fill={idx === 0 ? frontColor : "#3b82f6"}
            opacity={idx === 0 ? "0.9" : "0.25"}
            stroke={idx === 0 ? frontColor : "#3b82f6"}
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

      {/* The value leaves as a return value; the box itself stays in the queue */}
      {isPeek && values.length > 0 && (
        <g>
          <line
            x1={cx(0)}
            y1={boxY + boxSize + 2}
            x2={cx(0)}
            y2={returnsY - 10}
            stroke="#8b5cf6"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            markerEnd={`url(#${keyPrefix}-read-arrow)`}
          />
          <text
            x={cx(0)}
            y={returnsY + 2}
            textAnchor="middle"
            className="fill-violet-600 dark:fill-violet-400"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="700"
          >
            returns &apos;{values[0]}&apos;
          </text>
        </g>
      )}

      <text
        x={paddingX}
        y={footerY}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
        fontFamily="monospace"
      >
        {isPeek
          ? `size stays ${values.length}`
          : departed
            ? `size ${values.length + 1} → ${values.length}`
            : `size ${values.length}`}
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `Peek front (sometimes just called front) lets you look at whatever's sitting at the head of the queue (the next thing due to be dequeued) without actually taking it out. Nothing about the queue changes; you're just reading its current state.`,
    `The peek front operation is essential for non-destructive queue inspection, enabling more flexible queue processing patterns while maintaining FIFO order. It's particularly valuable in scenarios where decision-making depends on the next item's properties without committing to its removal.`,
  ];

  const example = [
    {
      points: "Current Queue: [A, B, C, D]",
      queue: ["A", "B", "C", "D"],
    },
    {
      points: "peekFront(): Returns 'A'",
      queue: ["A", "B", "C", "D"],
      mode: "peek",
    },
    {
      points: "Queue After Peek: [A, B, C, D] (unchanged)",
      queue: ["A", "B", "C", "D"],
    },
  ];

  const steps = [
    { points: "Check if queue is empty (use isEmpty())" },
    { points: "If empty, return error/exception (or null)" },
    { points: "Access the data at front position" },
    { points: "Return the data without modifying pointers" },
  ];

  const complexity = [
    { points: "Direct access to front element" },
    { points: "No iteration needed" },
    { points: "No structural changes to queue" },
  ];

  const application = [
    { points: "Previewing next item before processing" },
    { points: "Priority checking in priority queues" },
    { points: "Conditional processing logic" },
    { points: "Debugging queue contents" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Peek Front Operation? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Peek Front Operation?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[0]}
            </p>
          </div>
        </section>

        {/* How Does It Work? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Peek returns the front element while keeping the queue unchanged.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Example with queue: [A, B, C, D]
            </p>

            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {example.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  <div className="mt-3 not-prose">
                    <QueuePeekDiagram
                      keyPrefix={`peek-step${index}`}
                      values={item.queue}
                      mode={item.mode}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-violet-500 inline-block"></span>
                Read by peek (stays in the queue)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Removed by dequeue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                Still queued
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-6 mb-3 leading-relaxed">
              Contrast with dequeue(), which returns the same value but also
              takes it out, moving the front pointer onto &apos;B&apos;:
            </p>

            <div className="not-prose">
              <QueuePeekDiagram
                keyPrefix="peek-dequeue"
                values={["B", "C", "D"]}
                departed="A"
              />
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              The size line is the giveaway: peek leaves it at 4, dequeue drops
              it to 3.
            </p>
          </div>
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Algorithm Steps
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Basic peek operation algorithm:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {steps.map((item, index) => (
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time Complexity
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Peek operation always runs in O(1) constant time because:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {complexity.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ul>

            <InContentAd />
          </div>
        </section>

        {/* Practical Applications */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Practical Applications
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Common use cases for peek:
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

        {/* Additional Info */}
        <section className="p-6">
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
