"use client";
import { useEffect, useState } from "react";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
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
    `A doubly linked list gives every node two pointers instead of one — one pointing forward to the next node, and one pointing backward to the previous node. That extra backward link is what lets you walk the list in either direction.`,
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

  const implementationCode = [
    { code: "class DoublyNode {" },
    { code: "  constructor(data) {" },
    { code: "    this.data = data;" },
    { code: "    this.prev = null;" },
    { code: "    this.next = null;" },
    { code: "  }" },
    { code: "}" },
    { code: "" },
    { code: "class DoublyLinkedList {" },
    { code: "  constructor() {" },
    { code: "    this.head = null;" },
    { code: "    this.tail = null;" },
    { code: "    this.size = 0;" },
    { code: "  }" },
    { code: "" },
    { code: "  isEmpty() {" },
    { code: "    return this.head === null;" },
    { code: "  }" },
    { code: "" },
    { code: "  // Insert at head" },
    { code: "  insertFirst(data) {" },
    { code: "    const newNode = new DoublyNode(data);" },
    { code: "    if (this.isEmpty()) {" },
    { code: "      this.head = newNode;" },
    { code: "      this.tail = newNode;" },
    { code: "    } else {" },
    { code: "      newNode.next = this.head;" },
    { code: "      this.head.prev = newNode;" },
    { code: "      this.head = newNode;" },
    { code: "    }" },
    { code: "    this.size++;" },
    { code: "  }" },
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
    { operation: "Initialization", state: "head → null ← tail" },
    { operation: "insertFirst(10)", state: "head → [null|10|•] ← tail" },
    { operation: "insertFirst(20)", state: "head → [null|20|•] ↔ [•|10|•] ← tail" },
    { operation: "insertLast(30)", state: "head → [null|20|•] ↔ [•|10|•] ↔ [•|30|null] ← tail" },
    { operation: "deleteFirst()", state: "head → [null|10|•] ↔ [•|30|null] ← tail" },
    { operation: "deleteLast()", state: "head → [null|10|null] ← tail" },
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
      <article className="md:col-span-9 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Overview Section */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Doubly Linked List
          </h1>
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

        {/* Implementation */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation</h2>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                {implementationCode.map((line, index) => (
                  <div key={index}>{line.code}</div>
                ))}
              </code>
            </pre>
          </div>
        </section>

        {/* Insertion Process */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Insertion Process</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {insertionSteps.map((step, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                    {step.step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <span className="font-mono mr-2">head →</span>
                  <div className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded">[•|A|•] ↔ [•|B|•]</div>
                  <span className="font-mono ml-2">← tail</span>
                </div>
                <div className="text-center text-gray-600 dark:text-gray-300">↓ Insert X at head ↓</div>
                <div className="flex items-center">
                  <span className="font-mono mr-2">head →</span>
                  <div className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded">[null|X|•] ↔ [•|A|•] ↔ [•|B|•]</div>
                  <span className="font-mono ml-2">← tail</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deletion Process */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Deletion Process</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {deletionSteps.map((step, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                    {step.step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <span className="font-mono mr-2">head →</span>
                  <div className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded">[•|X|•] ↔ [•|A|•] ↔ [•|B|•]</div>
                  <span className="font-mono ml-2">← tail</span>
                </div>
                <div className="text-center text-gray-600 dark:text-gray-300">↓ Delete A ↓</div>
                <div className="flex items-center">
                  <span className="font-mono mr-2">head →</span>
                  <div className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded">[•|X|•] ↔ [•|B|•]</div>
                  <span className="font-mono ml-2">← tail</span>
                </div>
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