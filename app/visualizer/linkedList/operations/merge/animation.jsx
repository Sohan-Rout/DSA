"use client";
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Footer from '@/app/components/footer';
import ExploreOther from '@/app/components/ui/exploreOther';
import Content from "@/app/visualizer/linkedList/operations/merge/content";
import Quiz from '@/app/visualizer/linkedList/operations/merge/quiz';
import CodeBlock from "@/app/visualizer/linkedList/operations/merge/codeBlock";
import BackToTop from '@/app/components/ui/backtotop';
import GoBackButton from "@/app/components/ui/goback";

const LinkedListMerge = () => {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [mergedList, setMergedList] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPointers, setCurrentPointers] = useState({ list1: 0, list2: 0 });
  const list1Refs = useRef([]);
  const list2Refs = useRef([]);
  const mergedRefs = useRef([]);
  const arrowRefs = useRef([]);
  const containerRef = useRef(null);
  const animationTimeline = useRef(gsap.timeline());

  // Generate random linked list with realistic values
  const generateRandomList = (setList) => {
    const size = Math.floor(Math.random() * 3) + 3; // 3-5 nodes
    const values = Array.from({ length: size }, (_, i) => {
      const base = Math.floor(Math.random() * 20) + 1;
      return base + i * 5; // Ensure some order but not perfectly sorted
    }).sort((a, b) => a - b); // Sort the values
    
    const newList = values.map((value, index) => ({
      value,
      id: Date.now() + index + Math.random(),
      next: index < size - 1 ? `0x${(1000 + index).toString(16).padStart(4, '0')}` : 'NULL'
    }));

    setList(newList);
  };

  // Reset handler
  const handleReset = () => {
    gsap.killTweensOf("*");
    animationTimeline.current.clear();
    setList1([]);
    setList2([]);
    setMergedList([]);
    setIsAnimating(false);
    setCurrentPointers({ list1: 0, list2: 0 });
    list1Refs.current = [];
    list2Refs.current = [];
    mergedRefs.current = [];
    arrowRefs.current = [];
  };

  // Animate the merge process step-by-step
  const animateMerge = async () => {
    if (isAnimating || list1.length === 0 || list2.length === 0) return;
    
    setIsAnimating(true);
    animationTimeline.current.clear();
    
    // Create sorted copies
    const sortedList1 = [...list1].sort((a, b) => a.value - b.value);
    const sortedList2 = [...list2].sort((a, b) => a.value - b.value);
    
    let i = 0, j = 0;
    const result = [];
    
    // Initial state
    gsap.set([...list1Refs.current, ...list2Refs.current], {
      opacity: 1,
      scale: 1,
      backgroundColor: i => i < sortedList1.length ? '#10b981' : '#10b981'
    });
    
    gsap.set(arrowRefs.current, { opacity: 0.7 });
    setMergedList([]);
    setCurrentPointers({ list1: 0, list2: 0 });

    const mergeStep = async () => {
      if (i >= sortedList1.length && j >= sortedList2.length) {
        setIsAnimating(false);
        return;
      }

      // Highlight current pointers
      animationTimeline.current.to([
        i < sortedList1.length ? list1Refs.current[i] : null,
        j < sortedList2.length ? list2Refs.current[j] : null
      ].filter(Boolean), {
        scale: 1.3,
        duration: 0.3,
        ease: 'power1.inOut'
      }, '<');

      await new Promise(resolve => {
        animationTimeline.current.call(() => {
          setCurrentPointers({ list1: i, list2: j });
          resolve();
        }, null, '+=0.3');
      });

      let nextNode;
      if (j >= sortedList2.length || (i < sortedList1.length && sortedList1[i].value <= sortedList2[j].value)) {
        // Take from list1
        nextNode = { ...sortedList1[i], source: 'list1' };
        i++;
      } else {
        // Take from list2
        nextNode = { ...sortedList2[j], source: 'list2' };
        j++;
      }

      // Animate the selected node moving to merged list
      const tempNode = document.createElement('div');
      tempNode.className = `node flex items-center justify-center absolute w-20 h-16 rounded-md shadow-md text-white font-bold ${
        nextNode.source === 'list1' ? 'bg-emerald-600' : 'bg-emerald-600'
      }`;
      tempNode.textContent = nextNode.value;
      containerRef.current.appendChild(tempNode);

      // Get positions
      const fromRect = nextNode.source === 'list1'
        ? list1Refs.current[i-1]?.getBoundingClientRect()
        : list2Refs.current[j-1]?.getBoundingClientRect();
      const toPos = mergedList.length * 80 + 40; // Calculate new position

      gsap.set(tempNode, {
        x: fromRect?.left - containerRef.current.getBoundingClientRect().left || 0,
        y: fromRect?.top - containerRef.current.getBoundingClientRect().top || 0,
        opacity: 0,
        scale: 0.5
      });

      // Improved animation: pop, move, color transition
      animationTimeline.current.to(tempNode, {
        opacity: 1,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out'
      }, '<');

      animationTimeline.current.to(tempNode, {
        x: toPos,
        y: 20,
        scale: 1,
        backgroundColor: '#2563eb', // transition to merged blue color
        duration: 0.8,
        ease: 'power3.inOut'
      });

      animationTimeline.current.call(() => {
        result.push(nextNode);
        setMergedList([...result]);
        tempNode.remove();
      }, null, `+=0.2`);

      // Update pointers
      await new Promise(resolve => {
        animationTimeline.current.call(() => {
          setCurrentPointers({ list1: i, list2: j });
          resolve();
        }, null, '+=0.1');
      });

      // Recursively call next step
      await new Promise(resolve => {
        animationTimeline.current.call(() => {
          mergeStep().then(resolve);
        }, null, '+=0.3');
      });
    };

    await mergeStep();
  };

  // Update refs when lists change
  useEffect(() => {
    list1Refs.current = list1Refs.current.slice(0, list1.length);
    list2Refs.current = list2Refs.current.slice(0, list2.length);
    mergedRefs.current = mergedRefs.current.slice(0, mergedList.length);
    arrowRefs.current = arrowRefs.current.slice(0, Math.max(0, mergedList.length - 1));
  }, [list1, list2, mergedList]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200 flex flex-col">
      <main className="container mx-auto px-2 sm:px-6 pt-16 pb-4 flex-1">
        <div className="mt-8 sm:mt-10">
          <GoBackButton />
        </div>

        <h1 className="text-3xl sm:text-4xl mt-6 ml-2 sm:ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
          Linked List Merge
        </h1>
        <div className="bg-black dark:bg-gray-600 w-full h-[2px] rounded-xl mt-2 mb-5"></div>
        <Content />
        <p className="text-base sm:text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize merging two sorted linked lists
        </p>

        {/* Controls - Responsive */}
        <div className="flex justify-center mb-8 px-2">
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 sm:p-6 w-full max-w-4xl rounded-lg shadow-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => generateRandomList(setList1)}
                  disabled={isAnimating}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg disabled:bg-gray-400 w-full"
                >
                  Generate List 1
                </button>
                <button
                  onClick={() => generateRandomList(setList2)}
                  disabled={isAnimating}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg disabled:bg-gray-400 w-full"
                >
                  Generate List 2
                </button>
              </div>
              <div className="flex-1 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={animateMerge}
                  disabled={isAnimating || list1.length === 0 || list2.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg disabled:bg-gray-400 w-full"
                >
                  {isAnimating ? "Merging..." : "Merge Lists"}
                </button>
                <button
                  onClick={handleReset}
                  className="bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg w-full"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legend - Responsive */}
        <div className="mb-4 flex flex-wrap justify-center gap-3 sm:gap-6 text-sm sm:text-base">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-md bg-emerald-600 mr-2"></div>
            <span>List 1</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-md bg-emerald-600 mr-2"></div>
            <span>List 2</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-md bg-blue-600 mr-2"></div>
            <span>Merged</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-md bg-gray-400 mr-2"></div>
            <span>Pointer</span>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="space-y-12">
          {/* List 1 */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2 text-emerald-600">List 1 {currentPointers.list1 < list1.length && `(Current: ${currentPointers.list1 + 1})`}</h3>
            <div className="relative bg-gray-200/50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-lg min-h-[120px] p-4 w-full max-w-4xl overflow-x-auto">
              {list1.length === 0 ? (
                <div className="text-center w-full py-8 text-gray-500 dark:text-gray-400">
                  Generate List 1 to begin
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  {list1.map((node, index) => (
                    <React.Fragment key={`list1-${node.id}`}>
                      <div
                        ref={(el) => (list1Refs.current[index] = el)}
                        className={`node flex flex-col items-center justify-center bg-emerald-600 text-white text-lg w-20 h-16 rounded-md shadow-md transition-all ${
                          index === currentPointers.list1 && isAnimating ? 'ring-4 ring-emerald-300 scale-110' : ''
                        }`}
                      >
                        {node.value}
                        <div className="text-xs mt-1 opacity-80">{node.next}</div>
                      </div>
                      {index < list1.length - 1 && (
                        <svg
                          className="w-8 h-8 opacity-70 text-gray-600 dark:text-gray-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
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

          {/* List 2 */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2 text-emerald-600">List 2 {currentPointers.list2 < list2.length && `(Current: ${currentPointers.list2 + 1})`}</h3>
            <div className="relative bg-gray-200/50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-lg min-h-[120px] p-4 w-full max-w-4xl overflow-x-auto">
              {list2.length === 0 ? (
                <div className="text-center w-full py-8 text-gray-500 dark:text-gray-400">
                  Generate List 2 to continue
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  {list2.map((node, index) => (
                    <React.Fragment key={`list2-${node.id}`}>
                      <div
                        ref={(el) => (list2Refs.current[index] = el)}
                        className={`node flex flex-col items-center justify-center bg-emerald-600 text-white text-lg w-20 h-16 rounded-md shadow-md transition-all ${
                          index === currentPointers.list2 && isAnimating ? 'ring-4 ring-emerald-300 scale-110' : ''
                        }`}
                      >
                        {node.value}
                        <div className="text-xs mt-1 opacity-80">{node.next}</div>
                      </div>
                      {index < list2.length - 1 && (
                        <svg
                          className="w-8 h-8 opacity-70 text-gray-600 dark:text-gray-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
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

          {/* Merged List */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2 text-blue-600">Merged List</h3>
            <div
              ref={containerRef}
              className="relative bg-gray-200/50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-lg min-h-[120px] p-4 w-full max-w-4xl overflow-x-auto"
            >
              {mergedList.length === 0 ? (
                <div className="text-center w-full py-8 text-gray-500 dark:text-gray-400">
                  {list1.length > 0 && list2.length > 0 ? (
                    "Click 'Merge Lists' to visualize"
                  ) : (
                    "Generate both lists and merge them"
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  {mergedList.map((node, index) => (
                    <React.Fragment key={`merged-${node.id}`}>
                      <div
                        ref={(el) => (mergedRefs.current[index] = el)}
                        className={`node flex flex-col items-center justify-center bg-blue-600 text-white text-lg w-20 h-16 rounded-md shadow-md ${
                          index === mergedList.length - 1 && isAnimating ? 'animate-pulse' : ''
                        }`}
                      >
                        {node.value}
                        {/* No address shown for merged list */}
                      </div>
                      {index < mergedList.length - 1 && (
                        <svg
                          ref={(el) => (arrowRefs.current[index] = el)}
                          className="w-8 h-8 opacity-70 text-gray-600 dark:text-gray-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
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
            { text: "Traversal", url: "./traversal" },
            { text: "Comparison", url: "./comparison" },
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

export default LinkedListMerge;