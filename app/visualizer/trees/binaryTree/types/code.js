const codeExamples = {
    javascript: `class TreeTypes {
  static Full(capacity = 7) {
    const tree = Array.from({ length: capacity }, (_, i) => i + 1);
    console.log("Full Binary Tree (level):", tree.join(" "));
  }

  static Degenerate(count = 4) {
    const tree = Array.from({ length: count }, (_, i) => i + 1);
    console.log("Degenerate/Skewed (in-order):", tree.join(" -> "));
  }

  static Complete(count = 10) {
    const tree = Array.from({ length: count }, (_, i) => i + 1);
    console.log("Complete Binary Tree (level):", tree.join(" "));
  }
}

TreeTypes.Full(7);
TreeTypes.Degenerate(4);
TreeTypes.Complete(10);`,

    python: `class TreeTypes:
    @staticmethod
    def Full(capacity=7):
        tree = [i + 1 for i in range(capacity)]
        print("Full Binary Tree (level):", *tree)

    @staticmethod
    def Degenerate(count=4):
        tree = [i + 1 for i in range(count)]
        print("Degenerate/Skewed (in-order):", " -> ".join(map(str, tree)))

    @staticmethod
    def Complete(count=10):
        tree = [i + 1 for i in range(count)]
        print("Complete Binary Tree (level):", *tree)


if __name__ == "__main__":
    TreeTypes.Full(7)
    TreeTypes.Degenerate(4)
    TreeTypes.Complete(10)`,

    java: `public class TreeTypes {

    public static void Full(int capacity) {
        int[] tree = new int[capacity];
        for (int i = 0; i < capacity; i++) tree[i] = i + 1;
        System.out.print("Full Binary Tree (level):");
        for (int v : tree) System.out.print(" " + v);
        System.out.println();
    }

    public static void Degenerate(int count) {
        int[] tree = new int[count];
        for (int i = 0; i < count; i++) tree[i] = i + 1;
        System.out.print("Degenerate/Skewed (in-order):");
        for (int i = 0; i < count; i++) {
            System.out.print(i == 0 ? " " : " -> ");
            System.out.print(tree[i]);
        }
        System.out.println();
    }

    public static void Complete(int count) {
        int[] tree = new int[count];
        for (int i = 0; i < count; i++) tree[i] = i + 1;
        System.out.print("Complete Binary Tree (level):");
        for (int v : tree) System.out.print(" " + v);
        System.out.println();
    }

    public static void main(String[] args) {
        Full(7);
        Degenerate(4);
        Complete(10);
    }
}`,

    c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *tree;
    int size;
} TreeArray;

void Full(int capacity) {
    TreeArray t = { malloc(capacity * sizeof(int)), capacity };
    for (int i = 0; i < capacity; i++) t.tree[i] = i + 1;
    printf("Full Binary Tree (level):");
    for (int i = 0; i < capacity; i++) printf(" %d", t.tree[i]);
    printf("\n");
    free(t.tree);
}

void Degenerate(int count) {
    TreeArray t = { malloc(count * sizeof(int)), count };
    for (int i = 0; i < count; i++) t.tree[i] = i + 1;
    printf("Degenerate/Skewed (in-order):");
    for (int i = 0; i < count; i++) {
        printf(i ? " -> %d" : " %d", t.tree[i]);
    }
    printf("\n");
    free(t.tree);
}

void Complete(int count) {
    TreeArray t = { malloc(count * sizeof(int)), count };
    for (int i = 0; i < count; i++) t.tree[i] = i + 1;
    printf("Complete Binary Tree (level):");
    for (int i = 0; i < count; i++) printf(" %d", t.tree[i]);
    printf("\n");
    free(t.tree);
}

int main() {
    Full(7);
    Degenerate(4);
    Complete(10);
    return 0;
}`,

    cpp: `#include <iostream>
#include <vector>

class TreeTypes {
public:
    static void Full(int capacity = 7) {
        std::vector<int> tree(capacity);
        for (int i = 0; i < capacity; ++i) tree[i] = i + 1;
        std::cout << "Full Binary Tree (level):";
        for (int v : tree) std::cout << ' ' << v;
        std::cout << '\n';
    }

    static void Degenerate(int count = 4) {
        std::vector<int> tree(count);
        for (int i = 0; i < count; ++i) tree[i] = i + 1;
        std::cout << "Degenerate/Skewed (in-order):";
        for (int i = 0; i < count; ++i) {
            std::cout << (i ? " -> " : " ") << tree[i];
        }
        std::cout << '\n';
    }

    static void Complete(int count = 10) {
        std::vector<int> tree(count);
        for (int i = 0; i < count; ++i) tree[i] = i + 1;
        std::cout << "Complete Binary Tree (level):";
        for (int v : tree) std::cout << ' ' << v;
        std::cout << '\n';
    }
};

int main() {
    TreeTypes::Full(7);
    TreeTypes::Degenerate(4);
    TreeTypes::Complete(10);
    return 0;
}`,
  };

export default codeExamples;
