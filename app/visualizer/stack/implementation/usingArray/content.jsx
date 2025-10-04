"use client";
import React from "react";
import { motion } from "framer-motion";
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
    { points: "Check if stack is empty" },
    { points: "If empty, return null" },
    { points: "Return array[top] without removal" },
  ];

  const isEmpty = [
    { points: "Return true if top pointer is -1" },
    { points: "Return false otherwise" },
  ];

  const initialize = [
    { points: "Create an empty array to store elements" },
    { points: "Initialize top pointer/index to -1" },
    { points: "Optional: Set maximum size limit" },
  ];

  const isFull = [
    { points: "Return true if top equals (max_size - 1)" },
    { points: "Return false otherwise" },
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
        {/* -------  HEADER  ------- */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Stack Implementation Using Array?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A stack is a linear data structure that follows the LIFO (Last In First Out) principle. Arrays provide a simple way to implement stack operations with constant time complexity.
            </p>
          </div>
        </section>

        {/* -------  ALGORITHMIC STEPS – LIFT CARDS  ------- */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Algorithmic Steps
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Operations */}
            <div className="rounded-lg p-4 bg-white dark:bg-neutral-950 shadow-md">
              <h2 className="text-lg sm:text-xl mb-3 font-bold text-center">Stack Basic Operations</h2>
              <div className="space-y-4">
                {[{t:"Initialize Stack", s:initialize}, {t:"push()", s:push}, {t:"pop()", s:pop}].map(
                  ({t, s}, idx) => (
                    <motion.div
                      key={t}
                      initial={{ y: 40, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ type: "spring", stiffness: 120, delay: idx * 0.1 }}
                      whileHover={{ y: -4, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-900
                                 border border-transparent hover:border-blue-300
                                 dark:hover:border-blue-500 transition"
                    >
                      <span className="inline-block mb-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-blue-900 text-blue-700 dark:text-indigo-200">
                        Step {idx + 1}
                      </span>
                      <h3 className="font-semibold mb-2">{t}</h3>
                      <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                        {s.map((p, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300 pl-2">
                            {p.points}
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Helper Operations */}
            <div className="rounded-lg p-4 bg-white dark:bg-neutral-950 shadow-md">
              <h2 className="text-lg sm:text-xl mb-3 font-bold text-center">Stack Helper Operations</h2>
              <div className="space-y-4">
                {[{t:"peek()", s:peek}, {t:"isEmpty()", s:isEmpty}, {t:"isFull()", s:isFull}].map(
                  ({t, s}, idx) => (
                    <motion.div
                      key={t}
                      initial={{ y: 40, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ type: "spring", stiffness: 120, delay: idx * 0.1 }}
                      whileHover={{ y: -4, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-900
                                 border border-transparent hover:border-blue-300
                                 dark:hover:border-blue-600 transition"
                    >
                      <span className="inline-block mb-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-blue-900 text-blue-700 dark:text-indigo-200">
                        Step {idx + 1}
                      </span>
                      <h3 className="font-semibold mb-2">{t}</h3>
                      <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
                        {s.map((p, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300 pl-2">
                            {p.points}
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time Complexity
          </h1>
          <div className="prose dark:prose-invert max-w-none overflow-x-auto">
            <table className="min-w-full border-collapse border border-blue-400">
              <thead>
                <tr className="bg-blue-100 dark:bg-blue-900">
                  <th className="border border-blue-400 p-3 font-semibold">Operation</th>
                  <th className="border border-blue-400 p-3 font-semibold">Complexity</th>
                  <th className="border border-blue-400 p-3 font-semibold hidden sm:table-cell">Reason</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["push()", "O(1)", "Single array access"],
                  ["pop()", "O(1)", "Single array access"],
                  ["peek()", "O(1)", "Single array access"],
                  ["isEmpty()", "O(1)", "Pointer comparison"],
                ].map(([op, comp, reason], index) => (
                  <tr key={op} className={index % 2 === 0 ? "bg-white dark:bg-neutral-950" : "bg-blue-50 dark:bg-neutral-900"}>
                    <td className="border border-blue-400 p-3">{op}</td>
                    <td className="border border-blue-400 p-3 font-mono">{comp}</td>
                    <td className="border border-blue-400 p-3 hidden sm:table-cell">{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

      {/* Mobile iframe at bottom */}
      <div className="block md:hidden w-full">
        {mounted && (
          <iframe
            key={theme}
            src={
              theme === "dark"
                ? "https://hw.glich.co/resources/embed/daily/dsa?theme=dark"
                : "https://hw.glich.co/resources/embed/daily/dsa?theme=light"
            }
            width="100%"
            height="320"
            title="Daily DSA Challenge"
          ></iframe>
        )}
        <div className="flex justify-center pb-8">
          <span className="text-xs">
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
    </main>
  );
};

export default content;