const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is a Single-Ended Queue?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              A <span className="dark:text-amber-500 text-purple-600">single-ended queue</span> (often just called a <span className="dark:text-amber-500 text-purple-600">queue</span>) is a linear data structure that follows the <span className="dark:text-amber-500 text-purple-600">FIFO (First-In-First-Out)</span> principle. 
              Elements are added (<span className="dark:text-amber-500 text-purple-600">enqueued</span>) at the rear and removed (<span className="dark:text-amber-500 text-purple-600">dequeued</span>) from the front, maintaining strict ordering.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Key Characteristics
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Single-ended queues have these fundamental properties:
              <br /><br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">Two ends:</span> Front (for removal) and rear (for insertion)
                </li>
                <li>
                  <span className="font-semibold">Basic Operations:</span>
                  <ul className="list-disc ml-6">
                    <li>enqueue() - Add to rear</li>
                    <li>dequeue() - Remove from front</li>
                    <li>peek() - View front element</li>
                    <li>isEmpty() - Check if empty</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Fixed Order:</span> Elements are processed in exact arrival sequence
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Visual Example
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Operation sequence on an initially empty queue:
              <br /><br />
              <ol className="list-decimal ml-8 pl-3">
                <li>enqueue(10): [<span className="dark:text-amber-500 text-purple-600">10</span>]</li>
                <li>enqueue(20): [10, <span className="dark:text-amber-500 text-purple-600">20</span>]</li>
                <li>enqueue(30): [10, 20, <span className="dark:text-amber-500 text-purple-600">30</span>]</li>
                <li>dequeue(): Returns 10 → [<span className="dark:text-amber-500 text-purple-600">20</span>, 30]</li>
                <li>peek(): Returns 20 → [20, 30] (unchanged)</li>
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
                  <span className="font-semibold">Array-Based:</span>
                  <ul className="list-disc ml-6">
                    <li>Fixed or dynamic array</li>
                    <li>Need to handle wrap-around for circular queues</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Linked List:</span>
                  <ul className="list-disc ml-6">
                    <li>Head pointer as front</li>
                    <li>Tail pointer as rear</li>
                    <li>Efficient O(1) operations</li>
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
                <li>enqueue(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>dequeue(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>peek(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>isEmpty(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Applications
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Single-ended queues are used in:
              <ol className="list-disc ml-8 pl-2">
                <li>CPU task scheduling</li>
                <li>Print job management</li>
                <li>Breadth-First Search (BFS) algorithms</li>
                <li>Buffering data streams</li>
                <li>Handling requests in web servers</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Comparison with Double-Ended Queue
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Key differences:
              <ul className="list-disc ml-8 pl-2">
                <li>Single-ended only allows insertion at rear and removal at front</li>
                <li>Double-ended (deque) allows insertion/removal at both ends</li>
                <li>Single-ended has stricter FIFO enforcement</li>
                <li>Single-ended is simpler to implement</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              The single-ended queue is a fundamental data structure in computer science, 
              providing predictable ordering that's essential for many algorithms and 
              system design patterns where processing order matters.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;