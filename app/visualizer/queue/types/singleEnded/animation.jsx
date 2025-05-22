'use client';
import React, { useState } from 'react';
import Footer from '@/app/components/footer';
import CodeBlock from '@/app/visualizer/queue/types/singleEnded/codeBlock';
import Content from '@/app/visualizer/queue/types/singleEnded/content';
import ExploreOther from '@/app/components/ui/exploreOther';
import Quiz from '@/app/visualizer/queue/types/singleEnded/quiz';
import BackToTop from '@/app/components/ui/backtotop';
import GoBackButton from "@/app/components/ui/goback";

const SingleEndedQueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Queue is empty'); // Added message state
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
    <div className="min-h-screen max-h-auto bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200">
      <main className="container mx-auto px-6 pt-16 pb-4">
        {/* go back block here */}
        <div className="mt-10 sm:mt-10">
          <GoBackButton />
        </div>

        {/* main logic here */}
        <h1 className="text-4xl md:text-4xl mt-6 ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
          <span className="text-black dark:text-white">Single Ended Queue</span>
        </h1>
        <div className="bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl mt-2 mb-5"></div>
        <Content />
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105 w-full sm:w-auto"
              >
                Enqueue
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={dequeueFront}
                disabled={isAnimating || queue.length === 0}
                className="bg-none border-black dark:border-white text-black dark:text-white px-4 py-2 rounded disabled:opacity-50 disabled:bg-transparent disabled:text-blue-600 disabled:border-blue-600 dark:disabled:text-blue-600 border dark:disabled:border-blue-600 transition-transform hover:scale-105"
              >
                Dequeue
              </button>
              <button
                onClick={peekFront}
                disabled={isAnimating || queue.length === 0}
                className="bg-none border-black dark:border-white text-black dark:text-white px-4 py-2 rounded disabled:opacity-50 disabled:bg-transparent disabled:text-blue-600 disabled:border-blue-600 dark:disabled:text-blue-600 border dark:disabled:border-blue-600 transition-transform hover:scale-105"
              >
                Peek Front
              </button>
              <button
                onClick={peekRear}
                disabled={isAnimating || queue.length === 0}
                className="bg-none border-black dark:border-white text-black dark:text-white px-4 py-2 rounded disabled:opacity-50 disabled:bg-transparent disabled:text-blue-600 disabled:border-blue-600 dark:disabled:text-blue-600 border dark:disabled:border-blue-600 transition-transform hover:scale-105"
              >
                Peek Rear
              </button>
              <button
                onClick={reset}
                disabled={isAnimating}
                className="bg-none border-black dark:border-white text-black dark:text-white px-4 py-2 rounded disabled:opacity-50 disabled:bg-transparent disabled:text-blue-600 disabled:border-blue-600 dark:disabled:text-blue-600 border dark:disabled:border-blue-600 transition-transform hover:scale-105"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Operation Status */}
          {operation && (
            <div className="mb-2 p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 animate-pulse">
              {operation}
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {message}
            </div>
          )}

          {/* Queue Visualization */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                Front
              </span>
              <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                Rear
              </span>
            </div>

            {queue.length === 0 ? (
              <div className="text-center py-8 border-2 rounded-lg border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/30">
                <span className="text-gray-600 dark:text-gray-400">
                  Queue is empty
                </span>
              </div>
            ) : (
              <div className="flex gap-2 overflow-x-auto pb-4">
                {queue.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      highlightedIndex === index ? "transform scale-110" : ""
                    }`}
                  >
                    <div
                      className={`
                      w-16 sm:w-20 p-3 rounded-lg border-2 text-center font-medium
                      ${
                        index === 0
                          ? "bg-green-500 text-white border-green-600 dark:bg-green-600 dark:border-green-700"
                          : ""
                      }
                      ${
                        index === queue.length - 1
                          ? "bg-orange-500 text-white border-orange-600 dark:bg-orange-600 dark:border-orange-700"
                          : ""
                      }
                      ${
                        highlightedIndex === index
                          ? "ring-4 ring-yellow-400 dark:ring-yellow-500"
                          : ""
                      }
                      ${
                        index > 0 && index < queue.length - 1
                          ? "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                          : ""
                      }
                    `}
                    >
                      {item}
                    </div>
                    {index === 0 && (
                      <span className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Front
                      </span>
                    )}
                    {index === queue.length - 1 && (
                      <span className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                        Rear
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mt-8 mb-8">
          Test Your Knowledge before moving forward!
        </p>
        <Quiz />

        <CodeBlock />
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
      <BackToTop />
      <Footer />
    </div>
  );
};

export default SingleEndedQueueVisualizer;