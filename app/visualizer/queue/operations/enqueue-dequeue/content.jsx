const content = () => {
  const paragraph = [
    `A Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue). It operates much like a real-world queue (line) where the first person to arrive is the first to be served.`,
    `The space complexity is O(n) where n is the number of elements in the queue, as it needs to store all elements.`,
    `Queues are fundamental in computer science and are used in various applications like CPU scheduling, disk scheduling, handling interrupts, breadth-first search, and any scenario where you need to maintain order of processing.`,
  ];

  const enqueue = [
    { points : "Check if the queue is full (in case of fixed-size implementation)" },
    { points : "If full, return overflow error (or resize in dynamic implementation)" },
    { points : "Increment the rear pointer" },
    { points : "Add the new element at the rear position" },
  ];

  const opeartionEnqueue = [
    { points : "Before Enqueue: [10, 20, 30]" },
    { points : "Enqueue(40): Add 40 to the rear" },
    { points : "Enqueue(40): Add 40 to the rear" },
  ];

  const dequeue = [
    { points : "Check if the queue is empty" },
    { points : "If empty, return underflow error" },
    { points : "Access the data at the front of the queue" },
    { points : "Increment the front pointer to the next element" },
    { points : "Return the accessed data" },
  ];

  const operationDequeue = [
    { points : "Before Dequeue: [10, 20, 30, 40]" },
    { points : "Dequeue(): Remove and return 10" },
    { points : "After Dequeue: [20, 30, 40]" },
  ];

    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is a Queue ?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">{paragraph[0]}</p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Enqueue Operation
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Enqueue adds an element to the end (rear) of the queue. Example with queue: [10, 20, 30]
              <br />
              <ol className="list-decimal ml-8 pl-3">
                {opeartionEnqueue.map((item, index) => (
                  <li key={index}>{item.points}</li>
                ))}
              </ol>
              <p>The new element always goes to the end of the queue.</p>
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
                {operationDequeue.map((item, index) => (
                  <li key={index}>{item.points}</li>
                ))}
              </ol>
              <br />
              <p>The oldest element (first one added) is always removed first.</p>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps for Enqueue
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-decimal ml-8 pl-2">
                {enqueue.map((item, index) => (
                  <li key={index}>{item.points}</li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps for Dequeue
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-decimal ml-8 pl-2">
                {dequeue.map((item, index) => (
                  <li key={index}>{item.points}</li>
                ))}
              </ul>
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
            <div className="ml-4 dark:text-gray-300 text-black">{paragraph[1]}</div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">{paragraph[2]}</p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;