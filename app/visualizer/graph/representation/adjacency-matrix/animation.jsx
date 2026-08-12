"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, Shuffle, RotateCcw } from "lucide-react";

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

// Every edge sets one (or, for undirected edges, two mirrored) cells in the
// matrix, adding an edge to the edge list and setting a matrix cell are the
// same operation viewed from two different representations.
const buildMatrix = (vertices, edges) => {
  const n = vertices.length;
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  edges.forEach((e) => {
    const i = vertices.indexOf(e.from);
    const j = vertices.indexOf(e.to);
    if (i === -1 || j === -1) return;
    matrix[i][j] = e.weight;
    if (!e.directed) matrix[j][i] = e.weight;
  });
  return matrix;
};

const EXAMPLE_VERTICES = ["A", "B", "C", "D", "E"];
const EXAMPLE_EDGES = [
  { from: "A", to: "B", weight: 1, directed: false },
  { from: "A", to: "C", weight: 1, directed: false },
  { from: "B", to: "D", weight: 1, directed: false },
  { from: "C", to: "D", weight: 1, directed: false },
  { from: "D", to: "E", weight: 1, directed: false },
];

const AdjacencyMatrixVisualizer = () => {
  const [vertices, setVertices] = useState([]);
  const [edges, setEdges] = useState([]);
  const [directedMode, setDirectedMode] = useState(false);
  const [fromVertex, setFromVertex] = useState("");
  const [toVertex, setToVertex] = useState("");
  const [weightInput, setWeightInput] = useState("1");
  const [recentEdge, setRecentEdge] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [message, setMessage] = useState("Add vertices, then connect them with edges");

  const addVertex = () => {
    if (vertices.length >= MAX_VERTICES) {
      setMessage(`Limit of ${MAX_VERTICES} vertices reached`);
      return;
    }
    const next = LETTERS[vertices.length];
    setVertices((prev) => [...prev, next]);
    setMessage(`Added vertex ${next}`);
  };

  const addEdge = () => {
    if (!fromVertex || !toVertex) {
      setMessage("Choose both a From and a To vertex");
      return;
    }
    const weight = parseFloat(weightInput);
    if (Number.isNaN(weight)) {
      setMessage("Enter a valid weight");
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

    setRecentEdge({ from: fromVertex, to: toVertex, directed: directedMode });
    setSelectedCell(null);
    setMessage(`Set edge ${fromVertex} → ${toVertex} (weight ${weight})${directedMode ? "" : ", mirrored both ways since the graph is undirected"}`);

    const bars = document.querySelectorAll(".matrix-cell-active");
    if (bars.length > 0) {
      gsap.fromTo(bars, { scale: 1 }, { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1 });
    }
  };

  const loadExample = () => {
    setVertices(EXAMPLE_VERTICES);
    setEdges(EXAMPLE_EDGES);
    setRecentEdge(null);
    setSelectedCell(null);
    setMessage("Loaded an example graph");
  };

  const reset = () => {
    setVertices([]);
    setEdges([]);
    setFromVertex("");
    setToVertex("");
    setWeightInput("1");
    setRecentEdge(null);
    setSelectedCell(null);
    setMessage("Add vertices, then connect them with edges");
  };

  const handleCellClick = (i, j) => {
    const a = vertices[i];
    const b = vertices[j];
    if (selectedCell && selectedCell.i === i && selectedCell.j === j) {
      setSelectedCell(null);
      setMessage("Deselected");
      return;
    }
    setSelectedCell({ i, j });
    setRecentEdge(null);
    const matrix = buildMatrix(vertices, edges);
    setMessage(matrix[i][j] !== 0 ? `Cell (${a}, ${b}) = ${matrix[i][j]}, there is an edge from ${a} to ${b}` : `Cell (${a}, ${b}) = 0, no edge from ${a} to ${b}`);
  };

  const positions = layoutCircle(vertices);
  const posByLabel = Object.fromEntries(positions.map((p) => [p.label, p]));
  const matrix = buildMatrix(vertices, edges);

  const isEdgeHighlighted = (from, to) => {
    if (recentEdge && ((recentEdge.from === from && recentEdge.to === to) || (!recentEdge.directed && recentEdge.from === to && recentEdge.to === from))) return "recent";
    if (selectedCell) {
      const a = vertices[selectedCell.i];
      const b = vertices[selectedCell.j];
      if ((a === from && b === to) || (a === to && b === from)) return "selected";
    }
    return null;
  };

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        See how a graph's edges become entries in its adjacency matrix
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4 space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={addVertex}
              disabled={vertices.length >= MAX_VERTICES}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40"
            >
              <Plus size={15} />
              Add Vertex
            </button>

            <label className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 ml-auto">
              <input type="checkbox" checked={directedMode} onChange={(e) => setDirectedMode(e.target.checked)} className="accent-blue-600" />
              Directed graph
            </label>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={fromVertex}
              onChange={(e) => setFromVertex(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="">From</option>
              {vertices.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <select
              value={toVertex}
              onChange={(e) => setToVertex(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="">To</option>
              {vertices.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <input
              type="number"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              placeholder="Weight"
              className="w-20 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <button
              onClick={addEdge}
              disabled={vertices.length === 0}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40"
            >
              <Plus size={15} />
              Add Edge
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadExample}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
            >
              <Shuffle size={15} />
              Load Example
            </button>
            <button
              onClick={reset}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
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

        {/* Graph */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
          <h2 className="text-xl font-semibold mb-4">Graph</h2>
          <div className="min-h-72 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {vertices.length > 0 ? (
              <svg width="440" height="340" viewBox="0 0 440 340" className="mx-auto">
                <defs>
                  <linearGradient id="am-node-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <marker id="am-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                  </marker>
                </defs>

                {edges.map((e, i) => {
                  const a = posByLabel[e.from];
                  const b = posByLabel[e.to];
                  if (!a || !b) return null;
                  const status = isEdgeHighlighted(e.from, e.to);
                  const midX = (a.x + b.x) / 2;
                  const midY = (a.y + b.y) / 2;
                  return (
                    <g key={i}>
                      <line
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke={status ? "#f59e0b" : "#818cf8"}
                        strokeWidth={status ? 3 : 2}
                        className={status ? "" : "dark:stroke-indigo-500/70"}
                        markerEnd={e.directed ? "url(#am-arrow)" : undefined}
                      />
                      {e.weight !== 1 && (
                        <>
                          <rect x={midX - 10} y={midY - 8} width="20" height="14" rx="4" className="fill-white dark:fill-neutral-900" />
                          <text x={midX} y={midY + 3} textAnchor="middle" fontSize="10" fontWeight="600" className="fill-gray-600 dark:fill-gray-300">
                            {e.weight}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}

                {positions.map((p, i) => (
                  <g key={i} ref={animateDropIn}>
                    <circle cx={p.x} cy={p.y} r="20" fill="url(#am-node-grad)" stroke="#1d4ed8" strokeWidth="1.5" />
                    <text x={p.x} y={p.y + 5} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
                      {p.label}
                    </text>
                  </g>
                ))}
              </svg>
            ) : (
              <div className="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-16">
                Add a vertex to begin
              </div>
            )}
          </div>
        </div>

        {/* Matrix */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Adjacency Matrix</h2>
          {vertices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="mx-auto border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-10 h-10"></th>
                    {vertices.map((v) => (
                      <th key={v} className="w-10 h-10 text-center font-semibold text-gray-600 dark:text-gray-300">{v}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vertices.map((rowLabel, i) => (
                    <tr key={rowLabel}>
                      <th className="w-10 h-10 text-center font-semibold text-gray-600 dark:text-gray-300">{rowLabel}</th>
                      {vertices.map((colLabel, j) => {
                        const value = matrix[i][j];
                        const status = isEdgeHighlighted(rowLabel, colLabel);
                        const isSelectedCell = selectedCell && selectedCell.i === i && selectedCell.j === j;
                        return (
                          <td
                            key={colLabel}
                            onClick={() => handleCellClick(i, j)}
                            className={`matrix-cell-active w-10 h-10 text-center border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 ${
                              status === "recent"
                                ? "bg-amber-300 dark:bg-amber-600 font-bold"
                                : isSelectedCell
                                ? "bg-violet-300 dark:bg-violet-700 font-bold"
                                : value !== 0
                                ? "bg-blue-100 dark:bg-blue-900/40"
                                : "bg-gray-50 dark:bg-neutral-900"
                            }`}
                          >
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">Add vertices to see the matrix</div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-blue-100 dark:bg-blue-900/40 inline-block border border-gray-300 dark:border-gray-700"></span>
              Edge exists
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-300 dark:bg-amber-600 inline-block"></span>
              Most recently set edge
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-violet-300 dark:bg-violet-700 inline-block"></span>
              Selected cell (click any cell)
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdjacencyMatrixVisualizer;
