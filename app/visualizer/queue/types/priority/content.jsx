import { complex } from "framer-motion";

const content = () => {
  const paragraphs = [
    `A Priority Queue is an abstract data type where each element has a priority value, and elements are served based on priority rather than insertion order. Unlike a standard queue (FIFO), higher-priority elements are dequeued before lower-priority ones, regardless of when they were added.`,
    `The priority queue is a fundamental data structure that enables efficient management of elements based on their importance or urgency. Its ability to always provide access to the highest (or lowest) priority item makes it indispensable in algorithms where processing order significantly impacts performance or correctness. The choice of implementation (heap, BST, etc.) depends on the specific application's requirements for insertion, extraction, and auxiliary operations.`,
  ];

  const characteristic = [
    { points : "Priority-based ordering:",
      subpoints : [
        "Elements are processed by priority (highest first or lowest first)",
      ],
     },
    { points : "Two core operations:",
      subpoints : [
        "insert(item, priority) - Add with priority",
        "extractMax()/extractMin() - Remove highest/lowest priority item",
      ],
     },
    { points : "Peek operation:",
      subpoints : [
        "View highest/lowest priority item without removal",
      ],
     },
    { points : "No FIFO guarantee:",
      subpoints : [
        "Equal priority elements may be processed in arbitrary order",
      ],
     },
  ];

  const example = [
    { points : `insert("A", 3): [(A,3)]` },
    { points : `insert("B", 5): [(A,3), (B,5)] → [(B,5), (A,3)]` },
    { points : `insert("C", 1): [(B,5), (A,3), (C,1)]` },
    { points : `extractMax(): Returns "B" → [(A,3), (C,1)]` },
    { points : `insert("D", 4): [(A,3), (C,1), (D,4)] → [(D,4), (A,3), (C,1)]` },
    { points : `extractMax(): Returns "D" → [(A,3), (C,1)]` },
  ];

  const implementation = [
    { points : "Binary Heap:", 
      subpoints : [
        "Most common implementation",
        "O(log n) insert and extract",
        "O(1) peek",
        "Memory efficient",
      ],
    },
    { points : "Balanced Binary Search Tree:", 
      subpoints : [
        "O(log n) all operations",
        "Supports more operations (like delete-by-value)",
        "Higher memory overhead",
      ],
    },
    { points : "Array (Unsorted):", 
      subpoints : [
        "O(1) insert, O(n) extract",
        "Simple but inefficient for large datasets",
      ],
    },
    { points : "Fibonacci Heap:", 
      subpoints : [
        "Amortized O(1) insert",
        "O(log n) extract",
        "Complex implementation",
      ],
    },
  ];

  const Complexity = [
    { points : "insert(): O(log n) (heap), O(1) amortized (Fibonacci heap)" },
    { points : "extractMax()/extractMin(): O(log n)" },
    { points : "peek(): O(1)" },
    { points : "delete(item): O(log n) (heap), O(1) amortized (Fibonacci heap)" },
    { points : "changePriority(): O(log n)" },
  ];

  const application = [
    { points : "Dijkstra's Algorithm: Finding shortest paths in graphs" },
    { points : "Huffman Coding: Data compression" },
    { points : "Operating Systems: Process scheduling" },
    { points : "Event-driven Simulation: Processing events in time order" },
    { points : "A* Search: Pathfinding in AI" },
    { points : "Bandwidth Management: Prioritizing network packets" },
  ];

  const special = [
    { points : "Min-Priority Queue: Extracts minimum priority first" },
    { points : "Max-Priority Queue: Extracts maximum priority first" },
    { points : "Double-Ended Priority Queue: Supports both min and max extraction" },
    { points : "Indexed Priority Queue: Allows priority updates by key" },
    { points : "Bounded Priority Queue: Fixed capacity with eviction policies" },
  ];

    return (
      <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
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

    {/* Visual Example (Max-Heap Priority Queue) */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Visual Example (Max-Heap Priority Queue)
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Operation sequence:
        </p>
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {example.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
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
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              <span className="font-semibold">{item.points}</span>
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

    {/* Time Complexity */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Time Complexity
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {Complexity.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                {item.points.split(':')[0]}:
              </span>
              <span className="ml-2">{item.points.split(':')[1]}</span>
            </li>
          ))}
        </ul>
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
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
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
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Additional Info */}
    <section className="p-6 border-t border-gray-100 dark:border-gray-700">
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
  
  export default content;