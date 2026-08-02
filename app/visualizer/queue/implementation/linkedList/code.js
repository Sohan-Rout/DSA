const codeExamples = {
  javascript: `// Queue Implementation in JavaScript (Linked List)
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }
  
  // Add element to the rear (enqueue)
  enqueue(item) {
    const newNode = new Node(item);
    if (this.rear === null) {
      this.front = this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
  }
  
  // Remove element from front (dequeue)
  dequeue() {
    if (this.front === null) {
      return "Queue Underflow";
    }
    const temp = this.front;
    this.front = temp.next;
    
    if (this.front === null) {
      this.rear = null;
    }
    return temp.data;
  }

  // Check if queue is empty
  isEmpty() {
    return this.front === null;
  }
}

// Usage Example
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.dequeue()); // 10
console.log(queue.dequeue()); // 20
console.log(queue.isEmpty()); // false`,

  python: `# Queue Implementation in Python (Linked List)
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Queue:
    def __init__(self):
        self.front = None
        self.rear = None
    
    # Add element to the rear (enqueue)
    def enqueue(self, item):
        new_node = Node(item)
        if self.rear is None:
            self.front = self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node
    
    # Remove element from front (dequeue)
    def dequeue(self):
        if self.front is None:
            return "Queue Underflow"
        temp = self.front
        self.front = temp.next
        
        if self.front is None:
            self.rear = None
        return temp.data

    # Check if queue is empty
    def is_empty(self):
        return self.front is None

# Usage Example
q = Queue()
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
print(q.dequeue())  # 10
print(q.dequeue())  # 20
print(q.is_empty()) # False`,

  java: `// Queue Implementation in Java (Linked List)
public class LinkedListQueue {
    private class Node {
        int data;
        Node next;
        
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    private Node front, rear;
    
    public LinkedListQueue() {
        front = rear = null;
    }
    
    // Add element to the rear (enqueue)
    public void enqueue(int item) {
        Node newNode = new Node(item);
        if (rear == null) {
            front = rear = newNode;
        } else {
            rear.next = newNode;
            rear = newNode;
        }
    }
    
    // Remove element from front (dequeue)
    public int dequeue() {
        if (front == null) {
            System.out.println("Queue Underflow");
            return -1;
        }
        Node temp = front;
        front = front.next;
        
        if (front == null) {
            rear = null;
        }
        return temp.data;
    }

    // Check if queue is empty
    public boolean isEmpty() {
        return front == null;
    }

    public static void main(String[] args) {
        LinkedListQueue queue = new LinkedListQueue();
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        System.out.println(queue.dequeue()); // 10
        System.out.println(queue.dequeue()); // 20
        System.out.println(queue.isEmpty()); // false
    }
}`,

  c: `// Queue Implementation in C (Linked List)
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

typedef struct {
    Node* front;
    Node* rear;
} Queue;

void initialize(Queue* q) {
    q->front = q->rear = NULL;
}

// Add element to the rear (enqueue)
void enqueue(Queue* q, int item) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = item;
    newNode->next = NULL;
    
    if (q->rear == NULL) {
        q->front = q->rear = newNode;
    } else {
        q->rear->next = newNode;
        q->rear = newNode;
    }
}

// Remove element from front (dequeue)
int dequeue(Queue* q) {
    if (q->front == NULL) {
        printf("Queue Underflow\n");
        return -1;
    }
    Node* temp = q->front;
    int item = temp->data;
    q->front = q->front->next;
    
    if (q->front == NULL) {
        q->rear = NULL;
    }
    free(temp);
    return item;
}

// Check if queue is empty
bool isEmpty(Queue* q) {
    return q->front == NULL;
}

int main() {
    Queue q;
    initialize(&q);
    
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    
    printf("%d\n", dequeue(&q)); // 10
    printf("%d\n", dequeue(&q)); // 20
    printf("%s\n", isEmpty(&q) ? "true" : "false"); // false
    
    return 0;
}`,

  cpp: `// Queue Implementation in C++ (Linked List)
#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};

class Queue {
private:
    Node* front;
    Node* rear;
    
public:
    Queue() : front(nullptr), rear(nullptr) {}
    
    ~Queue() {
        while (!isEmpty()) {
            dequeue();
        }
    }
    
    // Add element to the rear (enqueue)
    void enqueue(int item) {
        Node* newNode = new Node(item);
        if (rear == nullptr) {
            front = rear = newNode;
        } else {
            rear->next = newNode;
            rear = newNode;
        }
    }
    
    // Remove element from front (dequeue)
    int dequeue() {
        if (front == nullptr) {
            cout << "Queue Underflow" << endl;
            return -1;
        }
        Node* temp = front;
        int item = temp->data;
        front = front->next;
        
        if (front == nullptr) {
            rear = nullptr;
        }
        
        delete temp;
        return item;
    }
    
    // Check if queue is empty
    bool isEmpty() const {
        return front == nullptr;
    }
};

int main() {
    Queue q;
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    
    cout << q.dequeue() << endl; // 10
    cout << q.dequeue() << endl; // 20
    cout << boolalpha << q.isEmpty() << endl; // false
    
    return 0;
}`
};

export default codeExamples;
