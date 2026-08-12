"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { Hammer, Play, Shuffle, RotateCcw } from "lucide-react";

const tokenize = (input) => {
  const tokens = [];
  let i = 0;
  while (i < input.length) {
    const c = input[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let num = "";
      while (i < input.length && /[0-9.]/.test(input[i])) {
        num += input[i];
        i++;
      }
      tokens.push({ type: "num", value: parseFloat(num) });
      continue;
    }
    if ("+-*/()".includes(c)) {
      tokens.push({ type: c });
      i++;
      continue;
    }
    throw new Error(`Unexpected character "${c}"`);
  }
  return tokens;
};

// Standard recursive-descent parser respecting + - (lowest precedence),
// * / (higher precedence), and parentheses. Grammar:
// expression := term (('+'|'-') term)*
// term       := factor (('*'|'/') factor)*
// factor     := NUMBER | '(' expression ')'
const parseExpression = (input) => {
  const tokens = tokenize(input);
  let pos = 0;
  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];

  const parseExpr = () => {
    let node = parseTerm();
    while (peek() && (peek().type === "+" || peek().type === "-")) {
      const op = consume().type;
      node = { type: "op", op, left: node, right: parseTerm() };
    }
    return node;
  };
  const parseTerm = () => {
    let node = parseFactor();
    while (peek() && (peek().type === "*" || peek().type === "/")) {
      const op = consume().type;
      node = { type: "op", op, left: node, right: parseFactor() };
    }
    return node;
  };
  const parseFactor = () => {
    const t = peek();
    if (!t) throw new Error("Unexpected end of expression");
    if (t.type === "(") {
      consume();
      const node = parseExpr();
      if (!peek() || peek().type !== ")") throw new Error("Missing closing parenthesis");
      consume();
      return node;
    }
    if (t.type === "num") {
      consume();
      return { type: "num", value: t.value };
    }
    throw new Error(`Unexpected token "${t.type}"`);
  };

  const result = parseExpr();
  if (pos < tokens.length) throw new Error("Unexpected trailing input");

  let idCounter = 0;
  const assignIds = (node) => {
    node.id = idCounter++;
    if (node.left) assignIds(node.left);
    if (node.right) assignIds(node.right);
  };
  assignIds(result);

  return result;
};

const toPrefix = (node) => (node.type === "num" ? String(node.value) : `${node.op} ${toPrefix(node.left)} ${toPrefix(node.right)}`);
const toPostfix = (node) => (node.type === "num" ? String(node.value) : `${toPostfix(node.left)} ${toPostfix(node.right)} ${node.op}`);
const toInfix = (node) => (node.type === "num" ? String(node.value) : `(${toInfix(node.left)} ${node.op} ${toInfix(node.right)})`);

// Post-order evaluation: both children must resolve before the operator
// above them can combine their values.
const evaluateWithSteps = (node, steps) => {
  if (node.type === "num") return node.value;
  const leftVal = evaluateWithSteps(node.left, steps);
  const rightVal = evaluateWithSteps(node.right, steps);
  let result;
  switch (node.op) {
    case "+": result = leftVal + rightVal; break;
    case "-": result = leftVal - rightVal; break;
    case "*": result = leftVal * rightVal; break;
    case "/": result = leftVal / rightVal; break;
    default: result = NaN;
  }
  steps.push({ nodeId: node.id, leftVal, rightVal, op: node.op, result });
  return result;
};

const NODE_RADIUS = 22;
const LEVEL_HEIGHT = 78;

const layoutTree = (node, depth = 0, x = 300, y = 32, nodes = [], edges = []) => {
  if (!node) return { nodes, edges };
  const isLeaf = node.type === "num";
  nodes.push({ id: node.id, label: isLeaf ? String(node.value) : node.op, isLeaf, x, y, depth, isRoot: depth === 0 });

  const xOffset = Math.max(26, 130 / (depth + 1));

  if (node.left) {
    const leftX = x - xOffset;
    const leftY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: leftX, y2: leftY - NODE_RADIUS + 2 });
    layoutTree(node.left, depth + 1, leftX, leftY, nodes, edges);
  }
  if (node.right) {
    const rightX = x + xOffset;
    const rightY = y + LEVEL_HEIGHT;
    edges.push({ x1: x, y1: y + NODE_RADIUS - 2, x2: rightX, y2: rightY - NODE_RADIUS + 2 });
    layoutTree(node.right, depth + 1, rightX, rightY, nodes, edges);
  }

  return { nodes, edges };
};

const getSvgDimensions = (nodes) => {
  if (nodes.length === 0) return { width: 600, height: 220 };
  const xValues = nodes.map((n) => n.x);
  const yValues = nodes.map((n) => n.y);
  const padding = 40;
  return {
    width: Math.max(600, Math.max(...xValues) - Math.min(...xValues) + padding * 2),
    height: Math.max(220, Math.max(...yValues) + padding * 2),
  };
};

const STEP_DELAY = 650;
const EXAMPLE = "3 + 4 * (2 - 1)";

