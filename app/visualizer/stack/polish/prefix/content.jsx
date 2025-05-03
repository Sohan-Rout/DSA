const InfixToPrefixContent = () => {
  return (
    <main>
      <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            What is Prefix Notation?
          </h1>
          <p className="ml-4 dark:text-gray-300 text-black">
            Prefix notation (also called <span className="dark:text-amber-500 text-purple-600">Polish Notation</span>) is a way of writing expressions where
            <span className="dark:text-amber-500 text-purple-600"> the operator comes before the operands</span>.
            <br /><br />
            For example, the infix expression <span className="dark:text-amber-500 text-purple-600">3 + 4</span> becomes <span className="dark:text-amber-500 text-purple-600">+ 3 4</span> in prefix.
            <br />
            It removes the need for parentheses by using operator order directly.
          </p>
        </div>

        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            Infix to Prefix Conversion Steps
          </h1>
          <div className="ml-4 dark:text-gray-300 text-black">
            <ol className="list-decimal ml-6">
              <li>
                <span className="dark:text-amber-500 text-purple-600">Reverse the infix expression</span>, while keeping the positions of parentheses correct.
              </li>
              <li>
                <span className="dark:text-amber-500 text-purple-600">Replace</span> ( with ) and vice-versa.
              </li>
              <li>
                <span className="dark:text-amber-500 text-purple-600">Convert the reversed expression to postfix</span> using a stack.
              </li>
              <li>
                <span className="dark:text-amber-500 text-purple-600">Finally, reverse the postfix expression</span> to get the prefix expression.
              </li>
            </ol>
            <br />
            <span className="dark:text-amber-500 text-purple-600">Example:</span>  
            <br />
            Infix: <span className="dark:text-amber-500 text-purple-600">(A + B) * (C - D)</span>
            <br />
            Step 1: Reverse → <span className="dark:text-amber-500 text-purple-600">(D - C) * (B + A)</span>
            <br />
            Step 2: Convert to postfix → <span className="dark:text-amber-500 text-purple-600">D C - B A + *</span>
            <br />
            Step 3: Reverse → <span className="dark:text-amber-500 text-purple-600">* + A B - C D</span>
          </div>
        </div>

        <div className="mt-4 mb-4 ml-4 mr-4 overflow-x-auto">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            Operator Precedence Table
          </h1>
          <div className="ml-4 dark:text-gray-300 text-black">
            <table className="min-w-full border-collapse border border-blue-700">
              <thead>
                <tr>
                  <th className="border border-blue-700 px-4 py-2 bg-blue-600/50">Operator</th>
                  <th className="border border-blue-700 px-4 py-2 bg-blue-600/50">Meaning</th>
                  <th className="border border-blue-700 px-4 py-2 bg-blue-600/50">Precedence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blue-700 px-4 py-2">( )</td>
                  <td className="border border-blue-700 px-4 py-2">Parentheses</td>
                  <td className="border border-blue-700 px-4 py-2">Highest</td>
                </tr>
                <tr>
                  <td className="border border-blue-700 px-4 py-2">^ %</td>
                  <td className="border border-blue-700 px-4 py-2">Exponentiation / Modulus</td>
                  <td className="border border-blue-700 px-4 py-2">2</td>
                </tr>
                <tr>
                  <td className="border border-blue-700 px-4 py-2">* /</td>
                  <td className="border border-blue-700 px-4 py-2">Multiplication / Division</td>
                  <td className="border border-blue-700 px-4 py-2">3</td>
                </tr>
                <tr>
                  <td className="border border-blue-700 px-4 py-2">+ -</td>
                  <td className="border border-blue-700 px-4 py-2">Addition / Subtraction</td>
                  <td className="border border-blue-700 px-4 py-2">4 (Lowest)</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4">
              <span className="dark:text-amber-500 text-purple-600">Note:</span> Higher precedence means the operation will happen first.
              Exponentiation (^) is evaluated right-to-left, while others are left-to-right.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InfixToPrefixContent;