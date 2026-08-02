'use client';

import { useState } from 'react';
import { Plus, ArrowUpFromLine, Eye, RotateCcw } from 'lucide-react';

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
    <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && push()}
          placeholder="Enter a value"
          className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
          disabled={isAnimating}
        />
        <button
          onClick={push}
          disabled={isAnimating}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40 disabled:pointer-events-none"
        >
          <Plus size={16} strokeWidth={2.5} />
          Push
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={pop}
          disabled={isAnimating || stack.length === 0}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-green-500 hover:bg-green-600 text-white transition disabled:opacity-40 disabled:pointer-events-none"
        >
          <ArrowUpFromLine size={15} />
          Pop
        </button>
        <button
          onClick={peek}
          disabled={isAnimating || stack.length === 0}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40 disabled:pointer-events-none"
        >
          <Eye size={15} />
          Peek
        </button>
        <button
          onClick={() => setStack([])}
          disabled={isAnimating}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-40 disabled:pointer-events-none"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default PushPop;