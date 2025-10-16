"use client";
import React, { useState } from "react";

const SingleEndedQueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState("Queue is empty");
  const [isAnimating, setIsAnimating] = useState(false);

  /* ---------- helpers ---------- */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const showOp = async (txt, ms = 800) => {
    setOperation(txt);
    await sleep(ms);
    setOperation(null);
  };

  /* ---------- enqueue (rear) ---------- */
  const enqueueRear = async () => {
    if (!inputValue.trim()) {
      setMessage("Please enter a value");
      return;
    }
    setIsAnimating(true);
    await showOp(`Enqueuing "${inputValue}" at rear …`);
    setQueue((q) => [...q, inputValue]);
    setMessage(`"${inputValue}" added to rear`);
    setInputValue("");
    setIsAnimating(false);
  };

  /* ---------- dequeue (front) ---------- */
  const dequeueFront = async () => {
    if (queue.length === 0) {
      setMessage("Queue is empty!");
      return;
    }
    setIsAnimating(true);
    const front = queue[0];
    await showOp(`Dequeuing "${front}" from front …`);
    setQueue((q) => q.slice(1));
    setMessage(`"${front}" removed from front`);
    setIsAnimating(false);
  };

  /* ---------- peek front ---------- */
  const peekFront = async () => {
    if (queue.length === 0) {
      setMessage("Queue is empty!");
      return;
    }
    setIsAnimating(true);
    setMessage(`Front element: "${queue[0]}"`);
    await sleep(1500);
    setIsAnimating(false);
  };

  /* ---------- peek rear ---------- */
  const peekRear = async () => {
    if (queue.length === 0) {
      setMessage("Queue is empty!");
      return;
    }
    setIsAnimating(true);
    setMessage(`Rear element: "${queue[queue.length - 1]}"`);
    await sleep(1500);
    setIsAnimating(false);
  };

  /* ---------- reset ---------- */
  const reset = () => {
    setQueue([]);
    setInputValue("");
    setOperation(null);
    setMessage("Queue cleared");
  };

  /* ---------- UI ---------- */
  return (
    <main className="container mx-auto px-6 pt-4 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Single-Ended Queue Visualiser (FIFO)
      </p>

      <div className="max-w-4xl mx-auto">
        {/* ----- Controls card ----- */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          {/* Value input + Enqueue */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 p-3 border dark:border-gray-700 rounded-lg dark:bg-neutral-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isAnimating}
              onKeyDown={(e) => e.key === "Enter" && enqueueRear()}
            />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={enqueueRear}
              disabled={isAnimating}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg disabled:opacity-50 transition-all"
            >
              Enqueue Rear
            </button>
            <button
              onClick={dequeueFront}
              disabled={isAnimating || queue.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg disabled:opacity-50 transition-all"
            >
              Dequeue Front
            </button>
            <button
              onClick={peekFront}
              disabled={isAnimating || queue.length === 0}
              className="bg-green-500 text-black px-4 py-3 rounded-lg disabled:opacity-50 transition-all"
            >
              Peek Front
            </button>
            <button
              onClick={peekRear}
              disabled={isAnimating || queue.length === 0}
              className="bg-green-500 text-black px-4 py-3 rounded-lg disabled:opacity-50 transition-all"
            >
              Peek Rear
            </button>
            <button
              onClick={reset}
              disabled={isAnimating}
              className="bg-red-500 text-white px-4 py-3 rounded-lg disabled:opacity-50 transition-all"
            >
              Reset
            </button>
          </div>

          {/* Status banners */}
          <div className="flex flex-col gap-3 mt-4 items-center">
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
                className={`p-3 rounded-lg ${
                  message.includes("added")
                    ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
                    : message.includes("removed") || message.includes("element:")
                    ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800"
                    : "bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                } flex items-center gap-2 justify-center`}
              >
                <span>{message}</span>
              </div>
            )}
          </div>
        </div>

        {/* ----- Visualisation card (hidden when empty) ----- */}
        {queue.length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-center">Queue Visualisation</h2>

            <div className="flex items-center gap-3 w-full justify-center">
              {/* Front pointer */}
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
                    className={`transition-all duration-300 ${
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

              {/* Rear pointer */}
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

export default SingleEndedQueueVisualizer;