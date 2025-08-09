"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ResetButton from "@/app/components/ui/resetButton";
import GoButton from "@/app/components/ui/goButton";

const LinearSearch = () => {
  const [arrayElements, setArrayElements] = useState("");
  const [target, setTarget] = useState("");
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState("");
  const [speed] = useState(1);
  const animationRef = useRef(null);
  const formRef = useRef(null);
  const elementRefs = useRef([]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const handleReset = () => {
    setArray([]);
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setMessage("");
    setIsAnimating(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
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
    );
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

    setArray(elements);
    setIsAnimating(true);
    animateLinearSearch(elements, targetValue);
  };

  const animateLinearSearch = (arr, targetValue) => {
    let index = 0;

    const step = () => {
      if (index < arr.length) {
        setCurrentIndex(index);

        // GSAP animation for current element
        gsap.to(elementRefs.current[index], {
          backgroundColor: "#EAB308",
          borderColor: "#A16207",
          duration: 0.3,
          onComplete: () => {
            if (arr[index] === targetValue) {
              finishSearch(index, targetValue);
            } else if (index === arr.length - 1) {
              finishSearch(-1, targetValue);
            } else {
              // Reset previous element's style
              gsap.to(elementRefs.current[index], {
                backgroundColor: "#E5E7EB",
                borderColor: "#D1D5DB",
                duration: 0.3,
              });
              index++;
              animationRef.current = setTimeout(step, 1000 / speed);
            }
          },
        });
      }
    };

    step();
  };

  const finishSearch = (foundIdx, targetValue) => {
    setIsAnimating(false);

    if (foundIdx !== -1) {
      setFoundIndex(foundIdx);
      setMessage(`Element ${targetValue} found at index ${foundIdx}!`);
      gsap.to(elementRefs.current[foundIdx], {
        backgroundColor: "#22C55E",
        borderColor: "#15803D",
        duration: 0.3,
      });
    } else {
      setMessage(`Element ${targetValue} not found in the array.`);
    }
  };

  return (
    <main className="container mx-auto px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Visualize how Linear Search works by sequentially checking each element
        in an array.
      </p>

      {/* Input Form */}
      <form
        ref={formRef}
        onSubmit={handleGo}
        className="max-w-4xl mx-auto bg-white dark:bg-neutral-950 p-6 rounded-xl mb-8 border border-gray-200 dark:border-gray-700"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="arrayElements"
          >
            Array Elements
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="arrayElements"
              value={arrayElements}
              onChange={(e) => setArrayElements(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition duration-300"
              placeholder="eg. 3, 1, 4, 1, 5"
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
      </form>

      {/* Output Screen */}
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

      {/* Visualization */}
      {array.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Array Visualization
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {array.map((element, index) => (
              <div
                key={index}
                ref={(el) => (elementRefs.current[index] = el)}
                className={`relative w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 transition-all duration-300 ${
                  currentIndex === index && foundIndex === -1
                    ? "bg-yellow-600 dark:bg-yellow-600 border-yellow-700 dark:border-yellow-400 text-gray-800 dark:text-white"
                    : foundIndex === index
                    ? "bg-green-500 dark:bg-green-600 border-green-700 dark:border-green-400 text-gray-800 dark:text-white"
                    : "bg-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                }`}
              >
                <span className="text-xl font-bold">{element}</span>
                <span className="absolute -bottom-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                  [{index}]
                </span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 dark:bg-yellow-600 rounded mr-2"></div>
              <span className="text-sm">Current Element</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 dark:bg-green-600 rounded mr-2"></div>
              <span className="text-sm">Found Element</span>
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

export default LinearSearch;
