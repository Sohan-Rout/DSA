'use client';
import React, { useState } from 'react';
import Footer from '@/app/components/footer';
import PushPop from '@/app/components/ui/PushPop';
import Content from '@/app/visualizer/stack/peek/content';
import ExploreOther from '@/app/components/ui/exploreOther';
import CodeBlock from '@/app/visualizer/stack/peek/codeBlock';
import GoBackButton from "@/app/components/ui/goback";
import Quiz from '@/app/visualizer/stack/peek/quiz';
import BackToTop from '@/app/components/ui/backtotop';

const StackVisualizer = () => {
  const [stack, setStack] = useState([]); // Start with empty stack
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Stack is empty');
  const [isAnimating, setIsAnimating] = useState(false);

  // Add random stack
  const addRandomStack = () => {
    if (stack.length > 0) {
      setMessage('Clear stack first to add new random stack');
      return;
    }

    setIsAnimating(true);
    setOperation('Creating random stack...');
    
    const randomItems = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 + Math.floor(Math.random() * 3)); // 3-5 random items
    
    setTimeout(() => {
      setStack(randomItems);
      setOperation(null);
      setMessage(`Random stack with ${randomItems.length} items created`);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen max-h-auto bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200">
        <main className="container mx-auto px-6 pt-16 pb-4">

          { /* go back block here */}
          <div className="mt-10 sm:mt-10">
            <GoBackButton />
          </div>

          { /* main logic here */}
          <h1 className="text-4xl md:text-4xl mt-6 ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
            <span className="text-black dark:text-white">Stack Peek</span>
          </h1>
          <div className='bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl mt-2 mb-5'></div>
          <Content />
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize Push, Pop, and Peek operations
        </p>

        <div className="max-w-md mx-auto">
          {/* Controls */}
          <PushPop 
            stack={stack}
            setStack={setStack}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
            setMessage={setMessage}
            setOperation={setOperation}
          />

          {/* Add Random Stack Button */}
          <button
            onClick={addRandomStack}
            disabled={isAnimating || stack.length > 0}
            className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Add Random Stack
          </button>

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
            <div className={`mb-6 p-3 rounded-lg ${
              message.includes('push') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
              message.includes('pop') ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
              message.includes('Top') ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
              message.includes('Random') ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200' :
              'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}>
              {message}
            </div>

            {/* Vertical Stack */}
            <div className="flex flex-col items-center min-h-[200px]">
              {/* Top indicator */}
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                {stack.length > 0 ? '↑ Top' : ''}
              </div>

              {/* Stack elements */}
              <div className="w-full max-w-xs">
                {stack.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                    Stack is empty
                  </div>
                ) : (
                  <div className="space-y-2">
                    {stack.map((item, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border-2 text-center font-medium transition-all ${
                          index === 0 && operation?.includes('Peek') ? 
                            'bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700 animate-pulse' :
                          index === 0 ?
                            'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700' :
                            'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        {item}
                        {index === 0 && (
                          <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                            (Top)
                          </div>
                        )}
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

            {/* Stack Legend */}
            <div className="mt-8 grid grid-cols-3 gap-2 text-sm">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded text-center">
                <div className="font-medium">Top</div>
                <div className="text-xs">Current top</div>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded text-center">
                <div className="font-medium">Peek</div>
                <div className="text-xs">Viewing</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center">
                <div className="font-medium">Elements</div>
                <div className="text-xs">Stack items</div>
              </div>
            </div>
          </div>
        </div>

        { /* quiz block here */}
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mt-8 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />

        <CodeBlock/>
        <ExploreOther
          title="Explore other operations"
          links={[
            { text: "Push & Pop", url: "/visualizer/stack/push-pop" },
            { text: "Is Empty", url: "/visualizer/stack/isempty" },
            { text: "Is Full", url: "/visualizer/stack/isfull" },
          ]}
        />
      </main>
      <div className="bg-gray-700 z-10 h-[1px]"></div>
      <BackToTop/>
      <Footer />
    </div>
  );
};

export default StackVisualizer;