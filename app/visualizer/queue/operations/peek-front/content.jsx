const content = () => {
  const paragraph = [
    `The peek front operation (also called front) retrieves the element at the front of the queue without removing it. This operation allows you to examine the next element to be processed while maintaining the queue's integrity.`,
    `The peek front operation is essential for non-destructive queue inspection, enabling more flexible queue processing patterns while maintaining FIFO order. It's particularly valuable in scenarios where decision-making depends on the next item's properties without committing to its removal.`,
  ];

  const example = [
    { points : "Current Queue: [A, B, C, D]" },
    { points : "peekFront(): Returns 'A'" },
    { points : "Queue After Peek: [A, B, C, D] (unchanged)" },
  ];

  const implementation = [
    { points : "Array-based Queue:",
      subpoints : [
        "Return array[front]",
        "Check for empty queue first",
      ],
    },
    { points : "Linked List Queue:",
      subpoints : [
        "Return head.data",
      ],
    },
    { points : "Circular Buffer:",
      subpoints : [
        "Return buffer[front]",
        "Handle wrap-around cases",
      ],
    },
  ];

  const steps = [
    { points : "Check if queue is empty (use isEmpty())" },
    { points : "If empty, return error/exception (or null)" },
    { points : "Access the data at front position" },
    { points : "Return the data without modifying pointers" },
  ];

  const complexity = [
    { points : "Direct access to front element" },
    { points : "No iteration needed" },
    { points : "No structural changes to queue" },
  ];

  const application = [
    { points : "Previewing next item before processing" },
    { points : "Priority checking in priority queues" },
    { points : "Conditional processing logic" },
    { points : "Debugging queue contents" },
  ];

  const errorHandling = [
    { points : "Always check isEmpty() before peeking" },
    { points : "Options for empty queue:", 
      subpoints : [
        "Throw exception (e.g., EmptyQueueException)",
        "Return null/undefined",
        "Return special sentinel value",
      ],
    },
    { points : "Document behavior in your API" },
  ];

    return (
      <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is Peek Front Operation? */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is Peek Front Operation?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[0]}
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
          Peek returns the front element while keeping the queue unchanged.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Example with queue: [A, B, C, D]
        </p>
        
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {example.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ol>
        
        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          Contrast with dequeue() which would remove 'A' from the queue.
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
          Different implementations handle peek similarly:
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

    {/* Algorithm Steps */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithm Steps
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Basic peek operation algorithm:
        </p>
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
          Peek operation always runs in O(1) constant time because:
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

    {/* Practical Applications */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Practical Applications
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Common use cases for peek:
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

    {/* Error Handling */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Error Handling
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Important considerations:
        </p>
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {errorHandling.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
              {item.subpoints && (
                <ol className="mt-2 space-y-2 list-decimal pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                  {item.subpoints.map((subitem, subindex) => (
                    <li key={subindex} className="text-gray-600 dark:text-gray-400">
                      {subitem}
                    </li>
                  ))}
                </ol>
              )}
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