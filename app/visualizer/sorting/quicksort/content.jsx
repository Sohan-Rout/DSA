import { time } from "framer-motion";

const content = () => {
  const paragraphs = [
    `Quick Sort is an efficient, comparison-based sorting algorithm that follows the divide-and-conquer approach. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then recursively sorted.`,
    `The log n factor comes from the division steps when partitions are balanced. The n² occurs when the pivot selection consistently creates unbalanced partitions.`,
    `Quick Sort is O(log n) space complexity for the call stack in the average case, but can degrade to O(n) in the worst case with unbalanced partitions. It is generally considered an in-place algorithm as it doesn't require significant additional space.`,
  ];

  const working =[
    { steps : "Partitioning Phase:",
      points : [
        "Choose last element as pivot (70)",
        "Rearrange: elements < pivot on left, > pivot on right → [10, 30, 40, 50] [70] [80, 90]",
      ],
     },
    { steps : "Recursive Phase:", 
      points : [
        "Apply same process to left sub-array [10, 30, 40, 50]",
        "Apply same process to right sub-array [80, 90]",
        "Combine results: [10, 30, 40, 50, 70, 80, 90]",
      ],
    }
  ];

  const algorithm = [
    { steps : "Choose Pivot:",
      points : [
        "Select an element as pivot (commonly last/first/random element)",
      ],
     },
    { steps : "Partition:",
      points : [
        "Reorder array so elements < pivot come before it",
        "Elements > pivot come after it",
        "Pivot is now in its final sorted position",
      ],
     },
    { steps : "Recurse:",
      points : [
        "Apply quick sort to left sub-array (elements < pivot)",
        "Apply quick sort to right sub-array (elements > pivot)",
      ],
     },
  ];

  const timeComplexity = [
    { points : "Best Case: O(n log n) (balanced partitions)" },
    { points : "Average Case: O(n log n)" },
    { points : "Worst Case: O(n²) (unbalanced partitions)" },
  ];

  const strategies = [
    { strategy : "Last element" },
    { strategy : "First element" },
    { strategy : "Random element" },
    { strategy : "Median-of-three" },
    { strategy : "Middle element" },
  ];

  const strategiesDetails = [
    { details : "Simple but can lead to worst-case on sorted arrays" },
    { details : "Similar issues as last element" },
    { details : "Reduces chance of worst-case scenarios" },
    { details : "Takes median of first, middle, last elements" },
    { details : "Often provides good balance" },
  ]

  const CombinedDeatils = strategies.map((item, index) => ({
    strategy : item.strategy,
    details : strategiesDetails[index].details,
  }))

  { /* Advantages */}
  const advantages = [
    { points : "Fastest general-purpose in-memory sorting algorithm in practice" },
    { points : "In-place algorithm (requires minimal additional memory)" },
    { points : "Cache-efficient due to sequential memory access" },
    { points : "Can be easily parallelized for better performance" },
  ]

  { /* Disadvantages */}
  const disadvantages = [
    { points : "Not stable (relative order of equal elements may change)" },
    { points : "Worst-case O(n²) performance (though rare with proper pivot selection)" },
    { points : "Performance depends heavily on pivot selection strategy" },
    { points : "Not ideal for linked lists (works best with arrays)" },
  ]

    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Quick Sort
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">{paragraphs[0]}</p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Consider this unsorted array: [10, 80, 30, 90, 40, 50, 70] :
              <div className="pb-2"></div>
              <ul className="font-semibold">
                {working.map((item, index) => (
                  <li key={index}>{item.steps}{item.points && <ul className="font-normal ml-8 pl-3 list-decimal">
                    {item.points.map((subitem, subindex) => (
                      <li key={subindex}>{subitem}</li>
                    ))}</ul>}</li>
                ))}
              </ul>
              <div className="mt-4 bg-gray-100 dark:bg-gray-900 p-0 pb-2 rounded">
                <pre className="text-sm font-mono">{`
  Original: 
  [10, 80, 30, 90, 40, 50, 70]
  
  First Partition (pivot=70):
  [10, 30, 40, 50][70][80, 90]
  
  Left Partition (pivot=50):
  [10, 30, 40][50]
  → already sorted
  
  Right Partition (pivot=90):
  [80][90]
  → already sorted
  
  Final:    
  [10, 30, 40, 50, 70, 80, 90]`}
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
                  <li key={index}>{item.steps}{item.points && <ul className="list-disc ml-6">
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
              <p className="mt-2 ml-4">{paragraphs[1]}</p>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Space Complexity
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">{paragraphs[2]}</p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Advantages
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                {advantages.map((item, index)=> (
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
                {disadvantages.map((item, index) => (
                  <li key={index}>{item.points}</li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Pivot Selection Strategies
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                {CombinedDeatils.map((item, index) => (
                  <li key={index}><strong>{item.strategy} :</strong> {item.details}</li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Quick Sort is the algorithm of choice for most standard library sorting implementations
              (like C's qsort, Java's Arrays.sort for primitives) due to its excellent average-case performance.
              It's particularly effective for large datasets that fit in memory.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;