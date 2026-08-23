"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const StackEmptyDiagram = ({ values, result, keyPrefix }) => {
  const boxWidth = 84;
  const boxHeight = 36;
  const topPadding = 22;
  const sideMargin = 26;
  // Both diagrams reserve the same slots so they line up side by side.
  const slotCount = Math.max(values.length, 3);
  const width = 190;

  const containerTop = topPadding - 6;
  const containerBottom = topPadding + slotCount * boxHeight;
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
      aria-label={`stack with ${values.length} elements`}
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
        size = {values.length}
      </text>

      <path
        d={`M ${sideMargin} ${containerTop} L ${sideMargin} ${containerBottom} L ${sideMargin + boxWidth} ${containerBottom} L ${sideMargin + boxWidth} ${containerTop}`}
        fill="none"
        className="stroke-gray-400 dark:stroke-gray-500"
        strokeWidth="2"
      />

      {values.length === 0 && (
        <>
          <rect
            x={sideMargin + 3}
            y={boxY(0)}
            width={boxWidth - 6}
            height={boxHeight - 4}
            rx="6"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.7"
          />
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
        </>
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

      {/* The pointer isEmpty() actually inspects */}
      <g>
        <line
          x1={sideMargin + boxWidth + 24}
          y1={boxY(Math.max(topIndex, 0)) + (boxHeight - 4) / 2}
          x2={sideMargin + boxWidth + 8}
          y2={boxY(Math.max(topIndex, 0)) + (boxHeight - 4) / 2}
          stroke="#94a3b8"
          strokeWidth="1.5"
          markerEnd={`url(#${keyPrefix}-top-arrow)`}
        />
        <text
          x={sideMargin + boxWidth + 28}
          y={boxY(Math.max(topIndex, 0)) + (boxHeight - 4) / 2 + 4}
          className="fill-gray-500 dark:fill-gray-400"
          fontSize="11"
          fontFamily="monospace"
        >
          {values.length === 0 ? "none" : "top"}
        </text>
      </g>

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
        isEmpty() → {String(result)}
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `isEmpty just tells you whether there's anything on the stack at all. It exists so you can guard pop() and peek() calls: checking first avoids trying to read or remove from a stack that has nothing in it.`,
    `The isEmpty operation is a simple but crucial part of stack implementation, ensuring safe stack manipulation and preventing runtime errors.`,
  ];

  const usage = [
    { points : "Prevent stack underflow errors before pop() operations." },
    { points : "Check if there are elements to process." },
    { points : "Validate stack state in algorithms." },
    { points : "Terminate processing loops when stack becomes empty." },
  ];

  // `stack` is bottom-first, so the last value is the top of the stack.
  const working = [
    {
      points: "For an empty stack [ ], isEmpty() returns true.",
      stack: [],
      result: true,
    },
    {
      points: "For a non-empty stack [5, 3, 8], isEmpty() returns false.",
      stack: [5, 3, 8],
      result: false,
    },
  ];

  const implementation = [
    { points : "Check the current size/length of the stack" },
    { points : "Return the result :",
      subpoints : [
        "true if size equals 0.",
        "false otherwise.",
      ],
     },
  ];

  const complexity = [
    { points : "O(1) constant time complexity." },
    { points : "The operation only needs to check one value (size/length) regardless of stack size." },
  ];

    return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          {/* What is the isEmpty Operation in Stack? */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              What is the isEmpty Operation in Stack?
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraphs[0]}
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
                Consider a stack represented as an array: [ ] (empty) or [5, 3,
                8] (with elements).
              </p>

              <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {working.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700 dark:text-gray-300 pl-2"
                  >
                    {item.points}
                    <div className="mt-3 not-prose">
                      <StackEmptyDiagram
                        keyPrefix={`isempty-case${index}`}
                        values={item.stack}
                        result={item.result}
                      />
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                  Returns true (nothing on the stack)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                  Returns false (at least one element)
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                The operation simply checks if the stack&apos;s size/length is
                zero. Notice it never reads any of the values — only the size
                line and whether there is a top at all, which is why it costs
                the same no matter how tall the stack gets.
              </p>
            </div>
          </section>

          {/* Algorithm Implementation */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              Algorithm Implementation
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {implementation.map((item, index) => (
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

          {/* Time Complexity */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              Time Complexity
            </h2>
            <div className="prose dark:prose-invert max-w-none">
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

          {/* Practical Usage */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              Practical Usage
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {usage.map((item, index) => (
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