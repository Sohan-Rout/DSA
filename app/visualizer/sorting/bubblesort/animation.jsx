"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Footer from "@/app/components/footer";
import ArrayGenerator from "@/app/components/ui/randomArray";
import Content from "@/app/visualizer/sorting/bubblesort/content";
import CustomArrayInput from "@/app/components/ui/customArrayInput";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/visualizer/sorting/bubblesort/codeBlock";
import Quiz from "@/app/visualizer/sorting/bubblesort/quiz";
import GoBackButton from "@/app/components/ui/goback";
import BackToTop from "@/app/components/ui/backtotop";

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [customArray, setCustomArray] = useState("");
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentIndices, setCurrentIndices] = useState({ i: -1, j: -1 });
  const animationRef = useRef(null);

  // Handle array generation from child component
  const handleArrayGenerated = (newArray) => {
    setArray(newArray);
    setSorted(false);
    resetStats();
  };

  // Use custom array input
  const useCustomArray = () => {
    const elements = customArray.split(",").map((el) => parseInt(el.trim()));
    if (elements.some(isNaN)) {
      alert("Please enter valid numbers separated by commas");
      return;
    }
    setArray(elements);
    setSorted(false);
    resetStats();
  };

  // Reset all stats and state
  const resetStats = () => {
    setComparisons(0);
    setSwaps(0);
    setCurrentIndices({ i: -1, j: -1 });
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Optimized bubble sort
  const bubbleSort = async () => {
    if (sorted || sorting || array.length === 0) return;

    setSorting(true);
    let arr = [...array];
    let n = arr.length;
    let tempSwaps = 0;
    let tempComparisons = 0;

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        setCurrentIndices({ i: j, j: j + 1 });
        tempComparisons++;
        setComparisons(tempComparisons);

        await new Promise(
          (resolve) =>
            (animationRef.current = setTimeout(resolve, 1000 / speed))
        );

        if (arr[j] > arr[j + 1]) {
          const bars = document.querySelectorAll(".bar");
          const bar1 = bars[j];
          const bar2 = bars[j + 1];
          if (bar1 && bar2) {
            await gsap.to(bar1, {
              x: "+=40",
              duration: 0.3,
              yoyo: true,
            });
            await gsap.to(bar2, {
              x: "-=40",
              duration: 0.3,
              yoyo: true,
            });
            await gsap.to([bar1, bar2], {
              x: "0",
              duration: 0,
            });
          }

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          tempSwaps++;
          setSwaps(tempSwaps);
          setArray([...arr]);

          await new Promise(
            (resolve) =>
              (animationRef.current = setTimeout(resolve, 1000 / speed))
          );
        }
      }

      if (!swapped) break;
    }

    setSorting(false);
    setSorted(true);
  };

  // Reset everything
  const reset = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setArray([]);
    setCustomArray("");
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
            <span className="text-black dark:text-white">Bubble Sort</span>
          </h1>
          <div className='bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl mt-2 mb-5'></div>
          <Content />
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Watch Bubble Sort in action as it repeatedly swaps adjacent elements
          to sort the array step by step.
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-6 md:mb-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-4">
                <ArrayGenerator
                  onGenerate={handleArrayGenerated}
                  disabled={sorting}
                />
                <CustomArrayInput
                  onUseCustomArray={(arr) => {
                    setArray(arr);
                    setSorted(false);
                    resetStats();
                  }}
                  disabled={sorting}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-2 justify-between">
                <button
                  onClick={bubbleSort}
                  disabled={!array.length || sorting || sorted}
                  className="w-full disabled:opacity-50 bg-none text-black border-black dark:border-white dark:text-white px-4 py-2 rounded border shadow-sm transition-all duration-200 disabled:bg-transparent disabled:text-blue-600 disabled:border-blue-400 dark:disabled:text-white dark:disabled:border-blue-600 text-sm sm:text-base"
                >
                  {sorting ? "Sorting..." : "Start Bubble Sort"}
                </button>
                <button
                  onClick={reset}
                  className="w-full bg-none text-black border border-black dark:text-white dark:border-white px-4 py-2 rounded transition-colors text-sm sm:text-base"
                >
                  Reset All
                </button>
              </div>
            </div>

            {/* Speed controls */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                Speed:
              </span>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24 sm:w-32"
                disabled={sorting}
              />
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                {speed}x
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <div className="font-medium">Comparisons:</div>
                <div className="text-xl sm:text-2xl">{comparisons}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <div className="font-medium">Swaps:</div>
                <div className="text-xl sm:text-2xl">{swaps}</div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Array Visualization
            </h2>
            {array.length > 0 ? (
              <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
                {array.map((value, index) => {
                  const isComparing =
                    index === currentIndices.i || index === currentIndices.j;
                  const isSorted = sorted;

                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`bar w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg border-2 shadow-md dark:shadow-blue-900 transition-all duration-300 text-sm sm:text-lg font-bold
                            ${
                              isComparing
                                ? "bg-yellow-400 dark:bg-yellow-400 border-yellow-600 dark:border-yellow-600 dark:text-gray-900"
                                : isSorted
                                ? "bg-green-400 dark:bg-green-400 border-green-600 dark:border-green-600 dark:text-gray-900"
                                : "bg-blue-400 dark:bg-blue-400 border-blue-600 dark:border-blue-600 dark:text-gray-900"
                            }`}
                      >
                        {value}
                      </div>
                      <div className="mt-1 text-xs text-gray-700 dark:text-blue-300 font-semibold">
                        {index === currentIndices.i && "i"}
                        {index === currentIndices.j && "j"}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
                {sorting ? "Sorting..." : "Generate or enter an array to begin"}
              </div>
            )}
          </div>
        </div>

        { /* quiz block here */}
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mt-8 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />

        <CodeBlock />
        <ExploreOther
          title="Explore Sorting Algorithms"
          links={[
            {
              text: "Selection Sort",
              url: "/visualizer/sorting/selectionsort",
            },
            {
              text: "Insertion Sort",
              url: "/visualizer/sorting/insertionsort",
            },
            { text: "Merge Sort", url: "/visualizer/sorting/mergesort" },
            { text: "Quick Sort", url: "/visualizer/sorting/quicksort" },
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

export default BubbleSortVisualizer;
