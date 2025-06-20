"use client";
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Footer from '@/app/components/footer';
import ExploreOther from '@/app/components/ui/exploreOther';
import BackToTop from '@/app/components/ui/backtotop';
import GoBackButton from "@/app/components/ui/goback";
import Content from "@/app/visualizer/linkedList/operations/reverse/content";
import Quiz from "@/app/visualizer/linkedList/operations/reverse/quiz";
import CodeBlock from "@/app/visualizer/linkedList/operations/reverse/codeBlock";

const LinkedListReverse = () => {
  const [list, setList] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPointer, setCurrentPointer] = useState(-1);
  const [prevPointer, setPrevPointer] = useState(-1);
  const [nextPointer, setNextPointer] = useState(-1);
  const listRefs = useRef([]);
  const containerRef = useRef(null);
  const animationTimeline = useRef(gsap.timeline());

  // Generate random linked list with realistic values
  const generateRandomList = () => {
    const size = Math.floor(Math.random() * 3) + 3; // 3-5 nodes
    const values = Array.from({ length: size }, (_, i) => {
      const base = Math.floor(Math.random() * 20) + 1;
      return base + i * 5;
    });
    const newList = values.map((value, index) => ({
      value,
      id: Date.now() + index + Math.random(),
      next: index < size - 1 ? `0x${(1000 + index).toString(16).padStart(4, '0')}` : 'NULL'
    }));
    setList(newList);
    setCurrentPointer(-1);
    setPrevPointer(-1);
    setNextPointer(-1);
  };

  // Reset handler
  const handleReset = () => {
    gsap.killTweensOf("*");
    animationTimeline.current.clear();
    setList([]);
    setIsAnimating(false);
    setCurrentPointer(-1);
    setPrevPointer(-1);
    setNextPointer(-1);
    listRefs.current = [];
  };

  // Animate the reverse process step-by-step with pointer logic and visual next updates
  const animateReverse = async () => {
    if (isAnimating || list.length === 0) return;
    setIsAnimating(true);
    animationTimeline.current.clear();

    // Copy list so we can mutate next pointers
    let nodes = list.map(node => ({ ...node }));
    let prevIndex = -1;
    let currentIndex = 0;
    let nextIndex = nodes[currentIndex] && nodes[currentIndex].next === 'NULL' ? -1 : currentIndex + 1;

    // Helper to update next pointer string after rewiring
    const updateNextField = (index, nextIdx) => {
      if (nextIdx === -1) {
        nodes[index].next = 'NULL';
      } else {
        nodes[index].next = `0x${(1000 + nextIdx).toString(16).padStart(4, '0')}`;
      }
    };

    // Initial highlight setup: reset all nodes to base color
    gsap.set(listRefs.current, {
      backgroundColor: '#10b981',
      scale: 1,
      opacity: 1,
      clearProps: 'all'
    });

    // Animate function to highlight nodes with different colors
    const highlightNodes = (prevI, currI, nextI) => {
      listRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === currI) {
          gsap.to(el, { backgroundColor: '#2563eb', scale: 1.1, duration: 0.3 }); // current - blue
        } else if (idx === prevI) {
          gsap.to(el, { backgroundColor: '#f59e0b', scale: 1.05, duration: 0.3 }); // prev - amber
        } else if (idx === nextI) {
          gsap.to(el, { backgroundColor: '#6b7280', scale: 1, duration: 0.3 }); // next - gray
        } else {
          gsap.to(el, { backgroundColor: '#10b981', scale: 1, duration: 0.3 }); // normal - green
        }
      });
    };

    // Create pointer arrows or labels overlays
    // We'll create divs for prev, current, next pointers positioned above nodes
    const pointerContainer = document.createElement('div');
    pointerContainer.style.position = 'relative';
    pointerContainer.style.width = '100%';
    pointerContainer.style.height = '0px';
    pointerContainer.style.marginBottom = '8px';
    containerRef.current.prepend(pointerContainer);

    const createPointerLabel = (color, text) => {
      const label = document.createElement('div');
      label.textContent = text;
      label.style.position = 'absolute';
      label.style.top = '0px';
      label.style.padding = '2px 6px';
      label.style.borderRadius = '4px';
      label.style.color = 'white';
      label.style.fontSize = '12px';
      label.style.fontWeight = 'bold';
      label.style.backgroundColor = color;
      label.style.pointerEvents = 'none';
      label.style.whiteSpace = 'nowrap';
      label.style.transition = 'left 0.5s ease';
      pointerContainer.appendChild(label);
      return label;
    };

    const prevLabel = createPointerLabel('#f59e0b', 'Prev');
    const currentLabel = createPointerLabel('#2563eb', 'Current');
    const nextLabel = createPointerLabel('#6b7280', 'Next');

    // Helper to position pointer labels above the nodes
    const positionPointers = (prevI, currI, nextI) => {
      const containerRect = containerRef.current.getBoundingClientRect();
      const offsetTop = -30; // above nodes

      const setLabelPos = (label, idx) => {
        if (idx === -1) {
          label.style.opacity = '0';
          return;
        }
        const nodeEl = listRefs.current[idx];
        if (!nodeEl) {
          label.style.opacity = '0';
          return;
        }
        const rect = nodeEl.getBoundingClientRect();
        const left = rect.left - containerRect.left + rect.width / 2 - label.offsetWidth / 2;
        label.style.left = `${left}px`;
        label.style.top = `${offsetTop}px`;
        label.style.opacity = '1';
      };

      setLabelPos(prevLabel, prevI);
      setLabelPos(currentLabel, currI);
      setLabelPos(nextLabel, nextI);
    };

    // Initial pointer positions
    setCurrentPointer(currentIndex);
    setPrevPointer(prevIndex);
    setNextPointer(nextIndex);
    highlightNodes(prevIndex, currentIndex, nextIndex);
    positionPointers(prevIndex, currentIndex, nextIndex);

    // Animate the reversal step by step
    while (currentIndex !== -1) {
      setCurrentPointer(currentIndex);
      setPrevPointer(prevIndex);
      setNextPointer(nextIndex);
      highlightNodes(prevIndex, currentIndex, nextIndex);
      positionPointers(prevIndex, currentIndex, nextIndex);

      // Wait a bit for user to see pointers
      await new Promise(r => setTimeout(r, 800));

      // Show rewiring: change current node's next pointer to prev
      animationTimeline.current.clear();

      // Animate the 'next' field text change
      const currentNodeEl = listRefs.current[currentIndex];
      if (currentNodeEl) {
        const nextFieldEl = currentNodeEl.querySelector('.text-xs');
        if (nextFieldEl) {
          // Animate fade out, change text, fade in
          await new Promise(resolve => {
            gsap.to(nextFieldEl, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                updateNextField(currentIndex, prevIndex);
                setList([...nodes]);
                resolve();
              }
            });
          });
          await new Promise(resolve => {
            gsap.to(nextFieldEl, {
              opacity: 1,
              duration: 0.3,
              onComplete: resolve
            });
          });
        }
      }

      // Small pause after rewiring
      await new Promise(r => setTimeout(r, 500));

      // Move pointers forward for next iteration
      const tempNext = nextIndex;
      prevIndex = currentIndex;
      currentIndex = nextIndex;
      nextIndex = currentIndex !== -1 && nodes[currentIndex].next !== 'NULL' ? currentIndex + 1 : -1;
    }

    // Final highlight: all nodes green, pointers hidden
    highlightNodes(-1, -1, -1);
    setCurrentPointer(-1);
    setPrevPointer(-1);
    setNextPointer(-1);
    positionPointers(-1, -1, -1);

    // Remove pointer labels after animation finished
    await new Promise(r => setTimeout(r, 500));
    if (pointerContainer.parentNode) {
      pointerContainer.parentNode.removeChild(pointerContainer);
    }

    setIsAnimating(false);
  };

  // Update refs when list changes
  useEffect(() => {
    listRefs.current = listRefs.current.slice(0, list.length);
  }, [list]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200 flex flex-col">
      <main className="container mx-auto px-2 sm:px-6 pt-16 pb-4 flex-1">
        <div className="mt-8 sm:mt-10">
          <GoBackButton />
        </div>

        <h1 className="text-3xl sm:text-4xl mt-6 ml-2 sm:ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
          Linked List Reverse
        </h1>
        <div className="bg-black dark:bg-gray-600 w-full h-[2px] rounded-xl mt-2 mb-5"></div>
        <Content />

        <p className="text-base sm:text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize reversing a linked list step by step
        </p>

        {/* Controls - Responsive */}
        <div className="flex justify-center mb-8 px-2">
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 sm:p-6 w-full max-w-4xl rounded-lg shadow-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={generateRandomList}
                  disabled={isAnimating}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg disabled:bg-gray-400 w-full"
                >
                  Generate List
                </button>
              </div>
              <div className="flex-1 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={animateReverse}
                  disabled={isAnimating || list.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg disabled:bg-gray-400 w-full"
                >
                  {isAnimating ? "Reversing..." : "Reverse List"}
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
            <span>List Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-md bg-blue-600 mr-2"></div>
            <span>Current Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-md bg-amber-500 mr-2"></div>
            <span>Previous Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-md bg-gray-600 mr-2"></div>
            <span>Next Node</span>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="space-y-12">
          {/* List */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2 text-emerald-600">
              List {currentPointer >= 0 && `(Current: ${currentPointer + 1})`}
            </h3>
            <div
              ref={containerRef}
              className="relative bg-gray-200/50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-lg min-h-[120px] p-4 w-full max-w-4xl overflow-x-auto"
            >
              {list.length === 0 ? (
                <div className="text-center w-full py-8 text-gray-500 dark:text-gray-400">
                  Generate List to begin
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  {list.map((node, index) => (
                    <React.Fragment key={`list-${node.id}`}>
                      <div
                        ref={el => (listRefs.current[index] = el)}
                        className={`node flex flex-col items-center justify-center text-white text-lg w-20 h-16 rounded-md shadow-md transition-all ${
                          index === currentPointer
                            ? 'bg-blue-600 ring-4 ring-blue-300 scale-110'
                            : index === prevPointer
                            ? 'bg-amber-500 ring-4 ring-amber-300 scale-105'
                            : index === nextPointer
                            ? 'bg-gray-600 ring-2 ring-gray-400'
                            : 'bg-emerald-600'
                        }`}
                      >
                        {node.value}
                        <div className="text-xs mt-1 opacity-80">{node.next}</div>
                      </div>
                      {index < list.length - 1 && (
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
            { text: "Comparison", url: "./comparison" },
            { text: "Searching", url: "./search" },
            { text: "Merging", url: "./merge" },
          ]}
        />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default LinkedListReverse;