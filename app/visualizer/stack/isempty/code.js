const codeExamples = {
    javascript: `// Stack Implementation with isEmpty Operation in JavaScript
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
      console.log("Stack Underflow - Cannot pop from empty stack");
      return -1;
    }
    return this.items[this.top--];
  }

  // Check if stack is empty
  isEmpty() {
    const empty = this.top === -1;
    console.log(\`Stack is \${empty ? "empty" : "not empty"}\`);
    return empty;
  }

  // Display stack
  display() {
    console.log("Current Stack:", this.items.slice(0, this.top + 1));
  }
}

// Usage
const stack = new Stack();
console.log("Initial stack check:");
stack.isEmpty();  // true

stack.push(10);
stack.push(20);
stack.display();
stack.isEmpty();  // false

stack.pop();
stack.pop();
stack.isEmpty();  // true`,

    python: `# Stack Implementation with isEmpty Operation in Python
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
            print("Stack Underflow - Cannot pop from empty stack")
            return -1
        return self.items.pop()
    
    # Check if stack is empty
    def is_empty(self):
        empty = self.top == -1
        print(f"Stack is {'empty' if empty else 'not empty'}")
        return empty
    
    # Display stack
    def display(self):
        print("Current Stack:", self.items)

# Usage
stack = Stack()
print("Initial stack check:")
stack.is_empty()  # True

stack.push(10)
stack.push(20)
stack.display()
stack.is_empty()  # False

stack.pop()
stack.pop()
stack.is_empty()  # True`,

    java: `// Stack Implementation with isEmpty Operation in Java
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
            System.out.println("Stack Underflow - Cannot pop from empty stack");
            return -1;
        }
        return items.remove(top--);
    }
    
    // Check if stack is empty
    public boolean isEmpty() {
        boolean empty = top == -1;
        System.out.println("Stack is " + (empty ? "empty" : "not empty"));
        return empty;
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
        System.out.println("Initial stack check:");
        stack.isEmpty();  // true

        stack.push(10);
        stack.push(20);
        stack.display();
        stack.isEmpty();  // false

        stack.pop();
        stack.pop();
        stack.isEmpty();  // true
    }
}`,

    c: `// Stack Implementation with isEmpty Operation in C
#include <stdio.h>
#include <stdbool.h>
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
    if (isEmpty(s)) {
        printf("Stack Underflow - Cannot pop from empty stack\n");
        return -1;
    }
    return s->items[s->top--];
}

// Check if stack is empty
bool isEmpty(Stack *s) {
    bool empty = s->top == -1;
    printf("Stack is %s\n", empty ? "empty" : "not empty");
    return empty;
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
    
    printf("Initial stack check:\n");
    isEmpty(&stack);  // true

    push(&stack, 10);
    push(&stack, 20);
    display(&stack);
    isEmpty(&stack);  // false

    pop(&stack);
    pop(&stack);
    isEmpty(&stack);  // true
    
    return 0;
}`,

    cpp: `// Stack Implementation with isEmpty Operation in C++
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
            cout << "Stack Underflow - Cannot pop from empty stack" << endl;
            return -1;
        }
        int element = items.back();
        items.pop_back();
        top--;
        return element;
    }
    
    // Check if stack is empty
    bool isEmpty() const {
        bool empty = top == -1;
        cout << "Stack is " << (empty ? "empty" : "not empty") << endl;
        return empty;
    }
    
    // Display stack
    void display() const {
        cout << "Current Stack: ";
        for (int i = 0; i <= top; i++) {
            cout << items[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    Stack stack;
    
    cout << "Initial stack check:" << endl;
    stack.isEmpty();  // true

    stack.push(10);
    stack.push(20);
    stack.display();
    stack.isEmpty();  // false

    stack.pop();
    stack.pop();
    stack.isEmpty();  // true
    
    return 0;
}`,
  };

export default codeExamples;
