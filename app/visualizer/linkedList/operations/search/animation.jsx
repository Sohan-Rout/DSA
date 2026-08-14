"use client";
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const LinkedListSearch = () => {
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [foundIndex, setFoundIndex] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const nodeRefs = useRef([]);
  const arrowRefs = useRef([]);

  const generateRandomList = () => {
    if (isAnimating) return;
    handleReset();

    const size = Math.floor(Math.random() * 3) + 4; // 4-6 nodes
    const values = new Set();
    while (values.size < size) {
      values.add(Math.floor(Math.random() * 90) + 10);
    }

    const newList = [...values].map((value, index) => ({
      value,
      id: Date.now() + index,
    }));

    setList(newList);
  };

  const animateSearch = async () => {
    if (isAnimating || list.length === 0) return;
    const target = parseInt(searchInput, 10);
    if (Number.isNaN(target)) return;

    setIsAnimating(true);
    setFoundIndex(null);
    setNotFound(false);

    gsap.set(nodeRefs.current, { backgroundColor: '#3b82f6', scale: 1, y: 0 });
    gsap.set(arrowRefs.current, { opacity: 0.6, scale: 1 });

    let found = -1;

    for (let i = 0; i < list.length; i++) {
      const el = nodeRefs.current[i];
      if (!el) continue;

      await new Promise((resolve) => {
        gsap.to(el, {
          duration: 0.35,
          backgroundColor: '#f59e0b',
          scale: 1.2,
          y: -15,
          ease: 'power1.out',
          onComplete: resolve,
        });
      });

      if (list[i].value === target) {
        found = i;
        await new Promise((resolve) => {
          gsap.to(el, {
            duration: 0.4,
            backgroundColor: '#10b981',
            scale: 1.3,
            ease: 'back.out(2)',
            onComplete: resolve,
          });
        });
        break;
      }

      await new Promise((resolve) => {
        gsap.to(el, {
          duration: 0.3,
          backgroundColor: '#ef4444',
          scale: 1,
          y: 0,
          ease: 'power1.in',
          onComplete: resolve,
        });
      });

      if (i < list.length - 1 && arrowRefs.current[i]) {
        gsap.to(arrowRefs.current[i], {
          duration: 0.25,
          opacity: 1,
          scale: 1.25,
          yoyo: true,
          repeat: 1,
        });
      }
    }

    if (found === -1) {
      setNotFound(true);
    } else {
      setFoundIndex(found);
    }
    setIsAnimating(false);
  };

  const handleReset = () => {
    gsap.killTweensOf('*');
    setList([]);
    setSearchInput('');
    setIsAnimating(false);
    setFoundIndex(null);
    setNotFound(false);
    nodeRefs.current = [];
    arrowRefs.current = [];
  };

  useEffect(() => {
    nodeRefs.current = nodeRefs.current.slice(0, list.length);
    arrowRefs.current = arrowRefs.current.slice(0, Math.max(0, list.length - 1));
  }, [list]);

  return (
    <div className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-base sm:text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Visualize how a linear search walks a linked list looking for a value
      </p>

      {/* Controls */}
      <div className="flex justify-center mb-8">
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 sm:p-6 w-full max-w-4xl rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={generateRandomList}
              disabled={isAnimating}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 flex-1 flex items-center justify-center gap-2"
            >
              Generate List
            </button>

            <input
              type="number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Value to search"
              disabled={isAnimating}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />

            <button
              onClick={animateSearch}
              disabled={isAnimating || list.length === 0 || searchInput === ''}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 flex-1 flex items-center justify-center gap-2"
            >
              {isAnimating ? 'Searching...' : 'Search'}
            </button>

            <button
              onClick={handleReset}
              className="bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 rounded-lg flex-1 flex items-center justify-center gap-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mb-4 text-center h-6">
        {foundIndex !== null && (
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            Found {searchInput} at index {foundIndex}
          </span>
        )}
        {notFound && (
          <span className="text-red-600 dark:text-red-400 font-medium">
            {searchInput} is not in the list
          </span>
        )}
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap justify-center gap-3 sm:gap-6 text-sm sm:text-base">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
          <span>Unvisited</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <span>Not a match</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
          <span>Found</span>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="flex justify-center px-2">
        <div className="relative bg-gray-200/50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-lg min-h-[200px] p-4 flex items-center justify-center w-full max-w-4xl overflow-x-auto">
          {list.length === 0 ? (
            <div className="text-center w-full py-12 text-gray-500 dark:text-gray-400">
              Click "Generate List" to create a linked list
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              {list.map((node, index) => (
                <React.Fragment key={node.id}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                      index {index}
                    </div>
                    <div
                      ref={(el) => (nodeRefs.current[index] = el)}
                      className="node flex items-center justify-center bg-blue-500 text-white text-xl font-semibold w-16 h-16 rounded-full shadow-md"
                    >
                      {node.value}
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
              <div className="flex flex-col items-center gap-2 sm:ml-2">
                <div className="text-xs font-mono text-gray-500 dark:text-gray-400 sm:opacity-0">
                  end
                </div>
                <div className="text-sm font-mono text-gray-500 dark:text-gray-400 px-3 py-2 border border-dashed border-gray-400 dark:border-gray-600 rounded-lg">
                  null
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedListSearch;
