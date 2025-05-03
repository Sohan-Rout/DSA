const content = () => {
  const enqueue = [
    { points : "" },
  ];
    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is a Queue ?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              A Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle.
              Elements are added at the rear (enqueue) and removed from the front (dequeue).
              It operates much like a real-world queue (line) where the first person to arrive is the first to be served.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Enqueue Operation
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Enqueue adds an element to the end (rear) of the queue.
              <br /><br />
              Example with queue: 
              <span className="dark:text-amber-500 text-purple-600">[10, 20, 30]</span>
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">Before Enqueue:</span> [10, 20, 30]
                </li>
                <li>
                  <span className="font-semibold">Enqueue(40):</span> Add 40 to the rear
                </li>
                <li>
                  <span className="font-semibold">After Enqueue:</span> [10, 20, 30, <span className="dark:text-amber-500 text-purple-600">40</span>]
                </li>
              </ol>
              <br />
              The new element always goes to the end of the queue.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Dequeue Operation
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Dequeue removes and returns the element from the front (head) of the queue.
              <br /><br />
              Example with queue: 
              <span className="dark:text-amber-500 text-purple-600">[10, 20, 30, 40]</span>
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">Before Dequeue:</span> [<span className="dark:text-amber-500 text-purple-600">10</span>, 20, 30, 40]
                </li>
                <li>
                  <span className="font-semibold">Dequeue():</span> Remove and return 10
                </li>
                <li>
                  <span className="font-semibold">After Dequeue:</span> [20, 30, 40]
                </li>
              </ol>
              <br />
              The oldest element (first one added) is always removed first.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps for Enqueue
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                <li>Check if the queue is full (in case of fixed-size implementation)</li>
                <li>If full, return overflow error (or resize in dynamic implementation)</li>
                <li>Increment the rear pointer</li>
                <li>Add the new element at the rear position</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps for Dequeue
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                <li>Check if the queue is empty</li>
                <li>If empty, return underflow error</li>
                <li>Access the data at the front of the queue</li>
                <li>Increment the front pointer to the next element</li>
                <li>Return the accessed data</li>
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
                  <span className="dark:text-amber-500 text-purple-600">Enqueue Operation</span>: <span className="dark:text-amber-500 text-purple-600">O(1)</span> - Constant time to add to the end
                </li>
                <li>
                  <span className="dark:text-amber-500 text-purple-600">Dequeue Operation</span>: <span className="dark:text-amber-500 text-purple-600">O(1)</span> - Constant time to remove from the front
                </li>
                <li>
                  <span className="dark:text-amber-500 text-purple-600">Peek Operation</span>: <span className="dark:text-amber-500 text-purple-600">O(1)</span> - Constant time to examine the front element
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Space Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              The space complexity is <span className="dark:text-amber-500 text-purple-600">O(n)</span> where n is the number of elements in the queue,
              as it needs to store all elements.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Queues are fundamental in computer science and are used in various applications
              like CPU scheduling, disk scheduling, handling interrupts, breadth-first search,
              and any scenario where you need to maintain order of processing.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;