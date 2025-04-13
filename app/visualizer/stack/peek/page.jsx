'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';

export const metadata = {
  title: 'Stack Visualizer | Learn Stack with Animation',
  description: 'Visualize how Stack works in DSA using interactive animation. Great for beginners and interview prep.',
  keywords: ['Stack DSA', 'Stack Visualizer', 'Learn Stack', 'DSA Animation'],
  robots: "index, follow",
};

const StackVisualizer = () => {
  const [stack, setStack] = useState(['Blue', 'Green', 'Red']);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Stack ready');
  const [isAnimating, setIsAnimating] = useState(false);

  // Push operation
  const push = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    setIsAnimating(true);
    setOperation(`Pushing "${inputValue}"...`);
    
    setTimeout(() => {
      setStack(prev => [inputValue, ...prev]);
      setOperation(null);
      setMessage(`"${inputValue}" pushed to stack`);
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
    
    setTimeout(() => {
      setStack(prev => prev.slice(1));
      setOperation(null);
      setMessage(`"${poppedValue}" popped from stack`);
      setIsAnimating(false);
    }, 1000);
  };

  // Peek operation
  const peek = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty!');
      return;
    }

    setIsAnimating(true);
    setOperation(`Peeking at "${stack[0]}"`);
    
    setTimeout(() => {
      setOperation(null);
      setMessage(`Top element is "${stack[0]}"`);
      setIsAnimating(false);
    }, 1000);
  };

  // Reset stack
  const reset = () => {
    setStack(['Blue', 'Green', 'Red']);
    setInputValue('');
    setOperation(null);
    setMessage('Stack reset');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
          <span className="text-blue-600">Stack</span> Visualizer
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize <strong>Push</strong>, <strong>Pop</strong>, and <strong>Peek</strong> operations
        </p>

        <div className="max-w-md mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
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
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={pop}
                disabled={isAnimating || stack.length === 0}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Pop
              </button>
              <button
                onClick={peek}
                disabled={isAnimating || stack.length === 0}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Peek
              </button>
              <button
                onClick={reset}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={isAnimating}
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
            <div className={`mb-6 p-3 rounded-lg ${
              message.includes('push') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
              message.includes('pop') ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
              message.includes('Top') ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
              'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}>
              {message}
            </div>

            {/* Vertical Stack */}
            <div className="flex flex-col items-center min-h-[200px]">
              {/* Top indicator */}
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                {stack.length > 0 ? '↑ Top' : ''}
              </div>

              {/* Stack elements */}
              <div className="w-full max-w-xs">
                {stack.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                    Stack is empty
                  </div>
                ) : (
                  <div className="space-y-2">
                    {stack.map((item, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border-2 text-center font-medium transition-all ${
                          index === 0 && operation?.includes('Peek') ? 
                            'bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700 animate-pulse' :
                          index === 0 ?
                            'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700' :
                            'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        {item}
                        {index === 0 && (
                          <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                            (Top)
                          </div>
                        )}
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

            {/* Stack Legend */}
            <div className="mt-8 grid grid-cols-3 gap-2 text-sm">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded text-center">
                <div className="font-medium">Top</div>
                <div className="text-xs">Current top</div>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded text-center">
                <div className="font-medium">Peek</div>
                <div className="text-xs">Viewing</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center">
                <div className="font-medium">Elements</div>
                <div className="text-xs">Stack items</div>
              </div>
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