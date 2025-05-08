const content = () => {
  const working = [
    { points : "Start from the first number (5). Is 5 equal to 8? No." },
    { points : "Move to the next number (3). Is 3 equal to 8? No." },
    { points : "Move to the next number (8). Is 8 equal to 8? Yes! Stop here. The position is 2 (or 3 if counting starts from 1)." },
  ];

  const complexity = [
    { data : "Best Case: Target is the first element → O(1)" },
    { data : "Worst Case: Target is last or not present → O(n) (checks all elements)" },
  ];

  return (
    <main>
      <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
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
            <p>Imagine you have a list of numbers: [5, 3, 8, 1, 9] and you want to find the number 8.</p>
            <br />
            <ol className="list-decimal ml-8 pl-3">
              {working.map((item, index) => (
                <li key={index}>{item.points}</li>
              ))}
            </ol>
            <br />
            If the number is not in the list (e.g., searching for 10), the search ends without success.
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
              {complexity.map((item, index) => (
                <li key={index}>{item.data}</li>
              ))}
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
