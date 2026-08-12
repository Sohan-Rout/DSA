"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, Trash2, Shuffle, RotateCcw } from "lucide-react";

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

const searchPath = (node, value, path) => {
  if (!node) return null;
  path.push(node.value);
  if (value === node.value) return node;
  if (value < node.value) return searchPath(node.left, value, path);
  return searchPath(node.right, value, path);
};

const deleteNode = (node, value) => {
  if (!node) return null;
  if (value < node.value) {
    node.left = deleteNode(node.left, value);
    return node;
  }
  if (value > node.value) {
    node.right = deleteNode(node.right, value);
    return node;
  }
  if (!node.left && !node.right) return null;
  if (!node.left) return node.right;
  if (!node.right) return node.left;

  let successor = node.right;
  while (successor.left) successor = successor.left;
  node.value = successor.value;
  node.right = deleteNode(node.right, successor.value);
  return node;
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

const BstDeletionVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("Tree is empty");
  const [highlightPath, setHighlightPath] = useState([]);
  const [deletingValue, setDeletingValue] = useState(null);
  const [successorValue, setSuccessorValue] = useState(null);
  const [busy, setBusy] = useState(false);

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
    setRoot((prev) => insertNode(prev ? structuredClone(prev) : null, value));
    setMessage(`Inserted ${value}`);
    setInputValue("");
  };

  const handleDelete = () => {
    const value = parseInt(inputValue, 10);
    if (Number.isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }
    if (!root || busy) return;

    const path = [];
    const target = searchPath(root, value, path);
    if (!target) {
      setMessage(`${value} isn't in the tree`);
      setInputValue("");
      return;
    }

    const hasLeft = !!target.left;
    const hasRight = !!target.right;
    let successor = null;
    if (hasLeft && hasRight) {
      let cur = target.right;
      while (cur.left) cur = cur.left;
      successor = cur.value;
    }

    setBusy(true);
    setHighlightPath(path);
    setDeletingValue(value);
    setSuccessorValue(successor);
    setMessage(
      successor !== null
        ? `Deleting ${value}, replacing it with in-order successor ${successor}`
        : hasLeft || hasRight
        ? `Deleting ${value}, promoting its only child`
        : `Deleting ${value}, it's a leaf, simply removed`
    );

    setTimeout(() => {
      setRoot((prev) => deleteNode(structuredClone(prev), value));
      setHighlightPath([]);
      setDeletingValue(null);
      setSuccessorValue(null);
      setInputValue("");
      setBusy(false);
    }, 900);
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
    setHighlightPath([]);
    setDeletingValue(null);
    setSuccessorValue(null);
  };

  const reset = () => {
    setRoot(null);
    setInputValue("");
    setMessage("Tree is empty");
    setHighlightPath([]);
    setDeletingValue(null);
    setSuccessorValue(null);
  };

  const { nodes, edges } = root ? layoutTree(root) : { nodes: [], edges: [] };

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
        Delete a value and watch how its replacement (if any) is chosen
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4">
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleDelete()}
              placeholder="Enter a number"
              disabled={busy}
              className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <button
              onClick={handleInsert}
              disabled={busy}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40"
            >
              <Plus size={16} strokeWidth={2.5} />
              Insert
            </button>
            <button
              onClick={handleDelete}
              disabled={busy || !root}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-40"
            >
              <Trash2 size={16} strokeWidth={2.5} />
              Delete
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={generateRandomTree}
              disabled={busy}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-900 transition disabled:opacity-40"
            >
              <Shuffle size={15} />
              Random Tree
            </button>
            <button
              onClick={reset}
              disabled={busy}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-40"
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

          <div className="min-h-60 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {nodes.length > 0 ? (
              <svg
                width={dims.width}
                height={dims.height}
                viewBox={`0 0 ${dims.width} ${dims.height}`}
                className="mx-auto"
              >
                <defs>
                  <linearGradient id="bd-internal-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="bd-leaf-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="bd-delete-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                  <filter id="bd-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
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

                {nodes.map((node, i) => {
                  const isOnPath = highlightPath.includes(node.value);
                  const isDeleting = node.value === deletingValue;
                  const isSuccessor = node.value === successorValue;
                  return (
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
                      {isOnPath && !isDeleting && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={NODE_RADIUS + 4}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="2.5"
                          opacity="0.9"
                        />
                      )}
                      {isSuccessor && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={NODE_RADIUS + 4}
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="2.5"
                          opacity="0.9"
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={NODE_RADIUS}
                        fill={
                          isDeleting
                            ? "url(#bd-delete-grad)"
                            : node.isLeaf
                            ? "url(#bd-leaf-grad)"
                            : "url(#bd-internal-grad)"
                        }
                        stroke={isDeleting ? "#b91c1c" : node.isLeaf ? "#059669" : "#1d4ed8"}
                        strokeWidth="1.5"
                        filter="url(#bd-node-shadow)"
                        opacity={isDeleting ? "0.6" : "1"}
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
                  );
                })}
              </svg>
            ) : (
              <div className="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-16">
                No tree yet, insert a value or generate a random tree
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
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Search path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              Being deleted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-violet-500 inline-block"></span>
              In-order successor
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BstDeletionVisualizer;
