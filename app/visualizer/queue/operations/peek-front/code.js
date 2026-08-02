const codeExamples = {
    javascript: `// Queue peek (front) in JavaScript
class Queue {
  constructor() {
    this.items = [];
  }

  // Get front element without removing
  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  // Helper method
  isEmpty() {
    return this.items.length === 0;
  }
}`,

    python: `# Queue peek (front) in Python
class Queue:
    def __init__(self):
        self.items = []
    
    # Get front element without removing
    def peek(self):
        if self.is_empty():
            return "Queue is empty"
        return self.items[0]
    
    # Helper method
    def is_empty(self):
        return len(self.items) == 0`,

    java: `// Queue peek (front) in Java
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        
        // Peek at front element
        Integer front = queue.peek();
        System.out.println("Front element: " + front);
    }
}`,

    c: `// Queue peek (front) in C
#include <stdio.h>
#define MAX_SIZE 100

typedef struct {
    int items[MAX_SIZE];
    int front, rear;
} Queue;

int peek(Queue *q) {
    if (q->front == -1) {
        printf("Queue is empty\n");
        return -1;
    }
    return q->items[q->front];
}`,

    cpp: `// Queue peek (front) in C++
#include <iostream>
#include <queue>

int main() {
    std::queue<int> q;
    
    // Using STL queue's front() method
    if (!q.empty()) {
        std::cout << "Front element: " << q.front() << std::endl;
    } else {
        std::cout << "Queue is empty" << std::endl;
    }

    // Custom queue implementation
    class CustomQueue {
    private:
        struct Node {
            int data;
            Node* next;
            Node(int val) : data(val), next(nullptr) {}
        };
        Node* front;
        Node* rear;
        
    public:
        CustomQueue() : front(nullptr), rear(nullptr) {}
        
        ~CustomQueue() {
            while (front != nullptr) {
                Node* temp = front;
                front = front->next;
                delete temp;
            }
        }
        
        int peek() const {
            if (front == nullptr) {
                std::cout << "Queue is empty" << std::endl;
                return -1;
            }
            return front->data;
        }
        
        bool isEmpty() const {
            return front == nullptr;
        }
    };
    
    CustomQueue customQ;
    std::cout << "Custom queue front: " << customQ.peek() << std::endl;
    
    return 0;
}`
  };

export default codeExamples;
