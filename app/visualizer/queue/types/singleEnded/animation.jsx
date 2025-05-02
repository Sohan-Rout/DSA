'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import CodeBlock from '@/app/visualizer/queue/types/singleEnded/codeBlock';
import Content from '@/app/visualizer/queue/types/singleEnded/content';
import ExploreOther from '@/app/components/ui/exploreOther';

const SingleEndedQueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [setMessage] = useState('Queue is empty');
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Enqueue at rear
  const enqueueRear = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    setIsAnimating(true);
    setOperation(`Enqueuing "${inputValue}" at rear...`);
    setHighlightedIndex(queue.length);

    setTimeout(() => {
      setQueue([...queue, inputValue]);
      setMessage(`"${inputValue}" added to rear`);
      setInputValue('');
      setOperation(null);
      setHighlightedIndex(null);
      setIsAnimating(false);
    }, 600);
  };

  // Dequeue from front
  const dequeueFront = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      return;
    }

    setIsAnimating(true);
    setOperation('Dequeuing from front...');
    setHighlightedIndex(0);

    setTimeout(() => {
      const dequeued = queue[0];
      setQueue(queue.slice(1));
      setMessage(`"${dequeued}" removed from front`);
      setOperation(null);
      setHighlightedIndex(null);
      setIsAnimating(false);
    }, 600);
  };

  // Peek front
  const peekFront = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      return;
    }
    setIsAnimating(true);
    setHighlightedIndex(0);
    setMessage(`Front element: "${queue[0]}"`);
    setTimeout(() => {
      setHighlightedIndex(null);
      setIsAnimating(false);
    }, 1500);
  };

  // Peek rear
  const peekRear = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      return;
    }
    setIsAnimating(true);
    setHighlightedIndex(queue.length - 1);
    setMessage(`Rear element: "${queue[queue.length - 1]}"`);
    setTimeout(() => {
      setHighlightedIndex(null);
      setIsAnimating(false);
    }, 1500);
  };

  // Reset queue
  const reset = () => {
    setQueue([]);
    setMessage('Queue cleared');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-16 pb-4 md:pt-16 md:pb-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6 mt-6 md:mt-6 md:mb-8">
          <span className="text-blue-600 dark:text-blue-600">Single-Ended Queue</span> Visualizer
        </h1>
        <Content/>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Visualize Single Ended Queue Operations
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
                className="flex-1 p-2 border rounded dark:bg-gray-700 focus:ring-2 focus:ring-green-500 transition-all"
                disabled={isAnimating}
              />
              <button
                onClick={enqueueRear}
                disabled={isAnimating}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105 w-full sm:w-auto"
              >
                Enqueue Rear
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={dequeueFront}
                disabled={isAnimating || queue.length === 0}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
              >
                Dequeue Front
              </button>
              <button
                onClick={peekFront}
                disabled={isAnimating || queue.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
              >
                Peek Front
              </button>
              <button
                onClick={peekRear}
                disabled={isAnimating || queue.length === 0}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
              >
                Peek Rear
              </button>
              <button
                onClick={reset}
                disabled={isAnimating}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Operation Status */}
          {operation && (
            <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 animate-pulse">
              {operation}
            </div>
          )}

          {/* Queue Visualization */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">Front</span>
              <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">Rear</span>
            </div>

            {queue.length === 0 ? (
              <div className="text-center py-8 border-2 rounded-lg border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/30">
                <span className="text-gray-600 dark:text-gray-400">Queue is empty</span>
              </div>
            ) : (
              <div className="flex gap-2 overflow-x-auto pb-4">
                {queue.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      highlightedIndex === index ? 'transform scale-110' : ''
                    }`}
                  >
                    <div className={`
                      w-16 sm:w-20 p-3 rounded-lg border-2 text-center font-medium
                      ${index === 0 ? 'bg-green-500 text-white border-green-600 dark:bg-green-600 dark:border-green-700' : ''}
                      ${index === queue.length - 1 ? 'bg-orange-500 text-white border-orange-600 dark:bg-orange-600 dark:border-orange-700' : ''}
                      ${highlightedIndex === index ? 'ring-4 ring-yellow-400 dark:ring-yellow-500' : ''}
                      ${index > 0 && index < queue.length - 1 ? 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600' : ''}
                    `}>
                      {item}
                    </div>
                    {index === 0 && (
                      <span className="text-xs text-green-600 dark:text-green-400 mt-1">Front</span>
                    )}
                    {index === queue.length - 1 && (
                      <span className="text-xs text-orange-600 dark:text-orange-400 mt-1">Rear</span>
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
            { text: "Double Ended Queue", url: "./deque" },
            { text: "Circular Queue", url: "./circular" },
            { text: "Multiple Queue", url: "./multiple" },
            { text: "Priority Queue", url: "./priority" },
          ]}
        />
      </main>
      <div>
        <div className="bg-gray-700 z-10 h-[1px]"></div>
      </div>
      <div className="bg-gray-700 z-10 h-[1px]"></div>
      <Footer />
    </div>
  );
};

export default SingleEndedQueueVisualizer;