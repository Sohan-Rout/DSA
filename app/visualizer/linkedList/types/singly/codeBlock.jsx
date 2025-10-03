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
  javascript: `// Singly Linked List Implementation in JavaScript
class Node {
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

  // Insert at beginning
  insertFirst(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Insert at end
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

  // Insert at index
  insertAt(data, index) {
    if (index < 0 || index > this.size) return;
    if (index === 0) return this.insertFirst(data);
    if (index === this.size) return this.insertLast(data);

    const newNode = new Node(data);
    let current = this.head;
    let previous;
    let count = 0;

    while (count < index) {
      previous = current;
      current = current.next;
      count++;
    }

    newNode.next = current;
    previous.next = newNode;
    this.size++;
  }

  // Get at index
  getAt(index) {
    if (index < 0 || index >= this.size) return null;
    let current = this.head;
    let count = 0;
    while (count < index) {
      current = current.next;
      count++;
    }
    return current.data;
  }

  // Remove at index
  removeAt(index) {
    if (index < 0 || index >= this.size) return null;
    let current = this.head;
    if (index === 0) {
      this.head = current.next;
    } else {
      let previous;
      let count = 0;
      while (count < index) {
        previous = current;
        current = current.next;
        count++;
      }
      previous.next = current.next;
    }
    this.size--;
    return current.data;
  }

  // Clear list
  clear() {
    this.head = null;
    this.size = 0;
  }

  // Print list data
  print() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

// Usage Example
const list = new SinglyLinkedList();
list.insertFirst(100);
list.insertFirst(200);
list.insertLast(300);
list.insertAt(500, 1);
list.print(); // 200, 500, 100, 300
list.removeAt(2);
console.log(list.getAt(1)); // 500`,

  python: `# Singly Linked List Implementation in Python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    # Insert at beginning
    def insert_first(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.size += 1

    # Insert at end
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

    # Insert at index
    def insert_at(self, data, index):
        if index < 0 or index > self.size:
            return
        if index == 0:
            return self.insert_first(data)
        if index == self.size:
            return self.insert_last(data)

        new_node = Node(data)
        current = self.head
        count = 0

        while count < index - 1:
            current = current.next
            count += 1

        new_node.next = current.next
        current.next = new_node
        self.size += 1

    # Get at index
    def get_at(self, index):
        if index < 0 or index >= self.size:
            return None
        current = self.head
        count = 0
        while count < index:
            current = current.next
            count += 1
        return current.data

    # Remove at index
    def remove_at(self, index):
        if index < 0 or index >= self.size:
            return None
        current = self.head
        if index == 0:
            self.head = current.next
        else:
            count = 0
            while count < index - 1:
                current = current.next
                count += 1
            current.next = current.next.next
        self.size -= 1
        return current.data

    # Clear list
    def clear(self):
        self.head = None
        self.size = 0

    # Print list data
    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

# Usage Example
ll = SinglyLinkedList()
ll.insert_first(100)
ll.insert_first(200)
ll.insert_last(300)
ll.insert_at(500, 1)
ll.print_list()  # 200 -> 500 -> 100 -> 300 -> None
ll.remove_at(2)
print(ll.get_at(1))  # 500`,

  java: `// Singly Linked List Implementation in Java
public class SinglyLinkedList {
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
    
    // Insert at beginning
    public void insertFirst(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
        size++;
    }
    
    // Insert at end
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
    
    // Insert at index
    public void insertAt(int data, int index) {
        if (index < 0 || index > size) return;
        if (index == 0) {
            insertFirst(data);
            return;
        }
        if (index == size) {
            insertLast(data);
            return;
        }
        
        Node newNode = new Node(data);
        Node current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
        size++;
    }
    
    // Get at index
    public Integer getAt(int index) {
        if (index < 0 || index >= size) return null;
        Node current = head;
        for (int i = 0; i < index; i++) {
            current = current.next;
        }
        return current.data;
    }
    
    // Remove at index
    public Integer removeAt(int index) {
        if (index < 0 || index >= size) return null;
        Node current = head;
        if (index == 0) {
            head = current.next;
        } else {
            for (int i = 0; i < index - 1; i++) {
                current = current.next;
            }
            current.next = current.next.next;
        }
        size--;
        return current.data;
    }
    
    // Clear list
    public void clear() {
        head = null;
        size = 0;
    }
    
    // Print list data
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
        SinglyLinkedList list = new SinglyLinkedList();
        list.insertFirst(100);
        list.insertFirst(200);
        list.insertLast(300);
        list.insertAt(500, 1);
        list.printList(); // 200 -> 500 -> 100 -> 300 -> null
        list.removeAt(2);
        System.out.println(list.getAt(1)); // 500
    }
}`,

  c: `// Singly Linked List Implementation in C
#include <stdio.h>
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

// Insert at beginning
void insertFirst(SinglyLinkedList* list, int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = list->head;
    list->head = newNode;
    list->size++;
}

// Insert at end
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

// Insert at index
void insertAt(SinglyLinkedList* list, int data, int index) {
    if (index < 0 || index > list->size) return;
    if (index == 0) {
        insertFirst(list, data);
        return;
    }
    if (index == list->size) {
        insertLast(list, data);
        return;
    }
    
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    
    Node* current = list->head;
    for (int i = 0; i < index - 1; i++) {
        current = current->next;
    }
    
    newNode->next = current->next;
    current->next = newNode;
    list->size++;
}

// Get at index
int getAt(SinglyLinkedList* list, int index, int* success) {
    if (index < 0 || index >= list->size) {
        *success = 0;
        return -1;
    }
    
    Node* current = list->head;
    for (int i = 0; i < index; i++) {
        current = current->next;
    }
    
    *success = 1;
    return current->data;
}

// Remove at index
int removeAt(SinglyLinkedList* list, int index, int* success) {
    if (index < 0 || index >= list->size) {
        *success = 0;
        return -1;
    }
    
    Node* current = list->head;
    int data;
    
    if (index == 0) {
        list->head = current->next;
        data = current->data;
        free(current);
    } else {
        for (int i = 0; i < index - 1; i++) {
            current = current->next;
        }
        Node* temp = current->next;
        current->next = temp->next;
        data = temp->data;
        free(temp);
    }
    
    list->size--;
    *success = 1;
    return data;
}

// Clear list
void clear(SinglyLinkedList* list) {
    Node* current = list->head;
    while (current != NULL) {
        Node* temp = current;
        current = current->next;
        free(temp);
    }
    list->head = NULL;
    list->size = 0;
}

// Print list data
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
    
    insertFirst(&list, 100);
    insertFirst(&list, 200);
    insertLast(&list, 300);
    insertAt(&list, 500, 1);
    printList(&list); // 200 -> 500 -> 100 -> 300 -> NULL
    
    int success;
    removeAt(&list, 2, &success);
    int value = getAt(&list, 1, &success);
    if (success) {
        printf("%d\n", value); // 500
    }
    
    clear(&list);
    return 0;
}`,

  cpp: `// Singly Linked List Implementation in C++
#include <iostream>
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
    
    ~SinglyLinkedList() {
        clear();
    }
    
    // Insert at beginning
    void insertFirst(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
        size++;
    }
    
    // Insert at end
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
    
    // Insert at index
    void insertAt(int data, int index) {
        if (index < 0 || index > size) return;
        if (index == 0) {
            insertFirst(data);
            return;
        }
        if (index == size) {
            insertLast(data);
            return;
        }
        
        Node* newNode = new Node(data);
        Node* current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current->next;
        }
        newNode->next = current->next;
        current->next = newNode;
        size++;
    }
    
    // Get at index
    int getAt(int index) {
        if (index < 0 || index >= size) {
            throw out_of_range("Index out of range");
        }
        
        Node* current = head;
        for (int i = 0; i < index; i++) {
            current = current->next;
        }
        return current->data;
    }
    
    // Remove at index
    int removeAt(int index) {
        if (index < 0 || index >= size) {
            throw out_of_range("Index out of range");
        }
        
        Node* current = head;
        int data;
        
        if (index == 0) {
            head = current->next;
            data = current->data;
            delete current;
        } else {
            for (int i = 0; i < index - 1; i++) {
                current = current->next;
            }
            Node* temp = current->next;
            current->next = temp->next;
            data = temp->data;
            delete temp;
        }
        
        size--;
        return data;
    }
    
    // Clear list
    void clear() {
        Node* current = head;
        while (current != nullptr) {
            Node* temp = current;
            current = current->next;
            delete temp;
        }
        head = nullptr;
        size = 0;
    }
    
    // Print list data
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
    SinglyLinkedList list;
    list.insertFirst(100);
    list.insertFirst(200);
    list.insertLast(300);
    list.insertAt(500, 1);
    list.printList(); // 200 -> 500 -> 100 -> 300 -> NULL
    
    list.removeAt(2);
    cout << list.getAt(1) << endl; // 500
    
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
                 Singly Linked List Implementation
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