"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const SelectionStepDiagram = ({
  values,
  sortedFrom,
  boundary,
  minIndex,
  swapped,
  keyPrefix,
}) => {
  const boxSize = 40;
  const gap = 8;
  const paddingX = 8;
  const topPadding = 42;
  const width = values.length * (boxSize + gap) - gap + paddingX * 2;
  const height = boxSize + topPadding + 22;

  const boxX = (idx) => paddingX + idx * (boxSize + gap);
  const boxY = topPadding;
  const cx = (idx) => boxX(idx) + boxSize / 2;

  const fillFor = (idx) => {
    if (idx === boundary && idx === minIndex) return "#f59e0b";
    if (idx === minIndex) return "#3b82f6";
    if (idx === boundary) return "#f59e0b";
    if (idx < sortedFrom) return "#10b981";
    return "#3b82f6";
  };

  const opacityFor = (idx) => {
    if (idx === boundary || idx === minIndex || idx < sortedFrom) return "0.9";
    return "0.25";
  };

  const labelFor = (idx) => {
    if (idx === boundary && idx === minIndex) return "pos";
    if (idx === minIndex) return "min";
    if (idx === boundary) return "pos";
    return null;
  };

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

      {swapped && (
        <path
          d={`M ${cx(boundary)} ${boxY - 6} Q ${(cx(boundary) + cx(minIndex)) / 2} ${
            boxY - 20
          } ${cx(minIndex)} ${boxY - 6}`}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          markerEnd={`url(#${keyPrefix}-swap-arrow)`}
        />
      )}

      {values.map((val, idx) => {
        const label = labelFor(idx);
        return (
          <g key={`${keyPrefix}-box-${idx}`}>
            {label && (
              <text
                x={cx(idx)}
                y={boxY - 26}
                textAnchor="middle"
                fill={idx === minIndex && idx !== boundary ? "#3b82f6" : "#f59e0b"}
                fontSize="9"
                fontWeight="700"
              >
                {label}
              </text>
            )}
            <rect
              x={boxX(idx)}
              y={boxY}
              width={boxSize}
              height={boxSize}
              rx="6"
              fill={fillFor(idx)}
              opacity={opacityFor(idx)}
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
        );
      })}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `Selection Sort splits the array into a sorted part on the left and an unsorted part on the right, and on every pass it scans the unsorted part for the smallest remaining value and swaps it into place at the boundary. The sorted section grows by exactly one element each time.`,
    `The quadratic time complexity occurs because it performs O(n) comparisons for each of the O(n) elements.`,
    `Selection Sort is an in-place algorithm, requiring only O(1) additional space for temporary variables during swaps.`,
    `Selection Sort is primarily used for educational purposes to introduce sorting concepts. In practice, it's outperformed by more advanced algorithms like QuickSort and MergeSort, but can be useful when memory writes are expensive (since it makes only O(n) swaps).`,
  ];

  const working = [
    {
      pass: "First Pass:",
      points: [
        "Find the minimum in [64, 25, 12, 22, 11] → 11 at index 4",
        "Swap with first element → [11, 25, 12, 22, 64]",
      ],
      array: [64, 25, 12, 22, 11],
      sortedFrom: 0,
      boundary: 0,
      minIndex: 4,
      swapped: true,
    },
    {
      pass: "Second Pass:",
      points: [
        "Find minimum in [25, 12, 22, 64] → 12 at index 2",
        "Swap with first element → [11, 12, 25, 22, 64]",
      ],
      array: [11, 25, 12, 22, 64],
      sortedFrom: 1,
      boundary: 1,
      minIndex: 2,
      swapped: true,
    },
    {
      pass: "Third Pass:",
      points: [
        "Find minimum in [25, 22, 64] → 22 at index 2",
        "Swap with first element → [11, 12, 22, 25, 64]",
      ],
      array: [11, 12, 25, 22, 64],
      sortedFrom: 2,
      boundary: 2,
      minIndex: 3,
      swapped: true,
    },
    {
      pass: "Fourth Pass:",
      points: [
        "Find minimum in [25, 64] → 25 at index 0",
        "No swap needed → [11, 12, 22, 25, 64]",
      ],
      array: [11, 12, 22, 25, 64],
      sortedFrom: 3,
      boundary: 3,
      minIndex: 3,
      swapped: false,
    },
    {
      pass: "Result:",
      points: ["[11, 12, 22, 25, 64]"],
      array: [11, 12, 22, 25, 64],
      sortedFrom: 5,
      boundary: null,
      minIndex: null,
      swapped: false,
    },
  ];

  const algorithm = [
    { points: "Set the first element as minimum" },
    {
      points: "Compare minimum with the second element:",
      subpoints: ["If second element is smaller, set it as new minimum"],
    },
    { points: "Continue until last element is reached" },
    { points: "Swap minimum with first element" },
    { points: "Repeat for remaining unsorted portion" },
  ];

  const timeComplexity = [
    { points: "Best Case: ", subpoints: ["O(n²)"] },
    { points: "Average Case: ", subpoints: ["O(n²)"] },
    { points: "Worst Case: ", subpoints: ["O(n²)"] },
  ];

  const Advantages = [
    { points: "Simple to understand and implement" },
    { points: "Performs well on small lists" },
    { points: "Minimal memory usage (in-place sorting)" },
    { points: "Only O(n) swaps required (better than Bubble Sort)" },
  ];

  const Disadvantages = [
    { points: "Poor performance on large lists (quadratic time complexity)" },
    { points: "Not stable (may change relative order of equal elements)" },
    { points: "Less efficient than Insertion Sort for nearly sorted data" },
    { points: "Always performs O(n²) comparisons regardless of input" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Selection Sort */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Selection Sort?
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
              Consider this unsorted array: [64, 25, 12, 22, 11]
            </p>

            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {working.map((items, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-semibold">{items.pass}</span>
                  {items.points && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500 font-normal">
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
                  {items.array && (
                    <div className="mt-3 not-prose">
                      <SelectionStepDiagram
                        keyPrefix={`ss-pass${index}`}
                        values={items.array}
                        sortedFrom={items.sortedFrom}
                        boundary={items.boundary}
                        minIndex={items.minIndex}
                        swapped={items.swapped}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Boundary position
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                Smallest found so far
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Sorted portion
              </span>
            </div>
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
              {timeComplexity.map((items, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {items.points}
                  </span>
                  <span className="ml-2">{items.subpoints}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {paragraph[1]}
            </p>

            <div className="mt-8">
              <ComplexityGraph
                bestCase={(n) => n * n}
                averageCase={(n) => n * n}
                worstCase={(n) => n * n}
                maxN={25}
              />
            </div>

            <InContentAd />
          </div>
        </section>

        {/* Space Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Space Complexity
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[2]}
            </p>
          </div>
        </section>

        {/* Advantages */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Advantages
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {Advantages.map((item, index) => (
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

        {/* Disadvantages */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Disadvantages
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {Disadvantages.map((item, index) => (
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
                {paragraph[3]}
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
