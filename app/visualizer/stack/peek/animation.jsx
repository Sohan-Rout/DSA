"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import PushPop from "@/app/components/ui/PushPop";

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const stackRef = useRef(null);
  const itemRefs = useRef([]);
  const peekRef = useRef(null);

  /* ---------- random numbers ---------- */
  const addRandomStack = () => {
    if (stack.length > 0) return;
    setIsAnimating(true);
    setOperation("create");
    const nums = Array.from(
      { length: 3 + Math.floor(Math.random() * 3) },
      () => Math.floor(Math.random() * 999) + 1
    );
    setTimeout(() => {
      setStack(nums);
      setOperation(null);
      setIsAnimating(false);
    }, 600);
  };

  /* ---------- gsap animations (safe) ---------- */
  useEffect(() => {
    itemRefs.current.length = 0;
    if (!stackRef.current) return;

    /* push */
    if (operation?.includes("push") && itemRefs.current[0]) {
      setIsAnimating(true);
      const el = itemRefs.current[0];
      gsap.set(el, { scale: 0, y: -60, opacity: 0 });
      gsap
        .timeline({ onComplete: () => setIsAnimating(false) })
        .to(el, { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.2)" });
    }

    /* pop */
    if (operation?.includes("pop") && itemRefs.current[0]) {
      setIsAnimating(true);
      const el = itemRefs.current[0];
      gsap.to(el, {
        scale: 0,
        y: -60,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setIsAnimating(false),
      });
    }

    /* peek */
    if (operation?.includes("Peek") && itemRefs.current[0]) {
      setMessage(`Top value is ${stack[0]}`);           // ONLY message shown
      setIsAnimating(true);
      const el = itemRefs.current[0];
      peekRef.current = el;
      gsap.to(el, {
        scale: 1.15,
        boxShadow: "0 0 20px #a855f7",
        duration: 0.3,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut",
        onComplete: () => setIsAnimating(false),
      });
    }

    /* reorder */
    gsap.fromTo(
      itemRefs.current.filter(Boolean),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.25, ease: "power2.out" }
    );

    return () => { peekRef.current = null; };
  }, [stack, operation]);

  return (
    <main className="container mx-auto px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Visualize Push, Pop, and Peek operations
      </p>

      <div className="max-w-md mx-auto">
        <PushPop
          stack={stack}
          setStack={setStack}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          setMessage={setMessage}
          setOperation={setOperation}
        />

        <button
          onClick={addRandomStack}
          disabled={isAnimating || stack.length}
          className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white dark:text-black px-4 py-2 rounded disabled:opacity-50"
        >
          Add Random Stack
        </button>

        <div ref={stackRef} className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          {/* peek-only message */}
          {message && (
            <div className="mb-6 p-3 rounded-lg bg-green-200 dark:bg-green-500 text-black">
              {message}
            </div>
          )}

          {/* vertical stack */}
          <div className="flex flex-col items-center min-h-[200px]">
            <div className="w-full max-w-xs">
              {stack.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                  Stack is empty
                </div>
              ) : (
                <div className="space-y-2">
                  {stack.map((num, idx) => (
                    <div
                      key={idx}
                      ref={(el) => (itemRefs.current[idx] = el)}
                      className={`p-4 rounded-lg border-2 text-center font-medium transition-all ${
                        idx === 0 ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700" : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StackVisualizer;