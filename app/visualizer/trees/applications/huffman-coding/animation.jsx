"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Hammer, Shuffle, RotateCcw } from "lucide-react";

const displayChar = (ch) => {
  if (ch === " ") return "␣";
  if (ch === "\n") return "\\n";
  if (ch === "\t") return "\\t";
  return ch;
};

// Builds a Huffman tree by repeatedly merging the two lowest-frequency
// nodes in a priority queue into a new parent, until only the root remains.
// Every merge is recorded so the queue's evolution can be replayed step by step.
const buildHuffman = (text) => {
  const freqMap = {};
  for (const ch of text) freqMap[ch] = (freqMap[ch] || 0) + 1;

  let idCounter = 0;
  let queue = Object.entries(freqMap).map(([char, freq]) => ({ id: idCounter++, char, freq, left: null, right: null }));
  const initialQueue = queue.map((n) => ({ id: n.id, char: n.char, freq: n.freq }));
  const mergeSteps = [];

  while (queue.length > 1) {
    queue.sort((a, b) => a.freq - b.freq || a.id - b.id);
    const a = queue[0];
    const b = queue[1];
    const parent = { id: idCounter++, char: null, freq: a.freq + b.freq, left: a, right: b };
    queue = queue.slice(2).concat([parent]);
    mergeSteps.push({
      aId: a.id,
      bId: b.id,
      aChar: a.char,
      aFreq: a.freq,
      bChar: b.char,
      bFreq: b.freq,
      newFreq: parent.freq,
      queueAfter: queue.map((n) => ({ id: n.id, char: n.char, freq: n.freq })),
    });
  }

  const root = queue[0] || null;
  return { root, initialQueue, mergeSteps, freqMap };
};

// Root-to-leaf path gives each character's code: 0 for every left turn, 1 for every right turn.
const computeCodes = (node, path = "", codes = {}) => {
  if (!node) return codes;
  if (node.left === null && node.right === null) {
    codes[node.char] = path || "0";
    return codes;
  }
  computeCodes(node.left, path + "0", codes);
  computeCodes(node.right, path + "1", codes);
  return codes;
};

const NODE_RADIUS = 20;
const LEVEL_HEIGHT = 70;

const layoutTree = (node, depth = 0, x = 220, y = 30, nodes = [], edges = []) => {
  if (!node) return { nodes, edges };
  const isLeaf = node.left === null && node.right === null;
  const xOffset = Math.max(28, 150 / (depth + 1));

  nodes.push({ id: node.id, label: isLeaf ? displayChar(node.char) : "•", freq: node.freq, x, y, depth, isLeaf, isRoot: depth === 0 });

  if (node.left) {
    const leftX = x - xOffset;
    const leftY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: leftX, y2: leftY - NODE_RADIUS + 2, bit: "0" });
    layoutTree(node.left, depth + 1, leftX, leftY, nodes, edges);
  }
  if (node.right) {
    const rightX = x + xOffset;
    const rightY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: rightX, y2: rightY - NODE_RADIUS + 2, bit: "1" });
    layoutTree(node.right, depth + 1, rightX, rightY, nodes, edges);
  }

  return { nodes, edges };
};

const HIGHLIGHT_DELAY = 500;
const STEP_DELAY = 500;

const EXAMPLE_TEXT = "abracadabra";

