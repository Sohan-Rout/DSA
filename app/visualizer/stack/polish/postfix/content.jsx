"use client";
import { useEffect, useState } from "react";

const content = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
    };

    updateTheme();
    setMounted(true);

    window.addEventListener("storage", updateTheme);
    window.addEventListener("themeChange", updateTheme);

    return () => {
      window.removeEventListener("storage", updateTheme);
      window.removeEventListener("themeChange", updateTheme);
    };
  }, []);

  const paragraph = [
    `Postfix notation (also called Reverse Polish Notation) is a way of writing expressions where the operator comes after the operands.`,
    `For example, the infix expression 3 + 4 becomes 3 4 + in postfix. It removes the need for parentheses by making operator precedence explicit through position.`,
    `Note: Higher precedence means the operation will happen first. When operators have equal precedence, they are evaluated left-to-right (except for exponentiation which is right-to-left).`,
  ];

  const steps = [
    { points : "Initialize an empty stack and an empty output string." },
    { points : "Scan the infix expression from left to right." },
    { points : "If the element is an operand, add it to the output." },
    { points : "If the element is a '(', push it onto the stack." },
    { points : `If the element is a ')', pop from the stack and add to output until '(' is encountered.` },
    { points : "If the element is an operator, pop from the stack all operators with higher or equal precedence, then push the current operator." },
    { points : "After scanning, pop all remaining operators from the stack." },
  ];

  const example = [
    { points : "Infix: (A + B) * (C - D)" },
    { points : `Step 1: Push '(' → Stack: [ '(' ], Output: ''` },
    { points : "Step 2: Add 'A' → Output: 'A'" },
    { points : "Step 3: Push '+' → Stack: [ '(', '+' ]" },
    { points : "Step 4: Add 'B' → Output: 'A B'" },
    { points : "Step 5: Pop until '(' → Stack: [ ], Output: 'A B +'" },
    { points : "Step 6: Continue similarly for the rest → Final Postfix: A B + C D - *" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 md:gap-4">
      <div className="col-span-1">
        <div className="hidden md:block">
          {mounted && (
            <iframe
              key={theme}
              src={
                theme === "dark"
                  ? "https://hw.glich.co/resources/embed/daily/dsa?theme=dark"
                  : "https://hw.glich.co/resources/embed/daily/dsa?theme=light"
              }
              width="100%"
              height="400"
              title="Daily DSA Challenge"
            ></iframe>
          )}
        </div>
        <div className="flex justify-center">
          <span className="text-xs hidden md:block">
            Daily DSA Challenge by{" "}
            <a
              href="https://hw.glich.co/resources/daily"
              target="_blank"
              className="underline hover:text-blue-500 duration-300"
            >
              Hello World
            </a>
          </span>
        </div>
      </div>
      <article className="col-span-4 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Postfix Notation? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Postfix Notation?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            {paragraph.map((text, idx) => (
              <p
                key={idx}
                className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
              >
                {text}
              </p>
            ))}
          </div>
        </section>

        {/* Infix to Postfix Conversion Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Infix to Postfix Conversion Steps
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {steps.map((item, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <span className="font-medium">
                Example:
              </span>
              <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                {example.map((item, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-gray-400">
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
  
  export default content;