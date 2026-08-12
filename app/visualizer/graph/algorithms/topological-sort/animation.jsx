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
  });
  return list;
};

// Kahn's algorithm: repeatedly take a vertex with no remaining unprocessed
// prerequisites (in-degree 0), place it next in the order, and "remove" it
// by decrementing its neighbors' in-degrees -- which may free them up to be
// queued too. If some vertices never reach in-degree 0, a cycle exists.
const kahnWithSteps = (vertices, adjList) => {
  const inDegree = {};
  vertices.forEach((v) => (inDegree[v] = 0));
  vertices.forEach((v) => (adjList[v] || []).forEach((to) => (inDegree[to] += 1)));

  const queue = vertices.filter((v) => inDegree[v] === 0);
  const steps = [];
  const order = [];

  while (queue.length > 0) {
    const u = queue.shift();
    order.push(u);
    steps.push({ type: "process", vertex: u, order: [...order] });

    for (const to of adjList[u] || []) {
      inDegree[to] -= 1;
      steps.push({ type: "decrement", from: u, to, newDegree: inDegree[to] });
      if (inDegree[to] === 0) {
        queue.push(to);
        steps.push({ type: "ready", vertex: to });
      }
    }
  }

  const hasCycle = order.length < vertices.length;
  const stuck = vertices.filter((v) => !order.includes(v));
  return { steps, order, hasCycle, stuck };
};

const EXAMPLE_VERTICES = ["A", "B", "C", "D", "E"];
const EXAMPLE_EDGES = [
  { from: "A", to: "B" },
  { from: "A", to: "C" },
  { from: "B", to: "D" },
  { from: "C", to: "D" },
  { from: "D", to: "E" },
];

const STEP_DELAY = 650;

