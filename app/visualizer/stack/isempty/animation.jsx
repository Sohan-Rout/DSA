'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import Content from '@/app/visualizer/stack/isempty/content';
import CodeBlock from '@/app/visualizer/stack/isempty/codeBlock';
import ExploreOther from '@/app/components/ui/exploreOther';

const StackVisualizer = () => {
    const [stack, setStack] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [operation, setOperation] = useState(null);
    const [message, setMessage] = useState('Stack is empty');
    const [isAnimating, setIsAnimating] = useState(false);
    const [peekedItem, setPeekedItem] = useState(null);
    const [isEmptyStatus, setIsEmptyStatus] = useState(null);
  
    // Push operation
    const push = () => {
      if (!inputValue.trim()) {
        setMessage('Please enter a value to push');
        return;
      }
  
      setIsAnimating(true);
      setOperation(`Pushing "${inputValue}"...`);
      setMessage('');
      setPeekedItem(null);
      setIsEmptyStatus(null);
  
      setTimeout(() => {
        setStack(prev => [inputValue, ...prev]);
        setOperation(null);
        setMessage(`"${inputValue}" pushed to stack!`);
        setInputValue('');
        setIsAnimating(false);
      }, 1000);
    };
  
    // Pop operation
    const pop = () => {
      if (stack.length === 0) {
        setMessage('Stack is empty!');
        setIsEmptyStatus(true);
        return;
      }
  
      setIsAnimating(true);
      const poppedValue = stack[0];
      setOperation(`Popping "${poppedValue}"...`);
      setMessage('');
      setPeekedItem(null);
      setIsEmptyStatus(null);
  
      setTimeout(() => {
        setStack(prev => prev.slice(1));
        setOperation(null);
        setMessage(`"${poppedValue}" popped from stack!`);
        setIsAnimating(false);
      }, 1000);
    };
  
    // Peek operation
    const peek = () => {
      if (stack.length === 0) {
        setMessage('Stack is empty!');
        setIsEmptyStatus(true);
        return;
      }
  
      setIsAnimating(true);
      setOperation('Peeking at top element...');
      setPeekedItem(stack[0]);
      setIsEmptyStatus(false);
  
      setTimeout(() => {
        setOperation(null);
        setMessage(`Top element is "${stack[0]}"`);
        setIsAnimating(false);
      }, 1000);
    };
  
    // IsEmpty operation
    const checkEmpty = () => {
      setIsAnimating(true);
      setOperation('Checking if stack is empty...');
      setPeekedItem(null);
  
      setTimeout(() => {
        const empty = stack.length === 0;
        setIsEmptyStatus(empty);
        setOperation(null);
        setMessage(empty ? 'Stack is empty!' : 'Stack is not empty');
        setIsAnimating(false);
      }, 1000);
    };
  
    // Reset stack
    const reset = () => {
      setStack([]);
      setInputValue('');
      setOperation(null);
      setMessage('Stack is empty');
      setPeekedItem(null);
      setIsEmptyStatus(null);
    };
  
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
        <Navbar />
        <main className="container mx-auto px-6 py-16">
          <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
            <span className="text-blue-600">Stack</span> Visualizer
          </h1>
          <Content/>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Visualize <strong>Push</strong>, <strong>Pop</strong>, <strong>Peek</strong>, and <strong>IsEmpty</strong> operations
          </p>
  
          <div className="max-w-md mx-auto">
            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a value"
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
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={checkEmpty}
                  disabled={isAnimating}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  IsEmpty
                </button>
                <button
                  onClick={reset}
                  disabled={isAnimating}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
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
              {message && (
                <div className={`mb-4 p-3 rounded-lg ${
                  message.includes('pushed') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                  message.includes('popped') ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 
                  message.includes('Top element') ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                  isEmptyStatus !== null ? 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200' :
                  'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {message}
                </div>
              )}
  
              {/* Vertical Stack with Empty State Visualization */}
              <div className="flex flex-col items-center min-h-[300px]">
                {/* Top indicator */}
                <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  {stack.length > 0 ? '↑ Top' : ''}
                </div>
  
                {/* Stack elements or empty visualization */}
                <div className="w-32 relative">
                  {stack.length === 0 ? (
                    <div className={`text-center py-8 rounded border-2 ${
                      isEmptyStatus ? 'border-pink-300 dark:border-pink-700 bg-pink-50 dark:bg-pink-900' : 
                      'border-gray-200 dark:border-gray-600'
                    }`}>
                      <div className="text-gray-500 dark:text-gray-400">
                        {isEmptyStatus ? (
                          <div className="animate-pulse">
                            <div>Stack Empty</div>
                          </div>
                        ) : (
                          "Stack is empty"
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {stack.map((item, index) => (
                        <div 
                          key={index}
                          className={`p-3 border-2 rounded text-center font-medium ${
                            index === 0 ? 
                              peekedItem !== null ? 
                                'bg-purple-200 dark:bg-purple-800 border-purple-400 dark:border-purple-600 animate-pulse' :
                                'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700' : 
                              'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          {item}
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
            </div>
          </div>

          <CodeBlock/>
          <ExploreOther
          title="Explore other operations"
          links={[
            { text: "Push & Pop", url: "/visualizer/stack/push-pop" },
            { text: "Peek", url: "/visualizer/stack/peek" },
            { text: "Is Full", url: "/visualizer/stack/isfull" },
          ]}
        />
        </main>
        <div className="bg-gray-700 z-10 h-[1px]"></div>
        <Footer />
      </div>
    );
  };
  
  export default StackVisualizer;