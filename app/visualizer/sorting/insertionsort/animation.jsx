"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Footer from "@/app/components/footer";
import RandomArray from "@/app/components/ui/randomArray";
import CustomArrayInput from "@/app/components/ui/customArrayInput";
import Content from "@/app/visualizer/sorting/insertionsort/content";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/visualizer/sorting/insertionsort/codeBlock";
import Quiz from "@/app/visualizer/sorting/insertionsort/quiz";
import GoBackButton from '@/app/components/ui/goback';
import BackToTop from "@/app/components/ui/backtotop";

const InsertionSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentIndices, setCurrentIndices] = useState({
    current: -1, // The element being inserted
    comparing: -1, // The element being compared against
    sortedUpTo: -1, // Up to which index is sorted
  });
  const animationRef = useRef(null);
  const barRefs = useRef([]);

  // Handle array generation from RandomArray component
  const handleRandomArray = (newArray) => {
    setArray(newArray);
    setSorted(false);
    resetStats();
  };

  // Handle custom array from CustomArrayInput component
  const handleCustomArray = (newArray) => {
    setArray(newArray);
    setSorted(false);
    resetStats();
  };

  // Reset all stats and state
  const resetStats = () => {
    setComparisons(0);
    setSwaps(0);
    setCurrentIndices({ current: -1, comparing: -1, sortedUpTo: -1 });
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Insertion sort algorithm
  const insertionSort = async () => {
    if (sorted || sorting || array.length === 0) return;

    // Normalize all bars: Reset x-position before rendering starts
    barRefs.current.forEach((bar) => {
      if (bar) gsap.set(bar, { x: 0, y: 0 });
    });

    setSorting(true);
    let arr = [...array];
    let n = arr.length;

    // The first element is considered sorted
    setCurrentIndices({
      current: 1,
      comparing: 0,
      sortedUpTo: 0,
    });

    for (let i = 1; i < n; i++) {
      let current = arr[i];
      let j = i - 1;

      setCurrentIndices({
        current: i,
        comparing: j,
        sortedUpTo: i - 1,
      });

      await new Promise(
        (resolve) => (animationRef.current = setTimeout(resolve, 1000 / speed))
      );

      while (j >= 0 && arr[j] > current) {
        setComparisons((prev) => prev + 1);
        arr[j + 1] = arr[j];

        // Animate only the current bar with vertical and horizontal movement
        const movingBar = barRefs.current[j + 1];
        if (movingBar) {
          await gsap.to(movingBar, { y: -20, duration: 0.2 });
          await gsap.to(movingBar, { x: "+=70", duration: 0.3, ease: "power2.inOut" });
          await gsap.to(movingBar, { y: 0, duration: 0.2 });
          gsap.set(movingBar, { clearProps: "transform" });
        }

        setSwaps((prev) => prev + 1);
        j--;

        setCurrentIndices({
          current: i,
          comparing: j,
          sortedUpTo: i - 1,
        });

        setArray([...arr]);
        await new Promise(
          (resolve) =>
            (animationRef.current = setTimeout(resolve, 1000 / speed))
        );
      }

      arr[j + 1] = current;

      // Animate the insertion of the current element
      const insertBar = barRefs.current[i];
      if (insertBar) {
        const moveX = (j + 1 - i) * 70;
        await gsap.to(insertBar, { y: -20, duration: 0.2 });
        await gsap.to(insertBar, { x: moveX, duration: 0.3, ease: "power2.inOut" });
        await gsap.to(insertBar, { y: 0, duration: 0.2 });
        gsap.set(insertBar, { clearProps: "transform" });
      }

      setArray([...arr]);

      setCurrentIndices({
        current: i + 1,
        comparing: j,
        sortedUpTo: i,
      });

      await new Promise(
        (resolve) => (animationRef.current = setTimeout(resolve, 1000 / speed))
      );
    }

    setArray([...arr]);
    setSorting(false);
    setSorted(true);
    setCurrentIndices({
      current: -1,
      comparing: -1,
      sortedUpTo: n - 1,
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

  return (
    <div className="min-h-screen max-h-auto bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200">
      <main className="container mx-auto px-6 pt-16 pb-4">

          { /* go back block here */}
          <div className="mt-10 sm:mt-10">
            <GoBackButton />
          </div>

          { /* main logic here */}
          <h1 className="text-4xl md:text-4xl mt-6 ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
            <span className="text-black dark:text-white">Insertion Sort</span>
          </h1>
          <div className='bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl mt-2 mb-5'></div>
          <Content />
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize how Insertion Sort builds the final sorted array one element
          at a time.
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-4">
                <RandomArray
                  onGenerate={handleRandomArray}
                  disabled={sorting}
                />
                <CustomArrayInput
                  onSubmit={handleCustomArray}
                  disabled={sorting}
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={insertionSort}
                  disabled={!array.length || sorting || sorted}
                  className="w-full bg-none-600 border border-black dark:border-white text-black dark:text-white px-4 py-2 rounded disabled:opacity-50 disabled:bg-none disabled:border-blue-500 disabled:dark:border-blue-500 disabled:text-blue-500"
                >
                  {sorting ? "Sorting..." : "Start Insertion Sort"}
                </button>
                <button
                  onClick={reset}
                  className="w-full bg-none border border-black dark:border-white text-black dark:text-white px-4 mt-4 py-2 rounded"
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
                <div className="font-medium">Shifts:</div>
                <div className="text-2xl">{swaps}</div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Array Visualization</h2>
            {array.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center">
                {array.map((value, index) => {
                  const isCurrent = index === currentIndices.current;
                  const isComparing = index === currentIndices.comparing;
                  const isSorted = index <= currentIndices.sortedUpTo || sorted;

                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        ref={(el) => (barRefs.current[index] = el)}
                        className={`bar w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all duration-300 text-lg font-medium
                            ${
                              isCurrent
                                ? "bg-yellow-400 dark:bg-yellow-400 border-yellow-600 dark:border-yellow-600 dark:text-gray-800"
                                : isComparing
                                ? "bg-red-400 dark:bg-red-400 border-red-600 dark:border-red-600 dark:text-gray-800"
                                : isSorted
                                ? "bg-green-400 dark:bg-green-400 border-green-600 dark:border-green-600 dark:text-gray-800"
                                : "bg-blue-400 dark:bg-blue-400 border-blue-600 dark:border-blue-600 dark:text-gray-800"
                            }`}
                      >
                        {value}
                      </div>
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        {index}
                        {isCurrent && " (current)"}
                        {isComparing && " (comparing)"}
                        {isSorted && !isCurrent && !isComparing && " (sorted)"}
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

            {/* Algorithm Steps Visualization */}
            {sorting && array.length > 0 && (
              <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Current Step</h3>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-400 dark:bg-yellow-600 rounded-full mr-2"></div>
                    <span>Current element being inserted</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-400 dark:bg-red-600 rounded-full mr-2"></div>
                    <span>Element being compared</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-400 dark:bg-green-600 rounded-full mr-2"></div>
                    <span>Sorted portion</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
                  <p className="text-center">
                    {currentIndices.current >= 0 ? (
                      <>
                        Inserting{" "}
                        <strong>
                          array[{currentIndices.current}] ={" "}
                          {array[currentIndices.current]}
                        </strong>{" "}
                        into the sorted portion (indexes 0 to{" "}
                        {currentIndices.sortedUpTo})
                      </>
                    ) : (
                      "Starting sort..."
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        { /* quiz block here */}
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mt-8 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />

        <CodeBlock/>
        <ExploreOther
          title="Explore Sorting Algorithms"
          links={[
            { text: "Selection Sort", url: "/visualizer/sorting/selectionsort" },
            { text: "Bubble Sort", url: "/visualizer/sorting/bubblesort" },
            { text: "Merge Sort", url: "/visualizer/sorting/mergesort" },
            { text: "Quick Sort" , url: "/visualizer/sorting/quicksort"},
            { text: "Heap Sort", url: "/algorithms/sorting/heap" },
          ]}
        />
      </main>
      <div>
        <div className="bg-gray-700 z-10 h-[1px]"></div>
      </div>
      <BackToTop/>
      <Footer />
    </div>
  );
};

export default InsertionSortVisualizer;