"use client";
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import PushPop from "@/app/components/ui/PushPop";

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState("Stack is empty");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEmptyStatus, setIsEmptyStatus] = useState(null);
  const topRef = useRef(null);

  // Intercept state updates coming from PushPop so a single-item pop
  // (stack shrinking by exactly one) gets a "fly away" exit animation
  // before it's actually removed. Pushes and resets pass straight through.
  const handleSetStack = (updater) => {
    const next = typeof updater === "function" ? updater(stack) : updater;
    setIsEmptyStatus(null);

    if (stack.length - next.length === 1 && topRef.current) {
      const el = topRef.current;
      gsap.to(el, {
        y: -140,
        x: 36,
        rotate: 14,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setStack(next),
      });
      return;
    }

    setStack(next);
  };

  // Runs the moment a new "top" box mounts in the DOM: a reliable
  // drop-in entrance that doesn't depend on any surrounding state timing.
  const animateDropIn = (el) => {
    if (!el || el.dataset.dropped) return;
    el.dataset.dropped = "true";
    gsap.fromTo(
      el,
      { y: -220, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "bounce.out",
        onComplete: () => {
          gsap.fromTo(
            el,
            { scaleX: 1, scaleY: 1 },
            {
              scaleX: 1.08,
              scaleY: 0.85,
              duration: 0.08,
              yoyo: true,
              repeat: 1,
              ease: "power1.out",
            }
          );
        },
      }
    );
  };

  const checkEmpty = () => {
    setIsAnimating(true);
    setOperation("Checking if stack is empty…");
    setTimeout(() => {
      const empty = stack.length === 0;
      setIsEmptyStatus(empty);
      setOperation(null);
      setMessage(empty ? "Stack is empty!" : "Stack is not empty");
      setIsAnimating(false);
    }, 800);
  };

  // Oldest first so the container can be laid out column-reverse: the
  // newest item always lands visually on top without existing items
  // ever needing to move, matching how a physical stack behaves.
  const displayStack = [...stack].reverse();

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Visualize the IsEmpty operation on a stack
      </p>

      <div className="max-w-4xl mx-auto">
        <PushPop
          stack={stack}
          setStack={handleSetStack}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          setMessage={setMessage}
          setOperation={setOperation}
        />

        <button
          onClick={checkEmpty}
          disabled={isAnimating}
          className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
        >
          Check If Empty
        </button>

        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          {operation && (
            <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-center text-sm">
              {operation}
            </div>
          )}

          {message && isEmptyStatus !== null && (
            <div
              className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${
                isEmptyStatus
                  ? "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
                  : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex flex-col items-center">
            <div className="h-5 text-sm font-medium text-blue-500 dark:text-blue-400">
              {stack.length > 0 && "↑ Top"}
            </div>

            <div className="relative w-40 flex flex-col-reverse items-stretch gap-2 p-2 min-h-[260px] border-l-2 border-r-2 border-b-[6px] border-gray-300 dark:border-gray-700 rounded-b-2xl bg-gradient-to-b from-transparent to-gray-50 dark:to-neutral-900/60">
              {stack.length === 0 && (
                <div className="m-auto text-sm text-gray-400 dark:text-gray-600">
                  Stack is empty
                </div>
              )}

              {displayStack.map((item, i) => {
                const isTop = i === displayStack.length - 1;
                return (
                  <div
                    key={i}
                    ref={(el) => {
                      if (isTop) topRef.current = el;
                      animateDropIn(el);
                    }}
                    className={`h-11 shrink-0 rounded-lg shadow-md flex items-center justify-center font-semibold text-sm text-white bg-gradient-to-br ${
                      isTop
                        ? "from-blue-500 to-blue-600 ring-2 ring-blue-300 dark:ring-blue-700 ring-offset-2 ring-offset-white dark:ring-offset-neutral-950"
                        : "from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700"
                    }`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            <div className="h-5 text-sm text-gray-500 dark:text-gray-400">
              {stack.length > 0 && "Bottom"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StackVisualizer;
