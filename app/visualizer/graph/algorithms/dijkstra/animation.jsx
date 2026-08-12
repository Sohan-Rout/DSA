"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, Shuffle, RotateCcw, Play, Route } from "lucide-react";

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
    if (!e.directed && list[e.to]) list[e.to].push({ to: e.from, weight: e.weight });
  });
  return list;
};

// Greedy relaxation: always finalize whichever unvisited vertex currently
// has the smallest tentative distance, since all weights are non-negative,
// no edge discovered later could ever produce a shorter path to it.
const dijkstraWithSteps = (vertices, adjList, start) => {
  const dist = {};
  const prev = {};
  const visited = new Set();
  vertices.forEach((v) => (dist[v] = Infinity));
  dist[start] = 0;
  const steps = [];

  while (visited.size < vertices.length) {
    let u = null;
    let best = Infinity;
    for (const v of vertices) {
      if (!visited.has(v) && dist[v] < best) {
        best = dist[v];
        u = v;
      }
    }
    if (u === null) break; // everything remaining is unreachable

    visited.add(u);
    steps.push({ type: "select", vertex: u, dist: { ...dist } });

    for (const { to, weight } of adjList[u] || []) {
      if (visited.has(to)) continue;
      const candidate = dist[u] + weight;
      if (candidate < dist[to]) {
        dist[to] = candidate;
        prev[to] = u;
        steps.push({ type: "relax", from: u, to, newDist: candidate, dist: { ...dist } });
      } else {
        steps.push({ type: "check", from: u, to });
      }
    }
  }

  return { steps, dist, prev };
};

const buildPath = (prev, start, target) => {
  if (target === start) return [start];
  const path = [];
  let cur = target;
  while (cur !== undefined && cur !== start) {
    path.unshift(cur);
    cur = prev[cur];
  }
  if (cur !== start) return null; // unreachable
  path.unshift(start);
  return path;
};

const EXAMPLE_VERTICES = ["A", "B", "C", "D", "E"];
const EXAMPLE_EDGES = [
  { from: "A", to: "B", weight: 4, directed: false },
  { from: "A", to: "C", weight: 1, directed: false },
  { from: "C", to: "B", weight: 2, directed: false },
  { from: "B", to: "D", weight: 5, directed: false },
  { from: "C", to: "D", weight: 8, directed: false },
  { from: "D", to: "E", weight: 3, directed: false },
];

const STEP_DELAY = 650;

