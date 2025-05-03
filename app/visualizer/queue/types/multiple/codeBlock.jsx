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

const MultipleQueue = () => {
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
    javascript: `// Multiple Queue Implementation in JavaScript
class MultiQueue {
  constructor(numQueues, sizePerQueue) {
    this.queues = Array(numQueues).fill().map(() => ({
      items: Array(sizePerQueue),
      front: -1,
      rear: -1,
      size: 0,
      capacity: sizePerQueue
    }));
  }

  // Enqueue to specific queue
  enqueue(queueIndex, item) {
    if (this.isFull(queueIndex)) {
      return false;
    }
    const queue = this.queues[queueIndex];
    if (queue.front === -1) {
      queue.front = 0;
    }
    queue.rear = (queue.rear + 1) % queue.capacity;
    queue.items[queue.rear] = item;
    queue.size++;
    return true;
  }

  // Dequeue from specific queue
  dequeue(queueIndex) {
    if (this.isEmpty(queueIndex)) {
      return null;
    }
    const queue = this.queues[queueIndex];
    const item = queue.items[queue.front];
    if (queue.front === queue.rear) {
      queue.front = queue.rear = -1;
    } else {
      queue.front = (queue.front + 1) % queue.capacity;
    }
    queue.size--;
    return item;
  }

  // Check if specific queue is empty
  isEmpty(queueIndex) {
    return this.queues[queueIndex].size === 0;
  }

  // Check if specific queue is full
  isFull(queueIndex) {
    return this.queues[queueIndex].size === this.queues[queueIndex].capacity;
  }

  // Peek at front of specific queue
  peek(queueIndex) {
    if (this.isEmpty(queueIndex)) {
      return null;
    }
    return this.queues[queueIndex].items[this.queues[queueIndex].front];
  }
}

// Usage
const mq = new MultiQueue(3, 5); // 3 queues, each with capacity 5
mq.enqueue(0, 10); // Add to queue 0
mq.enqueue(1, 20); // Add to queue 1
console.log(mq.dequeue(0)); // 10
console.log(mq.peek(1));    // 20`,

    python: `# Multiple Queue Implementation in Python
class MultiQueue:
    def __init__(self, num_queues, size_per_queue):
        self.queues = [
            {
                'items': [None] * size_per_queue,
                'front': -1,
                'rear': -1,
                'size': 0,
                'capacity': size_per_queue
            }
            for _ in range(num_queues)
        ]
    
    def enqueue(self, queue_index, item):
        if self.is_full(queue_index):
            return False
        queue = self.queues[queue_index]
        if queue['front'] == -1:
            queue['front'] = 0
        queue['rear'] = (queue['rear'] + 1) % queue['capacity']
        queue['items'][queue['rear']] = item
        queue['size'] += 1
        return True
    
    def dequeue(self, queue_index):
        if self.is_empty(queue_index):
            return None
        queue = self.queues[queue_index]
        item = queue['items'][queue['front']]
        if queue['front'] == queue['rear']:
            queue['front'] = queue['rear'] = -1
        else:
            queue['front'] = (queue['front'] + 1) % queue['capacity']
        queue['size'] -= 1
        return item
    
    def is_empty(self, queue_index):
        return self.queues[queue_index]['size'] == 0
    
    def is_full(self, queue_index):
        return self.queues[queue_index]['size'] == self.queues[queue_index]['capacity']
    
    def peek(self, queue_index):
        if self.is_empty(queue_index):
            return None
        return self.queues[queue_index]['items'][self.queues[queue_index]['front']]

# Usage
mq = MultiQueue(3, 5)  # 3 queues, each with capacity 5
mq.enqueue(0, 10)      # Add to queue 0
mq.enqueue(1, 20)      # Add to queue 1
print(mq.dequeue(0))   # 10
print(mq.peek(1))      # 20`,

    java: `// Multiple Queue Implementation in Java
public class MultiQueue {
    private static class Queue {
        int[] items;
        int front, rear, size, capacity;
        
        Queue(int capacity) {
            this.items = new int[capacity];
            this.front = -1;
            this.rear = -1;
            this.size = 0;
            this.capacity = capacity;
        }
    }
    
    private Queue[] queues;
    
    public MultiQueue(int numQueues, int sizePerQueue) {
        queues = new Queue[numQueues];
        for (int i = 0; i < numQueues; i++) {
            queues[i] = new Queue(sizePerQueue);
        }
    }
    
    public boolean enqueue(int queueIndex, int item) {
        if (isFull(queueIndex)) {
            return false;
        }
        Queue queue = queues[queueIndex];
        if (queue.front == -1) {
            queue.front = 0;
        }
        queue.rear = (queue.rear + 1) % queue.capacity;
        queue.items[queue.rear] = item;
        queue.size++;
        return true;
    }
    
    public Integer dequeue(int queueIndex) {
        if (isEmpty(queueIndex)) {
            return null;
        }
        Queue queue = queues[queueIndex];
        int item = queue.items[queue.front];
        if (queue.front == queue.rear) {
            queue.front = queue.rear = -1;
        } else {
            queue.front = (queue.front + 1) % queue.capacity;
        }
        queue.size--;
        return item;
    }
    
    public boolean isEmpty(int queueIndex) {
        return queues[queueIndex].size == 0;
    }
    
    public boolean isFull(int queueIndex) {
        return queues[queueIndex].size == queues[queueIndex].capacity;
    }
    
    public Integer peek(int queueIndex) {
        if (isEmpty(queueIndex)) {
            return null;
        }
        return queues[queueIndex].items[queues[queueIndex].front];
    }
    
    public static void main(String[] args) {
        MultiQueue mq = new MultiQueue(3, 5); // 3 queues, each with capacity 5
        mq.enqueue(0, 10); // Add to queue 0
        mq.enqueue(1, 20); // Add to queue 1
        System.out.println(mq.dequeue(0)); // 10
        System.out.println(mq.peek(1));    // 20
    }
}`,

    c: `// Multiple Queue Implementation in C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int* items;
    int front;
    int rear;
    int size;
    int capacity;
} Queue;

typedef struct {
    Queue* queues;
    int numQueues;
} MultiQueue;

MultiQueue* createMultiQueue(int numQueues, int sizePerQueue) {
    MultiQueue* mq = (MultiQueue*)malloc(sizeof(MultiQueue));
    mq->numQueues = numQueues;
    mq->queues = (Queue*)malloc(numQueues * sizeof(Queue));
    
    for (int i = 0; i < numQueues; i++) {
        mq->queues[i].items = (int*)malloc(sizePerQueue * sizeof(int));
        mq->queues[i].front = -1;
        mq->queues[i].rear = -1;
        mq->queues[i].size = 0;
        mq->queues[i].capacity = sizePerQueue;
    }
    return mq;
}

bool enqueue(MultiQueue* mq, int queueIndex, int item) {
    if (queueIndex < 0 || queueIndex >= mq->numQueues) return false;
    
    Queue* q = &mq->queues[queueIndex];
    if (q->size == q->capacity) return false;
    
    if (q->front == -1) q->front = 0;
    q->rear = (q->rear + 1) % q->capacity;
    q->items[q->rear] = item;
    q->size++;
    return true;
}

int dequeue(MultiQueue* mq, int queueIndex, bool* success) {
    if (queueIndex < 0 || queueIndex >= mq->numQueues || mq->queues[queueIndex].size == 0) {
        *success = false;
        return -1;
    }
    
    Queue* q = &mq->queues[queueIndex];
    int item = q->items[q->front];
    if (q->front == q->rear) {
        q->front = q->rear = -1;
    } else {
        q->front = (q->front + 1) % q->capacity;
    }
    q->size--;
    *success = true;
    return item;
}

bool isEmpty(MultiQueue* mq, int queueIndex) {
    return mq->queues[queueIndex].size == 0;
}

bool isFull(MultiQueue* mq, int queueIndex) {
    return mq->queues[queueIndex].size == mq->queues[queueIndex].capacity;
}

int peek(MultiQueue* mq, int queueIndex, bool* success) {
    if (queueIndex < 0 || queueIndex >= mq->numQueues || isEmpty(mq, queueIndex)) {
        *success = false;
        return -1;
    }
    *success = true;
    return mq->queues[queueIndex].items[mq->queues[queueIndex].front];
}

void destroyMultiQueue(MultiQueue* mq) {
    for (int i = 0; i < mq->numQueues; i++) {
        free(mq->queues[i].items);
    }
    free(mq->queues);
    free(mq);
}

int main() {
    MultiQueue* mq = createMultiQueue(3, 5); // 3 queues, each with capacity 5
    bool success;
    
    enqueue(mq, 0, 10); // Add to queue 0
    enqueue(mq, 1, 20); // Add to queue 1
    
    int val = dequeue(mq, 0, &success);
    if (success) printf("%d\n", val); // 10
    
    val = peek(mq, 1, &success);
    if (success) printf("%d\n", val); // 20
    
    destroyMultiQueue(mq);
    return 0;
}`,

    cpp: `// Multiple Queue Implementation in C++
#include <iostream>
#include <vector>

class MultiQueue {
private:
    struct Queue {
        std::vector<int> items;
        int front;
        int rear;
        int size;
        const int capacity;
        
        Queue(int cap) : front(-1), rear(-1), size(0), capacity(cap) {
            items.resize(cap);
        }
    };
    
    std::vector<Queue> queues;
    
public:
    MultiQueue(int numQueues, int sizePerQueue) {
        for (int i = 0; i < numQueues; i++) {
            queues.emplace_back(sizePerQueue);
        }
    }
    
    bool enqueue(int queueIndex, int item) {
        if (queueIndex < 0 || queueIndex >= queues.size() || isFull(queueIndex)) {
            return false;
        }
        
        Queue& q = queues[queueIndex];
        if (q.front == -1) q.front = 0;
        q.rear = (q.rear + 1) % q.capacity;
        q.items[q.rear] = item;
        q.size++;
        return true;
    }
    
    bool dequeue(int queueIndex, int& result) {
        if (queueIndex < 0 || queueIndex >= queues.size() || isEmpty(queueIndex)) {
            return false;
        }
        
        Queue& q = queues[queueIndex];
        result = q.items[q.front];
        if (q.front == q.rear) {
            q.front = q.rear = -1;
        } else {
            q.front = (q.front + 1) % q.capacity;
        }
        q.size--;
        return true;
    }
    
    bool peek(int queueIndex, int& result) const {
        if (queueIndex < 0 || queueIndex >= queues.size() || isEmpty(queueIndex)) {
            return false;
        }
        result = queues[queueIndex].items[queues[queueIndex].front];
        return true;
    }
    
    bool isEmpty(int queueIndex) const {
        return queues[queueIndex].size == 0;
    }
    
    bool isFull(int queueIndex) const {
        return queues[queueIndex].size == queues[queueIndex].capacity;
    }
};

int main() {
    MultiQueue mq(3, 5); // 3 queues, each with capacity 5
    
    mq.enqueue(0, 10); // Add to queue 0
    mq.enqueue(1, 20); // Add to queue 1
    
    int val;
    if (mq.dequeue(0, val)) {
        std::cout << val << std::endl; // 10
    }
    
    if (mq.peek(1, val)) {
        std::cout << val << std::endl; // 20
    }
    
    return 0;
}`
  };

  return (
    <div className="max-w-6xl mx-auto" ref={topRef}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Multiple Queue Implementation
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

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p><strong>Features:</strong> Multiple queues with enqueue, dequeue, peek, isEmpty, and isFull operations</p>
          <p><strong>Note:</strong> Each queue maintains its own front and rear pointers for circular buffer implementation</p>
        </div>
      </div>
    </div>
  );
};

export default MultipleQueue;