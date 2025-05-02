const content = () => {
    return (
      <main className="px-4 sm:px-6 lg:px-8">
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-4 sm:mt-8 mb-6 sm:mb-8 mx-auto max-w-4xl">
          <div className="p-4 sm:p-6">
            {/* Header Section */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
                What is Stack implementation using array?
              </h1>
              <p className="text-sm sm:text-base dark:text-gray-300 text-black">
                A stack is a linear data structure that follows the <span className="dark:text-amber-500 text-purple-600">LIFO (Last In First Out)</span> principle. 
                Arrays provide a simple way to implement stack operations with constant time complexity.
              </p>
            </div>
  
            {/* Core Operations - Responsive Grid */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl mb-3 underline decoration-blue-500 underline-offset-4">
                Core Stack Operations
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {['push(item)', 'pop()', 'peek()', 'isEmpty()', 'isFull()'].map((op) => (
                  <div key={op} className="bg-gray-400/50 dark:bg-gray-700 p-2 rounded text-center">
                    <span className="text-sm sm:text-base dark:text-amber-500 text-purple-600 font-mono">{op}</span>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Algorithm Steps - Responsive Layout */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl mb-3 underline decoration-blue-500 underline-offset-4">
                Algorithmic Steps
              </h1>
              
              <div className="space-y-6">
                {/* Initialize Stack */}
                <div className="p-3 sm:p-4 rounded-lg">
                  <h2 className="text-lg sm:text-lg mb-2 dark:text-amber-500 text-purple-600 font-semibold">Initialize Stack</h2>
                  <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                    <li className="dark:text-amber-500 text-purple-600"><span className="dark:text-gray-200 text-black">Create an empty array to store elements</span></li>
                    <li className="dark:text-amber-500 text-purple-600"><span className="dark:text-gray-200 text-black">Initialize top pointer/index to -1</span></li>
                    <li className="dark:text-amber-500 text-purple-600"><span className="dark:text-gray-200 text-black">Optional: Set maximum size limit</span></li>
                  </ol>
                </div>
  
                {/* Push Operation */}
                <div className="p-3 sm:p-4 rounded-lg">
                  <h2 className="text-lg sm:text-lg mb-2 dark:text-amber-500 text-purple-600 font-semibold">push()</h2>
                  <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                    <li className="dark:text-amber-500 text-purple-600"><span className="dark:text-gray-200 text-black">Check if stack is full</span></li>
                    <li className="dark:text-amber-500 text-purple-600"><span className="dark:text-gray-200 text-black">If full, return "Stack Overflow"</span></li>
                    <li className="dark:text-amber-500 text-purple-600"><span className="dark:text-gray-200 text-black">Increment top pointer</span></li>
                    <li className="dark:text-amber-500 text-purple-600"><span className="dark:text-gray-200 text-black">Store element at array[top]</span></li>
                  </ol>
                </div>
  
                {/* Pop Operation */}
                <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">3. pop()</h2>
                  <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                    <li>Check if stack is empty</li>
                    <li>If empty, return "Stack Underflow"</li>
                    <li>Access element at array[top]</li>
                    <li>Decrement top pointer</li>
                    <li>Return the element</li>
                  </ol>
                </div>

                {/* Peek Operation */}
                <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">4. peek()</h2>
                  <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                    <li>Check if stack is empty</li>
                    <li>If empty, return null or appropriate indicator</li>
                    <li>Return array[top] without modifying top pointer</li>
                  </ol>
                </div>

                {/* isEmpty Operation */}
                <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">4. isEmpty()</h2>
                  <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                    <li>Return true if top pointer is -1</li>
                    <li>Return false otherwise</li>
                  </ol>
                </div>

                {/* isFull Operation */}
                <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">4. isFull()</h2>
                  <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                    <li>Return true if top equals (max_size - 1)</li>
                    <li>Return false otherwise</li>
                  </ol>
                </div>
            </div>
          </div>
  
          {/* Visual Representation - Responsive */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl mb-3 underline decoration-blue-500 underline-offset-4">
              Visual Representation
            </h1>
            <div className="flex flex-col items-center">
              <div className="w-full sm:w-64">
                <div className="w-20 h-8 border border-gray-400 mx-auto flex items-center justify-center">42</div>
                <div className="w-20 h-8 border border-gray-400 mx-auto flex items-center justify-center">17</div>
                <div className="w-20 h-8 border border-gray-400 mx-auto flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                  8 <span className="text-xs ml-1">(top)</span>
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
                    ['push()', 'O(1)', 'Single array access'],
                    ['pop()', 'O(1)', 'Single array access'],
                    ['peek()', 'O(1)', 'Single array access'],
                    ['isEmpty()', 'O(1)', 'Pointer comparison']
                  ].map(([op, comp, reason], index) => (
                    <tr key={op} className={index % 2 === 0 ? '' : 'bg-gray-100 dark:bg-gray-800'}>
                      <td className="border border-gray-400 p-2 text-sm sm:text-base">{op}</td>
                      <td className="border border-gray-400 p-2 text-sm sm:text-base dark:text-amber-500 text-red-600">{comp}</td>
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
                'LIFO Principle: Last element added is first removed',
                'Dynamic Size: Can grow until memory limits',
                'Efficiency: All operations work in constant time',
                'Versatility: Foundation for many algorithms'
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <span className="dark:text-amber-500 text-red-600 mr-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default content;