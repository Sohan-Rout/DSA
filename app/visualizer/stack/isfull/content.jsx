import { parseAlpha } from "@tsparticles/engine";
import { use } from "react";

const Content = () => {
  const paragraphs = [
    `The Is Full operation checks whether a stack has reached its maximum capacity. This is particularly relevant for fixed-size stack implementations (arrays) rather than dynamic implementations (linked lists).`,
    `The Is Full operation is crucial when working with fixed-size stacks to prevent overflow errors. While not needed for dynamically-sized stacks, it's an essential safety check in many system-level implementations.`,
  ];

  const working = [
    { points : "Returns true if the stack cannot accept more elements." },
    { points : "Returns false if the stack can accept more elements." },
    { points : "For dynamic stacks (no fixed size), this operation typically always returns false." },
    { points : "Often used with Push operations to prevent stack overflow." },
  ];

  const complexity = [
    { points : "Fixed-size Stack:",
      subpoints : [
        "Time Complexity: O(1)",
        "Space Complexity: O(1)",
      ],
     },
    { points : "Dynamic Stack:",
      subpoints : [
        "Time Complexity: O(1)",
        "Space Complexity: O(1)",
      ],
     },
  ];

  const useCase = [
    { points : "Preventing stack overflow in memory-constrained systems." },
    { points : "Implementing bounded buffers or fixed-size caches." },
    { points : "Memory management in embedded systems." },
    { points : "Validating stack capacity before push operations" },
  ];

  return (
    <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is the "Is Full" Operation? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is the "Is Full" Operation?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraphs[0]}
        </p>
      </div>
    </section>

    {/* How It Works */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        How It Works
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {working.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Time and Space Complexity */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Time and Space Complexity
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Here's the time and space complexity analysis for stack operations:
        </p>
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {complexity.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                {item.points.split(':')[0]}:
              </span>
              <span className="ml-2">{item.points.split(':')[1]}</span>
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
        </ul>
      </div>
    </section>

    {/* Practical Example */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Practical Example
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Consider a stack with maximum capacity of 3 elements:
        </p>
        <div className="space-y-4 mt-4">
          <div className="flex items-center">
            <div className="w-32 font-mono">Stack: [ ]</div>
            <div className="ml-4 font-medium">
              isFull() → <span className="text-red-500 dark:text-red-400">false</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-32 font-mono">Stack: [5, 3]</div>
            <div className="ml-4 font-medium">
              isFull() → <span className="text-red-500 dark:text-red-400">false</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-32 font-mono">Stack: [7, 3, 5]</div>
            <div className="ml-4 font-medium">
              isFull() → <span className="text-green-600 dark:text-green-400">true</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Common Use Cases */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Common Use Cases
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {useCase.map((item, index) => (
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
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {paragraphs[1]}
          </p>
        </div>
      </div>
    </section>
  </article>
</main>
  );
};

export default Content;
