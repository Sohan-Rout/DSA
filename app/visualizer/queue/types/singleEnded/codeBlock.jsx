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

const QueueImplementation = () => {
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
    javascript: `// Queue Implementation (JavaScript)
class Queue {
  constructor(size = 10) {
    this.items = new Array(size);
    this.front = 0;
    this.rear = -1;
    this.size = 0;
    this.capacity = size;
  }

  // Add to rear (enqueue)
  enqueue(item) {
    if (this.isFull()) {
      console.log("Queue Overflow");
      return;
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = item;
    this.size++;
  }

  // Remove from front (dequeue)
  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue Underflow");
      return undefined;
    }
    const item = this.items[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return item;
  }

  // Peek front element
  peek() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return undefined;
    }
    return this.items[this.front];
  }

  // Check if empty
  isEmpty() {
    return this.size === 0;
  }

  // Check if full
  isFull() {
    return this.size === this.capacity;
  }

  // Get current size
  getSize() {
    return this.size;
  }

  // Print queue contents
  print() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return;
    }
    console.log("Queue contents (front to rear):");
    for (let i = 0; i < this.size; i++) {
      const index = (this.front + i) % this.capacity;
      console.log(this.items[index]);
    }
  }
}

// Usage
const queue = new Queue(5);
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log("Front element:", queue.peek()); // 10
console.log("Queue size:", queue.getSize()); // 3
queue.print();
queue.dequeue();
console.log("After dequeue, front element:", queue.peek()); // 20`,

    python: `# Queue Implementation (Python)
class Queue:
    def __init__(self, size=10):
        self.items = [None] * size
        self.front = 0
        self.rear = -1
        self.size = 0
        self.capacity = size
    
    def enqueue(self, item):
        if self.is_full():
            print("Queue Overflow")
            return
        self.rear = (self.rear + 1) % self.capacity
        self.items[self.rear] = item
        self.size += 1
    
    def dequeue(self):
        if self.is_empty():
            print("Queue Underflow")
            return None
        item = self.items[self.front]
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return item
    
    def peek(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        return self.items[self.front]
    
    def is_empty(self):
        return self.size == 0
    
    def is_full(self):
        return self.size == self.capacity
    
    def get_size(self):
        return self.size
    
    def print_queue(self):
        if self.is_empty():
            print("Queue is empty")
            return
        print("Queue contents (front to rear):")
        for i in range(self.size):
            index = (self.front + i) % self.capacity
            print(self.items[index])

# Usage
queue = Queue(5)
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
print("Front element:", queue.peek())  # 10
print("Queue size:", queue.get_size())  # 3
queue.print_queue()
queue.dequeue()
print("After dequeue, front element:", queue.peek())  # 20`,

    java: `// Queue Implementation (Java)
public class ArrayQueue {
    private int[] items;
    private int front;
    private int rear;
    private int size;
    private int capacity;
    
    public ArrayQueue(int size) {
        items = new int[size];
        front = 0;
        rear = -1;
        size = 0;
        capacity = size;
    }
    
    public void enqueue(int item) {
        if (isFull()) {
            System.out.println("Queue Overflow");
            return;
        }
        rear = (rear + 1) % capacity;
        items[rear] = item;
        size++;
    }
    
    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue Underflow");
            return -1;
        }
        int item = items[front];
        front = (front + 1) % capacity;
        size--;
        return item;
    }
    
    public int peek() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return -1;
        }
        return items[front];
    }
    
    public boolean isEmpty() {
        return size == 0;
    }
    
    public boolean isFull() {
        return size == capacity;
    }
    
    public int getSize() {
        return size;
    }
    
    public void print() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return;
        }
        System.out.println("Queue contents (front to rear):");
        for (int i = 0; i < size; i++) {
            int index = (front + i) % capacity;
            System.out.println(items[index]);
        }
    }

    public static void main(String[] args) {
        ArrayQueue queue = new ArrayQueue(5);
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        System.out.println("Front element: " + queue.peek()); // 10
        System.out.println("Queue size: " + queue.getSize()); // 3
        queue.print();
        queue.dequeue();
        System.out.println("After dequeue, front element: " + queue.peek()); // 20
    }
}`,

    c: `// Queue Implementation (C)
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int *items;
    int front;
    int rear;
    int size;
    int capacity;
} Queue;

void initialize(Queue *q, int capacity) {
    q->items = (int*)malloc(capacity * sizeof(int));
    q->front = 0;
    q->rear = -1;
    q->size = 0;
    q->capacity = capacity;
}

bool isFull(Queue *q) {
    return q->size == q->capacity;
}

bool isEmpty(Queue *q) {
    return q->size == 0;
}

void enqueue(Queue *q, int item) {
    if (isFull(q)) {
        printf("Queue Overflow\n");
        return;
    }
    q->rear = (q->rear + 1) % q->capacity;
    q->items[q->rear] = item;
    q->size++;
}

int dequeue(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue Underflow\n");
        return -1;
    }
    int item = q->items[q->front];
    q->front = (q->front + 1) % q->capacity;
    q->size--;
    return item;
}

int peek(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty\n");
        return -1;
    }
    return q->items[q->front];
}

int size(Queue *q) {
    return q->size;
}

void print(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty\n");
        return;
    }
    printf("Queue contents (front to rear):\n");
    for (int i = 0; i < q->size; i++) {
        int index = (q->front + i) % q->capacity;
        printf("%d\n", q->items[index]);
    }
}

void destroy(Queue *q) {
    free(q->items);
}

int main() {
    Queue queue;
    initialize(&queue, 5);
    
    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);
    printf("Front element: %d\n", peek(&queue)); // 10
    printf("Queue size: %d\n", size(&queue)); // 3
    print(&queue);
    dequeue(&queue);
    printf("After dequeue, front element: %d\n", peek(&queue)); // 20
    
    destroy(&queue);
    return 0;
}`,

    cpp: `// Queue Implementation (C++)
#include <iostream>
using namespace std;

class Queue {
private:
    int *items;
    int front;
    int rear;
    int size;
    int capacity;
    
public:
    Queue(int size) {
        items = new int[size];
        front = 0;
        rear = -1;
        size = 0;
        capacity = size;
    }
    
    ~Queue() {
        delete[] items;
    }
    
    void enqueue(int item) {
        if (isFull()) {
            cout << "Queue Overflow" << endl;
            return;
        }
        rear = (rear + 1) % capacity;
        items[rear] = item;
        size++;
    }
    
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue Underflow" << endl;
            return -1;
        }
        int item = items[front];
        front = (front + 1) % capacity;
        size--;
        return item;
    }
    
    int peek() {
        if (isEmpty()) {
            cout << "Queue is empty" << endl;
            return -1;
        }
        return items[front];
    }
    
    bool isEmpty() {
        return size == 0;
    }
    
    bool isFull() {
        return size == capacity;
    }
    
    int getSize() {
        return size;
    }
    
    void print() {
        if (isEmpty()) {
            cout << "Queue is empty" << endl;
            return;
        }
        cout << "Queue contents (front to rear):" << endl;
        for (int i = 0; i < size; i++) {
            int index = (front + i) % capacity;
            cout << items[index] << endl;
        }
    }
};

int main() {
    Queue queue(5);
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    cout << "Front element: " << queue.peek() << endl; // 10
    cout << "Queue size: " << queue.getSize() << endl; // 3
    queue.print();
    queue.dequeue();
    cout << "After dequeue, front element: " << queue.peek() << endl; // 20
    
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
            Single-Ended Queue Implementation
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
          <p><strong>Features:</strong> enqueue (add to rear), dequeue (remove from front), peek, isEmpty, isFull, size, and print operations</p>
          <p><strong>Note:</strong> All implementations use circular array approach for efficient memory usage</p>
        </div>
      </div>
    </div>
  );
};

export default QueueImplementation;