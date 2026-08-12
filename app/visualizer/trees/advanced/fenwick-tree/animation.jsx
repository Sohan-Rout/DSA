"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Shuffle, RefreshCw, Search, ArrowRightLeft } from "lucide-react";

const N = 8;

const randomArray = () => Array.from({ length: N }, () => Math.floor(Math.random() * 20) + 1);

const lowbit = (i) => i & -i;

const updateFenwick = (bit, n, index, delta, path) => {
  let i = index + 1; // 1-indexed
  while (i <= n) {
    bit[i] += delta;
    if (path) path.push(i);
    i += lowbit(i);
  }
};

const buildFenwick = (arr) => {
  const n = arr.length;
  const bit = new Array(n + 1).fill(0);
  for (let idx = 0; idx < n; idx++) {
    updateFenwick(bit, n, idx, arr[idx]);
  }
  return bit;
};

const prefixSum = (bit, index, path) => {
  let i = index + 1; // 1-indexed
  let sum = 0;
  while (i > 0) {
    sum += bit[i];
    if (path) path.push(i);
    i -= lowbit(i);
  }
  return sum;
};

const BOX = 42;
const GAP = 6;
const STEP_DELAY = 550;

const FenwickVisualizer = () => {
  const [arr, setArr] = useState(null);
  const [bit, setBit] = useState(null);
  const [message, setMessage] = useState("No Fenwick tree yet, build one over a random array");
  const [updateIndex, setUpdateIndex] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [queryIndex, setQueryIndex] = useState("");
  const [rangeL, setRangeL] = useState("");
  const [rangeR, setRangeR] = useState("");
  const [highlightUpdate, setHighlightUpdate] = useState([]);
  const [highlightAdd, setHighlightAdd] = useState([]);
  const [highlightSub, setHighlightSub] = useState([]);
  const [busy, setBusy] = useState(false);

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  const clearHighlights = () => {
    setHighlightUpdate([]);
    setHighlightAdd([]);
    setHighlightSub([]);
  };

  const buildRandom = () => {
    if (busy) return;
    const newArr = randomArray();
    setArr(newArr);
    setBit(buildFenwick(newArr));
    setMessage(`Built a Fenwick tree over [${newArr.join(", ")}]`);
    clearHighlights();
  };

  const handleUpdate = () => {
    if (busy || !bit) return;
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
    clearHighlights();

    const delta = value - arr[index];
    const newBit = [...bit];
    const path = [];
    updateFenwick(newBit, N, index, delta, path);
    const newArr = [...arr];
    newArr[index] = value;

    let i = 0;
    const revealStep = () => {
      setHighlightUpdate(path.slice(0, i + 1));
      setMessage(`Updating index ${index} by ${delta >= 0 ? "+" : ""}${delta}, adding to BIT[${path[i]}]`);
      i++;
      if (i < path.length) {
        setTimeout(revealStep, STEP_DELAY);
      } else {
        setTimeout(() => {
          setBit(newBit);
          setArr(newArr);
          setMessage(`Index ${index} updated to ${value}, propagated to ${path.length} BIT node(s): [${path.join(", ")}]`);
          setTimeout(() => setHighlightUpdate([]), 900);
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    revealStep();
  };

  const handlePrefixQuery = () => {
    if (busy || !bit) return;
    const index = parseInt(queryIndex, 10);
    if (Number.isNaN(index) || index < 0 || index >= N) {
      setMessage(`Enter an index between 0 and ${N - 1}`);
      return;
    }
    setBusy(true);
    clearHighlights();

    const path = [];
    const sum = prefixSum(bit, index, path);

    let i = 0;
    const revealStep = () => {
      setHighlightAdd(path.slice(0, i + 1));
      setMessage(`Summing BIT[${path[i]}], accumulated so far`);
      i++;
      if (i < path.length) {
        setTimeout(revealStep, STEP_DELAY);
      } else {
        setTimeout(() => {
          setMessage(`Prefix sum [0, ${index}] = ${sum}`);
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    revealStep();
  };

  const handleRangeQuery = () => {
    if (busy || !bit) return;
    const l = parseInt(rangeL, 10);
    const r = parseInt(rangeR, 10);
    if (Number.isNaN(l) || Number.isNaN(r) || l < 0 || r >= N || l > r) {
      setMessage(`Enter a valid range with 0 <= l <= r <= ${N - 1}`);
      return;
    }
    setBusy(true);
    clearHighlights();

    const pathR = [];
    const sumR = prefixSum(bit, r, pathR);
    const pathL = [];
    const sumL = l > 0 ? prefixSum(bit, l - 1, pathL) : 0;

    let i = 0;
    const revealAdd = () => {
      setHighlightAdd(pathR.slice(0, i + 1));
      setMessage(`Computing prefix sum [0, ${r}], summing BIT[${pathR[i]}]`);
      i++;
      if (i < pathR.length) {
        setTimeout(revealAdd, STEP_DELAY);
      } else {
        setTimeout(revealSub, STEP_DELAY);
      }
    };

    let j = 0;
    const revealSub = () => {
      if (pathL.length === 0) {
        finish();
        return;
      }
      setHighlightSub(pathL.slice(0, j + 1));
      setMessage(`Computing prefix sum [0, ${l - 1}] to subtract, summing BIT[${pathL[j]}]`);
      j++;
      if (j < pathL.length) {
        setTimeout(revealSub, STEP_DELAY);
      } else {
        setTimeout(finish, STEP_DELAY);
      }
    };

    const finish = () => {
      setMessage(`Range sum [${l}, ${r}] = prefixSum(${r}) - prefixSum(${l - 1}) = ${sumR} - ${sumL} = ${sumR - sumL}`);
      setBusy(false);
    };

    revealAdd();
  };

  const reset = () => {
    if (busy) return;
    setArr(null);
    setBit(null);
    setMessage("No Fenwick tree yet, build one over a random array");
    setUpdateIndex("");
    setUpdateValue("");
    setQueryIndex("");
    setRangeL("");
    setRangeR("");
    clearHighlights();
  };

  const maxLevel = Math.ceil(Math.log2(N + 1));
  const arrayWidth = N * BOX + (N - 1) * GAP;

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Build a Fenwick tree (Binary Indexed Tree), then update a value or query a range
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
              disabled={busy || !bit}
              className="w-28 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <input
              type="number"
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              placeholder="new value"
              disabled={busy || !bit}
              className="w-28 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <button
              onClick={handleUpdate}
              disabled={busy || !bit}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition disabled:opacity-40"
            >
              <RefreshCw size={15} />
              Update
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="number"
              value={queryIndex}
              onChange={(e) => setQueryIndex(e.target.value)}
              placeholder="up to index"
              disabled={busy || !bit}
              className="w-28 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <button
              onClick={handlePrefixQuery}
              disabled={busy || !bit}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition disabled:opacity-40"
            >
              <Search size={15} />
              Prefix Sum
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="number"
              value={rangeL}
              onChange={(e) => setRangeL(e.target.value)}
              placeholder="from l"
              disabled={busy || !bit}
              className="w-24 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <input
              type="number"
              value={rangeR}
              onChange={(e) => setRangeR(e.target.value)}
              placeholder="to r"
              disabled={busy || !bit}
              className="w-24 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
            />
            <button
              onClick={handleRangeQuery}
              disabled={busy || !bit}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-40"
            >
              <ArrowRightLeft size={15} />
              Range Sum
            </button>
            <button
              onClick={reset}
              disabled={busy}
              className="ml-auto px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-40"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-center text-sm">
            {message}
          </div>

          {arr && bit ? (
            <div className="overflow-auto">
              <div style={{ minWidth: arrayWidth }} className="mx-auto">
                {/* Original array */}
                <div className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 mb-1 text-center">Original array (0-indexed)</div>
                <div className="flex gap-1.5 justify-center mb-1" style={{ gap: GAP }}>
                  {arr.map((v, i) => (
                    <div
                      key={i}
                      style={{ width: BOX, height: BOX }}
                      className="flex items-center justify-center rounded-lg text-sm font-bold border-2 bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                    >
                      {v}
                    </div>
                  ))}
                </div>
                <div className="flex gap-1.5 justify-center mb-4" style={{ gap: GAP }}>
                  {arr.map((_, i) => (
                    <div key={i} style={{ width: BOX }} className="text-center text-[10px] text-gray-400 dark:text-gray-500">
                      {i}
                    </div>
                  ))}
                </div>

                {/* BIT array */}
                <div className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 mb-1 text-center">Fenwick (BIT) array (1-indexed)</div>
                <div className="flex justify-center mb-1" style={{ gap: GAP }}>
                  {bit.slice(1).map((v, idx) => {
                    const i = idx + 1;
                    const isUpdate = highlightUpdate.includes(i);
                    const isAdd = highlightAdd.includes(i);
                    const isSub = highlightSub.includes(i);
                    return (
                      <div
                        key={i}
                        style={{ width: BOX, height: BOX }}
                        className={`flex items-center justify-center rounded-lg text-sm font-bold border-2 transition-colors ${
                          isUpdate
                            ? "bg-violet-100 dark:bg-violet-900/40 border-violet-500 text-violet-700 dark:text-violet-300"
                            : isAdd
                            ? "bg-amber-100 dark:bg-amber-900/40 border-amber-500 text-amber-700 dark:text-amber-300"
                            : isSub
                            ? "bg-rose-100 dark:bg-rose-900/40 border-rose-500 text-rose-700 dark:text-rose-300"
                            : "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                        }`}
                      >
                        {v}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center mb-6" style={{ gap: GAP }}>
                  {bit.slice(1).map((_, idx) => (
                    <div key={idx} style={{ width: BOX }} className="text-center text-[10px] text-gray-400 dark:text-gray-500">
                      {idx + 1}
                    </div>
                  ))}
                </div>

                {/* Responsibility ladder */}
                <div className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 mb-1 text-center">
                  Which original range each BIT index is responsible for
                </div>
                <svg width={arrayWidth} height={maxLevel * 24 + 10} className="mx-auto block">
                  {Array.from({ length: N }, (_, idx) => idx + 1).map((i) => {
                    const width = lowbit(i);
                    const level = Math.log2(width);
                    const startCol = i - width; // 0-indexed start column
                    const x = startCol * (BOX + GAP);
                    const barWidth = width * BOX + (width - 1) * GAP;
                    const y = maxLevel * 24 - level * 24 - 16;
                    const isHighlighted = highlightUpdate.includes(i) || highlightAdd.includes(i) || highlightSub.includes(i);
                    const isUpdate = highlightUpdate.includes(i);
                    const isSub = highlightSub.includes(i);
                    const fill = isUpdate ? "#8b5cf6" : isSub ? "#f43f5e" : isHighlighted ? "#f59e0b" : "#93c5fd";
                    return (
                      <g key={i}>
                        <rect x={x} y={y} width={barWidth} height="16" rx="4" fill={fill} opacity={isHighlighted ? 0.9 : 0.55} />
                        <text x={x + barWidth / 2} y={y + 11} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e293b">
                          BIT[{i}]
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-16">
              No Fenwick tree yet, build one over a random array
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border-2 border-blue-300 bg-blue-50 dark:bg-blue-950/40 inline-block"></span>
              BIT node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-violet-500 inline-block"></span>
              Update path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              Prefix sum path (added)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              Subtracted prefix (for range queries)
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FenwickVisualizer;
