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
    const [peekedItem, setPeekedItem] = useState(null);
  
    // Enqueue operation (add to rear/right)
    const enqueue = () => {
      if (!inputValue.trim()) {
        setMessage('Please enter a value');
        return;
      }
  
      setIsAnimating(true);
      setOperation(`Enqueuing "${inputValue}" to rear...`);
      setPeekedItem(null);
      
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
        return;
      }
  
      setIsAnimating(true);
      const dequeuedValue = queue[0];
      setOperation(`Dequeuing "${dequeuedValue}" from front...`);
      setPeekedItem(null);
      
      setTimeout(() => {
        setQueue(prev => prev.slice(1));
        setOperation(null);
        setMessage(`"${dequeuedValue}" removed from front`);
        setIsAnimating(false);
      }, 1000);
    };
  
    // Peek Front operation
    const peekFront = () => {
      if (queue.length === 0) {
        setMessage('Queue is empty!');
        return;
      }
  
      setIsAnimating(true);
      setOperation('Peeking at front element...');
      setPeekedItem(queue[0]);
      
      setTimeout(() => {
        setOperation(null);
        setMessage(`Front element is "${queue[0]}"`);
        setIsAnimating(false);
      }, 1000);
    };
  
    // Reset queue
    const reset = () => {
      setQueue(['Apple', 'Banana', 'Cherry']);
      setInputValue('');
      setOperation(null);
      setMessage('Queue reset');
      setPeekedItem(null);
    };
  
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
        <Navbar />
        <main className="container mx-auto px-6 py-16">
          <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
            <span className="text-blue-600">Queue</span> Visualizer
          </h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Visualize <strong>Enqueue</strong>, <strong>Dequeue</strong>, and <strong>Peek Front</strong> operations
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
                  onClick={peekFront}
                  disabled={isAnimating || queue.length === 0}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Peek Front
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
                message.includes('Front element') ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
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
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                      Queue is empty
                    </div>
                  ) : (
                    <div className="flex gap-2 overflow-x-auto pb-4">
                      {queue.map((item, index) => (
                        <div 
                          key={index}
                          className={`flex flex-col items-center transition-all ${
                            index === 0 && operation?.includes('Dequeuing') ? 
                              'animate-bounce-left' : ''
                          }`}
                        >
                          <div className={`w-20 p-3 rounded-t-lg border-2 text-center font-medium ${
                            index === 0 ? 
                              peekedItem !== null ?
                                'bg-purple-200 dark:bg-purple-800 border-purple-400 dark:border-purple-600 animate-pulse' :
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
                  <li><span className="font-medium text-purple-600 dark:text-purple-400">Peek Front</span>: View front element</li>
                  <li><span className="font-medium text-blue-600 dark:text-blue-400">FIFO</span>: First In, First Out</li>
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