'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';

export const metadata = {
  title: 'Stack Visualizer | Learn Stack with Animation',
  description: 'Visualize how Stack works in DSA using interactive animation. Great for beginners and interview prep.',
  keywords: ['Stack DSA', 'Stack Visualizer', 'Learn Stack', 'DSA Animation'],
  robots: "index, follow",
};

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Stack is empty');
  const [isAnimating, setIsAnimating] = useState(false);

  // Push operation
  const push = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value to push');
      return;
    }

    setIsAnimating(true);
    setOperation(`Pushing "${inputValue}"...`);
    setMessage('');

    setTimeout(() => {
      setStack(prev => [inputValue, ...prev]);
      setOperation(null);
      setMessage(`"${inputValue}" pushed to stack!`);
      setInputValue('');
      setIsAnimating(false);
    }, 1000);
  };

  // Pop operation
  const pop = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty!');
      return;
    }

    setIsAnimating(true);
    const poppedValue = stack[0];
    setOperation(`Popping "${poppedValue}"...`);
    setMessage('');

    setTimeout(() => {
      setStack(prev => prev.slice(1));
      setOperation(null);
      setMessage(`"${poppedValue}" popped from stack!`);
      setIsAnimating(false);
    }, 1000);
  };

  // Reset stack
  const reset = () => {
    setStack([]);
    setMessage('Stack is empty');
    setOperation(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
          <span className="text-blue-600">Stack</span> Visualizer
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize the <strong>LIFO (Last In, First Out)</strong> principle
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
                className="flex-1 p-2 border rounded dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                disabled={isAnimating}
              />
              <button
                onClick={push}
                disabled={isAnimating}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Push
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={pop}
                disabled={isAnimating || stack.length === 0}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Pop
              </button>
              <button
                onClick={reset}
                disabled={isAnimating}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
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
              <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {operation}
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div className={`mb-4 p-3 rounded-lg ${
                message.includes('pushed') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                message.includes('popped') ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 
                'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}>
                {message}
              </div>
            )}

            {/* Vertical Stack */}
            <div className="flex flex-col items-center min-h-[300px]">
              {/* Top indicator */}
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                {stack.length > 0 ? '↑ Top' : ''}
              </div>

              {/* Stack elements */}
              <div className="w-32 relative">
                {stack.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Stack is empty
                  </div>
                ) : (
                  <div className="space-y-1">
                    {stack.map((item, index) => (
                      <div 
                        key={index}
                        className={`p-3 border-2 rounded text-center font-medium transition-all duration-300 ${
                          index === 0 ? 
                            'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700' : 
                            'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                        } ${
                          isAnimating && index === 0 ? 'animate-bounce' : ''
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom indicator */}
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {stack.length > 0 ? '↓ Bottom' : ''}
              </div>
            </div>

            {/* Stack Explanation */}
            <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-2">How Stack Works:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Push</strong>: Adds element to the top (beginning) of stack</li>
                <li><strong>Pop</strong>: Removes element from the top of stack</li>
                <li><strong>LIFO</strong>: Last element pushed is first to be popped</li>
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