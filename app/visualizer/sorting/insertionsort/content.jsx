"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const InsertionStepDiagram = ({
  values,
  sortedFrom,
  keyIndex,
  targetIndex,
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

  const shifts = (idx) =>
    targetIndex !== null &&
    keyIndex !== targetIndex &&
    idx >= targetIndex &&
    idx < keyIndex;

  const fillFor = (idx) => {
    if (idx === keyIndex) return "#f59e0b";
    if (shifts(idx)) return "#94a3b8";
    if (idx < sortedFrom) return "#10b981";
    return "#3b82f6";
  };

  const opacityFor = (idx) => {
    if (idx === keyIndex || idx < sortedFrom) return "0.9";
    if (shifts(idx)) return "0.5";
    return "0.25";
  };

  const labelFor = (idx) => {
    if (idx === keyIndex) return "key";
    if (targetIndex !== null && idx === targetIndex && idx !== keyIndex)
      return "insert here";
    return null;
  };

  const moves = targetIndex !== null && keyIndex !== targetIndex;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
    >
      <defs>
        <marker
          id={`${keyPrefix}-move-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#f59e0b" />
        </marker>
      </defs>

      {moves && (
        <path
          d={`M ${cx(keyIndex)} ${boxY - 6} Q ${(cx(keyIndex) + cx(targetIndex)) / 2} ${
            boxY - 20
          } ${cx(targetIndex)} ${boxY - 6}`}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          markerEnd={`url(#${keyPrefix}-move-arrow)`}
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
                fill="#f59e0b"
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
    `Insertion Sort grows a sorted section of the array one element at a time, which is basically how most people sort a hand of playing cards: pick up the next card and slide it into the spot where it belongs among the cards you've already arranged.`,
    `The algorithm maintains a "sorted sublist" that grows with each iteration.`,
    `Insertion Sort is often used when the data is nearly sorted (where it approaches O(n) time) or when the dataset is small. Some hybrid algorithms like TimSort use Insertion Sort for small subarrays due to its low overhead.`,
  ];

  const working = [
    {
      points: "First Element (7):",
      subpoints: ['Already "sorted" as the first item', "→ [7, 3, 5, 2, 1]"],
      array: [7, 3, 5, 2, 1],
      sortedFrom: 0,
      keyIndex: 0,
      targetIndex: 0,
    },
    {
      points: "Second Element (3):",
      subpoints: ["Insert before 7", "→ [3, 7, 5, 2, 1]"],
      array: [7, 3, 5, 2, 1],
      sortedFrom: 1,
      keyIndex: 1,
      targetIndex: 0,
    },
    {
      points: "Third Element (5):",
      subpoints: ["Insert between 3 and 7", "→ [3, 5, 7, 2, 1]"],
      array: [3, 7, 5, 2, 1],
      sortedFrom: 2,
      keyIndex: 2,
      targetIndex: 1,
    },
    {
      points: "Fourth Element (2):",
      subpoints: ["Insert at beginning", "→ [2, 3, 5, 7, 1]"],
      array: [3, 5, 7, 2, 1],
      sortedFrom: 3,
      keyIndex: 3,
      targetIndex: 0,
    },
    {
      points: "Fifth Element (1):",
      subpoints: ["Insert at beginning", "→ [1, 2, 3, 5, 7]"],
      array: [2, 3, 5, 7, 1],
      sortedFrom: 4,
      keyIndex: 4,
      targetIndex: 0,
    },
  ];

  const algorithm = [
    {
      steps: "Start with the second element (consider first element as sorted)",
    },
    { steps: "Pick the next element (key) from the unsorted portion" },
    {
      steps: "Compare the key with elements in the sorted portion:",
      points: [
        "Shift elements greater than the key one position right",
        "Stop when you find an element ≤ the key",
      ],
    },
    { steps: "Insert the key in its correct position" },
    { steps: "Repeat until all elements are processed" },
  ];

  const timeComplexity = [
    {
      points:
        "Best Case: Already sorted array → O(n) (only comparisons, no shifts).",
    },
    { points: "Average Case: Randomly ordered array → O(n²)." },
    {
      points:
        "Worst Case: Reverse sorted array → O(n²) (maximum comparisons and shifts).",
    },
  ];

  const advantages = [
    {
      points:
        "Efficient for small datasets (often faster than more complex algorithms for n ≤ 10)",
    },
    { points: "Stable (doesn't change relative order of equal elements)" },
    { points: "Adaptive (performs well with partially sorted data)" },
    { points: "Online (can sort as it receives input)" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Insertion Sort */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Insertion Sort?
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
              Consider this unsorted array: [7, 3, 5, 2, 1]
            </p>

            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {working.map((items, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-semibold">{items.points}</span>
                  {items.subpoints && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500 font-normal">
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
                  {items.array && (
                    <div className="mt-3 not-prose">
                      <InsertionStepDiagram
                        keyPrefix={`is-step${index}`}
                        values={items.array}
                        sortedFrom={items.sortedFrom}
                        keyIndex={items.keyIndex}
                        targetIndex={items.targetIndex}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Key (being inserted)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-400 inline-block"></span>
                Shifts right
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Sorted portion
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {paragraph[1]}
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
              {algorithm.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.steps}
                  {item.points && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                      {item.points.map((subitem, subindex) => (
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
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {timeComplexity.map((item, index) => (
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
              bestCase={(n) => n}
              averageCase={(n) => n * n}
              worstCase={(n) => n * n}
              maxN={25}
            />
          </div>

          <InContentAd />
        </section>

        {/* Advantages */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Advantages
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {advantages.map((item, index) => (
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
