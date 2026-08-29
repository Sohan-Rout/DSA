"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const StackFullDiagram = ({ values, capacity, keyPrefix }) => {
  const boxWidth = 84;
  const boxHeight = 36;
  const topPadding = 22;
  const sideMargin = 26;
  const width = 190;

  // Derived from the picture rather than passed in, so the label can never
  // disagree with the number of boxes drawn.
  const result = values.length >= capacity;

  const containerTop = topPadding - 6;
  const containerBottom = topPadding + capacity * boxHeight;
  const boxY = (idx) => containerBottom - (idx + 1) * boxHeight;
  const topIndex = values.length - 1;

  const chipY = containerBottom + 14;
  const chipHeight = 26;
  const height = chipY + chipHeight + 12;

  const accent = result ? "#10b981" : "#f59e0b";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label={`stack holding ${values.length} of ${capacity} slots`}
    >
      <defs>
        <marker
          id={`${keyPrefix}-top-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
        </marker>
      </defs>

      <text
        x={sideMargin}
        y={12}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
        fontFamily="monospace"
      >
        size = {values.length} / {capacity}
      </text>

      <path
        d={`M ${sideMargin} ${containerTop} L ${sideMargin} ${containerBottom} L ${sideMargin + boxWidth} ${containerBottom} L ${sideMargin + boxWidth} ${containerTop}`}
        fill="none"
        className="stroke-gray-400 dark:stroke-gray-500"
        strokeWidth="2"
      />

      {/* Every unused slot is drawn, so "room left" is visible, not just stated */}
      {Array.from({ length: capacity - values.length }).map((_, i) => {
        const slot = values.length + i;
        return (
          <rect
            key={`${keyPrefix}-free-${i}`}
            x={sideMargin + 3}
            y={boxY(slot)}
            width={boxWidth - 6}
            height={boxHeight - 4}
            rx="6"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.7"
          />
        );
      })}

      {values.length === 0 && (
        <text
          x={sideMargin + boxWidth / 2}
          y={boxY(0) + (boxHeight - 4) / 2 + 4}
          textAnchor="middle"
          className="fill-gray-400 dark:fill-gray-500"
          fontSize="11"
          fontFamily="monospace"
        >
          empty
        </text>
      )}

      {values.map((val, idx) => (
        <g key={`${keyPrefix}-box-${idx}`}>
          <rect
            x={sideMargin + 3}
            y={boxY(idx)}
            width={boxWidth - 6}
            height={boxHeight - 4}
            rx="6"
            fill="#3b82f6"
            opacity={idx === topIndex ? "0.9" : "0.25"}
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <text
            x={sideMargin + boxWidth / 2}
            y={boxY(idx) + (boxHeight - 4) / 2 + 5}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="14"
            fontWeight="700"
          >
            {val}
          </text>
        </g>
      ))}

      {values.length > 0 && (
        <g>
          <line
            x1={sideMargin + boxWidth + 24}
            y1={boxY(topIndex) + (boxHeight - 4) / 2}
            x2={sideMargin + boxWidth + 8}
            y2={boxY(topIndex) + (boxHeight - 4) / 2}
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-top-arrow)`}
          />
          <text
            x={sideMargin + boxWidth + 28}
            y={boxY(topIndex) + (boxHeight - 4) / 2 + 4}
            className="fill-gray-500 dark:fill-gray-400"
            fontSize="11"
            fontFamily="monospace"
          >
            top
          </text>
        </g>
      )}

      <rect
        x={12}
        y={chipY}
        width={width - 24}
        height={chipHeight}
        rx="8"
        fill={accent}
        opacity="0.15"
        stroke={accent}
        strokeWidth="1.5"
      />
      <text
        x={width / 2}
        y={chipY + chipHeight / 2 + 4}
        textAnchor="middle"
        className="fill-gray-800 dark:fill-gray-100"
        fontSize="11"
        fontFamily="monospace"
        fontWeight="700"
      >
        isFull() → {String(result)}
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `isFull tells you whether a stack has run out of room to accept another push. It only really matters for a fixed-capacity stack like an array-backed one; a linked-list stack can just keep allocating nodes, so it rarely needs this check.`,
    `The Is Full operation is crucial when working with fixed-size stacks to prevent overflow errors. While not needed for dynamically-sized stacks, it's an essential safety check in many system-level implementations.`,
  ];

  const working = [
    { points: "Returns true if the stack cannot accept more elements." },
    { points: "Returns false if the stack can accept more elements." },
    {
      points:
        "For dynamic stacks (no fixed size), this operation typically always returns false.",
    },
    { points: "Often used with Push operations to prevent stack overflow." },
  ];

  const CAPACITY = 3;

  // `stack` is bottom-first, so the last value is the top of the stack.
  const examples = [
    { stack: [], caption: "Empty — two slots free, so a push is safe" },
    { stack: [5, 3], caption: "Partly filled — one slot still free" },
    { stack: [7, 3, 5], caption: "Every slot taken — the next push would overflow" },
  ];

  const complexity = [
    {
      points: "Fixed-size Stack:",
      subpoints: ["Time Complexity: O(1)", "Space Complexity: O(1)"],
    },
    {
      points: "Dynamic Stack:",
      subpoints: ["Time Complexity: O(1)", "Space Complexity: O(1)"],
    },
  ];

  const useCase = [
    { points: "Preventing stack overflow in memory-constrained systems." },
    { points: "Implementing bounded buffers or fixed-size caches." },
    { points: "Memory management in embedded systems." },
    { points: "Validating stack capacity before push operations" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is the "Is Full" Operation? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is the "Is Full" Operation?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How It Works
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {working.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ul>

            <p className="text-gray-700 dark:text-gray-300 mt-6 mb-4 leading-relaxed">
              Consider a stack with a maximum capacity of {CAPACITY} elements.
              The dashed outlines are the slots still free — isFull() is just
              asking whether any are left:
            </p>

            <div className="mt-4 grid gap-6 sm:grid-cols-3 not-prose">
              {examples.map((item, index) => (
                <div key={index}>
                  <StackFullDiagram
                    keyPrefix={`isfull-case${index}`}
                    values={item.stack}
                    capacity={CAPACITY}
                  />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                Occupied slot
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm border-2 border-dashed border-gray-400 inline-block"></span>
                Free slot
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Returns true
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Returns false
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Note that the check never looks at the values themselves — it only
              compares the size against the capacity, which is why it costs O(1)
              no matter how large the stack is. A dynamic stack has no fixed
              capacity to compare against, so its isFull() simply always returns
              false.
            </p>
          </div>
        </section>

        {/* Time and Space Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time and Space Complexity
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Here's the time and space complexity analysis for stack
              operations:
            </p>
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {complexity.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {item.points.split(":")[0]}:
                  </span>
                  <span className="ml-2">{item.points.split(":")[1]}</span>
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

        {/* Common Use Cases */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Common Use Cases
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {useCase.map((item, index) => (
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
