"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const StackDiagram = ({ values, highlight, keyPrefix }) => {
  const boxWidth = 84;
  const boxHeight = 36;
  const topPadding = 22;
  const bottomPadding = 8;
  const sideMargin = 26;
  const slotCount = Math.max(values.length, 1);
  const height = topPadding + slotCount * boxHeight + bottomPadding;
  const width = sideMargin + boxWidth + 70;

  const containerTop = topPadding - 6;
  const containerBottom = topPadding + values.length * boxHeight;

  const boxY = (idx) => containerBottom - (idx + 1) * boxHeight;

  const colorFor = (idx) => {
    if (highlight && idx === values.length - 1) {
      return highlight === "pop" ? "#f59e0b" : "#10b981";
    }
    return "#3b82f6";
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="stack diagram"
    >
      <defs>
        <marker id={`${keyPrefix}-top-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
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
            opacity={idx === values.length - 1 ? "0.9" : "0.25"}
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
            x1={sideMargin + boxWidth + 26}
            y1={boxY(values.length - 1) + (boxHeight - 4) / 2}
            x2={sideMargin + boxWidth + 8}
            y2={boxY(values.length - 1) + (boxHeight - 4) / 2}
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-top-arrow)`}
          />
          <text
            x={sideMargin + boxWidth + 30}
            y={boxY(values.length - 1) + (boxHeight - 4) / 2 + 4}
            className="fill-gray-500 dark:fill-gray-400"
            fontSize="11"
            fontFamily="monospace"
          >
            top
          </text>
        </g>
      )}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Push and pop are the only two moves a stack really needs. Push adds a value on top, pop takes the top value back off, and because of that, whatever went on last is always the first thing to come off — that's the LIFO (Last In, First Out) rule in action.`,
    `Push and Pop operations are fundamental to stack functionality. While simple to implement, stacks are powerful data structures used in many algorithms and system designs.`,
  ];

  const examplePush = [
    { points: "Start with empty stack", stack: [] },
    { points: "Push 5", stack: [5], highlight: "push" },
    { points: "Push 3", stack: [5, 3], highlight: "push" },
    { points: "Push 7", stack: [5, 3, 7], highlight: "push" },
  ];

  const pushComplexity = [
    { points: "Time Complexity: O(1)" },
    { points: "Space Complexity: O(1)" },
  ];

  const examplePop = [
    { points: "Current stack, 7 on top", stack: [5, 3, 7] },
    { points: "Pop → returns 7", stack: [5, 3], highlight: "pop" },
    { points: "Pop → returns 3", stack: [5], highlight: "pop" },
    { points: "Pop → returns 5", stack: [] },
  ];

  const popComplexity = [
    { points: "Time Complexity: O(1)" },
    { points: "Space Complexity: O(1)" },
  ];

  {
    /* applications */
  }
  const applications = [
    {
      points: "Function call management in programming languages (call stack)",
    },
    { points: "Undo/Redo operations in text editors" },
    { points: "Back/Forward navigation in web browsers" },
    { points: "Expression evaluation and syntax parsing" },
    { points: "Memory management" },
  ];

  {
    /* underflow and overflow */
  }
  const flows = [{ title: "Stack Underflow" }, { title: "Stack Overflow" }];

  const flowsDetails = [
    { detail: "Trying to pop from an empty stack" },
    {
      detail: "Trying to push to a full stack (in fixed-size implementations)",
    },
  ];

  const combineData = flows.map((item, index) => ({
    title: item.title,
    detail: flowsDetails[index].detail,
  }));

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Stack Push & Pop */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Stack Push & Pop?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* Push Operation */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Push Operation
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Adds an element to the top of the stack.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Example: Pushing elements onto a stack
            </p>
            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {examplePush.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  <div className="mt-3 not-prose">
                    <StackDiagram keyPrefix={`push-step${index}`} values={item.stack} highlight={item.highlight} />
                  </div>
                </li>
              ))}
            </ol>
            <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {pushComplexity.map((item, index) => (
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
          </div>
        </section>

        {/* Pop Operation */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Pop Operation
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Removes and returns the topmost element from the stack.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Example: Popping elements from a stack
            </p>
            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {examplePop.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  <div className="mt-3 not-prose">
                    <StackDiagram keyPrefix={`pop-step${index}`} values={item.stack} highlight={item.highlight} />
                  </div>
                </li>
              ))}
            </ol>
            <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {popComplexity.map((item, index) => (
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

        {/* Stack Underflow & Overflow */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Stack Underflow & Overflow
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {combineData.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-semibold">{item.title}:</span>{" "}
                  {item.detail}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Real-world Applications */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Real-world Applications
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {applications.map((items, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {items.points}
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
