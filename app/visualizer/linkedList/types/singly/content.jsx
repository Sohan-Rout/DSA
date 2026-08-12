"use client";
import { useEffect, useState } from "react";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";

import InContentAd from "@/app/components/ads/InContentAd";

const ListDiagram = ({ nodes, highlight, keyPrefix }) => {
  const boxSize = 40;
  const gap = 36;
  const startX = 60;
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
        aria-label="empty linked list"
      >
        <defs>
          <marker id={`${keyPrefix}-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
          </marker>
        </defs>
        <text x="0" y={cy + 4} className="fill-gray-500 dark:fill-gray-400" fontSize="12" fontFamily="monospace">
          head
        </text>
        <line x1="34" y1={cy} x2={boxX(0)} y2={cy} stroke="#94a3b8" strokeWidth="1.5" markerEnd={`url(#${keyPrefix}-arrow)`} />
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
      aria-label="linked list diagram"
    >
      <defs>
        <marker id={`${keyPrefix}-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
        </marker>
      </defs>

      <text x="0" y={cy + 4} className="fill-gray-500 dark:fill-gray-400" fontSize="12" fontFamily="monospace">
        head
      </text>
      <line
        x1="34"
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
    `A singly linked list is a chain of nodes where each node holds a value and a single pointer to the node after it. There's no fixed size to worry about: nodes are created and linked in as needed, which is what makes insertion and deletion so cheap compared to an array.`,
    `A head pointer marks where the chain starts, and the last node's pointer is simply null, marking where it ends. Adding or removing right at the head is O(1), but reaching some node in the middle means walking node-by-node from the start, which costs O(n).`,
    `It's one of the simplest data structures around, which is exactly why it shows up as the foundation for stacks, queues, and even graph adjacency lists.`,
  ];

  const memoryNotes = [
    `Unlike an array, a linked list's nodes aren't stored in one contiguous block of memory. Each node is allocated separately, wherever the runtime finds room, and gets linked to the next one purely through its pointer, so the "list" only exists because of those pointers, not because of physical ordering in memory.`,
    `That's the trade-off worth knowing: arrays are cache-friendly because reading array[i] and array[i+1] usually pulls both into the same cache line, while a linked list's scattered nodes mean each traversal step is likely a cache miss. It's part of why linked lists, despite matching or beating arrays on paper for insertion and deletion, can still lose to arrays in practice for pure iteration.`,
  ];

  const tailPointerNote = `A plain singly linked list only tracks head, which is why "Insertion at Tail" costs O(n): you have to walk the whole chain to find the last node before you can attach a new one. A common optimization is to also keep a tail pointer that always points at the last node. With that in hand, insertion at the tail drops to O(1) too, at the cost of a little extra bookkeeping (the tail pointer has to be updated on every tail insertion and, trickier, on deleting the last node).`;

  const insertionAtTail = {
    before: ["A", "B"],
    after: ["A", "B", "C"],
    highlight: 2,
  };

  const searchNote = `Searching means starting at head and following next pointers one node at a time, comparing each node's value against the target, until either a match is found or the chain runs out (next is null). There's no way to jump ahead or look backward, so in the worst case (value at the end, or not present at all) every node gets visited, making search O(n) just like deletion by value.`;

  const basicOperations = [
    { name: "Insertion at Head", complexity: "O(1)", description: "Add new node at beginning by updating head pointer" },
    { name: "Insertion at Tail", complexity: "O(n)", description: "Traverse to end and add new node (O(1) with tail pointer)" },
    { name: "Deletion at Head", complexity: "O(1)", description: "Remove first node by updating head pointer" },
    { name: "Deletion by Value", complexity: "O(n)", description: "Traverse list to find and remove specific node" },
    { name: "Search", complexity: "O(n)", description: "Traverse list to find element" },
    { name: "Access by Index", complexity: "O(n)", description: "Traverse list until reaching desired position" },
  ];

  const prosCons = [
    { point: "Dynamic size - grows as needed", type: "pro" },
    { point: "Efficient insertion/deletion at head", type: "pro" },
    { point: "No memory waste (only allocates needed nodes)", type: "pro" },
    { point: "No random access - must traverse from head", type: "con" },
    { point: "Extra memory for next pointers", type: "con" },
    { point: "Not cache-friendly (nodes scattered in memory)", type: "con" },
  ];

  const applications = [
    "Implementing stacks and queues",
    "Memory management systems",
    "Undo functionality in software",
    "Hash table collision handling",
    "Polynomial representation and arithmetic",
    "Browser history navigation",
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
            Singly Linked List
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            {overview.map((para, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {para}
              </p>
            ))}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Key Property:</strong> Each node contains data and a single pointer to the next node, forming a unidirectional chain.
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time Complexity</th>
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

        {/* Insertion at Head */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Insertion at Head</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            A new node is created pointing to the current head, then the head pointer is repointed to the new node. No traversal is needed, so this runs in O(1).
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <ListDiagram nodes={["A", "B"]} keyPrefix="ins-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ insert X at head ↓</p>
            <ListDiagram nodes={["X", "A", "B"]} highlight={0} keyPrefix="ins-after" />
          </div>
        </section>

        {/* Insertion at Tail */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Insertion at Tail</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Without a tail pointer, adding a node at the end means walking the whole chain first to find the current last node, then attaching the new one after it. That traversal is what makes this O(n) instead of O(1).
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <ListDiagram nodes={insertionAtTail.before} keyPrefix="tail-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ insert C at tail ↓</p>
            <ListDiagram nodes={insertionAtTail.after} highlight={insertionAtTail.highlight} keyPrefix="tail-after" />
          </div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Optimization:</strong> {tailPointerNote}
            </p>
          </div>
        </section>

        {/* Deletion */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Deletion</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The node before the one being removed has its pointer redirected past it to the following node. Removing the head is O(1); removing from the middle first requires walking to the node before it, making it O(n).
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <ListDiagram nodes={["X", "A", "B"]} keyPrefix="del-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ delete A ↓</p>
            <ListDiagram nodes={["X", "B"]} keyPrefix="del-after" />
          </div>
        </section>

        {/* Search & Traversal */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Search &amp; Traversal</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{searchNote}</p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
            <ListDiagram nodes={["5", "3", "7"]} highlight={2} keyPrefix="search" />
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
                <strong>Note:</strong> Singly linked lists are preferred when you need constant-time insertions/deletions at the beginning and don't require backward traversal.
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