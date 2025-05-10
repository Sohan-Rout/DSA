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
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Bubble Sort
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">{paragraph[0]}</p>
          </div>

          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Imagine you have an unsorted list of numbers: [5, 1, 4, 2, 8]
              <br />
              <ol className="list-decimal ml-8 pl-3">
                {working.map((items, index) => (
                  <li key={index}>{items.passes}{items.points && <ul className="list-disc ml-6">
                    {items.points.map((subitems, subindex) => (
                      <li key={subindex}>{subitems}</li>
                    ))}</ul>}</li>
                ))}
              </ol>
              <br />
              The algorithm stops when a complete pass is made without any
              swaps.
            </div>
          </div>

          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                {algorithm.map((items, index) => (
                  <li key={index}>
                    {items.points}
                    {items.subpoints && (
                      <ul className="list-disc ml-6">
                        {items.subpoints.map((subitems, subindex) => (
                          <li key={subindex}>{subitems}</li>
                        ))}
                      </ul>
                    )}
                  </li>
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
                {complexity.map((item, index) => (
                  <li key={index}>{item.points}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Space Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">{paragraph[1]}</div>
          </div>

          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">{paragraph[2]}</p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;