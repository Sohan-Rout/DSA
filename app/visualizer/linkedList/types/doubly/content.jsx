"use client";
import { useEffect, useState } from "react";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// Every node is drawn as [prev | data | next], with each pointer cell holding
// the actual address it stores, so the two links that define a doubly linked
// list are readable rather than implied.
// Addresses are keyed by value so a node keeps the same one across every step.
const ADDRESSES = {
  A: "0x1A",
  B: "0x2F",
  C: "0x3C",
  X: "0x4D",
  10: "0x1A",
  20: "0x2F",
  30: "0x3C",
};

const PREV_W = 30;
const DATA_W = 30;
const NEXT_W = 30;
const NODE_W = PREV_W + DATA_W + NEXT_W;
const NODE_H = 40;
const GAP = 22;
const START_X = 34;
const TOP_PAD = 22;

const DoublyListDiagram = ({ nodes, highlight, keyPrefix }) => {
  const count = Math.max(nodes.length, 1);
  const width = START_X + count * NODE_W + (count - 1) * GAP + 46;
  const addrY = TOP_PAD + NODE_H + 12;
  const height = TOP_PAD + NODE_H + 22;

  const nodeX = (idx) => START_X + idx * (NODE_W + GAP);
  const cy = TOP_PAD + NODE_H / 2;
  const colorFor = (idx) => (highlight === idx ? "#10b981" : "#3b82f6");
  const addrOf = (label) => ADDRESSES[label] ?? "0x??";

  const markers = (
    <defs>
      <marker
        id={`${keyPrefix}-arrow`}
        markerWidth="7"
        markerHeight="7"
        refX="6"
        refY="3.5"
        orient="auto"
      >
        <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
      </marker>
    </defs>
  );

  if (nodes.length === 0) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
        style={{ width: `${width}px`, maxWidth: "100%" }}
        role="img"
        aria-label="empty doubly linked list"
      >
        {markers}
        <text
          x="0"
          y={cy + 4}
          className="fill-gray-500 dark:fill-gray-400"
          fontSize="12"
          fontFamily="monospace"
        >
          head
        </text>
        <line
          x1="32"
          y1={cy}
          x2={START_X + 16}
          y2={cy}
          stroke="#94a3b8"
          strokeWidth="1.5"
          markerEnd={`url(#${keyPrefix}-arrow)`}
        />
        <text
          x={START_X + 24}
          y={cy + 4}
          className="fill-gray-400 dark:fill-gray-500"
          fontSize="12"
          fontFamily="monospace"
        >
          null
        </text>
        <line
          x1={START_X + 108}
          y1={cy}
          x2={START_X + 62}
          y2={cy}
          stroke="#94a3b8"
          strokeWidth="1.5"
          markerEnd={`url(#${keyPrefix}-arrow)`}
        />
        <text
          x={START_X + 114}
          y={cy + 4}
          className="fill-gray-500 dark:fill-gray-400"
          fontSize="12"
          fontFamily="monospace"
        >
          tail
        </text>
      </svg>
    );
  }

  const lastX = nodeX(nodes.length - 1);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="doubly linked list diagram"
    >
      {markers}

      <text
        x="0"
        y={cy + 4}
        className="fill-gray-500 dark:fill-gray-400"
        fontSize="12"
        fontFamily="monospace"
      >
        head
      </text>
      <line
        x1="32"
        y1={cy}
        x2={nodeX(0) - 3}
        y2={cy}
        stroke="#94a3b8"
        strokeWidth="1.5"
        markerEnd={`url(#${keyPrefix}-arrow)`}
      />

      <line
        x1={lastX + NODE_W + 34}
        y1={cy}
        x2={lastX + NODE_W + 3}
        y2={cy}
        stroke="#94a3b8"
        strokeWidth="1.5"
        markerEnd={`url(#${keyPrefix}-arrow)`}
      />
      <text
        x={lastX + NODE_W + 40}
        y={cy + 4}
        className="fill-gray-500 dark:fill-gray-400"
        fontSize="12"
        fontFamily="monospace"
      >
        tail
      </text>

      {nodes.map((label, idx) => {
        const x = nodeX(idx);
        const color = colorFor(idx);
        const isFirst = idx === 0;
        const isLast = idx === nodes.length - 1;
        return (
          <g key={`${keyPrefix}-node-${idx}`}>
            <rect
              x={x}
              y={TOP_PAD}
              width={NODE_W}
              height={NODE_H}
              rx="6"
              fill={color}
              opacity={highlight === idx ? "0.9" : "0.25"}
              stroke={color}
              strokeWidth="2"
            />
            <line
              x1={x + PREV_W}
              y1={TOP_PAD}
              x2={x + PREV_W}
              y2={TOP_PAD + NODE_H}
              stroke={color}
              strokeWidth="1.5"
              opacity="0.7"
            />
            <line
              x1={x + PREV_W + DATA_W}
              y1={TOP_PAD}
              x2={x + PREV_W + DATA_W}
              y2={TOP_PAD + NODE_H}
              stroke={color}
              strokeWidth="1.5"
              opacity="0.7"
            />
            <text
              x={x + PREV_W + DATA_W / 2}
              y={cy + 5}
              textAnchor="middle"
              className="fill-black dark:fill-white"
              fontSize="14"
              fontWeight="700"
            >
              {label}
            </text>

            {/* prev holds the address behind it, or null at the head */}
            <text
              x={x + PREV_W / 2}
              y={cy + 3}
              textAnchor="middle"
              className="fill-black dark:fill-white"
              fontSize="8"
              fontFamily="monospace"
              fontWeight="700"
            >
              {isFirst ? "null" : addrOf(nodes[idx - 1])}
            </text>

            {/* next holds the address ahead of it, or null at the tail */}
            <text
              x={x + PREV_W + DATA_W + NEXT_W / 2}
              y={cy + 3}
              textAnchor="middle"
              className="fill-black dark:fill-white"
              fontSize="8"
              fontFamily="monospace"
              fontWeight="700"
            >
              {isLast ? "null" : addrOf(nodes[idx + 1])}
            </text>

            {/* This node's own address in memory */}
            <text
              x={x + NODE_W / 2}
              y={addrY}
              textAnchor="middle"
              className="fill-gray-400 dark:fill-gray-500"
              fontSize="8"
              fontFamily="monospace"
            >
              {addrOf(label)}
            </text>

            {!isLast && (
              <>
                {/* next: forward along the top */}
                <line
                  x1={x + NODE_W}
                  y1={cy - 8}
                  x2={nodeX(idx + 1) - 3}
                  y2={cy - 8}
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  markerEnd={`url(#${keyPrefix}-arrow)`}
                />
                {/* prev: back along the bottom */}
                <line
                  x1={nodeX(idx + 1)}
                  y1={cy + 8}
                  x2={x + NODE_W + 3}
                  y2={cy + 8}
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  markerEnd={`url(#${keyPrefix}-arrow)`}
                />
              </>
            )}
          </g>
        );
      })}
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
    `A doubly linked list gives every node two pointers instead of one: one pointing forward to the next node, and one pointing backward to the previous node. That extra backward link is what lets you walk the list in either direction.`,
    `Because both a head and tail pointer are kept, you get O(1) access at either end. The chain of "next" pointers reads the list forward, while the chain of "previous" pointers reads it backward.`,
    `The tradeoff is straightforward: you pay for an extra pointer per node in memory, but in exchange you get backward traversal and fast operations at both ends, which a singly linked list can't offer as cheaply.`,
  ];

  const basicOperations = [
    { name: "Insertion at Head", complexity: "O(1)", description: "Add new node at beginning, update head and adjacent node's pointers" },
    { name: "Insertion at Tail", complexity: "O(1)", description: "Add new node at end using tail pointer" },
    { name: "Insertion at Position", complexity: "O(n)", description: "Traverse to position and insert with pointer updates" },
    { name: "Deletion at Head", complexity: "O(1)", description: "Remove first node and update head pointer" },
    { name: "Deletion at Tail", complexity: "O(1)", description: "Remove last node using tail pointer" },
    { name: "Deletion by Value", complexity: "O(n)", description: "Traverse to find node and update adjacent pointers" },
    { name: "Forward Traversal", complexity: "O(n)", description: "Traverse from head to tail using next pointers" },
    { name: "Backward Traversal", complexity: "O(n)", description: "Traverse from tail to head using prev pointers" },
  ];

  const memoryNotes = [
    `Like any linked list, a doubly linked list's nodes are scattered across memory rather than sitting in one contiguous block. The chain only exists because of the pointers each node stores, not because of where the nodes physically live.`,
    `The difference here is that every node carries two of those pointers instead of one, so the per-node overhead is doubled. In exchange, any node you already hold a reference to can be removed in O(1), because it knows both of its neighbours and can splice itself out without a traversal to find the one behind it.`,
  ];

  const insertionSteps = [
    { step: "1. Create new node with data, prev, and next pointers" },
    { step: "2. For head insertion: Set new node's next to current head" },
    { step: "3. Update current head's prev to new node" },
    { step: "4. Move head pointer to new node" },
    { step: "5. For empty list, set both head and tail to new node" },
    { step: "6. For tail insertion: Similar steps but working from tail" },
  ];

  const deletionSteps = [
    { step: "1. Check if list is empty" },
    { step: "2. For head deletion: Store head reference, move head to head.next" },
    { step: "3. Set new head's prev to null (if exists)" },
    { step: "4. For tail deletion: Similar steps working from tail" },
    { step: "5. For middle deletion: Find node, update adjacent nodes' pointers" },
    { step: "6. Handle special cases (single node removal)" },
  ];

  const prosCons = [
    { point: "Bidirectional traversal capability", type: "pro" },
    { point: "O(1) operations at both ends", type: "pro" },
    { point: "Easier node removal (no need to track previous node)", type: "pro" },
    { point: "Better for certain algorithms (e.g., LRU cache)", type: "pro" },
    { point: "Extra memory for prev pointers", type: "con" },
    { point: "More pointer operations (slightly complex implementation)", type: "con" },
    { point: "Slightly slower operations due to extra pointer updates", type: "con" },
  ];

  const visualization = [
    {
      operation: "Initialization",
      note: "An empty list is just two null pointers.",
      nodes: [],
    },
    {
      operation: "insertFirst(10)",
      note: "The first node is both head and tail, and both of its pointer cells are null.",
      nodes: [10],
      highlight: 0,
    },
    {
      operation: "insertFirst(20)",
      note: "The new node's next points at 10, and 10's prev points back at it — one link written in each direction.",
      nodes: [20, 10],
      highlight: 0,
    },
    {
      operation: "insertLast(30)",
      note: "Because tail is tracked, the end is reached without walking the list, so this is O(1) rather than O(n).",
      nodes: [20, 10, 30],
      highlight: 2,
    },
    {
      operation: "deleteFirst()",
      note: "head moves to 10 and 10's prev is set to null. The detached node is now unreachable.",
      nodes: [10, 30],
    },
    {
      operation: "deleteLast()",
      note: "tail moves back to 10 using 30's prev pointer — the step a singly linked list cannot take without traversing.",
      nodes: [10],
    },
  ];

  const applications = [
    "Browser forward/backward navigation",
    "Undo/Redo functionality in software",
    "LRU (Least Recently Used) cache implementation",
    "Navigation systems with bidirectional movement",
    "Music/video playlists with forward/backward controls",
    "Text editors with cursor movement in both directions",
  ];

  const comparisonTable = [
    { feature: "Traversal Direction", singly: "Forward only", doubly: "Both directions" },
    { feature: "Memory Overhead", singly: "Lower (1 pointer/node)", doubly: "Higher (2 pointers/node)" },
    { feature: "Insert/Delete at Head", singly: "O(1)", doubly: "O(1)" },
    { feature: "Insert/Delete at Tail", singly: "O(n) (or O(1) with tail pointer)", doubly: "O(1)" },
    { feature: "Delete Current Node", singly: "Requires previous node", doubly: "Direct access via prev pointer" },
    { feature: "Implementation Complexity", singly: "Simpler", doubly: "More complex" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Overview Section */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Doubly Linked List
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            {overview.map((para, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {para}
              </p>
            ))}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Key Property:</strong> Each node is represented as [prev|data|next], showing the bidirectional links between nodes.
              </p>
            </div>
          </div>
        </section>

        {/* Memory Representation */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How It Lives in Memory</h2>
          <div className="prose dark:prose-invert max-w-none">
            {memoryNotes.map((para, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {para}
              </p>
            ))}
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

        {/* How It Works */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Does It Work?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Each node below is drawn as its three parts: a prev cell, the data,
            and a next cell. The grey address under each box is where that node
            lives in memory, and the pointer cells hold nothing but addresses —
            prev stores the address of the node behind, next the address of the
            node ahead. At the two ends there is nothing to point at, so those
            cells read null. Every pair of neighbours is therefore joined by two
            links, one running forward along the top and one running back along
            the bottom, and keeping both correct is the entire job of every
            operation on this list.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Read across the middle node below: its prev says 0x1A and its next
            says 0x3C, which are exactly the addresses printed under its two
            neighbours. The addresses here are made up and kept short so they
            fit; real ones are far longer but behave identically.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
            <DoublyListDiagram nodes={["A", "B", "C"]} keyPrefix="dll-anatomy" />
          </div>
        </section>

        {/* Insertion Process */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Insertion Process</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Inserting at the head means writing four pointers in total: the new
            node&apos;s prev (null) and next (the old head&apos;s address), the
            old head&apos;s prev (the new node&apos;s address), and the head
            pointer itself. Watch A&apos;s prev cell below change from null to
            0x4D. No traversal is involved, so it runs in O(1).
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <DoublyListDiagram nodes={["A", "B"]} keyPrefix="dll-ins-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ insert X at head ↓</p>
            <DoublyListDiagram nodes={["X", "A", "B"]} highlight={0} keyPrefix="dll-ins-after" />
          </div>
          <ol className="mt-4 space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
            {insertionSteps.map((step, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                {step.step}
              </li>
            ))}
          </ol>
        </section>

        {/* Deletion Process */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Deletion Process</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            To remove a node, its two neighbours are pointed at each other: X&apos;s
            next is overwritten with the address in A&apos;s next (0x2F), and
            B&apos;s prev is overwritten with the address in A&apos;s prev
            (0x4D). Crucially, A already holds both of those addresses in its
            own cells, so no walk from the head is needed to find the node in
            front of it — which is exactly what a singly linked list would have
            to do.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <DoublyListDiagram nodes={["X", "A", "B"]} highlight={1} keyPrefix="dll-del-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ delete A ↓</p>
            <DoublyListDiagram nodes={["X", "B"]} keyPrefix="dll-del-after" />
          </div>
          <ol className="mt-4 space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
            {deletionSteps.map((step, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                {step.step}
              </li>
            ))}
          </ol>
        </section>

        {/* Visualization */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Operation Walkthrough</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            A full sequence on an empty list, one operation at a time:
          </p>
          <div className="space-y-5">
            {visualization.map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-mono font-semibold">{item.operation}</span>
                  {" — "}
                  <span className="text-gray-600 dark:text-gray-400">{item.note}</span>
                </p>
                <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
                  <DoublyListDiagram
                    nodes={item.nodes}
                    highlight={item.highlight}
                    keyPrefix={`dll-walk${index}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison with Singly Linked List */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Comparison with Singly Linked List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Feature</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Singly Linked List</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Doubly Linked List</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {comparisonTable.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{row.feature}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.singly}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.doubly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pros and Cons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">Advantages</h3>
              <ul className="space-y-2">
                {prosCons.filter(item => item.type === "pro").map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item.point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">Limitations</h3>
              <ul className="space-y-2">
                {prosCons.filter(item => item.type === "con").map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item.point}</span>
                  </li>
                ))}
              </ul>
            </div>
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
                <strong>When to Choose:</strong> Prefer doubly linked lists when you need bidirectional traversal, frequent operations at both ends, or when the ability to delete arbitrary nodes without traversal is valuable.
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