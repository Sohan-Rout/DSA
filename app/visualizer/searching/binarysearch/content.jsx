const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Binary Search
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              Binary Search is an efficient algorithm for finding an item in a sorted list. 
              It works by repeatedly dividing the search interval in half. If the target value 
              is less than the middle element, the search continues in the lower half. 
              Otherwise, it continues in the upper half. This process repeats until the value is found.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Imagine you have a sorted list of numbers: 
              <span className="dark:text-amber-500 text-red-600">[1, 3, 5, 7, 9, 11, 13]</span> 
              and you want to find the number 
              <span className="dark:text-amber-500 text-red-600">7</span>.
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  Compare <span className="dark:text-amber-500 text-red-600">7</span> with the middle element <span className="dark:text-amber-500 text-red-600">(7)</span>. It matches! Return the position.
                </li>
                <li>
                  If searching for <span className="dark:text-amber-500 text-red-600">5</span>:
                  <ul className="list-disc ml-6">
                    <li>First middle is <span className="dark:text-amber-500 text-red-600">7</span> (too high)</li>
                    <li>Search left half: <span className="dark:text-amber-500 text-red-600">[1, 3, 5]</span></li>
                    <li>New middle is <span className="dark:text-amber-500 text-red-600">3</span> (too low)</li>
                    <li>Search right portion: <span className="dark:text-amber-500 text-red-600">[5]</span></li>
                    <li>Found at position <span className="dark:text-amber-500 text-red-600">2</span></li>
                  </ul>
                </li>
              </ol>
              <br />
              If the number is not in the list 
              <span className="dark:text-amber-500 text-red-600">(e.g., searching for 8)</span>, the search ends when the subarray becomes empty.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                <li>Start with the entire sorted array</li>
                <li>
                  Compare the target with the middle element:
                  <ul>
                    <li>If equal, return the position</li>
                    <li>If target is smaller, search the left half</li>
                    <li>If target is larger, search the right half</li>
                  </ul>
                </li>
                <li>Repeat until the element is found or the subarray is empty</li>
                <li>If not found, return "Not Found"</li>
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
                  <span className="dark:text-amber-500 text-red-600">Best Case</span>: Target is the middle element → <span className="dark:text-amber-500 text-red-600">O(1)</span>.
                </li>
                <li>
                  <span className="dark:text-amber-500 text-red-600">Worst Case</span>: Element not present → <span className="dark:text-amber-500 text-red-600">O(log n)</span> (halves search space each step).
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Binary Search is extremely fast for large datasets but requires the list to be sorted beforehand.
              It's much more efficient than Linear Search for sorted data.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;