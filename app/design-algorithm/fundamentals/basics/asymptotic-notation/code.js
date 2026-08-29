const codeExamples = {
  javascript: `// Reading the asymptotic notation straight off the loop structure.

// O(1) - the work never depends on n.
function first(arr) {
  return arr.length === 0 ? null : arr[0];
}

// O(n) - one pass, constant work per element.
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) total += arr[i];
  return total;
}

// O(log n) - the counter doubles, so it reaches n in log2(n) steps.
function countDoublings(n) {
  let steps = 0;
  for (let i = 1; i < n; i *= 2) steps++;
  return steps;
}

// O(n^2) - nested loops multiply.
function countPairs(arr) {
  let pairs = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) pairs++;
  }
  return pairs;
}
// Note: the inner loop runs n-1, n-2, ... 1 times.
// That sums to n(n-1)/2, which is still Theta(n^2).

// O(n log n) - a logarithmic loop nested inside a linear one.
function linearithmic(n) {
  let work = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j *= 2) work++;
  }
  return work;
}

// Sequential blocks ADD, so the largest one decides the answer:
// O(n) + O(n^2) + O(1) = O(n^2)`,

  python: `# Reading the asymptotic notation straight off the loop structure.

# O(1) - the work never depends on n.
def first(arr):
    return None if len(arr) == 0 else arr[0]


# O(n) - one pass, constant work per element.
def total(arr):
    result = 0
    for value in arr:
        result += value
    return result


# O(log n) - the counter doubles, so it reaches n in log2(n) steps.
def count_doublings(n):
    steps = 0
    i = 1
    while i < n:
        steps += 1
        i *= 2
    return steps


# O(n^2) - nested loops multiply.
def count_pairs(arr):
    pairs = 0
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            pairs += 1
    return pairs


# O(n log n) - a logarithmic loop nested inside a linear one.
def linearithmic(n):
    work = 0
    for _ in range(n):
        j = 1
        while j < n:
            work += 1
            j *= 2
    return work

# Sequential blocks ADD, so the largest one decides the answer:
# O(n) + O(n^2) + O(1) = O(n^2)`,

  java: `// Reading the asymptotic notation straight off the loop structure.

public class AsymptoticDemo {

    // O(1) - the work never depends on n.
    static Integer first(int[] arr) {
        return arr.length == 0 ? null : arr[0];
    }

    // O(n) - one pass, constant work per element.
    static long sum(int[] arr) {
        long total = 0;
        for (int i = 0; i < arr.length; i++) total += arr[i];
        return total;
    }

    // O(log n) - the counter doubles, so it reaches n in log2(n) steps.
    static int countDoublings(int n) {
        int steps = 0;
        for (int i = 1; i < n; i *= 2) steps++;
        return steps;
    }

    // O(n^2) - nested loops multiply.
    static long countPairs(int[] arr) {
        long pairs = 0;
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) pairs++;
        }
        return pairs;
    }
    // The inner loop runs n-1, n-2, ... 1 times: n(n-1)/2 = Theta(n^2).

    // O(n log n) - a logarithmic loop nested inside a linear one.
    static long linearithmic(int n) {
        long work = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 1; j < n; j *= 2) work++;
        }
        return work;
    }

    // Sequential blocks ADD, so the largest one decides the answer:
    // O(n) + O(n^2) + O(1) = O(n^2)
}`,

  c: `/* Reading the asymptotic notation straight off the loop structure. */

#include <stdio.h>

/* O(1) - the work never depends on n. */
int first(int arr[], int n) {
    return n == 0 ? -1 : arr[0];
}

/* O(n) - one pass, constant work per element. */
long sum(int arr[], int n) {
    long total = 0;
    for (int i = 0; i < n; i++) total += arr[i];
    return total;
}

/* O(log n) - the counter doubles, so it reaches n in log2(n) steps. */
int countDoublings(int n) {
    int steps = 0;
    for (int i = 1; i < n; i *= 2) steps++;
    return steps;
}

/* O(n^2) - nested loops multiply.
   The inner loop runs n-1, n-2, ... 1 times: n(n-1)/2 = Theta(n^2). */
long countPairs(int arr[], int n) {
    long pairs = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) pairs++;
    }
    return pairs;
}

/* O(n log n) - a logarithmic loop nested inside a linear one. */
long linearithmic(int n) {
    long work = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 1; j < n; j *= 2) work++;
    }
    return work;
}

/* Sequential blocks ADD, so the largest one decides the answer:
   O(n) + O(n^2) + O(1) = O(n^2) */`,

  cpp: `// Reading the asymptotic notation straight off the loop structure.

#include <iostream>
#include <vector>

// O(1) - the work never depends on n.
int first(const std::vector<int>& arr) {
    return arr.empty() ? -1 : arr[0];
}

// O(n) - one pass, constant work per element.
long sum(const std::vector<int>& arr) {
    long total = 0;
    for (int value : arr) total += value;
    return total;
}

// O(log n) - the counter doubles, so it reaches n in log2(n) steps.
int countDoublings(int n) {
    int steps = 0;
    for (int i = 1; i < n; i *= 2) steps++;
    return steps;
}

// O(n^2) - nested loops multiply.
// The inner loop runs n-1, n-2, ... 1 times: n(n-1)/2 = Theta(n^2).
long countPairs(const std::vector<int>& arr) {
    long pairs = 0;
    for (size_t i = 0; i < arr.size(); i++) {
        for (size_t j = i + 1; j < arr.size(); j++) pairs++;
    }
    return pairs;
}

// O(n log n) - a logarithmic loop nested inside a linear one.
long linearithmic(int n) {
    long work = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 1; j < n; j *= 2) work++;
    }
    return work;
}

// Sequential blocks ADD, so the largest one decides the answer:
// O(n) + O(n^2) + O(1) = O(n^2)`,
};

export default codeExamples;
