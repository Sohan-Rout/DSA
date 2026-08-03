"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Shuffle, RefreshCw, Search } from "lucide-react";

const N = 8;

const randomArray = () => Array.from({ length: N }, () => Math.floor(Math.random() * 20) + 1);

const buildTree = (l, r, arr) => {
  const node = { l, r, value: 0, left: null, right: null };
  if (l === r) {
    node.value = arr[l];
    return node;
  }
  const mid = Math.floor((l + r) / 2);
  node.left = buildTree(l, mid, arr);
  node.right = buildTree(mid + 1, r, arr);
  node.value = node.left.value + node.right.value;
  return node;
};

const updateTree = (node, index, newValue, path) => {
  path.push(`${node.l}:${node.r}`);
  if (node.l === node.r) {
    node.value = newValue;
    return;
  }
  const mid = Math.floor((node.l + node.r) / 2);
  if (index <= mid) updateTree(node.left, index, newValue, path);
  else updateTree(node.right, index, newValue, path);
  node.value = node.left.value + node.right.value;
};

const queryTree = (node, ql, qr, touched) => {
  const key = `${node.l}:${node.r}`;
  if (qr < node.l || node.r < ql) {
    touched.push({ key, type: "skip" });
    return 0;
  }
  if (ql <= node.l && node.r <= qr) {
    touched.push({ key, type: "include" });
    return node.value;
  }
  touched.push({ key, type: "partial" });
  const leftSum = queryTree(node.left, ql, qr, touched);
  const rightSum = queryTree(node.right, ql, qr, touched);
  return leftSum + rightSum;
};

const NODE_RADIUS = 22;
const LEVEL_HEIGHT = 78;

