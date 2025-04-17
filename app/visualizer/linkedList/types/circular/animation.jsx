'use client';
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import ResetButton from '@/app/components/ui/resetButton';

const CircularLinkedListVisualizer = () => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [explanation, setExplanation] = useState('Enter a value and click "Add Node" to start.');
  const nodeIdCounter = useRef(1);
  const animationRef = useRef(null);
  const isMounted = useRef(true);

  // Generate random memory addresses
  const generateMemoryAddress = () => {
    return '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
  };

  const steps = [
    'Allocating memory for new node',
    'Storing data in node',
    'Setting initial pointers',
    'Updating neighboring nodes',
    'Completing circular connection',
    'Node added to circular list'
  ];

  const explanations = [
    'Step 1: Memory is allocated at a specific address for the new node.',
    'Step 2: The input value is stored in the node\'s data field.',
    'Step 3: The new node\'s next pointer is initialized (points to itself if first node).',
    'Step 4: The previous node\'s next pointer is updated to point to new node.',
    'Step 5: The tail node\'s next pointer is updated to point back to head.',
    'Step 6: The new node is now part of the circular chain!'
  ];

  const addNode = () => {
    if (!inputValue || isAnimating) return;

    setIsAnimating(true);
    setCurrentStep(0);
    setExplanation(explanations[0]);

    let step = 0;
    const animateStep = () => {
      if (!isMounted.current) return;

      setCurrentStep(step);
      setExplanation(explanations[step]);
      step++;

      if (step < steps.length) {
        animationRef.current = setTimeout(animateStep, 1500);
      } else {
        // Animation complete - add the node
        const newNode = {
          value: inputValue,
          id: nodeIdCounter.current++,
          address: generateMemoryAddress(),
        };

        setList(prev => {
          if (prev.length === 0) {
            // First node points to itself
            newNode.next = newNode.address;
            return [newNode];
          } else {
            const updatedList = [...prev];
            // New node points to head
            newNode.next = updatedList[0].address;
            // Last node points to new node
            updatedList[updatedList.length - 1].next = newNode.address;
            return [...updatedList, newNode];
          }
        });

        setInputValue('');
        setExplanation(explanations[explanations.length - 1]);
        setIsAnimating(false);
      }
    };

    animateStep();
  };

  const resetList = () => {
    clearTimeout(animationRef.current);
    setList([]);
    setInputValue('');
    setIsAnimating(false);
    setCurrentStep(0);
    nodeIdCounter.current = 1;
    setExplanation('Enter a value and click "Add Node" to start.');
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      clearTimeout(animationRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl mt-10 font-bold text-center text-gray-900 dark:text-white mb-8">
          <span className="text-blue-600">Circular Linked List</span> Visualizer
        </h1>
        
        {/* Input Form */}
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Node Value
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              placeholder="Enter value"
              disabled={isAnimating}
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={addNode}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
              disabled={isAnimating || !inputValue}
            >
              Add Node
            </button>
            <ResetButton onReset={resetList} isAnimating={isAnimating} />
          </div>
        </div>

        {/* Animation Progress */}
        {isAnimating && (
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <div className="mb-2 text-gray-700 dark:text-gray-300">
              Current Step: <span className="font-medium">{steps[currentStep]}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Explanation Box */}
        <div className="max-w-3xl mx-auto bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg shadow-md mb-8 border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
            How Circular Linked Lists Work:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{explanation}</p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">• Each node contains: Data + Next Pointer + Memory Address</p>
            <p className="mb-2">• Next pointer always points to another node (no NULL pointers)</p>
            <p className="mb-2">• Last node points back to the first node (circular connection)</p>
            <p>• Can traverse indefinitely in one direction</p>
          </div>
        </div>

        {/* Circular List Visualization */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Circular Linked List Visualization
          </h2>
          
          {list.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No nodes in the list yet. Add your first node!
            </div>
          ) : (
            <div className="relative">
              {/* Circular arrangement of nodes */}
              <div className="relative mx-auto" style={{ width: '500px', height: '500px' }}>
                {list.map((node, index) => {
                  // Calculate position on circle
                  const angle = (index * (360 / list.length)) * (Math.PI / 180);
                  const centerX = 250;
                  const centerY = 250;
                  const radius = 200;
                  const nodeX = centerX + radius * Math.cos(angle) - 50;
                  const nodeY = centerY + radius * Math.sin(angle) - 50;
                  
                  return (
                    <div
                      key={node.id}
                      className="absolute"
                      style={{
                        left: `${nodeX}px`,
                        top: `${nodeY}px`,
                        width: '100px',
                        zIndex: 10,
                      }}
                    >
                      <div className={`flex flex-col border-2 ${index === 0 ? 'border-green-500' : 'border-blue-500'} rounded-lg p-3 bg-white dark:bg-gray-700`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-mono text-xs text-gray-600 dark:text-gray-300">
                            {node.address}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                            {index === 0 ? 'HEAD' : `Node ${index}`}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 mb-1">
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Data</div>
                            <div className="font-bold text-center">{node.value}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Next</div>
                            <div className="font-mono text-xs text-center">
                              {node.next === node.address ? 'self' : node.next}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Circular connections */}
                {list.length > 1 && (
                  <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
                    {list.map((node, index) => {
                      const nextIndex = (index + 1) % list.length;
                      const angle1 = (index * (360 / list.length)) * (Math.PI / 180);
                      const angle2 = (nextIndex * (360 / list.length)) * (Math.PI / 180);
                      const centerX = 250;
                      const centerY = 250;
                      const radius = 200;
                      const x1 = centerX + radius * Math.cos(angle1);
                      const y1 = centerY + radius * Math.sin(angle1);
                      const x2 = centerX + radius * Math.cos(angle2);
                      const y2 = centerY + radius * Math.sin(angle2);
                      
                      return (
                        <g key={`connection-${node.id}`}>
                          <path
                            d={`M ${x1} ${y1} Q ${centerX} ${centerY}, ${x2} ${y2}`}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray={index === list.length - 1 ? "5,5" : "0"}
                          />
                          <circle cx={x2} cy={y2} r="5" fill="#3b82f6" />
                        </g>
                      );
                    })}
                  </svg>
                )}

                {/* Single node self-connection */}
                {list.length === 1 && (
                  <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
                    <circle cx="250" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="290" cy="50" r="5" fill="#3b82f6" />
                  </svg>
                )}
              </div>

              {/* Legend */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center mx-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Head Node</span>
                </div>
                <div className="inline-flex items-center mx-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Regular Node</span>
                </div>
                <div className="inline-flex items-center mx-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Circular Connection</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CircularLinkedListVisualizer;