const DijkstraVisualizer = () => {
  const [vertices, setVertices] = useState([]);
  const [edges, setEdges] = useState([]);
  const [directedMode, setDirectedMode] = useState(false);
  const [fromVertex, setFromVertex] = useState("");
  const [toVertex, setToVertex] = useState("");
  const [weightInput, setWeightInput] = useState("1");
  const [startVertex, setStartVertex] = useState("");
  const [targetVertex, setTargetVertex] = useState("");
  const [message, setMessage] = useState("Build a weighted graph, pick a start vertex, and run Dijkstra");
  const [busy, setBusy] = useState(false);

  const [distances, setDistances] = useState({});
  const [visited, setVisited] = useState(new Set());
  const [current, setCurrent] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [finalPrev, setFinalPrev] = useState(null);
  const [pathEdges, setPathEdges] = useState(null);
  const [pathInfo, setPathInfo] = useState(null);

  const clearResult = () => {
    setDistances({});
    setVisited(new Set());
    setCurrent(null);
    setActiveEdge(null);
    setFinalPrev(null);
    setPathEdges(null);
    setPathInfo(null);
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
    const weight = parseFloat(weightInput);
    if (Number.isNaN(weight) || weight < 0) {
      setMessage("Enter a valid non-negative weight");
      return;
    }
    setEdges((prev) => {
      const existingIndex = prev.findIndex(
        (e) => (e.from === fromVertex && e.to === toVertex) || (!e.directed && e.from === toVertex && e.to === fromVertex)
      );
      const newEdge = { from: fromVertex, to: toVertex, weight, directed: directedMode };
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = newEdge;
        return copy;
      }
      return [...prev, newEdge];
    });
    setMessage(`Connected ${fromVertex} ${directedMode ? "→" : "↔"} ${toVertex} (weight ${weight})`);
    clearResult();
  };

  const loadExample = () => {
    if (busy) return;
    setVertices(EXAMPLE_VERTICES);
    setEdges(EXAMPLE_EDGES);
    setStartVertex("A");
    setTargetVertex("E");
    clearResult();
    setMessage("Loaded an example graph, click Run Dijkstra");
  };

  const reset = () => {
    if (busy) return;
    setVertices([]);
    setEdges([]);
    setFromVertex("");
    setToVertex("");
    setWeightInput("1");
    setStartVertex("");
    setTargetVertex("");
    clearResult();
    setMessage("Build a weighted graph, pick a start vertex, and run Dijkstra");
  };

  const handleRun = () => {
    if (busy || !startVertex) return;
    const adjList = buildWeightedAdjList(vertices, edges);
    const { steps, dist, prev } = dijkstraWithSteps(vertices, adjList, startVertex);

    setBusy(true);
    clearResult();
    const initialDist = {};
    vertices.forEach((v) => (initialDist[v] = v === startVertex ? 0 : Infinity));
    setDistances(initialDist);

    let i = 0;
    const reveal = () => {
      const step = steps[i];

      if (step.type === "select") {
        setCurrent(step.vertex);
        setVisited((p) => new Set(p).add(step.vertex));
        setActiveEdge(null);
        setMessage(`Finalize ${step.vertex}: no shorter path to it can exist now`);
      } else if (step.type === "relax") {
        setActiveEdge({ from: step.from, to: step.to });
        setDistances((prevD) => ({ ...prevD, [step.to]: step.newDist }));
        setMessage(`Relax ${step.from} → ${step.to}: found a shorter distance of ${step.newDist}`);
      } else if (step.type === "check") {
        setActiveEdge({ from: step.from, to: step.to });
        setMessage(`Check ${step.from} → ${step.to}: no improvement, keep current distance`);
      }

      i++;
      if (i < steps.length) {
        setTimeout(reveal, STEP_DELAY);
      } else {
        setTimeout(() => {
          setCurrent(null);
          setActiveEdge(null);
          setFinalPrev(prev);
          setMessage("Dijkstra complete: every vertex now has its shortest distance from the start");
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    reveal();
  };

  const handleShowPath = () => {
    if (!finalPrev || !targetVertex || !startVertex) return;
    const path = buildPath(finalPrev, startVertex, targetVertex);
    if (!path) {
      setPathEdges(null);
      setPathInfo({ unreachable: true });
      return;
    }
    const pairs = [];
    for (let i = 0; i < path.length - 1; i++) pairs.push({ from: path[i], to: path[i + 1] });
    setPathEdges(pairs);
    setPathInfo({ path, distance: distances[targetVertex] });
  };

  const positions = layoutCircle(vertices);
  const posByLabel = Object.fromEntries(positions.map((p) => [p.label, p]));

  const isOnPath = (from, to) => pathEdges && pathEdges.some((p) => (p.from === from && p.to === to) || (p.from === to && p.to === from));

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Find the shortest weighted-distance path from a start vertex to every other vertex
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
              Run Dijkstra
            </button>
          </div>

          {finalPrev && (
            <div className="flex flex-wrap gap-2 items-center">
              <select value={targetVertex} onChange={(e) => setTargetVertex(e.target.value)} className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40">
                <option value="">Target vertex</option>
                {vertices.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
              <button
                onClick={handleShowPath}
                disabled={!targetVertex}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition disabled:opacity-40"
              >
                <Route size={15} />
                Show Shortest Path
              </button>
            </div>
          )}

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

        {pathInfo && (
          <div className={`mb-4 p-3 rounded-lg text-center text-sm ${pathInfo.unreachable ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200" : "bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200"}`}>
            {pathInfo.unreachable ? `${targetVertex} is not reachable from ${startVertex}` : `Shortest path: ${pathInfo.path.join(" → ")} (distance ${pathInfo.distance})`}
          </div>
        )}

        {/* Distance table */}
        {Object.keys(distances).length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
            <h2 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Distances from {startVertex}</h2>
            <div className="flex flex-wrap gap-2">
              {vertices.map((v) => (
                <div
                  key={v}
                  className={`px-3 py-1.5 rounded-lg border-2 text-sm font-semibold ${
                    current === v
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-900/40"
                      : visited.has(v)
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/40"
                      : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900"
                  }`}
                >
                  {v}: {distances[v] === Infinity ? "∞" : distances[v]}
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
                  <linearGradient id="dij-node-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="dij-visited-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <marker id="dij-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                  </marker>
                </defs>

                {edges.map((e, i) => {
                  const a = posByLabel[e.from];
                  const b = posByLabel[e.to];
                  if (!a || !b) return null;
                  const midX = (a.x + b.x) / 2;
                  const midY = (a.y + b.y) / 2;
                  const isActive = activeEdge && ((activeEdge.from === e.from && activeEdge.to === e.to) || (!e.directed && activeEdge.from === e.to && activeEdge.to === e.from));
                  const onPath = isOnPath(e.from, e.to);
                  const stroke = onPath ? "#8b5cf6" : isActive ? "#f59e0b" : "#818cf8";
                  return (
                    <g key={i}>
                      <line
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke={stroke}
                        strokeWidth={onPath || isActive ? 3.5 : 2}
                        className={onPath || isActive ? "" : "dark:stroke-indigo-500/70"}
                        markerEnd={e.directed ? "url(#dij-arrow)" : undefined}
                      />
                      <rect x={midX - 10} y={midY - 8} width="20" height="14" rx="4" className="fill-white dark:fill-neutral-900" />
                      <text x={midX} y={midY + 3} textAnchor="middle" fontSize="10" fontWeight="600" className="fill-gray-600 dark:fill-gray-300">
                        {e.weight}
                      </text>
                    </g>
                  );
                })}

                {positions.map((p, i) => {
                  const isVisitedV = visited.has(p.label);
                  const isCurrent = current === p.label;
                  return (
                    <g key={i} ref={animateDropIn}>
                      {isCurrent && (
                        <circle cx={p.x} cy={p.y} r="26" fill="none" stroke="#f59e0b" strokeWidth="3" />
                      )}
                      <circle cx={p.x} cy={p.y} r="20" fill={isVisitedV ? "url(#dij-visited-grad)" : "url(#dij-node-grad)"} stroke={isVisitedV ? "#059669" : "#1d4ed8"} strokeWidth="1.5" />
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
              Finalized
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Currently finalized / edge relaxed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-violet-500 inline-block"></span>
              Shortest path
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DijkstraVisualizer;
