"use client";
import { useEffect, useState } from "react";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const LoopDiagram = ({ nodes, keyPrefix }) => {
  const size = 220;
  const topPadding = 24;
  const height = size + topPadding;
  const centerX = size / 2;
  const centerY = size / 2 + topPadding;
  const radius = 70;
  const nodeRadius = 26;

  const positions = nodes.map((_, i) => {
    const angle = (-90 + i * (360 / nodes.length)) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  return (
    <svg viewBox={`0 0 ${size} ${height}`} className="w-full max-w-[220px] mx-auto">
      <defs>
        <marker
          id={`${keyPrefix}-arrow`}
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#6366f1" />
        </marker>
      </defs>

      {positions.map((pos, i) => {
        const next = positions[(i + 1) % positions.length];
        const dx = next.x - pos.x;
        const dy = next.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const startX = pos.x + ux * (nodeRadius + 2);
        const startY = pos.y + uy * (nodeRadius + 2);
        const endX = next.x - ux * (nodeRadius + 6);
        const endY = next.y - uy * (nodeRadius + 6);
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const controlX = midX + (centerX - midX) * 0.35;
        const controlY = midY + (centerY - midY) * 0.35;

        return (
          <path
            key={`${keyPrefix}-edge-${i}`}
            d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            markerEnd={`url(#${keyPrefix}-arrow)`}
          />
        );
      })}

      {positions.map((pos, i) => (
        <g key={`${keyPrefix}-node-${i}`}>
          <circle
            cx={pos.x}
            cy={pos.y}
            r={nodeRadius}
            fill={i === 0 ? "#10b981" : "#3b82f6"}
            opacity="0.15"
          />
          <circle
            cx={pos.x}
            cy={pos.y}
            r={nodeRadius}
            fill="none"
            stroke={i === 0 ? "#10b981" : "#3b82f6"}
            strokeWidth="2"
          />
          <text
            x={pos.x}
            y={pos.y + 5}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="13"
            fontWeight="600"
          >
            {nodes[i]}
          </text>
        </g>
      ))}

      {positions[0] && (
        <text
          x={positions[0].x}
          y={positions[0].y - nodeRadius - 8}
          textAnchor="middle"
          className="fill-emerald-600 dark:fill-emerald-400"
          fontSize="11"
          fontWeight="700"
        >
          head
        </text>
      )}
    </svg>
  );
};

const Content = () => {

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

  const overview = [
    `Take a regular linked list and change one thing: instead of the last node pointing to null, have it point right back to the first node. That's a circular linked list, a loop with no real end.`,
    `It can be built either as a singly-linked loop (one pointer per node) or a doubly-linked loop (two pointers per node). Because the chain never terminates, it's a natural fit for anything that needs to cycle repeatedly, like round-robin scheduling or a circular buffer.`,
    `Since there's no fixed "first" or "last" node anymore, you can start traversing from anywhere in the loop and eventually visit every node, handy for problems that are inherently cyclic rather than linear.`,
  ];

  const basicOperations = [
    { name: "Insertion at Head", complexity: "O(1)", description: "Add new node at beginning, point last node to new head" },
    { name: "Insertion at Tail", complexity: "O(1)", description: "Add new node at end, point it to head (with tail pointer)" },
    { name: "Deletion at Head", complexity: "O(1)", description: "Remove first node, update last node's pointer" },
    { name: "Deletion by Value", complexity: "O(n)", description: "Traverse list to find and remove specific node" },
    { name: "Traversal", complexity: "O(n)", description: "Loop through nodes until returning to starting point" },
    { name: "Search", complexity: "O(n)", description: "Traverse list to find element" },
  ];

  const insertionSteps = [
    { step: "Create new node with data" },
    { step: "If list is empty, set head and tail to new node" },
    { step: "Make new node point to itself (circular reference)" },
    { step: "For non-empty list, set new node's next to current head" },
    { step: "Update tail's next pointer to new node" },
    { step: "Move head pointer to new node" },
  ];

  const deletionSteps = [
    { step: "Check if list is empty" },
    { step: "If single node exists, set head and tail to null" },
    { step: "For head deletion, update head to head.next" },
    { step: "Update tail's next pointer to new head" },
    { step: "For middle deletion, find node and update previous node's pointer" },
    { step: "Handle special case when deleting last node" },
  ];

  const prosCons = [
    { point: "Continuous traversal from any node", type: "pro" },
    { point: "Efficient round-robin scheduling", type: "pro" },
    { point: "No need for null checks during traversal", type: "pro" },
    { point: "Useful for circular buffer implementations", type: "pro" },
    { point: "Risk of infinite loops if not handled carefully", type: "con" },
    { point: "Slightly more complex implementation", type: "con" },
    { point: "Harder to detect list boundaries", type: "con" },
  ];

  const visualization = [
    { operation: "Initialization", state: "head → null" },
    { operation: "insertFirst(10)", state: "head → [10] → (points back to head)" },
    { operation: "insertFirst(20)", state: "head → [20] → [10] → (points back to head)" },
    { operation: "insertFirst(30)", state: "head → [30] → [20] → [10] → (points back to head)" },
    { operation: "deleteFirst()", state: "head → [20] → [10] → (points back to head)" },
    { operation: "delete(10)", state: "head → [20] → (points back to itself)" },
  ];

  const applications = [
    "Operating system round-robin scheduling",
    "Multiplayer turn-based games",
    "Music/video playlists with repeat functionality",
    "Resource allocation in networking",
    "Circular buffer implementations",
    "Token ring networks",
  ];

  const comparisonTable = [
    { feature: "Structure", linear: "Linear with null termination", circular: "Circular with no null" },
    { feature: "Traversal", linear: "Stops at end", circular: "Continuous loop" },
    { feature: "Memory Overhead", linear: "Standard", circular: "Same as linear" },
    { feature: "Boundary Detection", linear: "Easy (null check)", circular: "Requires start reference" },
    { feature: "Insert/Delete at Head", linear: "O(1)", circular: "O(1)" },
    { feature: "Implementation Complexity", linear: "Simpler", circular: "More complex" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Overview Section */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Circular Linked List
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            {overview.map((para, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {para}
              </p>
            ))}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Key Property:</strong> The last node{"\'"}s next pointer always points back to the first node, creating a continuous loop.
              </p>
            </div>
          </div>
        </section>

        {/* Basic Operations */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Basic Operations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Operation</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Complexity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {basicOperations.map((op, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{op.name}</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-700 dark:text-gray-300">{op.complexity}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{op.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Insertion Process */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Insertion Process</h2>
          <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
            {insertionSteps.map((step, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                {step.step}
              </li>
            ))}
          </ol>

          <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div>
                <LoopDiagram nodes={["A", "B"]} keyPrefix="insert-before" />
                <div className="text-center mt-2 text-gray-600 dark:text-gray-300">Existing circular list</div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-2xl rotate-90 sm:rotate-0">→</div>
              <div>
                <LoopDiagram nodes={["X", "A", "B"]} keyPrefix="insert-after" />
                <div className="text-center mt-2 text-gray-600 dark:text-gray-300">After inserting X at head</div>
              </div>
            </div>
          </div>
        </section>

        {/* Deletion Process */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Deletion Process</h2>
          <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
            {deletionSteps.map((step, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                {step.step}
              </li>
            ))}
          </ol>

          <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div>
                <LoopDiagram nodes={["X", "A", "B"]} keyPrefix="delete-before" />
                <div className="text-center mt-2 text-gray-600 dark:text-gray-300">Current circular list</div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-2xl rotate-90 sm:rotate-0">→</div>
              <div>
                <LoopDiagram nodes={["A", "B"]} keyPrefix="delete-after" />
                <div className="text-center mt-2 text-gray-600 dark:text-gray-300">After deleting X (head)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Visualization */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Operation Visualization</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Operation</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">List State</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {visualization.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">{item.operation}</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-700 dark:text-gray-300">{item.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Comparison with Linear Linked List */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Comparison with Linear Linked List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Feature</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Linear Linked List</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Circular Linked List</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {comparisonTable.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{row.feature}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.linear}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.circular}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Applications */}
        <section className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Applications</h2>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5 marker:text-blue-500 dark:marker:text-blue-400">
              {applications.map((app, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {app}
                </li>
              ))}
            </ul>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>When to Choose:</strong> Prefer circular linked lists when you need continuous cycling through elements or when the application naturally follows a circular pattern (like round-robin scheduling).
              </p>
            </div>
          </div>
        </section>

        <InContentAd />
      </article>
      <NewsletterEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;