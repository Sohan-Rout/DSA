const content = () => {
  const paragraphs = [
    `Returns the topmost element from the stack without removing it.`,
    `The peek operation is useful when you need to inspect the top element before deciding whether to pop it or push another element onto the stack.`,
  ];

  const example = [
    { points : "Current stack: [7, 3, 5]" },
    { points : "Peek → returns 7: [7, 3, 5] (stack remains unchanged)" },
    { points : "After pop: [3, 5]" },
    { points : "Peek → returns 3: [3, 5]" },
  ];

  const complexity = [
    { points : "Time Complexity: O(1)" },
    { points : "Space Complexity: O(1)" },
  ];

  return (
    <main className="max-w-4xl mx-auto">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Peek Operation */}
        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Peek Operation
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraphs[0]}
            </p>

            <p className="text-gray-700 dark:text-gray-300 font-medium mt-4 mb-2">
              Example: Peeking at a stack
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

            <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
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

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {paragraphs[1]}
            </p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default content;
