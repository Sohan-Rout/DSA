const codeExamples = {
  javascript: `// Binary Tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Height: number of edges on the longest root-to-leaf path
function height(node) {
  if (node === null) return -1;
  return 1 + Math.max(height(node.left), height(node.right));
}

// Total node count
function countNodes(node) {
  if (node === null) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}

// Leaf node count
function countLeaves(node) {
  if (node === null) return 0;
  if (node.left === null && node.right === null) return 1;
  return countLeaves(node.left) + countLeaves(node.right);
}

// Usage example
const root = new TreeNode('A');
root.left = new TreeNode('B');
root.right = new TreeNode('C');
root.left.left = new TreeNode('D');

console.log('Height:', height(root));
console.log('Total nodes:', countNodes(root));
console.log('Leaf nodes:', countLeaves(root));`,

  python: `# Binary Tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Height: number of edges on the longest root-to-leaf path
def height(node):
    if node is None:
        return -1
    return 1 + max(height(node.left), height(node.right))

# Total node count
def count_nodes(node):
    if node is None:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)

# Leaf node count
def count_leaves(node):
    if node is None:
        return 0
    if node.left is None and node.right is None:
        return 1
    return count_leaves(node.left) + count_leaves(node.right)

# Usage example
root = TreeNode('A')
root.left = TreeNode('B')
root.right = TreeNode('C')
root.left.left = TreeNode('D')

print('Height:', height(root))
print('Total nodes:', count_nodes(root))
print('Leaf nodes:', count_leaves(root))`,

  c: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    char value;
    struct TreeNode *left, *right;
} TreeNode;

TreeNode* newNode(char value) {
    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
    node->value = value;
    node->left = node->right = NULL;
    return node;
}

// Height: number of edges on the longest root-to-leaf path
int height(TreeNode* node) {
    if (node == NULL) return -1;
    int leftHeight = height(node->left);
    int rightHeight = height(node->right);
    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
}

// Total node count
int countNodes(TreeNode* node) {
    if (node == NULL) return 0;
    return 1 + countNodes(node->left) + countNodes(node->right);
}

// Leaf node count
int countLeaves(TreeNode* node) {
    if (node == NULL) return 0;
    if (node->left == NULL && node->right == NULL) return 1;
    return countLeaves(node->left) + countLeaves(node->right);
}

int main() {
    TreeNode* root = newNode('A');
    root->left = newNode('B');
    root->right = newNode('C');
    root->left->left = newNode('D');

    printf("Height: %d\\n", height(root));
    printf("Total nodes: %d\\n", countNodes(root));
    printf("Leaf nodes: %d\\n", countLeaves(root));
    return 0;
}`,

  java: `class TreeNode {
    char value;
    TreeNode left, right;

    TreeNode(char value) {
        this.value = value;
    }
}

public class BinaryTreeProperties {

    // Height: number of edges on the longest root-to-leaf path
    static int height(TreeNode node) {
        if (node == null) return -1;
        return 1 + Math.max(height(node.left), height(node.right));
    }

    // Total node count
    static int countNodes(TreeNode node) {
        if (node == null) return 0;
        return 1 + countNodes(node.left) + countNodes(node.right);
    }

    // Leaf node count
    static int countLeaves(TreeNode node) {
        if (node == null) return 0;
        if (node.left == null && node.right == null) return 1;
        return countLeaves(node.left) + countLeaves(node.right);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode('A');
        root.left = new TreeNode('B');
        root.right = new TreeNode('C');
        root.left.left = new TreeNode('D');

        System.out.println("Height: " + height(root));
        System.out.println("Total nodes: " + countNodes(root));
        System.out.println("Leaf nodes: " + countLeaves(root));
    }
}`,
};

export default codeExamples;
