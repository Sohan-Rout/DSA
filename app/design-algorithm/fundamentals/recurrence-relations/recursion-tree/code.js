const codeExamples = {
  javascript: `// Building a recursion tree in code: sum the levels, then compare the
// total against the closed form the drawing predicted.

// ---- T(n) = 2T(n/2) + n  ->  every level costs n  ->  Theta(n log n) ----
function levelsOfMergeSort(n) {
  const rows = [];
  let nodes = 1;          // nodes at this depth
  let size = n;           // size of each subproblem at this depth

  while (size >= 1) {
    rows.push({ nodes, size, levelCost: nodes * size });
    nodes *= 2;           // a = 2 children per node
    size = Math.floor(size / 2);
  }
  return rows;
}

function showMergeSortTree(n) {
  const rows = levelsOfMergeSort(n);
  console.log("depth\\tnodes\\tsize\\tlevel cost");
  rows.forEach((r, i) =>
    console.log(\`\${i}\\t\${r.nodes}\\t\${r.size}\\t\${r.levelCost}\`)
  );

  const total = rows.reduce((sum, r) => sum + r.levelCost, 0);
  console.log(\`total = \${total}, n*log2(n) = \${(n * Math.log2(n)).toFixed(0)}\`);
}

// ---- T(n) = 3T(n/4) + n^2  ->  levels shrink by 3/16  ->  Theta(n^2) ----
// The geometric series sums to 1/(1 - 3/16) = 16/13 ~ 1.2308.
function quadraticTree(n) {
  const memo = new Map();

  const T = (m) => {
    if (m < 1) return 0;
    if (m <= 1) return 1;
    if (memo.has(m)) return memo.get(m);

    const value = 3 * T(Math.floor(m / 4)) + m * m;
    memo.set(m, value);
    return value;
  };

  console.log("n\\tT(n)/n^2  <- should approach 16/13 = 1.2308");
  for (const size of [1e3, 1e4, 1e5, 1e6]) {
    console.log(\`\${size}\\t\${(T(size) / (size * size)).toFixed(4)}\`);
  }
}

// ---- T(n) = T(n/3) + T(2n/3) + n  ->  unequal split  ->  Theta(n log n) ----
// The Master Theorem cannot state this one; the tree handles it fine.
function unevenSplit(n) {
  const memo = new Map();

  const T = (m) => {
    if (m < 1) return 0;
    if (m <= 1) return 1;
    if (memo.has(m)) return memo.get(m);

    const value = T(Math.floor(m / 3)) + T(Math.floor((2 * m) / 3)) + m;
    memo.set(m, value);
    return value;
  };

  console.log("n\\tT(n)/(n log2 n)  <- should settle at a constant");
  for (const size of [1e3, 1e4, 1e5, 1e6]) {
    console.log(\`\${size}\\t\${(T(size) / (size * Math.log2(size))).toFixed(3)}\`);
  }
}

showMergeSortTree(16);
quadraticTree();
unevenSplit();`,

  python: `# Building a recursion tree in code: sum the levels, then compare the
# total against the closed form the drawing predicted.

import math
from functools import lru_cache


# ---- T(n) = 2T(n/2) + n  ->  every level costs n  ->  Theta(n log n) ----
def levels_of_merge_sort(n):
    rows = []
    nodes = 1          # nodes at this depth
    size = n           # size of each subproblem at this depth

    while size >= 1:
        rows.append((nodes, size, nodes * size))
        nodes *= 2     # a = 2 children per node
        size //= 2
    return rows


def show_merge_sort_tree(n):
    rows = levels_of_merge_sort(n)
    print("depth\\tnodes\\tsize\\tlevel cost")
    for i, (nodes, size, cost) in enumerate(rows):
        print(f"{i}\\t{nodes}\\t{size}\\t{cost}")

    total = sum(cost for _, _, cost in rows)
    print(f"total = {total}, n*log2(n) = {n * math.log2(n):.0f}")


# ---- T(n) = 3T(n/4) + n^2  ->  levels shrink by 3/16  ->  Theta(n^2) ----
# The geometric series sums to 1/(1 - 3/16) = 16/13 ~ 1.2308.
@lru_cache(maxsize=None)
def t_quadratic(m):
    if m < 1:
        return 0
    if m <= 1:
        return 1
    return 3 * t_quadratic(m // 4) + m * m


def quadratic_tree():
    print("n\\tT(n)/n^2  <- should approach 16/13 = 1.2308")
    for size in [10**3, 10**4, 10**5, 10**6]:
        print(f"{size}\\t{t_quadratic(size) / (size * size):.4f}")


# ---- T(n) = T(n/3) + T(2n/3) + n  ->  unequal split  ->  Theta(n log n) ----
# The Master Theorem cannot state this one; the tree handles it fine.
@lru_cache(maxsize=None)
def t_uneven(m):
    if m < 1:
        return 0
    if m <= 1:
        return 1
    return t_uneven(m // 3) + t_uneven(2 * m // 3) + m


def uneven_split():
    print("n\\tT(n)/(n log2 n)  <- should settle at a constant")
    for size in [10**3, 10**4, 10**5, 10**6]:
        print(f"{size}\\t{t_uneven(size) / (size * math.log2(size)):.3f}")


show_merge_sort_tree(16)
quadratic_tree()
uneven_split()`,

  java: `// Building a recursion tree in code: sum the levels, then compare the
// total against the closed form the drawing predicted.

import java.util.HashMap;
import java.util.Map;

public class RecursionTreeDemo {

    // ---- T(n) = 2T(n/2) + n -> every level costs n -> Theta(n log n) ----
    static void showMergeSortTree(int n) {
        System.out.println("depth\\tnodes\\tsize\\tlevel cost");

        long nodes = 1;      // nodes at this depth
        long size = n;       // size of each subproblem at this depth
        long total = 0;
        int depth = 0;

        while (size >= 1) {
            long levelCost = nodes * size;
            System.out.printf("%d\\t%d\\t%d\\t%d%n", depth, nodes, size, levelCost);
            total += levelCost;

            nodes *= 2;      // a = 2 children per node
            size /= 2;
            depth++;
        }
        System.out.printf("total = %d, n*log2(n) = %.0f%n",
            total, n * (Math.log(n) / Math.log(2)));
    }

    // ---- T(n) = 3T(n/4) + n^2 -> levels shrink by 3/16 -> Theta(n^2) ----
    // The geometric series sums to 1/(1 - 3/16) = 16/13 ~ 1.2308.
    static Map<Long, Long> quadMemo = new HashMap<>();

    static long tQuadratic(long m) {
        if (m < 1) return 0;
        if (m <= 1) return 1;
        if (quadMemo.containsKey(m)) return quadMemo.get(m);

        long value = 3 * tQuadratic(m / 4) + m * m;
        quadMemo.put(m, value);
        return value;
    }

    // ---- T(n) = T(n/3) + T(2n/3) + n -> unequal split -> Theta(n log n) ----
    // The Master Theorem cannot state this one; the tree handles it fine.
    static Map<Long, Long> unevenMemo = new HashMap<>();

    static long tUneven(long m) {
        if (m < 1) return 0;
        if (m <= 1) return 1;
        if (unevenMemo.containsKey(m)) return unevenMemo.get(m);

        long value = tUneven(m / 3) + tUneven(2 * m / 3) + m;
        unevenMemo.put(m, value);
        return value;
    }

    public static void main(String[] args) {
        showMergeSortTree(16);

        System.out.println("n\\tT(n)/n^2  <- should approach 1.2308");
        for (long size : new long[]{1000, 10000, 100000, 1000000}) {
            System.out.printf("%d\\t%.4f%n", size,
                (double) tQuadratic(size) / ((double) size * size));
        }

        System.out.println("n\\tT(n)/(n log2 n)  <- should settle");
        for (long size : new long[]{1000, 10000, 100000, 1000000}) {
            double logs = Math.log(size) / Math.log(2);
            System.out.printf("%d\\t%.3f%n", size, tUneven(size) / (size * logs));
        }
    }
}`,

  c: `/* Building a recursion tree in code: sum the levels, then compare the
   total against the closed form the drawing predicted. */

#include <stdio.h>
#include <math.h>

/* ---- T(n) = 2T(n/2) + n -> every level costs n -> Theta(n log n) ---- */
void showMergeSortTree(long n) {
    printf("depth\\tnodes\\tsize\\tlevel cost\\n");

    long nodes = 1;      /* nodes at this depth                    */
    long size = n;       /* size of each subproblem at this depth  */
    long total = 0;
    int depth = 0;

    while (size >= 1) {
        long levelCost = nodes * size;
        printf("%d\\t%ld\\t%ld\\t%ld\\n", depth, nodes, size, levelCost);
        total += levelCost;

        nodes *= 2;      /* a = 2 children per node */
        size /= 2;
        depth++;
    }
    printf("total = %ld, n*log2(n) = %.0f\\n", total, n * log2((double) n));
}

/* ---- T(n) = 3T(n/4) + n^2 -> levels shrink by 3/16 -> Theta(n^2) ----
   The geometric series sums to 1/(1 - 3/16) = 16/13 ~ 1.2308. */
double tQuadratic(long m) {
    if (m < 1) return 0;
    if (m <= 1) return 1;
    return 3 * tQuadratic(m / 4) + (double) m * m;
}

/* ---- T(n) = T(n/3) + T(2n/3) + n -> unequal split -> Theta(n log n) ----
   The Master Theorem cannot state this one; the tree handles it fine. */
double tUneven(long m) {
    if (m < 1) return 0;
    if (m <= 1) return 1;
    return tUneven(m / 3) + tUneven(2 * m / 3) + (double) m;
}

int main(void) {
    showMergeSortTree(16);

    printf("n\\tT(n)/n^2  <- should approach 1.2308\\n");
    for (long size = 1000; size <= 1000000; size *= 10) {
        printf("%ld\\t%.4f\\n", size, tQuadratic(size) / ((double) size * size));
    }

    printf("n\\tT(n)/(n log2 n)  <- should settle\\n");
    for (long size = 1000; size <= 100000; size *= 10) {
        printf("%ld\\t%.3f\\n", size,
               tUneven(size) / (size * log2((double) size)));
    }
    return 0;
}`,

  cpp: `// Building a recursion tree in code: sum the levels, then compare the
// total against the closed form the drawing predicted.

#include <iostream>
#include <cmath>
#include <unordered_map>
#include <vector>

// ---- T(n) = 2T(n/2) + n -> every level costs n -> Theta(n log n) ----
void showMergeSortTree(long n) {
    std::cout << "depth\\tnodes\\tsize\\tlevel cost\\n";

    long nodes = 1;      // nodes at this depth
    long size = n;       // size of each subproblem at this depth
    long total = 0;
    int depth = 0;

    while (size >= 1) {
        long levelCost = nodes * size;
        std::cout << depth << "\\t" << nodes << "\\t" << size << "\\t"
                  << levelCost << "\\n";
        total += levelCost;

        nodes *= 2;      // a = 2 children per node
        size /= 2;
        depth++;
    }
    std::cout << "total = " << total
              << ", n*log2(n) = " << n * std::log2(n) << "\\n";
}

// ---- T(n) = 3T(n/4) + n^2 -> levels shrink by 3/16 -> Theta(n^2) ----
// The geometric series sums to 1/(1 - 3/16) = 16/13 ~ 1.2308.
double tQuadratic(long m) {
    static std::unordered_map<long, double> memo;
    if (m < 1) return 0;
    if (m <= 1) return 1;

    auto it = memo.find(m);
    if (it != memo.end()) return it->second;

    double value = 3 * tQuadratic(m / 4) + static_cast<double>(m) * m;
    memo[m] = value;
    return value;
}

// ---- T(n) = T(n/3) + T(2n/3) + n -> unequal split -> Theta(n log n) ----
// The Master Theorem cannot state this one; the tree handles it fine.
double tUneven(long m) {
    static std::unordered_map<long, double> memo;
    if (m < 1) return 0;
    if (m <= 1) return 1;

    auto it = memo.find(m);
    if (it != memo.end()) return it->second;

    double value = tUneven(m / 3) + tUneven(2 * m / 3) + static_cast<double>(m);
    memo[m] = value;
    return value;
}

int main() {
    showMergeSortTree(16);

    std::cout << "n\\tT(n)/n^2  <- should approach 1.2308\\n";
    for (long size : {1000L, 10000L, 100000L, 1000000L}) {
        std::cout << size << "\\t"
                  << tQuadratic(size) / (static_cast<double>(size) * size) << "\\n";
    }

    std::cout << "n\\tT(n)/(n log2 n)  <- should settle\\n";
    for (long size : {1000L, 10000L, 100000L, 1000000L}) {
        std::cout << size << "\\t"
                  << tUneven(size) / (size * std::log2(size)) << "\\n";
    }
    return 0;
}`,
};

export default codeExamples;
