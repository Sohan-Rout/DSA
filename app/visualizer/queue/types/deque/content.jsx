const content = () => {
    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is a Double-Ended Queue (Deque)?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              A <span className="dark:text-amber-500 text-purple-600">Double-Ended Queue (Deque)</span> is a versatile data structure that allows insertion and deletion of elements from <span className="dark:text-amber-500 text-purple-600">both ends</span> (front and rear). 
              Unlike a single-ended queue, it provides more flexibility while maintaining efficient O(1) operations.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Key Characteristics
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Deques have these fundamental properties:
              <br /><br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  <span className="font-semibold">Two open ends:</span> Supports operations at both front and rear
                </li>
                <li>
                  <span className="font-semibold">Four core operations:</span>
                  <ul className="list-disc ml-6">
                    <li><span className="font-semibold">addFront()</span> - Insert at front</li>
                    <li><span className="font-semibold">addRear()</span> - Insert at rear</li>
                    <li><span className="font-semibold">removeFront()</span> - Delete from front</li>
                    <li><span className="font-semibold">removeRear()</span> - Delete from rear</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Hybrid nature:</span> Combines features of both stacks and queues
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Visual Example
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Operation sequence on an empty deque:
              <br /><br />
              <ol className="list-decimal ml-8 pl-3">
                <li>addFront(30): [<span className="dark:text-amber-500 text-purple-600">30</span>]</li>
                <li>addRear(40): [30, <span className="dark:text-amber-500 text-purple-600">40</span>]</li>
                <li>addFront(20): [<span className="dark:text-amber-500 text-purple-600">20</span>, 30, 40]</li>
                <li>addRear(50): [20, 30, 40, <span className="dark:text-amber-500 text-purple-600">50</span>]</li>
                <li>removeFront(): Returns 20 → [<span className="dark:text-amber-500 text-purple-600">30</span>, 40, 50]</li>
                <li>removeRear(): Returns 50 → [30, 40]</li>
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
                  <span className="font-semibold">Doubly Linked List:</span>
                  <ul className="list-disc ml-6">
                    <li>Natural fit with head and tail pointers</li>
                    <li>All operations are O(1)</li>
                    <li>Extra memory for previous/next pointers</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Circular Array:</span>
                  <ul className="list-disc ml-6">
                    <li>Fixed capacity but efficient</li>
                    <li>Requires careful index management</li>
                    <li>Good for memory-constrained environments</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold">Dynamic Array:</span>
                  <ul className="list-disc ml-6">
                    <li>Amortized O(1) operations</li>
                    <li>May need occasional resizing</li>
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
                <li>addFront(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>addRear(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>removeFront(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>removeRear(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>peekFront(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
                <li>peekRear(): <span className="dark:text-amber-500 text-purple-600">O(1)</span></li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Applications
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Deques are used in:
              <ol className="list-disc ml-8 pl-2">
                <li><span className="font-semibold">Undo/Redo operations:</span> Store history at both ends</li>
                <li><span className="font-semibold">Palindrome checking:</span> Compare front and rear elements</li>
                <li><span className="font-semibold">Steal algorithms:</span> Work stealing in parallel processing</li>
                <li><span className="font-semibold">Sliding window problems:</span> Efficient maximum/minimum tracking</li>
                <li><span className="font-semibold">Browser history:</span> Navigation in both directions</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Special Cases
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Interesting deque variations:
              <ul className="list-disc ml-8 pl-2">
                <li><span className="font-semibold">Input-Restricted Deque:</span> Insertion only at one end</li>
                <li><span className="font-semibold">Output-Restricted Deque:</span> Deletion only at one end</li>
                <li><span className="font-semibold">Palindrome Checker:</span> Using deque properties</li>
                <li><span className="font-semibold">Priority Deque:</span> Combines deque and priority queue features</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              The double-ended queue is a powerful hybrid data structure that combines the best features of stacks and queues. 
              Its flexibility makes it invaluable for algorithms requiring access to both ends of a dataset, 
              while maintaining efficient constant-time operations for all key functions.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;