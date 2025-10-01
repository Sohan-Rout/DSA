const InfixToPrefixContent = () => {
  const paragraph = [
    `Prefix notation (also called Polish Notation) is a way of writing expressions where the operator comes before the operands.`,
    `For example, the infix expression 3 + 4 becomes + 3 4 in prefix. It removes the need for parentheses by using operator order directly.`,
    `Note: Higher precedence means the operation will happen first. Exponentiation (^) is evaluated right-to-left, while others are left-to-right.`,
  ];

  const steps = [
    { points : "Reverse the infix expression, while keeping the positions of parentheses correct." },
    { points : "Replace ( with ) and vice-versa." },
    { points : "Convert the reversed expression to postfix using a stack." },
    { points : "Finally, reverse the postfix expression to get the prefix expression." },
  ];

  const example = [
    { points : "Infix: (A + B) * (C - D)" },
    { points : "Step 1: Reverse → (D - C) * (B + A)" },
    { points : "Step 2: Convert to postfix → D C - B A + *" },
    { points : "Step 3: Reverse → * + A B - C D" },
  ];

  return (
    <main className="max-w-4xl mx-auto">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Prefix Notation? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Prefix Notation?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[0]}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              {paragraph[1]}
            </p>
          </div>
        </section>

        {/* Infix to Prefix Conversion Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Infix to Prefix Conversion Steps
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {steps.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <span className="font-medium dark:text-amber-500 text-purple-600">
                Example:
              </span>
              <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                {example.map((item, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">
                    {item.points}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Operator Precedence Table */}
        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Operator Precedence Table
          </h1>
          <div className="prose dark:prose-invert max-w-none overflow-x-auto">
            <table className="min-w-full border-collapse border border-blue-700">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-900/20">
                  <th className="border border-blue-700 px-4 py-2 font-semibold">
                    Operator
                  </th>
                  <th className="border border-blue-700 px-4 py-2 font-semibold">
                    Meaning
                  </th>
                  <th className="border border-blue-700 px-4 py-2 font-semibold">
                    Precedence
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    ( )
                  </td>
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    Parentheses
                  </td>
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    Highest
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/20">
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    ^ %
                  </td>
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    Exponentiation / Modulus
                  </td>
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    2
                  </td>
                </tr>
                <tr>
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    * /
                  </td>
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    Multiplication / Division
                  </td>
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    3
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/20">
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    + -
                  </td>
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    Addition / Subtraction
                  </td>
                  <td className="border border-blue-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                    4 (Lowest)
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {paragraph[2]}
            </p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default InfixToPrefixContent;