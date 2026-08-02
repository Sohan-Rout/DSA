const codeExamples = {
    javascript: `// Stack Implementation with Push/Pop in JavaScript
class Stack {
  constructor() {
    this.items = [];
    this.top = -1;
    this.MAX_SIZE = 10;
  }

  // Push operation
  push(element) {
    if (this.top >= this.MAX_SIZE - 1) {
      console.log("Stack Overflow");
      return;
    }
    this.items[++this.top] = element;
    console.log(\`Pushed: \${element}\`);
  }

  // Pop operation
  pop() {
    if (this.top < 0) {
      console.log("Stack Underflow");
      return -1;
    }
    const element = this.items[this.top--];
    console.log(\`Popped: \${element}\`);
    return element;
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
stack.pop();
stack.display();`,

    python: `# Stack Implementation with Push/Pop in Python
class Stack:
    def __init__(self):
        self.items = []
        self.top = -1
        self.MAX_SIZE = 10
    
    # Push operation
    def push(self, element):
        if self.top >= self.MAX_SIZE - 1:
            print("Stack Overflow")
            return
        self.top += 1
        self.items.append(element)
        print(f"Pushed: {element}")
    
    # Pop operation
    def pop(self):
        if self.top < 0:
            print("Stack Underflow")
            return -1
        element = self.items.pop()
        self.top -= 1
        print(f"Popped: {element}")
        return element
    
    # Display stack
    def display(self):
        print("Current Stack:", self.items)

# Usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
stack.display()
stack.pop()
stack.display()`,

    java: `// Stack Implementation with Push/Pop in Java
import java.util.ArrayList;

class Stack {
    private ArrayList<Integer> items;
    private int top;
    private final int MAX_SIZE = 10;
    
    public Stack() {
        items = new ArrayList<>();
        top = -1;
    }
    
    // Push operation
    public void push(int element) {
        if (top >= MAX_SIZE - 1) {
            System.out.println("Stack Overflow");
            return;
        }
        items.add(++top, element);
        System.out.println("Pushed: " + element);
    }
    
    // Pop operation
    public int pop() {
        if (top < 0) {
            System.out.println("Stack Underflow");
            return -1;
        }
        int element = items.remove(top--);
        System.out.println("Popped: " + element);
        return element;
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
        stack.pop();
        stack.display();
    }
}`,

    c: `// Stack Implementation with Push/Pop in C
#include <stdio.h>
#include <stdlib.h>
#define MAX_SIZE 10

typedef struct {
    int items[MAX_SIZE];
    int top;
} Stack;

void initialize(Stack *s) {
    s->top = -1;
}

// Push operation
void push(Stack *s, int element) {
    if (s->top >= MAX_SIZE - 1) {
        printf("Stack Overflow\\n");
        return;
    }
    s->items[++s->top] = element;
    printf("Pushed: %d\\n", element);
}

// Pop operation
int pop(Stack *s) {
    if (s->top < 0) {
        printf("Stack Underflow\\n");
        return -1;
    }
    int element = s->items[s->top--];
    printf("Popped: %d\\n", element);
    return element;
}

// Display stack
void display(Stack *s) {
    printf("Current Stack: ");
    for (int i = 0; i <= s->top; i++) {
        printf("%d ", s->items[i]);
    }
    printf("\\n");
}

int main() {
    Stack stack;
    initialize(&stack);
    
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    display(&stack);
    pop(&stack);
    display(&stack);
    
    return 0;
}`,

    cpp: `// Stack Implementation with Push/Pop in C++
#include <iostream>
#include <vector>
using namespace std;

class Stack {
private:
    vector<int> items;
    int top;
    const int MAX_SIZE = 10;

public:
    Stack() : top(-1) {}
    
    // Push operation
    void push(int element) {
        if (top >= MAX_SIZE - 1) {
            cout << "Stack Overflow" << endl;
            return;
        }
        items.push_back(element);
        top++;
        cout << "Pushed: " << element << endl;
    }
    
    // Pop operation
    int pop() {
        if (top < 0) {
            cout << "Stack Underflow" << endl;
            return -1;
        }
        int element = items.back();
        items.pop_back();
        top--;
        cout << "Popped: " << element << endl;
        return element;
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
    stack.pop();
    stack.display();
    
    return 0;
}`,
  };

export default codeExamples;
