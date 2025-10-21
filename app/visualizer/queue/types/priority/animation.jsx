"use client";
import React, { useState } from "react";

const PriorityQueueVisualizer = () => {
  /* ---------- state ---------- */
  const [pq, setPq] = useState([]);          // sorted: [0] = highest priority (min-val)
  const [inputValue, setInputValue] = useState("");
  const [inputPriority, setInputPriority] = useState("");
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState("Priority queue is empty");
  const [isAnimating, setIsAnimating] = useState(false);

  /* ---------- helpers ---------- */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const showOp = async (txt, ms = 800) => {
    setOperation(txt);
    await sleep(ms);
    setOperation(null);
  };

  /* ---------- insert ---------- */
  const insert = async () => {
    if (!inputValue.trim() || inputPriority === "") {
      setMessage("Please enter both value and priority");
      return;
    }
    const pri = Number(inputPriority);
    if (isNaN(pri)) {
      setMessage("Priority must be a number");
      return;
    }
    setIsAnimating(true);
    await showOp(`Inserting "${inputValue}" with priority ${pri} …`);
    const newEl = { val: inputValue, pri };
    const newPq = [...pq, newEl].sort((a, b) => a.pri - b.pri);
    setPq(newPq);
    setMessage(`"${inputValue}" inserted`);
    setInputValue("");
    setInputPriority("");
    setIsAnimating(false);
  };

  /* ---------- extract-min ---------- */
  const extractMin = async () => {
    if (pq.length === 0) {
      setMessage("Priority queue is empty!");
      return;
    }
    setIsAnimating(true);
    const minEl = pq[0];
    await showOp(`Extracting min element "${minEl.val}" …`);
    setPq((p) => p.slice(1));
    setMessage(`"${minEl.val}" (priority ${minEl.pri}) removed`);
    setIsAnimating(false);
  };

  /* ---------- peek-min ---------- */
  const peekMin = async () => {
    if (pq.length === 0) {
      setMessage("Priority queue is empty!");
      return;
    }
    setIsAnimating(true);
    const minEl = pq[0];
    setMessage(`Min element: "${minEl.val}" (priority ${minEl.pri})`);
    await sleep(1500);
    setIsAnimating(false);
  };

  /* ---------- clear ---------- */
  const clear = () => {
    setPq([]);
    setInputValue("");
    setInputPriority("");
    setOperation(null);
    setMessage("Priority queue cleared");
  };

  /* ---------- UI ---------- */
  return (
    <main className="container mx-auto px-6 pt-4 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Min-Priority Queue Visualiser (lower number = higher priority)
      </p>

      <div className="max-w-4xl mx-auto">
        {/* ----- Controls card ----- */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          {/* Inputs row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value"
              className="flex-1 p-3 border dark:border-gray-700 rounded-lg dark:bg-neutral-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isAnimating}
            />
            <input
              type="number"
              value={inputPriority}
              onChange={(e) => setInputPriority(e.target.value)}
              placeholder="Priority number"
              className="flex-1 p-3 border dark:border-gray-700 rounded-lg dark:bg-neutral-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isAnimating}
            />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={insert}
              disabled={isAnimating}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg disabled:opacity-50 transition-all"
            >
              Insert
            </button>
            <button
              onClick={extractMin}
              disabled={isAnimating || pq.length === 0}
              className="bg-green-500 hover:bg-green-600 text-black px-4 py-3 rounded-lg disabled:opacity-50 transition-all"
            >
              Extract-Min
            </button>
            <button
              onClick={peekMin}
              disabled={isAnimating || pq.length === 0}
              className="bg-green-500 hover:bg-green-600 text-black px-4 py-3 rounded-lg disabled:opacity-50 transition-all"
            >
              Peek-Min
            </button>
            <button
              onClick={clear}
              disabled={isAnimating}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg disabled:opacity-50 transition-all"
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
                  message.includes("inserted")
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
        {pq.length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-center">Visualisation</h2>

            <div className="flex items-center gap-3 w-full justify-center flex-wrap">
              {pq.map((el, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-300 ${
                    idx === 0 && operation?.includes("Extracting") ? "animate-pulse scale-110" : ""
                  }`}
                >
                  <div
                    className={`w-24 h-24 rounded-lg shadow-md flex flex-col items-center justify-center text-lg font-medium border-2 ${
                      idx === 0
                        ? "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                        : "border-gray-200 dark:border-gray-600 bg-white dark:bg-neutral-900"
                    }`}
                  >
                    <span>{el.val}</span>
                    <span className="text-xs mt-1 opacity-70">pri: {el.pri}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PriorityQueueVisualizer;