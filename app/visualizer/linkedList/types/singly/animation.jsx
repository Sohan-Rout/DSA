'use client';
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ResetButton from '@/app/components/ui/resetButton';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SinglyLinkedListVisualizer = () => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const nodeIdCounter = useRef(1);

  // Generate random memory addresses for visualization
  const generateMemoryAddress = () => {
    return '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
  };

  const addNode = () => {
    if (!inputValue || isAnimating) return;

    const newNode = {
      value: inputValue,
      id: nodeIdCounter.current++,
      address: generateMemoryAddress(),
      next: null
    };

    setList(prev => {
      if (prev.length > 0) {
        // Update previous node's next pointer
        const updatedList = [...prev];
        updatedList[updatedList.length - 1].next = newNode.address;
        return [...updatedList, newNode];
      }
      return [newNode];
    });

    setInputValue('');
  };

  const resetList = () => {
    if (list.length === 0) return;
    setIsAnimating(true);
    const nodes = document.querySelectorAll('[data-node-id]');

    if (prefersReducedMotion() || nodes.length === 0) {
      setList([]);
      nodeIdCounter.current = 1;
      setIsAnimating(false);
      return;
    }

    gsap.to(nodes, {
      opacity: 0,
      scale: 0.8,
      y: -8,
      duration: 0.25,
      stagger: 0.04,
      ease: 'power1.in',
      onComplete: () => {
        setList([]);
        nodeIdCounter.current = 1;
        setIsAnimating(false);
      },
    });
  };

  useEffect(() => {
    if (list.length === 0) return;
    const newest = list[list.length - 1];
    const nodeEl = document.querySelector(`[data-node-id="${newest.id}"]`);
    const arrowEl = document.querySelector(`[data-arrow-id="${newest.id}"]`);
    if (!nodeEl) return;

    if (prefersReducedMotion()) return;

    setIsAnimating(true);
    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });
    tl.from(nodeEl, {
      opacity: 0,
      scale: 0.6,
      y: -12,
      duration: 0.45,
      ease: 'back.out(1.8)',
    });
    if (arrowEl) {
      tl.from(
        arrowEl,
        { opacity: 0, scaleY: 0, transformOrigin: 'top', duration: 0.3, ease: 'power2.out' },
        '-=0.15'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length]);

  return (
      <main className="container mx-auto px-6 pb-4">
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize Singly Linked List Operations
        </p>

          {/* Input Form */}
          <div className="bg-white max-w-4xl mx-auto dark:bg-gray-800 p-5 rounded-2xl shadow-md mb-6 border border-gray-200 dark:border-gray-700">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Node Value
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900/40 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter value"
                  disabled={isAnimating}
                  onKeyDown={(e) => e.key === 'Enter' && addNode()}
                />
                {inputValue && (
                  <button
                    onClick={() => setInputValue('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addNode}
                className={`flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:active:scale-100 shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 ${isAnimating ? 'cursor-not-allowed' : ''}`}
                disabled={isAnimating || !inputValue}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Node
              </button>
              <ResetButton onReset={resetList} isAnimating={isAnimating} />
            </div>
          </div>
          {/* Linked List Visualization */}
          <div className="bg-white mx-auto max-w-4xl dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Linked List Memory Representation
              </h2>
              {list.length > 0 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                  {list.length} {list.length === 1 ? 'node' : 'nodes'}
                </span>
              )}
            </div>

            {list.length === 0 ? (
              <div className="text-center py-12 rounded-xl bg-gray-50 dark:bg-gray-900/30 border border-dashed border-gray-300 dark:border-gray-600">
                <div className="inline-flex p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">No nodes in the list yet. Add your first node!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                {list.map((node, index) => (
                  <React.Fragment key={node.id}>
                    <div className="w-full max-w-xs relative group">
                      {/* Node Card */}
                      <div
                        data-node-id={node.id}
                        className={`relative flex flex-col rounded-2xl bg-white dark:bg-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden ring-1 ${
                          index === 0 ? 'ring-green-500/40' : 'ring-blue-500/30'
                        }`}
                      >
                        {/* Accent bar */}
                        <div
                          className={`h-1 w-full ${
                            index === 0
                              ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                              : 'bg-gradient-to-r from-blue-400 to-blue-500'
                          }`}
                        />

                        <div className="p-3.5">
                          {/* Node Header */}
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md">
                              {node.address}
                            </span>
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                                index === 0
                                  ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                                  : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                              }`}
                            >
                              {index === 0 ? 'HEAD' : `Node ${index}`}
                            </span>
                          </div>

                          {/* Data Section */}
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">Data</div>
                              <div className="font-bold text-xl text-gray-900 dark:text-white truncate">{node.value}</div>
                            </div>

                            <div className="text-right">
                              <div className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">Next</div>
                              <div className="font-mono text-xs text-gray-600 dark:text-gray-300">
                                {node.next || <span className="text-red-500 dark:text-red-400">NULL</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Arrow to next node */}
                      {node.next && (
                        <div
                          data-arrow-id={list[index + 1]?.id}
                          className="flex justify-center py-1.5 relative"
                        >
                          <div className="h-5 w-0.5 rounded-full bg-gradient-to-b from-blue-400 to-blue-300 dark:from-blue-500 dark:to-blue-600 relative">
                            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-400 dark:border-t-blue-500"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
      </main>
  );
};

export default SinglyLinkedListVisualizer;
