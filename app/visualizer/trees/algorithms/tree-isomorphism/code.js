const codeExamples = {
  javascript: `// Binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Two trees are isomorphic if one can be turned into the other by swapping
// left/right children at any number of nodes.
function isIsomorphic(a, b) {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  if (a.value !== b.value) return false;

  // Try children in their original order, or swapped
  const straight = isIsomorphic(a.left, b.left) && isIsomorphic(a.right, b.right);
  const flipped = isIsomorphic(a.left, b.right) && isIsomorphic(a.right, b.left);

  return straight || flipped;
}

// Usage example
// Tree A: 1(2(4,5), 3)
// Tree B: 1(3, 2(5,4))  -- same as A with children swapped at nodes 1 and 2
isIsomorphic(treeA, treeB); // true`,

  python: `# Binary tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Two trees are isomorphic if one can be turned into the other by swapping
# left/right children at any number of nodes.
def is_isomorphic(a, b):
    if a is None and b is None:
        return True
    if a is None or b is None:
        return False
    if a.value != b.value:
        return False

    # Try children in their original order, or swapped
    straight = is_isomorphic(a.left, b.left) and is_isomorphic(a.right, b.right)
    flipped = is_isomorphic(a.left, b.right) and is_isomorphic(a.right, b.left)

    return straight or flipped

# Usage example
# Tree A: 1(2(4,5), 3)
# Tree B: 1(3, 2(5,4))  -- same as A with children swapped at nodes 1 and 2
is_isomorphic(tree_a, tree_b)  # True`,

  c: `#include <stdio.h>
#include <stdbool.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left, *right;
} TreeNode;

// Two trees are isomorphic if one can be turned into the other by swapping
// left/right children at any number of nodes.
bool isIsomorphic(TreeNode* a, TreeNode* b) {
    if (a == NULL && b == NULL) return true;
    if (a == NULL || b == NULL) return false;
    if (a->value != b->value) return false;

    // Try children in their original order, or swapped
    bool straight = isIsomorphic(a->left, b->left) && isIsomorphic(a->right, b->right);
    bool flipped = isIsomorphic(a->left, b->right) && isIsomorphic(a->right, b->left);

    return straight || flipped;
}

int main() {
    TreeNode *treeA = NULL, *treeB = NULL; // build with insert() from BST Insertion
    printf("Isomorphic: %s\\n", isIsomorphic(treeA, treeB) ? "true" : "false");
    return 0;
}`,

  java: `class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class TreeIsomorphism {

    // Two trees are isomorphic if one can be turned into the other by swapping
    // left/right children at any number of nodes.
    static boolean isIsomorphic(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        if (a.value != b.value) return false;

        // Try children in their original order, or swapped
        boolean straight = isIsomorphic(a.left, b.left) && isIsomorphic(a.right, b.right);
        boolean flipped = isIsomorphic(a.left, b.right) && isIsomorphic(a.right, b.left);

        return straight || flipped;
    }

    public static void main(String[] args) {
        TreeNode treeA = null, treeB = null; // build with insert() from BST Insertion
        System.out.println("Isomorphic: " + isIsomorphic(treeA, treeB));
    }
}`,
};

export default codeExamples;
