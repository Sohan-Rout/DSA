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
  javascript: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function mergeLists(l1, l2) {
  const dummy = new Node(0);
  let current = dummy;

  while (l1 && l2) {
    if (l1.data < l2.data) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2;
  return dummy.next;
}`,

  python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def merge_lists(l1, l2):
    dummy = Node(0)
    current = dummy

    while l1 and l2:
        if l1.data < l2.data:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next

    current.next = l1 or l2
    return dummy.next`,

  java: `class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

public class MergeLists {
    public static Node merge(Node l1, Node l2) {
        Node dummy = new Node(0);
        Node current = dummy;

        while (l1 != null && l2 != null) {
            if (l1.data < l2.data) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        current.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
}`,

  c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* mergeLists(Node* l1, Node* l2) {
    Node dummy;
    Node* current = &dummy;
    dummy.next = NULL;

    while (l1 && l2) {
        if (l1->data < l2->data) {
            current->next = l1;
            l1 = l1->next;
        } else {
            current->next = l2;
            l2 = l2->next;
        }
        current = current->next;
    }

    current->next = l1 ? l1 : l2;
    return dummy.next;
}`,

  cpp: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

Node* mergeLists(Node* l1, Node* l2) {
    Node dummy(0);
    Node* current = &dummy;

    while (l1 && l2) {
        if (l1->data < l2->data) {
            current->next = l1;
            l1 = l1->next;
        } else {
            current->next = l2;
            l2 = l2->next;
        }
        current = current->next;
    }

    current->next = l1 ? l1 : l2;
    return dummy.next;
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
                 Linked List Merging Implementation
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