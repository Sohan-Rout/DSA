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
    javascript: `// Stack Implementation using Linked List (JavaScript)
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListStack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  // Push operation
  push(value) {
    const newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  // Pop operation
  pop() {
    if (this.isEmpty()) {
      console.log("Stack Underflow");
      return null;
    }
    const value = this.top.value;
    this.top = this.top.next;
    this.size--;
    return value;
  }

  // Peek operation
  peek() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return null;
    }
    return this.top.value;
  }

  // Check if stack is empty
  isEmpty() {
    return this.size === 0;
  }

  // Get stack size
  getSize() {
    return this.size;
  }

  // Print stack contents
  print() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return;
    }
    let current = this.top;
    console.log("Stack contents (top to bottom):");
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

// Usage
const stack = new LinkedListStack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Top element:", stack.peek()); // 30
console.log("Stack size:", stack.getSize()); // 3
stack.print();
stack.pop();
console.log("After pop, top element:", stack.peek()); // 20`,

    python: `# Stack Implementation using Linked List (Python)
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedListStack:
    def __init__(self):
        self.top = None
        self.size = 0
    
    def push(self, value):
        new_node = Node(value)
        new_node.next = self.top
        self.top = new_node
        self.size += 1
    
    def pop(self):
        if self.is_empty():
            print("Stack Underflow")
            return None
        value = self.top.value
        self.top = self.top.next
        self.size -= 1
        return value
    
    def peek(self):
        if self.is_empty():
            print("Stack is empty")
            return None
        return self.top.value
    
    def is_empty(self):
        return self.size == 0
    
    def get_size(self):
        return self.size
    
    def print_stack(self):
        if self.is_empty():
            print("Stack is empty")
            return
        current = self.top
        print("Stack contents (top to bottom):")
        while current:
            print(current.value)
            current = current.next

# Usage
stack = LinkedListStack()
stack.push(10)
stack.push(20)
stack.push(30)
print("Top element:", stack.peek())  # 30
print("Stack size:", stack.get_size())  # 3
stack.print_stack()
stack.pop()
print("After pop, top element:", stack.peek())  # 20`,

    java: `// Stack Implementation using Linked List (Java)
class Node {
    int value;
    Node next;
    
    public Node(int value) {
        this.value = value;
        this.next = null;
    }
}

public class LinkedListStack {
    private Node top;
    private int size;
    
    public LinkedListStack() {
        top = null;
        size = 0;
    }
    
    public void push(int value) {
        Node newNode = new Node(value);
        newNode.next = top;
        top = newNode;
        size++;
    }
    
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow");
            return -1;
        }
        int value = top.value;
        top = top.next;
        size--;
        return value;
    }
    
    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return -1;
        }
        return top.value;
    }
    
    public boolean isEmpty() {
        return size == 0;
    }
    
    public int getSize() {
        return size;
    }
    
    public void print() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return;
        }
        Node current = top;
        System.out.println("Stack contents (top to bottom):");
        while (current != null) {
            System.out.println(current.value);
            current = current.next;
        }
    }

    public static void main(String[] args) {
        LinkedListStack stack = new LinkedListStack();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Top element: " + stack.peek()); // 30
        System.out.println("Stack size: " + stack.getSize()); // 3
        stack.print();
        stack.pop();
        System.out.println("After pop, top element: " + stack.peek()); // 20
    }
}`,

    c: `// Stack Implementation using Linked List (C)
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int value;
    struct Node* next;
} Node;

typedef struct {
    Node* top;
    int size;
} LinkedListStack;

void initialize(LinkedListStack* s) {
    s->top = NULL;
    s->size = 0;
}

void push(LinkedListStack* s, int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->value = value;
    newNode->next = s->top;
    s->top = newNode;
    s->size++;
}

int pop(LinkedListStack* s) {
    if (s->size == 0) {
        printf("Stack Underflow\n");
        return -1;
    }
    Node* temp = s->top;
    int value = temp->value;
    s->top = s->top->next;
    free(temp);
    s->size--;
    return value;
}

int peek(LinkedListStack* s) {
    if (s->size == 0) {
        printf("Stack is empty\n");
        return -1;
    }
    return s->top->value;
}

bool isEmpty(LinkedListStack* s) {
    return s->size == 0;
}

int size(LinkedListStack* s) {
    return s->size;
}

void print(LinkedListStack* s) {
    if (s->size == 0) {
        printf("Stack is empty\n");
        return;
    }
    Node* current = s->top;
    printf("Stack contents (top to bottom):\n");
    while (current != NULL) {
        printf("%d\n", current->value);
        current = current->next;
    }
}

void destroy(LinkedListStack* s) {
    while (s->top != NULL) {
        Node* temp = s->top;
        s->top = s->top->next;
        free(temp);
    }
}

int main() {
    LinkedListStack stack;
    initialize(&stack);
    
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    printf("Top element: %d\n", peek(&stack)); // 30
    printf("Stack size: %d\n", size(&stack)); // 3
    print(&stack);
    pop(&stack);
    printf("After pop, top element: %d\n", peek(&stack)); // 20
    
    destroy(&stack);
    return 0;
}`,

    cpp: `// Stack Implementation using Linked List (C++)
#include <iostream>
using namespace std;

class Node {
public:
    int value;
    Node* next;
    
    Node(int val) : value(val), next(nullptr) {}
};

class LinkedListStack {
private:
    Node* top;
    int size;
    
public:
    LinkedListStack() : top(nullptr), size(0) {}
    
    ~LinkedListStack() {
        while (!isEmpty()) {
            pop();
        }
    }
    
    void push(int value) {
        Node* newNode = new Node(value);
        newNode->next = top;
        top = newNode;
        size++;
    }
    
    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow" << endl;
            return -1;
        }
        Node* temp = top;
        int value = temp->value;
        top = top->next;
        delete temp;
        size--;
        return value;
    }
    
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return -1;
        }
        return top->value;
    }
    
    bool isEmpty() {
        return size == 0;
    }
    
    int getSize() {
        return size;
    }
    
    void print() {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return;
        }
        Node* current = top;
        cout << "Stack contents (top to bottom):" << endl;
        while (current != nullptr) {
            cout << current->value << endl;
            current = current->next;
        }
    }
};

int main() {
    LinkedListStack stack;
    
    stack.push(10);
    stack.push(20);
    stack.push(30);
    cout << "Top element: " << stack.peek() << endl; // 30
    cout << "Stack size: " << stack.getSize() << endl; // 3
    stack.print();
    stack.pop();
    cout << "After pop, top element: " << stack.peek() << endl; // 20
    
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
                Stack Implementation using Linked-List
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