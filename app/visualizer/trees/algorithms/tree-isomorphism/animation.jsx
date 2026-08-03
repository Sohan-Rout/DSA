"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { GitCompare, RotateCcw, Shuffle } from "lucide-react";

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Parses a LeetCode-style level-order list ("1,2,3,null,4") into a binary tree.
const parseLevelOrder = (input) => {
  const tokens = input
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
  if (tokens.length === 0 || tokens[0] === "null") return null;

  const root = new TreeNode(Number(tokens[0]));
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < tokens.length) {
    const node = queue.shift();

    if (i < tokens.length) {
      const leftToken = tokens[i++];
      if (leftToken !== "null" && leftToken !== undefined) {
        node.left = new TreeNode(Number(leftToken));
        queue.push(node.left);
      }
    }
    if (i < tokens.length) {
      const rightToken = tokens[i++];
      if (rightToken !== "null" && rightToken !== undefined) {
        node.right = new TreeNode(Number(rightToken));
        queue.push(node.right);
      }
    }
  }

  return root;
};

// Two trees are isomorphic if one can be turned into the other by swapping
// left/right children at any number of nodes. At each pair, try matching the
// children straight (left-left, right-right); if that fails, try flipped
// (left-right, right-left) before declaring a mismatch.
const compareTrees = (a, b) => {
  if (!a && !b) return { match: true, pairs: [] };
  if (!a || !b) {
    return { match: false, pairs: [], mismatch: { aValue: a ? a.value : null, bValue: b ? b.value : null } };
  }
  if (a.value !== b.value) {
    return { match: false, pairs: [], mismatch: { aValue: a.value, bValue: b.value } };
  }

  const leftStraight = compareTrees(a.left, b.left);
  const rightStraight = leftStraight.match ? compareTrees(a.right, b.right) : null;
  if (leftStraight.match && rightStraight.match) {
    return {
      match: true,
      pairs: [{ aValue: a.value, bValue: b.value, flipped: false }, ...leftStraight.pairs, ...rightStraight.pairs],
    };
  }

  const leftFlipped = compareTrees(a.left, b.right);
  const rightFlipped = leftFlipped.match ? compareTrees(a.right, b.left) : null;
  if (leftFlipped.match && rightFlipped.match) {
    return {
      match: true,
      pairs: [{ aValue: a.value, bValue: b.value, flipped: true }, ...leftFlipped.pairs, ...rightFlipped.pairs],
    };
  }

  const mismatch =
    (rightStraight && !rightStraight.match && rightStraight.mismatch) ||
    (rightFlipped && !rightFlipped.match && rightFlipped.mismatch) ||
    (!leftStraight.match && leftStraight.mismatch) ||
    (leftFlipped && !leftFlipped.match && leftFlipped.mismatch) ||
    { aValue: a.value, bValue: b.value };

  return { match: false, pairs: [], mismatch };
};

const NODE_RADIUS = 18;
const LEVEL_HEIGHT = 62;

