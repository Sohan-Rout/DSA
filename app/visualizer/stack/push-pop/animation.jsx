'use client';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import GoBackButton from "@/app/components/ui/goback";
import Footer from '@/app/components/footer';
import Content from '@/app/visualizer/stack/push-pop/content';
import ExploreOther from '@/app/components/ui/exploreOther';
import PushPop from '@/app/components/ui/PushPop';
import CodeBlock from '@/app/visualizer/stack/push-pop/codeBlock';
import Quiz from '@/app/visualizer/stack/push-pop/quiz';
import BackToTop from '@/app/components/ui/backtotop';

const StackVisualizer = () => {
    const [stack, setStack] = useState([]);
    const [operation, setOperation] = useState(null);
    const [message, setMessage] = useState('Stack is empty');
    const [isAnimating, setIsAnimating] = useState(false);
    const stackRefs = useRef([]);

    // Reset stack
    const reset = () => {
      setStack([]);
      setMessage('Stack is empty');
      setOperation(null);
    };

    useEffect(() => {
      if (isAnimating && stackRefs.current.length > 0) {
        const el = stackRefs.current[0];
        if (operation?.includes("pushed")) {
          gsap.fromTo(el, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        } else if (operation?.includes("popped")) {
          gsap.to(el, { y: 50, opacity: 0, duration: 0.3, ease: "power1.in" });
        } else if (operation?.includes("Peek")) {
          gsap.fromTo(el, { scale: 1 }, { scale: 1.2, yoyo: true, repeat: 1, duration: 0.2 });
        }
      }
    }, [stack, operation, isAnimating]);

    return (
    <div className="min-h-screen max-h-auto bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200">
        <main className="container mx-auto px-6 pt-16 pb-4">

          { /* go back block here */}
          <div className="mt-10 sm:mt-10">
            <GoBackButton />
          </div>

          { /* main logic here */}
          <h1 className="text-4xl md:text-4xl mt-6 ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
            <span className="text-black dark:text-white">Stack Push & Pop</span>
          </h1>
          <div className='bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl mt-2 mb-5'></div>
          <Content />
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Visualize the LIFO (Last In, First Out) principle
          </p>
  
          <div className="max-w-md mx-auto">
            {/* Use the PushPop component */}
            <PushPop 
              stack={stack}
              setStack={setStack}
              isAnimating={isAnimating}
              setIsAnimating={setIsAnimating}
              setMessage={setMessage}
              setOperation={setOperation}
            />
  
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
                  message.includes('Peek') ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                  'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {message}
                </div>
              )}
  
              {/* Vertical Stack */}
              <div className="flex flex-col items-center min-h-[300px]">
                {/* Top indicator */}
                <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  {stack.length > 0 ? '↑ Top' : ''}
                </div>
  
                {/* Stack elements */}
                <div className="w-32 relative">
                  {stack.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Stack is empty
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {stack.map((item, index) => (
                        <div
                          key={index}
                          ref={el => stackRefs.current[index] = el}
                          className={`p-3 border-2 rounded text-center font-medium transition-all duration-300 ${
                            index === 0 ? 
                              'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700' : 
                              'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          <div>{item}</div>
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
              { text: "Peek", url: "/visualizer/stack/peek" },
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