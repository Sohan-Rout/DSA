'use client';
import { useState, useRef } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';

export const highlightCode = (code, language) => {
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  return hljs.highlight(code, { language: validLanguage }).value;
};

const PrefixEvaluator = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const topRef = useRef(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExamples = {
    javascript: `// Prefix Evaluation using Stack (JavaScript)
function evaluatePrefix(expression) {
  let stack = [];
  // Process expression in reverse order
  for (let i = expression.length - 1; i >= 0; i--) {
    const char = expression[i];
    if (!isNaN(char)) {
      stack.push(parseInt(char));
    } else {
      const a = stack.pop();
      const b = stack.pop();
      
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

// Example: "+*235" becomes (2*3)+5 = 11
console.log(evaluatePrefix("+*235")); // Output: 11`,

    python: `# Prefix Evaluation using Stack (Python)
def evaluate_prefix(expression):
    stack = []
    # Process expression in reverse order
    for char in reversed(expression):
        if char.isdigit():
            stack.append(int(char))
        else:
            a = stack.pop()
            b = stack.pop()
            
            if char == '+': stack.append(a + b)
            elif char == '-': stack.append(a - b)
            elif char == '*': stack.append(a * b)
            elif char == '/': stack.append(a // b)
    
    return stack.pop()

# Example: "+*235" becomes (2*3)+5 = 11
print(evaluate_prefix("+*235"))  # Output: 11`,

    java: `// Prefix Evaluation using Stack (Java)
import java.util.Stack;

public class PrefixEvaluator {
    public static int evaluatePrefix(String expression) {
        Stack<Integer> stack = new Stack<>();
        // Process expression in reverse order
        for (int i = expression.length() - 1; i >= 0; i--) {
            char c = expression.charAt(i);
            if (Character.isDigit(c)) {
                stack.push(c - '0');
            } else {
                int a = stack.pop();
                int b = stack.pop();
                
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
        // Example: "+*235" becomes (2*3)+5 = 11
        System.out.println(evaluatePrefix("+*235"));  // Output: 11
    }
}`,

    c: `// Prefix Evaluation using Stack (C)
#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

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

int evaluatePrefix(char* expression) {
    Stack s = { .top = -1 };
    int length = strlen(expression);
    
    // Process expression in reverse order
    for (int i = length - 1; i >= 0; i--) {
        if (isdigit(expression[i])) {
            push(&s, expression[i] - '0');
        } else {
            int a = pop(&s);
            int b = pop(&s);
            
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
    // Example: "+*235" becomes (2*3)+5 = 11
    printf("%d\n", evaluatePrefix("+*235"));  // Output: 11
    return 0;
}`,

    cpp: `// Prefix Evaluation using Stack (C++)
#include <iostream>
#include <stack>
#include <string>
#include <cctype>
using namespace std;

int evaluatePrefix(const string& expression) {
    stack<int> st;
    
    // Process expression in reverse order
    for (auto it = expression.rbegin(); it != expression.rend(); ++it) {
        char c = *it;
        if (isdigit(c)) {
            st.push(c - '0');
        } else {
            int a = st.top(); st.pop();
            int b = st.top(); st.pop();
            
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
    // Example: "+*235" becomes (2*3)+5 = 11
    cout << evaluatePrefix("+*235") << endl;  // Output: 11
    return 0;
}`
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto" ref={topRef}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Prefix Evaluation using Stack
          </h3>
          <button
            onClick={() => copyToClipboard(codeExamples[selectedLanguage])}
            className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <FaCheck className="text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FaCopy />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedLanguage === lang.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto transition-colors duration-300">
          <pre className="text-sm">
            <code 
              className={`language-${selectedLanguage}`}
              dangerouslySetInnerHTML={{ 
                __html: highlightCode(codeExamples[selectedLanguage], selectedLanguage) 
              }} 
            />
          </pre>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p><strong>Note:</strong> Prefix expressions are evaluated right-to-left. Example: "+*235" becomes (2*3)+5 = 11</p>
        </div>
      </div>
    </div>
  );
};

export default PrefixEvaluator;