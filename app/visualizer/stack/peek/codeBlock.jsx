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

const Content = () => {
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
    javascript: `// Stack Implementation with Peek Operation in JavaScript
class Stack {
  constructor() {
    this.items = [];
    this.top = -1;
  }

  // Push operation
  push(element) {
    this.items[++this.top] = element;
    console.log(\`Pushed: \${element}\`);
  }

  // Pop operation
  pop() {
    if (this.isEmpty()) {
      console.log("Stack Underflow");
      return -1;
    }
    return this.items[this.top--];
  }

  // Peek operation
  peek() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return -1;
    }
    console.log(\`Top element: \${this.items[this.top]}\`);
    return this.items[this.top];
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
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
stack.display();
stack.peek();
stack.pop();
stack.peek();`,

    python: `# Stack Implementation with Peek Operation in Python
class Stack:
    def __init__(self):
        self.items = []
        self.top = -1
    
    # Push operation
    def push(self, element):
        self.top += 1
        self.items.append(element)
        print(f"Pushed: {element}")
    
    # Pop operation
    def pop(self):
        if self.is_empty():
            print("Stack Underflow")
            return -1
        return self.items.pop()
    
    # Peek operation
    def peek(self):
        if self.is_empty():
            print("Stack is empty")
            return -1
        print(f"Top element: {self.items[-1]}")
        return self.items[-1]
    
    # Check if stack is empty
    def is_empty(self):
        return self.top == -1
    
    # Display stack
    def display(self):
        print("Current Stack:", self.items)

# Usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
stack.display()
stack.peek()
stack.pop()
stack.peek()`,

    java: `// Stack Implementation with Peek Operation in Java
import java.util.ArrayList;

class Stack {
    private ArrayList<Integer> items;
    private int top;
    
    public Stack() {
        items = new ArrayList<>();
        top = -1;
    }
    
    // Push operation
    public void push(int element) {
        items.add(++top, element);
        System.out.println("Pushed: " + element);
    }
    
    // Pop operation
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow");
            return -1;
        }
        return items.remove(top--);
    }
    
    // Peek operation
    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return -1;
        }
        System.out.println("Top element: " + items.get(top));
        return items.get(top);
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
        Stack stack = new Stack();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.display();
        stack.peek();
        stack.pop();
        stack.peek();
    }
}`,

    c: `// Stack Implementation with Peek Operation in C
#include <stdio.h>
#include <stdlib.h>
#define MAX_SIZE 100

typedef struct {
    int items[MAX_SIZE];
    int top;
} Stack;

void initialize(Stack *s) {
    s->top = -1;
}

// Push operation
void push(Stack *s, int element) {
    if (s->top == MAX_SIZE - 1) {
        printf("Stack Overflow\n");
        return;
    }
    s->items[++s->top] = element;
    printf("Pushed: %d\n", element);
}

// Pop operation
int pop(Stack *s) {
    if (s->top == -1) {
        printf("Stack Underflow\n");
        return -1;
    }
    return s->items[s->top--];
}

// Peek operation
int peek(Stack *s) {
    if (s->top == -1) {
        printf("Stack is empty\n");
        return -1;
    }
    printf("Top element: %d\n", s->items[s->top]);
    return s->items[s->top];
}

// Check if stack is empty
int isEmpty(Stack *s) {
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
    
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    display(&stack);
    peek(&stack);
    pop(&stack);
    peek(&stack);
    
    return 0;
}`,

    cpp: `// Stack Implementation with Peek Operation in C++
#include <iostream>
#include <vector>
using namespace std;

class Stack {
private:
    vector<int> items;
    int top;
    const int MAX_SIZE = 100;

public:
    Stack() : top(-1) {}
    
    // Push operation
    void push(int element) {
        if (top == MAX_SIZE - 1) {
            cout << "Stack Overflow" << endl;
            return;
        }
        items.push_back(element);
        top++;
        cout << "Pushed: " << element << endl;
    }
    
    // Pop operation
    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow" << endl;
            return -1;
        }
        int element = items.back();
        items.pop_back();
        top--;
        return element;
    }
    
    // Peek operation
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return -1;
        }
        cout << "Top element: " << items.back() << endl;
        return items.back();
    }
    
    // Check if stack is empty
    bool isEmpty() {
        return top == -1;
    }
    
    // Display stack
    void display() {
        cout << "Current Stack: ";
        for (int i = 0; i <= top; i++) {
            cout << items[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    Stack stack;
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.display();
    stack.peek();
    stack.pop();
    stack.peek();
    
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
            Stack Peek Operation Implementation
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
      </div>
    </div>
  );
};

export default Content;