"use client";
import { useEffect, useState } from "react";

const content = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
    };

    updateTheme();
    setMounted(true);

    window.addEventListener('storage', updateTheme);
    window.addEventListener('themeChange', updateTheme);

    return () => {
      window.removeEventListener('storage', updateTheme);
      window.removeEventListener('themeChange', updateTheme);
    };
  }, []);

  const paragraphs = [
    `The isEmpty operation checks whether a queue contains any elements or not. It returns true if the queue is empty (no elements) and false if it contains elements. This is a fundamental operation used to prevent underflow when performing dequeue operations.`,
    `The isEmpty operation is a simple but crucial part of queue functionality, serving as a safety check before removal operations and helping manage queue processing flow in algorithms and applications.`,
  ];

  const example = [
    { points : "Empty Queue: []",
      subpoints : [
        "isEmpty() → returns true",
      ],
     },
    { points : "Non-empty Queue: [10, 20, 30]",
      subpoints : [
        "isEmpty() → returns false",
      ],
     },
  ];

  const implementation = [
    { points : "Array-based Implementation:",
      subpoints : [
        "Check if front pointer == rear pointer",
        "Or maintain a separate size counter",
      ],
     },
    { points : "Linked List Implementation:",
      subpoints : [
        "Check if head pointer == null",
      ],
     },
  ];

  const steps = [
    { points : "Examine the front of the queue" },
    { points : "If front is null (or front == rear in array implementation)" },
    { points : "Return true (queue is empty)" },
    { points : "Else return false (queue has elements)" },
  ];

  const complexity = [
    { points : "It only requires a simple pointer comparison" },
    { points : "No iteration through elements is needed" },
    { points : "Performance doesn't depend on queue size" },
  ];

  const usage = [
    { points : "Before dequeue operations to prevent underflow" },
    { points : "In queue processing loops" },
    { points : "As a termination condition in algorithms" },
    { points : "To initialize queue operations safely" },
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
    {/* What is the isEmpty Operation? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is the isEmpty Operation?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraphs[0]}
        </p>
      </div>
    </section>

    {/* How Does It Work? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        How Does It Work?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          The isEmpty operation simply checks the current state of the queue. Example scenarios:
        </p>
        
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {example.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
              {item.subpoints && (
                <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                  {item.subpoints.map((subitem, subindex) => (
                    <li key={subindex} className="text-gray-600 dark:text-gray-400">
                      {subitem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        
        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          The operation doesn't modify the queue in any way - it only checks its state.
        </p>
      </div>
    </section>

    {/* Implementation Details */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Implementation Details
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Different implementations check emptiness differently:
        </p>
        
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {implementation.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
              {item.subpoints && (
                <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                  {item.subpoints.map((subitem, subindex) => (
                    <li key={subindex} className="text-gray-600 dark:text-gray-400">
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

    {/* Algorithm Steps */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithm Steps
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {steps.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Time Complexity */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Time Complexity
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          The isEmpty operation always runs in O(1) constant time because:
        </p>
        <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {complexity.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Practical Usage */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Practical Usage
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          isEmpty is commonly used:
        </p>
        <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {usage.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Additional Info */}
    <section className="p-6">
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