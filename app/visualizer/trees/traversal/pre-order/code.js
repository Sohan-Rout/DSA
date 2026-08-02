const codeExamples = {
  javascript: `// Binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Pre-order traversal: Root -> Left -> Right
function preOrder(node, result = []) {
  if (node === null) return result;

  result.push(node.value); // visit root first
  preOrder(node.left, result);
  preOrder(node.right, result);

  return result;
}

// Usage example
let root = new TreeNode(8);
root.left = new TreeNode(3);
root.right = new TreeNode(10);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(6);

console.log(preOrder(root)); // [8, 3, 1, 6, 10]`,

  python: `# Binary tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Pre-order traversal: Root -> Left -> Right
def pre_order(node, result=None):
    if result is None:
        result = []
    if node is None:
        return result

    result.append(node.value)  # visit root first
    pre_order(node.left, result)
    pre_order(node.right, result)

    return result

# Usage example
root = TreeNode(8)
root.left = TreeNode(3)
root.right = TreeNode(10)
root.left.left = TreeNode(1)
root.left.right = TreeNode(6)

print(pre_order(root))  # [8, 3, 1, 6, 10]`,

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

// Pre-order traversal: Root -> Left -> Right
void preOrder(TreeNode* node) {
    if (node == NULL) return;

    printf("%d ", node->value); // visit root first
    preOrder(node->left);
    preOrder(node->right);
}

int main() {
    TreeNode* root = newNode(8);
    root->left = newNode(3);
    root->right = newNode(10);
    root->left->left = newNode(1);
    root->left->right = newNode(6);

    preOrder(root); // 8 3 1 6 10
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

public class PreOrderTraversal {

    // Pre-order traversal: Root -> Left -> Right
    static void preOrder(TreeNode node, List<Integer> result) {
        if (node == null) return;

        result.add(node.value); // visit root first
        preOrder(node.left, result);
        preOrder(node.right, result);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(8);
        root.left = new TreeNode(3);
        root.right = new TreeNode(10);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(6);

        List<Integer> result = new ArrayList<>();
        preOrder(root, result);
        System.out.println(result); // [8, 3, 1, 6, 10]
    }
}`,
};

export default codeExamples;
