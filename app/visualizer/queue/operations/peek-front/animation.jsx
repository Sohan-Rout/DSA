'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import Content from "@/app/visualizer/queue/operations/peek-front/content";
import CodeBlock from "@/app/visualizer/queue/operations/peek-front/codeBlock";
import ExploreOther from '@/app/components/ui/exploreOther';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Queue is empty');
  const [isAnimating, setIsAnimating] = useState(false);
  const [peekedItem, setPeekedItem] = useState(null);

  // Enqueue operation (add to rear/right)
  const enqueue = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    setIsAnimating(true);
    setOperation(`Enqueuing "${inputValue}"...`);
    setPeekedItem(null);

    setTimeout(() => {
      setQueue((prev) => [...prev, inputValue]);
      setOperation(null);
      setMessage(`"${inputValue}" added to queue`);
      setInputValue('');
      setIsAnimating(false);
    }, 600);
  };

  // Dequeue operation (remove from front/left)
  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      return;
    }

    setIsAnimating(true);
    const dequeuedValue = queue[0];
    setOperation(`Dequeuing "${dequeuedValue}"...`);
    setPeekedItem(null);

    setTimeout(() => {
      setQueue((prev) => prev.slice(1));
      setOperation(null);
      setMessage(`"${dequeuedValue}" removed from queue`);
      setIsAnimating(false);
    }, 600);
  };

  // Peek Front operation
  const peekFront = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      return;
    }

    const frontItem = queue[0];
    setPeekedItem(frontItem);
    setMessage(`Front element is "${frontItem}"`);
  };

  // Reset queue
  const reset = () => {
    setQueue([]);
    setInputValue('');
    setOperation(null);
    setMessage('Queue cleared');
    setPeekedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
          <span className="text-blue-600">Queue</span> Visualizer
        </h1>
        <Content/>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Play with Enqueue, Dequeue, and Peek Front to see a queue in action!
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
                onClick={enqueue}
                disabled={isAnimating}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105 w-full sm:w-auto"
              >
                Enqueue
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={dequeue}
                disabled={isAnimating || queue.length === 0}
                className="bg-amber-500 hover:bg-amber-600 border border-transparent disabled:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-white text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
              >
                Dequeue
              </button>
              <button
                onClick={peekFront}
                disabled={isAnimating || queue.length === 0}
                className="bg-purple-600 hover:bg-purple-700 border border-transparent disabled:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-white text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
              >
                Peek Front
              </button>
              <button
                onClick={reset}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
                disabled={isAnimating}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Queue Visualization */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            {/* Operation Status */}
            {operation && (
              <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 animate-pulse">
                {operation}
              </div>
            )}

            {/* Message Display */}
            <div
              className={`mb-6 p-3 rounded-lg ${
                message.includes('added')
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : message.includes('removed')
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  : message.includes('Front element')
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {message}
            </div>

            {/* Horizontal Queue - Left (Front) to Right (Rear) */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Front</span>
                <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">Rear</span>
              </div>

              {/* Queue elements */}
              <div className="min-h-[120px]">
                {queue.length === 0 ? (
                  <div
                    className={`text-center py-8 border-2 rounded-lg border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/30`}
                  >
                    <span className="text-gray-600 dark:text-gray-400">Queue is empty!</span>
                  </div>
                ) : (
                  <div className="flex gap-2 overflow-x-auto pb-4">
                    {queue.map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className={`flex flex-col items-center transition-all duration-600 ${
                          index === queue.length - 1 && operation?.includes('Enqueuing')
                            ? 'animate-slide-in-right'
                            : index === 0 && operation?.includes('Dequeuing')
                            ? 'animate-slide-out-left'
                            : ''
                        }`}
                      >
                        <div
                          className={`w-16 sm:w-20 p-3 rounded-lg border-2 text-center font-medium ${
                            index === 0
                              ? peekedItem === item
                                ? 'bg-purple-500 text-white border-purple-600 animate-pulse'
                                : 'bg-green-500 text-white border-green-600'
                              : index === queue.length - 1
                              ? 'bg-orange-500 text-white border-orange-600'
                              : 'bg-blue-200 dark:bg-blue-700 border-blue-300 dark:border-blue-600'
                          }`}
                        >
                          {item}
                        </div>
                      </div>
                    ))}
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
            { text: "Enqueue & Dequeue", url: "./enqueue-dequeue" },
            { text: "Is Full", url: "./isfull" },
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