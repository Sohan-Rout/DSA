const codeExamples = {
  javascript: `// B-Tree node — t is the tree's minimum degree
// (max keys per node = 2t-1, max children = 2t)
class BTreeNode {
  constructor(leaf) {
    this.keys = [];
    this.children = [];
    this.leaf = leaf;
  }
}

const T = 3; // minimum degree, tune to taste (or to your disk block size)

// Splits the full child at index i of parent, promoting its median key up
function splitChild(parent, i) {
  const fullChild = parent.children[i];
  const newChild = new BTreeNode(fullChild.leaf);

  const midKey = fullChild.keys[T - 1];
  newChild.keys = fullChild.keys.slice(T);
  fullChild.keys = fullChild.keys.slice(0, T - 1);

  if (!fullChild.leaf) {
    newChild.children = fullChild.children.slice(T);
    fullChild.children = fullChild.children.slice(0, T);
  }

  parent.children.splice(i + 1, 0, newChild);
  parent.keys.splice(i, 0, midKey);
}

// Inserts into a node that is guaranteed not to be full
function insertNonFull(node, key) {
  let i = node.keys.length - 1;

  if (node.leaf) {
    while (i >= 0 && key < node.keys[i]) i--;
    node.keys.splice(i + 1, 0, key);
  } else {
    while (i >= 0 && key < node.keys[i]) i--;
    i++;
    if (node.children[i].keys.length === 2 * T - 1) {
      splitChild(node, i);
      if (key > node.keys[i]) i++;
    }
    insertNonFull(node.children[i], key);
  }
}

function insert(root, key) {
  if (root === null) {
    const node = new BTreeNode(true);
    node.keys = [key];
    return node;
  }

  if (root.keys.length === 2 * T - 1) {
    // Root is full — split it first; this is the only way the tree grows taller
    const newRoot = new BTreeNode(false);
    newRoot.children.push(root);
    splitChild(newRoot, 0);
    insertNonFull(newRoot, key);
    return newRoot;
  }

  insertNonFull(root, key);
  return root;
}

// Usage example
let root = null;
[10, 20, 5, 6, 12, 30, 7, 17].forEach((key) => {
  root = insert(root, key);
});`,

  python: `# B-Tree node — t is the tree's minimum degree
# (max keys per node = 2t-1, max children = 2t)
class BTreeNode:
    def __init__(self, leaf):
        self.keys = []
        self.children = []
        self.leaf = leaf

T = 3  # minimum degree, tune to taste (or to your disk block size)

def split_child(parent, i):
    full_child = parent.children[i]
    new_child = BTreeNode(full_child.leaf)

    mid_key = full_child.keys[T - 1]
    new_child.keys = full_child.keys[T:]
    full_child.keys = full_child.keys[:T - 1]

    if not full_child.leaf:
        new_child.children = full_child.children[T:]
        full_child.children = full_child.children[:T]

    parent.children.insert(i + 1, new_child)
    parent.keys.insert(i, mid_key)

def insert_non_full(node, key):
    i = len(node.keys) - 1

    if node.leaf:
        while i >= 0 and key < node.keys[i]:
            i -= 1
        node.keys.insert(i + 1, key)
    else:
        while i >= 0 and key < node.keys[i]:
            i -= 1
        i += 1
        if len(node.children[i].keys) == 2 * T - 1:
            split_child(node, i)
            if key > node.keys[i]:
                i += 1
        insert_non_full(node.children[i], key)

def insert(root, key):
    if root is None:
        node = BTreeNode(True)
        node.keys = [key]
        return node

    if len(root.keys) == 2 * T - 1:
        # Root is full — split it first; this is the only way the tree grows taller
        new_root = BTreeNode(False)
        new_root.children.append(root)
        split_child(new_root, 0)
        insert_non_full(new_root, key)
        return new_root

    insert_non_full(root, key)
    return root

# Usage example
root = None
for key in [10, 20, 5, 6, 12, 30, 7, 17]:
    root = insert(root, key)`,

  c: `#include <stdio.h>
#include <stdlib.h>

#define T 3 // minimum degree, tune to taste (or to your disk block size)
#define MAX_KEYS (2 * T - 1)

typedef struct BTreeNode {
    int keys[MAX_KEYS];
    struct BTreeNode* children[MAX_KEYS + 1];
    int numKeys;
    int leaf;
} BTreeNode;

BTreeNode* newNode(int leaf) {
    BTreeNode* node = (BTreeNode*)malloc(sizeof(BTreeNode));
    node->numKeys = 0;
    node->leaf = leaf;
    return node;
}

void splitChild(BTreeNode* parent, int i) {
    BTreeNode* fullChild = parent->children[i];
    BTreeNode* newChild = newNode(fullChild->leaf);

    int midKey = fullChild->keys[T - 1];
    newChild->numKeys = fullChild->numKeys - T;
    for (int j = 0; j < newChild->numKeys; j++) {
        newChild->keys[j] = fullChild->keys[j + T];
    }
    if (!fullChild->leaf) {
        for (int j = 0; j <= newChild->numKeys; j++) {
            newChild->children[j] = fullChild->children[j + T];
        }
    }
    fullChild->numKeys = T - 1;

    for (int j = parent->numKeys; j > i; j--) parent->children[j + 1] = parent->children[j];
    parent->children[i + 1] = newChild;
    for (int j = parent->numKeys - 1; j >= i; j--) parent->keys[j + 1] = parent->keys[j];
    parent->keys[i] = midKey;
    parent->numKeys++;
}

void insertNonFull(BTreeNode* node, int key) {
    int i = node->numKeys - 1;

    if (node->leaf) {
        while (i >= 0 && key < node->keys[i]) {
            node->keys[i + 1] = node->keys[i];
            i--;
        }
        node->keys[i + 1] = key;
        node->numKeys++;
    } else {
        while (i >= 0 && key < node->keys[i]) i--;
        i++;
        if (node->children[i]->numKeys == MAX_KEYS) {
            splitChild(node, i);
            if (key > node->keys[i]) i++;
        }
        insertNonFull(node->children[i], key);
    }
}

BTreeNode* insert(BTreeNode* root, int key) {
    if (root == NULL) {
        BTreeNode* node = newNode(1);
        node->keys[0] = key;
        node->numKeys = 1;
        return node;
    }

    if (root->numKeys == MAX_KEYS) {
        // Root is full — split it first; this is the only way the tree grows taller
        BTreeNode* newRoot = newNode(0);
        newRoot->children[0] = root;
        splitChild(newRoot, 0);
        insertNonFull(newRoot, key);
        return newRoot;
    }

    insertNonFull(root, key);
    return root;
}

int main() {
    BTreeNode* root = NULL;
    int values[] = {10, 20, 5, 6, 12, 30, 7, 17};
    for (int i = 0; i < 8; i++) {
        root = insert(root, values[i]);
    }
    printf("B-tree built, root has %d key(s)\\n", root->numKeys);
    return 0;
}`,

  java: `import java.util.ArrayList;
import java.util.List;

class BTreeNode {
    List<Integer> keys = new ArrayList<>();
    List<BTreeNode> children = new ArrayList<>();
    boolean leaf;

    BTreeNode(boolean leaf) {
        this.leaf = leaf;
    }
}

public class BTree {
    static final int T = 3; // minimum degree, tune to taste (or to your disk block size)

    static void splitChild(BTreeNode parent, int i) {
        BTreeNode fullChild = parent.children.get(i);
        BTreeNode newChild = new BTreeNode(fullChild.leaf);

        int midKey = fullChild.keys.get(T - 1);
        newChild.keys.addAll(fullChild.keys.subList(T, fullChild.keys.size()));
        List<Integer> leftKeys = new ArrayList<>(fullChild.keys.subList(0, T - 1));

        if (!fullChild.leaf) {
            newChild.children.addAll(fullChild.children.subList(T, fullChild.children.size()));
            fullChild.children = new ArrayList<>(fullChild.children.subList(0, T));
        }
        fullChild.keys = leftKeys;

        parent.children.add(i + 1, newChild);
        parent.keys.add(i, midKey);
    }

    static void insertNonFull(BTreeNode node, int key) {
        int i = node.keys.size() - 1;

        if (node.leaf) {
            while (i >= 0 && key < node.keys.get(i)) i--;
            node.keys.add(i + 1, key);
        } else {
            while (i >= 0 && key < node.keys.get(i)) i--;
            i++;
            if (node.children.get(i).keys.size() == 2 * T - 1) {
                splitChild(node, i);
                if (key > node.keys.get(i)) i++;
            }
            insertNonFull(node.children.get(i), key);
        }
    }

    static BTreeNode insert(BTreeNode root, int key) {
        if (root == null) {
            BTreeNode node = new BTreeNode(true);
            node.keys.add(key);
            return node;
        }

        if (root.keys.size() == 2 * T - 1) {
            // Root is full — split it first; this is the only way the tree grows taller
            BTreeNode newRoot = new BTreeNode(false);
            newRoot.children.add(root);
            splitChild(newRoot, 0);
            insertNonFull(newRoot, key);
            return newRoot;
        }

        insertNonFull(root, key);
        return root;
    }

    public static void main(String[] args) {
        BTreeNode root = null;
        int[] values = {10, 20, 5, 6, 12, 30, 7, 17};
        for (int value : values) {
            root = insert(root, value);
        }
        System.out.println("B-tree built, root has " + root.keys.size() + " key(s)");
    }
}`,
};

export default codeExamples;
