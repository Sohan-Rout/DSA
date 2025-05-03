const content = () => {
    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is a Multiple Queue?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              A <span className="dark:text-amber-500 text-purple-600">Multiple Queue</span> is a data structure that consists of <span className="dark:text-amber-500 text-purple-600">several individual queues</span> managed together. 
              This approach allows for better organization of data with different priorities or categories while maintaining 
              the standard FIFO (First-In-First-Out) property within each individual queue.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Key Characteristics
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Multiple queues have these fundamental properties:
              <br /><br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">Multiple FIFO structures:</span> Contains several independent queues
                </li>
                <li>
                  <span className="font-semibold">Priority management:</span> Queues can represent different priority levels
                </li>
                <li>
                  <span className="font-semibold">Flexible operations:</span>
                  <ul className="list-disc ml-6">
                    <li><span className="font-semibold">enqueue(item, queueNum)</span> - Add to specific queue</li>
                    <li><span className="font-semibold">dequeue(queueNum)</span> - Remove from specific queue</li>
                    <li><span className="font-semibold">multiDequeue()</span> - Remove following priority rules</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Dynamic allocation:</span> Queues can grow/shrink independently
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Visual Example
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Operation sequence with 3 queues:
              <br /><br />
              <ol className="list-decimal ml-8 pl-3">
                <li>enqueue(A, 0): Queue0 [<span className="dark:text-amber-500 text-purple-600">A</span>] | Queue1 [] | Queue2 []</li>
                <li>enqueue(B, 1): Queue0 [A] | Queue1 [<span className="dark:text-amber-500 text-purple-600">B</span>] | Queue2 []</li>
                <li>enqueue(C, 0): Queue0 [A, <span className="dark:text-amber-500 text-purple-600">C</span>] | Queue1 [B] | Queue2 []</li>
                <li>dequeue(0): Returns A → Queue0 [<span className="dark:text-amber-500 text-purple-600">C</span>] | Queue1 [B] | Queue2 []</li>
                <li>enqueue(D, 2): Queue0 [C] | Queue1 [B] | Queue2 [<span className="dark:text-amber-500 text-purple-600">D</span>]</li>
                <li>multiDequeue(): Returns B (higher priority) → Queue0 [C] | Queue1 [] | Queue2 [D]</li>
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
                  <span className="font-semibold">Array of Queues:</span>
                  <ul className="list-disc ml-6">
                    <li>Fixed number of queues</li>
                    <li>Simple to implement</li>
                    <li>Static memory allocation</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Dynamic Array of Linked Lists:</span>
                  <ul className="list-disc ml-6">
                    <li>Flexible queue sizes</li>
                    <li>Efficient memory usage</li>
                    <li>More complex implementation</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Priority-based Implementation:</span>
                  <ul className="list-disc ml-6">
                    <li>Queues represent priority levels</li>
                    <li>Automatic routing of dequeue operations</li>
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
                <li>enqueue(item, queueNum): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>dequeue(queueNum): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>multiDequeue(): <span className="dark:text-amber-500 text-purple-600">O(k)</span> where k is number of queues</li>
                <li>peek(queueNum): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>isEmpty(queueNum): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Applications
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Multiple queues are used in:
              <ol className="list-disc ml-8 pl-2">
                <li><span className="font-semibold">Operating Systems:</span> Process scheduling with multiple priority levels</li>
                <li><span className="font-semibold">Network Traffic Management:</span> Different queues for different packet types</li>
                <li><span className="font-semibold">Print Spooling:</span> Separate queues for different printer priorities</li>
                <li><span className="font-semibold">Customer Service Systems:</span> VIP vs regular customer queues</li>
                <li><span className="font-semibold">Multi-level Feedback Queues:</span> Adaptive scheduling algorithms</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Special Cases
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Interesting multiple queue variations:
              <ul className="list-disc ml-8 pl-2">
                <li><span className="font-semibold">Priority Multi-Queue:</span> Automatic dequeue from highest priority non-empty queue</li>
                <li><span className="font-semibold">Dynamic Multi-Queue:</span> Queues can be added/removed at runtime</li>
                <li><span className="font-semibold">Bounded Multi-Queue:</span> Each queue has individual capacity limits</li>
                <li><span className="font-semibold">Inter-Queue Transfer:</span> Items can move between queues under certain conditions</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              The multiple queue structure provides an efficient way to manage categorized or prioritized data streams 
              while maintaining the simplicity of FIFO operations within each category. Its versatility makes it 
              particularly valuable in systems where different types of data or requests need separate but coordinated handling.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;