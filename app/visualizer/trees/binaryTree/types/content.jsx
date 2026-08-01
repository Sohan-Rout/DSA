"use client";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";

/*  content.jsx  */
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import InContentAd from "@/app/components/ads/InContentAd";

/* ------------- tiny helper to draw a tree ------------- */
function drawTree(
  svg,                // <svg> element
  nodes,              // flat list [ {value, x, y}, ... ]
  edges,              // [ {from, to}, ... ]  (indices)
  radius = 18
) {
  // clear previous drawings
  svg.innerHTML = '';

  // edges (lines)
  edges.forEach(({ from, to }) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', nodes[from].x);
    line.setAttribute('y1', nodes[from].y);
    line.setAttribute('x2', nodes[to].x);
    line.setAttribute('y2', nodes[to].y);
    line.setAttribute('stroke', '#3b82f6'); // blue-500
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);
  });

  // nodes (circles + text)
  nodes.forEach(({ value, x, y }, i) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', '#3b82f6'); // blue-500
    circle.setAttribute('stroke', '#1e40af'); // blue-800
    circle.setAttribute('stroke-width', '2');

    text.setAttribute('x', x);
    text.setAttribute('y', y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#fff');
    text.setAttribute('font-size', '14');
    text.textContent = value;

    g.appendChild(circle);
    g.appendChild(text);
    svg.appendChild(g);

    // animate in
    gsap.from(g, { scale: 0, duration: 0.6, ease: 'back.out(1.7)', delay: i * 0.15 });
  });
}

export default function content() {

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateTheme = () => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
    };

    updateTheme();

    window.addEventListener("storage", updateTheme);
    window.addEventListener("themeChange", updateTheme);

    return () => {
      window.removeEventListener("storage", updateTheme);
      window.removeEventListener("themeChange", updateTheme);
    };
  }, []);

  /* refs for the three svgs */
  const fullSvg    = useRef(null);
  const degenSvg   = useRef(null);
  const completeSvg = useRef(null);

  /* ------------- GSAP trees ------------- */
  useEffect(() => {
    /* Full tree (height 2) */
    drawTree(
      fullSvg.current,
      [
        { value: 'A', x: 60, y: 30 },
        { value: 'B', x: 30, y: 80 },
        { value: 'C', x: 90, y: 80 },
        { value: 'D', x: 15, y: 130 },
        { value: 'E', x: 45, y: 130 },
        { value: 'F', x: 75, y: 130 },
        { value: 'G', x: 105, y: 130 },
      ],
      [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 1, to: 3 },
        { from: 1, to: 4 },
        { from: 2, to: 5 },
        { from: 2, to: 6 },
      ]
    );

    /* Degenerate / right-skewed */
    drawTree(
      degenSvg.current,
      [
        { value: '1', x: 30, y: 30 },
        { value: '2', x: 30, y: 80 },
        { value: '3', x: 30, y: 130 },
        { value: '4', x: 30, y: 180 },
      ],
      [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
      ]
    );

    /* Complete tree (7 nodes) */
    drawTree(
      completeSvg.current,
      [
        { value: '1', x: 60, y: 30 },
        { value: '2', x: 30, y: 80 },
        { value: '3', x: 90, y: 80 },
        { value: '4', x: 15, y: 130 },
        { value: '5', x: 45, y: 130 },
        { value: '6', x: 75, y: 130 },
        { value: '7', x: 105, y: 130 },
      ],
      [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 1, to: 3 },
        { from: 1, to: 4 },
        { from: 2, to: 5 },
        { from: 2, to: 6 },
      ]
    );
  }, []);

  /* ------------- textual content ------------- */
  const defFull = [
    { points: 'Every internal node has exactly two children' },
    { points: 'All leaves are on the same or adjacent levels' },
    { points: 'Maximum nodes for height h = 2^(h+1) – 1' },
  ];
  const defDegenerate = [
    { points: 'Each parent has only one child (left or right)' },
    { points: 'Effectively a linked list → Θ(n) height' },
    { points: 'Worst-case BST shape when data is sorted' },
  ];
  const defComplete = [
    { points: 'All levels fully filled except possibly the last' },
    { points: 'Last-level nodes are packed from the left' },
    { points: 'Array-based heap relies on this structure' },
  ];
  const identify = [
    { points: 'Count children for every node' },
    { points: 'If any node has exactly one child → not full' },
    { points: 'If height = n – 1 → degenerate / skewed' },
    { points: 'If level-order scan finds a gap before last node → not complete' },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Quick tags */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Three Types
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            {['Full Binary Tree', 'Degenerate / Skewed', 'Complete Binary Tree'].map(
              (t) => (
                <div
                  key={t}
                  className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
                >
                  {t}
                </div>
              )
            )}
          </div>
        </section>

        {/* GSAP trees */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Visual Comparison
          </h1>

          <div className="space-y-10">
            {[
              {
                title: 'Full Binary Tree',
                svgRef: fullSvg,
                description: "In a Full Binary Tree, there's no such thing as a node with just one child — every node has either zero children or exactly two. That strict rule keeps the tree evenly shaped, with leaves sitting at the same level or one level apart, which makes it a good starting point for understanding how balanced trees behave."
              },
              {
                title: 'Degenerate (Skewed) Tree',
                svgRef: degenSvg,
                description: "A Degenerate, or Skewed, Tree is what you get when every parent node has only a single child — at that point it's really just a linked list wearing a tree's name. This is the worst case for height, Θ(n), and it typically happens when you insert already-sorted data into a binary search tree with no rebalancing, which tanks the performance benefits a tree is supposed to give you."
              },
              {
                title: 'Complete Binary Tree',
                svgRef: completeSvg,
                description: "A Complete Binary Tree fills every level entirely except possibly the last one, and even that last level has to fill up left-to-right with no gaps. That predictable, gap-free shape is exactly what heaps are built on, since it guarantees a compact height and keeps operations efficient."
              },
            ].map(({ title, svgRef, description }, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center">
                  <svg
                    ref={svgRef}
                    viewBox="0 0 120 210"
                    className="w-full max-w-[200px] h-[200px] rounded bg-white dark:bg-gray-800"
                  ></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Structural Rules */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Structural Rules
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[defFull, defDegenerate, defComplete].map((rules, idx) => (
              <div
                key={idx}
                className="border border-black/10 dark:border-gray-400 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md"
              >
                <h2 className="text-lg font-bold mb-2">
                  {['Full', 'Degenerate', 'Complete'][idx]}
                </h2>
                <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                  {rules.map((r, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300 pl-2">
                      {r.points}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Identification */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How to Identify a Type
          </h1>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {identify.map((r, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300 pl-2">
                  {r.points}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Complexity */}
        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Height & Complexity
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-400 p-3">Tree Type</th>
                  <th className="border border-gray-400 p-3">Height</th>
                  <th className="border border-gray-400 p-3 hidden sm:table-cell">
                    Search/Insert/Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Full (balanced)', 'Θ(log n)', 'Θ(log n)'],
                  ['Complete', 'Θ(log n)', 'Θ(log n)'],
                  ['Degenerate / Skewed', 'Θ(n)', 'Θ(n)'],
                ].map(([t, h, op], i) => (
                  <tr
                    key={t}
                    className={i % 2 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}
                  >
                    <td className="border border-gray-400 p-3">{t}</td>
                    <td className="border border-gray-400 p-3 font-mono">{h}</td>
                    <td className="border border-gray-400 p-3 hidden sm:table-cell font-mono">
                      {op}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <InContentAd />
        </section>
      </article>
      <NewsletterEmbed mobile theme={theme} />
    </main>
  );
}