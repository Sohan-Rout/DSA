'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import CodeBlock from "@/app/visualizer/queue/operations/isfull/codeBlock";
import Content from "@/app/visualizer/queue/operations/isfull/content";
import ExploreOther from '@/app/components/ui/exploreOther';

const QueueVisualizer = () => {
  const MAX_SIZE = 5; // Set maximum queue size
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Queue is empty');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEmptyStatus, setIsEmptyStatus] = useState(true);
  const [isFullStatus, setIsFullStatus] = useState(false);
  const [highlightFull, setHighlightFull] = useState(false);

  // Check if queue is full whenever it changes
  useEffect(() => {
    const full = queue.length >= MAX_SIZE;
    setIsFullStatus(full);
    if (full) {
      setMessage(`Queue is full (max ${MAX_SIZE} items)`);
    }
  }, [queue]);

  // Enqueue operation
  const enqueue = () => {
    if (isFullStatus) {
      // Animation for full queue
      setHighlightFull(true);
      setTimeout(() => setHighlightFull(false), 1000);
      setMessage(`Cannot enqueue - queue is full!`);
      return;
    }

    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    setIsAnimating(true);
    setOperation(`Enqueuing "${inputValue}"...`);
    setIsEmptyStatus(false);

    setTimeout(() => {
      setQueue((prev) => [...prev, inputValue]);
      setOperation(null);
      setMessage(`"${inputValue}" added to queue`);
      setInputValue('');
      setIsAnimating(false);
    }, 800);
  };

  // Dequeue operation
  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      setIsEmptyStatus(true);
      return;
    }

    setIsAnimating(true);
    const dequeuedValue = queue[0];
    setOperation(`Dequeuing "${dequeuedValue}"...`);

    setTimeout(() => {
      setQueue((prev) => prev.slice(1));
      setOperation(null);
      setMessage(`"${dequeuedValue}" removed from queue`);
      setIsAnimating(false);
      setIsEmptyStatus(queue.length === 1);
    }, 800);
  };

  // IsEmpty operation
  const checkEmpty = () => {
    setIsAnimating(true);
    setOperation('Checking if queue is empty...');

    setTimeout(() => {
      const empty = queue.length === 0;
      setIsEmptyStatus(empty);
      setOperation(null);
      setMessage(empty ? 'Queue is empty!' : 'Queue is not empty');
      setIsAnimating(false);
    }, 800);
  };

  // IsFull operation
  const checkFull = () => {
    setIsAnimating(true);
    setOperation('Checking if queue is full...');
    setHighlightFull(true);

    setTimeout(() => {
      setOperation(null);
      setMessage(isFullStatus ? `Queue is full (max ${MAX_SIZE} items)` : 'Queue is not full');
      setIsAnimating(false);
      setTimeout(() => setHighlightFull(false), 500);
    }, 800);
  };

  // Reset queue
  const reset = () => {
    setQueue([]);
    setInputValue('');
    setOperation(null);
    setMessage('Queue cleared');
    setIsEmptyStatus(true);
    setIsFullStatus(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
          <span className="text-blue-600">Queue</span> Visualizer
        </h1>
        <Content/>

        <div className="max-w-2xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="flex-1 p-2 border rounded dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                disabled={isAnimating || isFullStatus}
              />
              <button
                onClick={enqueue}
                disabled={isAnimating || isFullStatus}
                className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 w-full sm:w-auto ${
                  isFullStatus ? 'cursor-not-allowed' : ''
                }`}
              >
                Enqueue
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={dequeue}
                disabled={isAnimating || queue.length === 0}
                className="bg-amber-500 hover:bg-amber-600 border border-transparent disabled:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-white text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Dequeue
              </button>
              <button
                onClick={checkFull}
                disabled={isAnimating}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                IsFull
              </button>
              <button
                onClick={reset}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={isAnimating}
              >
                Reset
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Max size: {MAX_SIZE} items
            </div>
          </div>

          {/* Queue Visualization */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            {/* Operation Status */}
            {operation && (
              <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {operation}
              </div>
            )}

            {/* Message Display */}
            <div
              className={`mb-6 p-3 rounded-lg ${
                message.includes('added')
                  ? 'bg-green-100 dark:bg-green-900'
                  : message.includes('removed')
                  ? 'bg-red-100 dark:bg-red-900'
                  : message.includes('full')
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : isEmptyStatus
                  ? 'bg-purple-100 dark:bg-purple-900'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              {message}
            </div>

            {/* Horizontal Queue - Left (Front) to Right (Rear) */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Front
                </span>
                <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                  Rear
                </span>
              </div>

              {/* Queue elements */}
              <div className="min-h-[120px]">
                {queue.length === 0 ? (
                  <div
                    className={`text-center py-8 border-2 rounded-lg ${
                      isEmptyStatus
                        ? 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/30'
                        : 'border-dashed border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <span
                      className={`${isEmptyStatus ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500'}`}
                    >
                      {isEmptyStatus ? 'Queue is empty!' : 'Queue is empty'}
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2 overflow-x-auto pb-4">
                    {Array.from({ length: MAX_SIZE }).map((_, index) => {
                      const item = queue[index];
                      return (
                        <div key={index} className="flex flex-col items-center transition-all duration-300">
                          <div
                            className={`w-16 sm:w-20 p-3 rounded-lg border-2 text-center font-medium ${
                              index < queue.length
                                ? index === 0
                                  ? 'bg-green-500 text-white border-green-600'
                                  : index === queue.length - 1
                                  ? 'bg-orange-500 text-white border-orange-600'
                                  : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                                : highlightFull && index === queue.length
                                ? 'bg-blue-500 text-white border-blue-600 animate-pulse'
                                : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'
                            } ${
                              highlightFull && index >= queue.length
                                ? 'animate-pulse border-blue-500 bg-blue-100 dark:bg-blue-900/50'
                                : ''
                            }`}
                          >
                            {item || (
                              <span className="text-gray-400 dark:text-gray-500 text-xs">
                                {index === queue.length ? 'Next' : 'Empty'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <CodeBlock/>
        <ExploreOther
          title="Explore Other Operations"
          links={[
            { text: "Peek Front", url: "./peek-front" },
            { text: "Enqueue & Dequeue", url: "./enqueue-dequeue" },
            { text: "Is Empty", url: "./isempty" },
          ]}
        />
      </main>
      <div className="bg-gray-700 z-10 h-[1px]"></div>
      <Footer />
    </div>
  );
};

export default QueueVisualizer;