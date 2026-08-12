"use client";
import React from "react";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const CAPACITY = 6;

const StackArrayDiagram = ({ values, keyPrefix }) => {
  const boxSize = 40;
  const gap = 8;
  const paddingX = 8;
  const topPadding = 28;
  const width = CAPACITY * (boxSize + gap) - gap + paddingX * 2;
  const height = boxSize + topPadding + 22;

  const boxX = (idx) => paddingX + idx * (boxSize + gap);
  const boxY = topPadding;
  const cx = (idx) => boxX(idx) + boxSize / 2;
  const topIndex = values.length - 1;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="array-backed stack diagram"
    >
      <defs>
        <marker id={`${keyPrefix}-top-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#3b82f6" />
        </marker>
      </defs>

      {topIndex >= 0 ? (
        <>
          <text x={cx(topIndex)} y={boxY - 16} textAnchor="middle" className="fill-blue-500 dark:fill-blue-400" fontSize="10" fontWeight="700">
            top
          </text>
          <line
            x1={cx(topIndex)}
            y1={boxY - 12}
            x2={cx(topIndex)}
            y2={boxY - 3}
            stroke="#3b82f6"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-top-arrow)`}
          />
        </>
      ) : (
        <text x={paddingX} y={boxY - 12} className="fill-gray-400 dark:fill-gray-500" fontSize="10" fontFamily="monospace">
          top = -1
        </text>
      )}

      {Array.from({ length: CAPACITY }).map((_, idx) => {
        const filled = idx < values.length;
        return (
          <g key={`${keyPrefix}-box-${idx}`}>
            <rect
              x={boxX(idx)}
              y={boxY}
              width={boxSize}
              height={boxSize}
              rx="6"
              fill={filled ? "#3b82f6" : "none"}
              opacity={filled ? "0.9" : "1"}
              stroke={filled ? "#3b82f6" : "#94a3b8"}
              strokeWidth="2"
              strokeDasharray={filled ? "0" : "4 3"}
            />
            {filled && (
              <text x={cx(idx)} y={boxY + boxSize / 2 + 5} textAnchor="middle" className="fill-white" fontSize="14" fontWeight="700">
                {values[idx]}
              </text>
            )}
            <text x={cx(idx)} y={boxY + boxSize + 16} textAnchor="middle" className="fill-gray-400 dark:fill-gray-500" fontSize="9">
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

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* -------  HEADER  ------- */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Stack Implementation Using Array?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A stack follows LIFO (Last In, First Out), meaning whatever you pushed most recently is the first thing that comes back out. Backing it with an array is the most direct way to build one, since push and pop just work on the array's last index in constant time.
            </p>
          </div>
        </section>

        {/* -------  OPERATIONS  ------- */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Initialize
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            An empty array is allocated with a fixed capacity, and the top pointer starts at -1 to signal there's nothing on the stack yet.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
            <StackArrayDiagram values={[]} keyPrefix="init" />
          </div>
        </section>

        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            push()
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            If the array isn't already at capacity, the top pointer is incremented first, then the new value is written at that index, so top always marks the most recently added element.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <StackArrayDiagram values={[5, 3]} keyPrefix="push-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ push(7) ↓</p>
            <StackArrayDiagram values={[5, 3, 7]} keyPrefix="push-after" />
          </div>
        </section>

        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            pop()
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The element at array[top] is read and returned, then the top pointer is decremented; the value itself is left in the array, just no longer considered part of the stack.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <StackArrayDiagram values={[5, 3, 7]} keyPrefix="pop-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ pop() → returns 7 ↓</p>
            <StackArrayDiagram values={[5, 3]} keyPrefix="pop-after" />
          </div>
        </section>

        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            peek()
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Returns array[top] without touching the pointer, so the stack is left exactly as it was, useful for checking what's on top before deciding whether to pop.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
            <StackArrayDiagram values={[5, 3, 7]} keyPrefix="peek" />
          </div>
        </section>

        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            isEmpty() &amp; isFull()
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Both are just pointer comparisons: <code className="text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">isEmpty()</code> is true when top equals -1, and <code className="text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">isFull()</code> is true when top reaches the array's last valid index.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
              <p className="text-center text-sm font-mono text-gray-600 dark:text-gray-300 mb-3">isEmpty() → true</p>
              <StackArrayDiagram values={[]} keyPrefix="isempty" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
              <p className="text-center text-sm font-mono text-gray-600 dark:text-gray-300 mb-3">isFull() → true</p>
              <StackArrayDiagram values={[5, 3, 7, 2, 9, 1]} keyPrefix="isfull" />
            </div>
          </div>
        </section>

        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time Complexity
          </h1>
          <div className="prose dark:prose-invert max-w-none overflow-x-auto">
            <table className="min-w-full border-collapse border border-blue-400">
              <thead>
                <tr className="bg-blue-100 dark:bg-blue-900">
                  <th className="border border-blue-400 p-3 font-semibold">Operation</th>
                  <th className="border border-blue-400 p-3 font-semibold">Complexity</th>
                  <th className="border border-blue-400 p-3 font-semibold hidden sm:table-cell">Reason</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["push()", "O(1)", "Single array access"],
                  ["pop()", "O(1)", "Single array access"],
                  ["peek()", "O(1)", "Single array access"],
                  ["isEmpty()", "O(1)", "Pointer comparison"],
                ].map(([op, comp, reason], index) => (
                  <tr key={op} className={index % 2 === 0 ? "bg-white dark:bg-neutral-950" : "bg-blue-50 dark:bg-neutral-900"}>
                    <td className="border border-blue-400 p-3">{op}</td>
                    <td className="border border-blue-400 p-3 font-mono">{comp}</td>
                    <td className="border border-blue-400 p-3 hidden sm:table-cell">{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <InContentAd />
        </section>

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Key Characteristics
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {[
                "LIFO Principle: Last element added is first removed",
                "Dynamic Size: Can grow until memory limits",
                "Efficiency: All operations work in constant time",
                "Versatility: Foundation for many algorithms",
              ].map((item) => (
                <li key={item} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
      <NewsletterEmbed mobile theme={theme} />
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;