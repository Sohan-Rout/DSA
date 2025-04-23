const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Bubble Sort
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
              compares adjacent elements and swaps them if they are in the wrong order.
              The pass through the list is repeated until the list is sorted.
              It gets its name because smaller elements "bubble" to the top of the list.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Imagine you have an unsorted list of numbers: 
              <span className="dark:text-amber-500 text-red-600">[5, 1, 4, 2, 8]</span>
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">First Pass:</span>
                  <ul className="list-disc ml-6">
                    <li>(<span className="dark:text-amber-500 text-red-600">5</span>, <span className="dark:text-amber-500 text-red-600">1</span>) → Swap → [1, 5, 4, 2, 8]</li>
                    <li>(<span className="dark:text-amber-500 text-red-600">5</span>, <span className="dark:text-amber-500 text-red-600">4</span>) → Swap → [1, 4, 5, 2, 8]</li>
                    <li>(<span className="dark:text-amber-500 text-red-600">5</span>, <span className="dark:text-amber-500 text-red-600">2</span>) → Swap → [1, 4, 2, 5, 8]</li>
                    <li>(<span className="dark:text-amber-500 text-red-600">5</span>, <span className="dark:text-amber-500 text-red-600">8</span>) → No swap</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Second Pass:</span>
                  <ul className="list-disc ml-6">
                    <li>(<span className="dark:text-amber-500 text-red-600">1</span>, <span className="dark:text-amber-500 text-red-600">4</span>) → No swap</li>
                    <li>(<span className="dark:text-amber-500 text-red-600">4</span>, <span className="dark:text-amber-500 text-red-600">2</span>) → Swap → [1, 2, 4, 5, 8]</li>
                    <li>(<span className="dark:text-amber-500 text-red-600">4</span>, <span className="dark:text-amber-500 text-red-600">5</span>) → No swap</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Third Pass:</span> No swaps needed → List is sorted
                </li>
              </ol>
              <br />
              The algorithm stops when a complete pass is made without any swaps.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                <li>Start with an unsorted array</li>
                <li>Set a flag to track if any swaps occur</li>
                <li>
                  For each pair of adjacent elements:
                  <ul>
                    <li>Compare the two elements</li>
                    <li>If they are in the wrong order, swap them</li>
                    <li>Set the swap flag to true</li>
                  </ul>
                </li>
                <li>Repeat the process until a complete pass is made without any swaps</li>
                <li>The array is now sorted</li>
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
                  <span className="dark:text-amber-500 text-red-600">Best Case</span>: Array is already sorted → <span className="dark:text-amber-500 text-red-600">O(n)</span> (only one pass needed).
                </li>
                <li>
                  <span className="dark:text-amber-500 text-red-600">Average Case</span>: Randomly ordered array → <span className="dark:text-amber-500 text-red-600">O(n²)</span>.
                </li>
                <li>
                  <span className="dark:text-amber-500 text-red-600">Worst Case</span>: Array is sorted in reverse order → <span className="dark:text-amber-500 text-red-600">O(n²)</span>.
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Space Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Bubble Sort is an <span className="dark:text-amber-500 text-red-600">in-place</span> sorting algorithm, meaning it requires only 
              <span className="dark:text-amber-500 text-red-600"> O(1)</span> additional space (for temporary storage during swaps).
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Bubble Sort is simple to understand and implement but inefficient for large datasets.
              It's mainly used for educational purposes to introduce sorting algorithms.
              In practice, more efficient algorithms like QuickSort or MergeSort are preferred.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;