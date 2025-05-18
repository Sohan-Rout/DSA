const content = () => {
  const paragraphs = [
    `The isEmpty operation checks whether a stack contains any elements or not. It's a fundamental operation that helps prevent errors when trying to perform operations like pop() or peek() on an empty stack.`,
    `The isEmpty operation is a simple but crucial part of stack implementation, ensuring safe stack manipulation and preventing runtime errors.`,
  ];

  const usage = [
    { points : "Prevent stack underflow errors before pop() operations." },
    { points : "Check if there are elements to process." },
    { points : "Validate stack state in algorithms." },
    { points : "Terminate processing loops when stack becomes empty." },
  ];

  const working = [
    { points : "For an empty stack [ ],isEmpty() returns true." },
    { points : "For a non-empty stack [5, 3, 8],isEmpty() returns false." },
  ];

  const implementation = [
    { points : "Check the current size/length of the stack" },
    { points : "Return the result :",
      subpoints : [
        "true if size equals 0.",
        "false otherwise.",
      ],
     },
  ];

  const complexity = [
    { points : "O(1) constant time complexity." },
    { points : "The operation only needs to check one value (size/length) regardless of stack size." },
  ];

    return (
      <main className="max-w-4xl mx-auto">
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          {/* What is the isEmpty Operation in Stack? */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              What is the isEmpty Operation in Stack?
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
                Consider a stack represented as an array: [ ] (empty) or [5, 3,
                8] (with elements).
              </p>

              <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {working.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700 dark:text-gray-300 pl-2"
                  >
                    {item.points}
                  </li>
                ))}
              </ol>

              <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                The operation simply checks if the stack's size/length is zero.
              </p>
            </div>
          </section>

          {/* Algorithm Implementation */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              Algorithm Implementation
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {implementation.map((item, index) => (
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

          {/* Time Complexity */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              Time Complexity
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
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

          {/* Practical Usage */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
              Practical Usage
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {usage.map((item, index) => (
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