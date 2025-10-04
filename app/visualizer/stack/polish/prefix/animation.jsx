"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

/* ----------  tiny animated bits  ---------- */
const AnimatedStackItem = ({ char, isTop }) => (
  <motion.div
    initial={{ y: -30, opacity: 0, scale: 0.8 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    exit={{ y: 30, opacity: 0, scale: 0.8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`p-3 border-2 rounded text-center font-medium ${
      isTop
        ? "bg-blue-100 dark:bg-blue-900 border-blue-300"
        : "bg-white dark:bg-gray-700 border-gray-200"
    }`}
  >
    {char}
    {isTop && <div className="text-xs mt-1 text-gray-500">(Top)</div>}
  </motion.div>
);

const AnimatedOutputToken = ({ char }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className="w-10 h-10 flex items-center justify-center rounded-md
               bg-green-100 dark:bg-green-500 border border-white
               text-green-800 dark:text-black font-mono font-bold"
  >
    {char}
  </motion.div>
);

/* ----------  main component  ---------- */
const InfixToPrefixVisualizer = () => {
  /* =======  state  ======= */
  const [infix, setInfix] = useState("(A+B)*C");
  const [prefix, setPrefix] = useState("");
  const [stack, setStack] = useState([]);
  const [output, setOutput] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState("Enter an infix expression and click Convert");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const precedence = { "^": 4, "*": 3, "/": 3, "+": 2, "-": 2 };

  /* ----------  helpers  ---------- */
  const reset = () => {
    setStack([]);
    setOutput([]);
    setPrefix("");
    setCurrentStep(0);
    setSteps([]);
    setMessage("Enter an infix expression and click Convert");
    setOperation(null);
    setIsPlaying(false);
  };

  const convertInfixToPrefix = () => {
    if (!infix.trim()) {
      setMessage("Please enter an infix expression");
      return;
    }
    setIsProcessing(true);
    reset();

    const conversionSteps = [];
    let tempStack = [];
    let tempOutput = [];

    /* 1. reverse */
    const reversed = infix.split("").reverse().join("");
    conversionSteps.push({
      stack: [],
      output: [],
      char: "",
      action: "Reverse infix",
      description: `Reversed: ${reversed}`,
    });

    /* 2. swap parentheses */
    const swapped = reversed.replace(/[()]/g, (c) => (c === "(" ? ")" : "("));
    conversionSteps.push({
      stack: [],
      output: [],
      char: "",
      action: "Swap parentheses",
      description: `Swapped: ${swapped}`,
    });

    /* 3. postfix on swapped */
    for (const ch of swapped) {
      if (/[a-zA-Z0-9]/.test(ch)) {
        tempOutput.push(ch);
        conversionSteps.push({
          stack: [...tempStack],
          output: [...tempOutput],
          char: ch,
          action: "Add operand",
          description: `Added operand "${ch}"`,
        });
      } else if (ch === "(") {
        tempStack.push(ch);
        conversionSteps.push({
          stack: [...tempStack],
          output: [...tempOutput],
          char: ch,
          action: "Push to stack",
          description: `Pushed "("`,
        });
      } else if (ch === ")") {
        while (tempStack.length && tempStack[tempStack.length - 1] !== "(") {
          const popped = tempStack.pop();
          tempOutput.push(popped);
          conversionSteps.push({
            stack: [...tempStack],
            output: [...tempOutput],
            char: popped,
            action: "Pop from stack",
            description: `Popped "${popped}"`,
          });
        }
        tempStack.pop(); // remove '('
        conversionSteps.push({
          stack: [...tempStack],
          output: [...tempOutput],
          char: "(",
          action: "Remove from stack",
          description: `Removed "("`,
        });
      } else {
        while (
          tempStack.length &&
          tempStack[tempStack.length - 1] !== "(" &&
          precedence[ch] <= precedence[tempStack[tempStack.length - 1]]
        ) {
          const popped = tempStack.pop();
          tempOutput.push(popped);
          conversionSteps.push({
            stack: [...tempStack],
            output: [...tempOutput],
            char: popped,
            action: "Pop higher precedence",
            description: `Popped higher precedence "${popped}"`,
          });
        }
        tempStack.push(ch);
        conversionSteps.push({
          stack: [...tempStack],
          output: [...tempOutput],
          char: ch,
          action: "Push operator",
          description: `Pushed "${ch}"`,
        });
      }
    }

    while (tempStack.length) {
      const popped = tempStack.pop();
      tempOutput.push(popped);
      conversionSteps.push({
        stack: [...tempStack],
        output: [...tempOutput],
        char: popped,
        action: "Pop remaining",
        description: `Popped remaining "${popped}"`,
      });
    }

    /* 4. reverse to get prefix */
    const prefixResult = tempOutput.reverse().join(" ");
    conversionSteps.push({
      stack: [],
      output: [...tempOutput],
      char: "",
      action: "Reverse postfix",
      description: `Reversed to get prefix: ${prefixResult}`,
    });

    setSteps(conversionSteps);
    setPrefix(prefixResult);
    setIsProcessing(false);
    setIsPlaying(true);
  };

  /* ----------  playback  ---------- */
  const playNextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
    else setIsPlaying(false);
  };
  const playPrevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };
  const togglePlayPause = () => setIsPlaying((p) => !p);
  const jumpToStep = (idx) => {
    setCurrentStep(idx);
    if (idx === steps.length - 1) setIsPlaying(false);
  };

  useEffect(() => {
    let t;
    if (isPlaying && currentStep < steps.length - 1) t = setTimeout(playNextStep, speed);
    else if (currentStep >= steps.length - 1) setIsPlaying(false);
    return () => clearTimeout(t);
  }, [isPlaying, currentStep, steps.length, speed]);

  /* ----------  GSAP flash on message change  ---------- */
  const statusRef = useRef();
  useEffect(() => {
    if (statusRef.current)
      gsap.fromTo(statusRef.current, { scale: 0.95, opacity: 0.7 }, { scale: 1, opacity: 1, duration: 0.3 });
  }, [message]);

  useEffect(() => {
    if (steps.length && currentStep < steps.length) {
      setIsAnimating(true);
      const s = steps[currentStep];
      setStack(s.stack || []);
      setOutput(s.output || []);
      setOperation(s.action);
      setMessage(s.description);
      const t = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(t);
    }
  }, [currentStep, steps]);

  /* ----------  render  ---------- */
  return (
    <main className="container mx-auto px-6">
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Visualize the conversion from infix to prefix notation
      </p>
      <div className="max-w-4xl mx-auto">
        {/* Input & Controls */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={infix}
              onChange={(e) => setInfix(e.target.value)}
              placeholder="Enter infix expression (e.g., (A+B)*C)"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:text-white"
            />
            <button
              onClick={convertInfixToPrefix}
              disabled={isProcessing}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? "Converting..." : "Convert"}
            </button>
            <button onClick={reset} className="px-6 py-2 bg-red-500 text-white rounded-md">
              Reset
            </button>
          </div>

          {steps.length > 0 && (
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={playPrevStep}
                  disabled={currentStep === 0 || isAnimating}
                  className="px-4 py-2 bg-gray-200 dark:bg-neutral-900 rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <button onClick={togglePlayPause} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  onClick={playNextStep}
                  disabled={currentStep >= steps.length - 1 || isAnimating}
                  className="px-4 py-2 bg-gray-200 dark:bg-neutral-900 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">Speed:</span>
                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-neutral-900"
                >
                  <option value={2000}>Slow</option>
                  <option value={1000}>Normal</option>
                  <option value={500}>Fast</option>
                  <option value={250}>Very Fast</option>
                </select>
                <div className="text-sm text-gray-600 dark:text-gray-400 ml-auto">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-neutral-900 rounded-full h-2.5">
                <motion.div
                  className="bg-blue-600 h-2.5 rounded-full"
                  initial={false}
                  animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 80 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Status panel */}
        <div ref={statusRef} className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
          <h2 className="text-xl font-semibold mb-4">Conversion Status</h2>
          {operation && (
            <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {operation}
            </div>
          )}
          {message && (
            <div
              className={`p-3 rounded-lg ${
                message.includes("Added")
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  : message.includes("Popped")
                  ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                  : message.includes("Pushed")
                  ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                  : "bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200"
              }`}
            >
              {message}
            </div>
          )}
          {prefix && currentStep === steps.length - 1 && (
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-4 p-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
            >
              <div className="font-bold">Prefix Result:</div>
              <div className="text-2xl font-mono">{prefix}</div>
            </motion.div>
          )}
        </div>

        {/* Visualisations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Stack */}
          <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Stack</h2>
            <div className="flex flex-col items-center min-h-[200px]">
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">{stack.length > 0 ? "↑ Top" : ""}</div>
              <div className="w-32 relative">
                <AnimatePresence>
                  {stack.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">Stack is empty</div>
                  ) : (
                    <div className="space-y-1">
                      {stack.map((item, i) => (
                        <AnimatedStackItem key={`${i}-${item}`} char={item} isTop={i === stack.length - 1} />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{stack.length > 0 ? "↓ Bottom" : ""}</div>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Output</h2>
            <div className="min-h-[200px] p-4 bg-gray-50 dark:bg-neutral-900 rounded">
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {output.length === 0 ? (
                    <div className="text-gray-500 dark:text-gray-400 w-full text-center py-8">Output will appear here</div>
                  ) : (
                    output.map((c, i) => <AnimatedOutputToken key={`${i}-${c}`} char={c} />)
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Step table */}
        {steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">Conversion Steps</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-neutral-950">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Step</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Character</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {steps.map((step, idx) => (
                    <motion.tr
                      key={idx}
                      onClick={() => jumpToStep(idx)}
                      className={`cursor-pointer ${
                        currentStep === idx ? "bg-blue-50 dark:bg-neutral-950" : "hover:bg-gray-50 dark:hover:bg-neutral-950"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">{idx + 1}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{step.action}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">{step.char || "-"}</td>
                      <td className="px-4 py-2 text-sm">{step.description}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default InfixToPrefixVisualizer;