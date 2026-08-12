"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, Ruler, Shuffle, RotateCcw } from "lucide-react";

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

// Edge-height: number of nodes on the longest downward path from this node (0 for null).
const height = (node) => (node ? 1 + Math.max(height(node.left), height(node.right)) : 0);

// Post-order pass: at every node, the longest path *through* it is
// leftHeight + rightHeight edges. The overall diameter is the max of that
// value across every node, not necessarily the one at the root.
const computeDiameter = (root) => {
  const steps = [];
  let best = { diameter: -1, node: null };

  const visit = (node) => {
    if (!node) return 0;
    const leftHeight = visit(node.left);
    const rightHeight = visit(node.right);
    const h = 1 + Math.max(leftHeight, rightHeight);
    const diameter = leftHeight + rightHeight;
    steps.push({ value: node.value, leftHeight, rightHeight, h, diameter });
    if (diameter > best.diameter) best = { diameter, node };
    return h;
  };

  visit(root);
  return { steps, best };
};

// Walks from a node down to the deepest leaf, always following the taller side.
const deepPath = (node) => {
  if (!node) return [];
  const leftHeight = height(node.left);
  const rightHeight = height(node.right);
  if (leftHeight >= rightHeight) return [node.value, ...deepPath(node.left)];
  return [node.value, ...deepPath(node.right)];
};

const buildDiameterPath = (pivot) => {
  if (!pivot) return [];
  return [...deepPath(pivot.left)].reverse().concat([pivot.value]).concat(deepPath(pivot.right));
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
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: leftX, y2: leftY - NODE_RADIUS + 2, parentValue: node.value, childValue: node.left.value });
    layoutTree(node.left, depth + 1, leftX, leftY, nodes, edges);
  }
  if (node.right) {
    const rightX = x + xOffset;
    const rightY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: rightX, y2: rightY - NODE_RADIUS + 2, parentValue: node.value, childValue: node.right.value });
    layoutTree(node.right, depth + 1, rightX, rightY, nodes, edges);
  }

  return { nodes, edges };
};

const STEP_DELAY = 450;

const DiameterVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("Tree is empty");
  const [computedHeights, setComputedHeights] = useState({});
  const [diameterPath, setDiameterPath] = useState([]);
  const [pivotValue, setPivotValue] = useState(null);
  const [diameterEdges, setDiameterEdges] = useState(null);
  const [busy, setBusy] = useState(false);

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" });
  };

  const clearResult = () => {
    setComputedHeights({});
    setDiameterPath([]);
    setPivotValue(null);
    setDiameterEdges(null);
  };

  const handleInsert = () => {
    const value = parseInt(inputValue, 10);
    if (Number.isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }
    if (busy) return;
    setRoot((prev) => insertNode(prev ? structuredClone(prev) : null, value));
    setMessage(`Inserted ${value}`);
    setInputValue("");
    clearResult();
  };

  const handleFindDiameter = () => {
    if (busy || !root) return;

    const { steps, best } = computeDiameter(root);
    const path = buildDiameterPath(best.node);

    setBusy(true);
    clearResult();

    let step = 0;
    const revealStep = () => {
      const s = steps[step];
      setComputedHeights((prev) => ({ ...prev, [s.value]: s.h }));
      setMessage(`height(${s.value}) = ${s.h}: longest path through ${s.value} spans ${s.diameter} edge${s.diameter === 1 ? "" : "s"}`);
      step++;

      if (step < steps.length) {
        setTimeout(revealStep, STEP_DELAY);
      } else {
        setTimeout(() => {
          setDiameterPath(path);
          setPivotValue(best.node.value);
          setDiameterEdges(best.diameter);
          setMessage(`Diameter is ${best.diameter} edge${best.diameter === 1 ? "" : "s"} (${path.length} nodes), turning at ${best.node.value}`);
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    revealStep();
  };

  const generateRandomTree = () => {
    if (busy) return;
    const size = Math.floor(Math.random() * 5) + 7;
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    let newRoot = null;
    values.forEach((v) => {
      newRoot = insertNode(newRoot, v);
    });
    setRoot(newRoot);
    setMessage(`Generated a tree with ${size} random inserts`);
    clearResult();
  };

  const reset = () => {
    if (busy) return;
    setRoot(null);
    setInputValue("");
    setMessage("Tree is empty");
    clearResult();
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

  const isDiameterEdge = (edge) => {
    if (diameterPath.length < 2) return false;
    for (let i = 0; i < diameterPath.length - 1; i++) {
      const a = diameterPath[i];
      const b = diameterPath[i + 1];
      if ((edge.parentValue === a && edge.childValue === b) || (edge.parentValue === b && edge.childValue === a)) {
        return true;
      }
    }
    return false;
  };

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Find the longest path between any two nodes in the tree
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4 space-y-3">
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsert()}
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
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleFindDiameter}
              disabled={busy || !root}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40"
            >
              <Ruler size={15} />
              Find Diameter
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
                  <linearGradient id="diam-internal-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="diam-leaf-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="diam-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.3" />
                  </filter>
                </defs>

                {edges.map((edge, i) => {
                  const midY = (edge.y1 + edge.y2) / 2;
                  const onDiameter = isDiameterEdge(edge);
                  return (
                    <path
                      key={i}
                      d={`M ${edge.x1} ${edge.y1} C ${edge.x1} ${midY}, ${edge.x2} ${midY}, ${edge.x2} ${edge.y2}`}
                      fill="none"
                      stroke={onDiameter ? "#f59e0b" : "#818cf8"}
                      strokeWidth={onDiameter ? "3" : "2"}
                      strokeLinecap="round"
                      className={onDiameter ? "" : "dark:stroke-indigo-500/70"}
                      style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
                    />
                  );
                })}

                {nodes.map((node, i) => {
                  const heightLabel = computedHeights[node.value];
                  const isOnDiameter = diameterPath.includes(node.value);
                  const isPivot = node.value === pivotValue;
                  const isEndpoint = isOnDiameter && !isPivot && (node.value === diameterPath[0] || node.value === diameterPath[diameterPath.length - 1]);
                  return (
                    <g key={i} ref={animateDropIn}>
                      {node.isRoot && (
                        <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 6} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
                      )}
                      {isOnDiameter && !isPivot && !isEndpoint && (
                        <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 4} fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.9" />
                      )}
                      {isEndpoint && (
                        <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 4} fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.9" />
                      )}
                      {isPivot && (
                        <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 5} fill="none" stroke="#10b981" strokeWidth="3" />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={NODE_RADIUS}
                        fill={node.isLeaf ? "url(#diam-leaf-grad)" : "url(#diam-internal-grad)"}
                        stroke={node.isLeaf ? "#059669" : "#1d4ed8"}
                        strokeWidth="1.5"
                        filter="url(#diam-node-shadow)"
                      />
                      <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
                        {node.value}
                      </text>

                      {heightLabel !== undefined && (
                        <>
                          <rect
                            x={node.x - 13}
                            y={node.y - NODE_RADIUS - 20}
                            width="26"
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
                            h:{heightLabel}
                          </text>
                        </>
                      )}
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

          {diameterEdges !== null && (
            <div className="mt-3 text-center text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Diameter: {diameterEdges} edge{diameterEdges === 1 ? "" : "s"} ({diameterPath.join(" → ")})
            </div>
          )}

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
              Diameter path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-violet-500 inline-block"></span>
              Path endpoints
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-emerald-500 inline-block"></span>
              Turning point
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiameterVisualizer;
