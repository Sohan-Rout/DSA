"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const MiniArrayGroup = ({ values, keyPrefix, accent }) => {
  const boxSize = 34;
  const gap = 6;
  const paddingX = 6;
  const paddingY = 6;
  const width = Math.max(values.length, 1) * (boxSize + gap) - gap + paddingX * 2;
  const height = boxSize + paddingY * 2;

  const fill =
    accent === "final" ? "#10b981" : accent === "pivot" ? "#f59e0b" : accent === "dim" ? "#94a3b8" : "#3b82f6";

  if (values.length === 0) {
    return (
      <span className="inline-block align-middle text-xs text-gray-400 dark:text-gray-500 italic px-2">
        empty
      </span>
    );
  }

  const boxX = (idx) => paddingX + idx * (boxSize + gap);
  const cx = (idx) => boxX(idx) + boxSize / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="inline-block align-middle"
      style={{ width: `${width}px`, maxWidth: "100%" }}
    >
      {values.map((val, idx) => (
        <g key={`${keyPrefix}-box-${idx}`}>
          <rect
            x={boxX(idx)}
            y={paddingY}
            width={boxSize}
            height={boxSize}
            rx="6"
            fill={fill}
            opacity={accent === "final" || accent === "pivot" ? "0.9" : "0.35"}
            stroke={fill}
            strokeWidth="2"
          />
          <text
            x={cx(idx)}
            y={paddingY + boxSize / 2 + 5}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="13"
            fontWeight="700"
          >
            {val}
          </text>
        </g>
      ))}
    </svg>
  );
};

