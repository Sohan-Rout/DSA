"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Play, RotateCcw } from "lucide-react";
import ArrayGenerator from "@/app/components/ui/randomArray";
import CustomArrayInput from "@/app/components/ui/customArrayInput";

// Builds a max-heap in place, then repeatedly moves the root (the largest
// remaining value) to the end of the array and shrinks the heap by one —
// recording every comparison, swap, and boundary change along the way.
const heapSortSteps = (input) => {
  const a = [...input];
  const n = a.length;
  const steps = [];

  const siftDown = (heapSize, start) => {
    let i = start;
    while (true) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < heapSize) {
        steps.push({ array: [...a], type: "compare", indices: [largest, left], heapSize, message: `Compare ${a[largest]} with left child ${a[left]}` });
        if (a[left] > a[largest]) largest = left;
      }
      if (right < heapSize) {
        steps.push({ array: [...a], type: "compare", indices: [largest, right], heapSize, message: `Compare ${a[largest]} with right child ${a[right]}` });
        if (a[right] > a[largest]) largest = right;
      }

      if (largest === i) break;

      steps.push({ array: [...a], type: "swap", indices: [i, largest], heapSize, message: `Swap ${a[i]} and ${a[largest]} to restore the heap property` });
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({ array: [...a], type: "swapped", indices: [i, largest], heapSize, message: "Swapped — continue sifting down" });
      i = largest;
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(n, i);
  }
  steps.push({ array: [...a], type: "heap-built", indices: [], heapSize: n, message: "Max-heap built — the largest value is now at the root" });

  for (let end = n - 1; end > 0; end--) {
    steps.push({ array: [...a], type: "swap", indices: [0, end], heapSize: end + 1, message: `Move the root ${a[0]} to index ${end} — it's the largest value left in the heap` });
    [a[0], a[end]] = [a[end], a[0]];
    steps.push({ array: [...a], type: "sorted", indices: [end], heapSize: end, message: `${a[end]} is now in its final sorted position` });
    siftDown(end, 0);
  }
  steps.push({ array: [...a], type: "done", indices: [], heapSize: 0, message: "Array fully sorted" });

  return steps;
};

const NODE_RADIUS = 18;
const LEVEL_HEIGHT = 60;

const layoutHeap = (values, index = 0, depth = 0, x = 150, y = 26, nodes = [], edges = []) => {
  if (index >= values.length) return { nodes, edges };
  nodes.push({ index, value: values[index], x, y, depth, isLeaf: 2 * index + 1 >= values.length, isRoot: index === 0 });

  const xOffset = Math.max(20, 90 / (depth + 1));
  const leftIndex = 2 * index + 1;
  const rightIndex = 2 * index + 2;

  if (leftIndex < values.length) {
    const leftX = x - xOffset;
    const leftY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: leftX, y2: leftY - NODE_RADIUS + 2 });
    layoutHeap(values, leftIndex, depth + 1, leftX, leftY, nodes, edges);
  }
  if (rightIndex < values.length) {
    const rightX = x + xOffset;
    const rightY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: rightX, y2: rightY - NODE_RADIUS + 2 });
    layoutHeap(values, rightIndex, depth + 1, rightX, rightY, nodes, edges);
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

const HeapSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [heapSize, setHeapSize] = useState(0);
  const [compareIndices, setCompareIndices] = useState([]);
  const [swapIndices, setSwapIndices] = useState([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [message, setMessage] = useState("Generate or enter an array to begin");
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const animationRef = useRef(null);

  const resetStats = () => {
    setComparisons(0);
    setSwaps(0);
    setCompareIndices([]);
    setSwapIndices([]);
  };

  const loadArray = (newArray) => {
    if (sorting) return;
    setArray(newArray);
    setHeapSize(newArray.length);
    setSorted(false);
    resetStats();
    setMessage("Array loaded — click Start Heap Sort");
  };

  const reset = () => {
    if (animationRef.current) clearTimeout(animationRef.current);
    setArray([]);
    setHeapSize(0);
    setSorting(false);
    setSorted(false);
    resetStats();
    setMessage("Generate or enter an array to begin");
  };

  const handleStart = () => {
    if (sorting || sorted || array.length === 0) return;
    const steps = heapSortSteps(array);
    setSorting(true);
    resetStats();

    let i = 0;
    const playStep = () => {
      const s = steps[i];
      setArray(s.array);
      setHeapSize(s.heapSize);
      setMessage(s.message);

      if (s.type === "compare") {
        setCompareIndices(s.indices);
        setSwapIndices([]);
        setComparisons((prev) => prev + 1);
      } else if (s.type === "swap") {
        setSwapIndices(s.indices);
        setCompareIndices([]);
        setSwaps((prev) => prev + 1);
        const bars = document.querySelectorAll(".heap-bar");
        if (bars.length > 0) {
          gsap.fromTo(bars, { scale: 1 }, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1 });
        }
      } else if (s.type === "swapped") {
        setSwapIndices([]);
        setCompareIndices([]);
      } else {
        setCompareIndices([]);
        setSwapIndices([]);
      }

      i++;
      if (i < steps.length) {
        animationRef.current = setTimeout(playStep, 900 / speed);
      } else {
        setSorting(false);
        setSorted(true);
        setCompareIndices([]);
        setSwapIndices([]);
      }
    };
    playStep();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  const heapValues = array.slice(0, heapSize);
  const { nodes, edges } = heapValues.length > 0 ? layoutHeap(heapValues) : { nodes: [], edges: [] };
  const dims = getSvgDimensions(nodes);

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Watch an array become a max-heap, then get sorted one extraction at a time
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 sm:p-6 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <ArrayGenerator onGenerate={loadArray} disabled={sorting} />
              <CustomArrayInput onUseCustomArray={loadArray} disabled={sorting} />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleStart}
                disabled={!array.length || sorting || sorted}
                className="w-full flex items-center justify-center gap-1.5 disabled:opacity-50 bg-green-500 hover:bg-green-600 px-4 py-2 rounded shadow-sm transition-all duration-300 text-sm sm:text-base text-black"
              >
                <Play size={15} />
                {sorting ? "Sorting..." : "Start Heap Sort"}
              </button>
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-1.5 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors text-sm sm:text-base"
              >
                <RotateCcw size={15} />
                Reset All
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-700 dark:text-gray-300">Speed:</span>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-32"
              disabled={sorting}
            />
            <span className="text-gray-700 dark:text-gray-300">{speed}x</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-100 dark:bg-neutral-900 p-3 rounded">
              <div className="font-medium">Comparisons:</div>
              <div className="text-2xl">{comparisons}</div>
            </div>
            <div className="bg-gray-100 dark:bg-neutral-900 p-3 rounded">
              <div className="font-medium">Swaps:</div>
              <div className="text-2xl">{swaps}</div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-center text-sm">
          {message}
        </div>

        {/* Array Visualization */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
          <h2 className="text-xl font-semibold mb-4">Array Visualization</h2>
          {array.length > 0 ? (
            <div className="flex flex-wrap gap-4 justify-center">
              {array.map((value, index) => {
                const isCompare = compareIndices.includes(index);
                const isSwap = swapIndices.includes(index);
                const isSortedIndex = index >= heapSize;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`heap-bar w-14 h-14 flex items-center justify-center rounded-lg border-2 transition-all duration-300 text-base font-medium
                        ${
                          isSwap
                            ? "bg-amber-400 dark:bg-amber-600 border-amber-600 dark:border-amber-400"
                            : isCompare
                            ? "bg-blue-400 dark:bg-blue-600 border-blue-600 dark:border-blue-400"
                            : isSortedIndex
                            ? "bg-emerald-400 dark:bg-emerald-600 border-emerald-600 dark:border-emerald-400"
                            : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        }`}
                    >
                      {value}
                    </div>
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{index}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Generate or enter an array to begin</div>
          )}
        </div>

        {/* Heap Tree Visualization */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Heap as a Tree</h2>
          <div className="min-h-52 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {nodes.length > 0 ? (
              <svg width={dims.width} height={dims.height} viewBox={`0 0 ${dims.width} ${dims.height}`} className="mx-auto">
                <defs>
                  <linearGradient id="heap-internal-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="heap-leaf-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="heap-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
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

                {nodes.map((node, i) => {
                  const isCompare = compareIndices.includes(node.index);
                  const isSwap = swapIndices.includes(node.index);
                  return (
                    <g key={i} ref={animateDropIn}>
                      {node.isRoot && (
                        <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 5} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
                      )}
                      {isCompare && (
                        <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 4} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                      )}
                      {isSwap && (
                        <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 4} fill="none" stroke="#f59e0b" strokeWidth="3" />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={NODE_RADIUS}
                        fill={node.isLeaf ? "url(#heap-leaf-grad)" : "url(#heap-internal-grad)"}
                        stroke={node.isLeaf ? "#059669" : "#1d4ed8"}
                        strokeWidth="1.5"
                        filter="url(#heap-node-shadow)"
                      />
                      <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="12" fontWeight="700">
                        {node.value}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="w-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-12">
                {sorted ? "Heap is empty — every element has been extracted in sorted order" : "The heap view fills in once sorting starts"}
              </div>
            )}
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
              <span className="w-3 h-3 rounded-full border-2 border-blue-500 inline-block"></span>
              Comparing
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Swapping
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Sorted (out of heap)
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeapSortVisualizer;
