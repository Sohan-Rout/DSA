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
    javascript: `// Stack Implementation using Array (JavaScript)
class Stack {
  constructor(size = 10) {
    this.items = new Array(size);
    this.top = -1;
    this.capacity = size;
  }

  // Push operation
  push(element) {
    if (this.isFull()) {
      console.log("Stack Overflow");
      return;
    }
    this.items[++this.top] = element;
  }

  // Pop operation
  pop() {
    if (this.isEmpty()) {
      console.log("Stack Underflow");
      return undefined;
    }
    return this.items[this.top--];
  }

  // Peek operation
  peek() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return undefined;
    }
    return this.items[this.top];
  }

  // Check if stack is empty
  isEmpty() {
    return this.top === -1;
  }

  // Check if stack is full
  isFull() {
    return this.top === this.capacity - 1;
  }

  // Get stack size
  size() {
    return this.top + 1;
  }

  // Print stack contents
  print() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return;
    }
    console.log("Stack contents:");
    for (let i = this.top; i >= 0; i--) {
      console.log(this.items[i]);
    }
  }
}

// Usage
const stack = new Stack(5);
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Top element:", stack.peek()); // 30
console.log("Stack size:", stack.size());  // 3
stack.print();
stack.pop();
console.log("After pop, top element:", stack.peek()); // 20`,

    python: `# Stack Implementation using Array (Python)
class Stack:
    def __init__(self, size=10):
        self.items = [None] * size
        self.top = -1
        self.capacity = size
    
    def push(self, element):
        if self.is_full():
            print("Stack Overflow")
            return
        self.top += 1
        self.items[self.top] = element
    
    def pop(self):
        if self.is_empty():
            print("Stack Underflow")
            return None
        element = self.items[self.top]
        self.top -= 1
        return element
    
    def peek(self):
        if self.is_empty():
            print("Stack is empty")
            return None
        return self.items[self.top]
    
    def is_empty(self):
        return self.top == -1
    
    def is_full(self):
        return self.top == self.capacity - 1
    
    def size(self):
        return self.top + 1
    
    def print_stack(self):
        if self.is_empty():
            print("Stack is empty")
            return
        print("Stack contents:")
        for i in range(self.top, -1, -1):
            print(self.items[i])

# Usage
stack = Stack(5)
stack.push(10)
stack.push(20)
stack.push(30)
print("Top element:", stack.peek())  # 30
print("Stack size:", stack.size())   # 3
stack.print_stack()
stack.pop()
print("After pop, top element:", stack.peek())  # 20`,

    java: `// Stack Implementation using Array (Java)
public class ArrayStack {
    private int[] items;
    private int top;
    private int capacity;
    
    public ArrayStack(int size) {
        items = new int[size];
        top = -1;
        capacity = size;
    }
    
    public void push(int element) {
        if (isFull()) {
            System.out.println("Stack Overflow");
            return;
        }
        items[++top] = element;
    }
    
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow");
            return -1;
        }
        return items[top--];
    }
    
    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return -1;
        }
        return items[top];
    }
    
    public boolean isEmpty() {
        return top == -1;
    }
    
    public boolean isFull() {
        return top == capacity - 1;
    }
    
    public int size() {
        return top + 1;
    }
    
    public void print() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return;
        }
        System.out.println("Stack contents:");
        for (int i = top; i >= 0; i--) {
            System.out.println(items[i]);
        }
    }

    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack(5);
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Top element: " + stack.peek()); // 30
        System.out.println("Stack size: " + stack.size());  // 3
        stack.print();
        stack.pop();
        System.out.println("After pop, top element: " + stack.peek()); // 20
    }
}`,

    c: `// Stack Implementation using Array (C)
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define DEFAULT_SIZE 10

typedef struct {
    int *items;
    int top;
    int capacity;
} Stack;

void initialize(Stack *s, int size) {
    s->items = (int*)malloc(size * sizeof(int));
    s->top = -1;
    s->capacity = size;
}

bool isFull(Stack *s) {
    return s->top == s->capacity - 1;
}

bool isEmpty(Stack *s) {
    return s->top == -1;
}

void push(Stack *s, int element) {
    if (isFull(s)) {
        printf("Stack Overflow\n");
        return;
    }
    s->items[++s->top] = element;
}

int pop(Stack *s) {
    if (isEmpty(s)) {
        printf("Stack Underflow\n");
        return -1;
    }
    return s->items[s->top--];
}

int peek(Stack *s) {
    if (isEmpty(s)) {
        printf("Stack is empty\n");
        return -1;
    }
    return s->items[s->top];
}

int size(Stack *s) {
    return s->top + 1;
}

void print(Stack *s) {
    if (isEmpty(s)) {
        printf("Stack is empty\n");
        return;
    }
    printf("Stack contents:\n");
    for (int i = s->top; i >= 0; i--) {
        printf("%d\n", s->items[i]);
    }
}

void destroy(Stack *s) {
    free(s->items);
}

int main() {
    Stack stack;
    initialize(&stack, 5);
    
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    printf("Top element: %d\n", peek(&stack)); // 30
    printf("Stack size: %d\n", size(&stack));  // 3
    print(&stack);
    pop(&stack);
    printf("After pop, top element: %d\n", peek(&stack)); // 20
    
    destroy(&stack);
    return 0;
}`,

    cpp: `// Stack Implementation using Array (C++)
#include <iostream>
using namespace std;

class ArrayStack {
private:
    int* items;
    int top;
    int capacity;
    
public:
    ArrayStack(int size = 10) {
        items = new int[size];
        top = -1;
        capacity = size;
    }
    
    ~ArrayStack() {
        delete[] items;
    }
    
    void push(int element) {
        if (isFull()) {
            cout << "Stack Overflow" << endl;
            return;
        }
        items[++top] = element;
    }
    
    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow" << endl;
            return -1;
        }
        return items[top--];
    }
    
    int peek() const {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return -1;
        }
        return items[top];
    }
    
    bool isEmpty() const {
        return top == -1;
    }
    
    bool isFull() const {
        return top == capacity - 1;
    }
    
    int size() const {
        return top + 1;
    }
    
    void print() const {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return;
        }
        cout << "Stack contents:" << endl;
        for (int i = top; i >= 0; i--) {
            cout << items[i] << endl;
        }
    }
};

int main() {
    ArrayStack stack(5);
    stack.push(10);
    stack.push(20);
    stack.push(30);
    cout << "Top element: " << stack.peek() << endl; // 30
    cout << "Stack size: " << stack.size() << endl;  // 3
    stack.print();
    stack.pop();
    cout << "After pop, top element: " << stack.peek() << endl; // 20
    
    return 0;
}`,
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
        className="bg-white dark:bg-neutral-950 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 dark:bg-neutral-950 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2 sm:mb-0">
            <FaCode className="text-blue-500 mr-2 text-lg" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Stack Implementation using Array
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