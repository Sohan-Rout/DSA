const codeExamples = {
  javascript: `// Binary Search Tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Search for a value in the BST
function search(node, value) {
  if (node === null) return null;       // not found
  if (value === node.value) return node; // found

  return value < node.value
    ? search(node.left, value)
    : search(node.right, value);
}

// Usage example
let root = null;
[8, 3, 10, 1, 6].forEach((value) => {
  root = insert(root, value); // see BST Insertion for insert
});

const result = search(root, 6);
console.log(result ? "Found" : "Not found");`,

  python: `# Binary Search Tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Search for a value in the BST
def search(node, value):
    if node is None:
        return None            # not found
    if value == node.value:
        return node             # found

    if value < node.value:
        return search(node.left, value)
    return search(node.right, value)

# Usage example
root = None
for value in [8, 3, 10, 1, 6]:
    root = insert(root, value)  # see BST Insertion for insert

result = search(root, 6)
print("Found" if result else "Not found")`,

  c: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left, *right;
} TreeNode;

// Search for a value in the BST
TreeNode* search(TreeNode* node, int value) {
    if (node == NULL || node->value == value) {
        return node; // NULL if not found, node if found
    }

    if (value < node->value) {
        return search(node->left, value);
    }
    return search(node->right, value);
}

int main() {
    TreeNode* root = NULL; // build with insert() from BST Insertion
    TreeNode* result = search(root, 6);
    printf(result ? "Found\\n" : "Not found\\n");
    return 0;
}`,

  java: `class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class BstSearching {

    // Search for a value in the BST
    static TreeNode search(TreeNode node, int value) {
        if (node == null || node.value == value) {
            return node; // null if not found, node if found
        }

        return value < node.value
            ? search(node.left, value)
            : search(node.right, value);
    }

    public static void main(String[] args) {
        TreeNode root = null; // build with insert() from BST Insertion
        TreeNode result = search(root, 6);
        System.out.println(result != null ? "Found" : "Not found");
    }
}`,
};

export default codeExamples;
