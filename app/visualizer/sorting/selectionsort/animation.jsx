'use client';
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from "gsap";
import Footer from '@/app/components/footer';
import Content from '@/app/visualizer/sorting/selectionsort/content';
import ArrayGenerator from '@/app/components/ui/randomArray';
import CustomArrayInput from '@/app/components/ui/customArrayInput';
import ExploreOther from '@/app/components/ui/exploreOther';
import CodeBlock from '@/app/visualizer/sorting/selectionsort/codeBlock';
import Quiz from '@/app/visualizer/sorting/selectionsort/quiz';
import GoBackButton from '@/app/components/ui/goback';
import BackToTop from '@/app/components/ui/backtotop';

const SelectionSortVisualizer = () => {
    const [array, setArray] = useState([]);
    const [sorting, setSorting] = useState(false);
    const [sorted, setSorted] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [comparisons, setComparisons] = useState(0);
    const [swaps, setSwaps] = useState(0);
    const [currentIndices, setCurrentIndices] = useState({ 
      i: -1,    // Current outer loop index
      j: -1,    // Current inner loop index
      min: -1   // Current minimum element index
    });
    const animationRef = useRef(null);
  
    // Generate random array
    const handleGenerateRandomArray = (newArray) => {
      setArray(newArray);
      setSorted(false);
      resetStats();
    };
  
    // Use custom array input
    const handleCustomArray = (newArray) => {
      setArray(newArray);
      setSorted(false);
      resetStats();
    };
  
    // Reset all stats and state
    const resetStats = () => {
      setComparisons(0);
      setSwaps(0);
      setCurrentIndices({ i: -1, j: -1, min: -1 });
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  
    // Selection sort algorithm
    const selectionSort = async () => {
      if (sorted || sorting || array.length === 0) return;
      
      setSorting(true);
      let arr = [...array];
      let n = arr.length;
      let tempSwaps = 0;
      let tempComparisons = 0;
      
      for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        setCurrentIndices({ i, j: i + 1, min: minIndex });
        
        for (let j = i + 1; j < n; j++) {
          setCurrentIndices(prev => ({ ...prev, j, min: minIndex }));
          tempComparisons++;
          setComparisons(tempComparisons);
  
          await new Promise(resolve => 
            animationRef.current = setTimeout(resolve, 1000 / speed)
          );
  
          if (arr[j] < arr[minIndex]) {
            minIndex = j;
            setCurrentIndices(prev => ({ ...prev, min: minIndex }));
            
            await new Promise(resolve => 
              animationRef.current = setTimeout(resolve, 1000 / speed)
            );
          }
        }
        
        if (minIndex !== i) {
          [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
          tempSwaps++;
          setSwaps(tempSwaps);
          setArray([...arr]);
          
          const barI = document.querySelectorAll(".array-bar")[i];
          const barMin = document.querySelectorAll(".array-bar")[minIndex];
          if (barI && barMin) {
            gsap.to([barI, barMin], {
              opacity: 0,
              scale: 0.5,
              duration: 0.2,
              onComplete: () => {
                gsap.to([barI, barMin], {
                  opacity: 1,
                  scale: 1,
                  duration: 0.2
                });
              }
            });
          }
          
          await new Promise(resolve => 
            animationRef.current = setTimeout(resolve, 1000 / speed)
          );
        }
      }
      
      setArray([...arr]);
      
      const barI = document.querySelectorAll(".array-bar")[currentIndices.i];
      const barMin = document.querySelectorAll(".array-bar")[currentIndices.min];
      if (barI && barMin) {
        gsap.to([barI, barMin], {
          opacity: 0,
          scale: 0.5,
          duration: 0.2,
          onComplete: () => {
            gsap.to([barI, barMin], {
              opacity: 1,
              scale: 1,
              duration: 0.2
            });
          }
        });
      }
      
      setSorting(false);
      setSorted(true);
      setCurrentIndices({ i: -1, j: -1, min: -1 });
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
            <span className="text-black dark:text-white">Selection Sort</span>
          </h1>
          <div className='bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl mt-2 mb-5'></div>
          <Content />
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Visualize Selection Sort as it repeatedly selects the smallest
            element and swaps it to its correct position in the array.
          </p>

          <div className="max-w-4xl mx-auto">
            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-4">
                  <ArrayGenerator
                    onGenerate={handleGenerateRandomArray}
                    disabled={sorting}
                    defaultSize={10}
                    minValue={5}
                    maxValue={100}
                  />
                  <CustomArrayInput
                    onSubmit={handleCustomArray}
                    disabled={sorting}
                    placeholder="e.g. 5, 3, 8, 1, 2"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={selectionSort}
                    disabled={!array.length || sorting || sorted}
                    className="w-full bg-none border border-black dark:border-white text-black dark:text-white px-4 py-2 rounded disabled:opacity-50 disabled:border-blue-500 disabled:text-blue-500 disabled:dark:border-blue-500 disabled:dark:text-blue-500"
                  >
                    {sorting ? "Sorting..." : "Start Selection Sort"}
                  </button>
                  <button
                    onClick={reset}
                    className="w-full bg-none border border-black dark:border-white text-black dark:text-white mt-4 px-4 py-2 rounded"
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
                <span className="text-gray-700 dark:text-gray-300">
                  {speed}x
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                  <div className="font-medium">Comparisons:</div>
                  <div className="text-2xl">{comparisons}</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                  <div className="font-medium">Swaps:</div>
                  <div className="text-2xl">{swaps}</div>
                </div>
              </div>
            </div>

            {/* Visualization */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">
                Array Visualization
              </h2>
              {array.length > 0 ? (
                <div className="flex flex-wrap gap-4 justify-center">
                  {array.map((value, index) => {
                    const isCurrent = index === currentIndices.j;
                    const isMin = index === currentIndices.min;
                    const isSorted = sorted || index < currentIndices.i;

                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`array-bar w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all duration-300 text-lg font-medium
                            ${
                              isCurrent
                                ? "bg-yellow-400 dark:bg-yellow-600 border-yellow-600 dark:border-yellow-400"
                                : isMin
                                ? "bg-pink-400 dark:bg-pink-600 border-pink-600 dark:border-pink-400"
                                : isSorted
                                ? "bg-green-400 dark:bg-green-600 border-green-600 dark:border-green-400"
                                : "bg-blue-400 dark:bg-blue-600 border-blue-600 dark:border-blue-400"
                            }`}
                        >
                          {value}
                        </div>
                        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                          {index === currentIndices.i && "i"}
                          {index === currentIndices.j && "j"}
                          {index === currentIndices.min && "min"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {sorting
                    ? "Sorting..."
                    : "Generate or enter an array to begin"}
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
              { text: "Quick Sort", url: "/visualizer/sorting/quicksort" },
              { text: "Bubble Sort", url: "/visualizer/sorting/bubblesort" },
              {
                text: "Insertion Sort",
                url: "/visualizer/sorting/insertionsort",
              },
              { text: "Merge Sort", url: "/visualizer/sorting/mergesort" },
              { text: "Heap Sort", url: "/algorithms/sorting/heap" },
            ]}
          />
        </main>
        <div>
          <div className="bg-gray-700 z-10 h-[1px]"></div>
        </div>
        <BackToTop />
        <Footer />
      </div>
    );
  };
  
  export default SelectionSortVisualizer;