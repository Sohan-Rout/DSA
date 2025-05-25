const content = () => {
  const paragraph = [
    `A Multiple Queue is a data structure that consists of several individual queues managed together. This approach allows for better organization of data with different priorities or categories while maintaining the standard FIFO (First-In-First-Out) property within each individual queue.`,
    `The multiple queue structure provides an efficient way to manage categorized or prioritized data streams while maintaining the simplicity of FIFO operations within each category. Its versatility makes it particularly valuable in systems where different types of data or requests need separate but coordinated handling.`,
  ];

  const characteristics = [
    { points : "Multiple FIFO structures: Contains several independent queues" },
    { points : "Priority management: Queues can represent different priority levels" },
    { points : "Flexible operations:",
      subpoints : [
        "enqueue(item, queueNum) - Add to specific queue",
        "dequeue(queueNum) - Remove from specific queue",
        "multiDequeue() - Remove following priority rules",
      ],
     },
    { points : "Dynamic allocation: Queues can grow/shrink independently" },
  ];

  const example = [
    { points : "enqueue(A, 0): Queue0 [A] | Queue1 [] | Queue2 []" },
    { points : "enqueue(B, 1): Queue0 [A] | Queue1 [B] | Queue2 []" },
    { points : "enqueue(C, 0): Queue0 [A, C] | Queue1 [B] | Queue2 []" },
    { points : "dequeue(0): Returns A → Queue0 [C] | Queue1 [B] | Queue2 []" },
    { points : "enqueue(D, 2): Queue0 [C] | Queue1 [B] | Queue2 [D]" },
    { points : "multiDequeue(): Returns B (higher priority) → Queue0 [C] | Queue1 [] | Queue2 [D]" },
  ];

  const implementation = [
    { points : "Array of Queues:",
      subpoints : [
        "Fixed number of queues",
        "Simple to implement",
        "Static memory allocation",
      ],
     },
    { points : "Dynamic Array of Linked Lists:",
      subpoints : [
        "Flexible queue sizes",
        "Efficient memory usage",
        "More complex implementation",
      ],
     },
    { points : "Priority-based Implementation:",
      subpoints : [
        "Queues represent priority levels",
        "Automatic routing of dequeue operations",
      ],
     },
  ];

  const complexity = [
    { points : "enqueue(item, queueNum): O(1)" }, 
    { points : "dequeue(queueNum): O(1)" }, 
    { points : "multiDequeue(): O(k) where k is number of queues" }, 
    { points : "peek(queueNum): O(1)" }, 
    { points : "isEmpty(queueNum): O(1)" }, 
  ];

  const applications = [
    { points : "Operating Systems: Process scheduling with multiple priority levels" },
    { points : "Network Traffic Management: Different queues for different packet types" },
    { points : "Print Spooling: Separate queues for different printer priorities" },
    { points : "Customer Service Systems: VIP vs regular customer queues" },
    { points : "Multi-level Feedback Queues: Adaptive scheduling algorithms" },
  ];

  const cases = [
    { points : "Priority Multi-Queue: Automatic dequeue from highest priority non-empty queue" }, 
    { points : "Dynamic Multi-Queue: Queues can be added/removed at runtime" }, 
    { points : "Bounded Multi-Queue: Each queue has individual capacity limits" }, 
    { points : "Inter-Queue Transfer: Items can move between queues under certain conditions" }, 
  ];

    return (
      <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is a Multiple Queue? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is a Multiple Queue?
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
          Multiple queues have these fundamental properties:
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
          Operation sequence with 3 queues:
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
          Multiple queues are used in:
        </p>
        <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {applications.map((item, index) => (
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
          Interesting multiple queue variations:
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