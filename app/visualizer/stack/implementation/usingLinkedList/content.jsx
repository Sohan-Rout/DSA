const Content = () => {
  const paragraph = [
    `A stack implemented using a linked list follows the LIFO (Last In First Out) principle. Unlike array implementation, linked list stacks dynamically allocate memory for each element and don't have size limitations (until memory is exhausted).`,
  ];

  const opeartions = [
    { points : "Initialize Stack",
      subpoints : [
        "Create a head pointer initialized to null.",
        "Optional: Maintain a size counter initialized to 0.",
      ],
     },
    { points : "push()",
      subpoints : [
        "Create a new node with the given data.",
        "Set new node's next pointer to current head.",
        "Update head to point to the new node.",
        "Increment size counter (if maintained).",
      ],
     },
    { points : "pop()",
      subpoints : [
        "Check if stack is empty (head is null).",
        `If empty, return "Stack Underflow".`,
        "Store current head node in a temporary variabl.",
        "Update head to point to the next node.",
        "Decrement size counter (if maintained).",
        "Return data from the temporary node.",
      ],
     },
  ];

  const helper = [
    { points : "peek()",
      subpoints : [
        "Check if stack is empty (head is null).",
        "If empty, return null.",
        "Return data from head node without removal.",
      ],
     },
    { points : "isEmpty()",
      subpoints : [
        "Return true if head is null.",
        "Return false otherwise.",
      ],
     },
    { points : "size()",
      subpoints : [
        "If size counter is maintained, return its value.",
        "Otherwise, traverse the list and count nodes.",
      ],
     },
  ];

    return (
     <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* Header Section */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is Stack Implementation Using Linked List?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[0]}
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
        {["push(item)", "pop()", "peek()", "isEmpty()", "size()"].map((op) => (
          <div
            key={op}
            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center shadow-sm"
          >
            <span className="text-sm sm:text-base font-mono">
              {op}
            </span>
          </div>
        ))}
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
        <div className="border-2 border-gray-400 dark:border-gray-500 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-lg sm:text-xl mb-3 font-bold text-center">
            Stack Basic Operations
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <ul className="space-y-3">
                {opeartions.map((item, index) => (
                  <li key={index}>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      {item.points}
                    </h3>
                    {item.subpoints && (
                      <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                        {item.subpoints.map((subitem, subindex) => (
                          <li key={subindex} className="text-gray-700 dark:text-gray-300 pl-2">
                            {subitem}
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stack Helper Operations */}
        <div className="border-2 border-gray-400 dark:border-gray-500 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-lg sm:text-xl mb-3 font-bold text-center">
            Stack Helper Operations
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <ul className="space-y-3">
                {helper.map((item, index) => (
                  <li key={index}>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      {item.points}
                    </h3>
                    {item.subpoints && (
                      <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                        {item.subpoints.map((subitem, subindex) => (
                          <li key={subindex} className="text-gray-700 dark:text-gray-300 pl-2">
                            {subitem}
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ul>
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
        <div className="w-full sm:w-80">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center">
              <div className="w-16 h-8 border border-gray-400 flex items-center justify-center">
                Head
              </div>
              <div className="w-8 h-1 bg-gray-400"></div>
              <div className="w-20 h-12 border border-gray-400 rounded flex flex-col items-center justify-center">
                <div>8</div>
                <div className="text-xs">(top)</div>
              </div>
            </div>
            <div className="w-8 h-4 bg-gray-400 transform rotate-90"></div>
            <div className="w-20 h-12 border border-gray-400 rounded flex items-center justify-center">
              17
            </div>
            <div className="w-8 h-4 bg-gray-400 transform rotate-90"></div>
            <div className="w-20 h-12 border border-gray-400 rounded flex items-center justify-center">
              42
            </div>
            <div className="w-8 h-4 bg-gray-400 transform rotate-90"></div>
            <div className="w-20 h-12 border border-gray-400 rounded flex items-center justify-center">
              null
            </div>
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
              ["push()", "O(1)", "Only head pointer modification"],
              ["pop()", "O(1)", "Only head pointer modification"],
              ["peek()", "O(1)", "Single node access"],
              ["isEmpty()", "O(1)", "Head pointer check"],
              ["size()", "O(1) or O(n)", "Depends on counter implementation"],
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
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Key Characteristics
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {[
            "Dynamic Size: No fixed capacity (grows as needed)",
            "Memory Efficiency: Uses only needed memory",
            "No Wasted Space: Unlike array implementation",
            "Extra Memory: Requires space for pointers",
            "Flexibility: Can grow until memory exhausted",
          ].map((item) => (
            <li key={item} className="text-gray-700 dark:text-gray-300 pl-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Comparison Section */}
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Linked List vs Array Implementation
      </h1>
      <div className="prose dark:prose-invert max-w-none overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="border border-gray-400 p-3 font-semibold">Feature</th>
              <th className="border border-gray-400 p-3 font-semibold">Linked List</th>
              <th className="border border-gray-400 p-3 font-semibold">Array</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Memory Usage", "Extra for pointers", "Fixed size, may be wasted"],
              ["Dynamic Size", "Yes", "No (unless resized)"],
              ["Memory Allocation", "Dynamic", "Static (usually)"],
              ["Access Time", "O(1) for top", "O(1) for all"],
              ["Implementation Complexity", "Slightly more complex", "Simpler"],
            ].map(([feature, ll, arr], index) => (
              <tr
                key={feature}
                className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}
              >
                <td className="border border-gray-400 p-3">{feature}</td>
                <td className="border border-gray-400 p-3 font-mono">
                  {ll}
                </td>
                <td className="border border-gray-400 p-3 font-mono">
                  {arr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </article>
</main>
    );
  };
  
  export default Content;