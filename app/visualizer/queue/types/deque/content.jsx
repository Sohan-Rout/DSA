const content = () => {
  const paragraph = [
    `A Double-Ended Queue (Deque) is a versatile data structure that allows insertion and deletion of elements from both ends (front and rear). Unlike a single-ended queue, it provides more flexibility while maintaining efficient O(1) operations.`,
    `The double-ended queue is a powerful hybrid data structure that combines the best features of stacks and queues. Its flexibility makes it invaluable for algorithms requiring access to both ends of a dataset, while maintaining efficient constant-time operations for all key functions.`,
  ];

  const characteristics = [
    { points : "Two open ends:",
      subpoints : [
        "Supports operations at both front and rear",
      ],
     },
    { points : "Four core operations:",
      subpoints : [
        "addFront() - Insert at front",
        "addRear() - Insert at rear",
        "removeFront() - Delete from front",
        "removeRear() - Delete from rear",
      ],
     },
    { points : "Hybrid nature:",
      subpoints : [
        "Combines features of both stacks and queues",
      ],
     },
  ];

  const example = [
    { points : "addFront(30): [30]" },
    { points : "addRear(40): [30, 40]" },
    { points : "addFront(20): [20, 30, 40]" },
    { points : "addRear(50): [20, 30, 40, 50]" },
    { points : "removeFront(): Returns 20 → [30, 40, 50]" },
    { points : "removeRear(): Returns 50 → [30, 40]" },
  ];

  const variations = [
    { points : "Doubly Linked List:",
      subpoints : [
        "Natural fit with head and tail pointers",
        "All operations are O(1)",
        "Extra memory for previous/next pointers",
      ],
    },
    { points : "Circular Array:",
      subpoints : [
        "Fixed capacity but efficient",
        "Requires careful index management",
        "Good for memory-constrained environments",
      ],
    },
    { points : "Dynamic Array:",
      subpoints : [
        "Amortized O(1) operations",
        "May need occasional resizing",
      ],
    },
  ];

  const complexity = [
    { points : "addFront(): O(1)" },
    { points : "addRear(): O(1)" },
    { points : "removeFront(): O(1)" },
    { points : "removeRear(): O(1)" },
    { points : "peekFront(): O(1)" },
    { points : "peekRear(): O(1)" },
  ];

  const application = [
    { points : "Undo/Redo operations: Store history at both ends" },
    { points : "Palindrome checking: Compare front and rear elements" },
    { points : "Steal algorithms: Work stealing in parallel processing" },
    { points : "Sliding window problems: Efficient maximum/minimum tracking" },
    { points : "Browser history: Navigation in both directions" },
  ];

  const cases = [
    { points : "Input-Restricted Deque: Insertion only at one end" },
    { points : "Output-Restricted Deque: Deletion only at one end" },
    { points : "Palindrome Checker: Using deque properties" },
    { points : "Priority Deque: Combines deque and priority queue features" },
  ];

    return (
      <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is a Double-Ended Queue (Deque)? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is a Double-Ended Queue (Deque)?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[0]}
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
          Deques have these fundamental properties:
        </p>
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {characteristics.map((item, index) => (
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

    {/* Visual Example */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Visual Example
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Operation sequence on an empty deque:
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
          {variations.map((item, index) => (
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
          {complexity.map((item, index) => (
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
          Deques are used in:
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
          Interesting deque variations:
        </p>
        <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {cases.map((item, index) => (
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
            {paragraph[1]}
          </p>
        </div>
      </div>
    </section>
  </article>
</main>
    );
  };
  
  export default content;