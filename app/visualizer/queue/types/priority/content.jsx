"use client";
import { useEffect, useState } from "react";

const content = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
    };

    updateTheme();
    setMounted(true);

    window.addEventListener("storage", updateTheme);
    window.addEventListener("themeChange", updateTheme);

    return () => {
      window.removeEventListener("storage", updateTheme);
      window.removeEventListener("themeChange", updateTheme);
    };
  }, []);

  const paragraphs = [
    `A Priority Queue is an abstract data type where each element has a priority value, and elements are served based on priority rather than insertion order. Unlike a standard queue (FIFO), higher-priority elements are dequeued before lower-priority ones, regardless of when they were added.`,
    `The priority queue is a fundamental data structure that enables efficient management of elements based on their importance or urgency. Its ability to always provide access to the highest (or lowest) priority item makes it indispensable in algorithms where processing order significantly impacts performance or correctness. The choice of implementation (heap, BST, etc.) depends on the specific application's requirements for insertion, extraction, and auxiliary operations.`,
  ];

  const characteristic = [
    {
      points: "Priority-based ordering:",
      subpoints: [
        "Elements are processed by priority (highest first or lowest first)",
      ],
    },
    {
      points: "Two core operations:",
      subpoints: [
        "insert(item, priority) - Add with priority",
        "extractMax()/extractMin() - Remove highest/lowest priority item",
      ],
    },
    {
      points: "Peek operation:",
      subpoints: ["View highest/lowest priority item without removal"],
    },
    {
      points: "No FIFO guarantee:",
      subpoints: [
        "Equal priority elements may be processed in arbitrary order",
      ],
    },
  ];

  const implementation = [
    {
      points: "Binary Heap:",
      subpoints: [
        "Most common implementation",
        "O(log n) insert and extract",
        "O(1) peek",
        "Memory efficient",
      ],
    },
    {
      points: "Balanced Binary Search Tree:",
      subpoints: [
        "O(log n) all operations",
        "Supports more operations (like delete-by-value)",
        "Higher memory overhead",
      ],
    },
    {
      points: "Array (Unsorted):",
      subpoints: [
        "O(1) insert, O(n) extract",
        "Simple but inefficient for large datasets",
      ],
    },
    {
      points: "Fibonacci Heap:",
      subpoints: [
        "Amortized O(1) insert",
        "O(log n) extract",
        "Complex implementation",
      ],
    },
  ];

  const application = [
    { points: "Dijkstra's Algorithm: Finding shortest paths in graphs" },
    { points: "Huffman Coding: Data compression" },
    { points: "Operating Systems: Process scheduling" },
    { points: "Event-driven Simulation: Processing events in time order" },
    { points: "A* Search: Pathfinding in AI" },
    { points: "Bandwidth Management: Prioritizing network packets" },
  ];

  const special = [
    { points: "Min-Priority Queue: Extracts minimum priority first" },
    { points: "Max-Priority Queue: Extracts maximum priority first" },
    {
      points:
        "Double-Ended Priority Queue: Supports both min and max extraction",
    },
    { points: "Indexed Priority Queue: Allows priority updates by key" },
    { points: "Bounded Priority Queue: Fixed capacity with eviction policies" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 md:gap-4">
      <div className="col-span-1">
        <div className="hidden md:block">
          {mounted && (
            <iframe
              key={theme}
              src={
                theme === "dark"
                  ? "https://hw.glich.co/resources/embed/daily/dsa?theme=dark"
                  : "https://hw.glich.co/resources/embed/daily/dsa?theme=light"
              }
              width="100%"
              height="400"
              title="Daily DSA Challenge"
            ></iframe>
          )}
        </div>
        <div className="flex justify-center">
          <span className="text-xs hidden md:block">
            Daily DSA Challenge by{" "}
            <a
              href="https://hw.glich.co/resources/daily"
              target="_blank"
              className="underline hover:text-blue-500 duration-300"
            >
              Hello World
            </a>
          </span>
        </div>
      </div>
      <article className="col-span-4 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is a Priority Queue? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is a Priority Queue?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>
          </div>
        </section>

        {/* Key Characteristics */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Key Characteristics
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Priority queues have these fundamental properties:
            </p>
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {characteristic.map((item, index) => (
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

        {/* Implementation Variations */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Implementation Variations
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Common implementation approaches:
            </p>
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {implementation.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-semibold">{item.points}</span>
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

        {/* Applications */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Applications
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Priority queues are used in:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {application.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Special Cases */}
        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Special Cases
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Interesting priority queue variations:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {special.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Additional Info */}
        <section className="p-6 border-t border-gray-100 dark:border-gray-700">
          <div className="prose dark:prose-invert max-w-none">
            <div className="px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraphs[1]}
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Mobile iframe at bottom */}
      <div className="block md:hidden w-full">
        {mounted && (
          <iframe
            key={theme}
            src={
              theme === "dark"
                ? "https://hw.glich.co/resources/embed/daily/dsa?theme=dark"
                : "https://hw.glich.co/resources/embed/daily/dsa?theme=light"
            }
            width="100%"
            height="320"
            title="Daily DSA Challenge"
          ></iframe>
        )}
        <div className="flex justify-center pb-8">
          <span className="text-xs">
            Daily DSA Challenge by{" "}
            <a
              href="https://hw.glich.co/resources/daily"
              target="_blank"
              className="underline hover:text-blue-500 duration-300"
            >
              Hello World
            </a>
          </span>
        </div>
      </div>
    </main>
  );
};

export default content;
