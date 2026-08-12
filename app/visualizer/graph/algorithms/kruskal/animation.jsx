"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, Shuffle, RotateCcw, Play } from "lucide-react";

const LETTERS = "ABCDEFGHIJ".split("");
const MAX_VERTICES = 10;
const PALETTE = ["#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1"];

const layoutCircle = (vertices) => {
  const n = vertices.length;
  const radius = n <= 1 ? 0 : 130;
  const cx = 220;
  const cy = 170;
  return vertices.map((v, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    return { label: v, x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });
};

const find = (parent, v) => {
  while (parent[v] !== v) v = parent[v];
  return v;
};

// Process edges cheapest-first; a Union-Find (disjoint set) tracks which
// vertices are already connected. An edge is only added if its two
// endpoints are in different sets: accepting it would otherwise create a
// cycle, since both endpoints are already reachable from each other.
const kruskalWithSteps = (vertices, edges) => {
  const parent = {};
  vertices.forEach((v) => (parent[v] = v));
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const steps = [];
  const mst = [];
  let totalWeight = 0;

  sorted.forEach((e) => {
    const rootA = find(parent, e.from);
    const rootB = find(parent, e.to);
    if (rootA !== rootB) {
      parent[rootA] = rootB;
      mst.push(e);
      totalWeight += e.weight;
      steps.push({ type: "accept", edge: e, parentSnapshot: { ...parent } });
    } else {
      steps.push({ type: "reject", edge: e, parentSnapshot: { ...parent } });
    }
  });

  return { steps, sortedEdges: sorted, mst, totalWeight };
};

const componentColors = (vertices, parent) => {
  const rootOf = {};
  vertices.forEach((v) => (rootOf[v] = find(parent, v)));
  const roots = [...new Set(Object.values(rootOf))];
  const colorByRoot = {};
  roots.forEach((r, i) => (colorByRoot[r] = PALETTE[i % PALETTE.length]));
  const colorByVertex = {};
  vertices.forEach((v) => (colorByVertex[v] = colorByRoot[rootOf[v]]));
  return colorByVertex;
};

const EXAMPLE_VERTICES = ["A", "B", "C", "D", "E"];
const EXAMPLE_EDGES = [
  { from: "A", to: "B", weight: 4 },
  { from: "A", to: "C", weight: 1 },
  { from: "C", to: "B", weight: 2 },
  { from: "B", to: "D", weight: 5 },
  { from: "C", to: "D", weight: 8 },
  { from: "D", to: "E", weight: 3 },
];

const STEP_DELAY = 700;

const KruskalVisualizer = () => {
  const [vertices, setVertices] = useState([]);
  const [edges, setEdges] = useState([]);
  const [fromVertex, setFromVertex] = useState("");
  const [toVertex, setToVertex] = useState("");
  const [weightInput, setWeightInput] = useState("1");
  const [message, setMessage] = useState("Build a weighted graph and run Kruskal's algorithm");
  const [busy, setBusy] = useState(false);

  const [sortedEdges, setSortedEdges] = useState([]);
  const [edgeIndex, setEdgeIndex] = useState(-1);
  const [edgeStatus, setEdgeStatus] = useState({});
  const [vertexColors, setVertexColors] = useState({});
  const [mstEdges, setMstEdges] = useState([]);
  const [totalWeight, setTotalWeight] = useState(null);

  const clearResult = () => {
    setSortedEdges([]);
    setEdgeIndex(-1);
    setEdgeStatus({});
    setVertexColors({});
    setMstEdges([]);
    setTotalWeight(null);
  };

  const addVertex = () => {
    if (vertices.length >= MAX_VERTICES) {
      setMessage(`Limit of ${MAX_VERTICES} vertices reached`);
      return;
    }
    const next = LETTERS[vertices.length];
    setVertices((prev) => [...prev, next]);
    setMessage(`Added vertex ${next}`);
    clearResult();
  };

  const addEdge = () => {
    if (!fromVertex || !toVertex || fromVertex === toVertex) {
      setMessage("Choose two different vertices");
      return;
    }
    const weight = parseFloat(weightInput);
    if (Number.isNaN(weight) || weight < 0) {
      setMessage("Enter a valid non-negative weight");
      return;
    }
    setEdges((prev) => {
      const existingIndex = prev.findIndex((e) => (e.from === fromVertex && e.to === toVertex) || (e.from === toVertex && e.to === fromVertex));
      const newEdge = { from: fromVertex, to: toVertex, weight };
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = newEdge;
        return copy;
      }
      return [...prev, newEdge];
    });
    setMessage(`Connected ${fromVertex} ↔ ${toVertex} (weight ${weight})`);
    clearResult();
  };

  const loadExample = () => {
    if (busy) return;
    setVertices(EXAMPLE_VERTICES);
    setEdges(EXAMPLE_EDGES);
    clearResult();
    setMessage("Loaded an example graph, click Run Kruskal's");
  };

  const reset = () => {
    if (busy) return;
    setVertices([]);
    setEdges([]);
    setFromVertex("");
    setToVertex("");
    setWeightInput("1");
    clearResult();
    setMessage("Build a weighted graph and run Kruskal's algorithm");
  };

  const handleRun = () => {
    if (busy || vertices.length === 0 || edges.length === 0) return;
    const { steps, sortedEdges: sorted, totalWeight: tw } = kruskalWithSteps(vertices, edges);

    setBusy(true);
    clearResult();
    setSortedEdges(sorted);
    const initialParent = {};
    vertices.forEach((v) => (initialParent[v] = v));
    setVertexColors(componentColors(vertices, initialParent));

    let i = 0;
    const reveal = () => {
      const step = steps[i];
      setEdgeIndex(i);
      const key = `${step.edge.from}-${step.edge.to}`;
      setEdgeStatus((prev) => ({ ...prev, [key]: step.type }));

      if (step.type === "accept") {
        setVertexColors(componentColors(vertices, step.parentSnapshot));
        setMstEdges((prev) => [...prev, step.edge]);
        setMessage(`Accept ${step.edge.from}-${step.edge.to} (weight ${step.edge.weight}): connects two separate components`);

        const bars = document.querySelectorAll(".kruskal-node-active");
        if (bars.length > 0) {
          gsap.fromTo(bars, { scale: 1 }, { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1 });
        }
      } else {
        setMessage(`Reject ${step.edge.from}-${step.edge.to} (weight ${step.edge.weight}): both endpoints are already connected, would create a cycle`);
      }

      i++;
      if (i < steps.length) {
        setTimeout(reveal, STEP_DELAY);
      } else {
        setTimeout(() => {
          setTotalWeight(tw);
          setMessage(`Kruskal's complete: minimum spanning tree total weight is ${tw}`);
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    reveal();
  };

  const positions = layoutCircle(vertices);
  const posByLabel = Object.fromEntries(positions.map((p) => [p.label, p]));

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Build the cheapest possible tree connecting every vertex, by greedily accepting the smallest edge that doesn't form a cycle
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4 space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={addVertex}
              disabled={busy || vertices.length >= MAX_VERTICES}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40"
            >
              <Plus size={15} />
              Add Vertex
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <select value={fromVertex} onChange={(e) => setFromVertex(e.target.value)} disabled={busy} className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40">
              <option value="">Vertex A</option>
              {vertices.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <select value={toVertex} onChange={(e) => setToVertex(e.target.value)} disabled={busy} className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40">
              <option value="">Vertex B</option>
              {vertices.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <input
              type="number"
              min="0"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              placeholder="Weight"
              disabled={busy}
              className="w-20 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <button
              onClick={addEdge}
              disabled={busy || vertices.length < 2}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40"
            >
              <Plus size={15} />
              Add Edge
            </button>
          </div>

          <button
            onClick={handleRun}
            disabled={busy || vertices.length === 0 || edges.length === 0}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-40"
          >
            <Play size={15} />
            Run Kruskal's Algorithm
          </button>

          <div className="flex gap-2">
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
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-40"
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

        {totalWeight !== null && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 text-center text-sm font-medium">
            MST edges: {mstEdges.map((e) => `${e.from}-${e.to}`).join(", ")}, total weight {totalWeight}
          </div>
        )}

        {/* Sorted edge list */}
        {sortedEdges.length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
            <h2 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Edges Sorted by Weight</h2>
            <div className="flex flex-wrap gap-2">
              {sortedEdges.map((e, i) => {
                const key = `${e.from}-${e.to}`;
                const status = edgeStatus[key];
                return (
                  <div
                    key={i}
                    className={`px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      i === edgeIndex && !status
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-900/40"
                        : status === "accept"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/40"
                        : status === "reject"
                        ? "border-red-400 bg-red-50 dark:bg-red-900/30 opacity-60 line-through"
                        : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900"
                    }`}
                  >
                    {e.from}-{e.to} ({e.weight})
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Graph */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Graph</h2>
          <div className="min-h-72 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {vertices.length > 0 ? (
              <svg width="440" height="340" viewBox="0 0 440 340" className="mx-auto">
                {edges.map((e, i) => {
                  const a = posByLabel[e.from];
                  const b = posByLabel[e.to];
                  if (!a || !b) return null;
                  const midX = (a.x + b.x) / 2;
                  const midY = (a.y + b.y) / 2;
                  const key = `${e.from}-${e.to}`;
                  const isCurrent = sortedEdges[edgeIndex] && sortedEdges[edgeIndex].from === e.from && sortedEdges[edgeIndex].to === e.to && !edgeStatus[key];
                  const isMst = mstEdges.some((m) => m.from === e.from && m.to === e.to);
                  const stroke = isMst ? "#10b981" : isCurrent ? "#f59e0b" : "#818cf8";
                  return (
                    <g key={i}>
                      <line
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke={stroke}
                        strokeWidth={isMst || isCurrent ? 3.5 : 2}
                        className={isMst || isCurrent ? "" : "dark:stroke-indigo-500/70"}
                      />
                      <rect x={midX - 10} y={midY - 8} width="20" height="14" rx="4" className="fill-white dark:fill-neutral-900" />
                      <text x={midX} y={midY + 3} textAnchor="middle" fontSize="10" fontWeight="600" className="fill-gray-600 dark:fill-gray-300">
                        {e.weight}
                      </text>
                    </g>
                  );
                })}

                {positions.map((p, i) => {
                  const color = vertexColors[p.label] || "#2563eb";
                  return (
                    <g key={i} ref={animateDropIn} className="kruskal-node-active">
                      <circle cx={p.x} cy={p.y} r="20" fill={color} stroke="white" strokeWidth="2" />
                      <text x={p.x} y={p.y + 5} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
                        {p.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-16">
                Add a vertex to begin
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Vertex (color = component)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Edge under consideration
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-emerald-500 inline-block"></span>
              Accepted into MST
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KruskalVisualizer;
