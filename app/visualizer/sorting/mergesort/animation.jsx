"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import ArrayGenerator from "@/app/components/ui/randomArray";
import CustomArrayInput from "@/app/components/ui/customArrayInput";

const MergeSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentIndices, setCurrentIndices] = useState({
    left: -1,
    right: -1,
    mergeStart: -1,
    mergeEnd: -1,
    comparing: [],
    levels: [],
    currentLevel: -1,
  });
  const animationRef = useRef(null);

  // Reset all stats and state
  const resetStats = () => {
    setComparisons(0);
    setSwaps(0);
    setCurrentIndices({
      left: -1,
      right: -1,
      mergeStart: -1,
      mergeEnd: -1,
      comparing: [],
      levels: [],
      currentLevel: -1,
    });
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Merge function for Merge Sort
  const merge = async (arr, l, m, r) => {
    let n1 = m - l + 1;
    let n2 = r - m;

    // Create temp arrays
    let L = new Array(n1);
    let R = new Array(n2);

    // Copy data to temp arrays
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]
    let i = 0,
      j = 0,
      k = l;

    while (i < n1 && j < n2) {
      setCurrentIndices((prev) => ({
        ...prev,
        comparing: [l + i, m + 1 + j],
        mergeStart: l,
        mergeEnd: r,
      }));

      setComparisons((prev) => prev + 1);
      await new Promise(
        (resolve) => (animationRef.current = setTimeout(resolve, 1000 / speed))
      );

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      setSwaps((prev) => prev + 1);

      setArray([...arr]);
      // GSAP pop animation for the merged bar
      {
        const bars = document.querySelectorAll(".bar");
        const bar = bars[k];
        if (bar) {
          await gsap.to(bar, { scale: 1.2, duration: 0.2 });
          await gsap.to(bar, { scale: 1.0, duration: 0.2 });
        }
      }

      k++;
      await new Promise(
        (resolve) => (animationRef.current = setTimeout(resolve, 1000 / speed))
      );
    }

    // Copy remaining elements of L[]
    while (i < n1) {
      arr[k] = L[i];
      i++;
      setArray([...arr]);
      // GSAP pop animation for the merged bar
      {
        const bars = document.querySelectorAll(".bar");
        const bar = bars[k];
        if (bar) {
          await gsap.to(bar, { scale: 1.2, duration: 0.2 });
          await gsap.to(bar, { scale: 1.0, duration: 0.2 });
        }
      }
      k++;
      await new Promise(
        (resolve) => (animationRef.current = setTimeout(resolve, 1000 / speed))
      );
    }

    // Copy remaining elements of R[]
    while (j < n2) {
      arr[k] = R[j];
      j++;
      setArray([...arr]);
      // GSAP pop animation for the merged bar
      {
        const bars = document.querySelectorAll(".bar");
        const bar = bars[k];
        if (bar) {
          await gsap.to(bar, { scale: 1.2, duration: 0.2 });
          await gsap.to(bar, { scale: 1.0, duration: 0.2 });
        }
      }
      k++;
      await new Promise(
        (resolve) => (animationRef.current = setTimeout(resolve, 1000 / speed))
      );
    }
  };

  // Merge Sort algorithm
  const mergeSortHelper = async (arr, l, r, level = 0, path = []) => {
    if (l >= r) return;

    const currentPath = [...path, { l, r }];
    const m = l + Math.floor((r - l) / 2);

    // Update current level and path
    setCurrentIndices((prev) => ({
      ...prev,
      currentLevel: level,
      recursionPath: currentPath,
      left: l,
      right: r,
      mid: m,
    }));

    await new Promise(
      (resolve) => (animationRef.current = setTimeout(resolve, 1000 / speed))
    );

    await mergeSortHelper(arr, l, m, level + 1, currentPath);
    await mergeSortHelper(arr, m + 1, r, level + 1, currentPath);

    await merge(arr, l, m, r);
  };

  // Main merge sort function
  const mergeSort = async () => {
    if (sorted || sorting || array.length === 0) return;

    setSorting(true);
    let arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);

    setArray([...arr]);
    setSorting(false);
    setSorted(true);
    setCurrentIndices({
      left: -1,
      right: -1,
      mergeStart: -1,
      mergeEnd: -1,
      comparing: [],
      levels: [],
      currentLevel: -1,
    });
  };

  // Reset everything
  const reset = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setArray([]);
    setSorting(false);
    setSorted(false);
    resetStats();
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  // Function to check if index is in current range
  const isInCurrentRange = (index) => {
    return index >= currentIndices.left && index <= currentIndices.right;
  };

  // Function to check if index is being merged
  const isBeingMerged = (index) => {
    return (
      index >= currentIndices.mergeStart && index <= currentIndices.mergeEnd
    );
  };


  return (
      <main className="container mx-auto px-6 pt-2 pb-6">
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize the divide-and-conquer approach of Merge Sort with recursive
          splitting and merging.
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <ArrayGenerator
                  onGenerate={(newArray) => {
                    setArray(newArray);
                    setSorted(false);
                    resetStats();
                  }}
                  disabled={sorting}
                />
                <CustomArrayInput
                  onUseCustomArray={(newArray) => {
                    setArray(newArray);
                    setSorted(false);
                    resetStats();
                  }}
                  disabled={sorting}
                  className="mb-4"
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={mergeSort}
                  disabled={!array.length || sorting || sorted}
                  className="w-full bg-none border border-black dark:border-white text-black dark:text-white px-4 py-2 rounded disabled:opacity-50 disabled:text-blue-500 disabled:border-blue-500 disabled:dark:border-blue-500 disabled:dark:text-blue-500"
                >
                  {sorting ? "Sorting..." : "Start Merge Sort"}
                </button>
                <button
                  onClick={reset}
                  className="w-full bg-none border border-black dark:border-white text-balck dark:text-white px-4 py-2 rounded"
                >
                  Reset All
                </button>
              </div>
            </div>

            {/* Speed controls */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-700 dark:text-gray-300">Speed:</span>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-32"
                disabled={sorting}
              />
              <span className="text-gray-700 dark:text-gray-300">{speed}x</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <div className="font-medium">Comparisons:</div>
                <div className="text-2xl">{comparisons}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <div className="font-medium">Merges:</div>
                <div className="text-2xl">{swaps}</div>
              </div>
            </div>
          </div>

          {/* Main Array Visualization */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Main Array</h2>
            {array.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center">
                {array.map((value, index) => {
                  const isComparing = currentIndices.comparing.includes(index);
                  const isInRange = isInCurrentRange(index);
                  const isMerging = isBeingMerged(index);
                  const isSorted = sorted;

                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all duration-300 text-lg font-medium
                            ${
                              isComparing
                                ? "bg-red-400 dark:bg-red-400 border-red-600 dark:border-red-600 text-gray-800"
                                : isMerging
                                ? "bg-green-400 dark:bg-green-400 border-green-600 dark:border-green-600 text-gray-800"
                                : isInRange
                                ? "bg-yellow-400 dark:bg-yellow-400 border-yellow-600 dark:border-yellow-600 text-gray-800"
                                : isSorted
                                ? "bg-green-400 dark:bg-green-400 border-green-600 dark:border-green-600 text-gray-800"
                                : "bg-blue-400 dark:bg-blue-500 border-blue-600 dark:border-blue-600 text-gray-800"
                            }`}
                      >
                        {value}
                      </div>
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        {index}
                        {isComparing && " (comparing)"}
                        {isMerging && !isComparing && " (merging)"}
                        {isInRange &&
                          !isMerging &&
                          !isComparing &&
                          " (current)"}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {sorting ? "Sorting..." : "Generate or enter an array to begin"}
              </div>
            )}
          </div>
        </div>
      </main>
  );
};

export default MergeSortVisualizer;
