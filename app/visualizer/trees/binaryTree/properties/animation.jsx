"use client";
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { Plus, Shuffle, RotateCcw } from "lucide-react";

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const insertNode = (node, value) => {
  if (!node) return new TreeNode(value);
  if (value < node.value) node.left = insertNode(node.left, value);
  else if (value > node.value) node.right = insertNode(node.right, value);
  return node;
};

const computeStats = (node) => {
  if (!node) return { height: -1, total: 0, leaves: 0 };
  const left = computeStats(node.left);
  const right = computeStats(node.right);
  const isLeaf = !node.left && !node.right;
  return {
    height: 1 + Math.max(left.height, right.height),
    total: 1 + left.total + right.total,
    leaves: isLeaf ? 1 : left.leaves + right.leaves,
  };
};

const NODE_RADIUS = 22;
const LEVEL_HEIGHT = 78;

const layoutTree = (node, depth = 0, x = 320, y = 40, nodes = [], edges = []) => {
  if (!node) return { nodes, edges };
  const isLeaf = !node.left && !node.right;
  const xOffset = Math.max(24, 110 / (depth + 1));

  nodes.push({ value: node.value, x, y, depth, isLeaf, isRoot: depth === 0 });

  if (node.left) {
    const leftX = x - xOffset;
    const leftY = y + LEVEL_HEIGHT;
    edges.push({
      x1: x,
      y1: y + NODE_RADIUS - 2,
      x2: leftX,
      y2: leftY - NODE_RADIUS + 2,
    });
    layoutTree(node.left, depth + 1, leftX, leftY, nodes, edges);
  }
  if (node.right) {
    const rightX = x + xOffset;
    const rightY = y + LEVEL_HEIGHT;
    edges.push({
      x1: x,
      y1: y + NODE_RADIUS - 2,
      x2: rightX,
      y2: rightY - NODE_RADIUS + 2,
    });
    layoutTree(node.right, depth + 1, rightX, rightY, nodes, edges);
  }

  return { nodes, edges };
};

const TreePropertiesVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("Tree is empty");
  const lastInsertedRef = useRef(null);

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(
      el,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" }
    );
  };

  const handleInsert = () => {
    const value = parseInt(inputValue, 10);
    if (Number.isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }
    setRoot((prev) => {
      const cloned = prev ? structuredClone(prev) : null;
      const updated = insertNode(cloned, value);
      return updated;
    });
    lastInsertedRef.current = value;
    setMessage(`Inserted ${value}`);
    setInputValue("");
  };

  const generateRandomTree = () => {
    const size = Math.floor(Math.random() * 5) + 5;
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    let newRoot = null;
    values.forEach((v) => {
      newRoot = insertNode(newRoot, v);
    });
    setRoot(newRoot);
    setMessage(`Generated a tree with ${size} random inserts`);
  };

  const reset = () => {
    setRoot(null);
    setInputValue("");
    setMessage("Tree is empty");
  };

  const { nodes, edges } = root ? layoutTree(root) : { nodes: [], edges: [] };
  const stats = computeStats(root);

  const getSvgDimensions = () => {
    if (nodes.length === 0) return { width: 600, height: 220 };
    const xValues = nodes.map((n) => n.x);
    const yValues = nodes.map((n) => n.y);
    const padding = 40;
    return {
      width: Math.max(600, Math.max(...xValues) - Math.min(...xValues) + padding * 2),
      height: Math.max(220, Math.max(...yValues) + padding * 2),
    };
  };
  const dims = getSvgDimensions();

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Build a tree and watch its height, depth, and node counts update live
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4">
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsert()}
              placeholder="Enter a number"
              className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
            />
            <button
              onClick={handleInsert}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              <Plus size={16} strokeWidth={2.5} />
              Insert
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={generateRandomTree}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
            >
              <Shuffle size={15} />
              Random Tree
            </button>
            <button
              onClick={reset}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-center text-sm">
            {message}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-100 dark:bg-neutral-900 p-2 rounded-lg text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Height</div>
              <div className="font-bold text-lg">{root ? stats.height : "—"}</div>
            </div>
            <div className="bg-gray-100 dark:bg-neutral-900 p-2 rounded-lg text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Total Nodes</div>
              <div className="font-bold text-lg">{stats.total}</div>
            </div>
            <div className="bg-gray-100 dark:bg-neutral-900 p-2 rounded-lg text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Leaf Nodes</div>
              <div className="font-bold text-lg">{stats.leaves}</div>
            </div>
          </div>

          <div className="min-h-60 flex justify-center overflow-auto py-4 rounded-lgbg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {nodes.length > 0 ? (
              <svg
                width={dims.width}
                height={dims.height}
                viewBox={`0 0 ${dims.width} ${dims.height}`}
                className="mx-auto"
              >
                <defs>
                  <linearGradient id="tp-internal-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="tp-leaf-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="tp-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.3" />
                  </filter>
                </defs>

                {edges.map((edge, i) => {
                  const midY = (edge.y1 + edge.y2) / 2;
                  return (
                    <path
                      key={i}
                      d={`M ${edge.x1} ${edge.y1} C ${edge.x1} ${midY}, ${edge.x2} ${midY}, ${edge.x2} ${edge.y2}`}
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="dark:stroke-indigo-500/70"
                    />
                  );
                })}

                {nodes.map((node, i) => (
                  <g key={i} ref={animateDropIn}>
                    {node.isRoot && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={NODE_RADIUS + 6}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        strokeDasharray="3 4"
                        opacity="0.7"
                      />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={NODE_RADIUS}
                      fill={node.isLeaf ? "url(#tp-leaf-grad)" : "url(#tp-internal-grad)"}
                      stroke={node.isLeaf ? "#059669" : "#1d4ed8"}
                      strokeWidth="1.5"
                      filter="url(#tp-node-shadow)"
                    />
                    <text
                      x={node.x}
                      y={node.y + 5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="13"
                      fontWeight="700"
                    >
                      {node.value}
                    </text>

                    <rect
                      x={node.x - 11}
                      y={node.y - NODE_RADIUS - 20}
                      width="22"
                      height="14"
                      rx="7"
                      className="fill-gray-100 dark:fill-neutral-800 stroke-gray-300 dark:stroke-gray-700"
                      strokeWidth="1"
                    />
                    <text
                      x={node.x}
                      y={node.y - NODE_RADIUS - 10}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="600"
                      className="fill-gray-600 dark:fill-gray-300"
                    >
                      d{node.depth}
                    </text>
                  </g>
                ))}
              </svg>
            ) : (
              <div className="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-16">
                No tree yet — insert a value or generate a random tree
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Internal node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Leaf node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-amber-500 inline-block"></span>
              Root
            </span>
            <span>
              d0, d1, d2… = depth from root
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TreePropertiesVisualizer;
