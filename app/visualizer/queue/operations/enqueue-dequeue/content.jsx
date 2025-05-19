const content = () => {
  const paragraph = [
    `A Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue). It operates much like a real-world queue (line) where the first person to arrive is the first to be served.`,
    `The space complexity is O(n) where n is the number of elements in the queue, as it needs to store all elements.`,
    `Queues are fundamental in computer science and are used in various applications like CPU scheduling, disk scheduling, handling interrupts, breadth-first search, and any scenario where you need to maintain order of processing.`,
  ];

  const enqueue = [
    { points : "Check if the queue is full (in case of fixed-size implementation)" },
    { points : "If full, return overflow error (or resize in dynamic implementation)" },
    { points : "Increment the rear pointer" },
    { points : "Add the new element at the rear position" },
  ];

  const opeartionEnqueue = [
    { points : "Before Enqueue: [10, 20, 30]" },
    { points : "Enqueue(40): Add 40 to the rear" },
    { points : "Enqueue(40): Add 40 to the rear" },
  ];

  const dequeue = [
    { points : "Check if the queue is empty" },
    { points : "If empty, return underflow error" },
    { points : "Access the data at the front of the queue" },
    { points : "Increment the front pointer to the next element" },
    { points : "Return the accessed data" },
  ];

  const operationDequeue = [
    { points : "Before Dequeue: [10, 20, 30, 40]" },
    { points : "Dequeue(): Remove and return 10" },
    { points : "After Dequeue: [20, 30, 40]" },
  ];

  const complexity = [
    { points : "Enqueue Operation: O(1) - Constant time to add to the end" },
    { points : "Dequeue Operation: O(1) - Constant time to remove from the front" },
    { points : "Peek Operation: O(1) - Constant time to examine the front element" },
  ];

    return (
      <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is a Queue? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is a Queue?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[0]}
        </p>
      </div>
    </section>

    {/* Enqueue Operation */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Enqueue Operation
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Enqueue adds an element to the end (rear) of the queue. Example with queue: [10, 20, 30]
        </p>
        
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {opeartionEnqueue.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ol>
        
        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          The new element always goes to the end of the queue.
        </p>
      </div>
    </section>

    {/* Dequeue Operation */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Dequeue Operation
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Dequeue removes and returns the element from the front (head) of the queue.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Example with queue: <span className="font-mono dark:text-amber-500 text-purple-600">[10, 20, 30, 40]</span>
        </p>
        
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {operationDequeue.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ol>
        
        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          The oldest element (first one added) is always removed first.
        </p>
      </div>
    </section>

    {/* Algorithm Steps for Enqueue */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithm Steps for Enqueue
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {enqueue.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Algorithm Steps for Dequeue */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithm Steps for Dequeue
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {dequeue.map((item, index) => (
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

    {/* Space Complexity */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Space Complexity
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[1]}
        </p>
      </div>
    </section>

    {/* Additional Info */}
    <section className="p-6">
      <div className="prose dark:prose-invert max-w-none">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {paragraph[2]}
          </p>
        </div>
      </div>
    </section>
  </article>
</main>
    );
  };
  
  export default content;