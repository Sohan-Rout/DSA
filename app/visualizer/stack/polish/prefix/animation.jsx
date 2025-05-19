'use client';
import React, { useState, useEffect } from 'react';

import Footer from '@/app/components/footer';
import ExploreOther from '@/app/components/ui/exploreOther';
import Content from '@/app/visualizer/stack/polish/prefix/content';
import CodeBlock from '@/app/visualizer/stack/polish/prefix/codeBlock';
import GoBackButton from "@/app/components/ui/goback";
import Quiz from '@/app/visualizer/stack/polish/postfix/quiz';
import BackToTop from '@/app/components/ui/backtotop';

const InfixToPrefixVisualizer = () => {
  const [infix, setInfix] = useState('(A+B)*C');
  const [prefix, setPrefix] = useState('');
  const [stack, setStack] = useState([]);
  const [output, setOutput] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Enter an infix expression and click Convert');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // Default speed: 1 second per step

  const precedence = {
    '^': 4,
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2,
  };

  const reset = () => {
    setStack([]);
    setOutput([]);
    setPrefix('');
    setCurrentStep(0);
    setSteps([]);
    setMessage('Enter an infix expression and click Convert');
    setOperation(null);
    setIsPlaying(false);
  };

  const convertInfixToPrefix = () => {
    if (!infix.trim()) {
      setMessage('Please enter an infix expression');
      return;
    }

    setIsProcessing(true);
    reset();
    
    const conversionSteps = [];
    let tempStack = [];
    let tempOutput = [];

    // Step 1: Reverse the infix expression
    const reversedInfix = infix.split('').reverse().join('');
    conversionSteps.push({
      stack: [],
      output: [],
      char: '',
      action: 'Reverse infix',
      description: `Reversed infix expression: ${reversedInfix}`,
      infix: reversedInfix
    });

    // Step 2: Swap parentheses
    const modifiedInfix = reversedInfix.replace(/[()]/g, match => match === '(' ? ')' : '(');
    conversionSteps.push({
      stack: [],
      output: [],
      char: '',
      action: 'Swap parentheses',
      description: `Swapped parentheses: ${modifiedInfix}`,
      infix: modifiedInfix
    });

    // Step 3: Convert to postfix
    for (let i = 0; i < modifiedInfix.length; i++) {
      const char = modifiedInfix[i];
      
      // If operand
      if (/[a-zA-Z0-9]/.test(char)) {
        tempOutput.push(char);
        conversionSteps.push({
          stack: [...tempStack],
          output: [...tempOutput],
          char,
          action: 'Add operand',
          description: `Added operand "${char}" to output`
        });
      }
      // If '('
      else if (char === '(') {
        tempStack.push(char);
        conversionSteps.push({
          stack: [...tempStack],
          output: [...tempOutput],
          char,
          action: 'Push to stack',
          description: `Pushed "(" to stack`
        });
      }
      // If ')'
      else if (char === ')') {
        while (tempStack.length && tempStack[tempStack.length - 1] !== '(') {
          const popped = tempStack.pop();
          tempOutput.push(popped);
          conversionSteps.push({
            stack: [...tempStack],
            output: [...tempOutput],
            char: popped,
            action: 'Pop from stack',
            description: `Popped operator "${popped}" from stack`
          });
        }
        tempStack.pop(); // Remove '('
        conversionSteps.push({
          stack: [...tempStack],
          output: [...tempOutput],
          char: '(',
          action: 'Remove from stack',
          description: 'Removed "(" from stack'
        });
      }
      // If operator
      else {
        while (
          tempStack.length && 
          tempStack[tempStack.length - 1] !== '(' && 
          precedence[char] <= precedence[tempStack[tempStack.length - 1]]
        ) {
          const popped = tempStack.pop();
          tempOutput.push(popped);
          conversionSteps.push({
            stack: [...tempStack],
            output: [...tempOutput],
            char: popped,
            action: 'Pop higher precedence',
            description: `Popped higher precedence operator "${popped}"`
          });
        }
        tempStack.push(char);
        conversionSteps.push({
          stack: [...tempStack],
          output: [...tempOutput],
          char,
          action: 'Push operator',
          description: `Pushed operator "${char}" to stack`
        });
      }
    }

    // Pop remaining operators
    while (tempStack.length) {
      const popped = tempStack.pop();
      tempOutput.push(popped);
      conversionSteps.push({
        stack: [...tempStack],
        output: [...tempOutput],
        char: popped,
        action: 'Pop remaining',
        description: `Popped remaining operator "${popped}"`
      });
    }

    // Step 4: Reverse the postfix to get prefix
    const prefixResult = tempOutput.reverse().join(' ');
    conversionSteps.push({
      stack: [],
      output: [...tempOutput.reverse()],
      char: '',
      action: 'Reverse postfix',
      description: `Reversed postfix to get prefix: ${prefixResult}`
    });

    setSteps(conversionSteps);
    setPrefix(prefixResult);
    setIsProcessing(false);
    setIsPlaying(true); // Start automatic playback
  };

  const playNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const playPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const jumpToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
    if (stepIndex === steps.length - 1) {
      setIsPlaying(false);
    }
  };

  // Handle automatic playback
  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        playNextStep();
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  // Update visualization based on current step
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      setIsAnimating(true);
      const step = steps[currentStep];
      setStack(step.stack || []);
      setOutput(step.output || []);
      setOperation(step.action);
      setMessage(step.description);

      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentStep, steps]);

  return (
<div className="min-h-screen max-h-auto bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200">
        <main className="container mx-auto px-6 pt-16 pb-4">

          { /* go back block here */}
          <div className="mt-10 sm:mt-10">
            <GoBackButton />
          </div>

          { /* main logic here */}
          <h1 className="text-4xl md:text-4xl mt-6 ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
            <span className="text-black dark:text-white">Infix to Prefix</span>
          </h1>
          <div className='bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl mt-2 mb-5'></div>
          <Content />
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize the conversion from infix to prefix notation
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Input and Controls */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                value={infix}
                onChange={(e) => setInfix(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter infix expression (e.g., (A+B)*C)"
              />
              <button
                onClick={convertInfixToPrefix}
                disabled={isProcessing}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Converting...' : 'Convert'}
              </button>
              <button
                onClick={reset}
                className="px-6 py-2 bg-none text-black border border-black dark:border-white dark:text-white rounded-md"
              >
                Reset
              </button>
            </div>

            {/* Playback Controls */}
            {steps.length > 0 && (
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-between items-center">
                  <button
                    onClick={playPrevStep}
                    disabled={currentStep === 0 || isAnimating}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button
                    onClick={playNextStep}
                    disabled={currentStep >= steps.length - 1 || isAnimating}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm">Speed:</span>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
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

                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Operation Status */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
            <h2 className="text-xl font-semibold mb-4">Conversion Status</h2>
            
            {operation && (
              <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {operation}
              </div>
            )}

            {message && (
              <div className={`p-3 rounded-lg ${
                message.includes('Added') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                message.includes('Popped') ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 
                message.includes('Pushed') ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}>
                {message}
              </div>
            )}

            {prefix && currentStep === steps.length - 1 && (
              <div className="mt-4 p-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                <div className="font-bold">Prefix Result:</div>
                <div className="text-2xl font-mono">{prefix}</div>
              </div>
            )}
          </div>

          {/* Visualizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Stack Visualization */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Stack</h2>
              <div className="flex flex-col items-center min-h-[200px]">
                <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  {stack.length > 0 ? '↑ Top' : ''}
                </div>
                <div className="w-32 relative">
                  {stack.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Stack is empty
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {stack.map((item, index) => (
                        <div 
                          key={index}
                          className={`p-3 border-2 rounded text-center font-medium transition-all duration-300 ${
                            index === stack.length - 1 ? 
                              'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700' : 
                              'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                          } ${
                            isAnimating && index === stack.length - 1 ? 'animate-bounce' : ''
                          }`}
                        >
                          {item}
                          {index === stack.length - 1 && (
                            <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                              (Top)
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {stack.length > 0 ? '↓ Bottom' : ''}
                </div>
              </div>
            </div>

            {/* Output Visualization */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Output</h2>
              <div className="min-h-[200px] p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex flex-wrap gap-2">
                  {output.length === 0 ? (
                    <div className="text-gray-500 dark:text-gray-400 w-full text-center py-8">
                      Output will appear here
                    </div>
                  ) : (
                    output.map((item, index) => (
                      <div 
                        key={index}
                        className={`w-10 h-10 flex items-center justify-center rounded-md bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 font-mono font-bold
                          ${isAnimating && index === output.length - 1 ? 'animate-pulse' : ''}`}
                      >
                        {item}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-step Table */}
          {steps.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
              <h2 className="text-xl font-semibold mb-4">Conversion Steps</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Step</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Character</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {steps.map((step, index) => (
                      <tr 
                        key={index} 
                        className={`cursor-pointer ${currentStep === index ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        onClick={() => jumpToStep(index)}
                      >
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{step.action}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">{step.char || '-'}</td>
                        <td className="px-4 py-2 text-sm">{step.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        { /* quiz block here */}
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mt-8 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />

        <CodeBlock/>
        <ExploreOther
          title="Explore other conversions"
          links={[
            { text: "Infix to Postfix", url: "./postfix" },
          ]}
        />
      </main>
      <div className="bg-gray-700 z-10 h-[1px]"></div>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default InfixToPrefixVisualizer;