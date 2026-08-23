const codeExamples = {
  javascript: `// Comparing complexities of two solutions to the same problem
// Problem: does the array contain any duplicate value?

// Approach 1 — compare every pair
// Time:  O(n^2)  ... two nested loops over n
// Space: O(1)    ... no extra structure is allocated
function hasDuplicateBrute(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// Approach 2 — remember what we have already seen
// Time:  O(n)    ... one pass, O(1) average work per element
// Space: O(n)    ... the set can hold every element
function hasDuplicateSet(arr) {
  const seen = new Set();
  for (const value of arr) {
    if (seen.has(value)) return true;
    seen.add(value);
  }
  return false;
}

// The classic time-space trade-off: approach 2 spends O(n) memory
// to remove a whole factor of n from the running time.

// Recursion costs stack space even with no allocation.
// Time: O(n), Space: O(n) - n frames are open at the deepest point.
function sumTo(n) {
  if (n === 0) return 0;
  return n + sumTo(n - 1);
}

// Same result, Space: O(1) - the loop keeps one frame alive.
function sumToIterative(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) total += i;
  return total;
}`,

  python: `# Comparing complexities of two solutions to the same problem
# Problem: does the list contain any duplicate value?

# Approach 1 - compare every pair
# Time:  O(n^2)  ... two nested loops over n
# Space: O(1)    ... no extra structure is allocated
def has_duplicate_brute(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False


# Approach 2 - remember what we have already seen
# Time:  O(n)    ... one pass, O(1) average work per element
# Space: O(n)    ... the set can hold every element
def has_duplicate_set(arr):
    seen = set()
    for value in arr:
        if value in seen:
            return True
        seen.add(value)
    return False


# Recursion costs stack space even with no allocation.
# Time: O(n), Space: O(n) - n frames are open at the deepest point.
def sum_to(n):
    if n == 0:
        return 0
    return n + sum_to(n - 1)


# Same result, Space: O(1) - the loop keeps one frame alive.
def sum_to_iterative(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total`,

  java: `// Comparing complexities of two solutions to the same problem
// Problem: does the array contain any duplicate value?

import java.util.HashSet;
import java.util.Set;

public class ComplexityDemo {

    // Approach 1 - compare every pair
    // Time:  O(n^2)  ... two nested loops over n
    // Space: O(1)    ... no extra structure is allocated
    static boolean hasDuplicateBrute(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) return true;
            }
        }
        return false;
    }

    // Approach 2 - remember what we have already seen
    // Time:  O(n)    ... one pass, O(1) average work per element
    // Space: O(n)    ... the set can hold every element
    static boolean hasDuplicateSet(int[] arr) {
        Set<Integer> seen = new HashSet<>();
        for (int value : arr) {
            if (!seen.add(value)) return true;
        }
        return false;
    }

    // Recursion costs stack space even with no allocation.
    // Time: O(n), Space: O(n) - n frames are open at the deepest point.
    static long sumTo(int n) {
        if (n == 0) return 0;
        return n + sumTo(n - 1);
    }

    // Same result, Space: O(1) - the loop keeps one frame alive.
    static long sumToIterative(int n) {
        long total = 0;
        for (int i = 1; i <= n; i++) total += i;
        return total;
    }
}`,

  c: `/* Comparing complexities of two solutions to the same problem
   Problem: does the array contain any duplicate value? */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Approach 1 - compare every pair
   Time:  O(n^2)  ... two nested loops over n
   Space: O(1)    ... no extra structure is allocated */
int hasDuplicateBrute(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) return 1;
        }
    }
    return 0;
}

/* Approach 2 - mark values we have already seen (small, known value range)
   Time:  O(n + k) ... one pass over n, plus a table of size k
   Space: O(k)     ... one flag per possible value */
int hasDuplicateTable(int arr[], int n, int maxValue) {
    char *seen = calloc(maxValue + 1, sizeof(char));
    if (!seen) return -1;

    for (int i = 0; i < n; i++) {
        if (seen[arr[i]]) { free(seen); return 1; }
        seen[arr[i]] = 1;
    }
    free(seen);
    return 0;
}

/* Recursion costs stack space even with no allocation.
   Time: O(n), Space: O(n) - n frames are open at the deepest point. */
long sumTo(int n) {
    if (n == 0) return 0;
    return n + sumTo(n - 1);
}

/* Same result, Space: O(1) - the loop keeps one frame alive. */
long sumToIterative(int n) {
    long total = 0;
    for (int i = 1; i <= n; i++) total += i;
    return total;
}`,

  cpp: `// Comparing complexities of two solutions to the same problem
// Problem: does the vector contain any duplicate value?

#include <iostream>
#include <unordered_set>
#include <vector>

// Approach 1 - compare every pair
// Time:  O(n^2)  ... two nested loops over n
// Space: O(1)    ... no extra structure is allocated
bool hasDuplicateBrute(const std::vector<int>& arr) {
    for (size_t i = 0; i < arr.size(); i++) {
        for (size_t j = i + 1; j < arr.size(); j++) {
            if (arr[i] == arr[j]) return true;
        }
    }
    return false;
}

// Approach 2 - remember what we have already seen
// Time:  O(n)    ... one pass, O(1) average work per element
// Space: O(n)    ... the set can hold every element
bool hasDuplicateSet(const std::vector<int>& arr) {
    std::unordered_set<int> seen;
    for (int value : arr) {
        if (!seen.insert(value).second) return true;
    }
    return false;
}

// Recursion costs stack space even with no allocation.
// Time: O(n), Space: O(n) - n frames are open at the deepest point.
long sumTo(int n) {
    if (n == 0) return 0;
    return n + sumTo(n - 1);
}

// Same result, Space: O(1) - the loop keeps one frame alive.
long sumToIterative(int n) {
    long total = 0;
    for (int i = 1; i <= n; i++) total += i;
    return total;
}`,
};

export default codeExamples;
