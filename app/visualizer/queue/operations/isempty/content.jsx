const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is the isEmpty Operation?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              The <span className="dark:text-amber-500 text-red-600">isEmpty</span> operation checks whether a queue contains any elements or not.
              It returns <span className="dark:text-amber-500 text-red-600">true</span> if the queue is empty (no elements) and <span className="dark:text-amber-500 text-red-600">false</span> if it contains elements.
              This is a fundamental operation used to prevent underflow when performing dequeue operations.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work?
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              The isEmpty operation simply checks the current state of the queue:
              <br /><br />
              Example scenarios:
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">Empty Queue:</span> []
                  <ul className="list-disc ml-6">
                    <li><span className="dark:text-amber-500 text-red-600">isEmpty()</span> → returns <span className="dark:text-amber-500 text-red-600">true</span></li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Non-empty Queue:</span> [10, 20, 30]
                  <ul className="list-disc ml-6">
                    <li><span className="dark:text-amber-500 text-red-600">isEmpty()</span> → returns <span className="dark:text-amber-500 text-red-600">false</span></li>
                  </ul>
                </li>
              </ol>
              <br />
              The operation doesn't modify the queue in any way - it only checks its state.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Implementation Details
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Different implementations check emptiness differently:
              <br />
              <ol className="list-decimal ml-8 pl-2">
                <li>
                  <span className="font-semibold">Array-based Implementation:</span>
                  <ul className="list-disc ml-6">
                    <li>Check if front pointer == rear pointer</li>
                    <li>Or maintain a separate size counter</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Linked List Implementation:</span>
                  <ul className="list-disc ml-6">
                    <li>Check if head pointer == null</li>
                  </ul>
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
                <li>Examine the front of the queue</li>
                <li>If front is null (or front == rear in array implementation)</li>
                <li>Return true (queue is empty)</li>
                <li>Else return false (queue has elements)</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Time Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              The isEmpty operation always runs in <span className="dark:text-amber-500 text-red-600">O(1)</span> constant time because:
              <ol className="list-disc ml-8 pl-2">
                <li>It only requires a simple pointer comparison</li>
                <li>No iteration through elements is needed</li>
                <li>Performance doesn't depend on queue size</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Practical Usage
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              isEmpty is commonly used:
              <ol className="list-disc ml-8 pl-2">
                <li>Before dequeue operations to prevent underflow</li>
                <li>In queue processing loops</li>
                <li>As a termination condition in algorithms</li>
                <li>To initialize queue operations safely</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              The isEmpty operation is a simple but crucial part of queue functionality,
              serving as a safety check before removal operations and helping manage
              queue processing flow in algorithms and applications.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;