const HuffmanVisualizer = () => {
  const [inputText, setInputText] = useState("");
  const [queueChips, setQueueChips] = useState([]);
  const [mergingIds, setMergingIds] = useState([]);
  const [root, setRoot] = useState(null);
  const [codes, setCodes] = useState({});
  const [freqMap, setFreqMap] = useState({});
  const [message, setMessage] = useState("Enter text and build its Huffman tree");
  const [busy, setBusy] = useState(false);

  const clearResult = () => {
    setQueueChips([]);
    setMergingIds([]);
    setRoot(null);
    setCodes({});
    setFreqMap({});
  };

  const loadExample = () => {
    if (busy) return;
    setInputText(EXAMPLE_TEXT);
    clearResult();
    setMessage(`Loaded example text "${EXAMPLE_TEXT}"`);
  };

  const reset = () => {
    if (busy) return;
    setInputText("");
    clearResult();
    setMessage("Enter text and build its Huffman tree");
  };

  const handleBuild = () => {
    if (busy || !inputText) return;
    const { root: finalRoot, initialQueue, mergeSteps, freqMap: fm } = buildHuffman(inputText);
    if (!finalRoot) {
      setMessage("Enter at least one character");
      return;
    }

    setBusy(true);
    clearResult();
    setFreqMap(fm);
    setQueueChips(initialQueue);

    if (mergeSteps.length === 0) {
      setTimeout(() => {
        setRoot(finalRoot);
        setCodes(computeCodes(finalRoot));
        setMessage("Only one distinct character, so it gets the trivial code \"0\"");
        setBusy(false);
      }, STEP_DELAY);
      return;
    }

    const reveal = (i) => {
      const step = mergeSteps[i];
      setMergingIds([step.aId, step.bId]);
      setMessage(
        `Merge lowest-frequency nodes: ${displayChar(step.aChar) ?? "•"}(${step.aFreq}) + ${displayChar(step.bChar) ?? "•"}(${step.bFreq}) → new internal node (${step.newFreq})`
      );

      setTimeout(() => {
        setQueueChips(step.queueAfter);
        setMergingIds([]);

        if (i + 1 < mergeSteps.length) {
          setTimeout(() => reveal(i + 1), STEP_DELAY);
        } else {
          setTimeout(() => {
            setRoot(finalRoot);
            setCodes(computeCodes(finalRoot));
            setMessage("Huffman tree complete: codes assigned by root-to-leaf path (0 = left, 1 = right)");
            setBusy(false);
          }, STEP_DELAY);
        }
      }, HIGHLIGHT_DELAY);
    };
    reveal(0);
  };

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" });
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

  const chars = Object.keys(freqMap);
  const originalBits = chars.length > 0 ? inputText.length * 8 : 0;
  const encodedBits = chars.length > 0 ? [...inputText].reduce((sum, ch) => sum + (codes[ch]?.length || 0), 0) : 0;
  const savings = originalBits > 0 && Object.keys(codes).length > 0 ? Math.round((1 - encodedBits / originalBits) * 100) : null;
  const encodedString = Object.keys(codes).length > 0 ? [...inputText].map((ch) => codes[ch]).join("") : "";

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Build an optimal prefix-free binary code by repeatedly merging the two rarest symbols
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4 space-y-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text, e.g. abracadabra"
            disabled={busy}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
          />

          <div className="flex gap-2">
            <button
              onClick={handleBuild}
              disabled={busy || !inputText}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40"
            >
              <Hammer size={15} />
              Build Huffman Tree
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

        {/* Priority Queue */}
        {queueChips.length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
            <h2 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Priority Queue (by frequency)</h2>
            <div className="flex flex-wrap gap-2">
              {[...queueChips]
                .sort((a, b) => a.freq - b.freq || a.id - b.id)
                .map((chip) => (
                  <div
                    key={chip.id}
                    className={`px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition-all duration-300 ${
                      mergingIds.includes(chip.id)
                        ? "bg-amber-400 dark:bg-amber-600 border-amber-600 dark:border-amber-400 scale-105"
                        : chip.char === null
                        ? "bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200"
                        : "bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    {chip.char === null ? "•" : displayChar(chip.char)}:{chip.freq}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Tree */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
          <h2 className="text-xl font-semibold mb-4">Huffman Tree</h2>
          <div className="min-h-60 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {nodes.length > 0 ? (
              <svg width={dims.width} height={dims.height} viewBox={`0 0 ${dims.width} ${dims.height}`} className="mx-auto">
                <defs>
                  <linearGradient id="huf-internal-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="huf-leaf-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="huf-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.3" />
                  </filter>
                </defs>

                {edges.map((edge, i) => {
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
                      <rect x={midX - 7} y={midY - 8} width="14" height="14" rx="4" className="fill-white dark:fill-neutral-900" />
                      <text x={midX} y={midY + 4} textAnchor="middle" fontSize="10" fontWeight="700" className="fill-indigo-600 dark:fill-indigo-400">
                        {edge.bit}
                      </text>
                    </g>
                  );
                })}

                {nodes.map((node, i) => (
                  <g key={i} ref={animateDropIn}>
                    {node.isRoot && (
                      <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 6} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={NODE_RADIUS}
                      fill={node.isLeaf ? "url(#huf-leaf-grad)" : "url(#huf-internal-grad)"}
                      stroke={node.isLeaf ? "#059669" : "#1d4ed8"}
                      strokeWidth="1.5"
                      filter="url(#huf-node-shadow)"
                    />
                    <text x={node.x} y={node.y - 1} textAnchor="middle" fill="white" fontSize="12" fontWeight="700">
                      {node.label}
                    </text>
                    <text x={node.x} y={node.y + 11} textAnchor="middle" fill="white" fontSize="8" opacity="0.9">
                      {node.freq}
                    </text>
                  </g>
                ))}
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
              Internal node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Leaf (character)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-amber-500 inline-block"></span>
              Root
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-white dark:bg-neutral-900 border border-indigo-400 inline-block"></span>
              Edge bit (0 = left, 1 = right)
            </span>
          </div>
        </div>

        {/* Codes table */}
        {Object.keys(codes).length > 0 && (
          <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
            <h2 className="text-xl font-semibold mb-4">Character Codes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                    <th className="py-2 pr-4">Character</th>
                    <th className="py-2 pr-4">Frequency</th>
                    <th className="py-2 pr-4">Code</th>
                    <th className="py-2">Bits</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(freqMap)
                    .sort((a, b) => b[1] - a[1])
                    .map(([ch, freq]) => (
                      <tr key={ch} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 pr-4 font-mono">{displayChar(ch)}</td>
                        <td className="py-2 pr-4">{freq}</td>
                        <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">{codes[ch]}</td>
                        <td className="py-2">{codes[ch]?.length}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-neutral-800 text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
              {encodedString}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-center">
              <div className="bg-gray-100 dark:bg-neutral-900 p-3 rounded">
                <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Fixed 8-bit</div>
                <div className="text-lg font-semibold">{originalBits} bits</div>
              </div>
              <div className="bg-gray-100 dark:bg-neutral-900 p-3 rounded">
                <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Huffman-encoded</div>
                <div className="text-lg font-semibold">{encodedBits} bits</div>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded">
                <div className="text-emerald-700 dark:text-emerald-300 text-xs mb-1">Savings</div>
                <div className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">{savings}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HuffmanVisualizer;
