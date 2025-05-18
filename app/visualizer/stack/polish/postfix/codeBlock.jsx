'use client';
import { useState, useRef } from 'react';
import { FaCopy, FaCheck, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';

export const highlightCode = (code, language) => {
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  return hljs.highlight(code, { language: validLanguage }).value;
};

const CodeBlock = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const topRef = useRef(null);

  const languages = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
    { id: "c", name: "C" },
    { id: "cpp", name: "C++" },
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const codeExamples = {
    javascript: `// Postfix Evaluation using Stack (JavaScript)
function evaluatePostfix(expression) {
  let stack = [];
  
  for (let char of expression) {
    if (!isNaN(char)) {
      stack.push(parseInt(char));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      
      switch(char) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(Math.floor(a / b)); break;
      }
    }
  }
  return stack.pop();
}

// Example: "23*5+" becomes (2*3)+5 = 11
console.log(evaluatePostfix("23*5+")); // Output: 11`,

    python: `# Postfix Evaluation using Stack (Python)
def evaluate_postfix(expression):
    stack = []
    
    for char in expression:
        if char.isdigit():
            stack.append(int(char))
        else:
            b = stack.pop()
            a = stack.pop()
            
            if char == '+': stack.append(a + b)
            elif char == '-': stack.append(a - b)
            elif char == '*': stack.append(a * b)
            elif char == '/': stack.append(a // b)
    
    return stack.pop()

# Example: "23*5+" becomes (2*3)+5 = 11
print(evaluate_postfix("23*5+"))  # Output: 11`,

    java: `// Postfix Evaluation using Stack (Java)
import java.util.Stack;

public class PostfixEvaluator {
    public static int evaluatePostfix(String expression) {
        Stack<Integer> stack = new Stack<>();
        
        for (char c : expression.toCharArray()) {
            if (Character.isDigit(c)) {
                stack.push(c - '0');
            } else {
                int b = stack.pop();
                int a = stack.pop();
                
                switch (c) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(a / b); break;
                }
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        // Example: "23*5+" becomes (2*3)+5 = 11
        System.out.println(evaluatePostfix("23*5+"));  // Output: 11
    }
}`,

    c: `// Postfix Evaluation using Stack (C)
#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>

#define MAX_SIZE 100

typedef struct {
    int data[MAX_SIZE];
    int top;
} Stack;

void push(Stack *s, int val) {
    s->data[++s->top] = val;
}

int pop(Stack *s) {
    return s->data[s->top--];
}

int evaluatePostfix(char* expression) {
    Stack s = { .top = -1 };
    
    for (int i = 0; expression[i]; i++) {
        if (isdigit(expression[i])) {
            push(&s, expression[i] - '0');
        } else {
            int b = pop(&s);
            int a = pop(&s);
            
            switch (expression[i]) {
                case '+': push(&s, a + b); break;
                case '-': push(&s, a - b); break;
                case '*': push(&s, a * b); break;
                case '/': push(&s, a / b); break;
            }
        }
    }
    return pop(&s);
}

int main() {
    // Example: "23*5+" becomes (2*3)+5 = 11
    printf("%d\\n", evaluatePostfix("23*5+"));  // Output: 11
    return 0;
}`,

    cpp: `// Postfix Evaluation using Stack (C++)
#include <iostream>
#include <stack>
#include <string>
#include <cctype>
using namespace std;

int evaluatePostfix(const string& expression) {
    stack<int> st;
    
    for (char c : expression) {
        if (isdigit(c)) {
            st.push(c - '0');
        } else {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            
            switch (c) {
                case '+': st.push(a + b); break;
                case '-': st.push(a - b); break;
                case '*': st.push(a * b); break;
                case '/': st.push(a / b); break;
            }
        }
    }
    return st.top();
}

int main() {
    // Example: "23*5+" becomes (2*3)+5 = 11
    cout << evaluatePostfix("23*5+") << endl;  // Output: 11
    return 0;
}`
  };

    return (
        <div
          className="max-w-4xl mx-auto"
          ref={topRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-2 sm:mb-0">
                <FaCode className="text-blue-500 mr-2 text-lg" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  PostFix implementation using Stack
                </h3>
              </div>
    
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(codeExamples[selectedLanguage])}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors text-gray-800 dark:text-gray-100 text-sm font-medium"
                aria-label="Copy code"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center text-green-600 dark:text-green-400"
                    >
                      <FaCheck className="mr-1" /> Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <FaCopy className="mr-1" /> Copy Code
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
    
            {/* Language Selector */}
            <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
              {languages.map((lang) => (
                <motion.button
                  key={lang.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedLanguage === lang.id
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {lang.name}
                </motion.button>
              ))}
            </div>
    
            {/* Code Block */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLanguage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-x-auto p-4 bg-gray-900 text-white"
                >
                  <pre className="text-sm leading-relaxed">
                    <code
                      className={`language-${selectedLanguage}`}
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(
                          codeExamples[selectedLanguage],
                          selectedLanguage
                        ),
                      }}
                    />
                  </pre>
                </motion.div>
              </AnimatePresence>
    
              {/* Language indicator (shown on hover) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-3 right-3 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
                  >
                    {selectedLanguage.toUpperCase()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      );
    };
    
    export default CodeBlock;