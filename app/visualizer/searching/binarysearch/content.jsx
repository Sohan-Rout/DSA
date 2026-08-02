"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import { useEffect, useState } from "react";
import InContentAd from "@/app/components/ads/InContentAd";

const RangeDiagram = ({ values, low, high, mid, found, keyPrefix }) => {
  const boxSize = 40;
  const gap = 8;
  const paddingX = 8;
  const topPadding = 26;
  const width = values.length * (boxSize + gap) - gap + paddingX * 2;
  const height = boxSize + topPadding + 22;

  const boxX = (idx) => paddingX + idx * (boxSize + gap);
  const boxY = topPadding;
  const cx = (idx) => boxX(idx) + boxSize / 2;

  const inRange = (idx) => idx >= low && idx <= high;

  const fillFor = (idx) => {
    if (idx === mid) return found ? "#10b981" : "#f59e0b";
    if (inRange(idx)) return "#3b82f6";
    return "#94a3b8";
  };

  const opacityFor = (idx) => {
    if (idx === mid) return "0.9";
    if (inRange(idx)) return "0.35";
    return "0.15";
  };

  const labelFor = (idx) => {
    if (idx === mid) return "mid";
    if (idx === low) return "low";
    if (idx === high) return "high";
    return null;
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
    >
      {values.map((val, idx) => {
        const label = labelFor(idx);
        return (
          <g key={`${keyPrefix}-box-${idx}`}>
            {label && (
              <text
                x={cx(idx)}
                y={boxY - 8}
                textAnchor="middle"
                fill={idx === mid ? (found ? "#10b981" : "#f59e0b") : "#64748b"}
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

  const paragraphs = [
    `Binary Search only works because the list is already sorted, and it takes full advantage of that: check the middle element, and if the target is smaller, throw away the entire upper half; if it's larger, throw away the entire lower half. Repeating that halving keeps shrinking the search space until you land on the value.`,
    `If the number is not in the list (e.g., searching for 8), the search ends when the subarray becomes empty.`,
    `Binary Search is extremely fast for large datasets but requires the list to be sorted beforehand. It's much more efficient than Linear Search for sorted data.`,
  ];

  const sortedArray = [1, 3, 5, 7, 9, 11, 13];

  const searching = [
    { points: "First middle is 7 (too high)", low: 0, high: 6, mid: 3, found: false },
    { points: "Search left half: [1, 3, 5]", low: 0, high: 2, mid: null, found: false },
    { points: "New middle is 3 (too low)", low: 0, high: 2, mid: 1, found: false },
    { points: "Search right portion: [5]", low: 2, high: 2, mid: null, found: false },
    { points: "Found at position 2", low: 2, high: 2, mid: 2, found: true },
  ];

  const steps = [
    { points: "Start with the entire sorted array" },
    {
      points: "Compare the target with the middle element:",
      subpoints: [
        "If equal, return the position",
        "If target is smaller, search the left half",
        "If target is larger, search the right half",
      ],
    },
    { points: "Repeat until the element is found or the subarray is empty" },
    { points: 'If not found, return "Not Found"' },
  ];

  const complexity = [
    { points: "Best Case: Target is the middle element → O(1)." },
    {
      points:
        "Worst Case: Element not present → O(log n) (halves search space each step).",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Binary Search */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Binary Search?
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
              Imagine you have a sorted list of numbers: [1, 3, 5, 7, 9, 11, 13]
              and you want to find the number 7.
            </p>

            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              <li className="text-gray-700 dark:text-gray-300 pl-2">
                Compare 7 with the middle element (7). It matches! Return the
                position.
                <div className="mt-3 not-prose">
                  <RangeDiagram
                    keyPrefix="bs-intro"
                    values={sortedArray}
                    low={0}
                    high={6}
                    mid={3}
                    found={true}
                  />
                </div>
              </li>
              <li className="text-gray-700 dark:text-gray-300 pl-2">
                If searching for 5:
                <ul className="mt-2 space-y-4 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                  {searching.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      {item.points}
                      <div className="mt-3 not-prose">
                        <RangeDiagram
                          keyPrefix={`bs-step${index}`}
                          values={sortedArray}
                          low={item.low}
                          high={item.high}
                          mid={item.mid}
                          found={item.found}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Middle element
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                Active search range
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-400 inline-block"></span>
                Eliminated
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Match found
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {paragraphs[1]}
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
              {steps.map((item, index) => (
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

            <div className="mt-8">
              <ComplexityGraph
                bestCase={(n) => 1}
                averageCase={(n) => Math.log2(n)}
                worstCase={(n) => Math.log2(n)}
                maxN={25}
              />
            </div>

            <InContentAd />

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraphs[2]}
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
