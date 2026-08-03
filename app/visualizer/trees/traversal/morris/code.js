const codeExamples = {
  javascript: `// Binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Morris in-order traversal: O(n) time, O(1) space — no stack, no queue
function morrisInOrder(root) {
  const result = [];
  let curr = root;

  while (curr !== null) {
    if (curr.left === null) {
      // No left subtree — visit curr, then move right
      result.push(curr.value);
      curr = curr.right;
    } else {
      // Find the in-order predecessor: rightmost node in curr's left subtree
      let pred = curr.left;
      while (pred.right !== null && pred.right !== curr) {
        pred = pred.right;
      }

      if (pred.right === null) {
        // Create the thread and descend left
        pred.right = curr;
        curr = curr.left;
      } else {
        // Thread already exists — we've come back via it.
        // Remove it, visit curr, then move right.
        pred.right = null;
        result.push(curr.value);
        curr = curr.right;
      }
    }
  }

  return result;
}

// Usage example — tree is left completely unmodified afterward
let root = new TreeNode(8);
root.left = new TreeNode(3);
root.right = new TreeNode(10);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(6);

console.log(morrisInOrder(root)); // [1, 3, 6, 8, 10]`,

  python: `# Binary tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Morris in-order traversal: O(n) time, O(1) space — no stack, no queue
def morris_in_order(root):
    result = []
    curr = root

    while curr is not None:
        if curr.left is None:
            # No left subtree — visit curr, then move right
            result.append(curr.value)
            curr = curr.right
        else:
            # Find the in-order predecessor: rightmost node in curr's left subtree
            pred = curr.left
            while pred.right is not None and pred.right is not curr:
                pred = pred.right

            if pred.right is None:
                # Create the thread and descend left
                pred.right = curr
                curr = curr.left
            else:
                # Thread already exists — remove it, visit curr, then move right
                pred.right = None
                result.append(curr.value)
                curr = curr.right

    return result

# Usage example — tree is left completely unmodified afterward
root = TreeNode(8)
root.left = TreeNode(3)
root.right = TreeNode(10)
root.left.left = TreeNode(1)
root.left.right = TreeNode(6)

print(morris_in_order(root))  # [1, 3, 6, 8, 10]`,

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

// Morris in-order traversal: O(n) time, O(1) space — no stack, no queue
void morrisInOrder(TreeNode* root) {
    TreeNode* curr = root;

    while (curr != NULL) {
        if (curr->left == NULL) {
            // No left subtree — visit curr, then move right
            printf("%d ", curr->value);
            curr = curr->right;
        } else {
            // Find the in-order predecessor: rightmost node in curr's left subtree
            TreeNode* pred = curr->left;
            while (pred->right != NULL && pred->right != curr) {
                pred = pred->right;
            }

            if (pred->right == NULL) {
                // Create the thread and descend left
                pred->right = curr;
                curr = curr->left;
            } else {
                // Thread already exists — remove it, visit curr, then move right
                pred->right = NULL;
                printf("%d ", curr->value);
                curr = curr->right;
            }
        }
    }
}

int main() {
    TreeNode* root = newNode(8);
    root->left = newNode(3);
    root->right = newNode(10);
    root->left->left = newNode(1);
    root->left->right = newNode(6);

    morrisInOrder(root); // 1 3 6 8 10
    printf("\\n");
    return 0;
}`,

  java: `import java.util.ArrayList;
import java.util.List;

class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class MorrisTraversal {

    // Morris in-order traversal: O(n) time, O(1) space — no stack, no queue
    static List<Integer> morrisInOrder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left == null) {
                // No left subtree — visit curr, then move right
                result.add(curr.value);
                curr = curr.right;
            } else {
                // Find the in-order predecessor: rightmost node in curr's left subtree
                TreeNode pred = curr.left;
                while (pred.right != null && pred.right != curr) {
                    pred = pred.right;
                }

                if (pred.right == null) {
                    // Create the thread and descend left
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    // Thread already exists — remove it, visit curr, then move right
                    pred.right = null;
                    result.add(curr.value);
                    curr = curr.right;
                }
            }
        }

        return result;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(8);
        root.left = new TreeNode(3);
        root.right = new TreeNode(10);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(6);

        System.out.println(morrisInOrder(root)); // [1, 3, 6, 8, 10]
    }
}`,
};

export default codeExamples;