const SyntaxTreeVisualizer = () => {
  const [inputExpr, setInputExpr] = useState("");
  const [root, setRoot] = useState(null);
  const [error, setError] = useState("");
  const [results, setResults] = useState({});
  const [activeIds, setActiveIds] = useState([]);
  const [message, setMessage] = useState("Enter an arithmetic expression and parse it into a tree");
  const [busy, setBusy] = useState(false);
  const [traversals, setTraversals] = useState(null);

  const clearResult = () => {
    setResults({});
    setActiveIds([]);
  };

  const loadExample = () => {
    if (busy) return;
    setInputExpr(EXAMPLE);
    setRoot(null);
    setTraversals(null);
    setError("");
    clearResult();
    setMessage(`Loaded example "${EXAMPLE}"`);
  };

  const reset = () => {
    if (busy) return;
    setInputExpr("");
    setRoot(null);
    setTraversals(null);
    setError("");
    clearResult();
    setMessage("Enter an arithmetic expression and parse it into a tree");
  };

  const handleParse = () => {
    if (busy || !inputExpr.trim()) return;
    try {
      const tree = parseExpression(inputExpr);
      setRoot(tree);
      setTraversals({ prefix: toPrefix(tree), infix: toInfix(tree), postfix: toPostfix(tree) });
      setError("");
      clearResult();
      setMessage("Parsed into a syntax tree: operators are internal nodes, numbers are leaves");
    } catch (e) {
      setError(e.message);
      setRoot(null);
      setTraversals(null);
      clearResult();
    }
  };

  const handleEvaluate = () => {
    if (busy || !root) return;
    const steps = [];
    evaluateWithSteps(root, steps);
    setBusy(true);
    clearResult();

    let i = 0;
    const reveal = () => {
      const step = steps[i];
      setActiveIds([step.nodeId]);
      setResults((prev) => ({ ...prev, [step.nodeId]: step.result }));
      setMessage(`${step.leftVal} ${step.op} ${step.rightVal} = ${step.result}`);
      i++;
      if (i < steps.length) {
        setTimeout(reveal, STEP_DELAY);
      } else {
        setTimeout(() => {
          setActiveIds([]);
          setMessage(`Evaluation complete: result is ${steps[steps.length - 1].result}`);
          setBusy(false);
        }, STEP_DELAY);
      }
    };
    reveal();
  };

  const animateDropIn = (el) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" });
  };

  const { nodes, edges } = root ? layoutTree(root) : { nodes: [], edges: [] };
  const dims = getSvgDimensions(nodes);

  return (
    <main className="container mx-auto px-2 sm:px-6 pb-4">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Parse an arithmetic expression into a syntax tree, then evaluate it bottom-up
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4 space-y-3">
          <input
            type="text"
            value={inputExpr}
            onChange={(e) => setInputExpr(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleParse()}
            placeholder="Enter an expression, e.g. 3 + 4 * (2 - 1)"
            disabled={busy}
            className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition disabled:opacity-50"
          />

          <div className="flex gap-2">
            <button
              onClick={handleParse}
              disabled={busy || !inputExpr.trim()}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40"
            >
              <Hammer size={15} />
              Parse & Build Tree
            </button>
            <button
              onClick={handleEvaluate}
              disabled={busy || !root}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition disabled:opacity-40"
            >
              <Play size={15} />
              Evaluate
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
        <div
          className={`mb-4 p-3 rounded-lg text-center text-sm ${
            error
              ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200"
              : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
          }`}
        >
          {error || message}
        </div>

        {/* Tree */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
          <h2 className="text-xl font-semibold mb-4">Syntax Tree</h2>
          <div className="min-h-60 flex justify-center overflow-auto py-4 rounded-lg bg-[radial-gradient(circle,var(--color-gray-200)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,var(--color-neutral-800)_1px,transparent_1px)] bg-size-[16px_16px]">
            {nodes.length > 0 ? (
              <svg width={dims.width} height={dims.height} viewBox={`0 0 ${dims.width} ${dims.height}`} className="mx-auto">
                <defs>
                  <linearGradient id="syn-internal-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="syn-leaf-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="syn-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
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
                  const isActive = activeIds.includes(node.id);
                  const resolved = results[node.id];
                  return (
                    <g key={i} ref={animateDropIn}>
                      {node.isRoot && (
                        <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 6} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
                      )}
                      {isActive && (
                        <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 4} fill="none" stroke="#f59e0b" strokeWidth="3" />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={NODE_RADIUS}
                        fill={node.isLeaf ? "url(#syn-leaf-grad)" : "url(#syn-internal-grad)"}
                        stroke={node.isLeaf ? "#059669" : "#1d4ed8"}
                        strokeWidth="1.5"
                        filter="url(#syn-node-shadow)"
                      />
                      <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="700">
                        {node.label}
                      </text>
                      {resolved !== undefined && !node.isLeaf && (
                        <>
                          <rect x={node.x - 18} y={node.y - NODE_RADIUS - 20} width="36" height="14" rx="7" className="fill-emerald-100 dark:fill-emerald-900/50 stroke-emerald-400 dark:stroke-emerald-700" strokeWidth="1" />
                          <text x={node.x} y={node.y - NODE_RADIUS - 10} textAnchor="middle" fontSize="9" fontWeight="700" className="fill-emerald-700 dark:fill-emerald-300">
                            = {resolved}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg dark:border-gray-700 py-16">
                Parse an expression to see its tree here
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Operator node
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Operand (leaf)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-amber-500 inline-block"></span>
              Root
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block"></span>
              Currently combining
            </span>
          </div>
        </div>

        {/* Traversals */}
        {traversals && (
          <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Notations from the Same Tree</h2>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="w-32 font-medium text-gray-600 dark:text-gray-400">Prefix (pre-order):</span>
                <span className="font-mono bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded break-all">{traversals.prefix}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="w-32 font-medium text-gray-600 dark:text-gray-400">Infix (in-order):</span>
                <span className="font-mono bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded break-all">{traversals.infix}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="w-32 font-medium text-gray-600 dark:text-gray-400">Postfix (post-order):</span>
                <span className="font-mono bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded break-all">{traversals.postfix}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SyntaxTreeVisualizer;
