const codeExamples = {
  javascript: `// Binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// BST-specific LCA: uses ordering to avoid exploring the "wrong" subtree
function lowestCommonAncestorBST(root, p, q) {
  let node = root;
  while (node) {
    if (p < node.value && q < node.value) {
      node = node.left;
    } else if (p > node.value && q > node.value) {
      node = node.right;
    } else {
      return node; // paths diverge here — this is the LCA
    }
  }
  return null; // one or both values aren't in the tree
}

// General binary tree LCA (no ordering assumed): search both subtrees
function lowestCommonAncestor(root, p, q) {
  if (root === null || root.value === p || root.value === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root; // p and q found in different subtrees
  return left || right;           // both in the same subtree, or not found
}

// Usage example
let root = null;
[8, 3, 10, 1, 6, 14].forEach((v) => {
  root = insert(root, v); // see BST Insertion for insert
});

lowestCommonAncestorBST(root, 1, 6).value;  // 3
lowestCommonAncestor(root, 1, 6).value;     // 3 (also works without BST ordering)`,

  python: `# Binary tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# BST-specific LCA: uses ordering to avoid exploring the "wrong" subtree
def lowest_common_ancestor_bst(root, p, q):
    node = root
    while node:
        if p < node.value and q < node.value:
            node = node.left
        elif p > node.value and q > node.value:
            node = node.right
        else:
            return node  # paths diverge here -- this is the LCA
    return None  # one or both values aren't in the tree

# General binary tree LCA (no ordering assumed): search both subtrees
def lowest_common_ancestor(root, p, q):
    if root is None or root.value == p or root.value == q:
        return root

    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)

    if left and right:
        return root       # p and q found in different subtrees
    return left or right  # both in the same subtree, or not found

# Usage example
root = None
for v in [8, 3, 10, 1, 6, 14]:
    root = insert(root, v)  # see BST Insertion for insert

lowest_common_ancestor_bst(root, 1, 6).value  # 3
lowest_common_ancestor(root, 1, 6).value      # 3 (also works without BST ordering)`,

  c: `#include <stdio.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left, *right;
} TreeNode;

// BST-specific LCA: uses ordering to avoid exploring the "wrong" subtree
TreeNode* lowestCommonAncestorBST(TreeNode* root, int p, int q) {
    TreeNode* node = root;
    while (node != NULL) {
        if (p < node->value && q < node->value) {
            node = node->left;
        } else if (p > node->value && q > node->value) {
            node = node->right;
        } else {
            return node; // paths diverge here -- this is the LCA
        }
    }
    return NULL; // one or both values aren't in the tree
}

// General binary tree LCA (no ordering assumed): search both subtrees
TreeNode* lowestCommonAncestor(TreeNode* root, int p, int q) {
    if (root == NULL || root->value == p || root->value == q) return root;

    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);

    if (left != NULL && right != NULL) return root; // found in different subtrees
    return left != NULL ? left : right;              // same subtree, or not found
}

int main() {
    TreeNode* root = NULL; // build with insert() from BST Insertion
    TreeNode* lca = lowestCommonAncestorBST(root, 1, 6);
    if (lca) printf("LCA: %d\\n", lca->value);
    return 0;
}`,

  java: `class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class LowestCommonAncestor {

    // BST-specific LCA: uses ordering to avoid exploring the "wrong" subtree
    static TreeNode lowestCommonAncestorBST(TreeNode root, int p, int q) {
        TreeNode node = root;
        while (node != null) {
            if (p < node.value && q < node.value) {
                node = node.left;
            } else if (p > node.value && q > node.value) {
                node = node.right;
            } else {
                return node; // paths diverge here -- this is the LCA
            }
        }
        return null; // one or both values aren't in the tree
    }

    // General binary tree LCA (no ordering assumed): search both subtrees
    static TreeNode lowestCommonAncestor(TreeNode root, int p, int q) {
        if (root == null || root.value == p || root.value == q) return root;

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) return root; // found in different subtrees
        return left != null ? left : right;               // same subtree, or not found
    }

    public static void main(String[] args) {
        TreeNode root = null; // build with insert() from BST Insertion
        TreeNode lca = lowestCommonAncestorBST(root, 1, 6);
        if (lca != null) System.out.println("LCA: " + lca.value);
    }
}`,
};

export default codeExamples;
