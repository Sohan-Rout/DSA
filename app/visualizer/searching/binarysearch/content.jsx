const content = () => {
  const searching = [
    { points : "First middle is 7 (too high)" },
    { points : "Search left half: [1, 3, 5]" },
    { points : "New middle is 3 (too low)" },
    { points : "Search right portion: [5]" },
    { points : "Found at position 2" },
  ];

  const steps = [
    {points : "Start with the entire sorted array" },
    {points : "Compare the target with the middle element:",
      subpoints : [
        "If equal, return the position",
        "If target is smaller, search the left half",
        "If target is larger, search the right half"
      ]
     },
    {points : "Repeat until the element is found or the subarray is empty" },
    {points : 'If not found, return "Not Found"' },
  ];

  const complexity = [
    { points : "Best Case: Target is the middle element → O(1)." },
    { points : "Worst Case: Element not present → O(log n) (halves search space each step)." },
  ];

    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-2 pb-4 p-0">
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
              <p>Imagine you have a sorted list of numbers: [1, 3, 5, 7, 9, 11, 13] and you want to find the number 7.</p>
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  Compare 7 with the middle element (7). It matches! Return the position.
                </li>
                <li>
                  If searching for 5:
                  <ul className="list-disc ml-6">
                    {searching.map((item, index) => (
                      <li key={index}>{item.points}</li>
                    ))}
                  </ul>
                </li>
              </ol>
              <br />
              <p>If the number is not in the list (e.g., searching for 8), the search ends when the subarray becomes empty.</p>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                {steps.map((item, index) => (
                  <li key={index}>{item.points}{item.subpoints && (
                    <ul className="list-disc ml-6">
                      {item.subpoints.map((subItem, subIndex) => (
                        <li key={subIndex}>{subItem}</li>
                      ))}
                    </ul>
                  )}</li>
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