'use client';
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';

const SelectionSortVisualizer = () => {
    const [array, setArray] = useState([]);
    const [customArray, setCustomArray] = useState('');
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
    const generateRandomArray = () => {
      const newArray = Array.from({ length: 10 }, () => 
        Math.floor(Math.random() * 100) + 5
      );
      setArray(newArray);
      setSorted(false);
      resetStats();
    };
  
    // Use custom array input
    const useCustomArray = () => {
      const elements = customArray.split(',').map(el => parseInt(el.trim()));
      if (elements.some(isNaN)) {
        alert('Please enter valid numbers separated by commas');
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
          
          await new Promise(resolve => 
            animationRef.current = setTimeout(resolve, 1000 / speed)
          );
        }
      }
      
      setArray([...arr]);
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
      setCustomArray('');
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
      <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
        <Navbar />
        <main className="container mx-auto px-6 py-16">
          <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
            <span className="text-blue-600">Selection Sort</span> Visualizer
          </h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Visualize Selection Sort as it repeatedly selects the smallest element
            and swaps it to its correct position in the array.
          </p>
  
          <div className="max-w-4xl mx-auto">
            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <button
                    onClick={generateRandomArray}
                    disabled={sorting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 mb-2"
                  >
                    Generate Random Array
                  </button>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customArray}
                      onChange={(e) => setCustomArray(e.target.value)}
                      placeholder="Enter comma-separated numbers"
                      className="flex-1 p-2 border rounded dark:bg-gray-700"
                      disabled={sorting}
                    />
                    <button
                      onClick={useCustomArray}
                      disabled={sorting || !customArray}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                      Use
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={selectionSort}
                    disabled={!array.length || sorting || sorted}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    {sorting ? "Sorting..." : "Start Selection Sort"}
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
                  <div className="font-medium">Swaps:</div>
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
                    const isCurrent = index === currentIndices.j;
                    const isMin = index === currentIndices.min;
                    const isSorted = sorted || index < currentIndices.i;
  
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all duration-300 text-lg font-medium
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
                  {sorting ? "Sorting..." : "Generate or enter an array to begin"}
                </div>
              )}
            </div>
  
            {/* Medium Article Embed */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8">
              <div className="medium-article-embed">
                <div className="mt-0 text-center">
                  <a
                    href="https://medium.com/@sohan-rout/selection-sort-in-c-22575c9470c7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read full article on Selection Sort on Medium
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div>
          <div className="bg-gray-700 z-10 h-[1px]"></div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default SelectionSortVisualizer;