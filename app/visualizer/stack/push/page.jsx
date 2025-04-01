'use client';
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Stack is empty');
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

  // Push operation with smooth animation
  const push = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value to push');
      return;
    }

    if (isAnimating) return;
    
    setIsAnimating(true);
    setOperation(`Pushing "${inputValue}"...`);
    setMessage('');

    // Animation sequence
    setTimeout(() => {
      setStack(prev => [inputValue, ...prev]);
      setOperation(null);
      setMessage(`"${inputValue}" pushed successfully!`);
      
      setTimeout(() => {
        setIsAnimating(false);
        setInputValue('');
      }, 500);
    }, 1000);
  };

  // Pop operation with animation
  const pop = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty!');
      return;
    }

    if (isAnimating) return;
    
    setIsAnimating(true);
    const poppedValue = stack[0];
    setOperation(`Popping "${poppedValue}"...`);
    setMessage('');

    setTimeout(() => {
      setStack(prev => prev.slice(1));
      setOperation(null);
      setMessage(`"${poppedValue}" popped from stack!`);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 1000);
  };

  // Reset stack
  const reset = () => {
    setStack([]);
    setMessage('Stack is empty');
    setOperation(null);
  };

  // Clean up animations
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
          <span className="text-blue-600">Stack</span> Visualizer
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize how <strong>LIFO (Last In, First Out)</strong> works in stacks
        </p>

        <div className="max-w-md mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a value"
                className="flex-1 p-2 border rounded dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnimating}
              />
              <button
                onClick={push}
                disabled={isAnimating}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-all"
              >
                Push
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={pop}
                disabled={isAnimating || stack.length === 0}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-all"
              >
                Pop
              </button>
              <button
                onClick={reset}
                disabled={isAnimating}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Stack Visualization */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Stack Visualization</h2>
            
            {/* Operation Status */}
            {operation && (
              <div className={`mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                              animate-pulse transition-all duration-300`}>
                {operation}
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div className={`mb-4 p-3 rounded-lg 
                ${message.includes('pushed') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                  message.includes('popped') ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 
                  'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                {message}
              </div>
            )}

            {/* Stack Structure */}
            <div className="flex flex-col items-center min-h-[300px] justify-end">
              {/* Top Pointer */}
              {stack.length > 0 && (
                <div className="text-sm mb-2 text-gray-600 dark:text-gray-400 font-medium flex items-center">
                  <span className="mr-2">Top</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Stack Elements */}
              {stack.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Stack is empty
                </div>
              ) : (
                <div className="w-full max-w-xs space-y-2">
                  {stack.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 shadow-sm transition-all duration-300 transform
                        ${index === 0 ? 
                          'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 scale-105' : 
                          'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'}
                        ${isAnimating && index === 0 ? 'animate-bounce' : ''}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-medium">{item}</span>
                        {index === 0 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-500 text-white dark:bg-blue-600">
                            TOP
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Base of Stack */}
              {stack.length > 0 && (
                <div className="mt-4 w-full max-w-xs h-2 bg-gray-300 dark:bg-gray-600 rounded-b-lg"></div>
              )}
            </div>

            {/* Stack Explanation */}
            <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                Stack Operations
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-2">Push</span>
                  <span>Adds an element to the top of the stack</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded mr-2">Pop</span>
                  <span>Removes the top element from the stack</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded mr-2">LIFO</span>
                  <span>Last In, First Out principle</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <div className="bg-gray-700 z-10 h-[1px]"></div>
      <Footer />
    </div>
  );
};

export default StackVisualizer;