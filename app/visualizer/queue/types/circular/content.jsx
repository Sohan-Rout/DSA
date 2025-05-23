const content = () => {
  const paragraph = [
    `A Circular Queue is an advanced version of a linear queue that connects the end of the queue back to the front, forming a circle. This efficient structure prevents memory wastage and allows better utilization of fixed-size buffers.`,
    `The circular queue is an essential data structure for systems requiring efficient, fixed-size buffers with constant-time operations. Its circular nature solves the memory wastage problem of linear queues while maintaining simple and predictable performance characteristics, making it ideal for low-level system programming and real-time applications.`,
  ];

  const characteristics = [
    { points : "Fixed capacity: Size is predetermined at creation" },
    { points : "Two pointers:",
      subpoints : [
        "Front: Points to the first element",
        "Rear: Points to the last element",
      ],
     },
    { points : "Circular behavior: When pointers reach the end, they wrap around to the start" },
    { points : "Efficient space utilization: Reuses empty spaces created after dequeues" },
  ];

  const example = [
    { points : "enqueue(10): [10, _, _, _, _] (F=0, R=0)" },
    { points : "enqueue(20): [10, 20, _, _, _] (F=0, R=1)" },
    { points : "enqueue(30): [10, 20, 30, _, _] (F=0, R=2)" },
    { points : "dequeue(): Returns 10 → [_, 20, 30, _, _] (F=1, R=2)" },
    { points : "enqueue(40): [_, 20, 30, 40, _] (F=1, R=3)" },
    { points : "enqueue(50): [_, 20, 30, 40, 50] (F=1, R=4)" },
    { points : "enqueue(60): [60, 20, 30, 40, 50] (F=1, R=0) ← Wraps around!" },
  ];

  const implementation = [
    { points : "Pointer Movement:", 
      subpoints : [
        "front = (front + 1) % capacity",
        "rear = (rear + 1) % capacity",
      ],
    },
    { points : "Full/Empty Conditions:", 
      subpoints : [
        "Full: (rear + 1) % capacity == front",
        "Empty: front == rear",
      ],
    },
    { points : "Always one empty slot:", 
      subpoints : [
        "Needed to distinguish between full and empty states",
      ],
    },
  ];

  const complexity = [
    { points : "enqueue(): O(1)" },
    { points : "dequeue(): O(1)" },
    { points : "peekFront(): O(1)" },
    { points : "peekRear(): O(1)" },
    { points : "isEmpty(): O(1)" },
    { points : "isFull(): O(1)" },
  ];

  const application = [
    { points : "CPU Scheduling: Round-robin scheduling algorithms" },
    { points : "Memory Management: Circular buffers in memory systems" },
    { points : "Traffic Systems: Controlling the flow of traffic signals" },
    { points : "Data Streams: Handling continuous data streams (audio/video buffers)" },
    { points : "Producer-Consumer Problems: Where producers and consumers operate at different rates" },
  ];

  const advantages = [
    { points : "Better memory utilization: Reuses empty spaces" },
    { points : "Efficient operations: No need to shift elements" },
    { points : "Fixed memory footprint: Predictable memory usage" },
    { points : "Real-time systems friendly: Bounded execution time" },
  ];

    return (
      <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is a Circular Queue? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is a Circular Queue?
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
          Circular queues have these fundamental properties:
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

    {/* Visual Example (Size=5) */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Visual Example (Size=5)
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Operation sequence on an empty circular queue:
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

    {/* Implementation Details */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Implementation Details
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Key implementation aspects:
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
          Circular queues are used in:
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

    {/* Advantages Over Linear Queue */}
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Advantages Over Linear Queue
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {advantages.map((item, index) => (
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