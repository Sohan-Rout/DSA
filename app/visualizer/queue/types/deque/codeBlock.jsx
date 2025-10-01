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
    javascript: `// Double-Ended Queue Implementation (JavaScript)
class Deque {
  constructor(size = 10) {
    this.items = new Array(size);
    this.front = -1;
    this.rear = 0;
    this.size = 0;
    this.capacity = size;
  }

  // Add to front
  addFront(item) {
    if (this.isFull()) {
      console.log("Deque Overflow");
      return;
    }
    if (this.front === -1) {
      this.front = 0;
      this.rear = 0;
    } else if (this.front === 0) {
      this.front = this.capacity - 1;
    } else {
      this.front--;
    }
    this.items[this.front] = item;
    this.size++;
  }

  // Add to rear
  addRear(item) {
    if (this.isFull()) {
      console.log("Deque Overflow");
      return;
    }
    if (this.front === -1) {
      this.front = 0;
      this.rear = 0;
    } else if (this.rear === this.capacity - 1) {
      this.rear = 0;
    } else {
      this.rear++;
    }
    this.items[this.rear] = item;
    this.size++;
  }

  // Remove from front
  removeFront() {
    if (this.isEmpty()) {
      console.log("Deque Underflow");
      return undefined;
    }
    const item = this.items[this.front];
    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    } else if (this.front === this.capacity - 1) {
      this.front = 0;
    } else {
      this.front++;
    }
    this.size--;
    return item;
  }

  // Remove from rear
  removeRear() {
    if (this.isEmpty()) {
      console.log("Deque Underflow");
      return undefined;
    }
    const item = this.items[this.rear];
    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    } else if (this.rear === 0) {
      this.rear = this.capacity - 1;
    } else {
      this.rear--;
    }
    this.size--;
    return item;
  }

  // Peek front
  peekFront() {
    if (this.isEmpty()) {
      console.log("Deque is empty");
      return undefined;
    }
    return this.items[this.front];
  }

  // Peek rear
  peekRear() {
    if (this.isEmpty()) {
      console.log("Deque is empty");
      return undefined;
    }
    return this.items[this.rear];
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

  // Print deque contents
  print() {
    if (this.isEmpty()) {
      console.log("Deque is empty");
      return;
    }
    console.log("Deque contents (front to rear):");
    let i = this.front;
    let count = 0;
    while (count < this.size) {
      console.log(this.items[i]);
      i = (i + 1) % this.capacity;
      count++;
    }
  }
}

// Usage
const deque = new Deque(5);
deque.addRear(10);
deque.addFront(20);
deque.addRear(30);
console.log("Front element:", deque.peekFront()); // 20
console.log("Rear element:", deque.peekRear());   // 30
console.log("Deque size:", deque.getSize());      // 3
deque.print();
deque.removeFront();
console.log("After removeFront, front element:", deque.peekFront()); // 10`,

    python: `# Double-Ended Queue Implementation (Python)
class Deque:
    def __init__(self, size=10):
        self.items = [None] * size
        self.front = -1
        self.rear = 0
        self.size = 0
        self.capacity = size
    
    def add_front(self, item):
        if self.is_full():
            print("Deque Overflow")
            return
        if self.front == -1:
            self.front = 0
            self.rear = 0
        elif self.front == 0:
            self.front = self.capacity - 1
        else:
            self.front -= 1
        self.items[self.front] = item
        self.size += 1
    
    def add_rear(self, item):
        if self.is_full():
            print("Deque Overflow")
            return
        if self.front == -1:
            self.front = 0
            self.rear = 0
        elif self.rear == self.capacity - 1:
            self.rear = 0
        else:
            self.rear += 1
        self.items[self.rear] = item
        self.size += 1
    
    def remove_front(self):
        if self.is_empty():
            print("Deque Underflow")
            return None
        item = self.items[self.front]
        if self.front == self.rear:
            self.front = -1
            self.rear = -1
        elif self.front == self.capacity - 1:
            self.front = 0
        else:
            self.front += 1
        self.size -= 1
        return item
    
    def remove_rear(self):
        if self.is_empty():
            print("Deque Underflow")
            return None
        item = self.items[self.rear]
        if self.front == self.rear:
            self.front = -1
            self.rear = -1
        elif self.rear == 0:
            self.rear = self.capacity - 1
        else:
            self.rear -= 1
        self.size -= 1
        return item
    
    def peek_front(self):
        if self.is_empty():
            print("Deque is empty")
            return None
        return self.items[self.front]
    
    def peek_rear(self):
        if self.is_empty():
            print("Deque is empty")
            return None
        return self.items[self.rear]
    
    def is_empty(self):
        return self.size == 0
    
    def is_full(self):
        return self.size == self.capacity
    
    def get_size(self):
        return self.size
    
    def print_deque(self):
        if self.is_empty():
            print("Deque is empty")
            return
        print("Deque contents (front to rear):")
        i = self.front
        count = 0
        while count < self.size:
            print(self.items[i])
            i = (i + 1) % self.capacity
            count += 1

# Usage
deque = Deque(5)
deque.add_rear(10)
deque.add_front(20)
deque.add_rear(30)
print("Front element:", deque.peek_front())  # 20
print("Rear element:", deque.peek_rear())    # 30
print("Deque size:", deque.get_size())       # 3
deque.print_deque()
deque.remove_front()
print("After removeFront, front element:", deque.peek_front())  # 10`,

    java: `// Double-Ended Queue Implementation (Java)
public class ArrayDeque {
    private int[] items;
    private int front;
    private int rear;
    private int size;
    private int capacity;
    
    public ArrayDeque(int size) {
        items = new int[size];
        front = -1;
        rear = 0;
        size = 0;
        capacity = size;
    }
    
    public void addFront(int item) {
        if (isFull()) {
            System.out.println("Deque Overflow");
            return;
        }
        if (front == -1) {
            front = 0;
            rear = 0;
        } else if (front == 0) {
            front = capacity - 1;
        } else {
            front--;
        }
        items[front] = item;
        size++;
    }
    
    public void addRear(int item) {
        if (isFull()) {
            System.out.println("Deque Overflow");
            return;
        }
        if (front == -1) {
            front = 0;
            rear = 0;
        } else if (rear == capacity - 1) {
            rear = 0;
        } else {
            rear++;
        }
        items[rear] = item;
        size++;
    }
    
    public int removeFront() {
        if (isEmpty()) {
            System.out.println("Deque Underflow");
            return -1;
        }
        int item = items[front];
        if (front == rear) {
            front = -1;
            rear = -1;
        } else if (front == capacity - 1) {
            front = 0;
        } else {
            front++;
        }
        size--;
        return item;
    }
    
    public int removeRear() {
        if (isEmpty()) {
            System.out.println("Deque Underflow");
            return -1;
        }
        int item = items[rear];
        if (front == rear) {
            front = -1;
            rear = -1;
        } else if (rear == 0) {
            rear = capacity - 1;
        } else {
            rear--;
        }
        size--;
        return item;
    }
    
    public int peekFront() {
        if (isEmpty()) {
            System.out.println("Deque is empty");
            return -1;
        }
        return items[front];
    }
    
    public int peekRear() {
        if (isEmpty()) {
            System.out.println("Deque is empty");
            return -1;
        }
        return items[rear];
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
            System.out.println("Deque is empty");
            return;
        }
        System.out.println("Deque contents (front to rear):");
        int i = front;
        int count = 0;
        while (count < size) {
            System.out.println(items[i]);
            i = (i + 1) % capacity;
            count++;
        }
    }

    public static void main(String[] args) {
        ArrayDeque deque = new ArrayDeque(5);
        deque.addRear(10);
        deque.addFront(20);
        deque.addRear(30);
        System.out.println("Front element: " + deque.peekFront()); // 20
        System.out.println("Rear element: " + deque.peekRear());   // 30
        System.out.println("Deque size: " + deque.getSize());      // 3
        deque.print();
        deque.removeFront();
        System.out.println("After removeFront, front element: " + deque.peekFront()); // 10
    }
}`,

    c: `// Double-Ended Queue Implementation (C)
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int *items;
    int front;
    int rear;
    int size;
    int capacity;
} Deque;

void initialize(Deque *dq, int capacity) {
    dq->items = (int*)malloc(capacity * sizeof(int));
    dq->front = -1;
    dq->rear = 0;
    dq->size = 0;
    dq->capacity = capacity;
}

bool isFull(Deque *dq) {
    return dq->size == dq->capacity;
}

bool isEmpty(Deque *dq) {
    return dq->size == 0;
}

void addFront(Deque *dq, int item) {
    if (isFull(dq)) {
        printf("Deque Overflow\n");
        return;
    }
    if (dq->front == -1) {
        dq->front = 0;
        dq->rear = 0;
    } else if (dq->front == 0) {
        dq->front = dq->capacity - 1;
    } else {
        dq->front--;
    }
    dq->items[dq->front] = item;
    dq->size++;
}

void addRear(Deque *dq, int item) {
    if (isFull(dq)) {
        printf("Deque Overflow\n");
        return;
    }
    if (dq->front == -1) {
        dq->front = 0;
        dq->rear = 0;
    } else if (dq->rear == dq->capacity - 1) {
        dq->rear = 0;
    } else {
        dq->rear++;
    }
    dq->items[dq->rear] = item;
    dq->size++;
}

int removeFront(Deque *dq) {
    if (isEmpty(dq)) {
        printf("Deque Underflow\n");
        return -1;
    }
    int item = dq->items[dq->front];
    if (dq->front == dq->rear) {
        dq->front = -1;
        dq->rear = -1;
    } else if (dq->front == dq->capacity - 1) {
        dq->front = 0;
    } else {
        dq->front++;
    }
    dq->size--;
    return item;
}

int removeRear(Deque *dq) {
    if (isEmpty(dq)) {
        printf("Deque Underflow\n");
        return -1;
    }
    int item = dq->items[dq->rear];
    if (dq->front == dq->rear) {
        dq->front = -1;
        dq->rear = -1;
    } else if (dq->rear == 0) {
        dq->rear = dq->capacity - 1;
    } else {
        dq->rear--;
    }
    dq->size--;
    return item;
}

int peekFront(Deque *dq) {
    if (isEmpty(dq)) {
        printf("Deque is empty\n");
        return -1;
    }
    return dq->items[dq->front];
}

int peekRear(Deque *dq) {
    if (isEmpty(dq)) {
        printf("Deque is empty\n");
        return -1;
    }
    return dq->items[dq->rear];
}

int size(Deque *dq) {
    return dq->size;
}

void print(Deque *dq) {
    if (isEmpty(dq)) {
        printf("Deque is empty\n");
        return;
    }
    printf("Deque contents (front to rear):\n");
    int i = dq->front;
    int count = 0;
    while (count < dq->size) {
        printf("%d\n", dq->items[i]);
        i = (i + 1) % dq->capacity;
        count++;
    }
}

void destroy(Deque *dq) {
    free(dq->items);
}

int main() {
    Deque deque;
    initialize(&deque, 5);
    
    addRear(&deque, 10);
    addFront(&deque, 20);
    addRear(&deque, 30);
    printf("Front element: %d\n", peekFront(&deque)); // 20
    printf("Rear element: %d\n", peekRear(&deque));   // 30
    printf("Deque size: %d\n", size(&deque));        // 3
    print(&deque);
    removeFront(&deque);
    printf("After removeFront, front element: %d\n", peekFront(&deque)); // 10
    
    destroy(&deque);
    return 0;
}`,

    cpp: `// Double-Ended Queue Implementation (C++)
#include <iostream>
using namespace std;

class Deque {
private:
    int *items;
    int front;
    int rear;
    int size;
    int capacity;
    
public:
    Deque(int size) {
        items = new int[size];
        front = -1;
        rear = 0;
        size = 0;
        capacity = size;
    }
    
    ~Deque() {
        delete[] items;
    }
    
    void addFront(int item) {
        if (isFull()) {
            cout << "Deque Overflow" << endl;
            return;
        }
        if (front == -1) {
            front = 0;
            rear = 0;
        } else if (front == 0) {
            front = capacity - 1;
        } else {
            front--;
        }
        items[front] = item;
        size++;
    }
    
    void addRear(int item) {
        if (isFull()) {
            cout << "Deque Overflow" << endl;
            return;
        }
        if (front == -1) {
            front = 0;
            rear = 0;
        } else if (rear == capacity - 1) {
            rear = 0;
        } else {
            rear++;
        }
        items[rear] = item;
        size++;
    }
    
    int removeFront() {
        if (isEmpty()) {
            cout << "Deque Underflow" << endl;
            return -1;
        }
        int item = items[front];
        if (front == rear) {
            front = -1;
            rear = -1;
        } else if (front == capacity - 1) {
            front = 0;
        } else {
            front++;
        }
        size--;
        return item;
    }
    
    int removeRear() {
        if (isEmpty()) {
            cout << "Deque Underflow" << endl;
            return -1;
        }
        int item = items[rear];
        if (front == rear) {
            front = -1;
            rear = -1;
        } else if (rear == 0) {
            rear = capacity - 1;
        } else {
            rear--;
        }
        size--;
        return item;
    }
    
    int peekFront() {
        if (isEmpty()) {
            cout << "Deque is empty" << endl;
            return -1;
        }
        return items[front];
    }
    
    int peekRear() {
        if (isEmpty()) {
            cout << "Deque is empty" << endl;
            return -1;
        }
        return items[rear];
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
            cout << "Deque is empty" << endl;
            return;
        }
        cout << "Deque contents (front to rear):" << endl;
        int i = front;
        int count = 0;
        while (count < size) {
            cout << items[i] << endl;
            i = (i + 1) % capacity;
            count++;
        }
    }
};

int main() {
    Deque deque(5);
    deque.addRear(10);
    deque.addFront(20);
    deque.addRear(30);
    cout << "Front element: " << deque.peekFront() << endl; // 20
    cout << "Rear element: " << deque.peekRear() << endl;   // 30
    cout << "Deque size: " << deque.getSize() << endl;      // 3
    deque.print();
    deque.removeFront();
    cout << "After removeFront, front element: " << deque.peekFront() << endl; // 10
    
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