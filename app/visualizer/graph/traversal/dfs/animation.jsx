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

const buildAdjList = (vertices, edges) => {
  const list = {};
  vertices.forEach((v) => (list[v] = []));
  edges.forEach((e) => {
    if (list[e.from]) list[e.from].push(e.to);
    if (!e.directed && list[e.to]) list[e.to].push(e.from);
  });
  return list;
};

// Iterative DFS with an explicit stack: a vertex is only marked visited when
// it's popped, not when it's pushed, so the same vertex can appear in the
// stack more than once, whichever push gets popped first wins, and any
// later pop of an already-visited vertex is simply skipped. Neighbors are
// pushed in reverse so the first neighbor in the list is popped (and
// explored) first, matching the order a recursive DFS would visit them in.
const dfsWithSteps = (adjList, start) => {
  const steps = [];
  const visited = new Set();
  const stack = [start];
  steps.push({ type: "push", vertex: start, stack: [...stack] });

  while (stack.length > 0) {
    const current = stack.pop();

    if (visited.has(current)) {
      steps.push({ type: "skip-visited", vertex: current, stack: [...stack] });
      continue;
    }
    visited.add(current);
    steps.push({ type: "visit", vertex: current, stack: [...stack] });

    const neighbors = [...(adjList[current] || [])].reverse();
    for (const n of neighbors) {
      if (!visited.has(n)) {
        stack.push(n);
        steps.push({ type: "push", vertex: n, from: current, stack: [...stack] });
      } else {
        steps.push({ type: "skip", vertex: n, from: current, stack: [...stack] });
      }
    }
  }
  return steps;
};

const EXAMPLE_VERTICES = ["A", "B", "C", "D", "E", "F"];
const EXAMPLE_EDGES = [
  { from: "A", to: "B", weight: 1, directed: false },
  { from: "A", to: "C", weight: 1, directed: false },
  { from: "B", to: "D", weight: 1, directed: false },
  { from: "C", to: "D", weight: 1, directed: false },
  { from: "D", to: "E", weight: 1, directed: false },
  { from: "C", to: "F", weight: 1, directed: false },
];

const STEP_DELAY = 600;

