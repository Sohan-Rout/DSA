"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Hammer, Shuffle, RotateCcw } from "lucide-react";

const PALETTE = ["#10b981", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

const parseDataset = (input) => {
  return input
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .map((entry) => {
      const [value, label] = entry.split(":").map((s) => s.trim());
      return { value: Number(value), label };
    })
    .filter((p) => !Number.isNaN(p.value) && p.label);
};

// Gini impurity: 0 when a set is pure (all one class), higher when classes are mixed.
const gini = (labels) => {
  const counts = {};
  labels.forEach((l) => (counts[l] = (counts[l] || 0) + 1));
  const n = labels.length;
  let impurity = 1;
  Object.values(counts).forEach((c) => {
    const p = c / n;
    impurity -= p * p;
  });
  return impurity;
};

const majorityLabel = (labels) => {
  const counts = {};
  labels.forEach((l) => (counts[l] = (counts[l] || 0) + 1));
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
};

// Tries every midpoint between consecutive distinct values as a candidate
// threshold, keeping whichever split minimizes the weighted Gini impurity
// of the two resulting groups.
const bestSplit = (data) => {
  const uniqueValues = [...new Set(data.map((d) => d.value))].sort((a, b) => a - b);
  let best = null;

  for (let i = 0; i < uniqueValues.length - 1; i++) {
    const threshold = (uniqueValues[i] + uniqueValues[i + 1]) / 2;
    const left = data.filter((d) => d.value <= threshold);
    const right = data.filter((d) => d.value > threshold);
    if (left.length === 0 || right.length === 0) continue;

    const weighted = (left.length / data.length) * gini(left.map((d) => d.label)) + (right.length / data.length) * gini(right.map((d) => d.label));

    if (!best || weighted < best.weighted) {
      best = { threshold, weighted, left, right };
    }
  }
  return best;
};

// Recursively splits the data on whichever threshold most reduces impurity,
// stopping when a node is pure or the depth limit is reached.
const buildTree = (data, depth, maxDepth, steps, idRef) => {
  const id = idRef.current++;
  const labels = data.map((d) => d.label);
  const impurity = gini(labels);
  const uniqueLabels = new Set(labels);

  if (uniqueLabels.size === 1 || depth >= maxDepth || data.length < 2) {
    const node = { id, isLeaf: true, prediction: majorityLabel(labels), count: data.length, impurity };
    steps.push({ type: "leaf", nodeId: id, node });
    return node;
  }

  const split = bestSplit(data);
  if (!split) {
    const node = { id, isLeaf: true, prediction: majorityLabel(labels), count: data.length, impurity };
    steps.push({ type: "leaf", nodeId: id, node });
    return node;
  }

  steps.push({ type: "split", nodeId: id, threshold: split.threshold, impurity, weighted: split.weighted, count: data.length });

  const left = buildTree(split.left, depth + 1, maxDepth, steps, idRef);
  const right = buildTree(split.right, depth + 1, maxDepth, steps, idRef);

  return { id, isLeaf: false, threshold: split.threshold, left, right, count: data.length, impurity };
};

const NODE_RADIUS = 22;
const LEVEL_HEIGHT = 90;

const layoutTree = (node, depth = 0, x = 260, y = 32, nodes = [], edges = []) => {
  if (!node) return { nodes, edges };
  nodes.push({ id: node.id, isLeaf: node.isLeaf, prediction: node.prediction, count: node.count, threshold: node.threshold, x, y, depth, isRoot: depth === 0 });

  const xOffset = Math.max(40, 180 / (depth + 1));

  if (!node.isLeaf) {
    const leftX = x - xOffset;
    const leftY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: leftX, y2: leftY - NODE_RADIUS + 2, parentId: node.id, childId: node.left.id, branch: `≤ ${node.threshold}` });
    layoutTree(node.left, depth + 1, leftX, leftY, nodes, edges);

    const rightX = x + xOffset;
    const rightY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: rightX, y2: rightY - NODE_RADIUS + 2, parentId: node.id, childId: node.right.id, branch: `> ${node.threshold}` });
    layoutTree(node.right, depth + 1, rightX, rightY, nodes, edges);
  }

  return { nodes, edges };
};

const getSvgDimensions = (nodes) => {
  if (nodes.length === 0) return { width: 600, height: 220 };
  const xValues = nodes.map((n) => n.x);
  const yValues = nodes.map((n) => n.y);
  const padding = 50;
  return {
    width: Math.max(600, Math.max(...xValues) - Math.min(...xValues) + padding * 2),
    height: Math.max(220, Math.max(...yValues) + padding * 2),
  };
};

const STEP_DELAY = 650;

const EXAMPLE = "45:No,50:No,55:No,60:No,65:Yes,70:Yes,72:Yes,75:Yes,78:Yes,80:Yes,85:No,90:No";

const DecisionTreeVisualizer = () => {
  const [datasetInput, setDatasetInput] = useState("");
  const [points, setPoints] = useState([]);
  const [classColors, setClassColors] = useState({});
  const [root, setRoot] = useState(null);
  const [revealed, setRevealed] = useState(new Set());
  const [thresholds, setThresholds] = useState([]);
  const [message, setMessage] = useState("Enter a dataset and build a decision tree");
  const [busy, setBusy] = useState(false);

  const clearResult = () => {
    setRoot(null);
    setRevealed(new Set());
    setThresholds([]);
  };

  const loadExample = () => {
    if (busy) return;
    setDatasetInput(EXAMPLE);
    setPoints([]);
    setClassColors({});
    clearResult();
    setMessage("Loaded an example: predict whether it's nice enough to play outside, by temperature");
  };

  const reset = () => {
    if (busy) return;
    setDatasetInput("");
    setPoints([]);
    setClassColors({});
    clearResult();
    setMessage("Enter a dataset and build a decision tree");
  };

  const handleBuild = () => {
    if (busy || !datasetInput.trim()) return;
    const parsed = parseDataset(datasetInput);
    if (parsed.length < 2) {
      setMessage("Enter at least two points as value:label, comma-separated");
      return;
    }

    const labels = [...new Set(parsed.map((p) => p.label))];
    const colorMap = {};
    labels.forEach((l, i) => (colorMap[l] = PALETTE[i % PALETTE.length]));

    const steps = [];
    const idRef = { current: 0 };
    const finalRoot = buildTree(parsed, 0, 4, steps, idRef);

    setBusy(true);
    setPoints(parsed);
    setClassColors(colorMap);
    setRoot(finalRoot);
    setRevealed(new Set());
    setThresholds([]);

    let i = 0;
    const reveal = () => {
      const step = steps[i];
      setRevealed((prev) => new Set(prev).add(step.nodeId));
      if (step.type === "split") {
        setThresholds((prev) => [...prev, step.threshold]);
        setMessage(`Split on value ≤ ${step.threshold}, impurity ${step.impurity.toFixed(2)} → weighted ${step.weighted.toFixed(2)} after the split`);
      } else {
        setMessage(`Leaf: predict "${step.node.prediction}" (${step.node.count} sample${step.node.count === 1 ? "" : "s"}, impurity ${step.node.impurity.toFixed(2)})`);
      }
      i++;
      if (i < steps.length) {
        setTimeout(reveal, STEP_DELAY);
      } else {
        setTimeout(() => {
          setMessage("Decision tree complete");
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    reveal();
  };

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  const { nodes, edges } = root ? layoutTree(root) : { nodes: [], edges: [] };
  const dims = getSvgDimensions(nodes);
  const isVisible = (id) => revealed.has(id);

  const minV = points.length > 0 ? Math.min(...points.map((p) => p.value)) : 0;
  const maxV = points.length > 0 ? Math.max(...points.map((p) => p.value)) : 1;
  const scaleX = (v) => 20 + ((v - minV) / (maxV - minV || 1)) * 560;

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Watch a decision tree greedily split a dataset to separate its classes
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4 space-y-3">
          <input
            type="text"
            value={datasetInput}
            onChange={(e) => setDatasetInput(e.target.value)}
            placeholder="value:label pairs, e.g. 45:No,70:Yes,90:No"
            disabled={busy}
            className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
          />

          <div className="flex gap-2">
            <button
              onClick={handleBuild}
              disabled={busy || !datasetInput.trim()}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40"
            >
              <Hammer size={15} />
              Build Decision Tree
            </button>
            <button
              onClick={loadExample}
              disabled={busy}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-900 transition disabled:opacity-40"
            >
              <Shuffle size={15} />
              Load Example
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
        <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-center text-sm">
          {message}
        </div>

        {/* Dataset number line */}
        {points.length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
            <h2 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Dataset</h2>
            <div className="overflow-x-auto">
              <svg width="600" height="90" viewBox="0 0 600 90" className="mx-auto min-w-[600px]">
                <line x1="20" y1="50" x2="580" y2="50" stroke="currentColor" strokeWidth="1" className="text-gray-300 dark:text-gray-700" />
                {thresholds.map((t, i) => (
                  <g key={i}>
                    <line x1={scaleX(t)} y1="25" x2={scaleX(t)} y2="75" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x={scaleX(t)} y="18" textAnchor="middle" fontSize="9" className="fill-indigo-500 dark:fill-indigo-400">
                      {t}
                    </text>
                  </g>
                ))}
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={scaleX(p.value)} cy="50" r="7" fill={classColors[p.label]} stroke="white" strokeWidth="1.5" />
                    <text x={scaleX(p.value)} y="70" textAnchor="middle" fontSize="8" className="fill-gray-500 dark:fill-gray-400">
                      {p.value}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              {Object.entries(classColors).map(([label, color]) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: color }}></span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tree */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Decision Tree</h2>
          <div className="min-h-60 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {nodes.length > 0 ? (
              <svg width={dims.width} height={dims.height} viewBox={`0 0 ${dims.width} ${dims.height}`} className="mx-auto">
                <defs>
                  <linearGradient id="dt-internal-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <filter id="dt-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.3" />
                  </filter>
                </defs>

                {edges.map((edge, i) => {
                  if (!isVisible(edge.parentId) || !isVisible(edge.childId)) return null;
                  const midY = (edge.y1 + edge.y2) / 2;
                  const midX = (edge.x1 + edge.x2) / 2;
                  return (
                    <g key={i}>
                      <path
                        d={`M ${edge.x1} ${edge.y1} C ${edge.x1} ${midY}, ${edge.x2} ${midY}, ${edge.x2} ${edge.y2}`}
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="dark:stroke-indigo-500/70"
                      />
                      <text x={midX} y={midY} textAnchor="middle" fontSize="10" fontWeight="600" className="fill-indigo-600 dark:fill-indigo-400">
                        {edge.branch}
                      </text>
                    </g>
                  );
                })}

                {nodes.map((node, i) => {
                  if (!isVisible(node.id)) return null;
                  return (
                    <g key={i} ref={animateDropIn}>
                      {node.isRoot && (
                        <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 6} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={NODE_RADIUS}
                        fill={node.isLeaf ? classColors[node.prediction] : "url(#dt-internal-grad)"}
                        stroke={node.isLeaf ? "#ffffff" : "#1d4ed8"}
                        strokeWidth="1.5"
                        filter="url(#dt-node-shadow)"
                      />
                      <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
                        {node.isLeaf ? node.prediction : "?"}
                      </text>
                      <text x={node.x} y={node.y + NODE_RADIUS + 14} textAnchor="middle" fontSize="9" className="fill-gray-600 dark:fill-gray-300">
                        {node.isLeaf ? `n=${node.count}` : `n=${node.count}`}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-16">
                Build a tree to see it appear here
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Decision node (?)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-amber-500 inline-block"></span>
              Root
            </span>
            <span className="flex items-center gap-1.5">
              Leaf color = predicted class
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DecisionTreeVisualizer;
