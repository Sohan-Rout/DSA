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
    { id: 'c', name: 'C' }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExamples = {
    javascript: `// Queue Implementation in JavaScript (Linked List)
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }
  
  // Add element to the rear (enqueue)
  enqueue(item) {
    const newNode = new Node(item);
    if (this.rear === null) {
      this.front = this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
  }
  
  // Remove element from front (dequeue)
  dequeue() {
    if (this.front === null) {
      return "Queue Underflow";
    }
    const temp = this.front;
    this.front = temp.next;
    
    if (this.front === null) {
      this.rear = null;
    }
    return temp.data;
  }
}

// Usage Example
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.dequeue()); // 10
console.log(queue.dequeue()); // 20`,

    python: `# Queue Implementation in Python (Linked List)
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Queue:
    def __init__(self):
        self.front = None
        self.rear = None
    
    # Add element to the rear (enqueue)
    def enqueue(self, item):
        new_node = Node(item)
        if self.rear is None:
            self.front = self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node
    
    # Remove element from front (dequeue)
    def dequeue(self):
        if self.front is None:
            return "Queue Underflow"
        temp = self.front
        self.front = temp.next
        
        if self.front is None:
            self.rear = None
        return temp.data

# Usage Example
q = Queue()
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
}`
  };

  return (
    <div className="max-w-6xl mx-auto" ref={topRef}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Queue Implementation (Enqueue & Dequeue Only)
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
        
        <div className="mb-6">
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