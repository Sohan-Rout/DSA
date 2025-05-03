const content = () => {
    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is a Circular Queue?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              A <span className="dark:text-amber-500 text-purple-600">Circular Queue</span> is an advanced version of a linear queue that 
              <span className="dark:text-amber-500 text-purple-600"> connects the end of the queue back to the front</span>, forming a circle. 
              This efficient structure prevents memory wastage and allows better utilization of fixed-size buffers.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Key Characteristics
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Circular queues have these fundamental properties:
              <br /><br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">Fixed capacity:</span> Size is predetermined at creation
                </li>
                <li>
                  <span className="font-semibold">Two pointers:</span>
                  <ul className="list-disc ml-6">
                    <li><span className="font-semibold">Front:</span> Points to the first element</li>
                    <li><span className="font-semibold">Rear:</span> Points to the last element</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Circular behavior:</span> When pointers reach the end, they wrap around to the start
                </li>
                <li>
                  <span className="font-semibold">Efficient space utilization:</span> Reuses empty spaces created after dequeues
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Visual Example (Size=5)
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Operation sequence on an empty circular queue:
              <br /><br />
              <ol className="list-decimal ml-8 pl-3">
                <li>enqueue(10): [<span className="dark:text-amber-500 text-purple-600">10</span>, _, _, _, _] (F=0, R=0)</li>
                <li>enqueue(20): [10, <span className="dark:text-amber-500 text-purple-600">20</span>, _, _, _] (F=0, R=1)</li>
                <li>enqueue(30): [10, 20, <span className="dark:text-amber-500 text-purple-600">30</span>, _, _] (F=0, R=2)</li>
                <li>dequeue(): Returns 10 → [_, 20, 30, _, _] (F=1, R=2)</li>
                <li>enqueue(40): [_, 20, 30, <span className="dark:text-amber-500 text-purple-600">40</span>, _] (F=1, R=3)</li>
                <li>enqueue(50): [_, 20, 30, 40, <span className="dark:text-amber-500 text-purple-600">50</span>] (F=1, R=4)</li>
                <li>enqueue(60): [<span className="dark:text-amber-500 text-purple-600">60</span>, 20, 30, 40, 50] (F=1, R=0) ← Wraps around!</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Implementation Details
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Key implementation aspects:
              <ol className="list-decimal ml-8 pl-2">
                <li>
                  <span className="font-semibold">Pointer Movement:</span>
                  <ul className="list-disc ml-6">
                    <li>front = (front + 1) % capacity</li>
                    <li>rear = (rear + 1) % capacity</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Full/Empty Conditions:</span>
                  <ul className="list-disc ml-6">
                    <li>Full: (rear + 1) % capacity == front</li>
                    <li>Empty: front == rear</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Always one empty slot:</span> Needed to distinguish between full and empty states
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Time Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                <li>enqueue(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>dequeue(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>peekFront(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>peekRear(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>isEmpty(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>isFull(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Applications
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Circular queues are used in:
              <ol className="list-disc ml-8 pl-2">
                <li><span className="font-semibold">CPU Scheduling:</span> Round-robin scheduling algorithms</li>
                <li><span className="font-semibold">Memory Management:</span> Circular buffers in memory systems</li>
                <li><span className="font-semibold">Traffic Systems:</span> Controlling the flow of traffic signals</li>
                <li><span className="font-semibold">Data Streams:</span> Handling continuous data streams (audio/video buffers)</li>
                <li><span className="font-semibold">Producer-Consumer Problems:</span> Where producers and consumers operate at different rates</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Advantages Over Linear Queue
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                <li><span className="font-semibold">Better memory utilization:</span> Reuses empty spaces</li>
                <li><span className="font-semibold">Efficient operations:</span> No need to shift elements</li>
                <li><span className="font-semibold">Fixed memory footprint:</span> Predictable memory usage</li>
                <li><span className="font-semibold">Real-time systems friendly:</span> Bounded execution time</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              The circular queue is an essential data structure for systems requiring efficient, 
              fixed-size buffers with constant-time operations. Its circular nature solves the 
              memory wastage problem of linear queues while maintaining simple and predictable 
              performance characteristics, making it ideal for low-level system programming and 
              real-time applications.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;