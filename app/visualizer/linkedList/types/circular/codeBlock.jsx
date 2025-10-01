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
  javascript: `// Circular Linked List Implementation in JavaScript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
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
      newNode.next = this.head; // Point to itself
    } else {
      newNode.next = this.head;
      this.head = newNode;
      this.tail.next = this.head; // Update tail's next to new head
    }
    this.size++;
  }

  // Insert at end
  insertLast(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head;
    } else {
      this.tail.next = newNode;
      newNode.next = this.head;
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

    while (count < index - 1) {
      current = current.next;
      count++;
    }

    newNode.next = current.next;
    current.next = newNode;
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
      this.tail.next = this.head; // Update tail's next to new head
    }
    this.size--;
    return removedNode.data;
  }

  // Remove from end
  removeLast() {
    if (!this.head) return null;
    const removedNode = this.tail;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current.next !== this.tail) {
        current = current.next;
      }
      current.next = this.head; // Point new tail to head
      this.tail = current;
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
    while (count < index - 1) {
      current = current.next;
      count++;
    }
    const removedNode = current.next;
    current.next = removedNode.next;
    this.size--;
    return removedNode.data;
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

  // Clear list
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Print list
  print() {
    if (!this.head) {
      console.log("List is empty");
      return;
    }
    let current = this.head;
    let result = "";
    do {
      result += current.data + " -> ";
      current = current.next;
    } while (current !== this.head);
    result += "(head)";
    console.log(result);
  }

  // Check if list is circular
  isCircular() {
    if (!this.head) return true;
    let slow = this.head;
    let fast = this.head.next;
    while (fast && fast.next) {
      if (slow === fast) return true;
      slow = slow.next;
      fast = fast.next.next;
    }
    return false;
  }
}

// Usage Example
const cll = new CircularLinkedList();
cll.insertFirst(100);
cll.insertFirst(200);
cll.insertLast(300);
cll.insertAt(500, 1);
cll.print(); // 200 -> 500 -> 100 -> 300 -> (head)
cll.removeAt(2);
console.log(cll.getAt(1)); // 500
console.log("Is circular:", cll.isCircular()); // true`,

  python: `# Circular Linked List Implementation in Python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class CircularLinkedList:
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
            new_node.next = self.head  # Point to itself
        else:
            new_node.next = self.head
            self.head = new_node
            self.tail.next = self.head  # Update tail's next to new head
        self.size += 1

    # Insert at end
    def insert_last(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            self.tail = new_node
            new_node.next = self.head
        else:
            self.tail.next = new_node
            new_node.next = self.head
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

        while count < index - 1:
            current = current.next
            count += 1

        new_node.next = current.next
        current.next = new_node
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
            self.tail.next = self.head  # Update tail's next to new head
        self.size -= 1
        return removed_node.data

    # Remove from end
    def remove_last(self):
        if not self.head:
            return None
        removed_node = self.tail
        if self.size == 1:
            self.head = None
            self.tail = None
        else:
            current = self.head
            while current.next != self.tail:
                current = current.next
            current.next = self.head  # Point new tail to head
            self.tail = current
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
        while count < index - 1:
            current = current.next
            count += 1

        removed_node = current.next
        current.next = removed_node.next
        self.size -= 1
        return removed_node.data

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

    # Clear list
    def clear(self):
        self.head = None
        self.tail = None
        self.size = 0

    # Print list
    def print_list(self):
        if not self.head:
            print("List is empty")
            return
        current = self.head
        result = []
        while True:
            result.append(str(current.data))
            current = current.next
            if current == self.head:
                break
        print(" -> ".join(result) + " -> (head)")

    # Check if list is circular
    def is_circular(self):
        if not self.head:
            return True
        slow = self.head
        fast = self.head.next
        while fast and fast.next:
            if slow == fast:
                return True
            slow = slow.next
            fast = fast.next.next
        return False

# Usage Example
cll = CircularLinkedList()
cll.insert_first(100)
cll.insert_first(200)
cll.insert_last(300)
cll.insert_at(500, 1)
cll.print_list()  # 200 -> 500 -> 100 -> 300 -> (head)
cll.remove_at(2)
print(cll.get_at(1))  # 500
print("Is circular:", cll.is_circular())  # True`,

  java: `// Circular Linked List Implementation in Java
public class CircularLinkedList {
    private class Node {
        int data;
        Node next;
        
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    private Node head;
    private Node tail;
    private int size;
    
    public CircularLinkedList() {
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
            newNode.next = head; // Point to itself
        } else {
            newNode.next = head;
            head = newNode;
            tail.next = head; // Update tail's next to new head
        }
        size++;
    }
    
    // Insert at end
    public void insertLast(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            tail = newNode;
            newNode.next = head;
        } else {
            tail.next = newNode;
            newNode.next = head;
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
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
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
            tail.next = head; // Update tail's next to new head
        }
        size--;
        return removedData;
    }
    
    // Remove from end
    public Integer removeLast() {
        if (head == null) return null;
        int removedData = tail.data;
        if (size == 1) {
            head = null;
            tail = null;
        } else {
            Node current = head;
            while (current.next != tail) {
                current = current.next;
            }
            current.next = head; // Point new tail to head
            tail = current;
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
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        int removedData = current.next.data;
        current.next = current.next.next;
        size--;
        return removedData;
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
    
    // Clear list
    public void clear() {
        head = null;
        tail = null;
        size = 0;
    }
    
    // Print list
    public void printList() {
        if (head == null) {
            System.out.println("List is empty");
            return;
        }
        Node current = head;
        do {
            System.out.print(current.data + " -> ");
            current = current.next;
        } while (current != head);
        System.out.println("(head)");
    }
    
    // Check if list is circular
    public boolean isCircular() {
        if (head == null) return true;
        Node slow = head;
        Node fast = head.next;
        while (fast != null && fast.next != null) {
            if (slow == fast) return true;
            slow = slow.next;
            fast = fast.next.next;
        }
        return false;
    }
    
    // Usage Example
    public static void main(String[] args) {
        CircularLinkedList cll = new CircularLinkedList();
        cll.insertFirst(100);
        cll.insertFirst(200);
        cll.insertLast(300);
        cll.insertAt(500, 1);
        cll.printList();  // 200 -> 500 -> 100 -> 300 -> (head)
        cll.removeAt(2);
        System.out.println(cll.getAt(1));  // 500
        System.out.println("Is circular: " + cll.isCircular());  // true
    }
}`,

  c: `// Circular Linked List Implementation in C
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

typedef struct {
    Node* head;
    Node* tail;
    int size;
} CircularLinkedList;

void initList(CircularLinkedList* list) {
    list->head = NULL;
    list->tail = NULL;
    list->size = 0;
}

// Insert at beginning
void insertFirst(CircularLinkedList* list, int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    
    if (list->head == NULL) {
        list->head = newNode;
        list->tail = newNode;
        newNode->next = list->head; // Point to itself
    } else {
        newNode->next = list->head;
        list->head = newNode;
        list->tail->next = list->head; // Update tail's next to new head
    }
    list->size++;
}

// Insert at end
void insertLast(CircularLinkedList* list, int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    
    if (list->head == NULL) {
        list->head = newNode;
        list->tail = newNode;
        newNode->next = list->head;
    } else {
        list->tail->next = newNode;
        newNode->next = list->head;
        list->tail = newNode;
    }
    list->size++;
}

// Insert at index
void insertAt(CircularLinkedList* list, int data, int index) {
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

// Remove from beginning
int removeFirst(CircularLinkedList* list, int* success) {
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
        list->tail->next = list->head; // Update tail's next to new head
    }
    
    free(temp);
    list->size--;
    *success = 1;
    return data;
}

// Remove from end
int removeLast(CircularLinkedList* list, int* success) {
    if (list->head == NULL) {
        *success = 0;
        return -1;
    }
    
    int data = list->tail->data;
    Node* temp = list->tail;
    
    if (list->size == 1) {
        list->head = NULL;
        list->tail = NULL;
    } else {
        Node* current = list->head;
        while (current->next != list->tail) {
            current = current->next;
        }
        current->next = list->head; // Point new tail to head
        list->tail = current;
    }
    
    free(temp);
    list->size--;
    *success = 1;
    return data;
}

// Remove at index
int removeAt(CircularLinkedList* list, int index, int* success) {
    if (index < 0 || index >= list->size) {
        *success = 0;
        return -1;
    }
    if (index == 0) return removeFirst(list, success);
    if (index == list->size - 1) return removeLast(list, success);
    
    Node* current = list->head;
    for (int i = 0; i < index - 1; i++) {
        current = current->next;
    }
    
    Node* temp = current->next;
    int data = temp->data;
    current->next = temp->next;
    free(temp);
    list->size--;
    *success = 1;
    return data;
}

// Get at index
int getAt(CircularLinkedList* list, int index, int* success) {
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

// Clear list
void clear(CircularLinkedList* list) {
    if (list->head == NULL) return;
    
    Node* current = list->head;
    Node* temp;
    
    do {
        temp = current;
        current = current->next;
        free(temp);
    } while (current != list->head);
    
    list->head = NULL;
    list->tail = NULL;
    list->size = 0;
}

// Print list
void printList(CircularLinkedList* list) {
    if (list->head == NULL) {
        printf("List is empty\\n");
        return;
    }
    
    Node* current = list->head;
    do {
        printf("%d -> ", current->data);
        current = current->next;
    } while (current != list->head);
    printf("(head)\\n");
}

// Check if list is circular
int isCircular(CircularLinkedList* list) {
    if (list->head == NULL) return 1;
    
    Node* slow = list->head;
    Node* fast = list->head->next;
    
    while (fast != NULL && fast->next != NULL) {
        if (slow == fast) return 1;
        slow = slow->next;
        fast = fast->next->next;
    }
    return 0;
}

// Usage Example
int main() {
    CircularLinkedList list;
    initList(&list);
    
    insertFirst(&list, 100);
    insertFirst(&list, 200);
    insertLast(&list, 300);
    insertAt(&list, 500, 1);
    printList(&list);  // 200 -> 500 -> 100 -> 300 -> (head)
    
    int success;
    removeAt(&list, 2, &success);
    int value = getAt(&list, 1, &success);
    if (success) {
        printf("%d\\n", value);  // 500
    }
    
    printf("Is circular: %d\\n", isCircular(&list));  // 1
    
    clear(&list);
    return 0;
}`,

  cpp: `// Circular Linked List Implementation in C++
#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    
    Node(int data) : data(data), next(nullptr) {}
};

class CircularLinkedList {
private:
    Node* head;
    Node* tail;
    int size;
    
public:
    CircularLinkedList() : head(nullptr), tail(nullptr), size(0) {}
    
    ~CircularLinkedList() {
        clear();
    }
    
    // Insert at beginning
    void insertFirst(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
            newNode->next = head; // Point to itself
        } else {
            newNode->next = head;
            head = newNode;
            tail->next = head; // Update tail's next to new head
        }
        size++;
    }
    
    // Insert at end
    void insertLast(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
            newNode->next = head;
        } else {
            tail->next = newNode;
            newNode->next = head;
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
        for (int i = 0; i < index - 1; i++) {
            current = current->next;
        }
        
        newNode->next = current->next;
        current->next = newNode;
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
            tail->next = head; // Update tail's next to new head
        }
        
        delete temp;
        size--;
        return data;
    }
    
    // Remove from end
    int removeLast() {
        if (head == nullptr) {
            throw out_of_range("List is empty");
        }
        
        int data = tail->data;
        Node* temp = tail;
        
        if (size == 1) {
            head = nullptr;
            tail = nullptr;
        } else {
            Node* current = head;
            while (current->next != tail) {
                current = current->next;
            }
            current->next = head; // Point new tail to head
            tail = current;
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
    
    // Clear list
    void clear() {
        if (head == nullptr) return;
        
        Node* current = head;
        Node* temp;
        
        do {
            temp = current;
            current = current->next;
            delete temp;
        } while (current != head);
        
        head = nullptr;
        tail = nullptr;
        size = 0;
    }
    
    // Print list
    void printList() {
        if (head == nullptr) {
            cout << "List is empty" << endl;
            return;
        }
        
        Node* current = head;
        do {
            cout << current->data << " -> ";
            current = current->next;
        } while (current != head);
        cout << "(head)" << endl;
    }
    
    // Check if list is circular
    bool isCircular() {
        if (head == nullptr) return true;
        
        Node* slow = head;
        Node* fast = head->next;
        
        while (fast != nullptr && fast->next != nullptr) {
            if (slow == fast) return true;
            slow = slow->next;
            fast = fast->next->next;
        }
        return false;
    }
};

// Usage Example
int main() {
    CircularLinkedList cll;
    cll.insertFirst(100);
    cll.insertFirst(200);
    cll.insertLast(300);
    cll.insertAt(500, 1);
    cll.printList();  // 200 -> 500 -> 100 -> 300 -> (head)
    
    cll.removeAt(2);
    cout << cll.getAt(1) << endl;  // 500
    cout << "Is circular: " << boolalpha << cll.isCircular() << endl;  // true
    
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
                 Circular Linked List Implementation
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