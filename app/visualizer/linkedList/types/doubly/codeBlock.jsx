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
  javascript: `// Doubly Linked List Implementation in JavaScript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Insert at beginning
  insertFirst(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // Insert at end
  insertLast(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
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
    let count = 0;

    while (count < index) {
      current = current.next;
      count++;
    }

    newNode.prev = current.prev;
    newNode.next = current;
    current.prev.next = newNode;
    current.prev = newNode;
    this.size++;
  }

  // Remove from beginning
  removeFirst() {
    if (!this.head) return null;
    const removedNode = this.head;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.size--;
    return removedNode.data;
  }

  // Remove from end
  removeLast() {
    if (!this.tail) return null;
    const removedNode = this.tail;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size--;
    return removedNode.data;
  }

  // Remove at index
  removeAt(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.removeFirst();
    if (index === this.size - 1) return this.removeLast();

    let current = this.head;
    let count = 0;

    while (count < index) {
      current = current.next;
      count++;
    }

    current.prev.next = current.next;
    current.next.prev = current.prev;
    this.size--;
    return current.data;
  }

  // Get at index (forward traversal)
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

  // Get at index (backward traversal)
  getAtFromEnd(index) {
    if (index < 0 || index >= this.size) return null;
    let current = this.tail;
    let count = 0;
    while (count < index) {
      current = current.prev;
      count++;
    }
    return current.data;
  }

  // Clear list
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Print list forward
  printForward() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }

  // Print list backward
  printBackward() {
    let current = this.tail;
    while (current) {
      console.log(current.data);
      current = current.prev;
    }
  }
}

// Usage Example
const dll = new DoublyLinkedList();
dll.insertFirst(100);
dll.insertFirst(200);
dll.insertLast(300);
dll.insertAt(500, 1);
dll.printForward(); // 200, 500, 100, 300
dll.printBackward(); // 300, 100, 500, 200
dll.removeAt(2);
console.log(dll.getAt(1)); // 500
console.log(dll.getAtFromEnd(1)); // 100`,

  python: `# Doubly Linked List Implementation in Python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    # Insert at beginning
    def insert_first(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        self.size += 1

    # Insert at end
    def insert_last(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
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

        while count < index:
            current = current.next
            count += 1

        new_node.prev = current.prev
        new_node.next = current
        current.prev.next = new_node
        current.prev = new_node
        self.size += 1

    # Remove from beginning
    def remove_first(self):
        if not self.head:
            return None
        removed_node = self.head
        if self.size == 1:
            self.head = None
            self.tail = None
        else:
            self.head = self.head.next
            self.head.prev = None
        self.size -= 1
        return removed_node.data

    # Remove from end
    def remove_last(self):
        if not self.tail:
            return None
        removed_node = self.tail
        if self.size == 1:
            self.head = None
            self.tail = None
        else:
            self.tail = self.tail.prev
            self.tail.next = None
        self.size -= 1
        return removed_node.data

    # Remove at index
    def remove_at(self, index):
        if index < 0 or index >= self.size:
            return None
        if index == 0:
            return self.remove_first()
        if index == self.size - 1:
            return self.remove_last()

        current = self.head
        count = 0

        while count < index:
            current = current.next
            count += 1

        current.prev.next = current.next
        current.next.prev = current.prev
        self.size -= 1
        return current.data

    # Get at index (forward traversal)
    def get_at(self, index):
        if index < 0 or index >= self.size:
            return None
        current = self.head
        count = 0
        while count < index:
            current = current.next
            count += 1
        return current.data

    # Get at index (backward traversal)
    def get_at_from_end(self, index):
        if index < 0 or index >= self.size:
            return None
        current = self.tail
        count = 0
        while count < index:
            current = current.prev
            count += 1
        return current.data

    # Clear list
    def clear(self):
        self.head = None
        self.tail = None
        self.size = 0

    # Print list forward
    def print_forward(self):
        current = self.head
        while current:
            print(current.data, end=" <-> ")
            current = current.next
        print("None")

    # Print list backward
    def print_backward(self):
        current = self.tail
        while current:
            print(current.data, end=" <-> ")
            current = current.prev
        print("None")

# Usage Example
dll = DoublyLinkedList()
dll.insert_first(100)
dll.insert_first(200)
dll.insert_last(300)
dll.insert_at(500, 1)
dll.print_forward()  # 200 <-> 500 <-> 100 <-> 300 <-> None
dll.print_backward()  # 300 <-> 100 <-> 500 <-> 200 <-> None
dll.remove_at(2)
print(dll.get_at(1))  # 500
print(dll.get_at_from_end(1))  # 100`,

  java: `// Doubly Linked List Implementation in Java
public class DoublyLinkedList {
    private class Node {
        int data;
        Node next;
        Node prev;
        
        Node(int data) {
            this.data = data;
            this.next = null;
            this.prev = null;
        }
    }
    
    private Node head;
    private Node tail;
    private int size;
    
    public DoublyLinkedList() {
        head = null;
        tail = null;
        size = 0;
    }
    
    // Insert at beginning
    public void insertFirst(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.next = head;
            head.prev = newNode;
            head = newNode;
        }
        size++;
    }
    
    // Insert at end
    public void insertLast(int data) {
        Node newNode = new Node(data);
        if (tail == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.prev = tail;
            tail.next = newNode;
            tail = newNode;
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
        for (int i = 0; i < index; i++) {
            current = current.next;
        }
        
        newNode.prev = current.prev;
        newNode.next = current;
        current.prev.next = newNode;
        current.prev = newNode;
        size++;
    }
    
    // Remove from beginning
    public Integer removeFirst() {
        if (head == null) return null;
        int removedData = head.data;
        if (size == 1) {
            head = null;
            tail = null;
        } else {
            head = head.next;
            head.prev = null;
        }
        size--;
        return removedData;
    }
    
    // Remove from end
    public Integer removeLast() {
        if (tail == null) return null;
        int removedData = tail.data;
        if (size == 1) {
            head = null;
            tail = null;
        } else {
            tail = tail.prev;
            tail.next = null;
        }
        size--;
        return removedData;
    }
    
    // Remove at index
    public Integer removeAt(int index) {
        if (index < 0 || index >= size) return null;
        if (index == 0) return removeFirst();
        if (index == size - 1) return removeLast();
        
        Node current = head;
        for (int i = 0; i < index; i++) {
            current = current.next;
        }
        
        current.prev.next = current.next;
        current.next.prev = current.prev;
        size--;
        return current.data;
    }
    
    // Get at index (forward traversal)
    public Integer getAt(int index) {
        if (index < 0 || index >= size) return null;
        Node current = head;
        for (int i = 0; i < index; i++) {
            current = current.next;
        }
        return current.data;
    }
    
    // Get at index (backward traversal)
    public Integer getAtFromEnd(int index) {
        if (index < 0 || index >= size) return null;
        Node current = tail;
        for (int i = 0; i < index; i++) {
            current = current.prev;
        }
        return current.data;
    }
    
    // Clear list
    public void clear() {
        head = null;
        tail = null;
        size = 0;
    }
    
    // Print list forward
    public void printForward() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " <-> ");
            current = current.next;
        }
        System.out.println("null");
    }
    
    // Print list backward
    public void printBackward() {
        Node current = tail;
        while (current != null) {
            System.out.print(current.data + " <-> ");
            current = current.prev;
        }
        System.out.println("null");
    }
    
    // Usage Example
    public static void main(String[] args) {
        DoublyLinkedList dll = new DoublyLinkedList();
        dll.insertFirst(100);
        dll.insertFirst(200);
        dll.insertLast(300);
        dll.insertAt(500, 1);
        dll.printForward();  // 200 <-> 500 <-> 100 <-> 300 <-> null
        dll.printBackward(); // 300 <-> 100 <-> 500 <-> 200 <-> null
        dll.removeAt(2);
        System.out.println(dll.getAt(1));  // 500
        System.out.println(dll.getAtFromEnd(1));  // 100
    }
}`,

  c: `// Doubly Linked List Implementation in C
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
} Node;

typedef struct {
    Node* head;
    Node* tail;
    int size;
} DoublyLinkedList;

void initList(DoublyLinkedList* list) {
    list->head = NULL;
    list->tail = NULL;
    list->size = 0;
}

// Insert at beginning
void insertFirst(DoublyLinkedList* list, int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->prev = NULL;
    
    if (list->head == NULL) {
        newNode->next = NULL;
        list->head = newNode;
        list->tail = newNode;
    } else {
        newNode->next = list->head;
        list->head->prev = newNode;
        list->head = newNode;
    }
    list->size++;
}

// Insert at end
void insertLast(DoublyLinkedList* list, int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    
    if (list->tail == NULL) {
        newNode->prev = NULL;
        list->head = newNode;
        list->tail = newNode;
    } else {
        newNode->prev = list->tail;
        list->tail->next = newNode;
        list->tail = newNode;
    }
    list->size++;
}

// Insert at index
void insertAt(DoublyLinkedList* list, int data, int index) {
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
    for (int i = 0; i < index; i++) {
        current = current->next;
    }
    
    newNode->prev = current->prev;
    newNode->next = current;
    current->prev->next = newNode;
    current->prev = newNode;
    list->size++;
}

// Remove from beginning
int removeFirst(DoublyLinkedList* list, int* success) {
    if (list->head == NULL) {
        *success = 0;
        return -1;
    }
    
    int data = list->head->data;
    Node* temp = list->head;
    
    if (list->size == 1) {
        list->head = NULL;
        list->tail = NULL;
    } else {
        list->head = list->head->next;
        list->head->prev = NULL;
    }
    
    free(temp);
    list->size--;
    *success = 1;
    return data;
}

// Remove from end
int removeLast(DoublyLinkedList* list, int* success) {
    if (list->tail == NULL) {
        *success = 0;
        return -1;
    }
    
    int data = list->tail->data;
    Node* temp = list->tail;
    
    if (list->size == 1) {
        list->head = NULL;
        list->tail = NULL;
    } else {
        list->tail = list->tail->prev;
        list->tail->next = NULL;
    }
    
    free(temp);
    list->size--;
    *success = 1;
    return data;
}

// Remove at index
int removeAt(DoublyLinkedList* list, int index, int* success) {
    if (index < 0 || index >= list->size) {
        *success = 0;
        return -1;
    }
    if (index == 0) return removeFirst(list, success);
    if (index == list->size - 1) return removeLast(list, success);
    
    Node* current = list->head;
    for (int i = 0; i < index; i++) {
        current = current->next;
    }
    
    int data = current->data;
    current->prev->next = current->next;
    current->next->prev = current->prev;
    free(current);
    list->size--;
    *success = 1;
    return data;
}

// Get at index (forward traversal)
int getAt(DoublyLinkedList* list, int index, int* success) {
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

// Get at index (backward traversal)
int getAtFromEnd(DoublyLinkedList* list, int index, int* success) {
    if (index < 0 || index >= list->size) {
        *success = 0;
        return -1;
    }
    
    Node* current = list->tail;
    for (int i = 0; i < index; i++) {
        current = current->prev;
    }
    
    *success = 1;
    return current->data;
}

// Clear list
void clear(DoublyLinkedList* list) {
    Node* current = list->head;
    while (current != NULL) {
        Node* temp = current;
        current = current->next;
        free(temp);
    }
    list->head = NULL;
    list->tail = NULL;
    list->size = 0;
}

// Print list forward
void printForward(DoublyLinkedList* list) {
    Node* current = list->head;
    while (current != NULL) {
        printf("%d <-> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

// Print list backward
void printBackward(DoublyLinkedList* list) {
    Node* current = list->tail;
    while (current != NULL) {
        printf("%d <-> ", current->data);
        current = current->prev;
    }
    printf("NULL\\n");
}

// Usage Example
int main() {
    DoublyLinkedList list;
    initList(&list);
    
    insertFirst(&list, 100);
    insertFirst(&list, 200);
    insertLast(&list, 300);
    insertAt(&list, 500, 1);
    
    printForward(&list);  // 200 <-> 500 <-> 100 <-> 300 <-> NULL
    printBackward(&list); // 300 <-> 100 <-> 500 <-> 200 <-> NULL
    
    int success;
    removeAt(&list, 2, &success);
    int value = getAt(&list, 1, &success);
    if (success) {
        printf("%d\\n", value);  // 500
    }
    
    value = getAtFromEnd(&list, 1, &success);
    if (success) {
        printf("%d\\n", value);  // 100
    }
    
    clear(&list);
    return 0;
}`,

  cpp: `// Doubly Linked List Implementation in C++
#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    Node* prev;
    
    Node(int data) : data(data), next(nullptr), prev(nullptr) {}
};

class DoublyLinkedList {
private:
    Node* head;
    Node* tail;
    int size;
    
public:
    DoublyLinkedList() : head(nullptr), tail(nullptr), size(0) {}
    
    ~DoublyLinkedList() {
        clear();
    }
    
    // Insert at beginning
    void insertFirst(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
        size++;
    }
    
    // Insert at end
    void insertLast(int data) {
        Node* newNode = new Node(data);
        if (tail == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            newNode->prev = tail;
            tail->next = newNode;
            tail = newNode;
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
        for (int i = 0; i < index; i++) {
            current = current->next;
        }
        
        newNode->prev = current->prev;
        newNode->next = current;
        current->prev->next = newNode;
        current->prev = newNode;
        size++;
    }
    
    // Remove from beginning
    int removeFirst() {
        if (head == nullptr) {
            throw out_of_range("List is empty");
        }
        
        int data = head->data;
        Node* temp = head;
        
        if (size == 1) {
            head = nullptr;
            tail = nullptr;
        } else {
            head = head->next;
            head->prev = nullptr;
        }
        
        delete temp;
        size--;
        return data;
    }
    
    // Remove from end
    int removeLast() {
        if (tail == nullptr) {
            throw out_of_range("List is empty");
        }
        
        int data = tail->data;
        Node* temp = tail;
        
        if (size == 1) {
            head = nullptr;
            tail = nullptr;
        } else {
            tail = tail->prev;
            tail->next = nullptr;
        }
        
        delete temp;
        size--;
        return data;
    }
    
    // Remove at index
    int removeAt(int index) {
        if (index < 0 || index >= size) {
            throw out_of_range("Index out of range");
        }
        if (index == 0) return removeFirst();
        if (index == size - 1) return removeLast();
        
        Node* current = head;
        for (int i = 0; i < index; i++) {
            current = current->next;
        }
        
        int data = current->data;
        current->prev->next = current->next;
        current->next->prev = current->prev;
        delete current;
        size--;
        return data;
    }
    
    // Get at index (forward traversal)
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
    
    // Get at index (backward traversal)
    int getAtFromEnd(int index) {
        if (index < 0 || index >= size) {
            throw out_of_range("Index out of range");
        }
        
        Node* current = tail;
        for (int i = 0; i < index; i++) {
            current = current->prev;
        }
        return current->data;
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
        tail = nullptr;
        size = 0;
    }
    
    // Print list forward
    void printForward() {
        Node* current = head;
        while (current != nullptr) {
            cout << current->data << " <-> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
    
    // Print list backward
    void printBackward() {
        Node* current = tail;
        while (current != nullptr) {
            cout << current->data << " <-> ";
            current = current->prev;
        }
        cout << "NULL" << endl;
    }
};

// Usage Example
int main() {
    DoublyLinkedList dll;
    dll.insertFirst(100);
    dll.insertFirst(200);
    dll.insertLast(300);
    dll.insertAt(500, 1);
    
    dll.printForward();  // 200 <-> 500 <-> 100 <-> 300 <-> NULL
    dll.printBackward(); // 300 <-> 100 <-> 500 <-> 200 <-> NULL
    
    dll.removeAt(2);
    cout << dll.getAt(1) << endl;  // 500
    cout << dll.getAtFromEnd(1) << endl;  // 100
    
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
                 Doubly Linked List Implementation
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