import { time } from "framer-motion";

const content = () => {
  const paragraph = [
    `Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It works similarly to how you might sort playing cards in your hands - you take each new card and insert it into its proper position among the already sorted cards.`,
    `The algorithm maintains a "sorted sublist" that grows with each iteration.`,
    `Like Bubble Sort, Insertion Sort is in-place and requires only O(1) additional space.`,
    `Insertion Sort is often used when the data is nearly sorted (where it approaches O(n) time) or when the dataset is small. Some hybrid algorithms like TimSort use Insertion Sort for small subarrays due to its low overhead.`,
  ];

  const working = [
    { points : "First Element (7):", 
      subpoints : [
        "Already \"sorted\" as the first item",
        "→ [7, 3, 5, 2, 1]",
      ],
    },
    { points : "Second Element (3):", 
      subpoints : [
        "Insert before 7",
        "→ [3, 7, 5, 2, 1]",
      ],
    },
    { points : "Third Element (5):", 
      subpoints : [
        "Insert between 3 and 7",
        "→ [3, 5, 7, 2, 1]",
      ],
    },
    { points : "Fourth Element (2):", 
      subpoints : [
        "Insert at beginning",
        "→ [2, 3, 5, 7, 1]",
      ],
    },
    { points : "Fifth Element (1):", 
      subpoints : [
        "Insert at beginning",
        "→ [1, 2, 3, 5, 7]",
      ],
    },
  ];

  const algorithm = [
    { steps : "Start with the second element (consider first element as sorted)" },
    { steps : "Pick the next element (key) from the unsorted portion" },
    { steps : "Compare the key with elements in the sorted portion:",
      points : [
        "Shift elements greater than the key one position right",
        "Stop when you find an element ≤ the key",
      ],
     },
    { steps : "Insert the key in its correct position" },
    { steps : "Repeat until all elements are processed" },
  ];

  const timeComplexity = [
    { points : "Best Case: Already sorted array → O(n) (only comparisons, no shifts)." },
    { points : "Average Case: Randomly ordered array → O(n²)." },
    { points : "Worst Case: Reverse sorted array → O(n²) (maximum comparisons and shifts)." },
  ];

  const advantages = [
    { points : "Efficient for small datasets (often faster than more complex algorithms for n ≤ 10)" },
    { points : "Stable (doesn't change relative order of equal elements)" },
    { points : "Adaptive (performs well with partially sorted data)" },
    { points : "Online (can sort as it receives input)" },
  ];

    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Insertion Sort
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">{paragraph[0]}</p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Consider this unsorted array: [7, 3, 5, 2, 1]
              <br />
              <ol className="list-decimal ml-8 pl-3">
                {working.map((items, index) => (
                  <li key={index} className="font-semibold">{items.points}{items.subpoints && <ul className="font-normal">
                    {items.subpoints.map((subitems, subindex) => (
                      <li key={subindex}>{subitems}</li>
                    ))}</ul>}</li>
                ))}
              </ol>
              <p>{paragraph[1]}</p>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                {algorithm.map((item, index) => (
                  <li key={index}>{item.steps}{item.points && <ul>
                    {item.points.map((subitem, subindex) => (
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
                {advantages.map((item, index) => (
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