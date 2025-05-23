'use client';
import React, { useState } from 'react';
import Footer from '@/app/components/footer';
import CodeBlock from '@/app/visualizer/queue/types/priority/codeBlock';
import Content from '@/app/visualizer/queue/types/priority/content';
import ExploreOther from '@/app/components/ui/exploreOther';
import Quiz from '@/app/visualizer/queue/types/priority/quiz';
import BackToTop from '@/app/components/ui/backtotop';
import GoBackButton from "@/app/components/ui/goback";

const PriorityQueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState(1);
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Priority Queue is empty');
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState('');

  // Helper function to find the insertion index for priority queue
  const findInsertIndex = (newPriority) => {
    for (let i = 0; i < queue.length; i++) {
      if (newPriority < queue[i].priority) {
        return i;
      }
    }
    return queue.length;
  };

  // Enqueue with priority (inserts in correct position)
  const enqueue = () => {
    if (!value.trim()) {
      setMessage('Please enter a value');
      return;
    }

    const newItem = { value, priority: Number(priority) };
    const insertIndex = findInsertIndex(newItem.priority);

    setIsAnimating(true);
    setOperation(`Adding "${value}" with priority ${priority}...`);
    setAnimationType('enqueue');
    setHighlightedIndex(insertIndex);

    setTimeout(() => {
      const newQueue = [...queue];
      newQueue.splice(insertIndex, 0, newItem);
      setQueue(newQueue);
      setMessage(`Added "${value}" with priority ${priority}`);
      setValue('');
      setPriority(1);
      setOperation(null);
      setHighlightedIndex(null);
      setAnimationType('');
      setIsAnimating(false);
    }, 1000);
  };

  // Dequeue (remove highest priority item)
  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Priority Queue is empty!');
      return;
    }

    setIsAnimating(true);
    setOperation('Removing highest priority item...');
    setAnimationType('dequeue');
    setHighlightedIndex(0);

    setTimeout(() => {
      const dequeued = queue[0];
      setQueue(queue.slice(1));
      setMessage(`Removed "${dequeued.value}" (priority ${dequeued.priority})`);
      setOperation(null);
      setHighlightedIndex(null);
      setAnimationType('');
      setIsAnimating(false);
    }, 1000);
  };

  // Peek at highest priority item
  const peek = () => {
    if (queue.length === 0) {
      setMessage('Priority Queue is empty!');
      return;
    }

    setIsAnimating(true);
    setAnimationType('peek');
    setHighlightedIndex(0);
    setMessage(`Highest priority: "${queue[0].value}" (priority ${queue[0].priority})`);

    setTimeout(() => {
      setHighlightedIndex(null);
      setAnimationType('');
      setIsAnimating(false);
    }, 1500);
  };

  // Reset queue
  const reset = () => {
    if (queue.length === 0) return;
    
    setIsAnimating(true);
    setOperation('Clearing priority queue...');
    setAnimationType('reset');

    setTimeout(() => {
      setQueue([]);
      setMessage('Priority Queue cleared');
      setOperation(null);
      setAnimationType('');
      setIsAnimating(false);
    }, 800);
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
          <span className="text-black dark:text-white">Priority Queue</span>
        </h1>
        <div className="bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl mt-2 mb-5"></div>
        <Content />
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize Priority Queue Operations with Animations
        </p>
        <div className="max-w-2xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="flex-1 p-2 border rounded dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 transition-all"
                disabled={isAnimating}
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 transition-all w-24"
                disabled={isAnimating}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>Priority {num}</option>
                ))}
              </select>
              <button
                onClick={enqueue}
                disabled={isAnimating}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                Enqueue
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={dequeue}
                disabled={isAnimating || queue.length === 0}
                className="bg-none border border-black dark:border-white text-black dark:text-white disabled:border-blue-600 disabled:dark:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-blue-600 px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
              >
                Dequeue
              </button>
              <button
                onClick={peek}
                disabled={isAnimating || queue.length === 0}
                className="bg-none border border-black dark:border-white text-black dark:text-white disabled:border-blue-600 disabled:dark:border-blue-600 disabled:bg-transparent disabled:text-blue-600 dark:disabled:text-blue-600 px-4 py-2 rounded disabled:opacity-50 transition-transform hover:scale-105"
                >
                Peek
              </button>
            </div>
            <div className="mt-2">
              <button
                onClick={reset}
                disabled={isAnimating || queue.length === 0}
                className="bg-none border border-black dark:border-white text-black dark:text-white px-4 py-2 w-full rounded transition-transform hover:scale-105"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {message}
            </div>
          )}

          {/* Priority Queue Visualization */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">Highest Priority</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Lowest Priority</span>
            </div>

            {queue.length === 0 ? (
              <div className="text-center py-8 border-2 rounded-lg border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/30">
                <span className="text-gray-600 dark:text-gray-400">Priority Queue is empty</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {queue.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-lg border-2 transition-all duration-300 ${
                      highlightedIndex === index
                        ? animationType === 'enqueue'
                          ? 'animate-highlight-insert bg-purple-100 dark:bg-purple-900 border-purple-400'
                          : animationType === 'dequeue'
                          ? 'animate-highlight-remove bg-amber-100 dark:bg-amber-900 border-amber-400'
                          : animationType === 'peek'
                          ? 'animate-highlight-peek bg-blue-100 dark:bg-blue-900 border-blue-400'
                          : ''
                        : getPriorityColor(item.priority)
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white font-bold mr-3">
                      {item.priority}
                    </div>
                    <div className="flex-1 font-medium">
                      {item.value}
                    </div>
                    {index === 0 && (
                      <span className="text-xs text-purple-600 dark:text-purple-400 ml-2">Highest</span>
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

        <CodeBlock/>
        <ExploreOther
          title="Explore Other Types"
          links={[
            { text: "Single Ended Queue", url: "./singleEnded" },
            { text: "Circular Queue", url: "./circular" },
            { text: "Double-Ended Queue", url: "./deque" },
            { text: "Multiple Queue", url: "./multiple" },
          ]}
        />
      </main>
      <div>
        <div className="bg-gray-700 z-10 h-[1px]"></div>
      </div>
      <BackToTop/>
      <Footer />
    </div>
  );
};

// Helper function for priority-based coloring
const getPriorityColor = (priority) => {
  switch(priority) {
    case 1:
      return 'bg-red-100 dark:bg-red-900/50 border-red-300 dark:border-red-700';
    case 2:
      return 'bg-orange-100 dark:bg-orange-900/50 border-orange-300 dark:border-orange-700';
    case 3:
      return 'bg-yellow-100 dark:bg-yellow-900/50 border-yellow-300 dark:border-yellow-700';
    case 4:
      return 'bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700';
    case 5:
      return 'bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700';
    default:
      return 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600';
  }
};

export default PriorityQueueVisualizer;