"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Plus, Search, Shuffle, RotateCcw } from "lucide-react";

class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

const insertWord = (root, word, createdPrefixes) => {
  let node = root;
  let prefix = "";
  for (const ch of word) {
    prefix += ch;
    if (!node.children[ch]) {
      node.children[ch] = new TrieNode();
      createdPrefixes.push(prefix);
    }
    node = node.children[ch];
  }
  const alreadyExisted = node.isEnd;
  node.isEnd = true;
  return alreadyExisted;
};

const searchWordSteps = (root, word) => {
  const steps = [];
  let node = root;
  let prefix = "";
  for (const ch of word) {
    if (!node.children[ch]) {
      return { steps, found: false, brokeAt: prefix + ch };
    }
    prefix += ch;
    node = node.children[ch];
    steps.push(prefix);
  }
  return { steps, found: node.isEnd, brokeAt: null };
};

const NODE_R = 16;
const LEVEL_H = 64;
const GAP = 10;

const computeWidth = (node) => {
  const keys = Object.keys(node.children).sort();
  if (keys.length === 0) {
    node._width = NODE_R * 2 + GAP;
    return node._width;
  }
  let total = 0;
  keys.forEach((k) => {
    total += computeWidth(node.children[k]) + GAP;
  });
  total -= GAP;
  node._width = Math.max(NODE_R * 2 + GAP, total);
  return node._width;
};

const layoutTrie = (node, prefix, depth, xLeft, y, positioned = [], edges = []) => {
  const keys = Object.keys(node.children).sort();
  const width = node._width;

  if (keys.length === 0) {
    const x = xLeft + width / 2;
    positioned.push({ node, prefix, x, y, depth, isRoot: depth === 0 });
    return { positioned, edges };
  }

  let childrenTotalWidth = 0;
  keys.forEach((k) => {
    childrenTotalWidth += node.children[k]._width + GAP;
  });
  childrenTotalWidth -= GAP;

  let cursor = xLeft + (width - childrenTotalWidth) / 2;
  const childCenters = [];
  keys.forEach((k) => {
    const child = node.children[k];
    layoutTrie(child, prefix + k, depth + 1, cursor, y + LEVEL_H, positioned, edges);
    const cx = cursor + child._width / 2;
    childCenters.push({ ch: k, cx });
    cursor += child._width + GAP;
  });

  const x = (childCenters[0].cx + childCenters[childCenters.length - 1].cx) / 2;
  positioned.push({ node, prefix, x, y, depth, isRoot: depth === 0 });

  childCenters.forEach(({ ch, cx }) => {
    edges.push({ x1: x, y1: y + NODE_R, x2: cx, y2: y + LEVEL_H - NODE_R, ch });
  });

  return { positioned, edges };
};

const WORD_POOL = ["cat", "car", "cart", "dog", "dodge", "bat", "ball", "bee", "sea", "seat"];
const STEP_DELAY = 500;

const PrefixTreeVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [wordInput, setWordInput] = useState("");
  const [message, setMessage] = useState("Trie is empty");
  const [highlightPath, setHighlightPath] = useState([]);
  const [highlightCreated, setHighlightCreated] = useState([]);
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

  const validateWord = (raw) => {
    const word = raw.trim().toLowerCase();
    if (!word || !/^[a-z]+$/.test(word)) {
      setMessage("Please enter a word using only letters a-z");
      return null;
    }
    return word;
  };

  const handleInsert = () => {
    if (busy) return;
    const word = validateWord(wordInput);
    if (!word) return;

    const clonedRoot = root ? structuredClone(root) : new TrieNode();
    const createdPrefixes = [];
    const alreadyExisted = insertWord(clonedRoot, word, createdPrefixes);
    setRoot(clonedRoot);

    if (createdPrefixes.length === 0 && alreadyExisted) {
      setMessage(`"${word}" is already in the trie`);
    } else if (createdPrefixes.length === 0) {
      setMessage(`"${word}" existed only as a prefix of another word — now marked complete too`);
    } else {
      setMessage(`Inserted "${word}" — created ${createdPrefixes.length} new node${createdPrefixes.length === 1 ? "" : "s"}`);
    }
    setHighlightCreated(createdPrefixes);
    setTimeout(() => setHighlightCreated([]), 1300);
    setHighlightPath([]);
    setWordInput("");
  };

  const handleSearch = () => {
    if (busy || !root) return;
    const word = validateWord(wordInput);
    if (!word) return;

    const { steps, found, brokeAt } = searchWordSteps(root, word);
    setBusy(true);
    setHighlightPath([]);
    setHighlightCreated([]);
    setMessage(`Searching for "${word}"...`);

    let i = 0;
    const revealStep = () => {
      if (i < steps.length) {
        setHighlightPath(steps.slice(0, i + 1));
        setMessage(`Following '${word[i]}' — path so far: "${steps[i]}"`);
        i++;
        setTimeout(revealStep, STEP_DELAY);
      } else {
        if (brokeAt) {
          setMessage(`"${word}" isn't in the trie — no branch for prefix "${brokeAt}"`);
        } else if (found) {
          setMessage(`Found "${word}" — it's a complete word in the trie`);
        } else {
          setMessage(`"${word}" is only a prefix of other words — not itself stored as a complete word`);
        }
        setBusy(false);
      }
    };
    revealStep();
    setWordInput("");
  };

  const generateRandomTrie = () => {
    if (busy) return;
    const count = Math.floor(Math.random() * 4) + 5;
    const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, count);
    const newRoot = new TrieNode();
    chosen.forEach((w) => insertWord(newRoot, w, []));
    setRoot(newRoot);
    setMessage(`Generated a trie with ${count} random words: ${chosen.join(", ")}`);
    setHighlightPath([]);
    setHighlightCreated([]);
  };

  const reset = () => {
    if (busy) return;
    setRoot(null);
    setWordInput("");
    setMessage("Trie is empty");
    setHighlightPath([]);
    setHighlightCreated([]);
  };

  let positioned = [];
  let edges = [];
  if (root) {
    computeWidth(root);
    const layout = layoutTrie(root, "", 0, 0, 40);
    positioned = layout.positioned;
    edges = layout.edges;
  }

  const getSvgDimensions = () => {
    if (positioned.length === 0) return { width: 600, height: 220 };
    const xValues = positioned.map((p) => p.x);
    const yValues = positioned.map((p) => p.y);
    const padding = 40;
    return {
      width: Math.max(600, Math.max(...xValues) - Math.min(...xValues) + padding * 2),
      height: Math.max(220, Math.max(...yValues) + padding * 2),
    };
  };
  const dims = getSvgDimensions();
  const minX = positioned.length ? Math.min(...positioned.map((p) => p.x)) - 40 : 0;

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Insert words to build the trie, then search and watch it follow one letter at a time
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsert()}
              placeholder="Enter a word (a-z)"
              disabled={busy}
              className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <button
              onClick={handleInsert}
              disabled={busy}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40"
            >
              <Plus size={16} strokeWidth={2.5} />
              Insert
            </button>
            <button
              onClick={handleSearch}
              disabled={busy || !root}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-40"
            >
              <Search size={15} />
              Search
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={generateRandomTrie}
              disabled={busy}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-900 transition disabled:opacity-40"
            >
              <Shuffle size={15} />
              Random Words
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

        {/* Visualization */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-center text-sm">
            {message}
          </div>

          <div className="min-h-60 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {positioned.length > 0 ? (
              <svg
                width={dims.width}
                height={dims.height}
                viewBox={`${minX} 0 ${dims.width} ${dims.height}`}
                className="mx-auto"
              >
                <defs>
                  <linearGradient id="tr-node-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="tr-end-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="tr-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
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
                      <rect x={midX - 8} y={midY - 9} width="16" height="16" rx="4" className="fill-gray-50 dark:fill-neutral-900" />
                      <text x={midX} y={midY + 4} textAnchor="middle" fontSize="10" fontWeight="700" className="fill-gray-600 dark:fill-gray-300">
                        {edge.ch}
                      </text>
                    </g>
                  );
                })}

                {positioned.map((item, i) => {
                  const isOnPath = highlightPath.includes(item.prefix);
                  const isCreated = highlightCreated.includes(item.prefix);
                  const isEnd = item.node.isEnd;
                  return (
                    <g key={i} ref={animateDropIn}>
                      {item.isRoot && (
                        <circle
                          cx={item.x}
                          cy={item.y}
                          r={NODE_R + 6}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          strokeDasharray="3 4"
                          opacity="0.7"
                        />
                      )}
                      {isOnPath && (
                        <circle cx={item.x} cy={item.y} r={NODE_R + 4} fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.9" />
                      )}
                      {isCreated && !isOnPath && (
                        <circle cx={item.x} cy={item.y} r={NODE_R + 4} fill="none" stroke="#8b5cf6" strokeWidth="2.5" opacity="0.9" />
                      )}
                      <circle
                        cx={item.x}
                        cy={item.y}
                        r={NODE_R}
                        fill={isEnd ? "url(#tr-end-grad)" : "url(#tr-node-grad)"}
                        stroke={isEnd ? "#059669" : "#1d4ed8"}
                        strokeWidth="1.5"
                        filter="url(#tr-node-shadow)"
                      />
                      <text x={item.x} y={item.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
                        {item.isRoot ? "•" : item.prefix[item.prefix.length - 1]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-16">
                No trie yet — insert a word or generate random words
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Character node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              End of a word
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-amber-500 inline-block"></span>
              Root (empty prefix)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Search path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-violet-500 inline-block"></span>
              Newly created
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrefixTreeVisualizer;
