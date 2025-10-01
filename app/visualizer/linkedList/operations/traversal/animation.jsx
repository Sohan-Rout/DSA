"use client";
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Footer from '@/app/components/footer';
import ExploreOther from '@/app/components/ui/exploreOther';
import Content from "@/app/visualizer/linkedList/operations/traversal/content";
import Quiz from '@/app/visualizer/linkedList/operations/traversal/quiz';
import CodeBlock from "@/app/visualizer/linkedList/operations/traversal/codeBlock";
import BackToTop from '@/app/components/ui/backtotop';
import GoBackButton from "@/app/components/ui/goback";

const LinkedListTraversal = () => {
  const [list, setList] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const nodeRefs = useRef([]);
  const arrowRefs = useRef([]);
  const addressRefs = useRef([]);
  const containerRef = useRef(null);
  const animationTimeline = useRef(gsap.timeline());

  // Generate random linked list with cute emoji values
  const generateRandomList = () => {
    if (isAnimating) return;
    handleReset();

    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const size = Math.min(Math.floor(Math.random() * 3) + 3, emojis.length); //nodes
    const shuffledEmojis = [...emojis].sort(() => 0.5 - Math.random());
    
    const newList = shuffledEmojis.slice(0, size).map((emoji, index) => ({
      value: emoji,
      id: Date.now() + index,
      address: `0x${Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0')}`,
      next: index < size - 1 ? `0x${Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0')}` : 'NULL'
    }));

    setList(newList);
  };

  // Animate traversal with cute bouncy effect
  const animateTraversal = () => {
    if (isAnimating || list.length === 0) return;
    setIsAnimating(true);
    
    // Reset all nodes to default state
    gsap.set(nodeRefs.current, {
      backgroundColor: '#3b82f6',
      scale: 1,
      y: 0
    });
    
    gsap.set(arrowRefs.current, {
      opacity: 0.6,
      scale: 1
    });
    
    gsap.set(addressRefs.current, {
      color: '#6b7280'
    });

    animationTimeline.current.clear();
    
    list.forEach((node, index) => {
      // Bounce-in effect for node
      animationTimeline.current.to(nodeRefs.current[index], {
        duration: 0.5,
        backgroundColor: '#10b981',
        scale: 1.2,
        y: -20,
        ease: 'elastic.out(1, 0.5)'
      }, `+=${index * 0.3}`);
      
      // Highlight address
      animationTimeline.current.to(addressRefs.current[index], {
        duration: 0.3,
        color: '#3b82f6',
        fontWeight: 'bold',
        ease: 'power1.inOut'
      }, `-=${0.4}`);
      
      // Highlight arrow if not last node
      if (index < list.length - 1) {
        animationTimeline.current.to(arrowRefs.current[index], {
          duration: 0.3,
          opacity: 1,
          scale: 1.3,
          ease: 'power1.inOut'
        }, `-=${0.3}`);
      }
      
      // Return to normal state
      animationTimeline.current.to(nodeRefs.current[index], {
        duration: 0.5,
        backgroundColor: '#3b82f6',
        scale: 1,
        y: 0,
        ease: 'back.out(1)'
      }, `+=${0.2}`);
      
      if (index < list.length - 1) {
        animationTimeline.current.to(arrowRefs.current[index], {
          duration: 0.3,
          opacity: 0.6,
          scale: 1,
          ease: 'power1.inOut'
        }, `+=${0.1}`);
      }
      
      animationTimeline.current.to(addressRefs.current[index], {
        duration: 0.3,
        color: '#6b7280',
        fontWeight: 'normal',
        ease: 'power1.inOut'
      }, `+=${0.1}`);
    });
    
    animationTimeline.current.eventCallback('onComplete', () => {
      setIsAnimating(false);
    });
  };

  // Reset handler
  const handleReset = () => {
    gsap.killTweensOf("*");
    animationTimeline.current.clear();
    setList([]);
    setIsAnimating(false);
    nodeRefs.current = [];
    arrowRefs.current = [];
    addressRefs.current = [];
  };

  // Update refs when list changes
  useEffect(() => {
    nodeRefs.current = nodeRefs.current.slice(0, list.length);
    arrowRefs.current = arrowRefs.current.slice(0, Math.max(0, list.length - 1));
    addressRefs.current = addressRefs.current.slice(0, list.length);
  }, [list]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200 flex flex-col">
      <main className="container mx-auto px-2 sm:px-6 pt-16 pb-4 flex-1">
        <div className="mt-8 sm:mt-10">
          <GoBackButton />
        </div>

        <h1 className="text-3xl sm:text-4xl mt-6 ml-2 sm:ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
          Linked List Traversal
        </h1>
        <div className="bg-black dark:bg-gray-600 w-full h-[2px] rounded-xl mt-2 mb-5"></div>
        <Content />
        <p className="text-base sm:text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize how we traverse through each node in a linked list
        </p>

        {/* Controls - Responsive */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 sm:p-6 w-full max-w-4xl rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Buttons for desktop */}
              <div className="hidden sm:flex gap-2 w-full">
                <button
                  onClick={generateRandomList}
                  disabled={isAnimating}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 flex-1 flex items-center justify-center gap-2"
                >
                  <span>Generate List</span>
                </button>
                <button
                  onClick={animateTraversal}
                  disabled={isAnimating || list.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 flex-1 flex items-center justify-center gap-2"
                >
                  <span>{isAnimating ? "Traversing..." : "Animate Traversal"}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 rounded-lg flex-1 flex items-center justify-center gap-2"
                >
                  Reset
                </button>
              </div>
              
              {/* Buttons for mobile */}
              <div className="flex sm:hidden flex-col gap-2 w-full">
                <button
                  onClick={generateRandomList}
                  disabled={isAnimating}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 flex items-center justify-center gap-2"
                >
                  <span>🎲</span> Generate List
                </button>
                <button
                  onClick={animateTraversal}
                  disabled={isAnimating || list.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 flex items-center justify-center gap-2"
                >
                  <span>✨</span> {isAnimating ? "Traversing..." : "Animate Traversal"}
                </button>
                <button
                  onClick={handleReset}
                  className="bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <span>🔄</span> Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legend - Responsive */}
        <div className="mb-4 flex flex-wrap justify-center gap-3 sm:gap-6 text-sm sm:text-base">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span>Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
            <span>Visited</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-300 mr-2"></div>
            <span>Address</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
            <span>Pointer</span>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="flex justify-center px-2">
          <div
            ref={containerRef}
            className="relative bg-gray-200/50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-lg min-h-[200px] p-4 flex items-center justify-center w-full max-w-4xl overflow-x-auto"
          >
            {list.length === 0 ? (
              <div className="text-center w-full py-12 text-gray-500 dark:text-gray-400">
                Click "Generate List" to create a linked list 🌈
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                {list.map((node, index) => (
                  <React.Fragment key={node.id}>
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-xs font-mono text-gray-500 dark:text-gray-400" ref={el => addressRefs.current[index] = el}>
                        {node.address}
                      </div>
                      <div
                        ref={(el) => (nodeRefs.current[index] = el)}
                        className="node flex flex-col items-center justify-center bg-blue-500 text-white text-3xl w-16 h-16 rounded-full shadow-md cursor-pointer hover:shadow-lg transition-all"
                        onClick={animateTraversal}
                      >
                        {node.value}
                      </div>
                      <div className="text-xs font-mono bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                        Next: {node.next}
                      </div>
                    </div>
                    {index < list.length - 1 && (
                      <svg
                        ref={(el) => (arrowRefs.current[index] = el)}
                        className="w-8 h-8 my-4 opacity-60 text-gray-600 dark:text-gray-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mt-8 mb-8">
          Test Your Knowledge Before Moving Forward!
        </p>
        <Quiz />

        <CodeBlock />

        <ExploreOther
          title="Explore Other Operations"
          links={[
            { text: "Insertion", url: "./insertion" },
            { text: "Deletion", url: "./deletion" },
            { text: "Compare", url: "./comparison" },
            { text: "Merge", url: "./merge" },
            { text: "Searching", url: "./search" },
            { text: "Reverse", url: "./reverse" },
          ]}
        />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default LinkedListTraversal;