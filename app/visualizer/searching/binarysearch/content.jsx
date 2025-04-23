const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Linear Search
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              Linear Search is a simple method to find a particular value in a
              list. It checks each element one by one from the start until it
              finds the target value. If the value is found, it returns its
              position; otherwise, it says the value is not present.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Imagine you have a list of numbers: 
              <span className="dark:text-amber-500 text-red-600">[5, 3, 8, 1, 9]</span> 
              and you want to find the number 
              <span className="dark:text-amber-500 text-red-600">8</span>.
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  Start from the first number <span className="dark:text-amber-500 text-red-600">(5)</span>. Is <span className="dark:text-amber-500 text-red-600">5</span> equal to <span className="dark:text-amber-500 text-red-600">8</span>? No.
                </li>
                <li>
                  Move to the next number <span className="dark:text-amber-500 text-red-600">(3)</span>. Is <span className="dark:text-amber-500 text-red-600">3</span> equal to <span className="dark:text-amber-500 text-red-600">8</span>? No.
                </li>
                <li>
                  Move to the next number <span className="dark:text-amber-500 text-red-600">(8)</span>. Is <span className="dark:text-amber-500 text-red-600">8</span> equal to <span className="dark:text-amber-500 text-red-600">8</span>? Yes! Stop here. The position is <span className="dark:text-amber-500 text-red-600">2</span> (or 3 if counting starts from 1).
                </li>
              </ol>
              <br />
              If the number is not in the list 
              <span className="dark:text-amber-500 text-red-600">(e.g., searching for 10)</span>, the search ends without success.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                <li>Start from the first element.</li>
                <li>
                  Compare the current element with the target value.
                  <ul>
                    <li>If they match, return the position.</li>
                    <li>If not, move to the next element.</li>
                  </ul>
                </li>
                <li>Repeat until the end of the list.</li>
                <li>If the element is not found, return "Not Found".</li>
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
                  <span className="dark:text-amber-500 text-red-600">Best Case</span>: Target is the first element → <span className="dark:text-amber-500 text-red-600">O(1)</span>.
                </li>
                <li>
                  <span className="dark:text-amber-500 text-red-600">Worst Case</span>: Target is last or not present → <span className="dark:text-amber-500 text-red-600">O(n)</span> (checks all elements).
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Linear Search is easy to understand but can be slow for large lists compared to faster methods like Binary Search.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;
  