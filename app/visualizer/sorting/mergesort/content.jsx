const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Merge Sort
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              Merge Sort is an efficient, stable, comparison-based sorting algorithm that follows the <strong>divide-and-conquer</strong> approach.
              It works by recursively dividing the unsorted list into sublists until each sublist contains a single element,
              then repeatedly merges these sublists to produce new sorted sublists until there is only one sorted list remaining.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Consider this unsorted array: 
              <span className="dark:text-amber-500 text-purple-600">[38, 27, 43, 3, 9, 82, 10]</span>
              <br /><br />
              
              <span className="font-semibold">Divide Phase:</span>
              <ol className="list-decimal ml-8 pl-3">
                <li>Split the array into two halves: [38, 27, 43] and [3, 9, 82, 10]</li>
                <li>Recursively split each half until single elements remain</li>
              </ol>
              
              <span className="font-semibold">Merge Phase:</span>
              <ol className="list-decimal ml-8 pl-3">
                <li>Merge single elements into sorted pairs: [27, 38], [3, 43], [9, 82], [10]</li>
                <li>Merge pairs: [3, 27, 38, 43] and [9, 10, 82]</li>
                <li>Final merge: [3, 9, 10, 27, 38, 43, 82]</li>
              </ol>
              
              <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-0 pb-2 rounded">
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
                <li>
                  <strong>Divide:</strong>
                  <ul className="list-disc ml-6">
                    <li>Find the middle point to divide the array into two halves</li>
                    <li>Recursively call merge sort on the first half</li>
                    <li>Recursively call merge sort on the second half</li>
                  </ul>
                </li>
                <li>
                  <strong>Merge:</strong>
                  <ul className="list-disc ml-6">
                    <li>Create temporary arrays for both halves</li>
                    <li>Compare elements from each half and merge them in order</li>
                    <li>Copy any remaining elements from either half</li>
                  </ul>
                </li>
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
                  <span className="dark:text-amber-500 text-purple-600">Best Case</span>: 
                  <span className="dark:text-amber-500 text-purple-600"> O(n log n)</span> (already sorted, but still needs all comparisons)
                </li>
                <li>
                  <span className="dark:text-amber-500 text-purple-600">Average Case</span>: 
                  <span className="dark:text-amber-500 text-purple-600"> O(n log n)</span>
                </li>
                <li>
                  <span className="dark:text-amber-500 text-purple-600">Worst Case</span>: 
                  <span className="dark:text-amber-500 text-purple-600"> O(n log n)</span> (consistent performance)
                </li>
              </ol>
              <p className="mt-2 ml-4">
                The log n factor comes from the division steps, while the n factor comes from the merge steps.
              </p>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Space Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Merge Sort requires <span className="dark:text-amber-500 text-purple-600">O(n)</span> additional space for the temporary arrays during merging.
              This makes it not an in-place sorting algorithm, unlike Insertion Sort or Bubble Sort.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Advantages
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                <li>Stable sorting (maintains relative order of equal elements)</li>
                <li>Excellent for large datasets (consistent O(n log n) performance)</li>
                <li>Well-suited for external sorting (sorting data too large for RAM)</li>
                <li>Easily parallelizable (divide steps can be done concurrently)</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Disadvantages
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                <li>Requires O(n) additional space (not in-place)</li>
                <li>Slower than O(n²) algorithms for very small datasets due to recursion overhead</li>
                <li>Not as cache-efficient as some other algorithms (e.g., QuickSort)</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Merge Sort is particularly useful when sorting linked lists (where random access is expensive)
              and is the algorithm of choice for many standard library sorting implementations when stability is required.
              It's also commonly used in external sorting where data doesn't fit in memory.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;