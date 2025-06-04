"use client";
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Footer from '@/app/components/footer';
import ExploreOther from '@/app/components/ui/exploreOther';
import Content from "@/app/visualizer/linkedList/operations/deletion/content";
import Quiz from '@/app/visualizer/linkedList/operations/deletion/quiz';
import CodeBlock from "@/app/visualizer/linkedList/operations/deletion/codeBlock";
import BackToTop from '@/app/components/ui/backtotop';
import GoBackButton from "@/app/components/ui/goback";

const LinkedListVisualizer = () => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const nodeRefs = useRef([]);
  const containerRef = useRef(null);

  // Generate a random hex address for demonstration
  const generateAddress = () => {
    return '0x' + Math.floor(Math.random() * 0x10000).toString(16).toUpperCase().padStart(4, '0');
  };

  const addNode = () => {
    if (!inputValue || isAnimating) return;
    setIsAnimating(true);

    const newNode = {
      value: inputValue,
      id: Date.now(),
      address: generateAddress(),
      next: 'NULL' // Initialize as NULL by default
    };

    // Create temporary node for animation
    const tempNode = document.createElement('div');
    tempNode.className = 'node flex border border-gray-300 absolute';
    tempNode.innerHTML = `
      <div class="data-part bg-blue-500 text-white p-4 rounded-l-lg">${inputValue}</div>
      <div class="next-part bg-blue-300 p-4 rounded-r-lg">NULL</div>
    `;
    containerRef.current.appendChild(tempNode);

    // Position at the top center
    gsap.set(tempNode, {
      x: window.innerWidth / 2 - 100,
      y: -100,
      opacity: 0,
    });

    // Calculate final position
    const finalX = 50 + (list.length * 220);

    // Animation sequence
    gsap.to(tempNode, {
      opacity: 1,
      y: 50,
      duration: 0.5,
      onComplete: () => {
        gsap.to(tempNode, {
          x: finalX,
          duration: 1,
          onComplete: () => {
            // Update the previous node's next pointer to point to this new node
            if (list.length > 0) {
              const updatedList = [...list];
              updatedList[updatedList.length - 1].next = newNode.address;
              setList([...updatedList, newNode]);
            } else {
              setList([newNode]);
            }
            setIsAnimating(false);
            tempNode.remove();
          }
        });
      }
    });
  };

  const deleteNode = () => {
    if (list.length === 0 || isAnimating) return;
    setIsAnimating(true);

    const nodeToDelete = nodeRefs.current[list.length - 1];
    
    // Animation for deletion
    gsap.to(nodeToDelete, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      onComplete: () => {
        if (list.length > 1) {
          const updatedList = [...list];
          updatedList.pop(); // Remove last node
          updatedList[updatedList.length - 1].next = 'NULL'; // Update new last node's next pointer
          setList(updatedList);
        } else {
          setList([]); // Empty the list if only one node
        }
        setIsAnimating(false);
      }
    });
  };

  const resetList = () => {
    if (isAnimating) return;
    
    // Animate all nodes out
    gsap.to(nodeRefs.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      stagger: 0.1,
      onComplete: () => {
        setList([]);
      }
    });
  };

  // Update node refs when list changes
  useEffect(() => {
    if (list.length > 0 && nodeRefs.current.length === list.length) {
      gsap.from(nodeRefs.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
      });
    }
  }, [list]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200 flex flex-col">
      <main className="container mx-auto px-2 sm:px-6 pt-16 pb-4 flex-1">
        <div className="mt-8 sm:mt-10">
          <GoBackButton />
        </div>

        <h1 className="text-3xl sm:text-4xl mt-6 ml-2 sm:ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
          Linked List Deletion
        </h1>
        <div className="bg-black dark:bg-gray-600 w-full h-[2px] rounded-xl mt-2 mb-5"></div>
        <Content />
        <p className="text-base sm:text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize Linked List Deletion Operation
        </p>
        
        {/* Input Form */}
        <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 sm:p-6 w-full max-w-4xl rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 p-3 border bg-white dark:bg-gray-700 rounded-lg"
                        placeholder="Enter value"
                        disabled={isAnimating}
                    />
                    <button
                        onClick={addNode}
                        disabled={isAnimating || !inputValue}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 w-full sm:w-auto"
                    >
                        {isAnimating ? 'Adding...' : 'Add Node'}
                    </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button
                        onClick={deleteNode}
                        disabled={isAnimating || list.length === 0}
                        className="bg-transparent disabled:opacity-50 text-black dark:text-white border w-full border-black dark:border-white px-6 py-3 rounded-lg"
                    >
                        {isAnimating ? 'Deleting...' : 'Delete Last Node'}
                    </button>
                    <button
                        onClick={resetList}
                        disabled={isAnimating || list.length === 0}
                        className="bg-transparent text-black dark:text-white border border-black dark:border-white w-full px-6 py-3 rounded-lg"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>

        {/* Legend - Responsive */}
        <div className="mb-4 flex justify-center space-x-4 sm:space-x-8 text-sm sm:text-base">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span>Data</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-300 dark:bg-blue-600 mr-2"></div>
            <span>Next Pointer</span>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="flex justify-center">
        <div 
          ref={containerRef}
          className="relative bg-gray-200 border dark:border-gray-700 dark:bg-gray-800 rounded-lg min-h-auto p-2 sm:p-4 flex justify-center items-start max-w-full sm:max-w-4xl w-full overflow-x-auto"
        >
          {list.length === 0 ? (
            <div className="text-center w-full py-16 text-gray-500">
              No nodes added yet
            </div>
          ) : (
            <div className="flex items-center space-x-8">
              {list.map((node, index) => (
                <div key={node.id} className="flex items-center">
                  <div
                    ref={(el) => (nodeRefs.current[index] = el)}
                    className="node flex"
                  >
                    <div className="data-part bg-blue-500 text-white p-4 rounded-l-lg w-20 text-center">
                      {node.value}
                    </div>
                    <div className="next-part bg-blue-300 dark:bg-blue-600 p-4 rounded-r-lg w-20 text-center font-mono">
                      {node.next}
                    </div>
                  </div>
                  {index < list.length - 1 && (
                    <div className="mx-2 text-3xl">→</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        </div>

        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mt-8 mb-8">
          Test Your Knowledge before moving forward!
        </p>
        <Quiz />

        <CodeBlock/>

        <ExploreOther
          title="Explore Other Types"
          links={[
            { text: "Insertion", url: "./insertion" },
            { text: "Searching", url: "./search" },
            { text: "Merge Lists", url: "./merge" },
            { text: "Comparison", url: "./comparison" },
          ]}
        />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default LinkedListVisualizer;