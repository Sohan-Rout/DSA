"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const ArrayCheckDiagram = ({ values, current, checked, found, keyPrefix }) => {
  const boxSize = 40;
  const gap = 8;
  const paddingX = 8;
  const topPadding = 26;
  const width = values.length * (boxSize + gap) - gap + paddingX * 2;
  const height = boxSize + topPadding + 22;

  const boxX = (idx) => paddingX + idx * (boxSize + gap);
  const boxY = topPadding;
  const cx = (idx) => boxX(idx) + boxSize / 2;

  const fillFor = (idx) => {
    if (idx === current) return found ? "#10b981" : "#f59e0b";
    if (checked.includes(idx)) return "#94a3b8";
    return "#3b82f6";
  };

  const opacityFor = (idx) =>
    idx === current || checked.includes(idx) ? "0.9" : "0.25";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
    >
      <defs>
        <marker
          id={`${keyPrefix}-ptr-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill={found ? "#10b981" : "#f59e0b"} />
        </marker>
      </defs>

      <line
        x1={cx(current)}
        y1={boxY - 14}
        x2={cx(current)}
        y2={boxY - 4}
        stroke={found ? "#10b981" : "#f59e0b"}
        strokeWidth="1.5"
        markerEnd={`url(#${keyPrefix}-ptr-arrow)`}
      />

      {values.map((val, idx) => (
        <g key={`${keyPrefix}-box-${idx}`}>
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
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraphs = [
    `Linear Search doesn't assume anything about the list's order. It just starts at the beginning and checks one element at a time until it either finds a match or runs out of elements to check. Simple, but it works on any list, sorted or not.`,
    `Imagine you have a list of numbers: [5, 3, 8, 1, 9] and you want to find the number 8.`,
    `If the number is not in the list (e.g., searching for 10), the search ends without success.`,
    `Linear Search is easy to understand but can be slow for large lists compared to faster methods like Binary Search.`,
  ];

  const searchArray = [5, 3, 8, 1, 9];

  const working = [
    {
      points: "Start from the first number (5). Is 5 equal to 8? No.",
      current: 0,
      checked: [],
      found: false,
    },
    {
      points: "Move to the next number (3). Is 3 equal to 8? No.",
      current: 1,
      checked: [0],
      found: false,
    },
    {
      points:
        "Move to the next number (8). Is 8 equal to 8? Yes! Stop here. The position is 2 (or 3 if counting starts from 1).",
      current: 2,
      checked: [0, 1],
      found: true,
    },
  ];

  const complexity = [
    { data: "Best Case: Target is the first element → O(1)" },
    {
      data: "Worst Case: Target is last or not present → O(n) (checks all elements)",
    },
  ];

  const algorithm = [
    { points: "Start from the first element." },
    {
      points: "Compare the current element with the target value.",
      subpoints: [
        "If they match, return the position.",
        "If not, move to the next element.",
      ],
    },
    { points: "Repeat until the end of the list." },
    { points: 'If the element is not found, return "Not Found".' },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Linear Search */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Linear Search?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* How Does It Work */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {paragraphs[1]}
            </p>

            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {working.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  <div className="mt-3 not-prose">
                    <ArrayCheckDiagram
                      keyPrefix={`ls-step${index}`}
                      values={searchArray}
                      current={item.current}
                      checked={item.checked}
                      found={item.found}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Currently checking
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-400 inline-block"></span>
                Checked, no match
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Match found
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {paragraphs[2]}
            </p>
          </div>
        </section>

        {/* Algorithm Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Algorithm Steps
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {algorithm.map((item, index) => (
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
        <section className="p-6">
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
                    {item.data.split(":")[0]}:
                  </span>
                  <span className="ml-2">{item.data.split(":")[1]}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ComplexityGraph
                bestCase={(n) => 1}
                averageCase={(n) => n}
                worstCase={(n) => n}
                maxN={25}
              />
            </div>

            <InContentAd />

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
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