const layoutTree = (node, depth = 0, x = 320, y = 40, nodes = [], edges = []) => {
  if (!node) return { nodes, edges };
  const isLeaf = node.l === node.r;
  const xOffset = Math.max(24, 130 / (depth + 1));

  nodes.push({ node, key: `${node.l}:${node.r}`, x, y, depth, isLeaf, isRoot: depth === 0 });

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

const STEP_DELAY = 500;

const SegmentTreeVisualizer = () => {
  const [arr, setArr] = useState(null);
  const [root, setRoot] = useState(null);
  const [message, setMessage] = useState("No segment tree yet — build one over a random array");
  const [updateIndex, setUpdateIndex] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [queryL, setQueryL] = useState("");
  const [queryR, setQueryR] = useState("");
  const [highlightPath, setHighlightPath] = useState([]);
  const [queryHighlights, setQueryHighlights] = useState({});
  const [queryRange, setQueryRange] = useState(null);
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

  const buildRandom = () => {
    if (busy) return;
    const newArr = randomArray();
    setArr(newArr);
    setRoot(buildTree(0, N - 1, newArr));
    setMessage(`Built a segment tree over [${newArr.join(", ")}]`);
    setHighlightPath([]);
    setQueryHighlights({});
    setQueryRange(null);
  };

  const handleUpdate = () => {
    if (busy || !root) return;
    const index = parseInt(updateIndex, 10);
    const value = parseInt(updateValue, 10);
    if (Number.isNaN(index) || index < 0 || index >= N) {
      setMessage(`Enter an index between 0 and ${N - 1}`);
      return;
    }
    if (Number.isNaN(value)) {
      setMessage("Enter a valid new value");
      return;
    }
    setBusy(true);
    setQueryHighlights({});
    setQueryRange(null);

    const clonedRoot = structuredClone(root);
    const path = [];
    updateTree(clonedRoot, index, value, path);
    const newArr = [...arr];
    newArr[index] = value;

    let i = 0;
    const revealStep = () => {
      setHighlightPath(path.slice(0, i + 1));
      setMessage(`Updating index ${index} to ${value} — recomputing range [${path[i]}]`);
      i++;
      if (i < path.length) {
        setTimeout(revealStep, STEP_DELAY);
      } else {
        setTimeout(() => {
          setRoot(clonedRoot);
          setArr(newArr);
          setMessage(`Index ${index} updated to ${value} — sums recomputed along the path to the root`);
          setTimeout(() => setHighlightPath([]), 900);
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    revealStep();
  };

  const handleQuery = () => {
    if (busy || !root) return;
    const ql = parseInt(queryL, 10);
    const qr = parseInt(queryR, 10);
    if (Number.isNaN(ql) || Number.isNaN(qr) || ql < 0 || qr >= N || ql > qr) {
      setMessage(`Enter a valid range with 0 <= l <= r <= ${N - 1}`);
      return;
    }
    setBusy(true);
    setHighlightPath([]);
    setQueryHighlights({});
    setQueryRange([ql, qr]);

    const touched = [];
    const sum = queryTree(root, ql, qr, touched);

    let i = 0;
    const revealStep = () => {
      const step = touched[i];
      setQueryHighlights((prev) => ({ ...prev, [step.key]: step.type }));
      const verb = step.type === "include" ? "fully inside range — add its sum" : step.type === "skip" ? "fully outside range — skip it" : "partially overlaps — decompose into children";
      setMessage(`Visiting [${step.key.replace(":", ", ")}] — ${verb}`);
      i++;
      if (i < touched.length) {
        setTimeout(revealStep, STEP_DELAY);
      } else {
        setTimeout(() => {
          setMessage(`Sum of range [${ql}, ${qr}] = ${sum}`);
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    revealStep();
  };

  const reset = () => {
    if (busy) return;
    setArr(null);
    setRoot(null);
    setMessage("No segment tree yet — build one over a random array");
    setUpdateIndex("");
    setUpdateValue("");
    setQueryL("");
    setQueryR("");
    setHighlightPath([]);
    setQueryHighlights({});
    setQueryRange(null);
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
        Build a segment tree over an array, then update a value or query a range
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4 space-y-3">
          <button
            onClick={buildRandom}
            disabled={busy}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40"
          >
            <Shuffle size={15} />
            Build Random Array
          </button>

          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="number"
              value={updateIndex}
              onChange={(e) => setUpdateIndex(e.target.value)}
              placeholder={`index (0-${N - 1})`}
              disabled={busy || !root}
              className="w-28 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <input
              type="number"
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              placeholder="new value"
              disabled={busy || !root}
              className="w-28 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <button
              onClick={handleUpdate}
              disabled={busy || !root}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition disabled:opacity-40"
            >
              <RefreshCw size={15} />
              Update
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="number"
              value={queryL}
              onChange={(e) => setQueryL(e.target.value)}
              placeholder="from l"
              disabled={busy || !root}
              className="w-24 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <input
              type="number"
              value={queryR}
              onChange={(e) => setQueryR(e.target.value)}
              placeholder="to r"
              disabled={busy || !root}
              className="w-24 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <button
              onClick={handleQuery}
              disabled={busy || !root}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-40"
            >
              <Search size={15} />
              Range Sum Query
            </button>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-center text-sm">
            {message}
          </div>

          {arr && (
            <div className="flex justify-center gap-1.5 mb-4 flex-wrap">
              {arr.map((v, i) => {
                const inQueryRange = queryRange && i >= queryRange[0] && i <= queryRange[1];
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold border-2 transition-colors ${
                        inQueryRange
                          ? "bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300"
                          : "bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {v}
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{i}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="min-h-60 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {nodes.length > 0 ? (
              <svg
                width={dims.width}
                height={dims.height}
                viewBox={`0 0 ${dims.width} ${dims.height}`}
                className="mx-auto"
              >
                <defs>
                  <linearGradient id="st-internal-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="st-leaf-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="st-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
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

                {nodes.map((item, i) => {
                  const isOnUpdatePath = highlightPath.includes(item.key);
                  const queryType = queryHighlights[item.key];
                  const isSkipped = queryType === "skip";
                  return (
                    <g key={i} ref={animateDropIn}>
                      {item.isRoot && (
                        <circle
                          cx={item.x}
                          cy={item.y}
                          r={NODE_RADIUS + 6}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          strokeDasharray="3 4"
                          opacity="0.7"
                        />
                      )}
                      {isOnUpdatePath && (
                        <circle cx={item.x} cy={item.y} r={NODE_RADIUS + 4} fill="none" stroke="#8b5cf6" strokeWidth="2.5" opacity="0.9" />
                      )}
                      {queryType === "include" && (
                        <circle cx={item.x} cy={item.y} r={NODE_RADIUS + 4} fill="none" stroke="#10b981" strokeWidth="2.5" opacity="0.9" />
                      )}
                      {queryType === "partial" && (
                        <circle cx={item.x} cy={item.y} r={NODE_RADIUS + 4} fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.85" />
                      )}
                      {queryType === "skip" && (
                        <circle cx={item.x} cy={item.y} r={NODE_RADIUS + 4} fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.7" />
                      )}
                      <circle
                        cx={item.x}
                        cy={item.y}
                        r={NODE_RADIUS}
                        fill={item.isLeaf ? "url(#st-leaf-grad)" : "url(#st-internal-grad)"}
                        stroke={item.isLeaf ? "#059669" : "#1d4ed8"}
                        strokeWidth="1.5"
                        filter="url(#st-node-shadow)"
                        opacity={isSkipped ? "0.35" : "1"}
                        className="transition-opacity duration-500"
                      />
                      <text
                        x={item.x}
                        y={item.y + 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="13"
                        fontWeight="700"
                        opacity={isSkipped ? "0.6" : "1"}
                      >
                        {item.node.value}
                      </text>

                      <rect
                        x={item.x - 18}
                        y={item.y - NODE_RADIUS - 20}
                        width="36"
                        height="14"
                        rx="7"
                        className="fill-gray-100 dark:fill-neutral-800 stroke-gray-300 dark:stroke-gray-700"
                        strokeWidth="1"
                      />
                      <text
                        x={item.x}
                        y={item.y - NODE_RADIUS - 10}
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="600"
                        className="fill-gray-600 dark:fill-gray-300"
                      >
                        [{item.node.l},{item.node.r}]
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-16">
                No tree yet — build one over a random array
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Leaf (array element)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Internal (range sum)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-violet-500 inline-block"></span>
              Update path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-emerald-500 inline-block"></span>
              Query: fully inside range
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-gray-400 inline-block"></span>
              Query: partially overlaps
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-red-500 inline-block"></span>
              Query: outside range
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SegmentTreeVisualizer;
