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

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 1. Insert at beginning
  insertFirst(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // 2. Insert at end
  insertLast(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // 3. Insert at specific index
  insertAt(data, index) {
    if (index < 0 || index > this.size) {
      console.log("Invalid index");
      return;
    }
    
    if (index === 0) {
      this.insertFirst(data);
      return;
    }
    
    const newNode = new Node(data);
    let current = this.head;
    let count = 0;
    
    // Traverse to the node before the insertion point
    while (count < index - 1) {
      current = current.next;
      count++;
    }
    
    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  // Print the list
  printList() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.data + " -> ";
      current = current.next;
    }
    result += "null";
    console.log(result);
  }
}

// Usage Example
const sll = new SinglyLinkedList();
sll.insertFirst(100);  // List: 100 -> null
sll.insertFirst(200);  // List: 200 -> 100 -> null
sll.insertLast(300);   // List: 200 -> 100 -> 300 -> null
sll.insertAt(500, 1);  // List: 200 -> 500 -> 100 -> 300 -> null
sll.printList();`,

  python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    # 1. Insert at beginning
    def insert_first(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    # 2. Insert at end
    def insert_last(self, data):
        new_node = Node(data)
        
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.size += 1
    
    # 3. Insert at specific index
    def insert_at(self, data, index):
        if index < 0 or index > self.size:
            print("Invalid index")
            return
        
        if index == 0:
            self.insert_first(data)
            return
        
        new_node = Node(data)
        current = self.head
        count = 0
        
        # Traverse to the node before the insertion point
        while count < index - 1:
            current = current.next
            count += 1
        
        new_node.next = current.next
        current.next = new_node
        self.size += 1
    
    # Print the list
    def print_list(self):
        current = self.head
        result = []
        while current:
            result.append(str(current.data))
            current = current.next
        print(" -> ".join(result) + " -> None")

# Usage Example
sll = SinglyLinkedList()
sll.insert_first(100)  # List: 100 -> None
sll.insert_first(200)  # List: 200 -> 100 -> None
sll.insert_last(300)   # List: 200 -> 100 -> 300 -> None
sll.insert_at(500, 1)  # List: 200 -> 500 -> 100 -> 300 -> None
sll.print_list()`,

  java: `public class SinglyLinkedList {
    private class Node {
        int data;
        Node next;
        
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    private Node head;
    private int size;
    
    public SinglyLinkedList() {
        head = null;
        size = 0;
    }
    
    // 1. Insert at beginning
    public void insertFirst(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
        size++;
    }
    
    // 2. Insert at end
    public void insertLast(int data) {
        Node newNode = new Node(data);
        
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
    }
    
    // 3. Insert at specific index
    public void insertAt(int data, int index) {
        if (index < 0 || index > size) {
            System.out.println("Invalid index");
            return;
        }
        
        if (index == 0) {
            insertFirst(data);
            return;
        }
        
        Node newNode = new Node(data);
        Node current = head;
        int count = 0;
        
        // Traverse to the node before the insertion point
        while (count < index - 1) {
            current = current.next;
            count++;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        size++;
    }
    
    // Print the list
    public void printList() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
    
    // Usage Example
    public static void main(String[] args) {
        SinglyLinkedList sll = new SinglyLinkedList();
        sll.insertFirst(100);  // List: 100 -> null
        sll.insertFirst(200);  // List: 200 -> 100 -> null
        sll.insertLast(300);   // List: 200 -> 100 -> 300 -> null
        sll.insertAt(500, 1);  // List: 200 -> 500 -> 100 -> 300 -> null
        sll.printList();
    }
}`,

  c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

typedef struct {
    Node* head;
    int size;
} SinglyLinkedList;

void initList(SinglyLinkedList* list) {
    list->head = NULL;
    list->size = 0;
}

// 1. Insert at beginning
void insertFirst(SinglyLinkedList* list, int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = list->head;
    list->head = newNode;
    list->size++;
}

// 2. Insert at end
void insertLast(SinglyLinkedList* list, int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    
    if (list->head == NULL) {
        list->head = newNode;
    } else {
        Node* current = list->head;
        while (current->next != NULL) {
            current = current->next;
        }
        current->next = newNode;
    }
    list->size++;
}

// 3. Insert at specific index
void insertAt(SinglyLinkedList* list, int data, int index) {
    if (index < 0 || index > list->size) {
        printf("Invalid index\n");
        return;
    }
    
    if (index == 0) {
        insertFirst(list, data);
        return;
    }
    
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    
    Node* current = list->head;
    int count = 0;
    
    // Traverse to the node before the insertion point
    while (count < index - 1) {
        current = current->next;
        count++;
    }
    
    newNode->next = current->next;
    current->next = newNode;
    list->size++;
}

// Print the list
void printList(SinglyLinkedList* list) {
    Node* current = list->head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\n");
}

// Usage Example
int main() {
    SinglyLinkedList list;
    initList(&list);
    
    insertFirst(&list, 100);  // List: 100 -> NULL
    insertFirst(&list, 200);  // List: 200 -> 100 -> NULL
    insertLast(&list, 300);   // List: 200 -> 100 -> 300 -> NULL
    insertAt(&list, 500, 1);  // List: 200 -> 500 -> 100 -> 300 -> NULL
    printList(&list);
    
    return 0;
}`,

  cpp: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    
    Node(int data) : data(data), next(nullptr) {}
};

class SinglyLinkedList {
private:
    Node* head;
    int size;
    
public:
    SinglyLinkedList() : head(nullptr), size(0) {}
    
    // 1. Insert at beginning
    void insertFirst(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
        size++;
    }
    
    // 2. Insert at end
    void insertLast(int data) {
        Node* newNode = new Node(data);
        
        if (head == nullptr) {
            head = newNode;
        } else {
            Node* current = head;
            while (current->next != nullptr) {
                current = current->next;
            }
            current->next = newNode;
        }
        size++;
    }
    
    // 3. Insert at specific index
    void insertAt(int data, int index) {
        if (index < 0 || index > size) {
            cout << "Invalid index" << endl;
            return;
        }
        
        if (index == 0) {
            insertFirst(data);
            return;
        }
        
        Node* newNode = new Node(data);
        Node* current = head;
        int count = 0;
        
        // Traverse to the node before the insertion point
        while (count < index - 1) {
            current = current->next;
            count++;
        }
        
        newNode->next = current->next;
        current->next = newNode;
        size++;
    }
    
    // Print the list
    void printList() {
        Node* current = head;
        while (current != nullptr) {
            cout << current->data << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
};

// Usage Example
int main() {
    SinglyLinkedList sll;
    sll.insertFirst(100);  // List: 100 -> NULL
    sll.insertFirst(200);  // List: 200 -> 100 -> NULL
    sll.insertLast(300);   // List: 200 -> 100 -> 300 -> NULL
    sll.insertAt(500, 1);  // List: 200 -> 500 -> 100 -> 300 -> NULL
    sll.printList();
    
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
                 Linked List Deletion Implementation
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