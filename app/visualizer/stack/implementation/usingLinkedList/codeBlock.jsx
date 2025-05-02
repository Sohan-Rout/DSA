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

const LinkedListStack = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const topRef = useRef(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'c', name: 'C' }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            Stack Implementation using Linked List
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
          <p><strong>Features:</strong> Push, Pop, Peek, isEmpty, Size, and Print operations</p>
          <p><strong>Note:</strong> Linked list implementation doesn't have fixed size limitation</p>
        </div>
      </div>
    </div>
  );
};

export default LinkedListStack;