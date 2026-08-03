"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, ArrowDownToLine, ArrowUpFromLine, Shuffle, RotateCcw } from "lucide-react";

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

// Preorder traversal that records a "null" token for every empty child —
// that's what lets deserialization know exactly where each subtree ends.
const serializeWithSteps = (root) => {
  const steps = [];
  const visit = (node) => {
    if (!node) {
      steps.push({ token: "null", value: null });
      return;
    }
    steps.push({ token: String(node.value), value: node.value });
    visit(node.left);
    visit(node.right);
  };
  visit(root);
  return steps;
};

// Consumes tokens in the same preorder sequence they were written in:
// read a token, and if it isn't "null", build a node and recurse for its
// left then right child before returning control to the parent call.
const deserializeWithSteps = (tokens) => {
  const steps = [];
  let i = 0;
  const build = () => {
    const token = tokens[i++];
    if (token === undefined || token === "null") {
      steps.push({ token: "null", value: null });
      return null;
    }
    const value = Number(token);
    steps.push({ token, value });
    const node = new TreeNode(value);
    node.left = build();
    node.right = build();
    return node;
  };
  const root = build();
  return { root, steps };
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

const TreePanel = ({ title, nodes, edges, visited, ringColor, visibleSet, gradId, emptyText }) => {
  const dims = getSvgDimensions(nodes);
  const isVisible = (value) => !visibleSet || visibleSet.has(value);
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
              if (!isVisible(edge.parentValue) || !isVisible(edge.childValue)) return null;
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
              if (!isVisible(node.value)) return null;
              const isActive = visited && visited.has(node.value);
              return (
                <g key={i} ref={animateDropIn}>
                  {node.isRoot && (
                    <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 5} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
                  )}
                  {isActive && (
                    <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 4} fill="none" stroke={ringColor} strokeWidth="2.5" />
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
            {emptyText}
          </div>
        )}
      </div>
    </div>
  );
};

const STEP_DELAY = 500;

