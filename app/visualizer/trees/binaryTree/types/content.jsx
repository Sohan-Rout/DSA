"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const NODE_GRAD_ID = "bt-types-node-grad";
const SHADOW_FILTER_ID = "bt-types-node-shadow";

function drawTree(svg, nodes, edges, radius = 16) {
  svg.innerHTML = "";

  edges.forEach(({ from, to }) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", nodes[from].x);
    line.setAttribute("y1", nodes[from].y);
    line.setAttribute("x2", nodes[to].x);
    line.setAttribute("y2", nodes[to].y);
    line.setAttribute("stroke", "#818cf8");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("stroke-linecap", "round");
    svg.appendChild(line);
  });

  nodes.forEach(({ value, x, y }, i) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", `url(#${NODE_GRAD_ID})`);
    circle.setAttribute("stroke", "#1d4ed8");
    circle.setAttribute("stroke-width", "1.5");
    circle.setAttribute("filter", `url(#${SHADOW_FILTER_ID})`);

    text.setAttribute("x", x);
    text.setAttribute("y", y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#fff");
    text.setAttribute("font-size", "13");
    text.setAttribute("font-weight", "700");
    text.textContent = value;

    g.appendChild(circle);
    g.appendChild(text);
    svg.appendChild(g);

    gsap.from(g, { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.7)", delay: i * 0.12 });
  });
}

const SvgDefs = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <linearGradient id={NODE_GRAD_ID} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <filter id={SHADOW_FILTER_ID} x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>
  </svg>
);

const Content = () => {
  const { theme } = useTheme();

  const fullSvg = useRef(null);
  const degenSvg = useRef(null);
  const completeSvg = useRef(null);

  useEffect(() => {
    drawTree(
      fullSvg.current,
      [
        { value: "A", x: 60, y: 30 },
        { value: "B", x: 30, y: 80 },
        { value: "C", x: 90, y: 80 },
        { value: "D", x: 15, y: 130 },
        { value: "E", x: 45, y: 130 },
        { value: "F", x: 75, y: 130 },
        { value: "G", x: 105, y: 130 },
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

    drawTree(
      degenSvg.current,
      [
        { value: "1", x: 30, y: 30 },
        { value: "2", x: 30, y: 80 },
        { value: "3", x: 30, y: 130 },
        { value: "4", x: 30, y: 180 },
      ],
      [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
      ]
    );

    drawTree(
      completeSvg.current,
      [
        { value: "1", x: 60, y: 30 },
        { value: "2", x: 30, y: 80 },
        { value: "3", x: 90, y: 80 },
        { value: "4", x: 15, y: 130 },
        { value: "5", x: 45, y: 130 },
        { value: "6", x: 75, y: 130 },
        { value: "7", x: 105, y: 130 },
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

  const defFull = [
    { points: "Every internal node has exactly two children" },
    { points: "All leaves are on the same or adjacent levels" },
    { points: "Maximum nodes for height h = 2^(h+1) – 1" },
  ];
  const defDegenerate = [
    { points: "Each parent has only one child (left or right)" },
    { points: "Effectively a linked list → Θ(n) height" },
    { points: "Worst-case BST shape when data is sorted" },
  ];
  const defComplete = [
    { points: "All levels fully filled except possibly the last" },
    { points: "Last-level nodes are packed from the left" },
    { points: "Array-based heap relies on this structure" },
  ];
  const identify = [
    { points: "Count children for every node" },
    { points: "If any node has exactly one child → not full" },
    { points: "If height = n – 1 → degenerate / skewed" },
    { points: "If level-order scan finds a gap before last node → not complete" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <SvgDefs />
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Quick tags */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Three Types
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            {["Full Binary Tree", "Degenerate / Skewed", "Complete Binary Tree"].map((t) => (
              <div
                key={t}
                className="bg-gray-50 dark:bg-neutral-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800"
              >
                {t}
              </div>
            ))}
          </div>
        </section>

        {/* GSAP trees */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Visual Comparison
          </h2>

          <div className="space-y-10">
            {[
              {
                title: "Full Binary Tree",
                svgRef: fullSvg,
                description:
                  "In a Full Binary Tree, there's no such thing as a node with just one child: every node has either zero children or exactly two. That strict rule keeps the tree evenly shaped, with leaves sitting at the same level or one level apart, which makes it a good starting point for understanding how balanced trees behave.",
              },
              {
                title: "Degenerate (Skewed) Tree",
                svgRef: degenSvg,
                description:
                  "A Degenerate, or Skewed, Tree is what you get when every parent node has only a single child, at which point it's really just a linked list wearing a tree's name. This is the worst case for height, Θ(n), and it typically happens when you insert already-sorted data into a binary search tree with no rebalancing, which tanks the performance benefits a tree is supposed to give you.",
              },
              {
                title: "Complete Binary Tree",
                svgRef: completeSvg,
                description:
                  "A Complete Binary Tree fills every level entirely except possibly the last one, and even that last level has to fill up left-to-right with no gaps. That predictable, gap-free shape is exactly what heaps are built on, since it guarantees a compact height and keeps operations efficient.",
              },
            ].map(({ title, svgRef, description }, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center rounded-lg bg-[radial-gradient(circle,_theme(colors.gray.200)_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_theme(colors.neutral.800)_1px,_transparent_1px)] bg-[length:14px_14px] py-4">
                  <svg
                    ref={svgRef}
                    viewBox="0 0 120 210"
                    className="w-full max-w-50 h-50"
                  ></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Structural Rules */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Structural Rules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[defFull, defDegenerate, defComplete].map((rules, idx) => (
              <div
                key={idx}
                className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-neutral-900"
              >
                <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  {["Full", "Degenerate", "Complete"][idx]}
                </h2>
                <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                  {rules.map((r, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300 pl-2 text-sm">
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How to Identify a Type
          </h2>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-gray-800">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {identify.map((r, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300 pl-2">
                  {r.points}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Height & Complexity */}
        <section className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Height &amp; Complexity
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-neutral-900">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    Tree Type
                  </th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    Height
                  </th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hidden sm:table-cell">
                    Search/Insert/Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Full (balanced)", "Θ(log n)", "Θ(log n)"],
                  ["Complete", "Θ(log n)", "Θ(log n)"],
                  ["Degenerate / Skewed", "Θ(n)", "Θ(n)"],
                ].map(([t, h, op], i) => (
                  <tr
                    key={t}
                    className={i % 2 ? "bg-gray-50 dark:bg-neutral-900" : "bg-white dark:bg-neutral-950"}
                  >
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      {t}
                    </td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-blue-600 dark:text-blue-400">
                      {h}
                    </td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 hidden sm:table-cell font-mono text-blue-600 dark:text-blue-400">
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
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;
