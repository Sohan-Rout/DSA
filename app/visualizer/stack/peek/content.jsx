"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const StackPeekDiagram = ({ values, highlight, returned, keyPrefix }) => {
  const boxWidth = 84;
  const boxHeight = 36;
  const topPadding = 22;
  const bottomPadding = 20;
  const sideMargin = 26;
  const slotCount = Math.max(values.length, 1);
  const height = topPadding + slotCount * boxHeight + bottomPadding;
  const width = sideMargin + boxWidth + 116;

  const containerTop = topPadding - 6;
  const containerBottom = topPadding + values.length * boxHeight;

  const boxY = (idx) => containerBottom - (idx + 1) * boxHeight;
  const topIndex = values.length - 1;
  const topMidY = boxY(topIndex) + (boxHeight - 4) / 2;

  // Violet marks a read-only look, to keep it distinct from push (green,
  // adds) and pop (amber, removes).
  const accent = highlight === "peek" ? "#8b5cf6" : "#f59e0b";

  const colorFor = (idx) => (highlight && idx === topIndex ? accent : "#3b82f6");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="stack diagram"
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
        <marker
          id={`${keyPrefix}-read-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill={accent} />
        </marker>
      </defs>

      <path
        d={`M ${sideMargin} ${containerTop} L ${sideMargin} ${containerBottom} L ${sideMargin + boxWidth} ${containerBottom} L ${sideMargin + boxWidth} ${containerTop}`}
        fill="none"
        className="stroke-gray-400 dark:stroke-gray-500"
        strokeWidth="2"
      />

      {values.length === 0 && (
        <text
          x={sideMargin + boxWidth / 2}
          y={containerBottom - 14}
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
            fill={colorFor(idx)}
            opacity={idx === topIndex ? "0.9" : "0.25"}
            stroke={colorFor(idx)}
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
            y1={topMidY}
            x2={sideMargin + boxWidth + 8}
            y2={topMidY}
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-top-arrow)`}
          />
          <text
            x={sideMargin + boxWidth + 28}
            y={topMidY + 4}
            className="fill-gray-500 dark:fill-gray-400"
            fontSize="11"
            fontFamily="monospace"
          >
            top
          </text>
        </g>
      )}

      {/* Read-only look: the value leaves as a return value, the box stays put */}
      {highlight === "peek" && values.length > 0 && (
        <g>
          <path
            d={`M ${sideMargin + boxWidth - 6} ${topMidY - 14}
               C ${sideMargin + boxWidth + 30} ${topMidY - 26}, ${sideMargin + boxWidth + 50} ${topMidY - 26}, ${sideMargin + boxWidth + 62} ${topMidY - 16}`}
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeDasharray="3 2"
            markerEnd={`url(#${keyPrefix}-read-arrow)`}
          />
          <text
            x={sideMargin + boxWidth + 30}
            y={topMidY - 30}
            className="fill-violet-600 dark:fill-violet-400"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="700"
          >
            returns {returned}
          </text>
        </g>
      )}

      <text
        x={sideMargin}
        y={height - 6}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
        fontFamily="monospace"
      >
        {highlight === "peek"
          ? `size stays ${values.length}`
          : `size ${values.length}`}
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Peek gives you a look at whatever's currently on top of the stack, but it leaves the stack exactly as it was: nothing gets popped.`,
    `The peek operation is useful when you need to inspect the top element before deciding whether to pop it or push another element onto the stack.`,
  ];

  // `stack` is the state after the step, bottom-first, so the last value is top.
  const example = [
    { points: "Current stack, 7 on top", stack: [5, 3, 7] },
    {
      points: "Peek → returns 7, and the stack is left exactly as it was",
      stack: [5, 3, 7],
      highlight: "peek",
      returned: 7,
    },
    {
      points: "Pop → returns 7 and removes it, so 3 becomes the new top",
      stack: [5, 3],
      highlight: "pop",
    },
    {
      points: "Peek → returns 3, again without removing anything",
      stack: [5, 3],
      highlight: "peek",
      returned: 3,
    },
  ];

  const complexity = [
    { points : "Time Complexity: O(1)" },
    { points : "Space Complexity: O(1)" },
  ];

  return (
<main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Peek Operation */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Peek Operation
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* How Does It Work */}
        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              A stack only ever exposes its top. Peek reads the value sitting
              there and hands it back, but unlike pop it never moves the top
              pointer, so the stack that comes out is the same stack that went
              in.
            </p>

            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Example: Peeking at a stack
            </p>

            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {example.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  <div className="mt-3 not-prose">
                    <StackPeekDiagram
                      keyPrefix={`peek-step${index}`}
                      values={item.stack}
                      highlight={item.highlight}
                      returned={item.returned}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-violet-500 inline-block"></span>
                Read by peek (stays on the stack)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Removed by pop
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                Untouched
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Notice the size line under each diagram: it only changes on the
              pop step. That is the whole difference between the two operations
              — both return the top value, but only pop takes it off.
            </p>

            <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
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

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>
        </section>
      </article>
      <NewsletterEmbed mobile theme={theme} />
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;
