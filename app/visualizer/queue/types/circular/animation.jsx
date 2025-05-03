'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import CodeBlock from '@/app/visualizer/queue/types/circular/codeBlock';
import Content from '@/app/visualizer/queue/types/circular/content';
import ExploreOther from '@/app/components/ui/exploreOther';

const CircularQueueVisualizer = () => {
  const [queue, setQueue] = useState(Array(5).fill(null));
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Queue is empty');
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [size, setSize] = useState(5); // Default size

  const isFull = () => {
    return (rear + 1) % size === front;
  };

  const isEmpty = () => {
    return front === -1;
  };

  // Enqueue
  const enqueue = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    if (isFull()) {
      setMessage('Queue is full!');
      return;
    }

    setIsAnimating(true);
    setOperation(`Enqueuing "${inputValue}"...`);
    
    const newRear = (rear + 1) % size;
    setHighlightedIndex(newRear);

    setTimeout(() => {
      const newQueue = [...queue];
      newQueue[newRear] = inputValue;
      setQueue(newQueue);
      
      if (front === -1) {
        setFront(0);
      }
      setRear(newRear);
      
      setMessage(`"${inputValue}" added to queue`);
      setInputValue('');
      setOperation(null);
      setHighlightedIndex(null);
      setIsAnimating(false);
    }, 600);
  };

  // Dequeue
  const dequeue = () => {
    if (isEmpty()) {
      setMessage('Queue is empty!');
      return;
    }

    setIsAnimating(true);
    setOperation('Dequeuing...');
    setHighlightedIndex(front);

    setTimeout(() => {
      const dequeued = queue[front];
      const newQueue = [...queue];
      newQueue[front] = null;
      setQueue(newQueue);
      
      if (front === rear) {
        setFront(-1);
        setRear(-1);
      } else {
        setFront((front + 1) % size);
      }
      
      setMessage(`"${dequeued}" removed from queue`);
      setOperation(null);
      setHighlightedIndex(null);
      setIsAnimating(false);
    }, 600);
  };

  // Peek front
  const peekFront = () => {
    if (isEmpty()) {
      setMessage('Queue is empty!');
      return;
    }
    setIsAnimating(true);
    setHighlightedIndex(front);
    setMessage(`Front element: "${queue[front]}"`);
    setTimeout(() => {
      setHighlightedIndex(null);
      setIsAnimating(false);
    }, 1500);
  };

  // Peek rear
  const peekRear = () => {
    if (isEmpty()) {
      setMessage('Queue is empty!');
      return;
    }
    setIsAnimating(true);
    setHighlightedIndex(rear);
    setMessage(`Rear element: "${queue[rear]}"`);
    setTimeout(() => {
      setHighlightedIndex(null);
      setIsAnimating(false);
    }, 1500);
  };

  // Reset queue
  const reset = () => {
    setQueue(Array(size).fill(null));
    setFront(-1);
    setRear(-1);
    setMessage('Queue cleared');
  };

  // Change queue size
  const changeSize = (newSize) => {
    if (isAnimating) return;
    setSize(newSize);
    setQueue(Array(newSize).fill(null));
    setFront(-1);
    setRear(-1);
    setMessage(`Queue size changed to ${newSize}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-16 pb-4 md:pt-16 md:pb-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6 mt-6 md:mt-6 md:mb-8">
          <span className="text-blue-600 dark:text-blue-600">Circular Queue</span> Visualizer
        </h1>
        <Content/>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize Circular Queue Operations
        </p>
        <div className="max-w-2xl mx-auto">
          {/* Queue Size Controls */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => changeSize(5)}
                disabled={isAnimating || size === 5}
                className={`px-3 py-1 rounded ${size === 5 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${isAnimating ? 'opacity-50' : ''}`}
              >
                Size 5
              </button>
              <button
                onClick={() => changeSize(7)}
                disabled={isAnimating || size === 7}
                className={`px-3 py-1 rounded ${size === 7 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${isAnimating ? 'opacity-50' : ''}`}
              >
                Size 7
              </button>
              <button
                onClick={() => changeSize(10)}
                disabled={isAnimating || size === 10}
                className={`px-3 py-1 rounded ${size === 10 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${isAnimating ? 'opacity-50' : ''}`}
              >
                Size 10
              </button>
            </div>
          </div>

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
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={dequeue}
                disabled={isAnimating || isEmpty()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-white border border-transparent disabled:border-blue-600 transition-transform hover:scale-105"
              >
                Dequeue
              </button>
              <button
                onClick={peekFront}
                disabled={isAnimating || isEmpty()}
                className="bg-blue-600 hover:bg-blue-700 border border-transparent disabled:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-white text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
              >
                Peek Front
              </button>
              <button
                onClick={peekRear}
                disabled={isAnimating || isEmpty()}
                className="bg-purple-600 hover:bg-purple-700 border border-transparent disabled:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-white text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
              >
                Peek Rear
              </button>
              <button
                onClick={reset}
                disabled={isAnimating}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
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
                Front: {front === -1 ? 'None' : front}
              </span>
              <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                Rear: {rear === -1 ? 'None' : rear}
              </span>
            </div>

            {isEmpty() ? (
              <div className="text-center py-8 border-2 rounded-lg border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/30">
                <span className="text-gray-600 dark:text-gray-400">Queue is empty</span>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-2 pb-4">
                {queue.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      highlightedIndex === index ? 'transform scale-110' : ''
                    }`}
                  >
                    <div className={`
                      w-full p-3 rounded-lg border-2 text-center font-medium
                      ${index === front ? 'bg-green-500 text-white border-green-600 dark:bg-green-600 dark:border-green-700' : ''}
                      ${index === rear ? 'bg-orange-500 text-white border-orange-600 dark:bg-orange-600 dark:border-orange-700' : ''}
                      ${highlightedIndex === index ? 'ring-4 ring-yellow-400 dark:ring-yellow-500' : ''}
                      ${item === null ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600' : 'bg-gray-200 dark:bg-gray-600 border-gray-400 dark:border-gray-500'}
                    `}>
                      {item === null ? 'Empty' : item}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{index}</span>
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
            { text: "Double Ended Queue", url: "./deque" },
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

export default CircularQueueVisualizer;