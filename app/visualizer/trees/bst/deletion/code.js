const codeExamples = {
  javascript: `// Binary Search Tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Delete a value from the BST
function deleteNode(node, value) {
  if (node === null) return null;

  if (value < node.value) {
    node.left = deleteNode(node.left, value);
    return node;
  }
  if (value > node.value) {
    node.right = deleteNode(node.right, value);
    return node;
  }

  // Found the node to delete
  if (node.left === null && node.right === null) return null; // Case 1: leaf
  if (node.left === null) return node.right;                  // Case 2: only right child
  if (node.right === null) return node.left;                  // Case 2: only left child

  // Case 3: two children — find in-order successor (min of right subtree)
  let successor = node.right;
  while (successor.left !== null) successor = successor.left;

  node.value = successor.value;
  node.right = deleteNode(node.right, successor.value);
  return node;
}

// Usage example
let root = null;
[8, 3, 12, 10, 14].forEach((value) => {
  root = insertNode(root, value); // see BST Insertion for insertNode
});
root = deleteNode(root, 8);`,

  python: `# Binary Search Tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Delete a value from the BST
def delete_node(node, value):
    if node is None:
        return None

    if value < node.value:
        node.left = delete_node(node.left, value)
        return node
    if value > node.value:
        node.right = delete_node(node.right, value)
        return node

    # Found the node to delete
    if node.left is None and node.right is None:
        return None            # Case 1: leaf
    if node.left is None:
        return node.right      # Case 2: only right child
    if node.right is None:
        return node.left       # Case 2: only left child

    # Case 3: two children — find in-order successor (min of right subtree)
    successor = node.right
    while successor.left is not None:
        successor = successor.left

    node.value = successor.value
    node.right = delete_node(node.right, successor.value)
    return node

# Usage example
root = None
for value in [8, 3, 12, 10, 14]:
    root = insert_node(root, value)  # see BST Insertion for insert_node
root = delete_node(root, 8)`,

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

// Delete a value from the BST
TreeNode* deleteNode(TreeNode* node, int value) {
    if (node == NULL) return NULL;

    if (value < node->value) {
        node->left = deleteNode(node->left, value);
        return node;
    }
    if (value > node->value) {
        node->right = deleteNode(node->right, value);
        return node;
    }

    // Found the node to delete
    if (node->left == NULL && node->right == NULL) {
        free(node);
        return NULL;                    // Case 1: leaf
    }
    if (node->left == NULL) {
        TreeNode* right = node->right;
        free(node);
        return right;                   // Case 2: only right child
    }
    if (node->right == NULL) {
        TreeNode* left = node->left;
        free(node);
        return left;                    // Case 2: only left child
    }

    // Case 3: two children — find in-order successor (min of right subtree)
    TreeNode* successor = node->right;
    while (successor->left != NULL) successor = successor->left;

    node->value = successor->value;
    node->right = deleteNode(node->right, successor->value);
    return node;
}`,

  java: `class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class BstDeletion {

    // Delete a value from the BST
    static TreeNode deleteNode(TreeNode node, int value) {
        if (node == null) return null;

        if (value < node.value) {
            node.left = deleteNode(node.left, value);
            return node;
        }
        if (value > node.value) {
            node.right = deleteNode(node.right, value);
            return node;
        }

        // Found the node to delete
        if (node.left == null && node.right == null) return null; // Case 1: leaf
        if (node.left == null) return node.right;                 // Case 2: only right child
        if (node.right == null) return node.left;                 // Case 2: only left child

        // Case 3: two children — find in-order successor (min of right subtree)
        TreeNode successor = node.right;
        while (successor.left != null) successor = successor.left;

        node.value = successor.value;
        node.right = deleteNode(node.right, successor.value);
        return node;
    }
}`,
};

export default codeExamples;
