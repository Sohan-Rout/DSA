"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/navbarinner";
import Footer from "@/app/components/footer";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState("Queue ready");
  const [isAnimating, setIsAnimating] = useState(false);

  const enqueue = () => {
    if (!inputValue.trim()) {
      setMessage("Please enter a value");
      return;
    }

    setIsAnimating(true);
    setOperation(`Enqueuing "${inputValue}" to rear...`);

    setTimeout(() => {
      setQueue((prev) => [...prev, inputValue]);
      setOperation(null);
      setMessage(`"${inputValue}" added to rear`);
      setInputValue("");
      setIsAnimating(false);
    }, 1000);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage("Queue is empty!");
      return;
    }

    setIsAnimating(true);
    const dequeuedValue = queue[0];
    setOperation(`Dequeuing "${dequeuedValue}" from front...`);

    setTimeout(() => {
      setQueue((prev) => prev.slice(1));
      setOperation(null);
      setMessage(`"${dequeuedValue}" removed from front`);
      setIsAnimating(false);
    }, 1000);
  };

  const reset = () => {
    setQueue([]);
    setInputValue("");
    setOperation(null);
    setMessage("Queue reset");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black dark:text-white">
      <Navbar />
      <main className="container mx-auto mt-10 px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-blue-600">Queue</span> Visualizer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Visualize First-In-First-Out (FIFO) operations in real-time
            </p>
          </div>

          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                className="flex-1 p-3 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isAnimating}
                onKeyPress={(e) => e.key === "Enter" && enqueue()}
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full sm:w-auto">
                <button
                  onClick={enqueue}
                  disabled={isAnimating}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <span>Enqueue</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={dequeue}
                  disabled={isAnimating || queue.length === 0}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-base font-medium leading-none">
                    Dequeue
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 10-2 0v3.586L5.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L9 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  onClick={reset}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg disabled:opacity-50 transition-all col-span-2 sm:col-span-1 flex items-center justify-center gap-2"
                  disabled={isAnimating}
                >
                  <span className="text-base font-medium leading-none">
                    Reset
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Status indicators */}
            <div className="flex flex-col gap-3">
              {operation && (
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{operation}</span>
                </div>
              )}

              <div
                className={`p-3 rounded-lg ${
                  message.includes("added")
                    ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
                    : message.includes("removed")
                    ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                } flex items-center gap-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {message.includes("added") ? (
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  ) : message.includes("removed") ? (
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
                <span>{message}</span>
              </div>
            </div>
          </div>

          {/* Queue Visualization */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Queue Visualization</h2>

            {/* Queue elements */}
            <div className="relative">
              <div className="flex justify-center items-center gap-4 min-h-[200px] flex-wrap">
                {queue.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg w-full">
                    Queue is empty - add some elements!
                  </div>
                ) : (
                  <div className="w-full">
                    {/* Front and Rear indicators above elements */}
                    <div className="flex justify-between mb-2 px-4">
                      <div className="text-blue-600 dark:text-blue-400 font-medium flex flex-col items-center">
                        <span>Front</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-green-600 dark:text-green-400 font-medium flex flex-col items-center">
                        <span>Rear</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Queue elements in a horizontal line */}
                    <div className="flex justify-center items-center gap-4">
                      {queue.map((item, index) => (
                        <div
                          key={index}
                          className={`relative flex flex-col items-center transition-all duration-300 ${
                            index === 0 && operation?.includes("Dequeuing")
                              ? "animate-pulse scale-110"
                              : index === queue.length - 1 &&
                                operation?.includes("Enqueuing")
                              ? "animate-bounce"
                              : ""
                          }`}
                        >
                          {/* Queue element */}
                          <div
                            className={`w-24 h-24 rounded-lg shadow-md flex items-center justify-center text-lg font-medium border-2 ${
                              index === 0
                                ? "border-blue-300 dark:border-blue-700"
                                : index === queue.length - 1
                                ? "border-green-300 dark:border-green-700"
                                : "border-gray-200 dark:border-gray-600"
                            } bg-white dark:bg-gray-700`}
                          >
                            {item}
                          </div>

                          {/* Show both pointers if they point to same element */}
                          {queue.length === 1 && (
                            <div className="absolute -bottom-8 w-full flex justify-between px-4">
                              <span className="text-blue-600 dark:text-blue-400 text-sm">
                                Front
                              </span>
                              <span className="text-green-600 dark:text-green-400 text-sm">
                                Rear
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* FIFO Explanation */}
            <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                How Queue Works (FIFO Principle)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h4 className="font-semibold">Enqueue Operation</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    New elements are added to the{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      rear
                    </strong>{" "}
                    (end) of the queue. The rear pointer moves forward to
                    accommodate new items.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2 mb-2 text-yellow-600 dark:text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h4 className="font-semibold">Dequeue Operation</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Elements are removed from the{" "}
                    <strong className="text-yellow-600 dark:text-yellow-400">
                      front
                    </strong>{" "}
                    (start) of the queue. The front pointer moves forward to the
                    next item.
                  </p>
                </div>
              </div>
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h4 className="font-semibold">First-In-First-Out (FIFO)</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  The first element added to the queue will be the first one to
                  be removed. This is different from a stack which follows
                  Last-In-First-Out (LIFO).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="bg-gray-700 z-10 h-[1px]"></div>
      <Footer />
    </div>
  );
};

export default QueueVisualizer;