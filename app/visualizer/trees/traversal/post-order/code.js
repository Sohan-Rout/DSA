const codeExamples = {
  javascript: `// Binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Post-order traversal: Left -> Right -> Root
function postOrder(node, result = []) {
  if (node === null) return result;

  postOrder(node.left, result);
  postOrder(node.right, result);
  result.push(node.value); // visit root last

  return result;
}

// Usage example
let root = new TreeNode(8);
root.left = new TreeNode(3);
root.right = new TreeNode(10);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(6);

console.log(postOrder(root)); // [1, 6, 3, 10, 8]`,

  python: `# Binary tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Post-order traversal: Left -> Right -> Root
def post_order(node, result=None):
    if result is None:
        result = []
    if node is None:
        return result

    post_order(node.left, result)
    post_order(node.right, result)
    result.append(node.value)  # visit root last

    return result

# Usage example
root = TreeNode(8)
root.left = TreeNode(3)
root.right = TreeNode(10)
root.left.left = TreeNode(1)
root.left.right = TreeNode(6)

print(post_order(root))  # [1, 6, 3, 10, 8]`,

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

// Post-order traversal: Left -> Right -> Root
void postOrder(TreeNode* node) {
    if (node == NULL) return;

    postOrder(node->left);
    postOrder(node->right);
    printf("%d ", node->value); // visit root last
}

// Post-order is also how you'd safely free every node in a tree
void freeTree(TreeNode* node) {
    if (node == NULL) return;
    freeTree(node->left);
    freeTree(node->right);
    free(node); // free the node only after its children are gone
}

int main() {
    TreeNode* root = newNode(8);
    root->left = newNode(3);
    root->right = newNode(10);
    root->left->left = newNode(1);
    root->left->right = newNode(6);

    postOrder(root); // 1 6 3 10 8
    printf("\\n");

    freeTree(root);
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

public class PostOrderTraversal {

    // Post-order traversal: Left -> Right -> Root
    static void postOrder(TreeNode node, List<Integer> result) {
        if (node == null) return;

        postOrder(node.left, result);
        postOrder(node.right, result);
        result.add(node.value); // visit root last
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(8);
        root.left = new TreeNode(3);
        root.right = new TreeNode(10);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(6);

        List<Integer> result = new ArrayList<>();
        postOrder(root, result);
        System.out.println(result); // [1, 6, 3, 10, 8]
    }
}`,
};

export default codeExamples;
