const codeExamples = {
    javascript: `// Stack Implementation with Peek Operation in JavaScript
class Stack {
  constructor() {
    this.items = [];
    this.top = -1;
  }

  // Push operation
  push(element) {
    this.items[++this.top] = element;
    console.log(\`Pushed: \${element}\`);
  }

  // Pop operation
  pop() {
    if (this.isEmpty()) {
      console.log("Stack Underflow");
      return -1;
    }
    return this.items[this.top--];
  }

  // Peek operation
  peek() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return -1;
    }
    console.log(\`Top element: \${this.items[this.top]}\`);
    return this.items[this.top];
  }

  // Check if stack is empty
  isEmpty() {
    return this.top === -1;
  }

  // Display stack
  display() {
    console.log("Current Stack:", this.items.slice(0, this.top + 1));
  }
}

// Usage
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
stack.display();
stack.peek();
stack.pop();
stack.peek();`,

    python: `# Stack Implementation with Peek Operation in Python
class Stack:
    def __init__(self):
        self.items = []
        self.top = -1
    
    # Push operation
    def push(self, element):
        self.top += 1
        self.items.append(element)
        print(f"Pushed: {element}")
    
    # Pop operation
    def pop(self):
        if self.is_empty():
            print("Stack Underflow")
            return -1
        return self.items.pop()
    
    # Peek operation
    def peek(self):
        if self.is_empty():
            print("Stack is empty")
            return -1
        print(f"Top element: {self.items[-1]}")
        return self.items[-1]
    
    # Check if stack is empty
    def is_empty(self):
        return self.top == -1
    
    # Display stack
    def display(self):
        print("Current Stack:", self.items)

# Usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
stack.display()
stack.peek()
stack.pop()
stack.peek()`,

    java: `// Stack Implementation with Peek Operation in Java
import java.util.ArrayList;

class Stack {
    private ArrayList<Integer> items;
    private int top;
    
    public Stack() {
        items = new ArrayList<>();
        top = -1;
    }
    
    // Push operation
    public void push(int element) {
        items.add(++top, element);
        System.out.println("Pushed: " + element);
    }
    
    // Pop operation
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow");
            return -1;
        }
        return items.remove(top--);
    }
    
    // Peek operation
    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return -1;
        }
        System.out.println("Top element: " + items.get(top));
        return items.get(top);
    }
    
    // Check if stack is empty
    public boolean isEmpty() {
        return top == -1;
    }
    
    // Display stack
    public void display() {
        System.out.print("Current Stack: ");
        for (int i = 0; i <= top; i++) {
            System.out.print(items.get(i) + " ");
        }
        System.out.println();
    }
}

public class Main {
    public static void main(String[] args) {
        Stack stack = new Stack();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.display();
        stack.peek();
        stack.pop();
        stack.peek();
    }
}`,

    c: `// Stack Implementation with Peek Operation in C
#include <stdio.h>
#include <stdlib.h>
#define MAX_SIZE 100

typedef struct {
    int items[MAX_SIZE];
    int top;
} Stack;

void initialize(Stack *s) {
    s->top = -1;
}

// Push operation
void push(Stack *s, int element) {
    if (s->top == MAX_SIZE - 1) {
        printf("Stack Overflow\n");
        return;
    }
    s->items[++s->top] = element;
    printf("Pushed: %d\n", element);
}

// Pop operation
int pop(Stack *s) {
    if (s->top == -1) {
        printf("Stack Underflow\n");
        return -1;
    }
    return s->items[s->top--];
}

// Peek operation
int peek(Stack *s) {
    if (s->top == -1) {
        printf("Stack is empty\n");
        return -1;
    }
    printf("Top element: %d\n", s->items[s->top]);
    return s->items[s->top];
}

// Check if stack is empty
int isEmpty(Stack *s) {
    return s->top == -1;
}

// Display stack
void display(Stack *s) {
    printf("Current Stack: ");
    for (int i = 0; i <= s->top; i++) {
        printf("%d ", s->items[i]);
    }
    printf("\n");
}

int main() {
    Stack stack;
    initialize(&stack);
    
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    display(&stack);
    peek(&stack);
    pop(&stack);
    peek(&stack);
    
    return 0;
}`,

    cpp: `// Stack Implementation with Peek Operation in C++
#include <iostream>
#include <vector>
using namespace std;

class Stack {
private:
    vector<int> items;
    int top;
    const int MAX_SIZE = 100;

public:
    Stack() : top(-1) {}
    
    // Push operation
    void push(int element) {
        if (top == MAX_SIZE - 1) {
            cout << "Stack Overflow" << endl;
            return;
        }
        items.push_back(element);
        top++;
        cout << "Pushed: " << element << endl;
    }
    
    // Pop operation
    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow" << endl;
            return -1;
        }
        int element = items.back();
        items.pop_back();
        top--;
        return element;
    }
    
    // Peek operation
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return -1;
        }
        cout << "Top element: " << items.back() << endl;
        return items.back();
    }
    
    // Check if stack is empty
    bool isEmpty() {
        return top == -1;
    }
    
    // Display stack
    void display() {
        cout << "Current Stack: ";
        for (int i = 0; i <= top; i++) {
            cout << items[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    Stack stack;
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.display();
    stack.peek();
    stack.pop();
    stack.peek();
    
    return 0;
}`
  };

export default codeExamples;
