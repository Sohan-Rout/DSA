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
}

// Usage Example
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.dequeue()); // 10
console.log(queue.dequeue()); // 20`,

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

# Usage Example
q = Queue()
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
print(q.dequeue())  # 10
print(q.dequeue())  # 20`,

    java: `// Queue Implementation in Java (Array)
public class ArrayQueue {
    private int[] arr;
    private int front, rear, capacity;
    
    public ArrayQueue(int size) {
        capacity = size;
        arr = new int[capacity];
        front = rear = -1;
    }
    
    // Add element to the rear (enqueue)
    public void enqueue(int item) {
        if ((rear + 1) % capacity == front) {
            System.out.println("Queue Overflow");
            return;
        }
        if (front == -1) {
            front = rear = 0;
        } else {
            rear = (rear + 1) % capacity;
        }
        arr[rear] = item;
    }
    
    // Remove element from front (dequeue)
    public int dequeue() {
        if (front == -1) {
            System.out.println("Queue Underflow");
            return -1;
        }
        int item = arr[front];
        if (front == rear) {
            front = rear = -1;
        } else {
            front = (front + 1) % capacity;
        }
        return item;
    }

    public static void main(String[] args) {
        ArrayQueue queue = new ArrayQueue(5);
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        System.out.println(queue.dequeue()); // 10
        System.out.println(queue.dequeue()); // 20
    }
}`,

    c: `// Queue Implementation in C (Array)
#include <stdio.h>
#include <stdbool.h>

#define MAX_SIZE 100

typedef struct {
    int arr[MAX_SIZE];
    int front, rear;
} Queue;

void initialize(Queue *q) {
    q->front = q->rear = -1;
}

bool isEmpty(Queue *q) {
    return q->front == -1;
}

bool isFull(Queue *q) {
    return (q->rear + 1) % MAX_SIZE == q->front;
}

// Add element to the rear (enqueue)
void enqueue(Queue *q, int item) {
    if (isFull(q)) {
        printf("Queue Overflow\\n");
        return;
    }
    if (isEmpty(q)) {
        q->front = q->rear = 0;
    } else {
        q->rear = (q->rear + 1) % MAX_SIZE;
    }
    q->arr[q->rear] = item;
}

// Remove element from front (dequeue)
int dequeue(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue Underflow\\n");
        return -1;
    }
    int item = q->arr[q->front];
    if (q->front == q->rear) {
        q->front = q->rear = -1;
    } else {
        q->front = (q->front + 1) % MAX_SIZE;
    }
    return item;
}

int main() {
    Queue q;
    initialize(&q);
    
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    
    printf("%d\\n", dequeue(&q)); // 10
    printf("%d\\n", dequeue(&q)); // 20
    
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
    
    return 0;
}`,
  };

export default codeExamples;
