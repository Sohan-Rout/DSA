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

const CircularQueue = () => {
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
    javascript: `// Circular Queue Implementation (JavaScript)
class CircularQueue {
  constructor(capacity) {
    this.queue = new Array(capacity);
    this.capacity = capacity;
    this.front = -1;
    this.rear = -1;
    this.size = 0;
  }

  // Check if queue is full
  isFull() {
    return this.size === this.capacity;
  }

  // Check if queue is empty
  isEmpty() {
    return this.size === 0;
  }

  // Add element to the queue
  enqueue(item) {
    if (this.isFull()) {
      console.log("Queue is full");
      return false;
    }
    
    if (this.isEmpty()) {
      this.front = 0;
    }
    
    this.rear = (this.rear + 1) % this.capacity;
    this.queue[this.rear] = item;
    this.size++;
    return true;
  }

  // Remove element from the queue
  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return null;
    }
    
    const item = this.queue[this.front];
    this.queue[this.front] = null;
    
    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.capacity;
    }
    
    this.size--;
    return item;
  }

  // Get front element without removing it
  peek() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return null;
    }
    return this.queue[this.front];
  }

  // Print queue contents
  print() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return;
    }
    
    let i = this.front;
    let output = [];
    
    while (true) {
      output.push(this.queue[i]);
      if (i === this.rear) break;
      i = (i + 1) % this.capacity;
    }
    
    console.log("Queue contents:", output.join(' -> '));
    console.log("Front index:", this.front, "Rear index:", this.rear);
  }
}

// Usage
const queue = new CircularQueue(5);
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.enqueue(50);
queue.print(); // 10 -> 20 -> 30 -> 40 -> 50
console.log("Dequeued:", queue.dequeue()); // 10
queue.enqueue(60);
queue.print(); // 20 -> 30 -> 40 -> 50 -> 60
console.log("Front element:", queue.peek()); // 20`,

    python: `# Circular Queue Implementation (Python)
class CircularQueue:
    def __init__(self, capacity):
        self.queue = [None] * capacity
        self.capacity = capacity
        self.front = -1
        self.rear = -1
        self.size = 0
    
    def is_full(self):
        return self.size == self.capacity
    
    def is_empty(self):
        return self.size == 0
    
    def enqueue(self, item):
        if self.is_full():
            print("Queue is full")
            return False
        
        if self.is_empty():
            self.front = 0
        
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = item
        self.size += 1
        return True
    
    def dequeue(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        
        item = self.queue[self.front]
        self.queue[self.front] = None
        
        if self.front == self.rear:
            self.front = -1
            self.rear = -1
        else:
            self.front = (self.front + 1) % self.capacity
        
        self.size -= 1
        return item
    
    def peek(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        return self.queue[self.front]
    
    def print_queue(self):
        if self.is_empty():
            print("Queue is empty")
            return
        
        i = self.front
        output = []
        
        while True:
            output.append(str(self.queue[i]))
            if i == self.rear:
                break
            i = (i + 1) % self.capacity
        
        print("Queue contents:", " -> ".join(output))
        print(f"Front index: {self.front}, Rear index: {self.rear}")

# Usage
queue = CircularQueue(5)
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
queue.enqueue(40)
queue.enqueue(50)
queue.print_queue()  # 10 -> 20 -> 30 -> 40 -> 50
print("Dequeued:", queue.dequeue())  # 10
queue.enqueue(60)
queue.print_queue()  # 20 -> 30 -> 40 -> 50 -> 60
print("Front element:", queue.peek())  # 20`,

    java: `// Circular Queue Implementation (Java)
public class CircularQueue {
    private int[] queue;
    private int capacity;
    private int front;
    private int rear;
    private int size;
    
    public CircularQueue(int capacity) {
        this.queue = new int[capacity];
        this.capacity = capacity;
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }
    
    public boolean isFull() {
        return size == capacity;
    }
    
    public boolean isEmpty() {
        return size == 0;
    }
    
    public boolean enqueue(int item) {
        if (isFull()) {
            System.out.println("Queue is full");
            return false;
        }
        
        if (isEmpty()) {
            front = 0;
        }
        
        rear = (rear + 1) % capacity;
        queue[rear] = item;
        size++;
        return true;
    }
    
    public Integer dequeue() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return null;
        }
        
        int item = queue[front];
        
        if (front == rear) {
            front = -1;
            rear = -1;
        } else {
            front = (front + 1) % capacity;
        }
        
        size--;
        return item;
    }
    
    public Integer peek() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return null;
        }
        return queue[front];
    }
    
    public void print() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return;
        }
        
        int i = front;
        StringBuilder output = new StringBuilder();
        
        while (true) {
            output.append(queue[i]);
            if (i == rear) break;
            output.append(" -> ");
            i = (i + 1) % capacity;
        }
        
        System.out.println("Queue contents: " + output);
        System.out.println("Front index: " + front + ", Rear index: " + rear);
    }

    public static void main(String[] args) {
        CircularQueue queue = new CircularQueue(5);
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        queue.enqueue(40);
        queue.enqueue(50);
        queue.print(); // 10 -> 20 -> 30 -> 40 -> 50
        System.out.println("Dequeued: " + queue.dequeue()); // 10
        queue.enqueue(60);
        queue.print(); // 20 -> 30 -> 40 -> 50 -> 60
        System.out.println("Front element: " + queue.peek()); // 20
    }
}`,

    c: `// Circular Queue Implementation (C)
#include <stdio.h>
#include <stdbool.h>

typedef struct {
    int* queue;
    int capacity;
    int front;
    int rear;
    int size;
} CircularQueue;

void initialize(CircularQueue* q, int capacity) {
    q->queue = (int*)malloc(capacity * sizeof(int));
    q->capacity = capacity;
    q->front = -1;
    q->rear = -1;
    q->size = 0;
}

bool isFull(CircularQueue* q) {
    return q->size == q->capacity;
}

bool isEmpty(CircularQueue* q) {
    return q->size == 0;
}

bool enqueue(CircularQueue* q, int item) {
    if (isFull(q)) {
        printf("Queue is full\n");
        return false;
    }
    
    if (isEmpty(q)) {
        q->front = 0;
    }
    
    q->rear = (q->rear + 1) % q->capacity;
    q->queue[q->rear] = item;
    q->size++;
    return true;
}

int dequeue(CircularQueue* q) {
    if (isEmpty(q)) {
        printf("Queue is empty\n");
        return -1;
    }
    
    int item = q->queue[q->front];
    
    if (q->front == q->rear) {
        q->front = -1;
        q->rear = -1;
    } else {
        q->front = (q->front + 1) % q->capacity;
    }
    
    q->size--;
    return item;
}

int peek(CircularQueue* q) {
    if (isEmpty(q)) {
        printf("Queue is empty\n");
        return -1;
    }
    return q->queue[q->front];
}

void print(CircularQueue* q) {
    if (isEmpty(q)) {
        printf("Queue is empty\n");
        return;
    }
    
    int i = q->front;
    printf("Queue contents: ");
    
    while (true) {
        printf("%d", q->queue[i]);
        if (i == q->rear) break;
        printf(" -> ");
        i = (i + 1) % q->capacity;
    }
    
    printf("\nFront index: %d, Rear index: %d\n", q->front, q->rear);
}

void destroy(CircularQueue* q) {
    free(q->queue);
}

int main() {
    CircularQueue queue;
    initialize(&queue, 5);
    
    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);
    enqueue(&queue, 40);
    enqueue(&queue, 50);
    print(&queue); // 10 -> 20 -> 30 -> 40 -> 50
    printf("Dequeued: %d\n", dequeue(&queue)); // 10
    enqueue(&queue, 60);
    print(&queue); // 20 -> 30 -> 40 -> 50 -> 60
    printf("Front element: %d\n", peek(&queue)); // 20
    
    destroy(&queue);
    return 0;
}`,

    cpp: `// Circular Queue Implementation (C++)
#include <iostream>
using namespace std;

class CircularQueue {
private:
    int* queue;
    int capacity;
    int front;
    int rear;
    int size;
    
public:
    CircularQueue(int cap) : capacity(cap), front(-1), rear(-1), size(0) {
        queue = new int[capacity];
    }
    
    ~CircularQueue() {
        delete[] queue;
    }
    
    bool isFull() const {
        return size == capacity;
    }
    
    bool isEmpty() const {
        return size == 0;
    }
    
    bool enqueue(int item) {
        if (isFull()) {
            cout << "Queue is full" << endl;
            return false;
        }
        
        if (isEmpty()) {
            front = 0;
        }
        
        rear = (rear + 1) % capacity;
        queue[rear] = item;
        size++;
        return true;
    }
    
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue is empty" << endl;
            return -1;
        }
        
        int item = queue[front];
        
        if (front == rear) {
            front = -1;
            rear = -1;
        } else {
            front = (front + 1) % capacity;
        }
        
        size--;
        return item;
    }
    
    int peek() const {
        if (isEmpty()) {
            cout << "Queue is empty" << endl;
            return -1;
        }
        return queue[front];
    }
    
    void print() const {
        if (isEmpty()) {
            cout << "Queue is empty" << endl;
            return;
        }
        
        int i = front;
        cout << "Queue contents: ";
        
        while (true) {
            cout << queue[i];
            if (i == rear) break;
            cout << " -> ";
            i = (i + 1) % capacity;
        }
        
        cout << "\nFront index: " << front << ", Rear index: " << rear << endl;
    }
};

int main() {
    CircularQueue queue(5);
    
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    queue.enqueue(40);
    queue.enqueue(50);
    queue.print(); // 10 -> 20 -> 30 -> 40 -> 50
    cout << "Dequeued: " << queue.dequeue() << endl; // 10
    queue.enqueue(60);
    queue.print(); // 20 -> 30 -> 40 -> 50 -> 60
    cout << "Front element: " << queue.peek() << endl; // 20
    
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
            Circular Queue Implementation
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
          <p><strong>Features:</strong> Enqueue, Dequeue, Peek, isEmpty, isFull, and Print operations</p>
          <p><strong>Note:</strong> Circular queue efficiently reuses empty spaces created after dequeuing</p>
        </div>
      </div>
    </div>
  );
};

export default CircularQueue;