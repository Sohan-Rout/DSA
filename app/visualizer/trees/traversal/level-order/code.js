const codeExamples = {
  javascript: `// Binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Level-order traversal (BFS): visit level by level using a queue
function levelOrder(root) {
  const result = [];
  if (root === null) return result;

  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift(); // dequeue the front node

    result.push(node.value);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}

// Usage example
let root = new TreeNode(8);
root.left = new TreeNode(3);
root.right = new TreeNode(10);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(6);

console.log(levelOrder(root)); // [8, 3, 10, 1, 6]`,

  python: `from collections import deque

# Binary tree node
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Level-order traversal (BFS): visit level by level using a queue
def level_order(root):
    result = []
    if root is None:
        return result

    queue = deque([root])

    while queue:
        node = queue.popleft()  # dequeue the front node

        result.append(node.value)

        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)

    return result

# Usage example
root = TreeNode(8)
root.left = TreeNode(3)
root.right = TreeNode(10)
root.left.left = TreeNode(1)
root.left.right = TreeNode(6)

print(level_order(root))  # [8, 3, 10, 1, 6]`,

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

// Level-order traversal (BFS): visit level by level using an array-backed queue
void levelOrder(TreeNode* root, int capacity) {
    if (root == NULL) return;

    TreeNode** queue = (TreeNode**)malloc(sizeof(TreeNode*) * capacity);
    int front = 0, back = 0;
    queue[back++] = root;

    while (front < back) {
        TreeNode* node = queue[front++]; // dequeue the front node

        printf("%d ", node->value);

        if (node->left) queue[back++] = node->left;
        if (node->right) queue[back++] = node->right;
    }

    free(queue);
}

int main() {
    TreeNode* root = newNode(8);
    root->left = newNode(3);
    root->right = newNode(10);
    root->left->left = newNode(1);
    root->left->right = newNode(6);

    levelOrder(root, 5); // 8 3 10 1 6
    printf("\\n");
    return 0;
}`,

  java: `import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class LevelOrderTraversal {

    // Level-order traversal (BFS): visit level by level using a queue
    static List<Integer> levelOrder(TreeNode root) {
        List<Integer> result = new LinkedList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll(); // dequeue the front node

            result.add(node.value);

            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }

        return result;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(8);
        root.left = new TreeNode(3);
        root.right = new TreeNode(10);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(6);

        System.out.println(levelOrder(root)); // [8, 3, 10, 1, 6]
    }
}`,
};

export default codeExamples;
