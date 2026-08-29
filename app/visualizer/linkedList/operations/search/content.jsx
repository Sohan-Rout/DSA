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
    `Searching a linked list means walking it from the head, comparing each node's value against a target, and stopping as soon as a match is found or the list runs out.`,
    `Because a node only knows about the node right after it, there's no way to jump into the middle of the list. Every search has to start at the head and move one node at a time.`,
    `That single restriction is what separates linked list search from array search: an array gives you direct index access, so a sorted array can be binary searched in O(log n). A linked list can't, no matter how the data is ordered.`,
  ];

  const searchTypes = [
    {
      name: "Iterative Linear Search",
      complexity: "O(n)",
      description: "Walk from head with a loop, comparing each node's value to the target",
      code: `function search(head, target) {
  let current = head;
  let index = 0;
  while (current) {
    if (current.data === target) return index;
    current = current.next;
    index++;
  }
  return -1;
}`
    },
    {
      name: "Recursive Linear Search",
      complexity: "O(n) time, O(n) space (call stack)",
      description: "Check the current node, then recurse on the rest of the list",
      code: `function search(node, target) {
  if (!node) return false;
  if (node.data === target) return true;
  return search(node.next, target);
}`
    }
  ];

  const searchSteps = [
    { step: "Start from the head node with a current pointer" },
    { step: "Compare current node's data with the target value" },
    { step: "If it matches, the search is done: return the node, its index, or true" },
    { step: "Otherwise move current to current.next and repeat" },
    { step: "If current becomes null, the target isn't in the list" }
  ];

  const visualization = [
    { operation: "List", state: "head → [10] → [25] → [40] → [55] → null" },
    { operation: "search(40)", state: "Check 10 (no) → check 25 (no) → check 40 (match, index 2)" },
    { operation: "search(99)", state: "Check 10, 25, 40, 55, all fail, current reaches null: not found" }
  ];

  const edgeCases = [
    "Empty list (head = null): the target can never be found",
    "Target at the head: found after a single comparison",
    "Target at the tail: worst case for a hit, still O(n)",
    "Target missing entirely: traversal runs all the way to null",
    "Duplicate values: a linear search returns the first match unless coded to collect all matches"
  ];

  const bestPractices = [
    "Guard against an empty list before starting the loop",
    "Track an index alongside the pointer if the caller needs a position, not just a boolean",
    "Prefer iteration over recursion for long lists to avoid stack depth issues",
    "Stop the moment a match is found rather than scanning the rest of the list",
    "If the same list is searched repeatedly, consider a hash map alongside it to get O(1) lookups"
  ];

  const comparisonTable = [
    {
      feature: "Sorted, unsorted search",
      array: "O(log n) sorted via binary search, O(n) unsorted",
      linkedList: "O(n) regardless of order"
    },
    {
      feature: "Access pattern",
      array: "Random access by index",
      linkedList: "Sequential access via next pointer only"
    },
    {
      feature: "Why sorting doesn't help",
      array: "Binary search needs the midpoint in O(1)",
      linkedList: "Reaching the midpoint itself costs O(n)"
    },
    {
      feature: "Best case",
      array: "O(1) if target is at the checked index first",
      linkedList: "O(1) if target is at the head"
    }
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
            Searching
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            {overview.map((para, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {para}
              </p>
            ))}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Key Insight:</strong> Linked lists only support linear search. There's no linked list equivalent of binary search, since reaching any node still requires traversing every node before it.
              </p>
            </div>
          </div>
        </section>

        {/* Search Types */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Search Approaches</h2>
          <div className="space-y-6">
            {searchTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{type.name}</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Complexity:</strong> <span className="font-mono">{type.complexity}</span></p>
                    <p className="text-gray-700 dark:text-gray-300">{type.description}</p>
                  </div>
                  <div className="flex-1">
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm overflow-x-auto">
                      <code className="text-gray-800 dark:text-gray-200">{type.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search Process */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Search Process</h2>
          <div>
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {searchSteps.map((step, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">{step.step}</li>
              ))}
            </ol>
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

        {/* Edge Cases */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edge Cases to Consider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {edgeCases.map((caseItem, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-yellow-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{caseItem}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestPractices.map((practice, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{practice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison with Arrays */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Comparison with Array Search</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Feature</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Array</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Linked List</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {comparisonTable.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{row.feature}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.array}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.linkedList}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>When to Choose:</strong> If you need frequent lookups by value, an array (sorted, with binary search) or a hash map will beat a linked list every time. Linked lists earn their keep when insertion and deletion at known positions matter more than search speed.
            </p>
          </div>
        </section>

        {/* Final Notes */}
        <section className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation Notes</h2>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="list-disc pl-5 space-y-2 marker:text-blue-500 dark:marker:text-blue-400">
              <li className="text-gray-700 dark:text-gray-300">
                <strong>Early exit:</strong> Return or break as soon as a match is found, don't keep scanning
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <strong>Return value:</strong> Decide upfront whether the caller needs the node itself, its index, or just a boolean
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <strong>Recursion depth:</strong> A recursive search on a very long list can exhaust the call stack; iterate instead
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <strong>Frequent lookups:</strong> If the same list is searched often, pairing it with a hash map trades memory for O(1) average lookups
              </li>
            </ul>
          </div>
        </section>

        <InContentAd />
      </article>
      <NewsletterEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;
