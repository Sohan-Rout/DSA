const content = () => {
  const paragraph = [
    `Merge Sort is an efficient, stable, comparison-based sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the unsorted list into sublists until each sublist contains a single element, then repeatedly merges these sublists to produce new sorted sublists until there is only one sorted list remaining.`,
    `The log n factor comes from the division steps, while the n factor comes from the merge steps.`,
    `Merge Sort requires O(n) additional space for the temporary arrays during merging. This makes it not an in-place sorting algorithm, unlike Insertion Sort or Bubble Sort.`,
    `Merge Sort is particularly useful when sorting linked lists (where random access is expensive) and is the algorithm of choice for many standard library sorting implementations when stability is required. It's also commonly used in external sorting where data doesn't fit in memory.`,
  ];

  const divide = [
    { points : "Split the array into two halves: [38, 27, 43] and [3, 9, 82, 10]" },
    { points : "Recursively split each half until single elements remain" },
  ];

  const merge = [
    { points : "Merge single elements into sorted pairs: [27, 38], [3, 43], [9, 82], [10]" },
    { points : "Merge pairs: [3, 27, 38, 43] and [9, 10, 82]" },
    { points : "Final merge: [3, 9, 10, 27, 38, 43, 82]" },
  ];

  const algorithm = [
    { points : "Divide:",
      subpoints : [
        "Find the middle point to divide the array into two halves",
        "Recursively call merge sort on the first half",
        "Recursively call merge sort on the second half",
      ],
    },
    { points : "Merge:",
      subpoints : [
        "Create temporary arrays for both halves",
        "Compare elements from each half and merge them in order",
        "Copy any remaining elements from either half",
      ],
     },
  ];

  const timeComplexity = [
    { points : "Best Case: O(n log n) (already sorted, but still needs all comparisons)" },
    { points : "Average Case: O(n log n)" },
    { points : "Worst Case: O(n log n) (consistent performance)" },
  ];

  const advantages = [
    { points : "Stable sorting (maintains relative order of equal elements)" },
    { points : "Excellent for large datasets (consistent O(n log n) performance)" },
    { points : "Well-suited for external sorting (sorting data too large for RAM)" },
    { points : "Easily parallelizable (divide steps can be done concurrently)" },
  ];

  const disadvantages = [
    { points : "Requires O(n) additional space (not in-place)" },
    { points : "Slower than O(n²) algorithms for very small datasets due to recursion overhead" },
    { points : "Not as cache-efficient as some other algorithms (e.g., QuickSort)" },
  ];

    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Merge Sort
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">{paragraph[0]}</p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Consider this unsorted array: [38, 27, 43, 3, 9, 82, 10]
              <br /><br />
              
              <span className="font-semibold">Divide Phase:</span>
              <ol className="list-decimal ml-8 pl-3">
                {divide.map((item, index) => (
                  <li key={index}>{item.points}</li>
                ))}
              </ol>
              
              <span className="font-semibold">Merge Phase:</span>
              <ol className="list-decimal ml-8 pl-3">
                {merge.map((item, index) => (
                  <li key={index}>{item.points}</li>
                ))}
              </ol>
              
              <div className="mt-4 bg-gray-100 dark:bg-gray-900 p-0 pb-2 rounded">
                <pre className="text-sm font-mono">{`
  Original: 
  [38, 27, 43, 3, 9, 82, 10]
  Divide:   
  [38,27,43][3,9,82,10]
  Divide:   
  [38][27,43] | [3,9][82,10]
  Divide:   
  [38][27][43] | [3][9][82][10]
  Merge:    
  [27,38][43] | [3,9][10,82]
  Merge:    
  [27,38,43] | [3,9,10,82]
  Final:    
  [3,9,10,27,38,43,82]`}
                </pre>
              </div>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                {algorithm.map((item, index) => (
                  <li key={index} className="font-semibold">{item.points}{item.subpoints && <ul className="list-disc ml-6 font-normal">
                    {item.subpoints.map((subitem, subindex) => (
                      <li key={subindex}>{subitem}</li>
                    ))}</ul>}</li>
                ))}
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Time Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-disc ml-8 pl-2">
                {timeComplexity.map((item, index) => (
                  <li key={index}>{item.points}</li>
                ))}
              </ol>
              <p className="mt-2 ml-4">{paragraph[1]}</p>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Space Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">{paragraph[2]}</div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Advantages
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                {advantages.map((items, index) => (
                  <li key={index}>{items.points}</li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Disadvantages
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                {disadvantages.map((items, index) => (
                  <li key={index}>{items.points}</li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">{paragraph[3]}</p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;