const PartitionFlowDiagram = ({
  beforeValues,
  pivotIndex,
  afterValues,
  pivotFinalIndex,
  keyPrefix,
}) => {
  const boxSize = 36;
  const gap = 6;
  const paddingX = 8;
  const row1Y = 24;
  const rowGap = 46;
  const row2Y = row1Y + boxSize + rowGap;
  const pivotValue = beforeValues[pivotIndex];
  const width = beforeValues.length * (boxSize + gap) - gap + paddingX * 2;
  const height = row2Y + boxSize + 4;

  const boxX = (idx) => paddingX + idx * (boxSize + gap);
  const cx = (idx) => boxX(idx) + boxSize / 2;

  const beforeFill = (idx) => {
    if (idx === pivotIndex) return "#f59e0b";
    return beforeValues[idx] < pivotValue ? "#3b82f6" : "#94a3b8";
  };

  const afterFill = (idx) => {
    if (idx === pivotFinalIndex) return "#10b981";
    return idx < pivotFinalIndex ? "#3b82f6" : "#94a3b8";
  };

  const arrowStartX = cx(pivotIndex);
  const arrowStartY = row1Y + boxSize + 4;
  const arrowEndX = cx(pivotFinalIndex);
  const arrowEndY = row2Y - 4;
  const arrowControlY = (arrowStartY + arrowEndY) / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
    >
      <defs>
        <marker
          id={`${keyPrefix}-pivot-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#f59e0b" />
        </marker>
      </defs>

      <path
        d={`M ${arrowStartX} ${arrowStartY} Q ${(arrowStartX + arrowEndX) / 2} ${arrowControlY} ${arrowEndX} ${arrowEndY}`}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.5"
        markerEnd={`url(#${keyPrefix}-pivot-arrow)`}
      />

      {beforeValues.map((val, idx) => (
        <g key={`${keyPrefix}-before-${idx}`}>
          {idx === pivotIndex && (
            <text
              x={cx(idx)}
              y={row1Y - 8}
              textAnchor="middle"
              fill="#f59e0b"
              fontSize="9"
              fontWeight="700"
            >
              pivot
            </text>
          )}
          <rect
            x={boxX(idx)}
            y={row1Y}
            width={boxSize}
            height={boxSize}
            rx="6"
            fill={beforeFill(idx)}
            opacity="0.9"
            stroke={beforeFill(idx)}
            strokeWidth="2"
          />
          <text
            x={cx(idx)}
            y={row1Y + boxSize / 2 + 5}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="14"
            fontWeight="700"
          >
            {val}
          </text>
        </g>
      ))}

      {afterValues.map((val, idx) => (
        <g key={`${keyPrefix}-after-${idx}`}>
          <rect
            x={boxX(idx)}
            y={row2Y}
            width={boxSize}
            height={boxSize}
            rx="6"
            fill={afterFill(idx)}
            opacity="0.9"
            stroke={afterFill(idx)}
            strokeWidth="2"
          />
          <text
            x={cx(idx)}
            y={row2Y + boxSize / 2 + 5}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="14"
            fontWeight="700"
          >
            {val}
          </text>
        </g>
      ))}
    </svg>
  );
};

const StepArrow = ({ down }) => (
  <span
    className={`text-gray-400 dark:text-gray-500 font-bold align-middle ${
      down ? "block my-1 text-center" : "mx-2"
    }`}
  >
    {down ? "↓" : "→"}
  </span>
);

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Quick Sort picks one element as a 'pivot' and uses it to split the rest of the array into two groups: everything smaller goes left of the pivot, everything larger goes right. Each of those groups then gets the same treatment recursively, until the whole array falls into place.`,
    `The log n factor comes from the division steps when partitions are balanced. The n² occurs when the pivot selection consistently creates unbalanced partitions.`,
    `Quick Sort is O(log n) space complexity for the call stack in the average case, but can degrade to O(n) in the worst case with unbalanced partitions. It is generally considered an in-place algorithm as it doesn't require significant additional space.`,
    `Quick Sort is the algorithm of choice for most standard library sorting implementations (like C's qsort, Java's Arrays.sort for primitives) due to its excellent average-case performance. It's particularly effective for large datasets that fit in memory.`,
  ];

  const working = [
    {
      steps: "Partitioning Phase:",
      points: [
        "Choose last element as pivot (70)",
        "Rearrange: elements < pivot on left, > pivot on right → [10, 30, 40, 50] [70] [80, 90]",
      ],
    },
    {
      steps: "Recursive Phase:",
      points: [
        "Apply same process to left sub-array [10, 30, 40, 50]",
        "Apply same process to right sub-array [80, 90]",
        "Combine results: [10, 30, 40, 50, 70, 80, 90]",
      ],
    },
  ];

  const algorithm = [
    {
      steps: "Choose Pivot:",
      points: [
        "Select an element as pivot (commonly last/first/random element)",
      ],
    },
    {
      steps: "Partition:",
      points: [
        "Reorder array so elements < pivot come before it",
        "Elements > pivot come after it",
        "Pivot is now in its final sorted position",
      ],
    },
    {
      steps: "Recurse:",
      points: [
        "Apply quick sort to left sub-array (elements < pivot)",
        "Apply quick sort to right sub-array (elements > pivot)",
      ],
    },
  ];

  const timeComplexity = [
    { points: "Best Case: O(n log n) (balanced partitions)" },
    { points: "Average Case: O(n log n)" },
    { points: "Worst Case: O(n²) (unbalanced partitions)" },
  ];

  const strategies = [
    { strategy: "Last element" },
    { strategy: "First element" },
    { strategy: "Random element" },
    { strategy: "Median-of-three" },
    { strategy: "Middle element" },
  ];

  const strategiesDetails = [
    { details: "Simple but can lead to worst-case on sorted arrays" },
    { details: "Similar issues as last element" },
    { details: "Reduces chance of worst-case scenarios" },
    { details: "Takes median of first, middle, last elements" },
    { details: "Often provides good balance" },
  ];

  const CombinedDeatils = strategies.map((item, index) => ({
    strategy: item.strategy,
    details: strategiesDetails[index].details,
  }));

  {
    /* Advantages */
  }
  const advantages = [
    {
      points: "Fastest general-purpose in-memory sorting algorithm in practice",
    },
    { points: "In-place algorithm (requires minimal additional memory)" },
    { points: "Cache-efficient due to sequential memory access" },
    { points: "Can be easily parallelized for better performance" },
  ];

  {
    /* Disadvantages */
  }
  const disadvantages = [
    { points: "Not stable (relative order of equal elements may change)" },
    {
      points:
        "Worst-case O(n²) performance (though rare with proper pivot selection)",
    },
    { points: "Performance depends heavily on pivot selection strategy" },
    { points: "Not ideal for linked lists (works best with arrays)" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Quick Sort */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Quick Sort?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
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
              Consider this unsorted array: [10, 80, 30, 90, 40, 50, 70]
            </p>

            <ul className="space-y-5">
              {working.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">{item.steps}</span>
                  {item.points && (
                    <ol className="mt-2 space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400 font-normal">
                      {item.points.map((subitem, subindex) => (
                        <li
                          key={subindex}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {subitem}
                        </li>
                      ))}
                    </ol>
                  )}

                  {index === 0 && (
                    <div className="mt-3 not-prose">
                      <PartitionFlowDiagram
                        keyPrefix="qs-partition"
                        beforeValues={[10, 80, 30, 90, 40, 50, 70]}
                        pivotIndex={6}
                        afterValues={[10, 30, 40, 50, 70, 80, 90]}
                        pivotFinalIndex={4}
                      />
                    </div>
                  )}

                  {index === 1 && (
                    <div className="mt-3 not-prose space-y-4">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Partition [10, 30, 40, 50]:
                        </div>
                        <PartitionFlowDiagram
                          keyPrefix="qs-rec-left"
                          beforeValues={[10, 30, 40, 50]}
                          pivotIndex={3}
                          afterValues={[10, 30, 40, 50]}
                          pivotFinalIndex={3}
                        />
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Partition [80, 90]:
                        </div>
                        <PartitionFlowDiagram
                          keyPrefix="qs-rec-right"
                          beforeValues={[80, 90]}
                          pivotIndex={1}
                          afterValues={[80, 90]}
                          pivotFinalIndex={1}
                        />
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Combine sorted left + pivot + sorted right:
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <MiniArrayGroup keyPrefix="qs-comb-left" values={[10, 30, 40, 50]} />
                          <MiniArrayGroup keyPrefix="qs-comb-pivot" values={[70]} accent="pivot" />
                          <MiniArrayGroup keyPrefix="qs-comb-right" values={[80, 90]} />
                          <StepArrow />
                          <MiniArrayGroup
                            keyPrefix="qs-final"
                            values={[10, 30, 40, 50, 70, 80, 90]}
                            accent="final"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Pivot
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                Less than pivot
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-400 inline-block"></span>
                Greater than pivot
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Fully sorted
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
            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {paragraphs[1]}
            </p>
            <div className="mt-8">
              <ComplexityGraph
                bestCase={(n) => n * Math.log2(n)}
                averageCase={(n) => n * Math.log2(n)}
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
              {paragraphs[2]}
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

        {/* Disadvantages */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Disadvantages
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {disadvantages.map((item, index) => (
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

        {/* Pivot Selection Strategies */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Pivot Selection Strategies
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {CombinedDeatils.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-semibold">{item.strategy}:</span>{" "}
                  {item.details}
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
                {paragraphs[3]}
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
