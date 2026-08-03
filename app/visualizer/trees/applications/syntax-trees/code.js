const codeExamples = {
  javascript: `function tokenize(input) {
  const tokens = [];
  let i = 0;
  while (i < input.length) {
    const c = input[i];
    if (/\\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let num = "";
      while (i < input.length && /[0-9.]/.test(input[i])) { num += input[i]; i++; }
      tokens.push({ type: "num", value: parseFloat(num) });
      continue;
    }
    if ("+-*/()".includes(c)) { tokens.push({ type: c }); i++; continue; }
    throw new Error(\`Unexpected character "\${c}"\`);
  }
  return tokens;
}

// Recursive-descent parser: expression -> term -> factor mirrors precedence.
function parseExpression(input) {
  const tokens = tokenize(input);
  let pos = 0;
  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];

  function parseExpr() {
    let node = parseTerm();
    while (peek() && (peek().type === "+" || peek().type === "-")) {
      const op = consume().type;
      node = { type: "op", op, left: node, right: parseTerm() };
    }
    return node;
  }
  function parseTerm() {
    let node = parseFactor();
    while (peek() && (peek().type === "*" || peek().type === "/")) {
      const op = consume().type;
      node = { type: "op", op, left: node, right: parseFactor() };
    }
    return node;
  }
  function parseFactor() {
    const t = peek();
    if (t.type === "(") {
      consume();
      const node = parseExpr();
      consume(); // closing ')'
      return node;
    }
    consume();
    return { type: "num", value: t.value };
  }

  return parseExpr();
}

// Post-order evaluation: both children resolve before the operator combines them.
function evaluate(node) {
  if (node.type === "num") return node.value;
  const left = evaluate(node.left);
  const right = evaluate(node.right);
  switch (node.op) {
    case "+": return left + right;
    case "-": return left - right;
    case "*": return left * right;
    case "/": return left / right;
  }
}

// Usage example
const tree = parseExpression("3 + 4 * (2 - 1)");
evaluate(tree); // 7`,

  python: `import re

def tokenize(text):
    tokens = []
    i = 0
    while i < len(text):
        c = text[i]
        if c.isspace():
            i += 1
            continue
        if c.isdigit() or c == ".":
            num = ""
            while i < len(text) and (text[i].isdigit() or text[i] == "."):
                num += text[i]
                i += 1
            tokens.append(("num", float(num)))
            continue
        if c in "+-*/()":
            tokens.append((c, None))
            i += 1
            continue
        raise ValueError(f"Unexpected character '{c}'")
    return tokens

# Recursive-descent parser: expression -> term -> factor mirrors precedence.
def parse_expression(text):
    tokens = tokenize(text)
    pos = [0]

    def peek():
        return tokens[pos[0]] if pos[0] < len(tokens) else None

    def consume():
        t = tokens[pos[0]]
        pos[0] += 1
        return t

    def parse_expr():
        node = parse_term()
        while peek() and peek()[0] in ("+", "-"):
            op = consume()[0]
            node = {"type": "op", "op": op, "left": node, "right": parse_term()}
        return node

    def parse_term():
        node = parse_factor()
        while peek() and peek()[0] in ("*", "/"):
            op = consume()[0]
            node = {"type": "op", "op": op, "left": node, "right": parse_factor()}
        return node

    def parse_factor():
        t = peek()
        if t[0] == "(":
            consume()
            node = parse_expr()
            consume()  # closing ')'
            return node
        consume()
        return {"type": "num", "value": t[1]}

    return parse_expr()

# Post-order evaluation: both children resolve before the operator combines them.
def evaluate(node):
    if node["type"] == "num":
        return node["value"]
    left = evaluate(node["left"])
    right = evaluate(node["right"])
    return {"+": left + right, "-": left - right, "*": left * right, "/": left / right}[node["op"]]

# Usage example
tree = parse_expression("3 + 4 * (2 - 1)")
evaluate(tree)  # 7`,

  c: `#include <stdio.h>
#include <stdlib.h>

typedef struct ExprNode {
    int isNum;
    double value;
    char op;
    struct ExprNode *left, *right;
} ExprNode;

ExprNode* makeNum(double v) {
    ExprNode* n = malloc(sizeof(ExprNode));
    n->isNum = 1; n->value = v;
    return n;
}
ExprNode* makeOp(char op, ExprNode* l, ExprNode* r) {
    ExprNode* n = malloc(sizeof(ExprNode));
    n->isNum = 0; n->op = op; n->left = l; n->right = r;
    return n;
}

// Post-order evaluation: both children resolve before the operator combines them.
double evaluate(ExprNode* node) {
    if (node->isNum) return node->value;
    double left = evaluate(node->left);
    double right = evaluate(node->right);
    switch (node->op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
    }
    return 0;
}

// A full C parser needs a tokenizer plus recursive-descent functions for
// expression/term/factor (as in the JavaScript/Python versions) to build
// the ExprNode tree before evaluate() can run on it.
int main() {
    // Example: manually build the tree for "3 + 4 * (2 - 1)"
    ExprNode* tree = makeOp('+', makeNum(3), makeOp('*', makeNum(4), makeOp('-', makeNum(2), makeNum(1))));
    printf("Result: %f\\n", evaluate(tree));
    return 0;
}`,

  java: `abstract class ExprNode {
    abstract double evaluate();
}

class NumNode extends ExprNode {
    double value;
    NumNode(double value) { this.value = value; }
    double evaluate() { return value; }
}

class OpNode extends ExprNode {
    char op;
    ExprNode left, right;
    OpNode(char op, ExprNode left, ExprNode right) {
        this.op = op; this.left = left; this.right = right;
    }

    // Post-order evaluation: both children resolve before the operator combines them.
    double evaluate() {
        double l = left.evaluate();
        double r = right.evaluate();
        switch (op) {
            case '+': return l + r;
            case '-': return l - r;
            case '*': return l * r;
            case '/': return l / r;
            default: throw new IllegalArgumentException("Unknown operator: " + op);
        }
    }
}

public class SyntaxTree {
    public static void main(String[] args) {
        // Example: manually built tree for "3 + 4 * (2 - 1)"
        ExprNode tree = new OpNode('+',
            new NumNode(3),
            new OpNode('*', new NumNode(4), new OpNode('-', new NumNode(2), new NumNode(1)))
        );
        System.out.println("Result: " + tree.evaluate());
    }
}`,
};

export default codeExamples;
