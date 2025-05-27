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
  javascript: `// Queue Implementation in JavaScript (Array)
class Queue {
  constructor(size) {
    this.capacity = size;
    this.arr = new Array(size);
    this.front = this.rear = -1;
  }
  
  // Add element to the rear (enqueue)
  enqueue(item) {
    if ((this.rear + 1) % this.capacity === this.front) {
      console.log("Queue Overflow");
      return;
    }
    if (this.front === -1) {
      this.front = this.rear = 0;
    } else {
      this.rear = (this.rear + 1) % this.capacity;
    }
    this.arr[this.rear] = item;
  }
  
  // Remove element from front (dequeue)
  dequeue() {
    if (this.front === -1) {
      console.log("Queue Underflow");
      return -1;
    }
    const item = this.arr[this.front];
    if (this.front === this.rear) {
      this.front = this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.capacity;
    }
    return item;
  }
}

// Usage Example
const queue = new Queue(5);
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.dequeue()); // 10
console.log(queue.dequeue()); // 20`,

  python: `# Queue Implementation in Python (Array)
class Queue:
    def __init__(self, size):
        self.capacity = size
        self.arr = [None] * size
        self.front = self.rear = -1
    
    # Add element to the rear (enqueue)
    def enqueue(self, item):
        if (self.rear + 1) % self.capacity == self.front:
            print("Queue Overflow")
            return
        if self.front == -1:
            self.front = self.rear = 0
        else:
            self.rear = (self.rear + 1) % self.capacity
        self.arr[self.rear] = item
    
    # Remove element from front (dequeue)
    def dequeue(self):
        if self.front == -1:
            print("Queue Underflow")
            return -1
        item = self.arr[self.front]
        if self.front == self.rear:
            self.front = self.rear = -1
        else:
            self.front = (self.front + 1) % self.capacity
        return item

# Usage Example
q = Queue(5)
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
print(q.dequeue())  # 10
print(q.dequeue())  # 20`,

  java: `// Queue Implementation in Java (Array)
public class ArrayQueue {
    private int[] arr;
    private int front, rear, capacity;
    
    public ArrayQueue(int size) {
        capacity = size;
        arr = new int[capacity];
        front = rear = -1;
    }
    
    // Add element to the rear (enqueue)
    public void enqueue(int item) {
        if ((rear + 1) % capacity == front) {
            System.out.println("Queue Overflow");
            return;
        }
        if (front == -1) {
            front = rear = 0;
        } else {
            rear = (rear + 1) % capacity;
        }
        arr[rear] = item;
    }
    
    // Remove element from front (dequeue)
    public int dequeue() {
        if (front == -1) {
            System.out.println("Queue Underflow");
            return -1;
        }
        int item = arr[front];
        if (front == rear) {
            front = rear = -1;
        } else {
            front = (front + 1) % capacity;
        }
        return item;
    }

    public static void main(String[] args) {
        ArrayQueue queue = new ArrayQueue(5);
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        System.out.println(queue.dequeue()); // 10
        System.out.println(queue.dequeue()); // 20
    }
}`,

  c: `// Queue Implementation in C (Array)
#include <stdio.h>
#include <stdbool.h>

#define MAX_SIZE 100

typedef struct {
    int arr[MAX_SIZE];
    int front, rear;
} Queue;

void initialize(Queue *q) {
    q->front = q->rear = -1;
}

bool isEmpty(Queue *q) {
    return q->front == -1;
}

bool isFull(Queue *q) {
    return (q->rear + 1) % MAX_SIZE == q->front;
}

// Add element to the rear (enqueue)
void enqueue(Queue *q, int item) {
    if (isFull(q)) {
        printf("Queue Overflow\\n");
        return;
    }
    if (isEmpty(q)) {
        q->front = q->rear = 0;
    } else {
        q->rear = (q->rear + 1) % MAX_SIZE;
    }
    q->arr[q->rear] = item;
}

// Remove element from front (dequeue)
int dequeue(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue Underflow\\n");
        return -1;
    }
    int item = q->arr[q->front];
    if (q->front == q->rear) {
        q->front = q->rear = -1;
    } else {
        q->front = (q->front + 1) % MAX_SIZE;
    }
    return item;
}

int main() {
    Queue q;
    initialize(&q);
    
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    
    printf("%d\\n", dequeue(&q)); // 10
    printf("%d\\n", dequeue(&q)); // 20
    
    return 0;
}`,

  cpp: `// Queue Implementation in C++ (Array)
#include <iostream>
using namespace std;

class Queue {
private:
    int *arr;
    int front, rear, capacity;
    
public:
    Queue(int size) {
        capacity = size;
        arr = new int[capacity];
        front = rear = -1;
    }
    
    ~Queue() {
        delete[] arr;
    }
    
    // Add element to the rear (enqueue)
    void enqueue(int item) {
        if ((rear + 1) % capacity == front) {
            cout << "Queue Overflow" << endl;
            return;
        }
        if (front == -1) {
            front = rear = 0;
        } else {
            rear = (rear + 1) % capacity;
        }
        arr[rear] = item;
    }
    
    // Remove element from front (dequeue)
    int dequeue() {
        if (front == -1) {
            cout << "Queue Underflow" << endl;
            return -1;
        }
        int item = arr[front];
        if (front == rear) {
            front = rear = -1;
        } else {
            front = (front + 1) % capacity;
        }
        return item;
    }
};

int main() {
    Queue q(5);
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    
    cout << q.dequeue() << endl; // 10
    cout << q.dequeue() << endl; // 20
    
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
              Queue Implementation (Enqueue & Dequeue)
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