const SerializeDeserializeVisualizer = () => {
  const [sourceRoot, setSourceRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [visitedSource, setVisitedSource] = useState(new Set());
  const [serializedDisplay, setSerializedDisplay] = useState("");
  const [serializedInput, setSerializedInput] = useState("");

  const [reconstructedRoot, setReconstructedRoot] = useState(null);
  const [revealedRecon, setRevealedRecon] = useState(new Set());

  const [message, setMessage] = useState("Build a tree, then serialize it");
  const [busy, setBusy] = useState(false);

  const handleInsert = () => {
    const value = parseInt(inputValue, 10);
    if (Number.isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }
    if (busy) return;
    setSourceRoot((prev) => insertNode(prev ? structuredClone(prev) : null, value));
    setMessage(`Inserted ${value}`);
    setInputValue("");
    setVisitedSource(new Set());
    setSerializedDisplay("");
    setSerializedInput("");
    setReconstructedRoot(null);
    setRevealedRecon(new Set());
  };

  const generateRandomTree = () => {
    if (busy) return;
    const size = Math.floor(Math.random() * 5) + 6;
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    let newRoot = null;
    values.forEach((v) => {
      newRoot = insertNode(newRoot, v);
    });
    setSourceRoot(newRoot);
    setMessage(`Generated a tree with ${size} random inserts`);
    setVisitedSource(new Set());
    setSerializedDisplay("");
    setSerializedInput("");
    setReconstructedRoot(null);
    setRevealedRecon(new Set());
  };

  const reset = () => {
    if (busy) return;
    setSourceRoot(null);
    setInputValue("");
    setVisitedSource(new Set());
    setSerializedDisplay("");
    setSerializedInput("");
    setReconstructedRoot(null);
    setRevealedRecon(new Set());
    setMessage("Build a tree, then serialize it");
  };

  const handleSerialize = () => {
    if (busy || !sourceRoot) return;
    const steps = serializeWithSteps(sourceRoot);
    setBusy(true);
    setVisitedSource(new Set());
    setSerializedDisplay("");
    setReconstructedRoot(null);
    setRevealedRecon(new Set());

    let i = 0;
    const acc = [];
    const reveal = () => {
      const s = steps[i];
      acc.push(s.token);
      setSerializedDisplay(acc.join(","));
      if (s.value !== null) {
        setVisitedSource((prev) => new Set(prev).add(s.value));
        setMessage(`Visited ${s.value} — appended to the output string`);
      } else {
        setMessage("Hit an empty child — appended a null marker");
      }
      i++;
      if (i < steps.length) {
        setTimeout(reveal, STEP_DELAY);
      } else {
        setTimeout(() => {
          setSerializedInput(acc.join(","));
          setMessage("Serialization complete — this string fully encodes the tree's shape and values");
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    reveal();
  };

  const handleDeserialize = () => {
    if (busy || !serializedInput.trim()) {
      setMessage("Serialize a tree first, or type a comma-separated preorder string");
      return;
    }
    const tokens = serializedInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    const { root, steps } = deserializeWithSteps(tokens);
    if (!root) {
      setMessage("That string decodes to an empty tree");
      return;
    }

    setBusy(true);
    setReconstructedRoot(root);
    setRevealedRecon(new Set());

    let i = 0;
    const reveal = () => {
      const s = steps[i];
      if (s.value !== null) {
        setRevealedRecon((prev) => new Set(prev).add(s.value));
        setMessage(`Read token "${s.token}" — created node ${s.value}`);
      } else {
        setMessage(`Read token "null" — no node here`);
      }
      i++;
      if (i < steps.length) {
        setTimeout(reveal, STEP_DELAY);
      } else {
        setTimeout(() => {
          setMessage("Deserialization complete — the tree has been fully reconstructed from the string");
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    reveal();
  };

  const { nodes: sourceNodes, edges: sourceEdges } = sourceRoot ? layoutTree(sourceRoot) : { nodes: [], edges: [] };
  const { nodes: reconNodes, edges: reconEdges } = reconstructedRoot ? layoutTree(reconstructedRoot) : { nodes: [], edges: [] };

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Encode a tree into a string, then rebuild it back into an identical tree
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

          <div className="flex gap-2">
            <button
              onClick={handleSerialize}
              disabled={busy || !sourceRoot}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40"
            >
              <ArrowDownToLine size={15} />
              Serialize
            </button>
            <button
              onClick={handleDeserialize}
              disabled={busy || !serializedInput.trim()}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-40"
            >
              <ArrowUpFromLine size={15} />
              Deserialize
            </button>
          </div>

          <input
            type="text"
            value={serializedInput}
            onChange={(e) => setSerializedInput(e.target.value)}
            placeholder="Serialized string (e.g. 8,3,1,null,null,6,null,null,10,null,null)"
            disabled={busy}
            className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
          />
        </div>

        {/* Message */}
        <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-center text-sm">
          {message}
        </div>

        {/* Live serialized string */}
        {serializedDisplay && (
          <div className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-neutral-800 text-center text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
            {serializedDisplay}
          </div>
        )}

        {/* Trees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TreePanel
            title="Source Tree"
            nodes={sourceNodes}
            edges={sourceEdges}
            visited={visitedSource}
            ringColor="#f59e0b"
            gradId="ser-src"
            emptyText="No tree yet — insert a value or generate a random tree"
          />
          <TreePanel
            title="Reconstructed Tree"
            nodes={reconNodes}
            edges={reconEdges}
            visited={revealedRecon}
            ringColor="#10b981"
            visibleSet={revealedRecon}
            gradId="ser-recon"
            emptyText="Deserialize a string to rebuild a tree here"
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
            <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
            Visited during serialize
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-emerald-500 inline-block"></span>
            Created during deserialize
          </span>
        </div>
      </div>
    </main>
  );
};

export default SerializeDeserializeVisualizer;
