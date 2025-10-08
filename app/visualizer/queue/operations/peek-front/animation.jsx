"use client";
import React, { useState } from "react";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  /* ---------- core helpers ---------- */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const showOp = async (text, ms = 1000) => {
    setOperation(text);
    await sleep(ms);
    setOperation(null);
  };

  /* ---------- enqueue ---------- */
  const enqueue = async () => {
    if (!inputValue.trim()) {
      setMessage("Please enter a value");
      return;
    }
    setIsAnimating(true);
    await showOp(`Enqueuing "${inputValue}" to rear...`);
    setQueue((q) => [...q, inputValue]);
    setMessage(`"${inputValue}" added to rear`);
    setInputValue("");
    setIsAnimating(false);
  };

  /* ---------- peek front ---------- */
  const peekFront = () => {
    if (queue.length === 0) {
      setMessage("Queue is empty – nothing to peek");
      return;
    }
    setMessage(`Front element is "${queue[0]}"`);
  };

  /* ---------- random queue ---------- */
  const generateRandomQueue = () => {
    if (isAnimating) return;
    const len = Math.floor(Math.random() * 5) + 3; // 3-7 items
    const nums = Array.from({ length: len }, () =>
      String(Math.floor(Math.random() * 90) + 10)
    ); // 10-99
    setQueue(nums);
    setMessage("Random queue generated");
  };

  /* ---------- reset ---------- */
  const reset = () => {
    if (isAnimating) return;
    setQueue([]);
    setInputValue("");
    setOperation(null);
    setMessage("");
  };

  /* ---------- UI ---------- */
  return (
    <main className="container mx-auto">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Visualize First-In-First-Out (FIFO) operations in real-time
      </p>

      {/* ------- Controls ------- */}
      <div className="flex flex-col items-center">
        <div className="bg-white max-w-4xl dark:bg-neutral-950 p-6 rounded-xl shadow-lg mb-8 border border-gray-200 dark:border-gray-700 w-full flex flex-col items-center">
          {/* input + classic buttons */}

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full sm:w-auto">
              <button
                onClick={generateRandomQueue}
                disabled={isAnimating}
                className="bg-blue-500 text-white px-4 py-3 rounded-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2 col-span-2 sm:col-span-1"
              >
                Random Queue
              </button>
              <button
                onClick={peekFront}
                disabled={isAnimating || queue.length === 0}
                className="bg-green-500 text-black px-4 py-3 rounded-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                Peek Front
              </button>
              <button
                onClick={reset}
                className="bg-red-500 text-white px-4 py-3 rounded-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                disabled={isAnimating}
              >
                Reset
              </button>
            </div>
          </div>

          {/* status / operation banners */}
          <div className="flex flex-col gap-3 w-full items-center">
            {operation && (
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 flex items-center gap-2 justify-center">
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
            {message && (
              <div
                className={`p-3 mt-4 rounded-lg ${
                  message.includes("added")
                    ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
                    : message.includes("removed") || message.includes("Front element")
                    ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800"
                    : "bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                } flex items-center gap-2 justify-center`}
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
                  ) : message.includes("removed") || message.includes("Front element") ? (
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
            )}
          </div>
        </div>

        {/* ------- Queue Visualization (only when not empty) ------- */}
        {queue.length > 0 && (
          <div className="bg-white dark:bg-neutral-950 mb-6 p-6 max-w-4xl rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6 text-center">Queue Visualization</h2>

            {/* Front – items – Rear */}
            <div className="flex items-center gap-3 w-full justify-center">
              {/* Front label */}
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

              {/* Elements */}
              <div className="flex items-center gap-4">
                {queue.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col items-center transition-all duration-300 ${
                      index === 0 && operation?.includes("Dequeuing")
                        ? "animate-pulse scale-110"
                        : index === queue.length - 1 && operation?.includes("Enqueuing")
                        ? "animate-bounce"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-24 h-24 rounded-lg shadow-md flex items-center justify-center text-lg font-medium border-2 ${
                        index === 0
                          ? "border-blue-300 dark:border-blue-700"
                          : index === queue.length - 1
                          ? "border-green-300 dark:border-green-700"
                          : "border-gray-200 dark:border-gray-600"
                      } bg-white dark:bg-neutral-900`}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rear label */}
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
          </div>
        )}
      </div>
    </main>
  );
};

export default QueueVisualizer;