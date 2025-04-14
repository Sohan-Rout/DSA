'use client';
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default function InOrderVisualizer() {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('Tree is empty');
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [traversalResult, setTraversalResult] = useState([]);
  const [speed, setSpeed] = useState(1);
  const [steps, setSteps] = useState(0);
  const animationRef = useRef(null);

  // Insert node into BST
  const insertNode = (node, value) => {
    if (!node) return new TreeNode(value);
    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    }
    return node;
  };

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }

    setRoot(prev => {
      const newRoot = insertNode(prev ? {...prev} : null, value);
      setMessage(`Inserted ${value}`);
      return newRoot;
    });
    setInputValue('');
    setTraversalResult([]);
    setHighlightedNodes([]);
    setSteps(0);
  };

  // Generate random tree
  const generateRandomTree = () => {
    const size = Math.floor(Math.random() * 5) + 5; // 5-9 nodes
    const values = Array.from({length: size}, () => Math.floor(Math.random() * 100) + 1);
    
    let newRoot = null;
    values.forEach(val => {
      newRoot = insertNode(newRoot, val);
    });
    
    setRoot(newRoot);
    setMessage(`Generated tree with ${size} nodes`);
    setTraversalResult([]);
    setHighlightedNodes([]);
    setSteps(0);
  };

  // Reset everything
  const reset = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setRoot(null);
    setInputValue('');
    setIsAnimating(false);
    setMessage('Tree is empty');
    setTraversalResult([]);
    setHighlightedNodes([]);
    setSteps(0);
  };

  // In-order traversal with animation tracking
  const inOrderTraversal = (node, path = []) => {
    if (!node) return path;
    
    const leftPath = inOrderTraversal(node.left, path);
    leftPath.push({ 
      value: node.value, 
      action: 'visit',
      highlighted: true 
    });
    return inOrderTraversal(node.right, leftPath);
  };

  const visualizeInOrder = () => {
    if (!root) {
      setMessage('Tree is empty!');
      return;
    }

    setIsAnimating(true);
    setMessage('Performing in-order traversal...');
    setTraversalResult([]);
    setHighlightedNodes([]);
    setSteps(0);

    const traversalPath = inOrderTraversal(root);
    let step = 0;

    const animateStep = () => {
      if (step < traversalPath.length) {
        const current = traversalPath[step];
        setHighlightedNodes([current.value]);
        setTraversalResult(prev => [...prev, current.value]);
        setSteps(step + 1);
        step++;
        animationRef.current = setTimeout(animateStep, 1000 / speed);
      } else {
        setMessage(`In-order traversal complete: [${traversalPath.map(n => n.value).join(', ')}]`);
        setIsAnimating(false);
        setHighlightedNodes([]);
      }
    };

    animateStep();
  };

  // Render tree as SVG with centered layout
  const renderTree = (node, x = 400, y = 50, level = 0, nodes = [], edges = []) => {
    if (!node) return { nodes, edges };

    const nodeRadius = 25;
    const xOffset = Math.max(50, 200 / (level + 1)); // Dynamic spacing
    const yOffset = 80;

    nodes.push({
      value: node.value,
      x,
      y,
      highlighted: highlightedNodes.includes(node.value),
    });

    if (node.left) {
      const leftX = x - xOffset;
      const leftY = y + yOffset;
      edges.push({
        x1: x,
        y1: y + nodeRadius,
        x2: leftX,
        y2: leftY - nodeRadius,
      });
      renderTree(node.left, leftX, leftY, level + 1, nodes, edges);
    }

    if (node.right) {
      const rightX = x + xOffset;
      const rightY = y + yOffset;
      edges.push({
        x1: x,
        y1: y + nodeRadius,
        x2: rightX,
        y2: rightY - nodeRadius,
      });
      renderTree(node.right, rightX, rightY, level + 1, nodes, edges);
    }

    return { nodes, edges };
  };

  const { nodes, edges } = root ? renderTree(root) : { nodes: [], edges: [] };

  // Calculate SVG dimensions based on tree size
  const getSvgDimensions = () => {
    if (nodes.length === 0) return { width: 800, height: 400 };
    
    const xValues = nodes.map(node => node.x);
    const yValues = nodes.map(node => node.y);
    const padding = 50;
    
    return {
      width: Math.max(800, Math.max(...xValues) - Math.min(...xValues) + 2 * padding),
      height: Math.max(400, Math.max(...yValues) + 2 * padding)
    };
  };

  const svgDimensions = getSvgDimensions();

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen mt-16 bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            <span className="text-blue-600 dark:text-blue-600">In-Order Traversal</span> Visualizer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Visualize how in-order traversal visits nodes in a binary search tree
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <button
                onClick={generateRandomTree}
                disabled={isAnimating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors mb-2"
              >
                Generate Random Tree
              </button>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter number"
                  className="flex-1 p-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isAnimating}
                  onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
                />
                <button
                  onClick={handleInsert}
                  disabled={isAnimating}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
                >
                  Insert
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={visualizeInOrder}
                disabled={!root || isAnimating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
              >
                {isAnimating ? "Traversing..." : "Start Traversal"}
              </button>
              <button
                onClick={reset}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Reset All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 dark:text-gray-300 text-sm">Speed:</span>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="flex-1"
                disabled={isAnimating}
              />
              <span className="text-gray-700 dark:text-gray-300 text-sm w-8">{speed}x</span>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Nodes</div>
                <div className="font-bold">{nodes.length}</div>
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Steps</div>
                <div className="font-bold">{steps}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className={`mb-6 p-3 rounded-lg text-center ${
          message.includes('complete') ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
          isAnimating ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' :
          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        }`}>
          {message}
        </div>

        {/* Tree Visualization */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-semibold mb-3">Tree Visualization</h2>
          <div className="min-h-[400px] flex justify-center overflow-auto py-4">
            {nodes.length > 0 ? (
              <div className="relative" style={{ minWidth: `${svgDimensions.width}px` }}>
                <svg 
                  width={svgDimensions.width} 
                  height={svgDimensions.height}
                  viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
                  className="mx-auto"
                >
                  {edges.map((edge, i) => (
                    <line
                      key={i}
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      className="dark:stroke-gray-600"
                    />
                  ))}
                  {nodes.map((node, i) => (
                    <g key={i}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="22"
                        fill={node.highlighted ? "#f59e0b" : "#3b82f6"}
                        stroke={node.highlighted ? "#d97706" : "#1d4ed8"}
                        strokeWidth="2"
                        className={`transition-colors ${node.highlighted ? "animate-pulse" : ""}`}
                      />
                      <text
                        x={node.x}
                        y={node.y + 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="13"
                        fontWeight="600"
                      >
                        {node.value}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700">
                {isAnimating ? "Traversing..." : "No tree generated yet"}
              </div>
            )}
          </div>

          {traversalResult.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
              <span className="font-medium">Path: </span>
              <span className="text-green-700 dark:text-green-300">[{traversalResult.join(', ')}]</span>
            </div>
          )}
        </div>

        {/* Explanation Panel - Now below the tree */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-3">About In-Order Traversal</h2>
          <div className="space-y-4">
            <div className="prose dark:prose-invert text-sm">
              <p>Visits nodes in the order:</p>
              <ol className="pl-5 space-y-1">
                <li>Left subtree</li>
                <li>Root node</li>
                <li>Right subtree</li>
              </ol>
              <p className="mt-2">For BSTs, this produces nodes in sorted order.</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
              <h3 className="font-medium text-sm text-blue-800 dark:text-blue-200 mb-2">Algorithm:</h3>
              <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
{`function inOrder(node) {
  if (node !== null) {
    inOrder(node.left);
    visit(node);
    inOrder(node.right);
  }
}`}
              </pre>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-center">
                <div className="text-gray-500 dark:text-gray-400">Time</div>
                <div className="font-bold">O(n)</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-center">
                <div className="text-gray-500 dark:text-gray-400">Space</div>
                <div className="font-bold">O(h)</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="border-t border-gray-300 dark:border-gray-700 mt-8"></div>
      <Footer />
    </div>
  );
}