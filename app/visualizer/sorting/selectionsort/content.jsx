const content = () => {
  const paragraph = [
    `Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist which is built up from left to right, and a remaining unsorted sublist. It repeatedly selects the smallest (or largest) element from the unsorted portion and moves it to the sorted portion.`,
    `The quadratic time complexity occurs because it performs O(n) comparisons for each of the O(n) elements.`,
    `Selection Sort is an in-place algorithm, requiring only O(1) additional space for temporary variables during swaps.`,
    `Selection Sort is primarily used for educational purposes to introduce sorting concepts. In practice, it's outperformed by more advanced algorithms like QuickSort and MergeSort, but can be useful when memory writes are expensive (since it makes only O(n) swaps).`,
  ];

  const working = [
    {
      pass: "First Pass:",
      points: [
        "Find the minimum in [64, 25, 12, 22, 11] → 11 at index 4",
        "Swap with first element → [11, 25, 12, 22, 64]",
      ],
    },
    {
      pass: "Second Pass:",
      points: [
        "Find minimum in [25, 12, 22, 64] → 12 at index 2",
        "Swap with first element → [11, 12, 25, 22, 64]",
      ],
    },
    {
      pass: "Third Pass:",
      points: [
        "Find minimum in [25, 22, 64] → 22 at index 2",
        "Swap with first element → [11, 12, 22, 25, 64]",
      ],
    },
    {
      pass: "Fourth Pass:",
      points: [
        "Find minimum in [25, 64] → 25 at index 0",
        "No swap needed → [11, 12, 22, 25, 64]",
      ],
    },
    { pass: "Result:", points: ["[11, 12, 22, 25, 64]"] },
  ];

  const algorithm = [
    { points: "Set the first element as minimum" },
    {
      points: "Compare minimum with the second element:",
      subpoints: ["If second element is smaller, set it as new minimum"],
    },
    { points: "Continue until last element is reached" },
    { points: "Swap minimum with first element" },
    { points: "Repeat for remaining unsorted portion" },
  ];

  const timeComplexity = [
    { points: "Best Case: ", subpoints: ["O(n²)"] },
    { points: "Average Case: ", subpoints: ["O(n²)"] },
    { points: "Worst Case: ", subpoints: ["O(n²)"] },
  ];

  const Advantages = [
    { points: "Simple to understand and implement" },
    { points: "Performs well on small lists" },
    { points: "Minimal memory usage (in-place sorting)" },
    { points: "Only O(n) swaps required (better than Bubble Sort)" },
  ];

  const Disadvantages = [
    { points: "Poor performance on large lists (quadratic time complexity)" },
    { points: "Not stable (may change relative order of equal elements)" },
    { points: "Less efficient than Insertion Sort for nearly sorted data" },
    { points: "Always performs O(n²) comparisons regardless of input" },
  ];

  return (
    <main>
      <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            What is Selection Sort
          </h1>
          <p className="ml-4 dark:text-gray-300 text-black">{paragraph[0]}</p>
        </div>

        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            How Does It Work
          </h1>
          <div className="ml-4 dark:text-gray-300 text-black">
            Consider this unsorted array: [64, 25, 12, 22, 11]
            <br />
            <ol className="list-decimal ml-8 pl-3">
              {working.map((items, index) => (
                <li className="font-semibold" key={index}>
                  {items.pass}
                  {items.points && (
                    <ul className="list-disc ml-6 font-normal">
                      {items.points.map((subitems, subindex) => (
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
              {timeComplexity.map((items, index) => (
                <li key={index}>
                  {items.points}
                  <span
                    className="dark:text-amber-500 text-purple-600"
                    key={index}
                  >
                    {items.subpoints}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-2 ml-4">{paragraph[1]}</p>
          </div>
        </div>

        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            Space Complexity
          </h1>
          <div className="ml-4 dark:text-gray-300 text-black">
            <p>{paragraph[2]}</p>
          </div>
        </div>

        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            Advantages
          </h1>
          <div className="ml-4 dark:text-gray-300 text-black">
            <ul className="list-disc ml-8 pl-2">
              {Advantages.map((item, index) => (
                <li key={index}>{item.points}</li>
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
              {Disadvantages.map((item, index) => (
                <li key={index}>{item.points}</li>
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