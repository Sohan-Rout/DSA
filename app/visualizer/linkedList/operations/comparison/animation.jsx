"use client";
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Footer from '@/app/components/footer';
import ExploreOther from '@/app/components/ui/exploreOther';
import Content from "@/app/visualizer/linkedList/operations/comparison/content";
import Quiz from '@/app/visualizer/linkedList/operations/comparison/quiz';
import CodeBlock from "@/app/visualizer/linkedList/operations/comparison/codeBlock";
import BackToTop from '@/app/components/ui/backtotop';
import GoBackButton from "@/app/components/ui/goback";

const LinkedListComparison = () => {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPointers, setCurrentPointers] = useState({ list1: 0, list2: 0 });
  const [comparisonResult, setComparisonResult] = useState(null);
  const list1Refs = useRef([]);
  const list2Refs = useRef([]);
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
    setIsAnimating(false);
    setCurrentPointers({ list1: 0, list2: 0 });
    setComparisonResult(null);
    list1Refs.current = [];
    list2Refs.current = [];
  };

  // Animate the comparison process step-by-step
  const animateComparison = async () => {
    if (isAnimating || list1.length === 0 || list2.length === 0) return;

    setIsAnimating(true);
    animationTimeline.current.clear();
    setCurrentPointers({ list1: 0, list2: 0 });
    setComparisonResult(null);

    const maxLength = Math.max(list1.length, list2.length);
    let areSame = true;

    for (let i = 0; i < maxLength; i++) {
      setCurrentPointers({ list1: i, list2: i });

      const node1 = list1[i];
      const node2 = list2[i];

      const highlightNodes = [list1Refs.current[i], list2Refs.current[i]].filter(Boolean);

      animationTimeline.current.to(highlightNodes, {
        scale: 1.3,
        duration: 0.4,
        ease: 'power1.inOut'
      });

      await new Promise(resolve => setTimeout(resolve, 600));

      if (!node1 || !node2 || node1.value !== node2.value) {
        areSame = false;
        setComparisonResult({
          match: false,
          index: i,
          value1: node1?.value,
          value2: node2?.value,
        });
        break;
      }

      animationTimeline.current.to(highlightNodes, {
        scale: 1,
        duration: 0.3
      });
    }

    if (areSame) {
      setComparisonResult({ match: true });
    }

    animationTimeline.current.call(() => {
      setIsAnimating(false);
    });
  };

  // Update refs when lists change
  useEffect(() => {
    list1Refs.current = list1Refs.current.slice(0, list1.length);
    list2Refs.current = list2Refs.current.slice(0, list2.length);
  }, [list1, list2]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200 flex flex-col">
      <main className="container mx-auto px-2 sm:px-6 pt-16 pb-4 flex-1">
        <div className="mt-8 sm:mt-10">
          <GoBackButton />
        </div>

        <h1 className="text-3xl sm:text-4xl mt-6 ml-2 sm:ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
          Linked List Comparison
        </h1>
        <div className="bg-black dark:bg-gray-600 w-full h-[2px] rounded-xl mt-2 mb-5"></div>
        <Content />
        <p className="text-base sm:text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize comparison of two linked lists node by node
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
                  onClick={animateComparison}
                  disabled={isAnimating || list1.length === 0 || list2.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg disabled:bg-gray-400 w-full"
                >
                  {isAnimating ? "Comparing..." : "Compare Lists"}
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
            <div className="w-4 h-4 rounded-md bg-gray-400 mr-2"></div>
            <span>Pointer</span>
          </div>
        </div>

        {comparisonResult && (
          <div className="text-center mt-4 mb-8">
            {comparisonResult.match ? (
              <p className="text-green-600 text-lg font-semibold">✅ Both linked lists are the same.</p>
            ) : (
              <p className="text-red-600 text-lg font-semibold">
                Lists differ at node {comparisonResult.index + 1} : List 1 has {comparisonResult.value1 ?? 'NULL'} and List 2 has {comparisonResult.value2 ?? 'NULL'}
              </p>
            )}
          </div>
        )}

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
            { text: "Merging", url: "./merge" },
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

export default LinkedListComparison;