const content = () => {
  const paragraph = [
    `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. It gets its name because smaller elements "bubble" to the top of the list.`,
    `Bubble Sort is an in-place sorting algorithm, meaning it requires only O(1) additional space (for temporary storage during swaps).`,
    `Bubble Sort is simple to understand and implement but inefficient for large datasets. It's mainly used for educational purposes to introduce sorting algorithms. In practice, more efficient algorithms like QuickSort or MergeSort are preferred.`,
  ];

  const working = [
    { passes : "First Pass:",
      points : [
        "(5, 1) → Swap → [1, 5, 4, 2, 8]",
        "(5, 4) → Swap → [1, 4, 5, 2, 8]",
        "(5, 2) → Swap → [1, 4, 2, 5, 8]",
        "(5, 8) → No swap",
      ],
    },
    { passes : "Second Pass:",
      points : [
        "(1, 4) → No swap",
        "(4, 2) → Swap → [1, 2, 4, 5, 8]",
        "(4, 5) → No swap",
      ],
    },
    { passes : "Third Pass:", 
      points : [
        "No swaps needed → List is sorted",
      ],
    }
  ];

  const algorithm = [
    { points : "Start with an unsorted array"},
    { points : "Set a flag to track if any swaps occur"},
    { points : "For each pair of adjacent elements:",
      subpoints : [
        "Compare the two elements",
        "If they are in the wrong order, swap them",
        "Set the swap flag to true"
      ]},
    { points : "Repeat the process until a complete pass is made without any swaps"},
    { points : "The array is now sorted"},
  ];

  const complexity = [
    { points : "Best Case: Array is already sorted → O(n) (only one pass needed)." },
    { points : "Average Case: Randomly ordered array → O(n²)." },
    { points : "Worst Case: Array is sorted in reverse order → O(n²)." },
  ];

    return (
      <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is Bubble Sort */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is Bubble Sort?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[0]}
        </p>
      </div>
    </section>

    {/* How Does It Work */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        How Does It Work?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Imagine you have an unsorted list of numbers: [5, 1, 4, 2, 8]
        </p>
        
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {working.map((items, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {items.passes}
              {items.points && (
                <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                  {items.points.map((subitems, subindex) => (
                    <li key={subindex} className="text-gray-600 dark:text-gray-400">
                      {subitems}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        
        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          The algorithm stops when a complete pass is made without any swaps.
        </p>
      </div>
    </section>

    {/* Algorithm Steps */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithm Steps
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {algorithm.map((items, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {items.points}
              {items.subpoints && (
                <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                  {items.subpoints.map((subitems, subindex) => (
                    <li key={subindex} className="text-gray-600 dark:text-gray-400">
                      {subitems}
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