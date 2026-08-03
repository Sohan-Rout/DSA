const codeExamples = {
  javascript: `// Sum Segment Tree, built over an array using a flat 1-indexed array
// representation (node i's children are at 2i and 2i+1)
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.build(arr, 1, 0, this.n - 1);
  }

  build(arr, node, l, r) {
    if (l === r) {
      this.tree[node] = arr[l];
      return;
    }
    const mid = Math.floor((l + r) / 2);
    this.build(arr, 2 * node, l, mid);
    this.build(arr, 2 * node + 1, mid + 1, r);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  // Point update: set arr[index] = value
  update(index, value, node = 1, l = 0, r = this.n - 1) {
    if (l === r) {
      this.tree[node] = value;
      return;
    }
    const mid = Math.floor((l + r) / 2);
    if (index <= mid) this.update(index, value, 2 * node, l, mid);
    else this.update(index, value, 2 * node + 1, mid + 1, r);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  // Range sum query over [ql, qr]
  query(ql, qr, node = 1, l = 0, r = this.n - 1) {
    if (qr < l || r < ql) return 0;              // fully outside — identity element
    if (ql <= l && r <= qr) return this.tree[node]; // fully inside — use cached value
    const mid = Math.floor((l + r) / 2);
    return (
      this.query(ql, qr, 2 * node, l, mid) +
      this.query(ql, qr, 2 * node + 1, mid + 1, r)
    );
  }
}

// Usage example
const st = new SegmentTree([2, 5, 1, 4, 9, 3]);
st.query(1, 3);   // 5 + 1 + 4 = 10
st.update(2, 10); // arr becomes [2, 5, 10, 4, 9, 3]
st.query(1, 3);   // 5 + 10 + 4 = 19`,

  python: `# Sum Segment Tree, built over an array using a flat 1-indexed array
# representation (node i's children are at 2i and 2i+1)
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self._build(arr, 1, 0, self.n - 1)

    def _build(self, arr, node, l, r):
        if l == r:
            self.tree[node] = arr[l]
            return
        mid = (l + r) // 2
        self._build(arr, 2 * node, l, mid)
        self._build(arr, 2 * node + 1, mid + 1, r)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def update(self, index, value, node=1, l=0, r=None):
        if r is None:
            r = self.n - 1
        if l == r:
            self.tree[node] = value
            return
        mid = (l + r) // 2
        if index <= mid:
            self.update(index, value, 2 * node, l, mid)
        else:
            self.update(index, value, 2 * node + 1, mid + 1, r)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, ql, qr, node=1, l=0, r=None):
        if r is None:
            r = self.n - 1
        if qr < l or r < ql:
            return 0  # fully outside -- identity element
        if ql <= l and r <= qr:
            return self.tree[node]  # fully inside -- use cached value
        mid = (l + r) // 2
        return self.query(ql, qr, 2 * node, l, mid) + self.query(ql, qr, 2 * node + 1, mid + 1, r)

# Usage example
st = SegmentTree([2, 5, 1, 4, 9, 3])
st.query(1, 3)    # 5 + 1 + 4 = 10
st.update(2, 10)  # arr becomes [2, 5, 10, 4, 9, 3]
st.query(1, 3)    # 5 + 10 + 4 = 19`,

  c: `#include <stdio.h>

#define MAXN 100

int tree[4 * MAXN];
int n;

void build(int arr[], int node, int l, int r) {
    if (l == r) {
        tree[node] = arr[l];
        return;
    }
    int mid = (l + r) / 2;
    build(arr, 2 * node, l, mid);
    build(arr, 2 * node + 1, mid + 1, r);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

void update(int node, int l, int r, int index, int value) {
    if (l == r) {
        tree[node] = value;
        return;
    }
    int mid = (l + r) / 2;
    if (index <= mid) update(2 * node, l, mid, index, value);
    else update(2 * node + 1, mid + 1, r, index, value);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

int query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;         // fully outside -- identity element
    if (ql <= l && r <= qr) return tree[node]; // fully inside -- use cached value
    int mid = (l + r) / 2;
    return query(2 * node, l, mid, ql, qr) + query(2 * node + 1, mid + 1, r, ql, qr);
}

int main() {
    int arr[] = {2, 5, 1, 4, 9, 3};
    n = 6;
    build(arr, 1, 0, n - 1);

    printf("query(1,3) = %d\\n", query(1, 0, n - 1, 1, 3)); // 10

    update(1, 0, n - 1, 2, 10); // arr[2] becomes 10
    printf("query(1,3) after update = %d\\n", query(1, 0, n - 1, 1, 3)); // 19

    return 0;
}`,

  java: `// Sum Segment Tree, built over an array using a flat 1-indexed array
// representation (node i's children are at 2i and 2i+1)
public class SegmentTree {
    private final int[] tree;
    private final int n;

    public SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 1, 0, n - 1);
    }

    private void build(int[] arr, int node, int l, int r) {
        if (l == r) {
            tree[node] = arr[l];
            return;
        }
        int mid = (l + r) / 2;
        build(arr, 2 * node, l, mid);
        build(arr, 2 * node + 1, mid + 1, r);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public void update(int index, int value) {
        update(1, 0, n - 1, index, value);
    }

    private void update(int node, int l, int r, int index, int value) {
        if (l == r) {
            tree[node] = value;
            return;
        }
        int mid = (l + r) / 2;
        if (index <= mid) update(2 * node, l, mid, index, value);
        else update(2 * node + 1, mid + 1, r, index, value);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public int query(int ql, int qr) {
        return query(1, 0, n - 1, ql, qr);
    }

    private int query(int node, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return 0;            // fully outside -- identity element
        if (ql <= l && r <= qr) return tree[node]; // fully inside -- use cached value
        int mid = (l + r) / 2;
        return query(2 * node, l, mid, ql, qr) + query(2 * node + 1, mid + 1, r, ql, qr);
    }

    public static void main(String[] args) {
        SegmentTree st = new SegmentTree(new int[]{2, 5, 1, 4, 9, 3});
        System.out.println(st.query(1, 3)); // 10
        st.update(2, 10);
        System.out.println(st.query(1, 3)); // 19
    }
}`,
};

export default codeExamples;
