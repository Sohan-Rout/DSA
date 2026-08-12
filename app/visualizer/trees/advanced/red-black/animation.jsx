"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, Shuffle, RotateCcw } from "lucide-react";

const makeNode = (value) => ({
  value,
  color: "RED",
  left: null,
  right: null,
  parent: null,
});

const isRed = (node) => node !== null && node.color === "RED";

const rotateLeftRB = (root, x) => {
  const y = x.right;
  x.right = y.left;
  if (y.left) y.left.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;
  y.left = x;
  x.parent = y;
  return root;
};

const rotateRightRB = (root, x) => {
  const y = x.left;
  x.left = y.right;
  if (y.right) y.right.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.right) x.parent.right = y;
  else x.parent.left = y;
  y.right = x;
  x.parent = y;
  return root;
};

const fixInsertRB = (root, z, events) => {
  while (z.parent && z.parent.color === "RED") {
    const parent = z.parent;
    const grandparent = parent.parent;
    if (!grandparent) break;

    if (parent === grandparent.left) {
      const uncle = grandparent.right;
      if (isRed(uncle)) {
        parent.color = "BLACK";
        uncle.color = "BLACK";
        grandparent.color = "RED";
        events.push({
          text: `uncle ${uncle.value} is red, so recolor ${parent.value} and ${uncle.value} to black, ${grandparent.value} to red`,
          touched: [parent.value, uncle.value, grandparent.value],
        });
        z = grandparent;
      } else {
        if (z === parent.right) {
          z = parent;
          root = rotateLeftRB(root, z);
          events.push({ text: `zig-zag shape, rotate left at ${z.value}`, touched: [z.value] });
        }
        z.parent.color = "BLACK";
        grandparent.color = "RED";
        events.push({
          text: `rotate right at ${grandparent.value} to fix the red-red violation`,
          touched: [grandparent.value, z.parent.value],
        });
        root = rotateRightRB(root, grandparent);
      }
    } else {
      const uncle = grandparent.left;
      if (isRed(uncle)) {
        parent.color = "BLACK";
        uncle.color = "BLACK";
        grandparent.color = "RED";
        events.push({
          text: `uncle ${uncle.value} is red, so recolor ${parent.value} and ${uncle.value} to black, ${grandparent.value} to red`,
          touched: [parent.value, uncle.value, grandparent.value],
        });
        z = grandparent;
      } else {
        if (z === parent.left) {
          z = parent;
          root = rotateRightRB(root, z);
          events.push({ text: `zig-zag shape, rotate right at ${z.value}`, touched: [z.value] });
        }
        z.parent.color = "BLACK";
        grandparent.color = "RED";
        events.push({
          text: `rotate left at ${grandparent.value} to fix the red-red violation`,
          touched: [grandparent.value, z.parent.value],
        });
        root = rotateLeftRB(root, grandparent);
      }
    }
  }
  root.color = "BLACK";
  return root;
};

const insertRB = (root, value, events) => {
  const node = makeNode(value);
  let y = null;
  let x = root;
  while (x) {
    y = x;
    if (value < x.value) x = x.left;
    else if (value > x.value) x = x.right;
    else return root; // duplicate, ignore
  }
  node.parent = y;
  if (!y) root = node;
  else if (value < y.value) y.left = node;
  else y.right = node;

  return fixInsertRB(root, node, events);
};

const NODE_RADIUS = 22;
const LEVEL_HEIGHT = 78;

const layoutTree = (node, depth = 0, x = 320, y = 40, nodes = [], edges = []) => {
  if (!node) return { nodes, edges };
  const xOffset = Math.max(24, 110 / (depth + 1));

  nodes.push({ value: node.value, color: node.color, x, y, depth, isRoot: depth === 0 });

  if (node.left) {
    const leftX = x - xOffset;
    const leftY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: leftX, y2: leftY - NODE_RADIUS + 2 });
    layoutTree(node.left, depth + 1, leftX, leftY, nodes, edges);
  }
  if (node.right) {
    const rightX = x + xOffset;
    const rightY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: rightX, y2: rightY - NODE_RADIUS + 2 });
    layoutTree(node.right, depth + 1, rightX, rightY, nodes, edges);
  }

  return { nodes, edges };
};

const RedBlackVisualizer = () => {
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
    setBusy(true);

    const events = [];
    const wasEmpty = !root;
    const newRoot = insertRB(root ? structuredClone(root) : null, value, events);

    setTimeout(() => {
      setRoot(newRoot);
      if (wasEmpty) {
        setMessage(`Inserted ${value} as the root, colored black`);
        setHighlightNodes([]);
      } else if (events.length === 0) {
        setMessage(`Inserted ${value} as a red leaf; its parent was black, so no fixup was needed`);
        setHighlightNodes([]);
      } else {
        setMessage(`Inserted ${value}: ${events.map((e) => e.text).join("; then ")}`);
        const touched = events.flatMap((e) => e.touched);
        setHighlightNodes(touched);
        setTimeout(() => setHighlightNodes([]), 1400);
      }
      setInputValue("");
      setBusy(false);
    }, 350);
  };

  const generateRandomTree = () => {
    if (busy) return;
    const size = Math.floor(Math.random() * 6) + 6;
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    let newRoot = null;
    values.forEach((v) => {
      newRoot = insertRB(newRoot, v, []);
    });
    setRoot(newRoot);
    setMessage(`Generated a red-black tree with ${size} random inserts`);
    setHighlightNodes([]);
  };

  const reset = () => {
    if (busy) return;
    setRoot(null);
    setInputValue("");
    setMessage("Tree is empty");
    setHighlightNodes([]);
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
        Insert a value and watch the tree recolor and rotate to stay red-black valid
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
            {nodes.length > 0 ? (
              <svg
                width={dims.width}
                height={dims.height}
                viewBox={`0 0 ${dims.width} ${dims.height}`}
                className="mx-auto"
              >
                <defs>
                  <linearGradient id="rb-red-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                  <linearGradient id="rb-black-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <filter id="rb-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
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
                  const isTouched = highlightNodes.includes(node.value);
                  const isBlack = node.color === "BLACK";
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
                      {isTouched && (
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
                        fill={isBlack ? "url(#rb-black-grad)" : "url(#rb-red-grad)"}
                        stroke={isBlack ? "#020617" : "#b91c1c"}
                        strokeWidth="1.5"
                        filter="url(#rb-node-shadow)"
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
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              Red node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-800 inline-block"></span>
              Black node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-amber-500 inline-block"></span>
              Root
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-violet-500 inline-block"></span>
              Recolored / rotated by this insert
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RedBlackVisualizer;
