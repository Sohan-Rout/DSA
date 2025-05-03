'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import CodeBlock from '@/app/visualizer/queue/types/multiple/codeBlock';
import Content from '@/app/visualizer/queue/types/multiple/content';
import ExploreOther from '@/app/components/ui/exploreOther';

const DoubleEndedQueueVisualizer = () => {
  const [deque, setDeque] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Deque is empty');
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [operationSide, setOperationSide] = useState(null); // 'front' or 'rear'
  const [animationClass, setAnimationClass] = useState('');

  // Enqueue at front with enhanced animation
  const enqueueFront = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    setIsAnimating(true);
    setOperation(`Adding "${inputValue}" at front...`);
    setOperationSide('front');
    setAnimationClass('animate-pulse-fast');
    setHighlightedIndex(0);

    setTimeout(() => {
      setDeque([inputValue, ...deque]);
      setMessage(`"${inputValue}" added to front`);
      setInputValue('');
      setOperation(null);
      setOperationSide(null);
      setHighlightedIndex(null);
      setAnimationClass('');
      setIsAnimating(false);
    }, 800);
  };

  // Enqueue at rear with enhanced animation
  const enqueueRear = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    setIsAnimating(true);
    setOperation(`Adding "${inputValue}" at rear...`);
    setOperationSide('rear');
    setAnimationClass('animate-pulse-fast');
    setHighlightedIndex(deque.length);

    setTimeout(() => {
      setDeque([...deque, inputValue]);
      setMessage(`"${inputValue}" added to rear`);
      setInputValue('');
      setOperation(null);
      setOperationSide(null);
      setHighlightedIndex(null);
      setAnimationClass('');
      setIsAnimating(false);
    }, 800);
  };

  // Dequeue from front with enhanced animation
  const dequeueFront = () => {
    if (deque.length === 0) {
      setMessage('Deque is empty!');
      return;
    }

    setIsAnimating(true);
    setOperation('Removing from front...');
    setOperationSide('front');
    setAnimationClass('animate-bounce-fast');
    setHighlightedIndex(0);

    setTimeout(() => {
      const dequeued = deque[0];
      setDeque(deque.slice(1));
      setMessage(`"${dequeued}" removed from front`);
      setOperation(null);
      setOperationSide(null);
      setHighlightedIndex(null);
      setAnimationClass('');
      setIsAnimating(false);
    }, 800);
  };

  // Dequeue from rear with enhanced animation
  const dequeueRear = () => {
    if (deque.length === 0) {
      setMessage('Deque is empty!');
      return;
    }

    setIsAnimating(true);
    setOperation('Removing from rear...');
    setOperationSide('rear');
    setAnimationClass('animate-bounce-fast');
    setHighlightedIndex(deque.length - 1);

    setTimeout(() => {
      const dequeued = deque[deque.length - 1];
      setDeque(deque.slice(0, -1));
      setMessage(`"${dequeued}" removed from rear`);
      setOperation(null);
      setOperationSide(null);
      setHighlightedIndex(null);
      setAnimationClass('');
      setIsAnimating(false);
    }, 800);
  };

  // Peek front with enhanced animation
  const peekFront = () => {
    if (deque.length === 0) {
      setMessage('Deque is empty!');
      return;
    }
    setIsAnimating(true);
    setOperationSide('front');
    setAnimationClass('animate-ping-once');
    setHighlightedIndex(0);
    setMessage(`Front element: "${deque[0]}"`);
    setTimeout(() => {
      setHighlightedIndex(null);
      setOperationSide(null);
      setAnimationClass('');
      setIsAnimating(false);
    }, 1500);
  };

  // Peek rear with enhanced animation
  const peekRear = () => {
    if (deque.length === 0) {
      setMessage('Deque is empty!');
      return;
    }
    setIsAnimating(true);
    setOperationSide('rear');
    setAnimationClass('animate-ping-once');
    setHighlightedIndex(deque.length - 1);
    setMessage(`Rear element: "${deque[deque.length - 1]}"`);
    setTimeout(() => {
      setHighlightedIndex(null);
      setOperationSide(null);
      setAnimationClass('');
      setIsAnimating(false);
    }, 1500);
  };

  // Reset deque with animation
  const reset = () => {
    if (deque.length === 0) return;
    
    setIsAnimating(true);
    setOperation('Clearing deque...');
    setAnimationClass('animate-fade-out');
    
    setTimeout(() => {
      setDeque([]);
      setMessage('Deque cleared');
      setOperation(null);
      setAnimationClass('');
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-16 pb-4 md:pt-16 md:pb-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6 mt-6 md:mt-6 md:mb-8">
          <span className="text-blue-600 dark:text-blue-600">Double-Ended Queue</span> Visualizer
        </h1>
        <Content/>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize Double Ended Queue (Deque) Operations with Animations
        </p>
        <div className="max-w-2xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="flex-1 p-2 border rounded dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                disabled={isAnimating}
              />
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={enqueueFront}
                  disabled={isAnimating}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-all hover:scale-105 active:scale-95 flex-1"
                >
                  Add Front
                </button>
                <button
                  onClick={enqueueRear}
                  disabled={isAnimating}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-all hover:scale-105 active:scale-95 flex-1"
                >
                  Add Rear
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={dequeueFront}
                disabled={isAnimating || deque.length === 0}
                className="bg-amber-500 hover:bg-amber-600 border border-transparent disabled:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-white text-white px-4 py-2 rounded disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                Remove Front
              </button>
              <button
                onClick={dequeueRear}
                disabled={isAnimating || deque.length === 0}
                className="bg-orange-600 hover:bg-orange-700 border border-transparent disabled:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-white text-white px-4 py-2 rounded disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                Remove Rear
              </button>
              <button
                onClick={peekFront}
                disabled={isAnimating || deque.length === 0}
                className="bg-purple-600 hover:bg-purple-700 border border-transparent disabled:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-white text-white px-4 py-2 rounded disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                Peek Front
              </button>
              <button
                onClick={peekRear}
                disabled={isAnimating || deque.length === 0}
                className="bg-pink-600 hover:bg-pink-700 border border-transparent disabled:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-white text-white px-4 py-2 rounded disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                Peek Rear
              </button>
            </div>
            <div className="mt-2">
              <button
                onClick={reset}
                disabled={isAnimating || deque.length === 0}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50 transition-all hover:scale-105 active:scale-95 w-full"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Operation Status */}
          {operation && (
            <div className={`mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 ${animationClass.includes('pulse') ? 'animate-pulse' : ''}`}>
              {operation}
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {message}
            </div>
          )}

          {/* Deque Visualization */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Front</span>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">Rear</span>
            </div>

            {deque.length === 0 ? (
              <div className="text-center py-8 border-2 rounded-lg border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/30">
                <span className="text-gray-600 dark:text-gray-400">Deque is empty</span>
              </div>
            ) : (
              <div className={`flex gap-2 overflow-x-auto pb-4 ${animationClass}`}>
                {deque.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      highlightedIndex === index ? 
                        operationSide === 'front' ? 'animate-highlight-blue' : 
                        operationSide === 'rear' ? 'animate-highlight-green' : 
                        'animate-highlight-yellow' : ''
                    }`}
                  >
                    <div className={`
                      w-16 sm:w-20 p-3 rounded-lg border-2 text-center font-medium
                      ${index === 0 ? 'bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-700' : ''}
                      ${index === deque.length - 1 ? 'bg-green-500 text-white border-green-600 dark:bg-green-600 dark:border-green-700' : ''}
                      ${index > 0 && index < deque.length - 1 ? 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600' : ''}
                      transition-all duration-300
                    `}>
                      {item}
                    </div>
                    {index === 0 && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 mt-1">Front</span>
                    )}
                    {index === deque.length - 1 && (
                      <span className="text-xs text-green-600 dark:text-green-400 mt-1">Rear</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <CodeBlock/>
        <ExploreOther
          title="Explore Other Types"
          links={[
            { text: "Single Ended Queue", url: "./singleEnded" },
            { text: "Circular Queue", url: "./circular" },
            { text: "Double Ended Queue", url: "./deque" },
            { text: "Priority Queue", url: "./priority" },
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

export default DoubleEndedQueueVisualizer;