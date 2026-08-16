"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const BOX = 34;
const GAP = 6;
const SLOT = BOX + GAP;
const PAD_X = 8;

// Every level partitions the same slots, so keeping one global column per
// element makes the parent/child connectors line up without any layout maths.
const LevelsDiagram = ({ levels, mode, keyPrefix }) => {
  const slots = levels[0].reduce((sum, group) => sum + group.length, 0);
  const levelGap = 30;
  const topPadding = 6;
  const width = slots * SLOT - GAP + PAD_X * 2;
  const height =
    levels.length * BOX + (levels.length - 1) * levelGap + topPadding * 2;

  const slotX = (slot) => PAD_X + slot * SLOT;
  const levelY = (level) => topPadding + level * (BOX + levelGap);

  // Walk each level once, tagging every group with the slot it starts at.
  const placed = levels.map((groups) => {
    let slot = 0;
    return groups.map((values) => {
      const start = slot;
      slot += values.length;
      return { values, start, end: slot - 1 };
    });
  });

  const groupCenter = (group) =>
    (slotX(group.start) + slotX(group.end) + BOX) / 2;

  const accent = mode === "merge" ? "#10b981" : "#3b82f6";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
    >
      <defs>
        <marker
          id={`${keyPrefix}-arrow`}
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill={accent} opacity="0.7" />
        </marker>
      </defs>

      {/* Connectors between a group and the groups it splits into / came from.
          Whichever level holds the finer partition drives the pairing: divide
          splits downward into smaller groups, merge combines downward into
          bigger ones, but either way the arrow runs top to bottom. */}
      {placed.slice(0, -1).map((groups, level) => {
        const fine = mode === "merge" ? groups : placed[level + 1];
        const coarse = mode === "merge" ? placed[level + 1] : groups;
        const fromY = levelY(level) + BOX;
        const toY = levelY(level + 1);

        return fine.map((fineGroup, index) => {
          const coarseGroup = coarse.find(
            (group) =>
              fineGroup.start >= group.start && fineGroup.end <= group.end
          );
          if (!coarseGroup) return null;
          const [x1, x2] =
            mode === "merge"
              ? [groupCenter(fineGroup), groupCenter(coarseGroup)]
              : [groupCenter(coarseGroup), groupCenter(fineGroup)];
          return (
            <path
              key={`${keyPrefix}-link-${level}-${index}`}
              d={`M ${x1} ${fromY} C ${x1} ${(fromY + toY) / 2}, ${x2} ${(fromY + toY) / 2}, ${x2} ${toY}`}
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              opacity="0.45"
              markerEnd={`url(#${keyPrefix}-arrow)`}
            />
          );
        });
      })}

      {placed.map((groups, level) =>
        groups.map((group, groupIndex) => {
          const isFinal =
            mode === "merge" ? level === placed.length - 1 : level === 0;
          const solo = group.values.length === 1 && mode === "divide";
          return (
            <g key={`${keyPrefix}-g-${level}-${groupIndex}`}>
              {group.values.length > 1 && (
                <rect
                  x={slotX(group.start) - 3}
                  y={levelY(level) - 3}
                  width={slotX(group.end) + BOX + 3 - (slotX(group.start) - 3)}
                  height={BOX + 6}
                  rx="8"
                  fill="none"
                  stroke={accent}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.4"
                />
              )}
              {group.values.map((value, valueIndex) => (
                <g key={`${keyPrefix}-b-${level}-${groupIndex}-${valueIndex}`}>
                  <rect
                    x={slotX(group.start + valueIndex)}
                    y={levelY(level)}
                    width={BOX}
                    height={BOX}
                    rx="6"
                    fill={solo ? "#94a3b8" : accent}
                    opacity={isFinal || solo ? "0.9" : "0.3"}
                    stroke={solo ? "#94a3b8" : accent}
                    strokeWidth="2"
                  />
                  <text
                    x={slotX(group.start + valueIndex) + BOX / 2}
                    y={levelY(level) + BOX / 2 + 5}
                    textAnchor="middle"
                    className="fill-gray-800 dark:fill-gray-100"
                    fontSize="13"
                    fontWeight="700"
                  >
                    {value}
                  </text>
                </g>
              ))}
            </g>
          );
        })
      )}
    </svg>
  );
};

