"use client";

import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import React from "react";
import { useTheme } from "@/app/contexts/ThemeContext";
import InContentAd from "@/app/components/ads/InContentAd";

const StackListDiagram = ({ nodes, highlight, keyPrefix }) => {
  const boxSize = 40;
  const gap = 36;
  const startX = 56;
  const topPadding = 22;
  const width = startX + Math.max(nodes.length, 1) * (boxSize + gap) + 34;
  const height = boxSize + topPadding + 18;

  const boxX = (idx) => startX + idx * (boxSize + gap);
  const boxY = topPadding;
  const cy = boxY + boxSize / 2;

  const colorFor = (idx) => (highlight === idx ? "#10b981" : "#3b82f6");

  if (nodes.length === 0) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
        style={{ width: `${width}px`, maxWidth: "100%" }}
        role="img"
        aria-label="empty linked-list stack"
      >
        <defs>
          <marker id={`${keyPrefix}-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
          </marker>
        </defs>
        <text x="0" y={cy + 4} className="fill-gray-500 dark:fill-gray-400" fontSize="12" fontFamily="monospace">
          top
        </text>
        <line x1="26" y1={cy} x2={boxX(0)} y2={cy} stroke="#94a3b8" strokeWidth="1.5" markerEnd={`url(#${keyPrefix}-arrow)`} />
        <text x={boxX(0) + 4} y={cy + 4} className="fill-gray-400 dark:fill-gray-500" fontSize="12" fontFamily="monospace">
          null
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="linked-list stack diagram"
    >
      <defs>
        <marker id={`${keyPrefix}-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
        </marker>
      </defs>

      <text x="0" y={cy + 4} className="fill-gray-500 dark:fill-gray-400" fontSize="12" fontFamily="monospace">
        top
      </text>
      <line
        x1="26"
        y1={cy}
        x2={boxX(0)}
        y2={cy}
        stroke="#94a3b8"
        strokeWidth="1.5"
        markerEnd={`url(#${keyPrefix}-arrow)`}
      />

      {nodes.map((label, idx) => (
        <g key={`${keyPrefix}-box-${idx}`}>
          <rect
            x={boxX(idx)}
            y={boxY}
            width={boxSize}
            height={boxSize}
            rx="6"
            fill={colorFor(idx)}
            opacity={highlight === idx ? "0.9" : "0.25"}
            stroke={colorFor(idx)}
            strokeWidth="2"
          />
          <text
            x={boxX(idx) + boxSize / 2}
            y={cy + 5}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="14"
            fontWeight="700"
          >
            {label}
          </text>
          <line
            x1={boxX(idx) + boxSize}
            y1={cy}
            x2={boxX(idx) + boxSize + gap}
            y2={cy}
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-arrow)`}
          />
        </g>
      ))}

      <text
        x={boxX(nodes.length - 1) + boxSize + gap + 4}
        y={cy + 4}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="12"
        fontFamily="monospace"
      >
        null
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `Building a stack with a linked list instead of an array gets you the same LIFO (Last In, First Out) behavior, but without a fixed capacity: every push allocates a fresh node, so the stack can keep growing as long as memory allows.`,
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Header Section */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Stack Implementation Using Linked List?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[0]}
            </p>
          </div>
        </section>

        {/* Initialize */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Initialize
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            A top pointer is created and set to null, meaning there are no nodes yet. Some implementations also keep a size counter, initialized to 0, so size() doesn't need to walk the whole list.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
            <StackListDiagram nodes={[]} keyPrefix="init" />
          </div>
        </section>

        {/* push() */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            push()
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            A new node is created pointing to whatever top currently points to, then top is repointed to the new node. Nothing else in the list is touched, which is why this runs in O(1).
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <StackListDiagram nodes={["5", "3"]} keyPrefix="push-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ push(7) ↓</p>
            <StackListDiagram nodes={["7", "5", "3"]} highlight={0} keyPrefix="push-after" />
          </div>
        </section>

        {/* pop() */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            pop()
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            If top is null there's nothing to remove, so pop reports "Stack Underflow". Otherwise the data at top is saved, top is moved to point at the next node, and the saved data is returned. The old top node itself is left for garbage collection.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <StackListDiagram nodes={["7", "5", "3"]} keyPrefix="pop-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ pop() → returns 7 ↓</p>
            <StackListDiagram nodes={["5", "3"]} keyPrefix="pop-after" />
          </div>
        </section>

        {/* peek() */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            peek()
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Returns the data at the top node without moving the top pointer, so the stack is left exactly as it was. If top is null, it returns null instead.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
            <StackListDiagram nodes={["7", "5", "3"]} keyPrefix="peek" />
          </div>
        </section>

        {/* isEmpty() & size() */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            isEmpty() &amp; size()
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            <code className="text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">isEmpty()</code> is just a null check on top. <code className="text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">size()</code> is O(1) if a counter is maintained on every push/pop, or O(n) if it has to walk the whole list counting nodes instead.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
            <p className="text-center text-sm font-mono text-gray-600 dark:text-gray-300 mb-3">isEmpty() → true</p>
            <StackListDiagram nodes={[]} keyPrefix="isempty" />
          </div>
        </section>

        {/* Time Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time Complexity
          </h1>
          <div className="prose dark:prose-invert max-w-none overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-100 dark:bg-blue-900">
                  <th className="border border-blue-400 p-3 font-semibold">
                    Operation
                  </th>
                  <th className="border border-blue-400 p-3 font-semibold">
                    Complexity
                  </th>
                  <th className="border border-blue-400 p-3 font-semibold hidden sm:table-cell">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["push()", "O(1)", "Only head pointer modification"],
                  ["pop()", "O(1)", "Only head pointer modification"],
                  ["peek()", "O(1)", "Single node access"],
                  ["isEmpty()", "O(1)", "Head pointer check"],
                  [
                    "size()",
                    "O(1) or O(n)",
                    "Depends on counter implementation",
                  ],
                ].map(([op, comp, reason], index) => (
                  <tr
                    key={op}
                    className={
                      index % 2 === 0
                        ? "bg-white dark:bg-neutral-950"
                        : "bg-blue-50 dark:bg-neutral-900"
                    }
                  >
                    <td className="border border-blue-400 p-3">{op}</td>
                    <td className="border border-blue-400 p-3 font-mono">
                      {comp}
                    </td>
                    <td className="border border-blue-400 p-3 hidden sm:table-cell">
                      {reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <InContentAd />
        </section>

        {/* Key Characteristics */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Key Characteristics
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {[
                "Dynamic Size: No fixed capacity (grows as needed)",
                "Memory Efficiency: Uses only needed memory",
                "No Wasted Space: Unlike array implementation",
                "Extra Memory: Requires space for pointers",
                "Flexibility: Can grow until memory exhausted",
              ].map((item) => (
                <li
                  key={item}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Linked List vs Array Implementation
          </h1>
          <div className="prose dark:prose-invert max-w-none overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-100 dark:bg-blue-900">
                  <th className="border border-blue-400 p-3 font-semibold">
                    Feature
                  </th>
                  <th className="border border-blue-400 p-3 font-semibold">
                    Linked List
                  </th>
                  <th className="border border-blue-400 p-3 font-semibold">
                    Array
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Memory Usage",
                    "Extra for pointers",
                    "Fixed size, may be wasted",
                  ],
                  ["Dynamic Size", "Yes", "No (unless resized)"],
                  ["Memory Allocation", "Dynamic", "Static (usually)"],
                  ["Access Time", "O(1) for top", "O(1) for all"],
                  [
                    "Implementation Complexity",
                    "Slightly more complex",
                    "Simpler",
                  ],
                ].map(([feature, ll, arr], index) => (
                  <tr
                    key={feature}
                    className={
                      index % 2 === 0
                        ? "bg-white dark:bg-neutral-950"
                        : "bg-gray-50 dark:bg-neutral-900"
                    }
                  >
                    <td className="border border-blue-400 p-3">{feature}</td>
                    <td className="border border-blue-400 p-3 font-mono">
                      {ll}
                    </td>
                    <td className="border border-blue-400 p-3 font-mono">
                      {arr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </article>

      <div className="hidden md:block" aria-hidden="true" />
    </main>
  );
};

export default Content;
