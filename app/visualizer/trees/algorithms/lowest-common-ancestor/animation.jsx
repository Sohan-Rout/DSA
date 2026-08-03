"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, GitBranch, Shuffle, RotateCcw } from "lucide-react";

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

const nodeExists = (node, value) => {
  let cur = node;
  while (cur) {
    if (value === cur.value) return true;
    cur = value < cur.value ? cur.left : cur.right;
  }
  return false;
};

const collectValues = (node, out = []) => {
  if (!node) return out;
  out.push(node.value);
  collectValues(node.left, out);
  collectValues(node.right, out);
  return out;
};

// Walks from the root toward the split point where p and q's paths diverge —
// that split point is the LCA — recording, at each step, every value in the
// subtree ruled out by that comparison.
const lcaWithElimination = (root, p, q) => {
  const path = [];
  const eliminatedPerStep = [];
  let cur = root;
  while (cur) {
    path.push(cur.value);
    if (p < cur.value && q < cur.value) {
      eliminatedPerStep.push(collectValues(cur.right));
      cur = cur.left;
    } else if (p > cur.value && q > cur.value) {
      eliminatedPerStep.push(collectValues(cur.left));
      cur = cur.right;
    } else {
      eliminatedPerStep.push([]);
      break;
    }
  }
  return { path, eliminatedPerStep, lca: cur ? cur.value : null };
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
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: leftX, y2: leftY - NODE_RADIUS + 2, childValue: node.left.value });
    layoutTree(node.left, depth + 1, leftX, leftY, nodes, edges);
  }
  if (node.right) {
    const rightX = x + xOffset;
    const rightY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: rightX, y2: rightY - NODE_RADIUS + 2, childValue: node.right.value });
    layoutTree(node.right, depth + 1, rightX, rightY, nodes, edges);
  }

  return { nodes, edges };
};

const STEP_DELAY = 550;

const LcaVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [nodeA, setNodeA] = useState("");
  const [nodeB, setNodeB] = useState("");
  const [message, setMessage] = useState("Tree is empty");
  const [targets, setTargets] = useState([]);
  const [highlightPath, setHighlightPath] = useState([]);
  const [dimmedValues, setDimmedValues] = useState([]);
  const [lcaValue, setLcaValue] = useState(null);
  const [busy, setBusy] = useState(false);

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" });
  };

  const clearResult = () => {
    setHighlightPath([]);
    setDimmedValues([]);
    setLcaValue(null);
    setTargets([]);
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

  const handleFindLca = () => {
    if (busy || !root) return;
    const p = parseInt(nodeA, 10);
    const q = parseInt(nodeB, 10);
    if (Number.isNaN(p) || Number.isNaN(q)) {
      setMessage("Enter two valid numbers for node A and node B");
      return;
    }
    if (!nodeExists(root, p)) {
      setMessage(`${p} isn't in the tree`);
      return;
    }
    if (!nodeExists(root, q)) {
      setMessage(`${q} isn't in the tree`);
      return;
    }

    const { path, eliminatedPerStep, lca } = lcaWithElimination(root, p, q);
    setBusy(true);
    clearResult();
    setTargets([p, q]);

    let step = 0;
    const revealStep = () => {
      const current = path[step];
      setHighlightPath((prev) => [...prev, current]);
      setDimmedValues((prev) => [...prev, ...(eliminatedPerStep[step] || [])]);
      if (step < path.length - 1) {
        setMessage(`Both ${p} and ${q} are on the same side of ${current} — descending further`);
      } else {
        setMessage(`${p} and ${q} split apart at ${current} — this is the LCA`);
      }
      step++;

      if (step < path.length) {
        setTimeout(revealStep, STEP_DELAY);
      } else {
        setTimeout(() => {
          setLcaValue(lca);
          setMessage(`Lowest Common Ancestor of ${p} and ${q} is ${lca}`);
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
    setNodeA("");
    setNodeB("");
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

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Pick two nodes and watch their paths converge at the Lowest Common Ancestor
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

          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="number"
              value={nodeA}
              onChange={(e) => setNodeA(e.target.value)}
              placeholder="Node A"
              disabled={busy || !root}
              className="w-28 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <input
              type="number"
              value={nodeB}
              onChange={(e) => setNodeB(e.target.value)}
              placeholder="Node B"
              disabled={busy || !root}
              className="w-28 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <button
              onClick={handleFindLca}
              disabled={busy || !root}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40"
            >
              <GitBranch size={15} />
              Find LCA
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
                  <linearGradient id="lca-internal-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="lca-leaf-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="lca-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.3" />
                  </filter>
                </defs>

                {edges.map((edge, i) => {
                  const midY = (edge.y1 + edge.y2) / 2;
                  const isDimmed = dimmedValues.includes(edge.childValue);
                  return (
                    <path
                      key={i}
                      d={`M ${edge.x1} ${edge.y1} C ${edge.x1} ${midY}, ${edge.x2} ${midY}, ${edge.x2} ${edge.y2}`}
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity={isDimmed ? 0.15 : 1}
                      className="dark:stroke-indigo-500/70 transition-opacity duration-500"
                    />
                  );
                })}

                {nodes.map((node, i) => {
                  const isOnPath = highlightPath.includes(node.value);
                  const isLca = node.value === lcaValue;
                  const isTarget = targets.includes(node.value) && !isLca;
                  const isDimmed = dimmedValues.includes(node.value) && !isOnPath && !isLca;
                  return (
                    <g key={i} ref={animateDropIn}>
                      <g opacity={isDimmed ? 0.2 : 1} style={{ transition: "opacity 0.5s ease" }}>
                        {node.isRoot && (
                          <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 6} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
                        )}
                        {isOnPath && !isLca && (
                          <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 4} fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.9" />
                        )}
                        {isTarget && (
                          <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 4} fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.9" />
                        )}
                        {isLca && (
                          <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 5} fill="none" stroke="#10b981" strokeWidth="3" />
                        )}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={NODE_RADIUS}
                          fill={node.isLeaf ? "url(#lca-leaf-grad)" : "url(#lca-internal-grad)"}
                          stroke={node.isLeaf ? "#059669" : "#1d4ed8"}
                          strokeWidth="1.5"
                          filter="url(#lca-node-shadow)"
                        />
                        <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
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
                    </g>
                  );
                })}
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
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Descent path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-violet-500 inline-block"></span>
              Node A / Node B
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-emerald-500 inline-block"></span>
              Lowest Common Ancestor
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 opacity-20 inline-block"></span>
              Eliminated subtree
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LcaVisualizer;
