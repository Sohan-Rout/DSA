const codeExamples = {
  javascript: `// Fenwick Tree (Binary Indexed Tree) for prefix/range sums
class FenwickTree {
  constructor(size) {
    this.n = size;
    this.bit = new Array(size + 1).fill(0); // 1-indexed
  }

  static fromArray(arr) {
    const tree = new FenwickTree(arr.length);
    arr.forEach((value, index) => tree.update(index, value));
    return tree;
  }

  // Add 'delta' to the element at 0-indexed 'index'
  update(index, delta) {
    let i = index + 1; // convert to 1-indexed
    while (i <= this.n) {
      this.bit[i] += delta;
      i += i & -i; // move to the next range that includes this index
    }
  }

  // Sum of elements from 0 to index (inclusive), 0-indexed
  prefixSum(index) {
    let i = index + 1;
    let sum = 0;
    while (i > 0) {
      sum += this.bit[i];
      i -= i & -i; // move down to the next chunk of the prefix
    }
    return sum;
  }

  // Sum of elements from l to r (inclusive), 0-indexed
  rangeSum(l, r) {
    return this.prefixSum(r) - (l > 0 ? this.prefixSum(l - 1) : 0);
  }
}

// Usage example
const tree = FenwickTree.fromArray([2, 5, 1, 4, 9, 3]);
tree.rangeSum(1, 3);   // 5 + 1 + 4 = 10
tree.update(2, 9);     // add 9 to index 2 (was 1, becomes 10)
tree.rangeSum(1, 3);   // 5 + 10 + 4 = 19`,

  python: `# Fenwick Tree (Binary Indexed Tree) for prefix/range sums
class FenwickTree:
    def __init__(self, size):
        self.n = size
        self.bit = [0] * (size + 1)  # 1-indexed

    @classmethod
    def from_array(cls, arr):
        tree = cls(len(arr))
        for index, value in enumerate(arr):
            tree.update(index, value)
        return tree

    def update(self, index, delta):
        """Add delta to the element at 0-indexed index."""
        i = index + 1  # convert to 1-indexed
        while i <= self.n:
            self.bit[i] += delta
            i += i & (-i)  # move to the next range that includes this index

    def prefix_sum(self, index):
        """Sum of elements from 0 to index (inclusive), 0-indexed."""
        i = index + 1
        total = 0
        while i > 0:
            total += self.bit[i]
            i -= i & (-i)  # move down to the next chunk of the prefix
        return total

    def range_sum(self, l, r):
        """Sum of elements from l to r (inclusive), 0-indexed."""
        return self.prefix_sum(r) - (self.prefix_sum(l - 1) if l > 0 else 0)

# Usage example
tree = FenwickTree.from_array([2, 5, 1, 4, 9, 3])
tree.range_sum(1, 3)   # 5 + 1 + 4 = 10
tree.update(2, 9)      # add 9 to index 2 (was 1, becomes 10)
tree.range_sum(1, 3)   # 5 + 10 + 4 = 19`,

  c: `#include <stdio.h>

#define MAXN 100

int bit[MAXN + 1]; // 1-indexed
int n;

// Add delta to the element at 0-indexed index
void update(int index, int delta) {
    int i = index + 1; // convert to 1-indexed
    while (i <= n) {
        bit[i] += delta;
        i += i & (-i); // move to the next range that includes this index
    }
}

// Sum of elements from 0 to index (inclusive), 0-indexed
int prefixSum(int index) {
    int i = index + 1;
    int sum = 0;
    while (i > 0) {
        sum += bit[i];
        i -= i & (-i); // move down to the next chunk of the prefix
    }
    return sum;
}

// Sum of elements from l to r (inclusive), 0-indexed
int rangeSum(int l, int r) {
    return prefixSum(r) - (l > 0 ? prefixSum(l - 1) : 0);
}

int main() {
    int arr[] = {2, 5, 1, 4, 9, 3};
    n = 6;
    for (int i = 0; i < n; i++) update(i, arr[i]);

    printf("rangeSum(1,3) = %d\\n", rangeSum(1, 3)); // 10

    update(2, 9); // add 9 to index 2 (was 1, becomes 10)
    printf("rangeSum(1,3) after update = %d\\n", rangeSum(1, 3)); // 19

    return 0;
}`,

  java: `// Fenwick Tree (Binary Indexed Tree) for prefix/range sums
public class FenwickTree {
    private final int[] bit; // 1-indexed
    private final int n;

    public FenwickTree(int size) {
        n = size;
        bit = new int[size + 1];
    }

    public static FenwickTree fromArray(int[] arr) {
        FenwickTree tree = new FenwickTree(arr.length);
        for (int i = 0; i < arr.length; i++) {
            tree.update(i, arr[i]);
        }
        return tree;
    }

    // Add delta to the element at 0-indexed index
    public void update(int index, int delta) {
        int i = index + 1; // convert to 1-indexed
        while (i <= n) {
            bit[i] += delta;
            i += i & (-i); // move to the next range that includes this index
        }
    }

    // Sum of elements from 0 to index (inclusive), 0-indexed
    public int prefixSum(int index) {
        int i = index + 1;
        int sum = 0;
        while (i > 0) {
            sum += bit[i];
            i -= i & (-i); // move down to the next chunk of the prefix
        }
        return sum;
    }

    // Sum of elements from l to r (inclusive), 0-indexed
    public int rangeSum(int l, int r) {
        return prefixSum(r) - (l > 0 ? prefixSum(l - 1) : 0);
    }

    public static void main(String[] args) {
        FenwickTree tree = FenwickTree.fromArray(new int[]{2, 5, 1, 4, 9, 3});
        System.out.println(tree.rangeSum(1, 3)); // 10
        tree.update(2, 9);                        // add 9 to index 2 (was 1, becomes 10)
        System.out.println(tree.rangeSum(1, 3)); // 19
    }
}`,
};

export default codeExamples;
