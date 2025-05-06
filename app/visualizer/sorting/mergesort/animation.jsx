'use client';
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import Content from '@/app/visualizer/sorting/mergesort/content';
import ArrayGenerator from '@/app/components/ui/randomArray';
import CustomArrayInput from '@/app/components/ui/customArrayInput';
import ExploreOther from '@/app/components/ui/exploreOther';
import CodeBlock from '@/app/visualizer/sorting/mergesort/codeBlock';
import GoBackButton from '@/app/components/ui/goback';

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
      currentLevel: -1
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
        currentLevel: -1
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
      let i = 0, j = 0, k = l;
      
      while (i < n1 && j < n2) {
        setCurrentIndices(prev => ({
          ...prev,
          comparing: [l + i, m + 1 + j],
          mergeStart: l,
          mergeEnd: r
        }));
        
        setComparisons(prev => prev + 1);
        await new Promise(resolve => 
          animationRef.current = setTimeout(resolve, 1000 / speed)
        );
        
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        setSwaps(prev => prev + 1);
        k++;
        
        setArray([...arr]);
        await new Promise(resolve => 
          animationRef.current = setTimeout(resolve, 1000 / speed)
        );
      }
      
      // Copy remaining elements of L[]
      while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        setArray([...arr]);
        await new Promise(resolve => 
          animationRef.current = setTimeout(resolve, 1000 / speed)
        );
      }
      
      // Copy remaining elements of R[]
      while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        setArray([...arr]);
        await new Promise(resolve => 
          animationRef.current = setTimeout(resolve, 1000 / speed)
        );
      }
    };
  
    // Merge Sort algorithm
    const mergeSortHelper = async (arr, l, r, level = 0, path = []) => {
      if (l >= r) return;
      
      const currentPath = [...path, { l, r }];
      const m = l + Math.floor((r - l) / 2);
      
      // Update current level and path
      setCurrentIndices(prev => ({
        ...prev,
        currentLevel: level,
        recursionPath: currentPath,
        left: l,
        right: r,
        mid: m
      }));
      
      await new Promise(resolve => 
        animationRef.current = setTimeout(resolve, 1000 / speed)
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
        currentLevel: -1
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
      return index >= currentIndices.mergeStart && index <= currentIndices.mergeEnd;
    };
  
    const RecursionTree = () => {
      if (!currentIndices.recursionPath?.length) return null;
  
      return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8">
          <h2 className="text-xl font-semibold mb-4">Recursion Tree</h2>
          <div className="overflow-x-auto">
            <div className="space-y-6">
              {/* Tree visualization */}
              <div className="flex justify-center">
                <div className="relative">
                  {currentIndices.recursionPath.map((level, idx) => (
                    <div key={idx} className="mb-8">
                      {/* Level indicator */}
                      <div className="text-center font-medium mb-2">
                        Level {idx + 1}
                      </div>
                      
                      {/* Visual connection lines */}
                      {idx > 0 && (
                        <div className="absolute left-1/2 -top-4 w-0.5 h-6 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2"></div>
                      )}
                      
                      {/* Current subarray visualization */}
                      <div className={`p-3 rounded-lg border-2 ${
                        idx === currentIndices.recursionPath.length - 1 
                          ? "bg-yellow-100 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-600"
                          : "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700"
                      }`}>
                        <div className="text-center text-sm mb-1">
                          Processing: array[{level.l}..{level.r}]
                          {idx === currentIndices.recursionPath.length - 1 && 
                           currentIndices.mid !== undefined && (
                            <span className="block text-xs mt-1">
                              (Split at index {currentIndices.mid})
                            </span>
                          )}
                        </div>
                        
                        {/* Subarray elements */}
                        <div className="flex justify-center gap-1">
                          {array.map((val, i) => (
                            <div
                              key={i}
                              className={`w-8 h-8 flex items-center justify-center text-xs rounded border ${
                                i >= level.l && i <= level.r
                                  ? idx === currentIndices.recursionPath.length - 1
                                    ? "bg-yellow-200 dark:bg-yellow-800 border-yellow-400 dark:border-yellow-600"
                                    : "bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600"
                                  : "opacity-30"
                              }`}
                            >
                              {i >= level.l && i <= level.r ? val : ""}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Left/Right indicators for non-leaf nodes */}
                      {idx < currentIndices.recursionPath.length - 1 && (
                        <div className="flex justify-between text-xs mt-1 px-2">
                          <span>Left</span>
                          <span>Right</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Current operation explanation */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Current Operation:</h3>
                {currentIndices.mergeStart >= 0 ? (
                  <p>
                    Merging subarrays: array[{currentIndices.mergeStart}..{currentIndices.mid}] 
                    and array[{currentIndices.mid + 1}..{currentIndices.mergeEnd}]
                  </p>
                ) : (
                  <p>
                    {currentIndices.recursionPath.length > 0 && (
                      `Dividing at level ${currentIndices.recursionPath.length}: 
                      array[${currentIndices.left}..${currentIndices.right}]`
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    };
  
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
        <Navbar />
        <main className="container mx-auto px-6 py-16">
        <div className='mt-6 sm:mt-5'>
            <GoBackButton/>
          </div>
          <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
            <span className="text-blue-600">Merge Sort</span> Visualizer
          </h1>
          <Content/>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Visualize the divide-and-conquer approach of Merge Sort with recursive splitting and merging.
          </p>
  
          <div className="max-w-6xl mx-auto">
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
                    onSubmit={(newArray) => {
                      setArray(newArray);
                      setSorted(false);
                      resetStats();
                    }}
                    disabled={sorting}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={mergeSort}
                    disabled={!array.length || sorting || sorted}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    {sorting ? "Sorting..." : "Start Merge Sort"}
                  </button>
                  <button
                    onClick={reset}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
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
                                ? "bg-red-400 dark:bg-red-600 border-red-600 dark:border-red-400"
                                : isMerging
                                ? "bg-green-400 dark:bg-green-600 border-green-600 dark:border-green-400"
                                : isInRange
                                ? "bg-yellow-400 dark:bg-yellow-600 border-yellow-600 dark:border-yellow-400"
                                : isSorted
                                ? "bg-blue-400 dark:bg-blue-600 border-blue-600 dark:border-blue-400"
                                : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                            }`}
                        >
                          {value}
                        </div>
                        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                          {index}
                          {isComparing && " (comparing)"}
                          {isMerging && !isComparing && " (merging)"}
                          {isInRange && !isMerging && !isComparing && " (current)"}
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
  
            {/* Enhanced Recursion Tree */}
            {sorting && array.length > 0 && <RecursionTree />}
  
             {/* Algorithm Explanation with Visual Guide */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8">
              <h2 className="text-xl font-semibold mb-4">Merge Sort Process</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Visual Guide:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                      <span>Current division level</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
                      <span>Completed division levels</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                      <span>Elements being compared</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
                      <span>Elements being merged</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Steps:</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Divide array into halves recursively until single elements</li>
                    <li>Merge adjacent subarrays in sorted order</li>
                    <li>Continue merging until whole array is sorted</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock/>
          <ExploreOther
          title="Explore Sorting Algorithms"
          links={[
            { text: "Selection Sort", url: "/visualizer/sorting/selectionsort" },
            { text: "Bubble Sort", url: "/visualizer/sorting/bubblesort" },
            { text: "Insertion Sort", url: "/visualizer/sorting/insertionsort" },
            { text: "Quick Sort" , url: "/visualizer/sorting/quicksort"},
            { text: "Heap Sort", url: "/algorithms/sorting/heap" },
          ]}
        />
        </main>
        <div>
          <div className="bg-gray-700 z-10 h-[1px]"></div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default MergeSortVisualizer;