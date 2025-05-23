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
    javascript: `// Priority Queue Implementation in JavaScript (Min-Heap)
class PriorityQueue {
  constructor(comparator = (a, b) => a.priority - b.priority) {
    this.heap = [];
    this.comparator = comparator;
  }

  // Add element to the queue
  enqueue(value, priority) {
    const element = { value, priority };
    this.heap.push(element);
    this.bubbleUp(this.heap.length - 1);
  }

  // Remove and return the highest priority element
  dequeue() {
    if (this.isEmpty()) return null;
    const root = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return root.value;
  }

  // Peek at the highest priority element without removing it
  peek() {
    if (this.isEmpty()) return null;
    return this.heap[0].value;
  }

  // Get current size of the queue
  size() {
    return this.heap.length;
  }

  // Check if the queue is empty
  isEmpty() {
    return this.heap.length === 0;
  }

  // Move element up the heap to maintain heap property
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIndex]) >= 0) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  // Move element down the heap to maintain heap property
  bubbleDown(index) {
    const lastIndex = this.heap.length - 1;
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;

      if (leftChildIndex <= lastIndex && 
          this.comparator(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0) {
        smallestIndex = leftChildIndex;
      }

      if (rightChildIndex <= lastIndex && 
          this.comparator(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex === index) break;
      [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
      index = smallestIndex;
    }
  }
}

// Usage
const pq = new PriorityQueue();
pq.enqueue("Task 1", 3);  // Lower numbers = higher priority
pq.enqueue("Task 2", 1);
pq.enqueue("Task 3", 2);

console.log(pq.dequeue()); // "Task 2" (highest priority)
console.log(pq.peek());    // "Task 3" (next highest priority)
console.log(pq.size());    // 2`,

    python: `# Priority Queue Implementation in Python (Min-Heap)
import heapq

class PriorityQueue:
    def __init__(self):
        self.heap = []
        self.index = 0  # Used to properly order elements with same priority
        
    def enqueue(self, value, priority):
        heapq.heappush(self.heap, (priority, self.index, value))
        self.index += 1
        
    def dequeue(self):
        if self.is_empty():
            return None
        return heapq.heappop(self.heap)[2]  # Return the value
        
    def peek(self):
        if self.is_empty():
            return None
        return self.heap[0][2]  # Return the value without removing
        
    def size(self):
        return len(self.heap)
        
    def is_empty(self):
        return len(self.heap) == 0

# Usage
pq = PriorityQueue()
pq.enqueue("Task 1", 3)  # Lower numbers = higher priority
pq.enqueue("Task 2", 1)
pq.enqueue("Task 3", 2)

print(pq.dequeue())  # "Task 2" (highest priority)
print(pq.peek())     # "Task 3" (next highest priority)
print(pq.size())     # 2`,

    java: `// Priority Queue Implementation in Java
import java.util.PriorityQueue;
import java.util.Comparator;

public class Main {
    static class PriorityItem<T> {
        T value;
        int priority;
        
        public PriorityItem(T value, int priority) {
            this.value = value;
            this.priority = priority;
        }
    }
    
    static class PriorityQueue<T> {
        private java.util.PriorityQueue<PriorityItem<T>> queue;
        
        public PriorityQueue() {
            this.queue = new java.util.PriorityQueue<>(
                Comparator.comparingInt(item -> item.priority)
            );
        }
        
        public void enqueue(T value, int priority) {
            queue.add(new PriorityItem<>(value, priority));
        }
        
        public T dequeue() {
            if (isEmpty()) return null;
            return queue.poll().value;
        }
        
        public T peek() {
            if (isEmpty()) return null;
            return queue.peek().value;
        }
        
        public int size() {
            return queue.size();
        }
        
        public boolean isEmpty() {
            return queue.isEmpty();
        }
    }

    public static void main(String[] args) {
        PriorityQueue<String> pq = new PriorityQueue<>();
        pq.enqueue("Task 1", 3);  // Lower numbers = higher priority
        pq.enqueue("Task 2", 1);
        pq.enqueue("Task 3", 2);

        System.out.println(pq.dequeue()); // "Task 2" (highest priority)
        System.out.println(pq.peek());    // "Task 3" (next highest priority)
        System.out.println(pq.size());    // 2
    }
}`,

    c: `// Priority Queue Implementation in C (Min-Heap)
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    void* value;
    int priority;
} PriorityItem;

typedef struct {
    PriorityItem* heap;
    int capacity;
    int size;
} PriorityQueue;

PriorityQueue* createPriorityQueue(int capacity) {
    PriorityQueue* pq = (PriorityQueue*)malloc(sizeof(PriorityQueue));
    pq->heap = (PriorityItem*)malloc(capacity * sizeof(PriorityItem));
    pq->capacity = capacity;
    pq->size = 0;
    return pq;
}

void swap(PriorityItem* a, PriorityItem* b) {
    PriorityItem temp = *a;
    *a = *b;
    *b = temp;
}

void heapifyUp(PriorityQueue* pq, int index) {
    while (index > 0) {
        int parentIndex = (index - 1) / 2;
        if (pq->heap[parentIndex].priority <= pq->heap[index].priority) break;
        swap(&pq->heap[parentIndex], &pq->heap[index]);
        index = parentIndex;
    }
}

void heapifyDown(PriorityQueue* pq, int index) {
    while (1) {
        int leftChild = 2 * index + 1;
        int rightChild = 2 * index + 2;
        int smallest = index;

        if (leftChild < pq->size && 
            pq->heap[leftChild].priority < pq->heap[smallest].priority) {
            smallest = leftChild;
        }

        if (rightChild < pq->size && 
            pq->heap[rightChild].priority < pq->heap[smallest].priority) {
            smallest = rightChild;
        }

        if (smallest == index) break;
        swap(&pq->heap[index], &pq->heap[smallest]);
        index = smallest;
    }
}

void enqueue(PriorityQueue* pq, void* value, int priority) {
    if (pq->size >= pq->capacity) return; // Handle resizing in real implementation
    
    PriorityItem item = {value, priority};
    pq->heap[pq->size] = item;
    heapifyUp(pq, pq->size);
    pq->size++;
}

void* dequeue(PriorityQueue* pq) {
    if (pq->size == 0) return NULL;
    
    void* result = pq->heap[0].value;
    pq->size--;
    pq->heap[0] = pq->heap[pq->size];
    heapifyDown(pq, 0);
    return result;
}

void* peek(PriorityQueue* pq) {
    if (pq->size == 0) return NULL;
    return pq->heap[0].value;
}

int size(PriorityQueue* pq) {
    return pq->size;
}

int isEmpty(PriorityQueue* pq) {
    return pq->size == 0;
}

void destroyPriorityQueue(PriorityQueue* pq) {
    free(pq->heap);
    free(pq);
}

int main() {
    PriorityQueue* pq = createPriorityQueue(10);
    
    // In a real implementation, you would need to manage memory for the values
    char task1[] = "Task 1";
    char task2[] = "Task 2";
    char task3[] = "Task 3";
    
    enqueue(pq, task1, 3);  // Lower numbers = higher priority
    enqueue(pq, task2, 1);
    enqueue(pq, task3, 2);

    printf("%s\\n", (char*)dequeue(pq)); // "Task 2" (highest priority)
    printf("%s\\n", (char*)peek(pq));    // "Task 3" (next highest priority)
    printf("%d\\n", size(pq));           // 2
    
    destroyPriorityQueue(pq);
    return 0;
}`,

    cpp: `// Priority Queue Implementation in C++ (Min-Heap)
#include <iostream>
#include <vector>
#include <functional>

template <typename T>
class PriorityQueue {
private:
    struct PriorityItem {
        T value;
        int priority;
        
        bool operator<(const PriorityItem& other) const {
            return priority > other.priority; // Min-heap (lower priority numbers come first)
        }
    };
    
    std::vector<PriorityItem> heap;

public:
    void enqueue(const T& value, int priority) {
        heap.push_back({value, priority});
        std::push_heap(heap.begin(), heap.end());
    }
    
    T dequeue() {
        if (isEmpty()) {
            throw std::out_of_range("Priority queue is empty");
        }
        std::pop_heap(heap.begin(), heap.end());
        T value = heap.back().value;
        heap.pop_back();
        return value;
    }
    
    const T& peek() const {
        if (isEmpty()) {
            throw std::out_of_range("Priority queue is empty");
        }
        return heap.front().value;
    }
    
    size_t size() const {
        return heap.size();
    }
    
    bool isEmpty() const {
        return heap.empty();
    }
};

int main() {
    PriorityQueue<std::string> pq;
    pq.enqueue("Task 1", 3);  // Lower numbers = higher priority
    pq.enqueue("Task 2", 1);
    pq.enqueue("Task 3", 2);

    std::cout << pq.dequeue() << std::endl; // "Task 2" (highest priority)
    std::cout << pq.peek() << std::endl;    // "Task 3" (next highest priority)
    std::cout << pq.size() << std::endl;    // 2
    
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
               Double Ended Queue Implementation
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