// One comparison inside a merge: the two candidates, and where the winner goes.
const MergeStepDiagram = ({ left, right, li, ri, output, taken, keyPrefix }) => {
  const halfGap = 26;
  const topPadding = 22;
  const rowGap = 40;
  const totalSlots = left.length + right.length;
  const width = totalSlots * SLOT - GAP + halfGap + PAD_X * 2;
  const height = topPadding + BOX * 2 + rowGap + 20;

  const leftX = (idx) => PAD_X + idx * SLOT;
  const rightX = (idx) => PAD_X + (left.length + idx) * SLOT + halfGap;
  const outX = (idx) => PAD_X + idx * SLOT;
  const outY = topPadding + BOX + rowGap;

  const fillFor = (isCandidate, isTaken) => {
    if (isTaken) return "#10b981";
    if (isCandidate) return "#f59e0b";
    return "#3b82f6";
  };

  const renderHalf = (values, xFor, pointer, side) =>
    values.map((value, idx) => {
      const isCandidate = idx === pointer;
      const isTaken = isCandidate && taken === side;
      const consumed = idx < pointer;
      return (
        <g key={`${keyPrefix}-${side}-${idx}`}>
          <rect
            x={xFor(idx)}
            y={topPadding}
            width={BOX}
            height={BOX}
            rx="6"
            fill={fillFor(isCandidate, isTaken)}
            opacity={consumed ? "0.12" : isCandidate ? "0.9" : "0.3"}
            stroke={fillFor(isCandidate, isTaken)}
            strokeWidth="2"
          />
          <text
            x={xFor(idx) + BOX / 2}
            y={topPadding + BOX / 2 + 5}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="13"
            fontWeight="700"
            opacity={consumed ? "0.4" : "1"}
          >
            {value}
          </text>
        </g>
      );
    });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
    >
      <defs>
        <marker
          id={`${keyPrefix}-take`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#10b981" />
        </marker>
      </defs>

      <text
        x={PAD_X}
        y={12}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
      >
        left
      </text>
      <text
        x={rightX(0)}
        y={12}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
      >
        right
      </text>

      {renderHalf(left, leftX, li, "left")}
      {renderHalf(right, rightX, ri, "right")}

      {/* Winner dropping into the next free output slot */}
      {taken && (
        <path
          d={`M ${(taken === "left" ? leftX(li) : rightX(ri)) + BOX / 2} ${topPadding + BOX + 4}
             L ${outX(output.length - 1) + BOX / 2} ${outY - 6}`}
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          strokeDasharray="3 2"
          markerEnd={`url(#${keyPrefix}-take)`}
        />
      )}

      {Array.from({ length: totalSlots }).map((_, idx) => {
        const value = output[idx];
        const filled = value !== undefined;
        const justPlaced = idx === output.length - 1;
        return (
          <g key={`${keyPrefix}-out-${idx}`}>
            <rect
              x={outX(idx)}
              y={outY}
              width={BOX}
              height={BOX}
              rx="6"
              fill={filled ? "#10b981" : "none"}
              opacity={filled ? (justPlaced ? "0.9" : "0.35") : "1"}
              stroke={filled ? "#10b981" : "#94a3b8"}
              strokeWidth={filled ? "2" : "1"}
              strokeDasharray={filled ? undefined : "3 3"}
            />
            {filled && (
              <text
                x={outX(idx) + BOX / 2}
                y={outY + BOX / 2 + 5}
                textAnchor="middle"
                className="fill-gray-800 dark:fill-gray-100"
                fontSize="13"
                fontWeight="700"
              >
                {value}
              </text>
            )}
          </g>
        );
      })}

      <text
        x={PAD_X}
        y={outY + BOX + 14}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
      >
        merged output
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `Merge Sort takes the divide-and-conquer route: keep splitting the array in half until you're left with pieces of a single element each (which are trivially sorted), then merge those pieces back together two at a time, producing bigger and bigger sorted chunks until only one sorted array remains.`,
    `The log n factor comes from the division steps, while the n factor comes from the merge steps.`,
    `Merge Sort requires O(n) additional space for the temporary arrays during merging. This makes it not an in-place sorting algorithm, unlike Insertion Sort or Bubble Sort.`,
    `Merge Sort is particularly useful when sorting linked lists (where random access is expensive) and is the algorithm of choice for many standard library sorting implementations when stability is required. It's also commonly used in external sorting where data doesn't fit in memory.`,
  ];

  const divideLevels = [
    [[38, 27, 43, 3, 9, 82, 10]],
    [
      [38, 27, 43, 3],
      [9, 82, 10],
    ],
    [
      [38, 27],
      [43, 3],
      [9, 82],
      [10],
    ],
    [[38], [27], [43], [3], [9], [82], [10]],
  ];

  const mergeLevels = [
    [[38], [27], [43], [3], [9], [82], [10]],
    [
      [27, 38],
      [3, 43],
      [9, 82],
      [10],
    ],
    [
      [3, 27, 38, 43],
      [9, 10, 82],
    ],
    [[3, 9, 10, 27, 38, 43, 82]],
  ];

  const working = [
    {
      passes: "Divide the array:",
      points: [
        "[38, 27, 43, 3, 9, 82, 10] splits into [38, 27, 43, 3] and [9, 82, 10]",
        "Each half splits again, and again, until every piece holds one element",
        "A single element is already sorted — that is the base case where the splitting stops",
      ],
      levels: divideLevels,
      mode: "divide",
    },
    {
      passes: "Merge back up:",
      points: [
        "[38] + [27] → [27, 38], [43] + [3] → [3, 43], [9] + [82] → [9, 82]",
        "[27, 38] + [3, 43] → [3, 27, 38, 43], and [9, 82] + [10] → [9, 10, 82]",
        "[3, 27, 38, 43] + [9, 10, 82] → [3, 9, 10, 27, 38, 43, 82]",
      ],
      levels: mergeLevels,
      mode: "merge",
    },
  ];

  // A single merge of [27, 38] and [3, 43], one comparison per step.
  const mergeSteps = [
    {
      caption: "Compare 27 and 3 → 3 is smaller, so it goes out first",
      left: [27, 38],
      right: [3, 43],
      li: 0,
      ri: 0,
      taken: "right",
      output: [3],
    },
    {
      caption: "Compare 27 and 43 → take 27",
      left: [27, 38],
      right: [3, 43],
      li: 0,
      ri: 1,
      taken: "left",
      output: [3, 27],
    },
    {
      caption: "Compare 38 and 43 → take 38",
      left: [27, 38],
      right: [3, 43],
      li: 1,
      ri: 1,
      taken: "left",
      output: [3, 27, 38],
    },
    {
      caption: "The left half is empty → copy the rest of the right half",
      left: [27, 38],
      right: [3, 43],
      li: 2,
      ri: 1,
      taken: "right",
      output: [3, 27, 38, 43],
    },
  ];

  const algorithm = [
    {
      points: "Divide:",
      subpoints: [
        "Find the middle point to divide the array into two halves",
        "Recursively call merge sort on the first half",
        "Recursively call merge sort on the second half",
      ],
    },
    {
      points: "Merge:",
      subpoints: [
        "Create temporary arrays for both halves",
        "Compare elements from each half and merge them in order",
        "Copy any remaining elements from either half",
      ],
    },
  ];

  const timeComplexity = [
    {
      points:
        "Best Case: O(n log n) (already sorted, but still needs all comparisons)",
    },
    { points: "Average Case: O(n log n)" },
    { points: "Worst Case: O(n log n) (consistent performance)" },
  ];

  const advantages = [
    { points: "Stable sorting (maintains relative order of equal elements)" },
    {
      points:
        "Excellent for large datasets (consistent O(n log n) performance)",
    },
    {
      points:
        "Well-suited for external sorting (sorting data too large for RAM)",
    },
    { points: "Easily parallelizable (divide steps can be done concurrently)" },
  ];

  const disadvantages = [
    { points: "Requires O(n) additional space (not in-place)" },
    {
      points:
        "Slower than O(n²) algorithms for very small datasets due to recursion overhead",
    },
    {
      points:
        "Not as cache-efficient as some other algorithms (e.g., QuickSort)",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Merge Sort */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Merge Sort?
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
              Imagine you have an unsorted list of numbers: [38, 27, 43, 3, 9,
              82, 10]
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

                  {items.levels && (
                    <div className="mt-4 not-prose">
                      <LevelsDiagram
                        keyPrefix={`ms-${items.mode}`}
                        levels={items.levels}
                        mode={items.mode}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                Being divided
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-400 inline-block"></span>
                Single element (base case)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Merged &amp; sorted
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-6 leading-relaxed">
              The merge step is where the sorting actually happens. Each half is
              already sorted, so you only ever compare the two front elements,
              take the smaller one, and move that pointer forward. Here is the
              merge of [27, 38] and [3, 43] one comparison at a time:
            </p>

            <div className="mt-4 space-y-5 not-prose">
              {mergeSteps.map((step, index) => (
                <div key={index}>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {index + 1}. {step.caption}
                  </p>
                  <MergeStepDiagram
                    keyPrefix={`ms-merge-step-${index}`}
                    left={step.left}
                    right={step.right}
                    li={step.li}
                    ri={step.ri}
                    taken={step.taken}
                    output={step.output}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Being compared
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Taken into the output
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Because each element is looked at once per level and there are
              log n levels, every merge pass costs O(n) and the whole sort costs
              O(n log n) — no matter how the input was arranged.
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
                  <span className="font-semibold">{item.points}</span>
                  {item.subpoints && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500 font-normal">
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
              {paragraph[1]}
            </p>
            <div className="mt-8">
              <ComplexityGraph
                bestCase={(n) => n * Math.log2(n)}
                averageCase={(n) => n * Math.log2(n)}
                worstCase={(n) => n * Math.log2(n)}
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
              {advantages.map((items, index) => (
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

        {/* Disadvantages */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Disadvantages
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {disadvantages.map((items, index) => (
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