const DfsVisualizer = () => {
  const [vertices, setVertices] = useState([]);
  const [edges, setEdges] = useState([]);
  const [directedMode, setDirectedMode] = useState(false);
  const [fromVertex, setFromVertex] = useState("");
  const [toVertex, setToVertex] = useState("");
  const [startVertex, setStartVertex] = useState("");
  const [message, setMessage] = useState("Build a graph, pick a start vertex, and run DFS");
  const [busy, setBusy] = useState(false);

  const [visited, setVisited] = useState(new Set());
  const [current, setCurrent] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [stackDisplay, setStackDisplay] = useState([]);
  const [order, setOrder] = useState([]);

  const clearResult = () => {
    setVisited(new Set());
    setCurrent(null);
    setActiveEdge(null);
    setStackDisplay([]);
    setOrder([]);
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
    if (!fromVertex || !toVertex) {
      setMessage("Choose both a From and a To vertex");
      return;
    }
    setEdges((prev) => {
      const existingIndex = prev.findIndex(
        (e) => (e.from === fromVertex && e.to === toVertex) || (!e.directed && e.from === toVertex && e.to === fromVertex)
      );
      const newEdge = { from: fromVertex, to: toVertex, weight: 1, directed: directedMode };
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = newEdge;
        return copy;
      }
      return [...prev, newEdge];
    });
    setMessage(`Connected ${fromVertex} ${directedMode ? "→" : "↔"} ${toVertex}`);
    clearResult();
  };

  const loadExample = () => {
    if (busy) return;
    setVertices(EXAMPLE_VERTICES);
    setEdges(EXAMPLE_EDGES);
    setStartVertex("A");
    clearResult();
    setMessage("Loaded an example graph, click Start DFS");
  };

  const reset = () => {
    if (busy) return;
    setVertices([]);
    setEdges([]);
    setFromVertex("");
    setToVertex("");
    setStartVertex("");
    clearResult();
    setMessage("Build a graph, pick a start vertex, and run DFS");
  };

  const handleRun = () => {
    if (busy || !startVertex) return;
    const adjList = buildAdjList(vertices, edges);
    const steps = dfsWithSteps(adjList, startVertex);

    setBusy(true);
    clearResult();

    let i = 0;
    const reveal = () => {
      const step = steps[i];
      setStackDisplay(step.stack);

      if (step.type === "push") {
        if (step.from) setActiveEdge({ from: step.from, to: step.vertex });
        setMessage(step.from ? `Push ${step.vertex} (discovered from ${step.from})` : `Push start vertex ${step.vertex}`);
      } else if (step.type === "visit") {
        setVisited((prev) => new Set(prev).add(step.vertex));
        setCurrent(step.vertex);
        setActiveEdge(null);
        setOrder((prev) => [...prev, step.vertex]);
        setMessage(`Pop and visit ${step.vertex}`);
      } else if (step.type === "skip") {
        setActiveEdge({ from: step.from, to: step.vertex });
        setMessage(`${step.vertex} is already visited, not pushed again`);
      } else if (step.type === "skip-visited") {
        setMessage(`Pop ${step.vertex}, already visited earlier via another path, skip`);
      }

      i++;
      if (i < steps.length) {
        setTimeout(reveal, STEP_DELAY);
      } else {
        setTimeout(() => {
          setCurrent(null);
          setActiveEdge(null);
          setMessage("DFS complete");
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
        Watch Depth-First Search plunge down one path before backtracking
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
            <label className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 ml-auto">
              <input type="checkbox" checked={directedMode} onChange={(e) => setDirectedMode(e.target.checked)} disabled={busy} className="accent-blue-600" />
              Directed graph
            </label>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <select value={fromVertex} onChange={(e) => setFromVertex(e.target.value)} disabled={busy} className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40">
              <option value="">From</option>
              {vertices.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <select value={toVertex} onChange={(e) => setToVertex(e.target.value)} disabled={busy} className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40">
              <option value="">To</option>
              {vertices.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <button
              onClick={addEdge}
              disabled={busy || vertices.length === 0}
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
              Start DFS
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

        {/* Stack */}
        {stackDisplay.length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
            <h2 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Stack (top on the right, popped next)</h2>
            <div className="flex flex-wrap gap-2">
              {stackDisplay.map((v, i) => (
                <div
                  key={i}
                  className={`px-3 py-1.5 rounded-lg border-2 text-sm font-semibold ${
                    i === stackDisplay.length - 1
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-900/40"
                      : "border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40"
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Graph */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
          <h2 className="text-xl font-semibold mb-4">Graph</h2>
          <div className="min-h-72 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {vertices.length > 0 ? (
              <svg width="440" height="340" viewBox="0 0 440 340" className="mx-auto">
                <defs>
                  <linearGradient id="dfs-node-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="dfs-visited-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <marker id="dfs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                  </marker>
                </defs>

                {edges.map((e, i) => {
                  const a = posByLabel[e.from];
                  const b = posByLabel[e.to];
                  if (!a || !b) return null;
                  const isActive = activeEdge && ((activeEdge.from === e.from && activeEdge.to === e.to) || (!e.directed && activeEdge.from === e.to && activeEdge.to === e.from));
                  return (
                    <line
                      key={i}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={isActive ? "#f59e0b" : "#818cf8"}
                      strokeWidth={isActive ? 3 : 2}
                      className={isActive ? "" : "dark:stroke-indigo-500/70"}
                      markerEnd={e.directed ? "url(#dfs-arrow)" : undefined}
                    />
                  );
                })}

                {positions.map((p, i) => {
                  const isVisited = visited.has(p.label);
                  const isCurrent = current === p.label;
                  return (
                    <g key={i} ref={animateDropIn}>
                      {isCurrent && (
                        <circle cx={p.x} cy={p.y} r="26" fill="none" stroke="#f59e0b" strokeWidth="3" />
                      )}
                      <circle cx={p.x} cy={p.y} r="20" fill={isVisited ? "url(#dfs-visited-grad)" : "url(#dfs-node-grad)"} stroke={isVisited ? "#059669" : "#1d4ed8"} strokeWidth="1.5" />
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
              Unvisited
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Visited
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Currently popped
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 bg-amber-500/20 inline-block"></span>
              Edge being explored
            </span>
          </div>
        </div>

        {/* Order */}
        {order.length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Visit Order</h2>
            <div className="flex flex-wrap gap-2">
              {order.map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-600 text-white text-sm font-bold">{v}</div>
                  {i < order.length - 1 && <span className="text-gray-400">→</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DfsVisualizer;
