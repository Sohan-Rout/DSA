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
    javascript: `// Stack Implementation with isFull Operation in JavaScript
class Stack {
  constructor(maxSize = 5) {
    this.items = [];
    this.top = -1;
    this.MAX_SIZE = maxSize;
  }

  // Push operation with isFull check
  push(element) {
    if (this.isFull()) {
      console.log("Stack Overflow - Cannot push to full stack");
      return;
    }
    this.items[++this.top] = element;
    console.log(\`Pushed: \${element}\`);
  }

  // Pop operation
  pop() {
    if (this.isEmpty()) {
      console.log("Stack Underflow - Cannot pop from empty stack");
      return -1;
    }
    return this.items[this.top--];
  }

  // Check if stack is full
  isFull() {
    const full = this.top === this.MAX_SIZE - 1;
    console.log(\`Stack is \${full ? "full" : "not full"}\`);
    return full;
  }

  // Check if stack is empty
  isEmpty() {
    return this.top === -1;
  }

  // Display stack
  display() {
    console.log("Current Stack:", this.items.slice(0, this.top + 1));
  }
}

// Usage
const stack = new Stack(3); // Small stack for demonstration

console.log("Initial checks:");
stack.isFull();  // false
stack.isEmpty(); // true

stack.push(10);
stack.push(20);
stack.push(30);
stack.display();
stack.isFull();  // true

// Try to push to full stack
stack.push(40);  // Will show overflow message`,

    python: `# Stack Implementation with isFull Operation in Python
class Stack:
    def __init__(self, max_size=5):
        self.items = []
        self.top = -1
        self.MAX_SIZE = max_size
    
    # Push operation with is_full check
    def push(self, element):
        if self.is_full():
            print("Stack Overflow - Cannot push to full stack")
            return
        self.top += 1
        self.items.append(element)
        print(f"Pushed: {element}")
    
    # Pop operation
    def pop(self):
        if self.is_empty():
            print("Stack Underflow - Cannot pop from empty stack")
            return -1
        return self.items.pop()
    
    # Check if stack is full
    def is_full(self):
        full = self.top == self.MAX_SIZE - 1
        print(f"Stack is {'full' if full else 'not full'}")
        return full
    
    # Check if stack is empty
    def is_empty(self):
        return self.top == -1
    
    # Display stack
    def display(self):
        print("Current Stack:", self.items)

# Usage
stack = Stack(3)  # Small stack for demonstration

print("Initial checks:")
stack.is_full()   # False
stack.is_empty()  # True

stack.push(10)
stack.push(20)
stack.push(30)
stack.display()
stack.is_full()   # True

# Try to push to full stack
stack.push(40)    # Will show overflow message`,

    java: `// Stack Implementation with isFull Operation in Java
import java.util.ArrayList;

class Stack {
    private ArrayList<Integer> items;
    private int top;
    private final int MAX_SIZE;
    
    public Stack(int maxSize) {
        items = new ArrayList<>();
        top = -1;
        MAX_SIZE = maxSize;
    }
    
    // Push operation with isFull check
    public void push(int element) {
        if (isFull()) {
            System.out.println("Stack Overflow - Cannot push to full stack");
            return;
        }
        items.add(++top, element);
        System.out.println("Pushed: " + element);
    }
    
    // Pop operation
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow - Cannot pop from empty stack");
            return -1;
        }
        return items.remove(top--);
    }
    
    // Check if stack is full
    public boolean isFull() {
        boolean full = top == MAX_SIZE - 1;
        System.out.println("Stack is " + (full ? "full" : "not full"));
        return full;
    }
    
    // Check if stack is empty
    public boolean isEmpty() {
        return top == -1;
    }
    
    // Display stack
    public void display() {
        System.out.print("Current Stack: ");
        for (int i = 0; i <= top; i++) {
            System.out.print(items.get(i) + " ");
        }
        System.out.println();
    }
}

public class Main {
    public static void main(String[] args) {
        Stack stack = new Stack(3); // Small stack for demonstration
        
        System.out.println("Initial checks:");
        stack.isFull();  // false
        stack.isEmpty(); // true

        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.display();
        stack.isFull();  // true

        // Try to push to full stack
        stack.push(40);  // Will show overflow message
    }
}`,

    c: `// Stack Implementation with isFull Operation in C
#include <stdio.h>
#include <stdbool.h>
#define MAX_SIZE 5

typedef struct {
    int items[MAX_SIZE];
    int top;
} Stack;

void initialize(Stack *s) {
    s->top = -1;
}

// Push operation with isFull check
void push(Stack *s, int element) {
    if (isFull(s)) {
        printf("Stack Overflow - Cannot push to full stack\n");
        return;
    }
    s->items[++s->top] = element;
    printf("Pushed: %d\n", element);
}

// Pop operation
int pop(Stack *s) {
    if (isEmpty(s)) {
        printf("Stack Underflow - Cannot pop from empty stack\n");
        return -1;
    }
    return s->items[s->top--];
}

// Check if stack is full
bool isFull(Stack *s) {
    bool full = s->top == MAX_SIZE - 1;
    printf("Stack is %s\n", full ? "full" : "not full");
    return full;
}

// Check if stack is empty
bool isEmpty(Stack *s) {
    return s->top == -1;
}

// Display stack
void display(Stack *s) {
    printf("Current Stack: ");
    for (int i = 0; i <= s->top; i++) {
        printf("%d ", s->items[i]);
    }
    printf("\n");
}

int main() {
    Stack stack;
    initialize(&stack);
    
    printf("Initial checks:\n");
    isFull(&stack);  // false
    isEmpty(&stack); // true

    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    push(&stack, 40);
    push(&stack, 50);
    display(&stack);
    isFull(&stack);  // true

    // Try to push to full stack
    push(&stack, 60);  // Will show overflow message
    
    return 0;
}`,

    cpp: `// Stack Implementation with isFull Operation in C++
#include <iostream>
#include <vector>
using namespace std;

class Stack {
private:
    vector<int> items;
    int top;
    const int MAX_SIZE;
    
public:
    Stack(int maxSize = 5) : top(-1), MAX_SIZE(maxSize) {}
    
    // Push operation with isFull check
    void push(int element) {
        if (isFull()) {
            cout << "Stack Overflow - Cannot push to full stack" << endl;
            return;
        }
        items.push_back(element);
        top++;
        cout << "Pushed: " << element << endl;
    }
    
    // Pop operation
    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow - Cannot pop from empty stack" << endl;
            return -1;
        }
        int element = items.back();
        items.pop_back();
        top--;
        return element;
    }
    
    // Check if stack is full
    bool isFull() const {
        bool full = top == MAX_SIZE - 1;
        cout << "Stack is " << (full ? "full" : "not full") << endl;
        return full;
    }
    
    // Check if stack is empty
    bool isEmpty() const {
        return top == -1;
    }
    
    // Display stack
    void display() const {
        cout << "Current Stack: ";
        for (int i = 0; i <= top; i++) {
            cout << items[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    Stack stack(3); // Small stack for demonstration
    
    cout << "Initial checks:" << endl;
    stack.isFull();  // false
    stack.isEmpty(); // true

    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.display();
    stack.isFull();  // true

    // Try to push to full stack
    stack.push(40);  // Will show overflow message
    
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
                  Stack Push & Pop Implementation
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