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
    javascript: `// Queue peek (front) in JavaScript
class Queue {
  constructor() {
    this.items = [];
  }

  // Get front element without removing
  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  // Helper method
  isEmpty() {
    return this.items.length === 0;
  }
}`,

    python: `# Queue peek (front) in Python
class Queue:
    def __init__(self):
        self.items = []
    
    # Get front element without removing
    def peek(self):
        if self.is_empty():
            return "Queue is empty"
        return self.items[0]
    
    # Helper method
    def is_empty(self):
        return len(self.items) == 0`,

    java: `// Queue peek (front) in Java
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        
        // Peek at front element
        Integer front = queue.peek();
        System.out.println("Front element: " + front);
    }
}`,

    c: `// Queue peek (front) in C
#include <stdio.h>
#define MAX_SIZE 100

typedef struct {
    int items[MAX_SIZE];
    int front, rear;
} Queue;

int peek(Queue *q) {
    if (q->front == -1) {
        printf("Queue is empty\n");
        return -1;
    }
    return q->items[q->front];
}`,

    cpp: `// Queue peek (front) in C++
#include <iostream>
#include <queue>

int main() {
    std::queue<int> q;
    
    // Using STL queue's front() method
    if (!q.empty()) {
        std::cout << "Front element: " << q.front() << std::endl;
    } else {
        std::cout << "Queue is empty" << std::endl;
    }

    // Custom queue implementation
    class CustomQueue {
    private:
        struct Node {
            int data;
            Node* next;
            Node(int val) : data(val), next(nullptr) {}
        };
        Node* front;
        Node* rear;
        
    public:
        CustomQueue() : front(nullptr), rear(nullptr) {}
        
        ~CustomQueue() {
            while (front != nullptr) {
                Node* temp = front;
                front = front->next;
                delete temp;
            }
        }
        
        int peek() const {
            if (front == nullptr) {
                std::cout << "Queue is empty" << std::endl;
                return -1;
            }
            return front->data;
        }
        
        bool isEmpty() const {
            return front == nullptr;
        }
    };
    
    CustomQueue customQ;
    std::cout << "Custom queue front: " << customQ.peek() << std::endl;
    
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
               Queue Implementation (Peek Front)
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