const Content = () => {
    return (
      <main className="px-4 sm:px-4 lg:px-8">
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-4 sm:mt-8 mb-6 sm:mb-8 mx-auto max-w-4xl">
          <div className="p-4 sm:p-6">
            {/* Header Section */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
                What is Stack implementation using Linked List?
              </h1>
              <p className="text-sm sm:text-base dark:text-gray-300 text-black">
                A stack implemented using a linked list follows the <span className="dark:text-amber-500 text-purple-600">LIFO (Last In First Out)</span> principle. 
                Unlike array implementation, linked list stacks dynamically allocate memory for each element and don't have size limitations (until memory is exhausted).
              </p>
            </div>
  
            {/* Core Operations - Responsive Grid */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl mb-3 underline decoration-blue-500 underline-offset-4">
                Core Stack Operations
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {['push(item)', 'pop()', 'peek()', 'isEmpty()', 'size()'].map((op) => (
                  <div key={op} className="bg-gray-400/50 dark:bg-gray-700 p-2 rounded text-center">
                    <span className="text-sm sm:text-base dark:text-amber-500 text-purple-600 font-mono">{op}</span>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Algorithm Steps - Responsive Grid Layout */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl mb-4 underline decoration-blue-500 underline-offset-4">
                Algorithmic Steps
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Algorithm 1 - Stack Basics */}
                <div className="border-2 border-purple-500 dark:border-amber-500 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
                  <h2 className="text-lg sm:text-xl mb-3 font-bold text-center text-purple-600 dark:text-amber-500">
                    Stack Basic Operations
                  </h2>
                  
                  <div className="space-y-4">
                    {/* Initialize Stack */}
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">Initialize Stack</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                        <li>Create a head pointer initialized to null</li>
                        <li>Optional: Maintain a size counter initialized to 0</li>
                      </ol>
                    </div>
  
                    {/* Push Operation */}
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">push()</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                        <li>Create a new node with the given data</li>
                        <li>Set new node's next pointer to current head</li>
                        <li>Update head to point to the new node</li>
                        <li>Increment size counter (if maintained)</li>
                      </ol>
                    </div>
  
                    {/* Pop Operation */}
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">pop()</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                        <li>Check if stack is empty (head is null)</li>
                        <li>If empty, return "Stack Underflow"</li>
                        <li>Store current head node in a temporary variable</li>
                        <li>Update head to point to the next node</li>
                        <li>Decrement size counter (if maintained)</li>
                        <li>Return data from the temporary node</li>
                      </ol>
                    </div>
                  </div>
                </div>
  
                {/* Algorithm 2 - Helper Operations */}
                <div className="border-2 border-purple-500 dark:border-amber-500 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
                  <h2 className="text-lg sm:text-xl mb-3 font-bold text-center text-purple-600 dark:text-amber-500">
                    Stack Helper Operations
                  </h2>
                  
                  <div className="space-y-4">
                    {/* Peek Operation */}
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">peek()</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                        <li>Check if stack is empty (head is null)</li>
                        <li>If empty, return null</li>
                        <li>Return data from head node without removal</li>
                      </ol>
                    </div>
  
                    {/* isEmpty Operation */}
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">isEmpty()</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                        <li>Return true if head is null</li>
                        <li>Return false otherwise</li>
                      </ol>
                    </div>
  
                    {/* Size Operation */}
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">size()</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                        <li>If size counter is maintained, return its value</li>
                        <li>Otherwise, traverse the list and count nodes</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Visual Representation - Responsive */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl mb-3 underline decoration-blue-500 underline-offset-4">
                Visual Representation
              </h1>
              <div className="flex flex-col items-center">
                <div className="w-full sm:w-80">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-8 border border-gray-400 flex items-center justify-center">Head</div>
                      <div className="w-8 h-1 bg-gray-400"></div>
                      <div className="w-20 h-12 border border-gray-400 rounded flex flex-col items-center justify-center">
                        <div>8</div>
                        <div className="text-xs">(top)</div>
                      </div>
                    </div>
                    <div className="w-8 h-4 bg-gray-400 transform rotate-90"></div>
                    <div className="w-20 h-12 border border-gray-400 rounded flex items-center justify-center">17</div>
                    <div className="w-8 h-4 bg-gray-400 transform rotate-90"></div>
                    <div className="w-20 h-12 border border-gray-400 rounded flex items-center justify-center">42</div>
                    <div className="w-8 h-4 bg-gray-400 transform rotate-90"></div>
                    <div className="w-20 h-12 border border-gray-400 rounded flex items-center justify-center">null</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm mt-2 text-center">
                  Stack after operations: push(42), push(17), push(8)
                </div>
              </div>
            </div>
  
            {/* Time Complexity - Responsive Table */}
            <div className="mb-6 overflow-x-auto">
              <h1 className="text-xl sm:text-2xl mb-3 underline decoration-blue-500 underline-offset-4">
                Time Complexity
              </h1>
              <div className="min-w-full">
                <table className="w-full sm:w-auto border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="border border-gray-400 p-2 text-sm sm:text-base">Operation</th>
                      <th className="border border-gray-400 p-2 text-sm sm:text-base">Complexity</th>
                      <th className="border border-gray-400 p-2 text-sm sm:text-base hidden sm:table-cell">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['push()', 'O(1)', 'Only head pointer modification'],
                      ['pop()', 'O(1)', 'Only head pointer modification'],
                      ['peek()', 'O(1)', 'Single node access'],
                      ['isEmpty()', 'O(1)', 'Head pointer check'],
                      ['size()', 'O(1) or O(n)', 'Depends on counter implementation']
                    ].map(([op, comp, reason], index) => (
                      <tr key={op} className={index % 2 === 0 ? '' : 'bg-gray-100 dark:bg-gray-800'}>
                        <td className="border border-gray-400 p-2 text-sm sm:text-base">{op}</td>
                        <td className="border border-gray-400 p-2 text-sm sm:text-base dark:text-amber-500 text-purple-600">{comp}</td>
                        <td className="border border-gray-400 p-2 text-sm sm:text-base hidden sm:table-cell">{reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
  
            {/* Key Characteristics - Responsive */}
            <div>
              <h1 className="text-xl sm:text-2xl mb-3 underline decoration-blue-500 underline-offset-4">
                Key Characteristics
              </h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                {[
                  'Dynamic Size: No fixed capacity (grows as needed)',
                  'Memory Efficiency: Uses only needed memory',
                  'No Wasted Space: Unlike array implementation',
                  'Extra Memory: Requires space for pointers',
                  'Flexibility: Can grow until memory exhausted'
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="dark:text-amber-500 text-purple-600 mr-1">*</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Comparison Section */}
            <div className="mt-6">
              <h1 className="text-xl sm:text-2xl mb-3 underline decoration-blue-500 underline-offset-4">
                Linked List vs Array Implementation
              </h1>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="border border-gray-400 p-2 text-sm sm:text-base">Feature</th>
                      <th className="border border-gray-400 p-2 text-sm sm:text-base">Linked List</th>
                      <th className="border border-gray-400 p-2 text-sm sm:text-base">Array</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Memory Usage', 'Extra for pointers', 'Fixed size, may be wasted'],
                      ['Dynamic Size', 'Yes', 'No (unless resized)'],
                      ['Memory Allocation', 'Dynamic', 'Static (usually)'],
                      ['Access Time', 'O(1) for top', 'O(1) for all'],
                      ['Implementation Complexity', 'Slightly more complex', 'Simpler']
                    ].map(([feature, ll, arr], index) => (
                      <tr key={feature} className={index % 2 === 0 ? '' : 'bg-gray-100 dark:bg-gray-800'}>
                        <td className="border border-gray-400 p-2 text-sm sm:text-base">{feature}</td>
                        <td className="border border-gray-400 p-2 text-sm sm:text-base dark:text-amber-500 text-purple-600">{ll}</td>
                        <td className="border border-gray-400 p-2 text-sm sm:text-base dark:text-amber-500 text-purple-600">{arr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  };
  
  export default Content;