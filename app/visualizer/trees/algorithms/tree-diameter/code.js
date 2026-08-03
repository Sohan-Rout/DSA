const codeExamples = {
  javascript: `// Binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Single post-order pass: each node's height is computed once and reused
// by its parent, while a running maximum tracks the widest "path-through" value.
function diameterOfTree(root) {
  let diameter = 0;

  function height(node) {
    if (node === null) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // Longest path that turns at this node
    diameter = Math.max(diameter, leftHeight + rightHeight);

    // Height contributed upward to this node's parent
    return 1 + Math.max(leftHeight, rightHeight);
  }

  height(root);
  return diameter; // number of edges
}

// Usage example
let root = null;
[8, 3, 10, 1, 6, 14].forEach((v) => {
  root = insert(root, v); // see BST Insertion for insert
});

diameterOfTree(root); // 4`,

  python: `# Binary tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Single post-order pass: each node's height is computed once and reused
# by its parent, while a running maximum tracks the widest "path-through" value.
def diameter_of_tree(root):
    diameter = 0

    def height(node):
        nonlocal diameter
        if node is None:
            return 0

        left_height = height(node.left)
        right_height = height(node.right)

        # Longest path that turns at this node
        diameter = max(diameter, left_height + right_height)

        # Height contributed upward to this node's parent
        return 1 + max(left_height, right_height)

    height(root)
    return diameter  # number of edges

# Usage example
root = None
for v in [8, 3, 10, 1, 6, 14]:
    root = insert(root, v)  # see BST Insertion for insert

diameter_of_tree(root)  # 4`,

  c: `#include <stdio.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left, *right;
} TreeNode;

int diameter = 0;

int max(int a, int b) {
    return a > b ? a : b;
}

// Single post-order pass: each node's height is computed once and reused
// by its parent, while diameter tracks the widest "path-through" value.
int height(TreeNode* node) {
    if (node == NULL) return 0;

    int leftHeight = height(node->left);
    int rightHeight = height(node->right);

    // Longest path that turns at this node
    if (leftHeight + rightHeight > diameter) {
        diameter = leftHeight + rightHeight;
    }

    // Height contributed upward to this node's parent
    return 1 + max(leftHeight, rightHeight);
}

int diameterOfTree(TreeNode* root) {
    diameter = 0;
    height(root);
    return diameter; // number of edges
}

int main() {
    TreeNode* root = NULL; // build with insert() from BST Insertion
    printf("Diameter: %d\\n", diameterOfTree(root));
    return 0;
}`,

  java: `class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class TreeDiameter {
    private static int diameter;

    // Single post-order pass: each node's height is computed once and reused
    // by its parent, while diameter tracks the widest "path-through" value.
    private static int height(TreeNode node) {
        if (node == null) return 0;

        int leftHeight = height(node.left);
        int rightHeight = height(node.right);

        // Longest path that turns at this node
        diameter = Math.max(diameter, leftHeight + rightHeight);

        // Height contributed upward to this node's parent
        return 1 + Math.max(leftHeight, rightHeight);
    }

    static int diameterOfTree(TreeNode root) {
        diameter = 0;
        height(root);
        return diameter; // number of edges
    }

    public static void main(String[] args) {
        TreeNode root = null; // build with insert() from BST Insertion
        System.out.println("Diameter: " + diameterOfTree(root));
    }
}`,
};

export default codeExamples;
