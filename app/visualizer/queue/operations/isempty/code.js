const codeExamples = {
    javascript: `// Queue Implementation in JavaScript (Linked List)
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  // Check if queue is empty
  isEmpty() {
    return this.front === null;
  }
}`,
  
    python: `# Queue Implementation in Python (Linked List)
class Queue:
    def __init__(self):
        self.front = None
        self.rear = None
    
    # Check if queue is empty
    def is_empty(self):
        return self.front is None`,
  
    java: `// Queue Implementation in Java (Array)
public class ArrayQueue {
    private int front, rear;
    private int[] arr;
    
    public ArrayQueue(int size) {
        arr = new int[size];
        front = rear = -1;
    }
    
    // Check if queue is empty
    public boolean isEmpty() {
        return front == -1;
    }
}`,
  
    c: `// Queue Implementation in C (Array)
#include <stdbool.h>
#define MAX_SIZE 100

typedef struct {
    int arr[MAX_SIZE];
    int front, rear;
} Queue;

// Check if queue is empty
bool isEmpty(Queue *q) {
    return q->front == -1;
}`,

    cpp: `// Queue Implementation in C++ (Linked List)
#include <iostream>

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
        while (front != nullptr) {
            Node* temp = front;
            front = front->next;
            delete temp;
        }
    }
    
    // Check if queue is empty
    bool isEmpty() const {
        return front == nullptr;
    }
};`
  };

export default codeExamples;
