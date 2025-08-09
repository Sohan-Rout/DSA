"use client";
import ComplexityGraph from "@/app/components/ui/graph";

const content = () => {
  const paragraph = [
    `Merge Sort is an efficient, stable, comparison-based sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the unsorted list into sublists until each sublist contains a single element, then repeatedly merges these sublists to produce new sorted sublists until there is only one sorted list remaining.`,
    `The log n factor comes from the division steps, while the n factor comes from the merge steps.`,
    `Merge Sort requires O(n) additional space for the temporary arrays during merging. This makes it not an in-place sorting algorithm, unlike Insertion Sort or Bubble Sort.`,
    `Merge Sort is particularly useful when sorting linked lists (where random access is expensive) and is the algorithm of choice for many standard library sorting implementations when stability is required. It's also commonly used in external sorting where data doesn't fit in memory.`,
  ];

  const algorithm = [
    {
      points: "Divide:",
      subpoints: [
        "Find the middle point to divide the array into two halves",
        "Recursively call merge sort on the first half",
        "Recursively call merge sort on the second half",
      ],
    },
    {
      points: "Merge:",
      subpoints: [
        "Create temporary arrays for both halves",
        "Compare elements from each half and merge them in order",
        "Copy any remaining elements from either half",
      ],
    },
  ];

  const timeComplexity = [
    {
      points:
        "Best Case: O(n log n) (already sorted, but still needs all comparisons)",
    },
    { points: "Average Case: O(n log n)" },
    { points: "Worst Case: O(n log n) (consistent performance)" },
  ];

  const advantages = [
    { points: "Stable sorting (maintains relative order of equal elements)" },
    {
      points:
        "Excellent for large datasets (consistent O(n log n) performance)",
    },
    {
      points:
        "Well-suited for external sorting (sorting data too large for RAM)",
    },
    { points: "Easily parallelizable (divide steps can be done concurrently)" },
  ];

  const disadvantages = [
    { points: "Requires O(n) additional space (not in-place)" },
    {
      points:
        "Slower than O(n²) algorithms for very small datasets due to recursion overhead",
    },
    {
      points:
        "Not as cache-efficient as some other algorithms (e.g., QuickSort)",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 md:gap-4">
      <div className="col-span-1">
        <div className="hidden md:block">
          <iframe
            src="https://hw.glich.co/resources/embed/daily/dsa"
            width="100%"
            height="400"
            title="Daily DSA Challenge"
          ></iframe>
        </div>
        <div className="flex justify-center">
          <span className="text-xs hidden md:block">
            Powered by{" "}
            <a
              href="https://hw.glich.co/resources/daily"
              target="_blank"
              className="underline hover:text-blue-500 duration-300"
            >
              Hello World
            </a>
          </span>
        </div>
      </div>
      <article className="col-span-4 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Merge Sort */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Merge Sort?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[0]}
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
              {algorithm.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-semibold">{item.points}</span>
                  {item.subpoints && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500 font-normal">
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
              {timeComplexity.map((item, index) => (
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
              {paragraph[1]}
            </p>
            <div className="mt-8">
              <ComplexityGraph
                bestCase={(n) => n * Math.log2(n)}
                averageCase={(n) => n * Math.log2(n)}
                worstCase={(n) => n * Math.log2(n)}
                maxN={25}
              />
            </div>
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
              {paragraph[2]}
            </p>
          </div>
        </section>

        {/* Advantages */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Advantages
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {advantages.map((items, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {items.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Disadvantages */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Disadvantages
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {disadvantages.map((items, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {items.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Additional Info */}
        <section className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <div className="px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph[3]}
              </p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default content;
