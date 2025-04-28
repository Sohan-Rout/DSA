'use client';

import { useState } from 'react';

const PushPop = ({ stack, setStack, isAnimating, setIsAnimating, setMessage, setOperation }) => {
  const [inputValue, setInputValue] = useState('');

  // Push operation
  const push = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    setIsAnimating(true);
    setOperation(`Pushing "${inputValue}"...`);
    
    setTimeout(() => {
      setStack(prev => [inputValue, ...prev]);
      setOperation(null);
      setMessage(`"${inputValue}" pushed to stack`);
      setInputValue('');
      setIsAnimating(false);
    }, 1000);
  };

  // Pop operation
  const pop = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty!');
      return;
    }

    setIsAnimating(true);
    const poppedValue = stack[0];
    setOperation(`Popping "${poppedValue}"...`);
    
    setTimeout(() => {
      setStack(prev => prev.slice(1));
      setOperation(null);
      setMessage(`"${poppedValue}" popped from stack`);
      setIsAnimating(false);
    }, 1000);
  };

  // Peek operation
  const peek = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty!');
      return;
    }

    setIsAnimating(true);
    setOperation(`Peeking at "${stack[0]}"`);
    
    setTimeout(() => {
      setOperation(null);
      setMessage(`Top element is "${stack[0]}"`);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="flex-1 p-2 border rounded dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
          disabled={isAnimating}
        />
        <button
          onClick={push}
          disabled={isAnimating}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 sm:w-auto w-full"
        >
          Push
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          onClick={pop}
          disabled={isAnimating || stack.length === 0}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Pop
        </button>
        <button
          onClick={peek}
          disabled={isAnimating || stack.length === 0}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Peek
        </button>
        <button
          onClick={() => setStack([])}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50 col-span-2 sm:col-span-1"
          disabled={isAnimating}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PushPop;