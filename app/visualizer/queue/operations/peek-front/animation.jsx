"use client";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("info");
  const [peeked, setPeeked] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemRefs = useRef([]);
  // Stable ids, so React unmounts the node that was animated out rather than
  // reusing it for the next item along with its leftover inline styles.
  const nextId = useRef(0);
  const makeItem = (value) => ({ id: nextId.current++, value });

  const say = (text, nextTone = "info") => {
    setMessage(text);
    setTone(nextTone);
  };

  // Runs the moment a new rear item mounts: a slide-in from the rear side,
  // so enqueue reads as "joining the back of the line".
  const animateEnter = (el) => {
    if (!el || el.dataset.entered) return;
    el.dataset.entered = "true";
    gsap.fromTo(
      el,
      { x: 40, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
    );
  };

  const enqueue = () => {
    const value = inputValue.trim();
    if (!value) {
      say("Please enter a value", "info");
      return;
    }
    setPeeked(null);
    setQueue((q) => [...q, makeItem(value)]);
    say(`"${value}" joined the rear`, "success");
    setInputValue("");
  };

  // Dequeue removes the front, so the element leaves from the front side.
  const dequeue = () => {
    if (!queue.length || isAnimating) return;
    const leaving = queue[0].value;
    const el = itemRefs.current[0];
    setIsAnimating(true);
    setPeeked(null);

    const finish = () => {
      setQueue((q) => q.slice(1));
      say(`"${leaving}" removed from the front`, "warning");
      setIsAnimating(false);
    };

    if (!el) return finish();

    gsap.to(el, {
      x: -60,
      opacity: 0,
      scale: 0.8,
      duration: 0.35,
      ease: "power2.in",
      onComplete: finish,
    });
  };

  // Peek only reads: the front element lifts and glows, then settles back
  // exactly where it was.
  const peekFront = () => {
    if (!queue.length || isAnimating) return;
    const el = itemRefs.current[0];
    setIsAnimating(true);
    setPeeked(queue[0].value);
    say(`Front element is "${queue[0].value}" — the queue is unchanged`, "peek");

    if (!el) return setIsAnimating(false);

    gsap
      .timeline({ onComplete: () => setIsAnimating(false) })
      .to(el, { y: -10, scale: 1.08, duration: 0.25, ease: "power2.out" })
      .to(el, { y: 0, scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }, "+=0.5");
  };

  const generateRandomQueue = () => {
    if (isAnimating) return;
    // Kept short so the row still fits a phone screen without scrolling.
    const length = 4 + Math.floor(Math.random() * 2);
    setPeeked(null);
    setQueue(
      Array.from({ length }, () =>
        makeItem(String(Math.floor(Math.random() * 90) + 10))
      )
    );
    say("Random queue generated", "info");
  };

  const reset = () => {
    if (isAnimating) return;
    setQueue([]);
    setInputValue("");
    setPeeked(null);
    say("", "info");
  };

  const toneClasses = {
    success:
      "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800",
    warning:
      "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800",
    peek: "bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 border-violet-200 dark:border-violet-800",
    info: "bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600",
  };

  itemRefs.current.length = queue.length;

  return (
    <main className="container mx-auto px-2 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Read the front of the queue without removing it
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enqueue()}
              placeholder="Enter a value"
              disabled={isAnimating}
              className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <button
              onClick={enqueue}
              disabled={isAnimating}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40 disabled:pointer-events-none"
            >
              Enqueue
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={peekFront}
              disabled={isAnimating || queue.length === 0}
              className="px-3 py-2 text-sm font-medium rounded-lg bg-violet-500 hover:bg-violet-600 text-white transition disabled:opacity-40 disabled:pointer-events-none"
            >
              Peek Front
            </button>
            <button
              onClick={dequeue}
              disabled={isAnimating || queue.length === 0}
              className="px-3 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40 disabled:pointer-events-none"
            >
              Dequeue
            </button>
            <button
              onClick={generateRandomQueue}
              disabled={isAnimating}
              className="px-3 py-2 text-sm font-medium rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition disabled:opacity-40 disabled:pointer-events-none"
            >
              Random
            </button>
            <button
              onClick={reset}
              disabled={isAnimating}
              className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-40 disabled:pointer-events-none"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-950 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg border text-center text-sm font-medium ${toneClasses[tone]}`}
            >
              {message}
            </div>
          )}

          <div className="flex items-end justify-center gap-2 sm:gap-4 min-h-[132px] overflow-x-auto pb-1">
            {queue.length === 0 ? (
              <div className="m-auto text-sm text-gray-400 dark:text-gray-600">
                Queue is empty
              </div>
            ) : (
              queue.map((item, index) => {
                const isFront = index === 0;
                const isRear = index === queue.length - 1;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center shrink-0"
                  >
                    {/* Pointer labels sit directly above their own element */}
                    <div className="h-9 flex flex-col items-center justify-end">
                      {isFront && (
                        <span className="text-[11px] font-semibold text-blue-500 dark:text-blue-400">
                          front
                        </span>
                      )}
                      {isRear && !isFront && (
                        <span className="text-[11px] font-semibold text-emerald-500 dark:text-emerald-400">
                          rear
                        </span>
                      )}
                      {(isFront || isRear) && (
                        <span
                          className={`text-xs leading-none ${
                            isFront
                              ? "text-blue-500 dark:text-blue-400"
                              : "text-emerald-500 dark:text-emerald-400"
                          }`}
                        >
                          ▼
                        </span>
                      )}
                    </div>

                    <div
                      ref={(el) => {
                        itemRefs.current[index] = el;
                        animateEnter(el);
                      }}
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md flex items-center justify-center text-sm sm:text-base font-semibold text-white bg-gradient-to-br ${
                        isFront
                          ? peeked !== null
                            ? "from-violet-500 to-violet-600 ring-2 ring-violet-300 dark:ring-violet-700 ring-offset-2 ring-offset-white dark:ring-offset-neutral-950"
                            : "from-blue-500 to-blue-600 ring-2 ring-blue-300 dark:ring-blue-700 ring-offset-2 ring-offset-white dark:ring-offset-neutral-950"
                          : "from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700"
                      }`}
                    >
                      {item.value}
                    </div>

                    <div className="h-6 mt-1 text-[11px] font-mono text-violet-600 dark:text-violet-400">
                      {isFront && peeked !== null && `returns ${peeked}`}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
            size: {queue.length}
            {peeked !== null && " (unchanged by peek)"}
          </div>
        </div>
      </div>
    </main>
  );
};

export default QueueVisualizer;
