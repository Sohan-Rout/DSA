const codeExamples = {
  javascript: `// Binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// In-order traversal: Left -> Root -> Right
function inOrder(node, result = []) {
  if (node === null) return result;

  inOrder(node.left, result);
  result.push(node.value); // visit root in between
  inOrder(node.right, result);

  return result;
}

// Usage example — for a BST, the output comes out sorted
let root = new TreeNode(8);
root.left = new TreeNode(3);
root.right = new TreeNode(10);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(6);

console.log(inOrder(root)); // [1, 3, 6, 8, 10]`,

  python: `# Binary tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# In-order traversal: Left -> Root -> Right
def in_order(node, result=None):
    if result is None:
        result = []
    if node is None:
        return result

    in_order(node.left, result)
    result.append(node.value)  # visit root in between
    in_order(node.right, result)

    return result

# Usage example — for a BST, the output comes out sorted
root = TreeNode(8)
root.left = TreeNode(3)
root.right = TreeNode(10)
root.left.left = TreeNode(1)
root.left.right = TreeNode(6)

print(in_order(root))  # [1, 3, 6, 8, 10]`,

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

// In-order traversal: Left -> Root -> Right
void inOrder(TreeNode* node) {
    if (node == NULL) return;

    inOrder(node->left);
    printf("%d ", node->value); // visit root in between
    inOrder(node->right);
}

int main() {
    TreeNode* root = newNode(8);
    root->left = newNode(3);
    root->right = newNode(10);
    root->left->left = newNode(1);
    root->left->right = newNode(6);

    inOrder(root); // 1 3 6 8 10
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

public class InOrderTraversal {

    // In-order traversal: Left -> Root -> Right
    static void inOrder(TreeNode node, List<Integer> result) {
        if (node == null) return;

        inOrder(node.left, result);
        result.add(node.value); // visit root in between
        inOrder(node.right, result);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(8);
        root.left = new TreeNode(3);
        root.right = new TreeNode(10);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(6);

        List<Integer> result = new ArrayList<>();
        inOrder(root, result);
        System.out.println(result); // [1, 3, 6, 8, 10]
    }
}`,
};

export default codeExamples;
