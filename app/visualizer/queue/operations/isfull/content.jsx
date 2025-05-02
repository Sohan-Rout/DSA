const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is the isFull Operation?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              The <span className="dark:text-amber-500 text-purple-600">isFull</span> operation checks whether a queue has reached its maximum capacity in fixed-size implementations.
              It returns <span className="dark:text-amber-500 text-purple-600">true</span> if no more elements can be added (queue is full) and <span className="dark:text-amber-500 text-purple-600">false</span> if space remains.
              This operation is crucial for preventing overflow in array-based queue implementations.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work?
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              The isFull operation examines the queue's capacity and current state:
              <br /><br />
              Example scenarios (for a queue with capacity 3):
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold dark:text-amber-500 text-purple-600">Full Queue:</span> [10, 20, 30]
                  <ul className="list-disc ml-6">
                    <li><span className="dark:text-amber-500 text-purple-600">isFull()</span> → returns <span className="dark:text-amber-500 text-purple-600">true</span></li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold dark:text-amber-500 text-purple-600">Non-full Queue:</span> [10, 20]
                  <ul className="list-disc ml-6">
                    <li><span className="dark:text-amber-500 text-purple-600">isFull()</span> → returns <span className="dark:text-amber-500 text-purple-600">false</span></li>
                  </ul>
                </li>
              </ol>
              <br />
              Note: Dynamic implementations (like linked lists) typically don't need this operation as they can grow indefinitely.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Implementation Details
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Different approaches to check if a queue is full:
              <br />
              <ol className="list-decimal ml-8 pl-2">
                <li>
                  <span className="font-semibold">Linear Array Implementation:</span>
                  <ul className="list-disc ml-6">
                    <li>Check if rear == capacity - 1</li>
                    <li>Simple but wastes space when front ≠ 0</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Circular Array Implementation:</span>
                  <ul className="list-disc ml-6">
                    <li>Check if (rear + 1) % capacity == front</li>
                    <li>More space-efficient</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Size Counter Approach:</span>
                  <ul className="list-disc ml-6">
                    <li>Maintain a size variable</li>
                    <li>Check if size == capacity</li>
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
              For circular array implementation:
              <ol className="list-decimal ml-8 pl-2">
                <li>Calculate next rear position: (rear + 1) % capacity</li>
                <li>Compare with front position</li>
                <li>If equal, return true (queue is full)</li>
                <li>Else return false (space available)</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Time Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              The isFull operation always runs in <span className="dark:text-amber-500 text-purple-600">O(1)</span> constant time because:
              <ol className="list-disc ml-8 pl-2">
                <li>It only requires simple pointer arithmetic and comparison</li>
                <li>No iteration through elements is needed</li>
                <li>Performance is independent of queue size</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Practical Usage
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              isFull is essential in:
              <ol className="list-disc ml-8 pl-2">
                <li>Bounded buffer problems</li>
                <li>Producer-consumer scenarios</li>
                <li>Memory-constrained systems</li>
                <li>Before enqueue operations to prevent overflow</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Special Cases
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                <li><span className="font-semibold">Dynamic Queues:</span> Always return false (no capacity limit)</li>
                <li><span className="font-semibold">Empty Full Queue:</span> Possible when capacity = 0</li>
                <li><span className="font-semibold">Edge Cases:</span> When front = 0 and rear = capacity - 1</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              The isFull operation is critical for robust queue implementations in fixed-capacity scenarios,
              ensuring data integrity by preventing buffer overflow conditions in system programming and embedded applications.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;