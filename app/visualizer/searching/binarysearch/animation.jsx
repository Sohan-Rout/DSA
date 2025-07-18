"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ResetButton from "@/app/components/ui/resetButton";
import GoButton from "@/app/components/ui/goButton";

const BinarySearch = () => {
  const [arrayElements, setArrayElements] = useState("");
  const [target, setTarget] = useState("");
  const [array, setArray] = useState([]);
  const [i, setI] = useState(-1);
  const [j, setJ] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState("");
  const [speed, setSpeed] = useState(1);
  const animationRef = useRef(null);
  const searchStateRef = useRef({ l: 0, h: 0, arr: [], targetValue: 0 });
  const formRef = useRef(null);
  const elementRefs = useRef([]);

  const handleReset = () => {
    clearTimeout(animationRef.current);
    setArray([]);
    setI(-1);
    setJ(-1);
    setMid(-1);
    setFoundIndex(-1);
    setMessage("");
    setIsAnimating(false);
    setArrayElements("");
    setTarget("");
    if (formRef.current) {
      formRef.current.reset();
    }
    // Reset GSAP animations
    elementRefs.current.forEach((ref) => {
      gsap.to(ref, {
        backgroundColor: "#E5E7EB",
        borderColor: "#D1D5DB",
        duration: 0,
      });
    });
  };

  const generateRandomArray = () => {
    if (isAnimating) return;
    const size = Math.floor(Math.random() * 4) + 2; // Random size between 2 and 5
    const elements = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    ).sort((a, b) => a - b);
    setArrayElements(elements.join(", "));
  };

  const handleGo = (e) => {
    e.preventDefault();
    handleReset();

    if (!arrayElements || !target) {
      setMessage("Please fill in all fields.");
      return;
    }

    const elements = arrayElements.split(",").map((el) => parseInt(el.trim()));
    const targetValue = parseInt(target);

    if (elements.some(isNaN) || isNaN(targetValue)) {
      setMessage("Invalid array elements or target.");
      return;
    }

    const isSorted = elements.every(
      (el, idx) => idx === 0 || el >= elements[idx - 1]
    );
    if (!isSorted) {
      setMessage("Array must be sorted in ascending order.");
      return;
    }

    setArray(elements);
    setI(0);
    setJ(elements.length - 1);
    setMid(-1);
    setFoundIndex(-1);
    setMessage("");
    setIsAnimating(true);

    searchStateRef.current = {
      l: 0,
      h: elements.length - 1,
      arr: elements,
      targetValue: targetValue,
    };

    animateBinarySearch();
  };

  const animateBinarySearch = () => {
    const { l, h, arr, targetValue } = searchStateRef.current;
    const delay = 1500 / speed;

    if (l > h) {
      setMessage(`Element ${targetValue} not found in the array.`);
      setIsAnimating(false);
      return;
    }

    const m = Math.floor((l + h) / 2);
    setI(l);
    setJ(h);
    setMid(m);

    // GSAP animations for i, j, and mid
    elementRefs.current.forEach((ref, index) => {
      if (index === m) {
        gsap.to(ref, {
          backgroundColor: "#EAB308",
          borderColor: "#A16207",
          duration: 0.3,
        });
      } else if (index >= l && index <= h) {
        gsap.to(ref, {
          backgroundColor: "#93C5FD",
          borderColor: "#3B82F6",
          duration: 0.3,
        });
      } else {
        gsap.to(ref, {
          backgroundColor: "#E5E7EB",
          borderColor: "#D1D5DB",
          duration: 0.3,
        });
      }
    });

    animationRef.current = setTimeout(() => {
      if (arr[m] === targetValue) {
        setFoundIndex(m);
        setMessage(`Element ${targetValue} found at index ${m}!`);
        setIsAnimating(false);
        gsap.to(elementRefs.current[m], {
          backgroundColor: "#22C55E",
          borderColor: "#15803D",
          duration: 0.3,
        });
      } else if (arr[m] < targetValue) {
        searchStateRef.current.l = m + 1;
        animateBinarySearch();
      } else {
        searchStateRef.current.h = m - 1;
        animateBinarySearch();
      }
    }, delay);
  };

  const increaseSpeed = () => {
    setSpeed((prev) => Math.min(prev + 0.5, 5));
  };

  const decreaseSpeed = () => {
    setSpeed((prev) => Math.max(prev - 0.5, 0.5));
  };

  useEffect(() => {
    return () => {
      clearTimeout(animationRef.current);
    };
  }, []);

  return (
    <main className="container mx-auto">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Visualize how Binary Search efficiently finds an element in a sorted
        array.
      </p>

      <form
        ref={formRef}
        onSubmit={handleGo}
        className="max-w-4xl mx-auto bg-white dark:bg-neutral-950 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-8"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="arrayElements"
          >
            Sorted Array Elements (comma-separated)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="arrayElements"
              value={arrayElements}
              onChange={(e) => setArrayElements(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition duration-300"
              placeholder="e.g., 1, 3, 4, 6, 8"
              disabled={isAnimating}
            />
            <button
              type="button"
              onClick={generateRandomArray}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
              disabled={isAnimating}
            >
              Random
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="target"
          >
            Target Element
          </label>

          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <input
              type="number"
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full sm:max-w-xs p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition duration-300"
              placeholder="eg. 4"
              disabled={isAnimating}
            />

            <div className="flex gap-2 w-full">
              <GoButton
                onClick={handleGo}
                isAnimating={isAnimating}
                disabled={isAnimating}
              />
              <ResetButton onReset={handleReset} isAnimating={isAnimating} />
            </div>
          </div>
        </div>
        {isAnimating && (
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={decreaseSpeed}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
              disabled={speed <= 0.5}
            >
              -
            </button>
            <span className="text-gray-700 dark:text-gray-300">
              Speed: {speed}x
            </span>
            <button
              type="button"
              onClick={increaseSpeed}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
              disabled={speed >= 5}
            >
              +
            </button>
          </div>
        )}
      </form>

      {message && (
        <div
          className={`max-w-3xl mx-auto mb-8 p-4 rounded-lg ${
            foundIndex !== -1
              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
              : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
          }`}
        >
          <p className="text-center font-medium">{message}</p>
        </div>
      )}

      {array.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Array Visualization
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {array.map((element, index) => {
              const labels = [];
              if (index === i) labels.push("i");
              if (index === mid) labels.push("Mid");
              if (index === j) labels.push("j");

              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    ref={(el) => (elementRefs.current[index] = el)}
                    className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all duration-300 text-lg font-medium ${
                      index === foundIndex
                        ? "bg-green-500 dark:bg-green-600 border-green-700 dark:border-green-400 text-gray-800 dark:text-white"
                        : index === mid
                        ? "bg-yellow-500 dark:bg-yellow-600 border-yellow-700 dark:border-yellow-400 text-gray-800 dark:text-white"
                        : index >= i && index <= j
                        ? "bg-blue-300 dark:bg-blue-700 border-blue-500 dark:border-blue-400 text-gray-800 dark:text-white"
                        : "bg-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                    }`}
                  >
                    {element}
                  </div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 text-center">
                    {labels.map((label, idx) => (
                      <div key={idx}>{label}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 dark:bg-yellow-600 rounded mr-2"></div>
              <span className="text-sm">Middle Element</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 dark:bg-green-600 rounded mr-2"></div>
              <span className="text-sm">Found Element</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-300 dark:bg-blue-700 rounded mr-2"></div>
              <span className="text-sm">Search Range</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-900 rounded mr-2"></div>
              <span className="text-sm">Unchecked Elements</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BinarySearch;
