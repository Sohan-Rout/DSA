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
  javascript: `class SinglyLinkedList {
  // 1. Delete first node
  deleteFirst() {
    if (!this.head) return null;
    
    const deletedNode = this.head;
    this.head = this.head.next;
    this.size--;
    return deletedNode.data;
  }

  // 2. Delete last node
  deleteLast() {
    if (!this.head) return null;
    
    if (!this.head.next) {
      const data = this.head.data;
      this.head = null;
      this.size--;
      return data;
    }
    
    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    
    const data = current.next.data;
    current.next = null;
    this.size--;
    return data;
  }

  // 3. Delete at specific index
  deleteAt(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.deleteFirst();
    
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    
    const deletedNode = current.next;
    current.next = deletedNode.next;
    this.size--;
    return deletedNode.data;
  }

  // 4. Delete by value (first occurrence)
  deleteValue(value) {
    if (!this.head) return null;
    
    if (this.head.data === value) {
      return this.deleteFirst();
    }
    
    let current = this.head;
    while (current.next && current.next.data !== value) {
      current = current.next;
    }
    
    if (!current.next) return null;
    
    const deletedNode = current.next;
    current.next = deletedNode.next;
    this.size--;
    return deletedNode.data;
  }
}`,

  python: `class SinglyLinkedList:
    # 1. Delete first node
    def delete_first(self):
        if not self.head:
            return None
            
        deleted_node = self.head
        self.head = self.head.next
        self.size -= 1
        return deleted_node.data
    
    # 2. Delete last node
    def delete_last(self):
        if not self.head:
            return None
            
        if not self.head.next:
            data = self.head.data
            self.head = None
            self.size -= 1
            return data
            
        current = self.head
        while current.next.next:
            current = current.next
            
        data = current.next.data
        current.next = None
        self.size -= 1
        return data
    
    # 3. Delete at specific index
    def delete_at(self, index):
        if index < 0 or index >= self.size:
            return None
        if index == 0:
            return self.delete_first()
            
        current = self.head
        for _ in range(index - 1):
            current = current.next
            
        deleted_node = current.next
        current.next = deleted_node.next
        self.size -= 1
        return deleted_node.data
    
    # 4. Delete by value (first occurrence)
    def delete_value(self, value):
        if not self.head:
            return None
            
        if self.head.data == value:
            return self.delete_first()
            
        current = self.head
        while current.next and current.next.data != value:
            current = current.next
            
        if not current.next:
            return None
            
        deleted_node = current.next
        current.next = deleted_node.next
        self.size -= 1
        return deleted_node.data`,

  java: `public class SinglyLinkedList {
    // 1. Delete first node
    public Integer deleteFirst() {
        if (head == null) return null;
        
        int data = head.data;
        head = head.next;
        size--;
        return data;
    }
    
    // 2. Delete last node
    public Integer deleteLast() {
        if (head == null) return null;
        
        if (head.next == null) {
            int data = head.data;
            head = null;
            size--;
            return data;
        }
        
        Node current = head;
        while (current.next.next != null) {
            current = current.next;
        }
        
        int data = current.next.data;
        current.next = null;
        size--;
        return data;
    }
    
    // 3. Delete at specific index
    public Integer deleteAt(int index) {
        if (index < 0 || index >= size) return null;
        if (index == 0) return deleteFirst();
        
        Node current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        int data = current.next.data;
        current.next = current.next.next;
        size--;
        return data;
    }
    
    // 4. Delete by value (first occurrence)
    public Integer deleteValue(int value) {
        if (head == null) return null;
        
        if (head.data == value) {
            return deleteFirst();
        }
        
        Node current = head;
        while (current.next != null && current.next.data != value) {
            current = current.next;
        }
        
        if (current.next == null) return null;
        
        int data = current.next.data;
        current.next = current.next.next;
        size--;
        return data;
    }
    
    // Usage Example
    public static void main(String[] args) {
        SinglyLinkedList sll = new SinglyLinkedList();
        // Example of the insertion for insertion refer insertion article
        sll.insertLast(100);
        sll.insertLast(200);
        sll.insertLast(300);
        sll.insertLast(400);
        
        System.out.println(sll.deleteFirst());  // 100
        System.out.println(sll.deleteLast());   // 400
        System.out.println(sll.deleteAt(1));    // 300
        System.out.println(sll.deleteValue(200)); // 200
    }
}`,

  c: `int deleteFirst(SinglyLinkedList* list) {
    if (list->head == NULL) return -1;
    
    Node* temp = list->head;
    int data = temp->data;
    list->head = list->head->next;
    free(temp);
    list->size--;
    return data;
}

// 2. Delete last node
int deleteLast(SinglyLinkedList* list) {
    if (list->head == NULL) return -1;
    
    if (list->head->next == NULL) {
        int data = list->head->data;
        free(list->head);
        list->head = NULL;
        list->size--;
        return data;
    }
    
    Node* current = list->head;
    while (current->next->next != NULL) {
        current = current->next;
    }
    
    int data = current->next->data;
    free(current->next);
    current->next = NULL;
    list->size--;
    return data;
}

// 3. Delete at specific index
int deleteAt(SinglyLinkedList* list, int index) {
    if (index < 0 || index >= list->size) return -1;
    if (index == 0) return deleteFirst(list);
    
    Node* current = list->head;
    for (int i = 0; i < index - 1; i++) {
        current = current->next;
    }
    
    Node* temp = current->next;
    int data = temp->data;
    current->next = temp->next;
    free(temp);
    list->size--;
    return data;
}

// 4. Delete by value (first occurrence)
int deleteValue(SinglyLinkedList* list, int value) {
    if (list->head == NULL) return -1;
    
    if (list->head->data == value) {
        return deleteFirst(list);
    }
    
    Node* current = list->head;
    while (current->next != NULL && current->next->data != value) {
        current = current->next;
    }
    
    if (current->next == NULL) return -1;
    
    Node* temp = current->next;
    int data = temp->data;
    current->next = temp->next;
    free(temp);
    list->size--;
    return data;
}`,

  cpp: `public:
    // 1. Delete first node
    int deleteFirst() {
        if (!head) throw std::out_of_range("List is empty");
        
        Node* temp = head;
        int data = temp->data;
        head = head->next;
        delete temp;
        size--;
        return data;
    }
    
    // 2. Delete last node
    int deleteLast() {
        if (!head) throw std::out_of_range("List is empty");
        
        if (!head->next) {
            int data = head->data;
            delete head;
            head = nullptr;
            size--;
            return data;
        }
        
        Node* current = head;
        while (current->next->next) {
            current = current->next;
        }
        
        int data = current->next->data;
        delete current->next;
        current->next = nullptr;
        size--;
        return data;
    }
    
    // 3. Delete at specific index
    int deleteAt(int index) {
        if (index < 0 || index >= size) throw std::out_of_range("Index out of range");
        if (index == 0) return deleteFirst();
        
        Node* current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current->next;
        }
        
        Node* temp = current->next;
        int data = temp->data;
        current->next = temp->next;
        delete temp;
        size--;
        return data;
    }
    
    // 4. Delete by value (first occurrence)
    int deleteValue(int value) {
        if (!head) throw std::out_of_range("List is empty");
        
        if (head->data == value) {
            return deleteFirst();
        }
        
        Node* current = head;
        while (current->next && current->next->data != value) {
            current = current->next;
        }
        
        if (!current->next) throw std::out_of_range("Value not found");
        
        Node* temp = current->next;
        int data = temp->data;
        current->next = temp->next;
        delete temp;
        size--;
        return data;
    }
};`
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