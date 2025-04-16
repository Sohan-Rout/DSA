'use client';
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import ResetButton from '@/app/components/ui/resetButton';

const SinglyLinkedListVisualizer = () => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [explanation, setExplanation] = useState('Enter a value and click "Add Node" to start.');
  const nodeIdCounter = useRef(1);
  const animationRef = useRef(null);
  const isMounted = useRef(true);

  // Generate random memory addresses for visualization
  const generateMemoryAddress = () => {
    return '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
  };

  const steps = [
    'Allocating memory for new node',
    'Storing data in node',
    'Setting next pointer to null',
    'Updating previous node\'s pointer',
    'Node added to list'
  ];

  const explanations = [
    'Step 1: Memory is allocated at a specific address for the new node.',
    'Step 2: The input value is stored in the node\'s data field.',
    'Step 3: The new node\'s next pointer initialized to null (indicates end of list).',
    'Step 4: The previous node\'s next pointer is updated to point to this new node\'s address.',
    'Step 5: The new node is now properly linked in the list!'
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
          <span className="text-blue-600">Singly Linked List</span> Visualizer
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
            How Singly Linked Lists Work:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{explanation}</p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">• Each node contains: Data + Next Pointer + Memory Address</p>
            <p className="mb-2">• Next pointer stores the memory address of the next node</p>
            <p className="mb-2">• Null pointer (0x0000) indicates the end of the list</p>
            <p>• Nodes are dynamically allocated at different memory addresses</p>
          </div>
        </div>

        {/* Linked List Visualization */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Linked List Memory Representation
          </h2>
          
          {list.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No nodes in the list yet. Add your first node!
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              {list.map((node, index) => (
                <div key={node.id} className="w-full max-w-md">
                  <div className={`flex flex-col border-2 ${index === 0 ? 'border-green-500' : 'border-blue-500'} rounded-lg p-4 bg-white dark:bg-gray-700`}>
                    {/* Node Header */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-sm text-gray-600 dark:text-gray-300">
                        {node.address}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                        {index === 0 ? 'HEAD' : `Node ${index}`}
                      </span>
                    </div>
                    
                    {/* Data Section */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="border-r border-gray-300 dark:border-gray-600 pr-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Data</div>
                        <div className="font-bold text-lg">{node.value}</div>
                      </div>
                      
                      {/* Next Pointer Section */}
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next Pointer</div>
                        <div className="font-mono text-sm">
                          {node.next || <span className="text-red-500">0x0000 (NULL)</span>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Pointer Visualization */}
                    {node.next && (
                      <div className="flex justify-center mt-2">
                        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-blue-500"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow to next node */}
                  {node.next && (
                    <div className="flex justify-center">
                      <div className="h-6 w-0.5 bg-blue-500"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SinglyLinkedListVisualizer;