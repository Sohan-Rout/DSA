const codeExamples = {
    javascript: `// Postfix Evaluation using Stack (JavaScript)
function evaluatePostfix(expression) {
  let stack = [];
  
  for (let char of expression) {
    if (!isNaN(char)) {
      stack.push(parseInt(char));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      
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

// Example: "23*5+" becomes (2*3)+5 = 11
console.log(evaluatePostfix("23*5+")); // Output: 11`,

    python: `# Postfix Evaluation using Stack (Python)
def evaluate_postfix(expression):
    stack = []
    
    for char in expression:
        if char.isdigit():
            stack.append(int(char))
        else:
            b = stack.pop()
            a = stack.pop()
            
            if char == '+': stack.append(a + b)
            elif char == '-': stack.append(a - b)
            elif char == '*': stack.append(a * b)
            elif char == '/': stack.append(a // b)
    
    return stack.pop()

# Example: "23*5+" becomes (2*3)+5 = 11
print(evaluate_postfix("23*5+"))  # Output: 11`,

    java: `// Postfix Evaluation using Stack (Java)
import java.util.Stack;

public class PostfixEvaluator {
    public static int evaluatePostfix(String expression) {
        Stack<Integer> stack = new Stack<>();
        
        for (char c : expression.toCharArray()) {
            if (Character.isDigit(c)) {
                stack.push(c - '0');
            } else {
                int b = stack.pop();
                int a = stack.pop();
                
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
        // Example: "23*5+" becomes (2*3)+5 = 11
        System.out.println(evaluatePostfix("23*5+"));  // Output: 11
    }
}`,

    c: `// Postfix Evaluation using Stack (C)
#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>

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

int evaluatePostfix(char* expression) {
    Stack s = { .top = -1 };
    
    for (int i = 0; expression[i]; i++) {
        if (isdigit(expression[i])) {
            push(&s, expression[i] - '0');
        } else {
            int b = pop(&s);
            int a = pop(&s);
            
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
    // Example: "23*5+" becomes (2*3)+5 = 11
    printf("%d\\n", evaluatePostfix("23*5+"));  // Output: 11
    return 0;
}`,

    cpp: `// Postfix Evaluation using Stack (C++)
#include <iostream>
#include <stack>
#include <string>
#include <cctype>
using namespace std;

int evaluatePostfix(const string& expression) {
    stack<int> st;
    
    for (char c : expression) {
        if (isdigit(c)) {
            st.push(c - '0');
        } else {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            
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
    // Example: "23*5+" becomes (2*3)+5 = 11
    cout << evaluatePostfix("23*5+") << endl;  // Output: 11
    return 0;
}`
  };

export default codeExamples;
