const codeExamples = {
    javascript: `// Prefix Evaluation using Stack (JavaScript)
function evaluatePrefix(expression) {
  let stack = [];
  // Process expression in reverse order
  for (let i = expression.length - 1; i >= 0; i--) {
    const char = expression[i];
    if (!isNaN(char)) {
      stack.push(parseInt(char));
    } else {
      const a = stack.pop();
      const b = stack.pop();
      
      switch(char) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(Math.floor(a / b)); break;
      }
    }
  }
  return stack.pop();
}

// Example: "+*235" becomes (2*3)+5 = 11
console.log(evaluatePrefix("+*235")); // Output: 11`,

    python: `# Prefix Evaluation using Stack (Python)
def evaluate_prefix(expression):
    stack = []
    # Process expression in reverse order
    for char in reversed(expression):
        if char.isdigit():
            stack.append(int(char))
        else:
            a = stack.pop()
            b = stack.pop()
            
            if char == '+': stack.append(a + b)
            elif char == '-': stack.append(a - b)
            elif char == '*': stack.append(a * b)
            elif char == '/': stack.append(a // b)
    
    return stack.pop()

# Example: "+*235" becomes (2*3)+5 = 11
print(evaluate_prefix("+*235"))  # Output: 11`,

    java: `// Prefix Evaluation using Stack (Java)
import java.util.Stack;

public class PrefixEvaluator {
    public static int evaluatePrefix(String expression) {
        Stack<Integer> stack = new Stack<>();
        // Process expression in reverse order
        for (int i = expression.length() - 1; i >= 0; i--) {
            char c = expression.charAt(i);
            if (Character.isDigit(c)) {
                stack.push(c - '0');
            } else {
                int a = stack.pop();
                int b = stack.pop();
                
                switch (c) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(a / b); break;
                }
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        // Example: "+*235" becomes (2*3)+5 = 11
        System.out.println(evaluatePrefix("+*235"));  // Output: 11
    }
}`,

    c: `// Prefix Evaluation using Stack (C)
#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

#define MAX_SIZE 100

typedef struct {
    int data[MAX_SIZE];
    int top;
} Stack;

void push(Stack *s, int val) {
    s->data[++s->top] = val;
}

int pop(Stack *s) {
    return s->data[s->top--];
}

int evaluatePrefix(char* expression) {
    Stack s = { .top = -1 };
    int length = strlen(expression);
    
    // Process expression in reverse order
    for (int i = length - 1; i >= 0; i--) {
        if (isdigit(expression[i])) {
            push(&s, expression[i] - '0');
        } else {
            int a = pop(&s);
            int b = pop(&s);
            
            switch (expression[i]) {
                case '+': push(&s, a + b); break;
                case '-': push(&s, a - b); break;
                case '*': push(&s, a * b); break;
                case '/': push(&s, a / b); break;
            }
        }
    }
    return pop(&s);
}

int main() {
    // Example: "+*235" becomes (2*3)+5 = 11
    printf("%d\n", evaluatePrefix("+*235"));  // Output: 11
    return 0;
}`,

    cpp: `// Prefix Evaluation using Stack (C++)
#include <iostream>
#include <stack>
#include <string>
#include <cctype>
using namespace std;

int evaluatePrefix(const string& expression) {
    stack<int> st;
    
    // Process expression in reverse order
    for (auto it = expression.rbegin(); it != expression.rend(); ++it) {
        char c = *it;
        if (isdigit(c)) {
            st.push(c - '0');
        } else {
            int a = st.top(); st.pop();
            int b = st.top(); st.pop();
            
            switch (c) {
                case '+': st.push(a + b); break;
                case '-': st.push(a - b); break;
                case '*': st.push(a * b); break;
                case '/': st.push(a / b); break;
            }
        }
    }
    return st.top();
}

int main() {
    // Example: "+*235" becomes (2*3)+5 = 11
    cout << evaluatePrefix("+*235") << endl;  // Output: 11
    return 0;
}`,
  };

export default codeExamples;
