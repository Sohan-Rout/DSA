const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Peek Front Operation?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              The <span className="dark:text-amber-500 text-purple-600">peek front</span> operation (also called <span className="dark:text-amber-500 text-purple-600">front</span>) retrieves the element at the front of the queue <span className="dark:text-amber-500 text-purple-600">without removing it</span>.
              This operation allows you to examine the next element to be processed while maintaining the queue's integrity.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work?
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Peek returns the front element while keeping the queue unchanged:
              <br /><br />
              Example with queue: 
              <span className="dark:text-amber-500 text-purple-600">[A, B, C, D]</span>
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">Current Queue:</span> [<span className="dark:text-amber-500 text-purple-600">A</span>, B, C, D]
                </li>
                <li>
                  <span className="font-semibold">peekFront():</span> Returns <span className="dark:text-amber-500 text-purple-600">'A'</span>
                </li>
                <li>
                  <span className="font-semibold">Queue After Peek:</span> [<span className="dark:text-amber-500 text-purple-600">A</span>, B, C, D] (unchanged)
                </li>
              </ol>
              <br />
              Contrast with dequeue() which would remove 'A' from the queue.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Implementation Details
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Different implementations handle peek similarly:
              <br />
              <ol className="list-decimal ml-8 pl-2">
                <li>
                  <span className="font-semibold">Array-based Queue:</span>
                  <ul className="list-disc ml-6">
                    <li>Return array[front]</li>
                    <li>Check for empty queue first</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Linked List Queue:</span>
                  <ul className="list-disc ml-6">
                    <li>Return head.data</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Circular Buffer:</span>
                  <ul className="list-disc ml-6">
                    <li>Return buffer[front]</li>
                    <li>Handle wrap-around cases</li>
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
              Basic peek operation algorithm:
              <ol className="list-decimal ml-8 pl-2">
                <li>Check if queue is empty (use isEmpty())</li>
                <li>If empty, return error/exception (or null)</li>
                <li>Access the data at front position</li>
                <li>Return the data without modifying pointers</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Time Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Peek operation always runs in <span className="dark:text-amber-500 text-purple-600">O(1)</span> constant time because:
              <ol className="list-disc ml-8 pl-2">
                <li>Direct access to front element</li>
                <li>No iteration needed</li>
                <li>No structural changes to queue</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Practical Applications
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Common use cases for peek:
              <ol className="list-disc ml-8 pl-2">
                <li>Previewing next item before processing</li>
                <li>Priority checking in priority queues</li>
                <li>Conditional processing logic</li>
                <li>Debugging queue contents</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Error Handling
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Important considerations:
              <ul className="list-disc ml-8 pl-2">
                <li>Always check isEmpty() before peeking</li>
                <li>Options for empty queue:
                  <ul className="list-disc ml-6">
                    <li>Throw exception (e.g., EmptyQueueException)</li>
                    <li>Return null/undefined</li>
                    <li>Return special sentinel value</li>
                  </ul>
                </li>
                <li>Document behavior in your API</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              The peek front operation is essential for non-destructive queue inspection,
              enabling more flexible queue processing patterns while maintaining FIFO order.
              It's particularly valuable in scenarios where decision-making depends on
              the next item's properties without committing to its removal.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;