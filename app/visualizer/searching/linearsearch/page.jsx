'use client';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/app/components/navbarinner';

const LinearSearch = () => {
  const [arraySize, setArraySize] = useState('');
  const [arrayElements, setArrayElements] = useState('');
  const [target, setTarget] = useState('');
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState('');
  const [speed, setSpeed] = useState(1);
  const animationRef = useRef(null);
  const formRef = useRef(null);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  const resetSearch = () => {
    setArray([]);
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setMessage('');
    setIsAnimating(false);
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
    // Reset form inputs completely
    setArraySize('');
    setArrayElements('');
    setTarget('');
    // Clear browser's autocomplete cache
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const skipAnimation = () => {
    if (!isAnimating) return;
    
    clearInterval(animationRef.current);
    setIsAnimating(false);
    
    // Immediately show final result
    const targetValue = parseInt(target);
    const foundIdx = array.findIndex(el => el === targetValue);
    
    if (foundIdx !== -1) {
      setFoundIndex(foundIdx);
      setCurrentIndex(foundIdx);
      setMessage(`Element ${targetValue} found at index ${foundIdx}!`);
    } else {
      setCurrentIndex(array.length - 1);
      setMessage(`Element ${targetValue} not found in the array.`);
    }
  };

  const handleGo = (e) => {
    e.preventDefault();
    resetSearch();

    if (!arraySize || !arrayElements || !target) {
      setMessage('Please fill in all fields.');
      return;
    }

    const size = parseInt(arraySize);
    const elements = arrayElements.split(',').map((el) => parseInt(el.trim()));
    const targetValue = parseInt(target);

    if (isNaN(size) || size <= 0 || elements.length !== size || elements.some(isNaN)) {
      setMessage('Invalid array size or elements.');
      return;
    }

    setArray(elements);
    setIsAnimating(true);
    animateLinearSearch(elements, targetValue);
  };

  const animateLinearSearch = (arr, targetValue) => {
    let index = 0;
    
    animationRef.current = setInterval(() => {
      setCurrentIndex(index);
      
      if (arr[index] === targetValue) {
        finishSearch(index, targetValue);
      } else if (index === arr.length - 1) {
        finishSearch(-1, targetValue);
      }
      
      index++;
    }, 1000 / speed);
  };

  const finishSearch = (foundIdx, targetValue) => {
    clearInterval(animationRef.current);
    setIsAnimating(false);
    
    if (foundIdx !== -1) {
      setFoundIndex(foundIdx);
      setMessage(`Element ${targetValue} found at index ${foundIdx}!`);
    } else {
      setMessage(`Element ${targetValue} not found in the array.`);
    }
  };

  return (
    <div className="min-h-screen max-h-auto bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl mt-10 font-bold text-center text-gray-900 dark:text-white mb-8">
          <span className="text-blue-600">Linear Search</span> Visualizer
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize how Linear Search works by sequentially checking each
          element in an array.
        </p>

        {/* Input Form */}
        <form
          onSubmit={handleGo}
          className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="arraySize"
            >
              Array Size
            </label>
            <input
              type="number"
              id="arraySize"
              value={arraySize}
              onChange={(e) => setArraySize(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition duration-300"
              placeholder="eg. 5"
              disabled={isAnimating}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="arrayElements"
            >
              Array Elements (comma-separated)
            </label>
            <input
              type="text"
              id="arrayElements"
              value={arrayElements}
              onChange={(e) => setArrayElements(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition duration-300"
              placeholder="eg. 3, 1, 4, 1, 5"
              disabled={isAnimating}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="target"
            >
              Target Element
            </label>
            <input
              type="number"
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition duration-300"
              placeholder="eg. 4"
              disabled={isAnimating}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
            disabled={isAnimating}
          >
            Start
          </button>
          {message && (
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              {message}
            </p>
          )}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={resetSearch}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
            >
              Reset Search
            </button>
          </div>
        </form>
        <>
          {/* Visualization */}
          {array.length > 0 && (
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Array Visualization
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {array.map((element, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 flex items-center justify-center rounded-lg border transition-all duration-300 ${
                      currentIndex === index
                        ? "bg-yellow-500 dark:bg-yellow-600 border-yellow-900"
                        : foundIndex === index
                        ? "bg-green-300 dark:bg-green-500 border-green-500"
                        : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {element}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      </main>
    </div>
  );
};

export default LinearSearch;