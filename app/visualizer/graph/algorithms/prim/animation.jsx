"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, Shuffle, RotateCcw, Play } from "lucide-react";

const LETTERS = "ABCDEFGHIJ".split("");
const MAX_VERTICES = 10;

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

const buildWeightedAdjList = (vertices, edges) => {
  const list = {};
  vertices.forEach((v) => (list[v] = []));
  edges.forEach((e) => {
    if (list[e.from]) list[e.from].push({ to: e.to, weight: e.weight });
    if (list[e.to]) list[e.to].push({ to: e.from, weight: e.weight });
  });
  return list;
};

// Grows a single tree outward from the start vertex. "key" tracks, for
// every vertex outside the tree, the cheapest edge weight connecting it
// to the tree so far -- not a cumulative distance like Dijkstra, just the
// weight of one direct edge. At each step, the cheapest such connection
// is pulled in, and its neighbors' keys are updated if a cheaper direct
// connection to the (now larger) tree was just discovered.
const primWithSteps = (vertices, adjList, start) => {
  const key = {};
  const parent = {};
  const inTree = new Set();
  vertices.forEach((v) => (key[v] = Infinity));
  key[start] = 0;
  const steps = [];

  while (inTree.size < vertices.length) {
    let u = null;
    let best = Infinity;
    for (const v of vertices) {
      if (!inTree.has(v) && key[v] < best) {
        best = key[v];
        u = v;
      }
    }
    if (u === null) break; // remaining vertices are unreachable

    inTree.add(u);
    steps.push({ type: "add", vertex: u, via: parent[u] ? { from: parent[u], to: u, weight: key[u] } : null });

    for (const { to, weight } of adjList[u] || []) {
      if (!inTree.has(to) && weight < key[to]) {
        key[to] = weight;
        parent[to] = u;
        steps.push({ type: "update", from: u, to, weight });
      }
    }
  }

  const mstEdges = [];
  let totalWeight = 0;
  vertices.forEach((v) => {
    if (parent[v] !== undefined) {
      mstEdges.push({ from: parent[v], to: v, weight: key[v] });
      totalWeight += key[v];
    }
  });

  return { steps, mstEdges, totalWeight };
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

const PrimVisualizer = () => {
  const [vertices, setVertices] = useState([]);
  const [edges, setEdges] = useState([]);
  const [fromVertex, setFromVertex] = useState("");
  const [toVertex, setToVertex] = useState("");
  const [weightInput, setWeightInput] = useState("1");
  const [startVertex, setStartVertex] = useState("");
  const [message, setMessage] = useState("Build a weighted graph, pick a start vertex, and run Prim's algorithm");
  const [busy, setBusy] = useState(false);

  const [keys, setKeys] = useState({});
  const [inTree, setInTree] = useState(new Set());
  const [current, setCurrent] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [mstEdges, setMstEdges] = useState([]);
  const [totalWeight, setTotalWeight] = useState(null);

  const clearResult = () => {
    setKeys({});
    setInTree(new Set());
    setCurrent(null);
    setActiveEdge(null);
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
    setStartVertex("A");
    clearResult();
    setMessage("Loaded an example graph, click Run Prim's");
  };

  const reset = () => {
    if (busy) return;
    setVertices([]);
    setEdges([]);
    setFromVertex("");
    setToVertex("");
    setWeightInput("1");
    setStartVertex("");
    clearResult();
    setMessage("Build a weighted graph, pick a start vertex, and run Prim's algorithm");
  };

  const handleRun = () => {
    if (busy || !startVertex) return;
    const adjList = buildWeightedAdjList(vertices, edges);
    const { steps, mstEdges: finalMst, totalWeight: tw } = primWithSteps(vertices, adjList, startVertex);

    setBusy(true);
    clearResult();
    const initialKeys = {};
    vertices.forEach((v) => (initialKeys[v] = v === startVertex ? 0 : Infinity));
    setKeys(initialKeys);

    let i = 0;
    const reveal = () => {
      const step = steps[i];

      if (step.type === "add") {
        setCurrent(step.vertex);
        setInTree((prev) => new Set(prev).add(step.vertex));
        setActiveEdge(step.via ? { from: step.via.from, to: step.via.to } : null);
        if (step.via) setMstEdges((prev) => [...prev, step.via]);
        setMessage(step.via ? `Pull in ${step.vertex} via the cheapest connecting edge (weight ${step.via.weight})` : `Start the tree at ${step.vertex}`);

        const bars = document.querySelectorAll(".prim-node-active");
        if (bars.length > 0) {
          gsap.fromTo(bars, { scale: 1 }, { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1 });
        }
      } else if (step.type === "update") {
        setKeys((prev) => ({ ...prev, [step.to]: step.weight }));
        setActiveEdge({ from: step.from, to: step.to });
        setMessage(`Found a cheaper connection to ${step.to}: edge ${step.from}-${step.to} (weight ${step.weight})`);
      }

      i++;
      if (i < steps.length) {
        setTimeout(reveal, STEP_DELAY);
      } else {
        setTimeout(() => {
          setCurrent(null);
          setActiveEdge(null);
          setMstEdges(finalMst);
          setTotalWeight(tw);
          setMessage(`Prim's complete: minimum spanning tree total weight is ${tw}`);
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    reveal();
  };

  const positions = layoutCircle(vertices);
  const posByLabel = Object.fromEntries(positions.map((p) => [p.label, p]));

  const isMstEdge = (from, to) => mstEdges.some((m) => (m.from === from && m.to === to) || (m.from === to && m.to === from));

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Grow a minimum spanning tree outward, always pulling in the cheapest edge that reaches a new vertex
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

          <div className="flex flex-wrap gap-2 items-center">
            <select value={startVertex} onChange={(e) => setStartVertex(e.target.value)} disabled={busy} className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40">
              <option value="">Start vertex</option>
              {vertices.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <button
              onClick={handleRun}
              disabled={busy || !startVertex}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-40"
            >
              <Play size={15} />
              Run Prim's Algorithm
            </button>
          </div>

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

        {/* Key table */}
        {Object.keys(keys).length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
            <h2 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Cheapest Known Connection to the Tree</h2>
            <div className="flex flex-wrap gap-2">
              {vertices.map((v) => (
                <div
                  key={v}
                  className={`px-3 py-1.5 rounded-lg border-2 text-sm font-semibold ${
                    current === v
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-900/40"
                      : inTree.has(v)
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/40"
                      : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900"
                  }`}
                >
                  {v}: {keys[v] === Infinity ? "∞" : keys[v]}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Graph */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Graph</h2>
          <div className="min-h-72 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {vertices.length > 0 ? (
              <svg width="440" height="340" viewBox="0 0 440 340" className="mx-auto">
                <defs>
                  <linearGradient id="prim-node-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="prim-tree-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {edges.map((e, i) => {
                  const a = posByLabel[e.from];
                  const b = posByLabel[e.to];
                  if (!a || !b) return null;
                  const midX = (a.x + b.x) / 2;
                  const midY = (a.y + b.y) / 2;
                  const isActive = activeEdge && ((activeEdge.from === e.from && activeEdge.to === e.to) || (activeEdge.from === e.to && activeEdge.to === e.from));
                  const onMst = isMstEdge(e.from, e.to);
                  const stroke = onMst ? "#10b981" : isActive ? "#f59e0b" : "#818cf8";
                  return (
                    <g key={i}>
                      <line
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke={stroke}
                        strokeWidth={onMst || isActive ? 3.5 : 2}
                        className={onMst || isActive ? "" : "dark:stroke-indigo-500/70"}
                      />
                      <rect x={midX - 10} y={midY - 8} width="20" height="14" rx="4" className="fill-white dark:fill-neutral-900" />
                      <text x={midX} y={midY + 3} textAnchor="middle" fontSize="10" fontWeight="600" className="fill-gray-600 dark:fill-gray-300">
                        {e.weight}
                      </text>
                    </g>
                  );
                })}

                {positions.map((p, i) => {
                  const isInTree = inTree.has(p.label);
                  const isCurrent = current === p.label;
                  return (
                    <g key={i} ref={animateDropIn} className="prim-node-active">
                      {isCurrent && (
                        <circle cx={p.x} cy={p.y} r="26" fill="none" stroke="#f59e0b" strokeWidth="3" />
                      )}
                      <circle cx={p.x} cy={p.y} r="20" fill={isInTree ? "url(#prim-tree-grad)" : "url(#prim-node-grad)"} stroke={isInTree ? "#059669" : "#1d4ed8"} strokeWidth="1.5" />
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
              Outside the tree
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              In the tree
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Just pulled in / key updated
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrimVisualizer;
