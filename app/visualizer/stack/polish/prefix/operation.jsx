'use client';
import { useState } from 'react';

const Content = () => {
  const [infix, setInfix] = useState('(A+B)*(C-D)');
  const [prefix, setPrefix] = useState('');
  const [steps, setSteps] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const convertInfixToPrefix = () => {
    setIsProcessing(true);
    setSteps([]);
    
    // Step 1: Reverse the infix expression
    const reversedInfix = infix.split('').reverse().join('');
    addStep(1, 'Reverse the infix expression', infix, reversedInfix);

    // Step 2: Replace '(' with ')' and vice versa
    const modifiedInfix = reversedInfix.replace(/[()]/g, match => match === '(' ? ')' : '(');
    addStep(2, 'Swap parentheses', reversedInfix, modifiedInfix);

    // Step 3: Convert to postfix
    const postfix = infixToPostfix(modifiedInfix);
    addStep(3, 'Convert to postfix', modifiedInfix, postfix);

    // Step 4: Reverse the postfix to get prefix
    const prefixResult = postfix.split('').reverse().join('');
    addStep(4, 'Reverse the postfix to get prefix', postfix, prefixResult);

    setPrefix(prefixResult);
    setIsProcessing(false);
  };

  const infixToPostfix = (exp) => {
    let output = '';
    const stack = [];
    const precedence = {
      '^': 4,
      '*': 3,
      '/': 3,
      '+': 2,
      '-': 2,
    };

    const subSteps = [];
    
    for (let i = 0; i < exp.length; i++) {
      const char = exp[i];
      
      // If operand, add to output
      if (/[a-zA-Z0-9]/.test(char)) {
        output += char;
        subSteps.push({
          action: 'Add operand',
          char,
          output,
          stack: [...stack]
        });
      }
      // If '(', push to stack
      else if (char === '(') {
        stack.push(char);
        subSteps.push({
          action: 'Push to stack',
          char,
          output,
          stack: [...stack]
        });
      }
      // If ')', pop until '('
      else if (char === ')') {
        while (stack.length && stack[stack.length - 1] !== '(') {
          output += stack.pop();
          subSteps.push({
            action: 'Pop from stack',
            char: output[output.length - 1],
            output,
            stack: [...stack]
          });
        }
        stack.pop(); // Remove '('
        subSteps.push({
          action: 'Remove from stack',
          char: '(',
          output,
          stack: [...stack]
        });
      }
      // If operator
      else {
        while (
          stack.length && 
          stack[stack.length - 1] !== '(' && 
          precedence[char] <= precedence[stack[stack.length - 1]]
        ) {
          output += stack.pop();
          subSteps.push({
            action: 'Pop higher precedence',
            char: output[output.length - 1],
            output,
            stack: [...stack]
          });
        }
        stack.push(char);
        subSteps.push({
          action: 'Push operator',
          char,
          output,
          stack: [...stack]
        });
      }
    }

    // Pop remaining operators
    while (stack.length) {
      output += stack.pop();
      subSteps.push({
        action: 'Pop remaining',
        char: output[output.length - 1],
        output,
        stack: [...stack]
      });
    }

    // Add all substeps to main steps
    setSteps(prev => [
      ...prev,
      {
        id: 3,
        description: 'Convert to postfix',
        input: exp,
        output,
        subSteps
      }
    ]);

    return output;
  };

  const addStep = (stepNumber, description, input, output) => {
    setSteps(prev => [
      ...prev,
      {
        id: stepNumber,
        description,
        input,
        output,
        subSteps: []
      }
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      convertInfixToPrefix();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-6">
          <label htmlFor="infix" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Infix Expression
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="infix"
              value={infix}
              onChange={(e) => setInfix(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., (A+B)*(C-D)"
            />
            <button
              onClick={convertInfixToPrefix}
              disabled={isProcessing}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Converting...' : 'Convert'}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Use letters, numbers, and operators: + - * / ^ ( )
          </p>
        </div>

        {prefix && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Prefix Result</h3>
            <div className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
              {prefix}
            </div>
          </div>
        )}
      </div>

      {steps.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Conversion Steps</h3>
          
          {/* Main Steps Table */}
          <div className="mb-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Step</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Input</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Output</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {steps.filter(step => !step.subSteps.length).map((step) => (
                  <tr key={step.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {step.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {step.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                      {step.input}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600 dark:text-blue-400">
                      {step.output}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detailed Sub-steps for Postfix Conversion */}
          {steps.find(step => step.subSteps.length) && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Postfix Conversion Details</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Character</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stack</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Output</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {steps.find(step => step.subSteps.length)?.subSteps.map((subStep, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {subStep.action}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                          {subStep.char}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                          [{subStep.stack.join(', ')}]
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600 dark:text-blue-400">
                          {subStep.output}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Content;