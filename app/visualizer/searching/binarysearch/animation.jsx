'use client';
import React, { useState, useRef, useEffect } from 'react';
import Footer from '@/app/components/footer';
import ResetButton from '@/app/components/ui/resetButton';
import GoButton from '@/app/components/ui/goButton';
import Content from '@/app/visualizer/searching/binarysearch/content';
import ExploreOther from '@/app/components/ui/exploreOther';
import CodeBlock from '@/app/visualizer/searching/binarysearch/codeBlock';
import Quiz from '@/app/visualizer/searching/binarysearch/quiz';
import GoBackButton from '@/app/components/ui/goback';
import BackToTop from '@/app/components/ui/backtotop';

const BinarySearch = () => {
    const [arraySize, setArraySize] = useState('');
    const [arrayElements, setArrayElements] = useState('');
    const [target, setTarget] = useState('');
    const [array, setArray] = useState([]);
    const [i, setI] = useState(-1);
    const [j, setJ] = useState(-1);
    const [mid, setMid] = useState(-1);
    const [foundIndex, setFoundIndex] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [message, setMessage] = useState('');
    const [speed, setSpeed] = useState(1);
    const animationRef = useRef(null);
    const searchStateRef = useRef({ l: 0, h: 0, arr: [], targetValue: 0 });
    const formRef = useRef(null);
  
    const handleReset = () => {
      clearTimeout(animationRef.current);
      setArray([]);
      setI(-1);
      setJ(-1);
      setMid(-1);
      setFoundIndex(-1);
      setMessage('');
      setIsAnimating(false);
      setArraySize('');
      setArrayElements('');
      setTarget('');
      if (formRef.current) {
        formRef.current.reset();
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
  
      const isSorted = elements.every((el, idx) => idx === 0 || el >= elements[idx - 1]);
      if (!isSorted) {
        setMessage('Array must be sorted in ascending order.');
        return;
      }
  
      setArray(elements);
      setI(0);
      setJ(elements.length - 1);
      setMid(-1);
      setFoundIndex(-1);
      setMessage('');
      setIsAnimating(true);
      
      searchStateRef.current = {
        l: 0,
        h: elements.length - 1,
        arr: elements,
        targetValue: targetValue
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
  
      animationRef.current = setTimeout(() => {
        if (arr[m] === targetValue) {
          setFoundIndex(m);
          setMessage(`Element ${targetValue} found at index ${m}!`);
          setIsAnimating(false);
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
      <div className="min-h-screen max-h-auto bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200">
        <main className="container mx-auto px-6 pt-16 pb-4">

          { /* go back block here */}
          <div className="mt-10 sm:mt-10">
            <GoBackButton />
          </div>

          { /* main logic here */}
          <h1 className="text-4xl md:text-4xl mt-6 ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
            <span className="text-black dark:text-white">Binary Search</span>
          </h1>
          <div className='bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl mt-2 mb-5'></div>
          <Content />
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Visualize how Binary Search efficiently finds an element in a sorted array.
          </p>
  
          <form
            ref={formRef}
            onSubmit={handleGo}
            className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8"
          >
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="arraySize">
                Array Size
              </label>
              <input
                type="number"
                id="arraySize"
                value={arraySize}
                onChange={(e) => setArraySize(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition duration-300"
                placeholder="e.g., 5"
                disabled={isAnimating}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="arrayElements">
                Sorted Array Elements (comma-separated)
              </label>
              <input
                type="text"
                id="arrayElements"
                value={arrayElements}
                onChange={(e) => setArrayElements(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition duration-300"
                placeholder="e.g., 1, 3, 4, 6, 8"
                disabled={isAnimating}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="target">
                Target Element
              </label>
              <input
                type="number"
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition duration-300"
                placeholder="e.g., 4"
                disabled={isAnimating}
              />
            </div>
            <div className="flex gap-4 mb-4">
              <GoButton onGo={handleGo} isAnimating={isAnimating} />
              <ResetButton onReset={handleReset} isAnimating={isAnimating} />
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
                <span className="text-gray-700 dark:text-gray-300">Speed: {speed}x</span>
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
  
          {array.length > 0 && (
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                Array Visualization
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {array.map((element, index) => {
                  const labels = [];
                  if (index === i) labels.push('i');
                  if (index === mid) labels.push('Mid');
                  if (index === j) labels.push('j');
  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all duration-300 text-lg font-medium ${
                          index === foundIndex
                            ? 'bg-green-500 dark:bg-green-600 border-green-700 dark:border-green-400'
                            : index === mid
                            ? 'bg-yellow-500 dark:bg-yellow-600 border-yellow-700 dark:border-yellow-400'
                            : index >= i && index <= j
                            ? 'bg-blue-300 dark:bg-blue-700 border-blue-500 dark:border-blue-400'
                            : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
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
            </div>
          )}

          { /* quiz block here */}
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />

          <CodeBlock/>
          <ExploreOther
          title="Explore other operations"
          links={[
            { text: "Linear Search", url: "./linearsearch" },
          ]}
        />
        </main>
        <div>
          <div className="bg-gray-700 z-10 h-[1px]"></div>
        </div>
        <BackToTop/>
        <Footer/>
      </div>
    );
  };
  
  export default BinarySearch; 