const content = () => {
  const paragraph = [
    `Implementing a Queue using a linked list provides dynamic memory allocation and efficient insertion/removal operations. Unlike array implementation, linked list queues don't have fixed capacity limitations and can grow dynamically as needed.`,
    `Each node in the linked list contains the data and a pointer to the next node. The front pointer points to the first node (for dequeue), while the rear pointer points to the last node (for enqueue).`,
    `Linked list queues are particularly useful when the maximum size isn't known in advance or when frequent insertions/deletions are required.`,
  ];

  const implementationSteps = [
    { points: "Define a Node class with data and next pointer attributes" },
    { points: "Create Queue class with front and rear pointers initialized to null" },
    { points: "Implement enqueue by adding nodes at the rear" },
    { points: "Implement dequeue by removing nodes from the front" },
    { points: "Maintain proper pointer connections during operations" },
  ];

  const llImplementationCode = [
    { code: "class Node {" },
    { code: "  constructor(data) {" },
    { code: "    this.data = data;" },
    { code: "    this.next = null;" },
    { code: "  }" },
    { code: "}" },
    { code: "" },
    { code: "class LinkedListQueue {" },
    { code: "  constructor() {" },
    { code: "    this.front = null;" },
    { code: "    this.rear = null;" },
    { code: "    this.size = 0;" },
    { code: "  }" },
    { code: "" },
    { code: "  isEmpty() {" },
    { code: "    return this.front === null;" },
    { code: "  }" },
  ];

  const enqueueAlgorithm = [
    { points: "Create a new node with the given data" },
    { points: "If queue is empty, set both front and rear to the new node" },
    { points: "Else, set rear.next to the new node and update rear pointer" },
    { points: "Increment the size counter" },
  ];

  const dequeueAlgorithm = [
    { points: "Check if queue is empty (front === null)" },
    { points: "Store the front node to return later" },
    { points: "Move front pointer to front.next" },
    { points: "If front becomes null (queue is now empty), set rear to null" },
    { points: "Decrement the size counter" },
    { points: "Return the stored node's data" },
  ];

  const complexity = [
    { points: "Enqueue Operation: O(1) - Constant time to add at tail" },
    { points: "Dequeue Operation: O(1) - Constant time to remove from head" },
    { points: "Peek Operation: O(1) - Direct access via front pointer" },
    { points: "Space Usage: O(n) - Linear space for storing elements plus pointer overhead" },
  ];

  const prosCons = [
    { points: "Pros: No fixed size limitation - grows dynamically" },
    { points: "Pros: Efficient O(1) operations for both enqueue and dequeue" },
    { points: "Pros: No wasted memory (only allocates what's needed)" },
    { points: "Cons: Extra memory for node pointers (next references)" },
    { points: "Cons: Not cache-friendly (nodes may be scattered in memory)" },
  ];

  const visualization = [
    { step: "Initial empty queue:", state: "front → null, rear → null" },
    { step: "Enqueue(10):", state: "front → [10|•] → null, rear → [10|•]" },
    { step: "Enqueue(20):", state: "front → [10|•] → [20|•] → null, rear → [20|•]" },
    { step: "Enqueue(30):", state: "front → [10|•] → [20|•] → [30|•] → null, rear → [30|•]" },
    { step: "Dequeue():", state: "Returns 10, front → [20|•] → [30|•] → null, rear → [30|•]" },
  ];

  return (
    <main className="max-w-4xl mx-auto">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Queue Linked List Implementation Overview */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Queue Implementation Using Linked List
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[0]}
            </p>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Implementation Steps
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {implementationSteps.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Basic Structure */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Basic Class Structure
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                {llImplementationCode.map((item, index) => (
                  <div key={index}>{item.code}</div>
                ))}
              </code>
            </pre>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Note:</strong> Each node contains the data and a reference to the next node. The queue maintains references to both ends (front and rear) for efficient operations.
              </p>
            </div>
          </div>
        </section>

        {/* Enqueue Algorithm */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Enqueue Algorithm
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {enqueueAlgorithm.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>
            <div className="mt-4 flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Before Enqueue:</div>
                  <div className="flex items-center">
                    <div className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded">front → [A|•] → [B|•] → null</div>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">After Enqueue(C):</div>
                  <div className="flex items-center">
                    <div className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded">front → [A|•] → [B|•] → [C|•] → null</div>
                    <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">(rear updated)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dequeue Algorithm */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Dequeue Algorithm
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {dequeueAlgorithm.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>
            <div className="mt-4 flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Before Dequeue:</div>
                  <div className="flex items-center">
                    <div className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded">front → [A|•] → [B|•] → [C|•] → null</div>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">After Dequeue():</div>
                  <div className="flex items-center">
                    <div className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded">front → [B|•] → [C|•] → null</div>
                    <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">(returns A)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visualization */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Operation Visualization
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Step</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Queue State</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {visualization.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.step}</td>
                    <td className="px-4 py-2 text-sm font-mono text-gray-900 dark:text-gray-200">{item.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Time Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time & Space Complexity
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {complexity.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {item.points.split(':')[0]}:
                  </span>
                  <span className="ml-2">{item.points.split(':')[1]}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Pros and Cons
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {prosCons.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Additional Info */}
        <section className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">When to Use Linked List Queue</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph[2]}
              </p>
              <ul className="mt-2 space-y-1 list-disc pl-5 marker:text-blue-500 dark:marker:text-blue-400">
                <li className="text-gray-700 dark:text-gray-300">When the maximum queue size is unpredictable</li>
                <li className="text-gray-700 dark:text-gray-300">When memory efficiency is more important than cache performance</li>
                <li className="text-gray-700 dark:text-gray-300">In applications with frequent dynamic memory allocation/deallocation</li>
              </ul>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default content;