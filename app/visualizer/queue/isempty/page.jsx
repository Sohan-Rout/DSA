'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState(['Apple', 'Banana', 'Cherry']);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Queue ready');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEmptyStatus, setIsEmptyStatus] = useState(null);

  // Enqueue operation (add to rear/right)
  const enqueue = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    setIsAnimating(true);
    setOperation(`Enqueuing "${inputValue}" to rear...`);
    setIsEmptyStatus(false);
    
    setTimeout(() => {
      setQueue(prev => [...prev, inputValue]);
      setOperation(null);
      setMessage(`"${inputValue}" added to rear`);
      setInputValue('');
      setIsAnimating(false);
    }, 1000);
  };

  // Dequeue operation (remove from front/left)
  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      setIsEmptyStatus(true);
      return;
    }

    setIsAnimating(true);
    const dequeuedValue = queue[0];
    setOperation(`Dequeuing "${dequeuedValue}" from front...`);
    setIsEmptyStatus(false);
    
    setTimeout(() => {
      setQueue(prev => prev.slice(1));
      setOperation(null);
      setMessage(`"${dequeuedValue}" removed from front`);
      setIsAnimating(false);
      if (queue.length === 1) setIsEmptyStatus(true);
    }, 1000);
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
    }, 1000);
  };

  // Reset queue
  const reset = () => {
    setQueue(['Apple', 'Banana', 'Cherry']);
    setInputValue('');
    setOperation(null);
    setMessage('Queue reset');
    setIsEmptyStatus(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
          <span className="text-blue-600">Queue</span> Visualizer
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize <strong>Enqueue</strong>, <strong>Dequeue</strong>, and <strong>IsEmpty</strong> operations
        </p>

        <div className="max-w-2xl mx-auto">
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
                onClick={enqueue}
                disabled={isAnimating}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Enqueue
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={dequeue}
                disabled={isAnimating || queue.length === 0}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Dequeue
              </button>
              <button
                onClick={checkEmpty}
                disabled={isAnimating}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                IsEmpty
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

          {/* Queue Visualization */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Queue Visualization (FIFO)</h2>
            
            {/* Operation Status */}
            {operation && (
              <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {operation}
              </div>
            )}

            {/* Message Display */}
            <div className={`mb-6 p-3 rounded-lg ${
              message.includes('added') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
              message.includes('removed') ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
              isEmptyStatus !== null ? 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200' :
              'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}>
              {message}
            </div>

            {/* Horizontal Queue - Left (Front) to Right (Rear) */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  ← Front
                </span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Rear →
                </span>
              </div>

              {/* Queue elements */}
              <div className="min-h-[120px]">
                {queue.length === 0 ? (
                  <div className={`text-center py-8 border-2 rounded-lg ${
                    isEmptyStatus ? 'border-pink-300 bg-pink-50 dark:border-pink-700 dark:bg-pink-900 animate-pulse' :
                    'border-dashed border-gray-300 dark:border-gray-600'
                  }`}>
                    <span className={`${isEmptyStatus ? 'text-pink-600 dark:text-pink-300' : 'text-gray-500'}`}>
                      {isEmptyStatus ? 'Queue is empty!' : 'Queue is empty'}
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2 overflow-x-auto pb-4">
                    {queue.map((item, index) => (
                      <div 
                        key={index}
                        className="flex flex-col items-center"
                      >
                        <div className={`w-20 p-3 rounded-t-lg border-2 text-center font-medium ${
                          index === 0 ? 
                            'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700' :
                            index === queue.length - 1 ?
                            'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700' :
                            'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                        }`}>
                          {item}
                          {index === 0 && (
                            <div className="text-xs mt-1 text-blue-600 dark:text-blue-400">
                              (Front)
                            </div>
                          )}
                        </div>
                        <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-b-lg"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Queue Explanation */}
            <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-2">Queue Operations:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium text-green-600 dark:text-green-400">Enqueue</span>: Add to rear (right)</li>
                <li><span className="font-medium text-yellow-600 dark:text-yellow-400">Dequeue</span>: Remove from front (left)</li>
                <li><span className="font-medium text-pink-600 dark:text-pink-400">IsEmpty</span>: Check if queue has no elements</li>
                <li><span className="font-medium text-blue-600 dark:text-blue-400">FIFO</span>: First In, First Out principle</li>
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

export default QueueVisualizer;