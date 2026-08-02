const codeExamples = {
    javascript: `// Array Queue isFull in JavaScript
class ArrayQueue {
  constructor(capacity) {
    this.arr = new Array(capacity);
    this.front = -1;
    this.rear = -1;
    this.capacity = capacity;
  }

  isFull() {
    return (this.rear + 1) % this.capacity === this.front;
  }
}`,

    python: `# Array Queue isFull in Python
class ArrayQueue:
    def __init__(self, capacity):
        self.arr = [None] * capacity
        self.front = -1
        self.rear = -1
        self.capacity = capacity
    
    def is_full(self):
        return (self.rear + 1) % self.capacity == self.front`,

    java: `// Array Queue isFull in Java
public class ArrayQueue {
    private int[] arr;
    private int front, rear, capacity;
    
    public ArrayQueue(int size) {
        capacity = size;
        arr = new int[capacity];
        front = rear = -1;
    }
    
    public boolean isFull() {
        return (rear + 1) % capacity == front;
    }
}`,

    c: `// Array Queue isFull in C
#include <stdbool.h>
#define MAX_SIZE 100

typedef struct {
    int arr[MAX_SIZE];
    int front, rear;
} Queue;

bool isFull(Queue *q) {
    return (q->rear + 1) % MAX_SIZE == q->front;
}`,

    cpp: `// Array Queue isFull in C++
#include <iostream>

class ArrayQueue {
private:
    int* arr;
    int front;
    int rear;
    int capacity;
    
public:
    ArrayQueue(int size) : front(-1), rear(-1), capacity(size) {
        arr = new int[capacity];
    }
    
    ~ArrayQueue() {
        delete[] arr;
    }
    
    bool isFull() const {
        return (rear + 1) % capacity == front;
    }
};`
  };

export default codeExamples;
