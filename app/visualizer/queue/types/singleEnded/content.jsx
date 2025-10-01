const content = () => {
  const paragraphs = [
    `A single-ended queue (often just called a queue) is a linear data structure that follows the FIFO (First-In-First-Out) principle. Elements are added (enqueued) at the rear and removed (dequeued) from the front, maintaining strict ordering.`,
    `The single-ended queue is a fundamental data structure in computer science, providing predictable ordering that's essential for many algorithms and system design patterns where processing order matters.`
  ];

  const characteristics = [
    { points : "Two ends:",
      subpoints : [
        "Front (for removal) and rear (for insertion)",
      ],
     },
    { points : "Basic Operations:",
      subpoints : [
        "enqueue() - Add to rear",
        "dequeue() - Remove from front",
        "peek() - View front element",
        "isEmpty() - Check if empty",
      ],
     },
    { points : "Fixed Order:",
      subpoints : [
        "Elements are processed in exact arrival sequence",
      ],
     },
  ];

  const example = [
    { points : "enqueue(10): [10]" },
    { points : "enqueue(20): [10, 20]" },
    { points : "enqueue(30): [10, 20, 30]" },
    { points : "dequeue(): Returns 10 → [20, 30]" },
    { points : "peek(): Returns 20 → [20, 30] (unchanged)" },
  ];

  const implementation = [
    { points : "Array-Based:",
      subpoints : [
        "Fixed or dynamic array",
        "Need to handle wrap-around for circular queues",
      ],
     },
    { points : "Linked List:",
      subpoints : [
        "Head pointer as front",
        "Tail pointer as rear",
        "Efficient O(1) operations",
      ],
     },
  ];

  const complexity = [
    { points : "enqueue(): O(1)" },
    { points : "dequeue(): O(1)" },
    { points : "peek(): O(1)" },
    { points : "isEmpty(): O(1)" },
  ];

  const application = [
    { points : "CPU task scheduling" },
    { points : "Print job management" },
    { points : "Breadth-First Search (BFS) algorithms" },
    { points : "Buffering data streams" },
    { points : "Handling requests in web servers" },
  ];

  const differences = [
    { points : "Single-ended only allows insertion at rear and removal at front" },
    { points : "Double-ended (deque) allows insertion/removal at both ends" },
    { points : "Single-ended has stricter FIFO enforcement" },
    { points : "Single-ended is simpler to implement" },
  ];

    return (
      <main className="max-w-4xl mx-auto">
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          {/* What is a Single-Ended Queue? */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              What is a Single-Ended Queue?
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
                Single-ended queues have these fundamental properties:
              </p>
              <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {characteristics.map((item, index) => (
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

          {/* Visual Example */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              Visual Example
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Operation sequence on an initially empty queue:
              </p>
              <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {example.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700 dark:text-gray-300 pl-2"
                  >
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

          {/* Time Complexity */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              Time Complexity
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {complexity.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700 dark:text-gray-300 pl-2"
                  >
                    <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                      {item.points.split(":")[0]}:
                    </span>
                    <span className="ml-2">{item.points.split(":")[1]}</span>
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
                Single-ended queues are used in:
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

          {/* Comparison with Double-Ended Queue */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              Comparison with Double-Ended Queue
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Key differences:
              </p>
              <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {differences.map((item, index) => (
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
  
  export default content;