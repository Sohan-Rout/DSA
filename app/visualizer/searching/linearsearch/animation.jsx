'use client'
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import ResetButton from '@/app/components/ui/resetButton';
import GoButton from '@/app/components/ui/goButton';
import Content from '@/app/visualizer/searching/linearsearch/content';
import NavigationLink from '@/app/components/ui/navigationLink';
import Code from '@/app/visualizer/searching/linearsearch/codeBlock';
import ExploreOther from '@/app/components/ui/exploreOther';

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
  
    const handleReset = () => {
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
      handleReset();
  
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
        <main className="container mx-auto px-6 pt-16 pb-4">
          <h1 className="text-4xl md:text-5xl mt-10 font-bold text-center text-gray-900 dark:text-white mb-8">
            <span className="text-blue-600">Linear Search</span> Visualizer
          </h1>
          <Content />
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Visualize how Linear Search works by sequentially checking each
            element in an array.
          </p>

          {/* Input Form */}
          <form
            ref={formRef}
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
            <div className="flex gap-4">
              <GoButton 
                onClick={handleGo} 
                isAnimating={isAnimating} 
                disabled={isAnimating}
              />
              <ResetButton onReset={handleReset} isAnimating={isAnimating} />
            </div>
          </form>

          {/* Output Screen */}
          {message && (
            <div className={`max-w-3xl mx-auto mb-8 p-4 rounded-lg ${
              foundIndex !== -1 
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            }`}>
              <p className="text-center font-medium">{message}</p>
            </div>
          )}

          {/* Visualization */}
          {array.length > 0 && (
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Array Visualization
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {array.map((element, index) => (
                  <div
                    key={index}
                    className={`relative w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 transition-all duration-300 ${
                      currentIndex === index && foundIndex === -1
                        ? "bg-yellow-500 dark:bg-yellow-600 border-yellow-700 dark:border-yellow-400"
                        : foundIndex === index
                        ? "bg-green-500 dark:bg-green-600 border-green-700 dark:border-green-400"
                        : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {element}
                    </span>
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
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
                  <span className="text-sm">Unchecked Elements</span>
                </div>
              </div>
            </div>
          )}

          <Code/>
          <ExploreOther
          title="Explore other operations"
          links={[
            { text: "Binary Search", url: "./binarysearch" },
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
  
export default LinearSearch;