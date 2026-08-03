const codeExamples = {
  javascript: `// Binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Preorder traversal, writing a "null" marker for every empty child so the
// shape of the tree — not just its values — is fully recoverable.
function serialize(root) {
  const tokens = [];

  function visit(node) {
    if (node === null) {
      tokens.push("null");
      return;
    }
    tokens.push(String(node.value));
    visit(node.left);
    visit(node.right);
  }

  visit(root);
  return tokens.join(",");
}

// Reads tokens in the same preorder sequence they were written in.
function deserialize(data) {
  const tokens = data.split(",");
  let i = 0;

  function build() {
    const token = tokens[i++];
    if (token === "null") return null;

    const node = new TreeNode(Number(token));
    node.left = build();
    node.right = build();
    return node;
  }

  return build();
}

// Usage example
const encoded = serialize(root);          // "8,3,1,null,null,6,null,null,10,null,null"
const rebuilt = deserialize(encoded);      // structurally identical tree`,

  python: `# Binary tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Preorder traversal, writing a "null" marker for every empty child so the
# shape of the tree -- not just its values -- is fully recoverable.
def serialize(root):
    tokens = []

    def visit(node):
        if node is None:
            tokens.append("null")
            return
        tokens.append(str(node.value))
        visit(node.left)
        visit(node.right)

    visit(root)
    return ",".join(tokens)

# Reads tokens in the same preorder sequence they were written in.
def deserialize(data):
    tokens = data.split(",")
    i = 0

    def build():
        nonlocal i
        token = tokens[i]
        i += 1
        if token == "null":
            return None

        node = TreeNode(int(token))
        node.left = build()
        node.right = build()
        return node

    return build()

# Usage example
encoded = serialize(root)          # "8,3,1,null,null,6,null,null,10,null,null"
rebuilt = deserialize(encoded)     # structurally identical tree`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left, *right;
} TreeNode;

// Preorder traversal, writing a "null" marker for every empty child so the
// shape of the tree -- not just its values -- is fully recoverable.
void serialize(TreeNode* node, char* out) {
    if (node == NULL) {
        strcat(out, "null,");
        return;
    }
    char buf[16];
    sprintf(buf, "%d,", node->value);
    strcat(out, buf);
    serialize(node->left, out);
    serialize(node->right, out);
}

// Reads tokens in the same preorder sequence they were written in.
TreeNode* deserialize(char** tokens, int* index) {
    char* token = tokens[*index];
    (*index)++;
    if (strcmp(token, "null") == 0) return NULL;

    TreeNode* node = malloc(sizeof(TreeNode));
    node->value = atoi(token);
    node->left = deserialize(tokens, index);
    node->right = deserialize(tokens, index);
    return node;
}

int main() {
    TreeNode* root = NULL; // build with insert() from BST Insertion
    char encoded[256] = "";
    serialize(root, encoded);
    printf("Encoded: %s\\n", encoded);
    return 0;
}`,

  java: `import java.util.Arrays;
import java.util.Iterator;

class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class SerializeDeserialize {

    // Preorder traversal, writing a "null" marker for every empty child so
    // the shape of the tree -- not just its values -- is fully recoverable.
    static void serialize(TreeNode node, StringBuilder out) {
        if (node == null) {
            out.append("null,");
            return;
        }
        out.append(node.value).append(",");
        serialize(node.left, out);
        serialize(node.right, out);
    }

    // Reads tokens in the same preorder sequence they were written in.
    static TreeNode deserialize(Iterator<String> tokens) {
        String token = tokens.next();
        if (token.equals("null")) return null;

        TreeNode node = new TreeNode(Integer.parseInt(token));
        node.left = deserialize(tokens);
        node.right = deserialize(tokens);
        return node;
    }

    public static void main(String[] args) {
        TreeNode root = null; // build with insert() from BST Insertion
        StringBuilder encoded = new StringBuilder();
        serialize(root, encoded);
        System.out.println("Encoded: " + encoded);

        TreeNode rebuilt = deserialize(Arrays.asList(encoded.toString().split(",")).iterator());
    }
}`,
};

export default codeExamples;
