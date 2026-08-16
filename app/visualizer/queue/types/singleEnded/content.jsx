"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const QueueStepDiagram = ({
  values,
  slots,
  mode,
  departed,
  arrived,
  keyPrefix,
}) => {
  const boxSize = 40;
  const gap = 8;
  const paddingX = 8;
  const topPadding = 34;

  // A removed element keeps its old slot as a ghost, and every diagram
  // reserves the same number of slots so the row never jumps between steps.
  const offset = departed ? 1 : 0;
  const width = slots * (boxSize + gap) - gap + paddingX * 2;

  const boxY = topPadding;
  const boxX = (idx) => paddingX + (idx + offset) * (boxSize + gap);
  const cx = (idx) => boxX(idx) + boxSize / 2;

  const noteY = boxY + boxSize + 18;
  const footerY = boxY + boxSize + 34;
  const height = footerY + 8;

  const isPeek = mode === "peek";
  const frontColor = isPeek ? "#8b5cf6" : "#3b82f6";

  const fillFor = (idx) => {
    if (idx === 0) return frontColor;
    if (idx === arrived) return "#10b981";
    return "#3b82f6";
  };

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

      {values.length > 0 && (
        <>
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
        </>
      )}

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
            y={noteY}
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
            fill={fillFor(idx)}
            opacity={idx === 0 || idx === arrived ? "0.9" : "0.25"}
            stroke={fillFor(idx)}
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

      {arrived !== undefined && values.length > 1 && (
        <text
          x={cx(arrived)}
          y={noteY}
          textAnchor="middle"
          className="fill-emerald-600 dark:fill-emerald-400"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="700"
        >
          added
        </text>
      )}

      {/* Peek reads the front out without taking the box with it */}
      {isPeek && values.length > 0 && (
        <g>
          <line
            x1={cx(0)}
            y1={boxY + boxSize + 2}
            x2={cx(0)}
            y2={noteY - 10}
            stroke="#8b5cf6"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            markerEnd={`url(#${keyPrefix}-read-arrow)`}
          />
          <text
            x={cx(0)}
            y={noteY + 2}
            textAnchor="middle"
            className="fill-violet-600 dark:fill-violet-400"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="700"
          >
            returns {values[0]}
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
        {isPeek ? `size stays ${values.length}` : `size ${values.length}`}
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `A single-ended queue is what most people just mean when they say "queue": insertion only happens at the rear, removal only happens at the front, and that one-directional flow is what keeps the ordering strictly first-in, first-out.`,
    `That predictability is the whole point. Plenty of algorithms and system designs depend on knowing that items get processed in exactly the order they arrived, and a single-ended queue is the simplest structure that guarantees it.`,
  ];

  const characteristics = [
    {
      points: "Two ends:",
      subpoints: ["Front (for removal) and rear (for insertion)"],
    },
    {
      points: "Basic Operations:",
      subpoints: [
        "enqueue() - Add to rear",
        "dequeue() - Remove from front",
        "peek() - View front element",
        "isEmpty() - Check if empty",
      ],
    },
    {
      points: "Fixed Order:",
      subpoints: ["Elements are processed in exact arrival sequence"],
    },
  ];

  const example = [
    { points: "enqueue(10): [10]", queue: [10], arrived: 0 },
    { points: "enqueue(20): [10, 20]", queue: [10, 20], arrived: 1 },
    { points: "enqueue(30): [10, 20, 30]", queue: [10, 20, 30], arrived: 2 },
    {
      points: "dequeue(): Returns 10 → [20, 30]",
      queue: [20, 30],
      departed: 10,
    },
    {
      points: "peek(): Returns 20 → [20, 30] (unchanged)",
      queue: [20, 30],
      mode: "peek",
    },
  ];

  const implementation = [
    {
      points: "Array-Based:",
      subpoints: [
        "Fixed or dynamic array",
        "Need to handle wrap-around for circular queues",
      ],
    },
    {
      points: "Linked List:",
      subpoints: [
        "Head pointer as front",
        "Tail pointer as rear",
        "Efficient O(1) operations",
      ],
    },
  ];

  const complexity = [
    { points: "enqueue(): O(1)" },
    { points: "dequeue(): O(1)" },
    { points: "peek(): O(1)" },
    { points: "isEmpty(): O(1)" },
  ];

  const application = [
    { points: "CPU task scheduling" },
    { points: "Print job management" },
    { points: "Breadth-First Search (BFS) algorithms" },
    { points: "Buffering data streams" },
    { points: "Handling requests in web servers" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is a Single-Ended Queue? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is a Single-Ended Queue?
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
              Single-ended queues have these fundamental properties:
            </p>
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {characteristics.map((item, index) => (
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
              Everything enters at the rear and leaves at the front. Watch the
              two pointers across this sequence on an initially empty queue —
              rear only ever moves right as items arrive, and front only ever
              moves right as items leave. Neither can go backwards, and that is
              what enforces FIFO:
            </p>
            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {example.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  <div className="mt-3 not-prose">
                    <QueueStepDiagram
                      keyPrefix={`sq-step${index}`}
                      values={item.queue}
                      slots={4}
                      mode={item.mode}
                      arrived={item.arrived}
                      departed={item.departed}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Just enqueued at the rear
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Dequeued from the front
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-violet-500 inline-block"></span>
                Read by peek (stays queued)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                Waiting in line
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Notice that 10 was the first in and the first out, while peek read
              the new front without changing the size. No operation ever touches
              the middle of the queue, which is why each one costs the same
              regardless of how many items are waiting.
            </p>
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

        {/* Time Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time Complexity
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
              Every operation works on a pointer rather than the contents, so
              the cost is flat — the line stays level no matter how large the
              queue grows:
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

        {/* Applications */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Applications
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Single-ended queues are used in:
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
                {paragraphs[1]}
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
