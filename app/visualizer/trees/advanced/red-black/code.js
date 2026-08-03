const codeExamples = {
  javascript: `// Red-Black Tree node
class RBNode {
  constructor(value) {
    this.value = value;
    this.color = "RED"; // new nodes always start red
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

const isRed = (node) => node !== null && node.color === "RED";

function rotateLeft(root, x) {
  const y = x.right;
  x.right = y.left;
  if (y.left) y.left.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;
  y.left = x;
  x.parent = y;
  return root;
}

function rotateRight(root, x) {
  const y = x.left;
  x.left = y.right;
  if (y.right) y.right.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.right) x.parent.right = y;
  else x.parent.left = y;
  y.right = x;
  x.parent = y;
  return root;
}

function fixInsert(root, z) {
  while (z.parent && z.parent.color === "RED") {
    const parent = z.parent;
    const grandparent = parent.parent;

    if (parent === grandparent.left) {
      const uncle = grandparent.right;
      if (isRed(uncle)) {
        // Case 1: uncle is red -> recolor
        parent.color = "BLACK";
        uncle.color = "BLACK";
        grandparent.color = "RED";
        z = grandparent;
      } else {
        if (z === parent.right) {
          // Case 2: zig-zag -> rotate to a line
          z = parent;
          root = rotateLeft(root, z);
        }
        // Case 3: straight line -> recolor and rotate
        z.parent.color = "BLACK";
        grandparent.color = "RED";
        root = rotateRight(root, grandparent);
      }
    } else {
      // Mirror image of the above
      const uncle = grandparent.left;
      if (isRed(uncle)) {
        parent.color = "BLACK";
        uncle.color = "BLACK";
        grandparent.color = "RED";
        z = grandparent;
      } else {
        if (z === parent.left) {
          z = parent;
          root = rotateRight(root, z);
        }
        z.parent.color = "BLACK";
        grandparent.color = "RED";
        root = rotateLeft(root, grandparent);
      }
    }
  }
  root.color = "BLACK"; // property 2: the root is always black
  return root;
}

function insert(root, value) {
  const node = new RBNode(value);
  let y = null;
  let x = root;
  while (x) {
    y = x;
    if (value < x.value) x = x.left;
    else if (value > x.value) x = x.right;
    else return root; // no duplicates
  }
  node.parent = y;
  if (!y) root = node;
  else if (value < y.value) y.left = node;
  else y.right = node;

  return fixInsert(root, node);
}

// Usage example
let root = null;
[10, 5, 15, 3, 7, 1].forEach((value) => {
  root = insert(root, value);
});`,

  python: `# Red-Black Tree node
class RBNode:
    def __init__(self, value):
        self.value = value
        self.color = "RED"  # new nodes always start red
        self.left = None
        self.right = None
        self.parent = None

def is_red(node):
    return node is not None and node.color == "RED"

def rotate_left(root, x):
    y = x.right
    x.right = y.left
    if y.left:
        y.left.parent = x
    y.parent = x.parent
    if x.parent is None:
        root = y
    elif x is x.parent.left:
        x.parent.left = y
    else:
        x.parent.right = y
    y.left = x
    x.parent = y
    return root

def rotate_right(root, x):
    y = x.left
    x.left = y.right
    if y.right:
        y.right.parent = x
    y.parent = x.parent
    if x.parent is None:
        root = y
    elif x is x.parent.right:
        x.parent.right = y
    else:
        x.parent.left = y
    y.right = x
    x.parent = y
    return root

def fix_insert(root, z):
    while z.parent and z.parent.color == "RED":
        parent = z.parent
        grandparent = parent.parent

        if parent is grandparent.left:
            uncle = grandparent.right
            if is_red(uncle):
                # Case 1: uncle is red -> recolor
                parent.color = "BLACK"
                uncle.color = "BLACK"
                grandparent.color = "RED"
                z = grandparent
            else:
                if z is parent.right:
                    # Case 2: zig-zag -> rotate to a line
                    z = parent
                    root = rotate_left(root, z)
                # Case 3: straight line -> recolor and rotate
                z.parent.color = "BLACK"
                grandparent.color = "RED"
                root = rotate_right(root, grandparent)
        else:
            # Mirror image of the above
            uncle = grandparent.left
            if is_red(uncle):
                parent.color = "BLACK"
                uncle.color = "BLACK"
                grandparent.color = "RED"
                z = grandparent
            else:
                if z is parent.left:
                    z = parent
                    root = rotate_right(root, z)
                z.parent.color = "BLACK"
                grandparent.color = "RED"
                root = rotate_left(root, grandparent)

    root.color = "BLACK"  # property 2: the root is always black
    return root

def insert(root, value):
    node = RBNode(value)
    y = None
    x = root
    while x:
        y = x
        if value < x.value:
            x = x.left
        elif value > x.value:
            x = x.right
        else:
            return root  # no duplicates

    node.parent = y
    if y is None:
        root = node
    elif value < y.value:
        y.left = node
    else:
        y.right = node

    return fix_insert(root, node)

# Usage example
root = None
for value in [10, 5, 15, 3, 7, 1]:
    root = insert(root, value)`,

  c: `#include <stdio.h>
#include <stdlib.h>

typedef enum { RED, BLACK } Color;

typedef struct RBNode {
    int value;
    Color color;
    struct RBNode *left, *right, *parent;
} RBNode;

RBNode* newNode(int value) {
    RBNode* node = (RBNode*)malloc(sizeof(RBNode));
    node->value = value;
    node->color = RED; // new nodes always start red
    node->left = node->right = node->parent = NULL;
    return node;
}

int isRed(RBNode* node) {
    return node != NULL && node->color == RED;
}

RBNode* rotateLeft(RBNode* root, RBNode* x) {
    RBNode* y = x->right;
    x->right = y->left;
    if (y->left) y->left->parent = x;
    y->parent = x->parent;
    if (!x->parent) root = y;
    else if (x == x->parent->left) x->parent->left = y;
    else x->parent->right = y;
    y->left = x;
    x->parent = y;
    return root;
}

RBNode* rotateRight(RBNode* root, RBNode* x) {
    RBNode* y = x->left;
    x->left = y->right;
    if (y->right) y->right->parent = x;
    y->parent = x->parent;
    if (!x->parent) root = y;
    else if (x == x->parent->right) x->parent->right = y;
    else x->parent->left = y;
    y->right = x;
    x->parent = y;
    return root;
}

RBNode* fixInsert(RBNode* root, RBNode* z) {
    while (z->parent && z->parent->color == RED) {
        RBNode* parent = z->parent;
        RBNode* grandparent = parent->parent;

        if (parent == grandparent->left) {
            RBNode* uncle = grandparent->right;
            if (isRed(uncle)) {
                parent->color = BLACK;
                uncle->color = BLACK;
                grandparent->color = RED;
                z = grandparent;
            } else {
                if (z == parent->right) {
                    z = parent;
                    root = rotateLeft(root, z);
                }
                z->parent->color = BLACK;
                grandparent->color = RED;
                root = rotateRight(root, grandparent);
            }
        } else {
            RBNode* uncle = grandparent->left;
            if (isRed(uncle)) {
                parent->color = BLACK;
                uncle->color = BLACK;
                grandparent->color = RED;
                z = grandparent;
            } else {
                if (z == parent->left) {
                    z = parent;
                    root = rotateRight(root, z);
                }
                z->parent->color = BLACK;
                grandparent->color = RED;
                root = rotateLeft(root, grandparent);
            }
        }
    }
    root->color = BLACK; // property 2: the root is always black
    return root;
}

RBNode* insert(RBNode* root, int value) {
    RBNode* node = newNode(value);
    RBNode* y = NULL;
    RBNode* x = root;
    while (x) {
        y = x;
        if (value < x->value) x = x->left;
        else if (value > x->value) x = x->right;
        else { free(node); return root; } // no duplicates
    }
    node->parent = y;
    if (!y) root = node;
    else if (value < y->value) y->left = node;
    else y->right = node;

    return fixInsert(root, node);
}

int main() {
    RBNode* root = NULL;
    int values[] = {10, 5, 15, 3, 7, 1};
    for (int i = 0; i < 6; i++) {
        root = insert(root, values[i]);
    }
    printf("Red-Black tree built, root value: %d\\n", root->value);
    return 0;
}`,

  java: `class RBNode {
    int value;
    boolean isRed; // true = RED, false = BLACK
    RBNode left, right, parent;

    RBNode(int value) {
        this.value = value;
        this.isRed = true; // new nodes always start red
    }
}

public class RedBlackTree {

    static boolean isRed(RBNode node) {
        return node != null && node.isRed;
    }

    static RBNode rotateLeft(RBNode root, RBNode x) {
        RBNode y = x.right;
        x.right = y.left;
        if (y.left != null) y.left.parent = x;
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.left) x.parent.left = y;
        else x.parent.right = y;
        y.left = x;
        x.parent = y;
        return root;
    }

    static RBNode rotateRight(RBNode root, RBNode x) {
        RBNode y = x.left;
        x.left = y.right;
        if (y.right != null) y.right.parent = x;
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.right) x.parent.right = y;
        else x.parent.left = y;
        y.right = x;
        x.parent = y;
        return root;
    }

    static RBNode fixInsert(RBNode root, RBNode z) {
        while (z.parent != null && z.parent.isRed) {
            RBNode parent = z.parent;
            RBNode grandparent = parent.parent;

            if (parent == grandparent.left) {
                RBNode uncle = grandparent.right;
                if (isRed(uncle)) {
                    parent.isRed = false;
                    uncle.isRed = false;
                    grandparent.isRed = true;
                    z = grandparent;
                } else {
                    if (z == parent.right) {
                        z = parent;
                        root = rotateLeft(root, z);
                    }
                    z.parent.isRed = false;
                    grandparent.isRed = true;
                    root = rotateRight(root, grandparent);
                }
            } else {
                RBNode uncle = grandparent.left;
                if (isRed(uncle)) {
                    parent.isRed = false;
                    uncle.isRed = false;
                    grandparent.isRed = true;
                    z = grandparent;
                } else {
                    if (z == parent.left) {
                        z = parent;
                        root = rotateRight(root, z);
                    }
                    z.parent.isRed = false;
                    grandparent.isRed = true;
                    root = rotateLeft(root, grandparent);
                }
            }
        }
        root.isRed = false; // property 2: the root is always black
        return root;
    }

    static RBNode insert(RBNode root, int value) {
        RBNode node = new RBNode(value);
        RBNode y = null;
        RBNode x = root;
        while (x != null) {
            y = x;
            if (value < x.value) x = x.left;
            else if (value > x.value) x = x.right;
            else return root; // no duplicates
        }
        node.parent = y;
        if (y == null) root = node;
        else if (value < y.value) y.left = node;
        else y.right = node;

        return fixInsert(root, node);
    }

    public static void main(String[] args) {
        RBNode root = null;
        int[] values = {10, 5, 15, 3, 7, 1};
        for (int value : values) {
            root = insert(root, value);
        }
        System.out.println("Red-Black tree built, root value: " + root.value);
    }
}`,
};

export default codeExamples;
