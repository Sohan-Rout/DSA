const codeExamples = {
  javascript: `// AVL Tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

const height = (node) => (node ? node.height : 0);
const balanceFactor = (node) => (node ? height(node.left) - height(node.right) : 0);
const updateHeight = (node) => {
  node.height = 1 + Math.max(height(node.left), height(node.right));
};

function rotateRight(y) {
  const x = y.left;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  updateHeight(y);
  updateHeight(x);
  return x; // new subtree root
}

function rotateLeft(x) {
  const y = x.right;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  updateHeight(x);
  updateHeight(y);
  return y; // new subtree root
}

// Insert a value and rebalance the tree, returning the (possibly new) root
function insert(node, value) {
  if (node === null) return new TreeNode(value);

  if (value < node.value) node.left = insert(node.left, value);
  else if (value > node.value) node.right = insert(node.right, value);
  else return node; // no duplicates

  updateHeight(node);
  const bf = balanceFactor(node);

  // Left-Left
  if (bf > 1 && value < node.left.value) return rotateRight(node);
  // Right-Right
  if (bf < -1 && value > node.right.value) return rotateLeft(node);
  // Left-Right
  if (bf > 1 && value > node.left.value) {
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }
  // Right-Left
  if (bf < -1 && value < node.right.value) {
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }

  return node;
}

// Usage example
let root = null;
[30, 20, 10, 25, 40, 50].forEach((value) => {
  root = insert(root, value);
});`,

  python: `# AVL Tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
        self.height = 1

def height(node):
    return node.height if node else 0

def balance_factor(node):
    return height(node.left) - height(node.right) if node else 0

def update_height(node):
    node.height = 1 + max(height(node.left), height(node.right))

def rotate_right(y):
    x = y.left
    T2 = x.right
    x.right = y
    y.left = T2
    update_height(y)
    update_height(x)
    return x  # new subtree root

def rotate_left(x):
    y = x.right
    T2 = y.left
    y.left = x
    x.right = T2
    update_height(x)
    update_height(y)
    return y  # new subtree root

def insert(node, value):
    if node is None:
        return TreeNode(value)

    if value < node.value:
        node.left = insert(node.left, value)
    elif value > node.value:
        node.right = insert(node.right, value)
    else:
        return node  # no duplicates

    update_height(node)
    bf = balance_factor(node)

    # Left-Left
    if bf > 1 and value < node.left.value:
        return rotate_right(node)
    # Right-Right
    if bf < -1 and value > node.right.value:
        return rotate_left(node)
    # Left-Right
    if bf > 1 and value > node.left.value:
        node.left = rotate_left(node.left)
        return rotate_right(node)
    # Right-Left
    if bf < -1 and value < node.right.value:
        node.right = rotate_right(node.right)
        return rotate_left(node)

    return node

# Usage example
root = None
for value in [30, 20, 10, 25, 40, 50]:
    root = insert(root, value)`,

  c: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int value;
    int height;
    struct TreeNode *left, *right;
} TreeNode;

int height(TreeNode* node) {
    return node ? node->height : 0;
}

int max(int a, int b) {
    return a > b ? a : b;
}

int balanceFactor(TreeNode* node) {
    return node ? height(node->left) - height(node->right) : 0;
}

TreeNode* newNode(int value) {
    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
    node->value = value;
    node->left = node->right = NULL;
    node->height = 1;
    return node;
}

TreeNode* rotateRight(TreeNode* y) {
    TreeNode* x = y->left;
    TreeNode* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = 1 + max(height(y->left), height(y->right));
    x->height = 1 + max(height(x->left), height(x->right));
    return x; // new subtree root
}

TreeNode* rotateLeft(TreeNode* x) {
    TreeNode* y = x->right;
    TreeNode* T2 = y->left;
    y->left = x;
    x->right = T2;
    x->height = 1 + max(height(x->left), height(x->right));
    y->height = 1 + max(height(y->left), height(y->right));
    return y; // new subtree root
}

TreeNode* insert(TreeNode* node, int value) {
    if (node == NULL) return newNode(value);

    if (value < node->value) node->left = insert(node->left, value);
    else if (value > node->value) node->right = insert(node->right, value);
    else return node; // no duplicates

    node->height = 1 + max(height(node->left), height(node->right));
    int bf = balanceFactor(node);

    // Left-Left
    if (bf > 1 && value < node->left->value) return rotateRight(node);
    // Right-Right
    if (bf < -1 && value > node->right->value) return rotateLeft(node);
    // Left-Right
    if (bf > 1 && value > node->left->value) {
        node->left = rotateLeft(node->left);
        return rotateRight(node);
    }
    // Right-Left
    if (bf < -1 && value < node->right->value) {
        node->right = rotateRight(node->right);
        return rotateLeft(node);
    }

    return node;
}

int main() {
    TreeNode* root = NULL;
    int values[] = {30, 20, 10, 25, 40, 50};
    for (int i = 0; i < 6; i++) {
        root = insert(root, values[i]);
    }
    printf("AVL tree built, root value: %d\\n", root->value);
    return 0;
}`,

  java: `class TreeNode {
    int value, height;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
        this.height = 1;
    }
}

public class AvlTree {

    static int height(TreeNode node) {
        return node == null ? 0 : node.height;
    }

    static int balanceFactor(TreeNode node) {
        return node == null ? 0 : height(node.left) - height(node.right);
    }

    static void updateHeight(TreeNode node) {
        node.height = 1 + Math.max(height(node.left), height(node.right));
    }

    static TreeNode rotateRight(TreeNode y) {
        TreeNode x = y.left;
        TreeNode T2 = x.right;
        x.right = y;
        y.left = T2;
        updateHeight(y);
        updateHeight(x);
        return x; // new subtree root
    }

    static TreeNode rotateLeft(TreeNode x) {
        TreeNode y = x.right;
        TreeNode T2 = y.left;
        y.left = x;
        x.right = T2;
        updateHeight(x);
        updateHeight(y);
        return y; // new subtree root
    }

    static TreeNode insert(TreeNode node, int value) {
        if (node == null) return new TreeNode(value);

        if (value < node.value) node.left = insert(node.left, value);
        else if (value > node.value) node.right = insert(node.right, value);
        else return node; // no duplicates

        updateHeight(node);
        int bf = balanceFactor(node);

        // Left-Left
        if (bf > 1 && value < node.left.value) return rotateRight(node);
        // Right-Right
        if (bf < -1 && value > node.right.value) return rotateLeft(node);
        // Left-Right
        if (bf > 1 && value > node.left.value) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }
        // Right-Left
        if (bf < -1 && value < node.right.value) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }

        return node;
    }

    public static void main(String[] args) {
        TreeNode root = null;
        int[] values = {30, 20, 10, 25, 40, 50};
        for (int value : values) {
            root = insert(root, value);
        }
        System.out.println("AVL tree built, root value: " + root.value);
    }
}`,
};

export default codeExamples;
