const codeExamples = {
  javascript: `// Binary Search Tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Insert a value into the BST
function insert(node, value) {
  if (node === null) return new TreeNode(value);

  if (value < node.value) {
    node.left = insert(node.left, value);
  } else if (value > node.value) {
    node.right = insert(node.right, value);
  }
  // Equal values are ignored (no duplicates)

  return node;
}

// Usage example
let root = null;
[8, 3, 10, 1, 6, 5].forEach((value) => {
  root = insert(root, value);
});`,

  python: `# Binary Search Tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Insert a value into the BST
def insert(node, value):
    if node is None:
        return TreeNode(value)

    if value < node.value:
        node.left = insert(node.left, value)
    elif value > node.value:
        node.right = insert(node.right, value)
    # Equal values are ignored (no duplicates)

    return node

# Usage example
root = None
for value in [8, 3, 10, 1, 6, 5]:
    root = insert(root, value)`,

  c: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left, *right;
} TreeNode;

TreeNode* newNode(int value) {
    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
    node->value = value;
    node->left = node->right = NULL;
    return node;
}

// Insert a value into the BST
TreeNode* insert(TreeNode* node, int value) {
    if (node == NULL) return newNode(value);

    if (value < node->value) {
        node->left = insert(node->left, value);
    } else if (value > node->value) {
        node->right = insert(node->right, value);
    }
    // Equal values are ignored (no duplicates)

    return node;
}

int main() {
    TreeNode* root = NULL;
    int values[] = {8, 3, 10, 1, 6, 5};
    for (int i = 0; i < 6; i++) {
        root = insert(root, values[i]);
    }
    return 0;
}`,

  java: `class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class BstInsertion {

    // Insert a value into the BST
    static TreeNode insert(TreeNode node, int value) {
        if (node == null) return new TreeNode(value);

        if (value < node.value) {
            node.left = insert(node.left, value);
        } else if (value > node.value) {
            node.right = insert(node.right, value);
        }
        // Equal values are ignored (no duplicates)

        return node;
    }

    public static void main(String[] args) {
        TreeNode root = null;
        int[] values = {8, 3, 10, 1, 6, 5};
        for (int value : values) {
            root = insert(root, value);
        }
    }
}`,
};

export default codeExamples;
