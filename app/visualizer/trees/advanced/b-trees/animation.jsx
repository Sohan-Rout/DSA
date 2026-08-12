"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, Shuffle, RotateCcw } from "lucide-react";

const T = 2; // minimum degree: max keys per node = 2T-1 = 3, max children = 2T = 4

class BTreeNode {
  constructor(leaf) {
    this.keys = [];
    this.children = [];
    this.leaf = leaf;
  }
}

const splitChild = (parent, i, events) => {
  const fullChild = parent.children[i];
  const newChild = new BTreeNode(fullChild.leaf);

  const midKey = fullChild.keys[T - 1];
  newChild.keys = fullChild.keys.slice(T);
  const leftKeys = fullChild.keys.slice(0, T - 1);

  if (!fullChild.leaf) {
    newChild.children = fullChild.children.slice(T);
    fullChild.children = fullChild.children.slice(0, T);
  }
  fullChild.keys = leftKeys;

  parent.children.splice(i + 1, 0, newChild);
  parent.keys.splice(i, 0, midKey);

  events.push({
    text: `node [${[...leftKeys, midKey, ...newChild.keys].join(", ")}] was full, so split it, moving median ${midKey} up`,
    nodes: [fullChild, newChild, parent],
  });
};

const insertNonFull = (node, key, events) => {
  let i = node.keys.length - 1;
  if (node.leaf) {
    while (i >= 0 && key < node.keys[i]) i--;
    node.keys.splice(i + 1, 0, key);
  } else {
    while (i >= 0 && key < node.keys[i]) i--;
    i++;
    if (node.children[i].keys.length === 2 * T - 1) {
      splitChild(node, i, events);
      if (key > node.keys[i]) i++;
    }
    insertNonFull(node.children[i], key, events);
  }
};

const insertBTree = (root, key, events) => {
  if (!root) {
    const node = new BTreeNode(true);
    node.keys = [key];
    return node;
  }
  if (root.keys.length === 2 * T - 1) {
    const newRoot = new BTreeNode(false);
    newRoot.children.push(root);
    splitChild(newRoot, 0, events);
    insertNonFull(newRoot, key, events);
    return newRoot;
  }
  insertNonFull(root, key, events);
  return root;
};

const KEY_WIDTH = 36;
const NODE_HEIGHT = 34;
const LEVEL_HEIGHT = 90;
const MIN_GAP = 18;

const computeSubtreeWidth = (node) => {
  const ownWidth = node.keys.length * KEY_WIDTH;
  if (node.leaf || node.children.length === 0) {
    node._width = ownWidth;
    return node._width;
  }
  let childrenWidth = 0;
  node.children.forEach((c) => {
    childrenWidth += computeSubtreeWidth(c) + MIN_GAP;
  });
  childrenWidth -= MIN_GAP;
  node._width = Math.max(ownWidth, childrenWidth);
  return node._width;
};

const layoutBTree = (node, depth, xLeft, y, positioned = [], edges = []) => {
  if (!node) return { positioned, edges };
  const width = node._width;

  if (node.leaf || node.children.length === 0) {
    const x = xLeft + width / 2;
    positioned.push({ node, x, y, width: node.keys.length * KEY_WIDTH, depth, isRoot: depth === 0 });
    return { positioned, edges };
  }

  let childrenTotalWidth = 0;
  node.children.forEach((c) => {
    childrenTotalWidth += c._width + MIN_GAP;
  });
  childrenTotalWidth -= MIN_GAP;

  let cursor = xLeft + (width - childrenTotalWidth) / 2;
  const childCenters = [];
  node.children.forEach((c) => {
    layoutBTree(c, depth + 1, cursor, y + LEVEL_HEIGHT, positioned, edges);
    childCenters.push(cursor + c._width / 2);
    cursor += c._width + MIN_GAP;
  });

  const x = (childCenters[0] + childCenters[childCenters.length - 1]) / 2;
  positioned.push({ node, x, y, width: node.keys.length * KEY_WIDTH, depth, isRoot: depth === 0 });

  childCenters.forEach((cx) => {
    edges.push({ x1: x, y1: y + NODE_HEIGHT / 2, x2: cx, y2: y + LEVEL_HEIGHT - NODE_HEIGHT / 2 });
  });

  return { positioned, edges };
};

const BTreeVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("Tree is empty");
  const [highlightNodes, setHighlightNodes] = useState([]);
  const [busy, setBusy] = useState(false);

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(
      el,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  };

  const handleInsert = () => {
    const value = parseInt(inputValue, 10);
    if (Number.isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }
    if (busy) return;
    setBusy(true);

    const events = [];
    const newRoot = insertBTree(root ? structuredClone(root) : null, value, events);

    setTimeout(() => {
      setRoot(newRoot);
      if (events.length === 0) {
        setMessage(`Inserted ${value} into a leaf node that had room, so no split was needed`);
        setHighlightNodes([]);
      } else {
        setMessage(`Inserted ${value}: ${events.map((e) => e.text).join("; then ")}`);
        setHighlightNodes(events.flatMap((e) => e.nodes));
        setTimeout(() => setHighlightNodes([]), 1400);
      }
      setInputValue("");
      setBusy(false);
    }, 350);
  };

  const generateRandomTree = () => {
    if (busy) return;
    const size = Math.floor(Math.random() * 8) + 8;
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    let newRoot = null;
    values.forEach((v) => {
      newRoot = insertBTree(newRoot, v, []);
    });
    setRoot(newRoot);
    setMessage(`Generated a B-tree with ${size} random inserts`);
    setHighlightNodes([]);
  };

  const reset = () => {
    if (busy) return;
    setRoot(null);
    setInputValue("");
    setMessage("Tree is empty");
    setHighlightNodes([]);
  };

  let positioned = [];
  let edges = [];
  if (root) {
    computeSubtreeWidth(root);
    const layout = layoutBTree(root, 0, 0, 40);
    positioned = layout.positioned;
    edges = layout.edges;
  }

  const getSvgDimensions = () => {
    if (positioned.length === 0) return { width: 600, height: 220 };
    const xValues = positioned.map((p) => p.x - p.width / 2).concat(positioned.map((p) => p.x + p.width / 2));
    const yValues = positioned.map((p) => p.y);
    const padding = 40;
    return {
      width: Math.max(600, Math.max(...xValues) - Math.min(...xValues) + padding * 2),
      height: Math.max(220, Math.max(...yValues) + padding * 2),
    };
  };
  const dims = getSvgDimensions();
  const minX = positioned.length ? Math.min(...positioned.map((p) => p.x - p.width / 2)) - 40 : 0;

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Insert values and watch full nodes split to keep the B-tree balanced (min degree t = 2)
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
            {positioned.length > 0 ? (
              <svg
                width={dims.width}
                height={dims.height}
                viewBox={`${minX} 0 ${dims.width} ${dims.height}`}
                className="mx-auto"
              >
                <defs>
                  <linearGradient id="bt-node-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <filter id="bt-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.25" />
                  </filter>
                </defs>

                {edges.map((edge, i) => (
                  <path
                    key={i}
                    d={`M ${edge.x1} ${edge.y1} L ${edge.x2} ${edge.y2}`}
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="dark:stroke-indigo-500/70"
                  />
                ))}

                {positioned.map((item, i) => {
                  const isTouched = highlightNodes.includes(item.node);
                  const left = item.x - item.width / 2;
                  return (
                    <g key={i} ref={animateDropIn}>
                      {item.isRoot && (
                        <rect
                          x={left - 6}
                          y={item.y - NODE_HEIGHT / 2 - 6}
                          width={item.width + 12}
                          height={NODE_HEIGHT + 12}
                          rx="10"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          strokeDasharray="3 4"
                          opacity="0.7"
                        />
                      )}
                      {isTouched && (
                        <rect
                          x={left - 4}
                          y={item.y - NODE_HEIGHT / 2 - 4}
                          width={item.width + 8}
                          height={NODE_HEIGHT + 8}
                          rx="9"
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="2.5"
                          opacity="0.9"
                        />
                      )}
                      <rect
                        x={left}
                        y={item.y - NODE_HEIGHT / 2}
                        width={item.width}
                        height={NODE_HEIGHT}
                        rx="7"
                        fill="url(#bt-node-grad)"
                        stroke="#1d4ed8"
                        strokeWidth="1.5"
                        filter="url(#bt-node-shadow)"
                      />
                      {item.node.keys.slice(1).map((_, k) => (
                        <line
                          key={k}
                          x1={left + (k + 1) * KEY_WIDTH}
                          y1={item.y - NODE_HEIGHT / 2}
                          x2={left + (k + 1) * KEY_WIDTH}
                          y2={item.y + NODE_HEIGHT / 2}
                          stroke="#1d4ed8"
                          strokeWidth="1"
                          opacity="0.6"
                        />
                      ))}
                      {item.node.keys.map((key, k) => (
                        <text
                          key={k}
                          x={left + k * KEY_WIDTH + KEY_WIDTH / 2}
                          y={item.y + 5}
                          textAnchor="middle"
                          fill="white"
                          fontSize="13"
                          fontWeight="700"
                        >
                          {key}
                        </text>
                      ))}
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
              <span className="w-3 h-3 rounded bg-blue-500 inline-block"></span>
              Node (holds up to 3 sorted keys)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border-2 border-dashed border-amber-500 inline-block"></span>
              Root
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border-2 border-violet-500 inline-block"></span>
              Split by this insert
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BTreeVisualizer;
