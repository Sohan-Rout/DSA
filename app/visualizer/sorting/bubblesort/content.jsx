"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const ArrayStepDiagram = ({ values, i, j, swapped, sortedFrom, keyPrefix }) => {
  const boxSize = 40;
  const gap = 8;
  const paddingX = 8;
  const topPadding = 26;
  const width = values.length * (boxSize + gap) - gap + paddingX * 2;
  const height = boxSize + topPadding + 22;

  const boxX = (idx) => paddingX + idx * (boxSize + gap);
  const boxY = topPadding;

  const isSorted = (idx) => sortedFrom !== undefined && idx >= sortedFrom;
  const isCompared = (idx) => idx === i || idx === j;

  const fillFor = (idx) => {
    if (isCompared(idx)) return swapped ? "#f59e0b" : "#94a3b8";
    if (isSorted(idx)) return "#10b981";
    return "#3b82f6";
  };

  const cx = (idx) => boxX(idx) + boxSize / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
    >
      <defs>
        <marker
          id={`${keyPrefix}-swap-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#f59e0b" />
        </marker>
      </defs>

      {swapped && i !== undefined && j !== undefined && (
        <path
          d={`M ${cx(i)} ${boxY - 6} Q ${(cx(i) + cx(j)) / 2} ${boxY - 20} ${cx(j)} ${boxY - 6}`}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          markerEnd={`url(#${keyPrefix}-swap-arrow)`}
        />
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
            opacity={isCompared(idx) || isSorted(idx) ? "0.9" : "0.25"}
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
          <text
            x={cx(idx)}
            y={boxY + boxSize + 16}
            textAnchor="middle"
            className="fill-gray-400 dark:fill-gray-500"
            fontSize="9"
          >
            {idx}
          </text>
        </g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `Bubble Sort walks through the array from one end to the other, checking each pair of neighboring values as it goes and swapping them whenever they're in the wrong order. One full walkthrough is called a pass, and the array keeps getting passed over again until a pass finishes without needing a single swap. The name comes from how the largest unsorted value rises toward its correct position with every pass, similar to a bubble floating up.`,
    `Bubble Sort is an in-place sorting algorithm, meaning it requires only O(1) additional space (for temporary storage during swaps).`,
    `Bubble Sort is simple to understand and implement but inefficient for large datasets. It's mainly used for educational purposes to introduce sorting algorithms. In practice, more efficient algorithms like QuickSort or MergeSort are preferred.`,
  ];

  const working = [
    {
      passes: "First Pass:",
      sortedFrom: 4,
      points: [
        "(5, 1) → Swap → [1, 5, 4, 2, 8]",
        "(5, 4) → Swap → [1, 4, 5, 2, 8]",
        "(5, 2) → Swap → [1, 4, 2, 5, 8]",
        "(5, 8) → No swap",
      ],
      steps: [
        { array: [5, 1, 4, 2, 8], i: 0, j: 1, swapped: true },
        { array: [1, 5, 4, 2, 8], i: 1, j: 2, swapped: true },
        { array: [1, 4, 5, 2, 8], i: 2, j: 3, swapped: true },
        { array: [1, 4, 2, 5, 8], i: 3, j: 4, swapped: false },
      ],
    },
    {
      passes: "Second Pass:",
      sortedFrom: 3,
      points: [
        "(1, 4) → No swap",
        "(4, 2) → Swap → [1, 2, 4, 5, 8]",
        "(4, 5) → No swap",
      ],
      steps: [
        { array: [1, 4, 2, 5, 8], i: 0, j: 1, swapped: false },
        { array: [1, 4, 2, 5, 8], i: 1, j: 2, swapped: true },
        { array: [1, 2, 4, 5, 8], i: 2, j: 3, swapped: false },
      ],
    },
    {
      passes: "Third Pass:",
      sortedFrom: 0,
      points: ["No swaps needed → List is sorted"],
      steps: [
        { array: [1, 2, 4, 5, 8], i: 0, j: 1, swapped: false },
        { array: [1, 2, 4, 5, 8], i: 1, j: 2, swapped: false },
        { array: [1, 2, 4, 5, 8], i: 2, j: 3, swapped: false },
        { array: [1, 2, 4, 5, 8], i: 3, j: 4, swapped: false },
      ],
    },
  ];

  const algorithm = [
    { points: "Start with an unsorted array" },
    { points: "Set a flag to track if any swaps occur" },
    {
      points: "For each pair of adjacent elements:",
      subpoints: [
        "Compare the two elements",
        "If they are in the wrong order, swap them",
        "Set the swap flag to true",
      ],
    },
    {
      points:
        "Repeat the process until a complete pass is made without any swaps",
    },
    { points: "The array is now sorted" },
  ];

  const complexity = [
    {
      points:
        "Best Case: Array is already sorted → O(n) (only one pass needed).",
    },
    { points: "Average Case: Randomly ordered array → O(n²)." },
    { points: "Worst Case: Array is sorted in reverse order → O(n²)." },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Bubble Sort */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Bubble Sort?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[0]}
            </p>
          </div>
        </section>

        {/* How Does It Work */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Imagine you have an unsorted list of numbers: [5, 1, 4, 2, 8]
            </p>

            <ol className="space-y-6 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {working.map((items, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {items.passes}
                  {items.points && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                      {items.points.map((subitems, subindex) => (
                        <li
                          key={subindex}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {subitems}
                        </li>
                      ))}
                    </ul>
                  )}

                  {items.steps && (
                    <div className="mt-4 flex flex-wrap items-center gap-3 not-prose overflow-x-auto pb-2">
                      {items.steps.map((step, stepIndex) => (
                        <ArrayStepDiagram
                          key={stepIndex}
                          keyPrefix={`pass${index}-step${stepIndex}`}
                          values={step.array}
                          i={step.i}
                          j={step.j}
                          swapped={step.swapped}
                          sortedFrom={items.sortedFrom}
                        />
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Compared &amp; swapped
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-400 inline-block"></span>
                Compared, no swap
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Sorted position
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              The algorithm stops when a complete pass is made without any
              swaps.
            </p>
          </div>
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Algorithm Steps
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {algorithm.map((items, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {items.points}
                  {items.subpoints && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                      {items.subpoints.map((subitems, subindex) => (
                        <li
                          key={subindex}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {subitems}
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
          </div>

          <div className="mt-8">
            <ComplexityGraph
              bestCase={(n) => 1}
              averageCase={(n) => n * n}
              worstCase={(n) => n * n}
              maxN={25}
            />
          </div>

          <InContentAd />
        </section>

        {/* Space Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Space Complexity
          </h1>
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
