const content = () => {
    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is a Priority Queue?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              A <span className="dark:text-amber-500 text-purple-600">Priority Queue</span> is an abstract data type where each element has a <span className="dark:text-amber-500 text-purple-600">priority value</span>, and elements are served based on priority rather than insertion order. 
              Unlike a standard queue (FIFO), higher-priority elements are dequeued before lower-priority ones, regardless of when they were added.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Key Characteristics
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Priority queues have these fundamental properties:
              <br /><br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">Priority-based ordering:</span> Elements are processed by priority (highest first or lowest first)
                </li>
                <li>
                  <span className="font-semibold">Two core operations:</span>
                  <ul className="list-disc ml-6">
                    <li><span className="font-semibold">insert(item, priority)</span> - Add with priority</li>
                    <li><span className="font-semibold">extractMax()/extractMin()</span> - Remove highest/lowest priority item</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Peek operation:</span> View highest/lowest priority item without removal
                </li>
                <li>
                  <span className="font-semibold">No FIFO guarantee:</span> Equal priority elements may be processed in arbitrary order
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Visual Example (Max-Heap Priority Queue)
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Operation sequence:
              <br /><br />
              <ol className="list-decimal ml-8 pl-3">
                <li>insert("A", 3): [<span className="dark:text-amber-500 text-purple-600">(A,3)</span>]</li>
                <li>insert("B", 5): [(A,3), <span className="dark:text-amber-500 text-purple-600">(B,5)</span>] → [(B,5), (A,3)]</li>
                <li>insert("C", 1): [(B,5), (A,3), <span className="dark:text-amber-500 text-purple-600">(C,1)</span>]</li>
                <li>extractMax(): Returns "B" → [(A,3), (C,1)]</li>
                <li>insert("D", 4): [(A,3), (C,1), <span className="dark:text-amber-500 text-purple-600">(D,4)</span>] → [(D,4), (A,3), (C,1)]</li>
                <li>extractMax(): Returns "D" → [(A,3), (C,1)]</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Implementation Variations
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Common implementation approaches:
              <ol className="list-decimal ml-8 pl-2">
                <li>
                  <span className="font-semibold">Binary Heap:</span>
                  <ul className="list-disc ml-6">
                    <li>Most common implementation</li>
                    <li>O(log n) insert and extract</li>
                    <li>O(1) peek</li>
                    <li>Memory efficient</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Balanced Binary Search Tree:</span>
                  <ul className="list-disc ml-6">
                    <li>O(log n) all operations</li>
                    <li>Supports more operations (like delete-by-value)</li>
                    <li>Higher memory overhead</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Array (Unsorted):</span>
                  <ul className="list-disc ml-6">
                    <li>O(1) insert, O(n) extract</li>
                    <li>Simple but inefficient for large datasets</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Fibonacci Heap:</span>
                  <ul className="list-disc ml-6">
                    <li>Amortized O(1) insert</li>
                    <li>O(log n) extract</li>
                    <li>Complex implementation</li>
                  </ul>
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
                <li>insert(): <span className="dark:text-amber-500 text-purple-600">O(log n)</span> (heap), <span className="dark:text-amber-500 text-purple-600">O(1)</span> amortized (Fibonacci heap)</li>
                <li>extractMax()/extractMin(): <span className="dark:text-amber-500 text-purple-600">O(log n)</span></li>
                <li>peek(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>delete(item): <span className="dark:text-amber-500 text-purple-600">O(log n)</span> (heap), <span className="dark:text-amber-500 text-purple-600">O(1)</span> amortized (Fibonacci heap)</li>
                <li>changePriority(): <span className="dark:text-amber-500 text-purple-600">O(log n)</span></li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Applications
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Priority queues are used in:
              <ol className="list-disc ml-8 pl-2">
                <li><span className="font-semibold">Dijkstra's Algorithm:</span> Finding shortest paths in graphs</li>
                <li><span className="font-semibold">Huffman Coding:</span> Data compression</li>
                <li><span className="font-semibold">Operating Systems:</span> Process scheduling</li>
                <li><span className="font-semibold">Event-driven Simulation:</span> Processing events in time order</li>
                <li><span className="font-semibold">A* Search:</span> Pathfinding in AI</li>
                <li><span className="font-semibold">Bandwidth Management:</span> Prioritizing network packets</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Special Cases
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Interesting priority queue variations:
              <ul className="list-disc ml-8 pl-2">
                <li><span className="font-semibold">Min-Priority Queue:</span> Extracts minimum priority first</li>
                <li><span className="font-semibold">Max-Priority Queue:</span> Extracts maximum priority first</li>
                <li><span className="font-semibold">Double-Ended Priority Queue:</span> Supports both min and max extraction</li>
                <li><span className="font-semibold">Indexed Priority Queue:</span> Allows priority updates by key</li>
                <li><span className="font-semibold">Bounded Priority Queue:</span> Fixed capacity with eviction policies</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              The priority queue is a fundamental data structure that enables efficient management of elements based on their importance or urgency.
              Its ability to always provide access to the highest (or lowest) priority item makes it indispensable in algorithms
              where processing order significantly impacts performance or correctness. The choice of implementation
              (heap, BST, etc.) depends on the specific application's requirements for insertion, extraction, and auxiliary operations.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;