const content = () => {
  const push = [
    { points: "Check if stack is full" },
    { points: 'If full, return "Stack Overflow"' },
    { points: "Increment top pointer" },
    { points: "Store element at array[top]" },
  ];

  const pop = [
    { points: "Check if stack is empty" },
    { points: 'If empty, return "Stack Underflow"' },
    { points: "Access element at array[top]" },
    { points: "Decrement top pointer" },
    { points: "Return the element" },
  ];

  const peek = [
    { points : "Check if stack is empty" },
    { points : "If empty, return null" },
    { points : "Return array[top] without removal" },
  ];

  const isEmpty = [
    { points : "Return true if top pointer is -1" },
    { points : "Return false otherwise" },
  ];

  const initialize = [
    { points : "Create an empty array to store elements" },
    { points : "Initialize top pointer/index to -1" },
    { points : "Optional: Set maximum size limit" },
  ];

  const isFull = [
    { points : "Return true if top equals (max_size - 1)" },
    { points : "Return false otherwise" },
  ];

  return (
    <main className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
      <section className="mt-2 sm:mt-2 mb-6 sm:mb-8 mx-auto max-w-4xl">
        <div className="p-4 sm:p-6">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Stack implementation using array?
            </h1>
            <p className="text-sm sm:text-base dark:text-gray-300 text-black">
              A stack is a linear data structure that follows the{" "}
              <span className="dark:text-amber-500 text-purple-600">
                LIFO (Last In First Out)
              </span>{" "}
              principle. Arrays provide a simple way to implement stack
              operations with constant time complexity.
            </p>
          </div>

          {/* Core Operations - Responsive Grid */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl mb-3 underline decoration-blue-500 underline-offset-4">
              Core Stack Operations
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {["push(item)", "pop()", "peek()", "isEmpty()", "isFull()"].map(
                (op) => (
                  <div
                    key={op}
                    className="bg-gray-400/50 dark:bg-gray-700 p-2 rounded text-center"
                  >
                    <span className="text-sm sm:text-base dark:text-amber-500 text-purple-600 font-mono">
                      {op}
                    </span>
                  </div>
                )
              )}
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
                    <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">
                      Initialize Stack
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                      {initialize.map((item, index) => (
                        <li key={index}>{item.points}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Push Operation */}
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">
                      push()
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                      {push.map((item, index) => (
                        <li key={index}>{item.points}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Pop Operation */}
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">
                      pop()
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                      {pop.map((item, index) => (
                        <li key={index}>{item.points}</li>
                      ))}
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
                    <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">
                      peek()
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                      {peek.map((item, index) => (
                        <li key={index}>{item.points}</li>
                      ))}
                    </ol>
                  </div>

                  {/* isEmpty Operation */}
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">
                      isEmpty()
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                      {isEmpty.map((item, index) => (
                        <li key={index}>{item.points}</li>
                      ))}
                    </ol>
                  </div>

                  {/* isFull Operation */}
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <h3 className="font-semibold mb-1 text-purple-600 dark:text-amber-500">
                      isFull()
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
                      {isFull.map((item, index) => (
                        <li key={index}>{item.points}</li>
                      ))}
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
              <div className="w-full sm:w-64">
                <div className="w-20 h-8 border border-gray-400 mx-auto flex items-center justify-center">
                  42
                </div>
                <div className="w-20 h-8 border border-gray-400 mx-auto flex items-center justify-center">
                  17
                </div>
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
                    <th className="border border-gray-400 p-2 text-sm sm:text-base">
                      Operation
                    </th>
                    <th className="border border-gray-400 p-2 text-sm sm:text-base">
                      Complexity
                    </th>
                    <th className="border border-gray-400 p-2 text-sm sm:text-base hidden sm:table-cell">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["push()", "O(1)", "Single array access"],
                    ["pop()", "O(1)", "Single array access"],
                    ["peek()", "O(1)", "Single array access"],
                    ["isEmpty()", "O(1)", "Pointer comparison"],
                  ].map(([op, comp, reason], index) => (
                    <tr
                      key={op}
                      className={
                        index % 2 === 0 ? "" : "bg-gray-100 dark:bg-gray-800"
                      }
                    >
                      <td className="border border-gray-400 p-2 text-sm sm:text-base">
                        {op}
                      </td>
                      <td className="border border-gray-400 p-2 text-sm sm:text-base dark:text-amber-500 text-purple-600">
                        {comp}
                      </td>
                      <td className="border border-gray-400 p-2 text-sm sm:text-base hidden sm:table-cell">
                        {reason}
                      </td>
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
                "LIFO Principle: Last element added is first removed",
                "Dynamic Size: Can grow until memory limits",
                "Efficiency: All operations work in constant time",
                "Versatility: Foundation for many algorithms",
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <span className="dark:text-amber-500 text-purple-600 mr-1">
                    *
                  </span>
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