const layoutTree = (node, depth = 0, x = 150, y = 28, nodes = [], edges = []) => {
  if (!node) return { nodes, edges };
  const isLeaf = !node.left && !node.right;
  const xOffset = Math.max(20, 90 / (depth + 1));

  nodes.push({ value: node.value, x, y, depth, isLeaf, isRoot: depth === 0 });

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

const getSvgDimensions = (nodes) => {
  if (nodes.length === 0) return { width: 320, height: 180 };
  const xValues = nodes.map((n) => n.x);
  const yValues = nodes.map((n) => n.y);
  const padding = 32;
  return {
    width: Math.max(320, Math.max(...xValues) - Math.min(...xValues) + padding * 2),
    height: Math.max(180, Math.max(...yValues) + padding * 2),
  };
};

const STEP_DELAY = 550;

const EXAMPLES = {
  isomorphic: { a: "1,2,3,4,5,6,7", b: "1,3,2,7,6,4,5" },
  different: { a: "1,2,3,4,5,6,7", b: "1,3,2,7,6,4,9" },
};

const TreePanel = ({ title, nodes, edges, matched, flipped, mismatchValue, gradId }) => {
  const dims = getSvgDimensions(nodes);
  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  return (
    <div className="bg-white dark:bg-neutral-950 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="text-sm font-semibold text-center text-gray-700 dark:text-gray-300 mb-2">{title}</div>
      <div className="min-h-44 flex justify-center overflow-auto py-2 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
        {nodes.length > 0 ? (
          <svg width={dims.width} height={dims.height} viewBox={`0 0 ${dims.width} ${dims.height}`} className="mx-auto">
            <defs>
              <linearGradient id={`${gradId}-internal`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id={`${gradId}-leaf`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
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
              const isMatched = matched.has(node.value);
              const isFlipped = flipped.has(node.value);
              const isMismatch = mismatchValue === node.value;
              return (
                <g key={i} ref={animateDropIn}>
                  {node.isRoot && (
                    <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 5} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
                  )}
                  {isFlipped && (
                    <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 9} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 3" opacity="0.9" />
                  )}
                  {isMatched && (
                    <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 4} fill="none" stroke="#10b981" strokeWidth="2.5" />
                  )}
                  {isMismatch && (
                    <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 4} fill="none" stroke="#ef4444" strokeWidth="3" />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={NODE_RADIUS}
                    fill={node.isLeaf ? `url(#${gradId}-leaf)` : `url(#${gradId}-internal)`}
                    stroke={node.isLeaf ? "#059669" : "#1d4ed8"}
                    strokeWidth="1.5"
                  />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="12" fontWeight="700">
                    {node.value}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="w-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-10">
            No tree built yet
          </div>
        )}
      </div>
    </div>
  );
};

const IsomorphismVisualizer = () => {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [treeA, setTreeA] = useState(null);
  const [treeB, setTreeB] = useState(null);
  const [message, setMessage] = useState("Build two trees to compare");
  const [matchedA, setMatchedA] = useState(new Set());
  const [matchedB, setMatchedB] = useState(new Set());
  const [flippedA, setFlippedA] = useState(new Set());
  const [flippedB, setFlippedB] = useState(new Set());
  const [mismatchA, setMismatchA] = useState(null);
  const [mismatchB, setMismatchB] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [busy, setBusy] = useState(false);

  const clearResult = () => {
    setMatchedA(new Set());
    setMatchedB(new Set());
    setFlippedA(new Set());
    setFlippedB(new Set());
    setMismatchA(null);
    setMismatchB(null);
    setVerdict(null);
  };

  const handleBuild = () => {
    if (busy) return;
    if (!inputA.trim() || !inputB.trim()) {
      setMessage("Enter a level-order list for both trees");
      return;
    }
    setTreeA(parseLevelOrder(inputA));
    setTreeB(parseLevelOrder(inputB));
    clearResult();
    setMessage("Trees built — click Check Isomorphism");
  };

  const loadExample = (key) => {
    if (busy) return;
    const example = EXAMPLES[key];
    setInputA(example.a);
    setInputB(example.b);
    setTreeA(parseLevelOrder(example.a));
    setTreeB(parseLevelOrder(example.b));
    clearResult();
    setMessage(key === "isomorphic" ? "Loaded a pair that is isomorphic via child swaps" : "Loaded a pair that is not isomorphic");
  };

  const reset = () => {
    if (busy) return;
    setInputA("");
    setInputB("");
    setTreeA(null);
    setTreeB(null);
    setMessage("Build two trees to compare");
    clearResult();
  };

  const handleCheck = () => {
    if (busy || !treeA || !treeB) return;
    const result = compareTrees(treeA, treeB);
    setBusy(true);
    clearResult();

    if (result.match) {
      let i = 0;
      const reveal = () => {
        const pair = result.pairs[i];
        setMatchedA((prev) => new Set(prev).add(pair.aValue));
        setMatchedB((prev) => new Set(prev).add(pair.bValue));
        if (pair.flipped) {
          setFlippedA((prev) => new Set(prev).add(pair.aValue));
          setFlippedB((prev) => new Set(prev).add(pair.bValue));
        }
        setMessage(`Matched ${pair.aValue} ↔ ${pair.bValue}${pair.flipped ? " (children swapped)" : ""}`);
        i++;
        if (i < result.pairs.length) {
          setTimeout(reveal, STEP_DELAY);
        } else {
          setTimeout(() => {
            setVerdict("isomorphic");
            setMessage("Trees are isomorphic — one becomes the other by swapping children at some nodes");
            setBusy(false);
          }, STEP_DELAY);
        }
      };
      reveal();
    } else {
      setTimeout(() => {
        setMismatchA(result.mismatch.aValue);
        setMismatchB(result.mismatch.bValue);
        setVerdict("not-isomorphic");
        setMessage(
          `Trees are not isomorphic — mismatch at ${result.mismatch.aValue ?? "∅"} vs ${result.mismatch.bValue ?? "∅"}`
        );
        setBusy(false);
      }, STEP_DELAY);
    }
  };

  const { nodes: nodesA, edges: edgesA } = treeA ? layoutTree(treeA) : { nodes: [], edges: [] };
  const { nodes: nodesB, edges: edgesB } = treeB ? layoutTree(treeB) : { nodes: [], edges: [] };

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Check whether two trees are isomorphic — identical in structure once children can be freely swapped
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              placeholder="Tree A: 1,2,3,4,5,6,7"
              disabled={busy}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <input
              type="text"
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              placeholder="Tree B: 1,3,2,7,6,4,5"
              disabled={busy}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleBuild}
              disabled={busy}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40"
            >
              Build Trees
            </button>
            <button
              onClick={handleCheck}
              disabled={busy || !treeA || !treeB}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40"
            >
              <GitCompare size={15} />
              Check Isomorphism
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadExample("isomorphic")}
              disabled={busy}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-900 transition disabled:opacity-40"
            >
              <Shuffle size={15} />
              Isomorphic Example
            </button>
            <button
              onClick={() => loadExample("different")}
              disabled={busy}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-900 transition disabled:opacity-40"
            >
              <Shuffle size={15} />
              Non-Isomorphic Example
            </button>
            <button
              onClick={reset}
              disabled={busy}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-40"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>

        {/* Message */}
        <div
          className={`mb-4 p-3 rounded-lg text-center text-sm ${
            verdict === "isomorphic"
              ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200"
              : verdict === "not-isomorphic"
              ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200"
              : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
          }`}
        >
          {message}
        </div>

        {/* Trees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TreePanel
            title="Tree A"
            nodes={nodesA}
            edges={edgesA}
            matched={matchedA}
            flipped={flippedA}
            mismatchValue={mismatchA}
            gradId="iso-a"
          />
          <TreePanel
            title="Tree B"
            nodes={nodesB}
            edges={edgesB}
            matched={matchedB}
            flipped={flippedB}
            mismatchValue={mismatchB}
            gradId="iso-b"
          />
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
            <span className="w-3 h-3 rounded-full border-2 border-emerald-500 inline-block"></span>
            Matched pair
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-dashed border-violet-500 inline-block"></span>
            Children swapped
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-red-500 inline-block"></span>
            Mismatch
          </span>
        </div>
      </div>
    </main>
  );
};

export default IsomorphismVisualizer;
