"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, Play, Shuffle, RotateCcw } from "lucide-react";

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

// Runs the real Morris algorithm on a cloned tree (mutating .right pointers as
// threads, exactly like the real algorithm) purely to record a frame per step.
// Rendering uses node positions from the original, unmutated tree.
const generateMorrisFrames = (originalRoot) => {
  const frames = [];
  if (!originalRoot) return frames;

  const root = structuredClone(originalRoot);
  const visited = [];
  const activeThreads = [];
  let curr = root;

  frames.push({
    currValue: curr.value,
    predecessorValue: null,
    threads: [],
    visitedSoFar: [],
    message: `Start at root ${curr.value}`,
  });

  while (curr) {
    if (!curr.left) {
      visited.push(curr.value);
      frames.push({
        currValue: curr.value,
        predecessorValue: null,
        threads: [...activeThreads],
        visitedSoFar: [...visited],
        message: `${curr.value} has no left child, so visit it directly, then move right`,
      });
      curr = curr.right;
    } else {
      let pred = curr.left;
      while (pred.right && pred.right !== curr) pred = pred.right;

      if (!pred.right) {
        pred.right = curr;
        activeThreads.push({ from: pred.value, to: curr.value });
        frames.push({
          currValue: curr.value,
          predecessorValue: pred.value,
          threads: [...activeThreads],
          visitedSoFar: [...visited],
          message: `Found in-order predecessor ${pred.value} of ${curr.value}: thread it back to ${curr.value}, then descend left`,
        });
        curr = curr.left;
      } else {
        pred.right = null;
        activeThreads.splice(
          activeThreads.findIndex((t) => t.from === pred.value && t.to === curr.value),
          1
        );
        visited.push(curr.value);
        frames.push({
          currValue: curr.value,
          predecessorValue: pred.value,
          threads: [...activeThreads],
          visitedSoFar: [...visited],
          message: `Back at ${curr.value} via the thread from ${pred.value}: remove the thread, visit ${curr.value}, then move right`,
        });
        curr = curr.right;
      }
    }
  }

  frames.push({
    currValue: null,
    predecessorValue: null,
    threads: [],
    visitedSoFar: [...visited],
    message: `Morris traversal complete: [${visited.join(", ")}], tree structure fully restored, no threads remain`,
  });

  return frames;
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

const STEP_DELAY = 1000;

const MorrisVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("Tree is empty");
  const [visitedOrder, setVisitedOrder] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);
  const [predecessorValue, setPredecessorValue] = useState(null);
  const [threads, setThreads] = useState([]);
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
    if (busy) return;
    setRoot((prev) => insertNode(prev ? structuredClone(prev) : null, value));
    setMessage(`Inserted ${value}`);
    setInputValue("");
    setVisitedOrder([]);
    setCurrentValue(null);
    setPredecessorValue(null);
    setThreads([]);
  };

  const generateRandomTree = () => {
    if (busy) return;
    const size = Math.floor(Math.random() * 6) + 5;
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    let newRoot = null;
    values.forEach((v) => {
      newRoot = insertNode(newRoot, v);
    });
    setRoot(newRoot);
    setMessage(`Generated a tree with ${size} random inserts`);
    setVisitedOrder([]);
    setCurrentValue(null);
    setPredecessorValue(null);
    setThreads([]);
  };

  const reset = () => {
    if (busy) return;
    setRoot(null);
    setInputValue("");
    setMessage("Tree is empty");
    setVisitedOrder([]);
    setCurrentValue(null);
    setPredecessorValue(null);
    setThreads([]);
  };

  const handleTraverse = () => {
    if (!root || busy) return;
    const frames = generateMorrisFrames(root);
    setBusy(true);
    setVisitedOrder([]);
    setCurrentValue(null);
    setPredecessorValue(null);
    setThreads([]);

    let i = 0;
    const revealStep = () => {
      const frame = frames[i];
      setCurrentValue(frame.currValue);
      setPredecessorValue(frame.predecessorValue);
      setThreads(frame.threads);
      setVisitedOrder(frame.visitedSoFar);
      setMessage(frame.message);
      i++;

      if (i < frames.length) {
        setTimeout(revealStep, STEP_DELAY);
      } else {
        setTimeout(() => setBusy(false), STEP_DELAY);
      }
    };
    revealStep();
  };

  const { nodes, edges } = root ? layoutTree(root) : { nodes: [], edges: [] };
  const posByValue = Object.fromEntries(nodes.map((n) => [n.value, n]));

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
        Watch Morris traversal thread temporary links instead of using a stack
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
              onClick={handleTraverse}
              disabled={busy || !root}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-40"
            >
              <Play size={15} />
              Traverse
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
                  <linearGradient id="mo-internal-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="mo-visited-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="mo-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.3" />
                  </filter>
                  <marker id="mo-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                    <path d="M0,0 L7,3.5 L0,7 Z" fill="#8b5cf6" />
                  </marker>
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

                {/* temporary Morris threads */}
                {threads.map((t, i) => {
                  const from = posByValue[t.from];
                  const to = posByValue[t.to];
                  if (!from || !to) return null;
                  const midX = (from.x + to.x) / 2 + 46;
                  const midY = (from.y + to.y) / 2;
                  return (
                    <path
                      key={`thread-${i}`}
                      d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                      opacity="0.85"
                      markerEnd="url(#mo-arrow)"
                    />
                  );
                })}

                {nodes.map((node, i) => {
                  const isVisited = visitedOrder.includes(node.value);
                  const isCurrent = node.value === currentValue;
                  const isPredecessor = node.value === predecessorValue;
                  const orderIndex = visitedOrder.indexOf(node.value);
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
                      {isCurrent && (
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
                      {isPredecessor && !isCurrent && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={NODE_RADIUS + 4}
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          opacity="0.8"
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={NODE_RADIUS}
                        fill={isVisited ? "url(#mo-visited-grad)" : "url(#mo-internal-grad)"}
                        stroke={isVisited ? "#059669" : "#1d4ed8"}
                        strokeWidth="1.5"
                        filter="url(#mo-node-shadow)"
                        opacity={!isVisited && visitedOrder.length > 0 ? "0.5" : "1"}
                        className="transition-opacity duration-500"
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

                      {isVisited && (
                        <>
                          <rect
                            x={node.x - 11}
                            y={node.y - NODE_RADIUS - 20}
                            width="22"
                            height="14"
                            rx="7"
                            className="fill-amber-50 dark:fill-amber-900/40 stroke-amber-300 dark:stroke-amber-700"
                            strokeWidth="1"
                          />
                          <text
                            x={node.x}
                            y={node.y - NODE_RADIUS - 10}
                            textAnchor="middle"
                            fontSize="9"
                            fontWeight="700"
                            className="fill-amber-700 dark:fill-amber-300"
                          >
                            #{orderIndex + 1}
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

          {visitedOrder.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {visitedOrder.map((v, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold"
                >
                  {v}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Not yet visited
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Visited
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Current pointer
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-violet-500 inline-block"></span>
              Predecessor
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="18" height="8"><line x1="0" y1="4" x2="18" y2="4" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 3" /></svg>
              Temporary thread
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MorrisVisualizer;
