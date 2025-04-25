const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Selection Sort
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts:
              a sorted sublist which is built up from left to right, and a remaining unsorted sublist.
              It repeatedly selects the smallest (or largest) element from the unsorted portion and moves it to the sorted portion.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Consider this unsorted array: 
              <span className="dark:text-amber-500 text-red-600">[64, 25, 12, 22, 11]</span>
              <br /><br />
              
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">First Pass:</span>
                  <ul className="list-disc ml-6">
                    <li>Find the minimum in [64, 25, 12, 22, 11] → 11 at index 4</li>
                    <li>Swap with first element → [<span className="dark:text-green-400 text-green-600">11</span>, 25, 12, 22, 64]</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Second Pass:</span>
                  <ul className="list-disc ml-6">
                    <li>Find minimum in [25, 12, 22, 64] → 12 at index 2</li>
                    <li>Swap with first element → [<span className="dark:text-green-400 text-green-600">11, 12</span>, 25, 22, 64]</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Third Pass:</span>
                  <ul className="list-disc ml-6">
                    <li>Find minimum in [25, 22, 64] → 22 at index 2</li>
                    <li>Swap with first element → [<span className="dark:text-green-400 text-green-600">11, 12, 22</span>, 25, 64]</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Fourth Pass:</span>
                  <ul className="list-disc ml-6">
                    <li>Find minimum in [25, 64] → 25 at index 0</li>
                    <li>No swap needed → [<span className="dark:text-green-400 text-green-600">11, 12, 22, 25</span>, 64]</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Result:</span> [<span className="dark:text-green-400 text-green-600">11, 12, 22, 25, 64</span>]
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                <li>Set the first element as minimum</li>
                <li>Compare minimum with the second element:
                  <ul className="list-disc ml-6">
                    <li>If second element is smaller, set it as new minimum</li>
                  </ul>
                </li>
                <li>Continue until last element is reached</li>
                <li>Swap minimum with first element</li>
                <li>Repeat for remaining unsorted portion</li>
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
                  <span className="dark:text-amber-500 text-red-600">Best Case</span>: 
                  <span className="dark:text-amber-500 text-red-600"> O(n²)</span> (still makes n(n-1)/2 comparisons)
                </li>
                <li>
                  <span className="dark:text-amber-500 text-red-600">Average Case</span>: 
                  <span className="dark:text-amber-500 text-red-600"> O(n²)</span>
                </li>
                <li>
                  <span className="dark:text-amber-500 text-red-600">Worst Case</span>: 
                  <span className="dark:text-amber-500 text-red-600"> O(n²)</span>
                </li>
              </ol>
              <p className="mt-2 ml-4">
                The quadratic time complexity occurs because it performs O(n) comparisons for each of the O(n) elements.
              </p>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Space Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Selection Sort is an <span className="dark:text-amber-500 text-red-600">in-place</span> algorithm, 
              requiring only <span className="dark:text-amber-500 text-red-600">O(1)</span> additional space 
              for temporary variables during swaps.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Advantages
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                <li>Simple to understand and implement</li>
                <li>Performs well on small lists</li>
                <li>Minimal memory usage (in-place sorting)</li>
                <li>Only O(n) swaps required (better than Bubble Sort)</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Disadvantages
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                <li>Poor performance on large lists (quadratic time complexity)</li>
                <li>Not stable (may change relative order of equal elements)</li>
                <li>Less efficient than Insertion Sort for nearly sorted data</li>
                <li>Always performs O(n²) comparisons regardless of input</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Selection Sort is primarily used for educational purposes to introduce sorting concepts.
              In practice, it's outperformed by more advanced algorithms like QuickSort and MergeSort,
              but can be useful when memory writes are expensive (since it makes only O(n) swaps).
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;