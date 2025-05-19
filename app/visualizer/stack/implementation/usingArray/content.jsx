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
    <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* Header Section */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is Stack Implementation Using Array?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          A stack is a linear data structure that follows the{" "}LIFO (Last In First Out){" "}
          principle. Arrays provide a simple way to implement stack operations
          with constant time complexity.
        </p>
      </div>
    </section>

    {/* Core Operations */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Core Stack Operations
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {["push(item)", "pop()", "peek()", "isEmpty()", "isFull()"].map(
          (op) => (
            <div
              key={op}
              className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center shadow-sm"
            >
              
                {op}
            </div>
          )
        )}
      </div>
    </section>

    {/* Algorithmic Steps */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithmic Steps
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stack Basic Operations */}
        <div className="border-2 border-black dark:border-gray-400 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-lg sm:text-xl mb-3 font-bold text-center">
            Stack Basic Operations
          </h2>

          <div className="space-y-4">
            {/* Initialize Stack */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="font-semibold mb-2">
                Initialize Stack
              </h3>
              <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {initialize.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                    {item.points}
                  </li>
                ))}
              </ol>
            </div>

            {/* Push Operation */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="font-semibold mb-2 ">
                push()
              </h3>
              <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {push.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                    {item.points}
                  </li>
                ))}
              </ol>
            </div>

            {/* Pop Operation */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="font-semibold mb-2 ">
                pop()
              </h3>
              <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {pop.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                    {item.points}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Stack Helper Operations */}
        <div className="border-2 border-black dark:border-gray-400 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-lg sm:text-xl mb-3 font-bold text-center">
            Stack Helper Operations
          </h2>

          <div className="space-y-4">
            {/* Peek Operation */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="font-semibold mb-2">
                peek()
              </h3>
              <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {peek.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                    {item.points}
                  </li>
                ))}
              </ol>
            </div>

            {/* isEmpty Operation */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="font-semibold mb-2">
                isEmpty()
              </h3>
              <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {isEmpty.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                    {item.points}
                  </li>
                ))}
              </ol>
            </div>

            {/* isFull Operation */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="font-semibold mb-2">
                isFull()
              </h3>
              <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                {isFull.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                    {item.points}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Visual Representation */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
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
        <div className="text-sm mt-3 text-center text-gray-700 dark:text-gray-300">
          Stack after operations: push(42), push(17), push(8)
        </div>
      </div>
    </section>

    {/* Time Complexity */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Time Complexity
      </h1>
      <div className="prose dark:prose-invert max-w-none overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="border border-gray-400 p-3 font-semibold">Operation</th>
              <th className="border border-gray-400 p-3 font-semibold">Complexity</th>
              <th className="border border-gray-400 p-3 font-semibold hidden sm:table-cell">
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
                className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}
              >
                <td className="border border-gray-400 p-3">{op}</td>
                <td className="border border-gray-400 p-3 font-mono">
                  {comp}
                </td>
                <td className="border border-gray-400 p-3 hidden sm:table-cell">
                  {reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* Key Characteristics */}
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Key Characteristics
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {[
            "LIFO Principle: Last element added is first removed",
            "Dynamic Size: Can grow until memory limits",
            "Efficiency: All operations work in constant time",
            "Versatility: Foundation for many algorithms",
          ].map((item) => (
            <li key={item} className="text-gray-700 dark:text-gray-300 pl-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  </article>
</main>
  );
};

export default content;