const TopologicalSortVisualizer = () => {
  const [vertices, setVertices] = useState([]);
  const [edges, setEdges] = useState([]);
  const [fromVertex, setFromVertex] = useState("");
  const [toVertex, setToVertex] = useState("");
  const [message, setMessage] = useState("Build a directed graph (a DAG) and run Topological Sort");
  const [busy, setBusy] = useState(false);

  const [inDegrees, setInDegrees] = useState({});
  const [processed, setProcessed] = useState(new Set());
  const [current, setCurrent] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [order, setOrder] = useState([]);
  const [result, setResult] = useState(null);

  const clearResult = () => {
    setInDegrees({});
    setProcessed(new Set());
    setCurrent(null);
    setActiveEdge(null);
    setOrder([]);
    setResult(null);
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
    setEdges((prev) => {
      const existingIndex = prev.findIndex((e) => e.from === fromVertex && e.to === toVertex);
      if (existingIndex >= 0) return prev;
      return [...prev, { from: fromVertex, to: toVertex }];
    });
    setMessage(`Added prerequisite edge ${fromVertex} → ${toVertex}`);
    clearResult();
  };

  const loadExample = () => {
    if (busy) return;
    setVertices(EXAMPLE_VERTICES);
    setEdges(EXAMPLE_EDGES);
    clearResult();
    setMessage("Loaded an example DAG, click Run Topological Sort");
  };

  const reset = () => {
    if (busy) return;
    setVertices([]);
    setEdges([]);
    setFromVertex("");
    setToVertex("");
    clearResult();
    setMessage("Build a directed graph (a DAG) and run Topological Sort");
  };

  const handleRun = () => {
    if (busy || vertices.length === 0) return;
    const adjList = buildAdjList(vertices, edges);
    const { steps, order: finalOrder, hasCycle, stuck } = kahnWithSteps(vertices, adjList);

    setBusy(true);
    clearResult();
    const initialInDegree = {};
    vertices.forEach((v) => (initialInDegree[v] = 0));
    edges.forEach((e) => (initialInDegree[e.to] += 1));
    setInDegrees(initialInDegree);

    let i = 0;
    const reveal = () => {
      const step = steps[i];

      if (step.type === "process") {
        setCurrent(step.vertex);
        setProcessed((prev) => new Set(prev).add(step.vertex));
        setOrder(step.order);
        setActiveEdge(null);
        setMessage(`${step.vertex} has no remaining prerequisites, place it next in the order`);
      } else if (step.type === "decrement") {
        setActiveEdge({ from: step.from, to: step.to });
        setInDegrees((prev) => ({ ...prev, [step.to]: step.newDegree }));
        setMessage(`${step.from} is done, ${step.to} now has ${step.newDegree} remaining prerequisite${step.newDegree === 1 ? "" : "s"}`);
      } else if (step.type === "ready") {
        setMessage(`${step.vertex} has no prerequisites left, it's ready to be processed`);
      }

      i++;
      if (i < steps.length) {
        setTimeout(reveal, STEP_DELAY);
      } else {
        setTimeout(() => {
          setCurrent(null);
          setActiveEdge(null);
          setResult({ order: finalOrder, hasCycle, stuck });
          setMessage(
            hasCycle
              ? `Cycle detected: ${stuck.join(", ")} could never reach zero remaining prerequisites, so no valid order exists`
              : `Topological Sort complete: ${finalOrder.join(" → ")}`
          );
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
        Order every vertex so each one comes after all of its prerequisites
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
              <option value="">Prerequisite of</option>
              {vertices.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <select value={toVertex} onChange={(e) => setToVertex(e.target.value)} disabled={busy} className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40">
              <option value="">Depends on it</option>
              {vertices.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
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
            disabled={busy || vertices.length === 0}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-40"
          >
            <Play size={15} />
            Run Topological Sort
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

        {result && (
          <div className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${result.hasCycle ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200" : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200"}`}>
            {result.hasCycle ? `Cycle detected, stuck at: ${result.stuck.join(", ")}` : `Order: ${result.order.join(" → ")}`}
          </div>
        )}

        {/* In-degree table */}
        {Object.keys(inDegrees).length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
            <h2 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Remaining Prerequisites (in-degree)</h2>
            <div className="flex flex-wrap gap-2">
              {vertices.map((v) => (
                <div
                  key={v}
                  className={`px-3 py-1.5 rounded-lg border-2 text-sm font-semibold ${
                    current === v
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-900/40"
                      : processed.has(v)
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/40"
                      : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900"
                  }`}
                >
                  {v}: {inDegrees[v]}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Graph */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
          <h2 className="text-xl font-semibold mb-4">Graph (Dependency DAG)</h2>
          <div className="min-h-72 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {vertices.length > 0 ? (
              <svg width="440" height="340" viewBox="0 0 440 340" className="mx-auto">
                <defs>
                  <linearGradient id="topo-node-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="topo-done-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <marker id="topo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                  </marker>
                </defs>

                {edges.map((e, i) => {
                  const a = posByLabel[e.from];
                  const b = posByLabel[e.to];
                  if (!a || !b) return null;
                  const isActive = activeEdge && activeEdge.from === e.from && activeEdge.to === e.to;
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
                      markerEnd="url(#topo-arrow)"
                    />
                  );
                })}

                {positions.map((p, i) => {
                  const isProcessed = processed.has(p.label);
                  const isCurrent = current === p.label;
                  const isStuck = result && result.hasCycle && result.stuck.includes(p.label);
                  return (
                    <g key={i} ref={animateDropIn}>
                      {isCurrent && (
                        <circle cx={p.x} cy={p.y} r="26" fill="none" stroke="#f59e0b" strokeWidth="3" />
                      )}
                      {isStuck && (
                        <circle cx={p.x} cy={p.y} r="26" fill="none" stroke="#ef4444" strokeWidth="3" />
                      )}
                      <circle cx={p.x} cy={p.y} r="20" fill={isProcessed ? "url(#topo-done-grad)" : "url(#topo-node-grad)"} stroke={isProcessed ? "#059669" : "#1d4ed8"} strokeWidth="1.5" />
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
              Unprocessed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Placed in order
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Currently processed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-red-500 inline-block"></span>
              Stuck in a cycle
            </span>
          </div>
        </div>

        {/* Order */}
        {order.length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Topological Order</h2>
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

export default TopologicalSortVisualizer;
