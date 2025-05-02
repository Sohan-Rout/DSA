const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Insertion Sort
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time.
              It works similarly to how you might sort playing cards in your hands - you take each new card and
              insert it into its proper position among the already sorted cards.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Consider this unsorted array: 
              <span className="dark:text-amber-500 text-purple-600">[7, 3, 5, 2, 1]</span>
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">First Element (7):</span> Already "sorted" as the first item
                  <br />→ [<span className="dark:text-green-400 text-green-600">7</span>, 3, 5, 2, 1]
                </li>
                <li>
                  <span className="font-semibold">Second Element (3):</span> Insert before 7
                  <br />→ [<span className="dark:text-green-400 text-green-600">3, 7</span>, 5, 2, 1]
                </li>
                <li>
                  <span className="font-semibold">Third Element (5):</span> Insert between 3 and 7
                  <br />→ [<span className="dark:text-green-400 text-green-600">3, 5, 7</span>, 2, 1]
                </li>
                <li>
                  <span className="font-semibold">Fourth Element (2):</span> Insert at beginning
                  <br />→ [<span className="dark:text-green-400 text-green-600">2, 3, 5, 7</span>, 1]
                </li>
                <li>
                  <span className="font-semibold">Fifth Element (1):</span> Insert at beginning
                  <br />→ [<span className="dark:text-green-400 text-green-600">1, 2, 3, 5, 7</span>]
                </li>
              </ol>
              <br />
              The algorithm maintains a "sorted sublist" that grows with each iteration.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                <li>Start with the second element (consider first element as sorted)</li>
                <li>Pick the next element (key) from the unsorted portion</li>
                <li>
                  Compare the key with elements in the sorted portion:
                  <ul>
                    <li>Shift elements greater than the key one position right</li>
                    <li>Stop when you find an element ≤ the key</li>
                  </ul>
                </li>
                <li>Insert the key in its correct position</li>
                <li>Repeat until all elements are processed</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Time Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-disc ml-8 pl-2">
                <li>
                  <span className="dark:text-amber-500 text-purple-600">Best Case</span>: Already sorted array → 
                  <span className="dark:text-amber-500 text-purple-600"> O(n)</span> (only comparisons, no shifts).
                </li>
                <li>
                  <span className="dark:text-amber-500 text-purple-600">Average Case</span>: Randomly ordered array → 
                  <span className="dark:text-amber-500 text-purple-600"> O(n²)</span>.
                </li>
                <li>
                  <span className="dark:text-amber-500 text-purple-600">Worst Case</span>: Reverse sorted array → 
                  <span className="dark:text-amber-500 text-purple-600"> O(n²)</span> (maximum comparisons and shifts).
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Space Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Like Bubble Sort, Insertion Sort is <span className="dark:text-amber-500 text-purple-600">in-place</span> and requires only 
              <span className="dark:text-amber-500 text-purple-600"> O(1)</span> additional space.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Advantages
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                <li>Efficient for small datasets (often faster than more complex algorithms for n ≤ 10)</li>
                <li>Stable (doesn't change relative order of equal elements)</li>
                <li>Adaptive (performs well with partially sorted data)</li>
                <li>Online (can sort as it receives input)</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Insertion Sort is often used when the data is nearly sorted (where it approaches O(n) time)
              or when the dataset is small. Some hybrid algorithms like TimSort use Insertion Sort
              for small subarrays due to its low overhead.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;