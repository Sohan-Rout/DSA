const content = () => {
  const firstpass = [
    { points : "(5, 1) → Swap → [1, 5, 4, 2, 8]" },
    { points : "(5, 4) → Swap → [1, 4, 5, 2, 8]" },
    { points : "(5, 2) → Swap → [1, 4, 2, 5, 8]" },
    { points : "(5, 8) → No swap" },
  ];

  const secondpass = [
    { points : "(1, 4) → No swap" },
    { points : "(4, 2) → Swap → [1, 2, 4, 5, 8]" },
    { points : "(4, 5) → No swap" },
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
            <p className="ml-4 dark:text-gray-300 text-black">
              Bubble Sort is a simple sorting algorithm that repeatedly steps
              through the list, compares adjacent elements and swaps them if
              they are in the wrong order. The pass through the list is repeated
              until the list is sorted. It gets its name because smaller
              elements "bubble" to the top of the list.
            </p>
          </div>

          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Imagine you have an unsorted list of numbers:
              <span className="dark:text-amber-500 text-purple-600">
                [5, 1, 4, 2, 8]
              </span>
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">First Pass:</span>
                  <ul className="list-disc ml-6">
                    {firstpass.map((items, index) => (
                      <li key={index}>{items.points}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Second Pass:</span>
                  <ul className="list-disc ml-6">
                    {secondpass.map((items, index) => (
                      <li key={index}>{items.points}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Third Pass:</span> No swaps
                  needed → List is sorted
                </li>
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
            <div className="ml-4 dark:text-gray-300 text-black">
              Bubble Sort is an{" "}in-place{" "}
              sorting algorithm, meaning it requires only{" "}O(1){" "}
              additional space (for temporary storage during swaps).
            </div>
          </div>

          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Bubble Sort is simple to understand and implement but inefficient
              for large datasets. It's mainly used for educational purposes to
              introduce sorting algorithms. In practice, more efficient
              algorithms like QuickSort or MergeSort are preferred.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;