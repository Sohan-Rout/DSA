const codeExamples = {
  javascript: `// Reading a recurrence off the code, then solving it with the Master Theorem.

// T(n) = 2T(n/2) + n
//   a = 2 (two recursive calls)
//   b = 2 (each on half the input)
//   f(n) = n (the merge)
// Watershed: n^(log2 2) = n. f(n) = n matches it -> CASE 2.
// T(n) = Theta(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    out.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  while (i < left.length) out.push(left[i++]);
  while (j < right.length) out.push(right[j++]);
  return out;
}

// T(n) = T(n/2) + 1
//   a = 1, b = 2, f(n) = 1
// Watershed: n^(log2 1) = n^0 = 1. f(n) = 1 matches it -> CASE 2.
// T(n) = Theta(log n)
function binarySearch(arr, target, low = 0, high = arr.length - 1) {
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) return mid;

  return arr[mid] < target
    ? binarySearch(arr, target, mid + 1, high)
    : binarySearch(arr, target, low, mid - 1);
}

// T(n) = 4T(n/2) + n
//   Watershed: n^(log2 4) = n^2, and f(n) = n is polynomially smaller
//   -> CASE 1. T(n) = Theta(n^2)
function fourWay(n) {
  if (n <= 1) return 1;

  let work = 0;
  for (let i = 0; i < n; i++) work++;          // f(n) = n

  return work + fourWay(n / 2) + fourWay(n / 2)
              + fourWay(n / 2) + fourWay(n / 2); // a = 4
}

// A calculator for the three cases.
// Compares f(n) = n^fExp against the watershed n^(log_b a).
function masterTheorem(a, b, fExp) {
  const watershed = Math.log(a) / Math.log(b);  // log_b(a)
  const EPS = 1e-9;

  if (fExp < watershed - EPS) {
    return \`Case 1: T(n) = Theta(n^\${watershed.toFixed(3)})\`;
  }
  if (Math.abs(fExp - watershed) <= EPS) {
    return \`Case 2: T(n) = Theta(n^\${watershed.toFixed(3)} log n)\`;
  }
  return \`Case 3: T(n) = Theta(n^\${fExp}) — verify a*f(n/b) <= c*f(n)\`;
}

console.log(masterTheorem(2, 2, 1));  // Case 2: Theta(n log n)
console.log(masterTheorem(4, 2, 1));  // Case 1: Theta(n^2)
console.log(masterTheorem(2, 2, 2));  // Case 3: Theta(n^2)
console.log(masterTheorem(7, 2, 2));  // Case 1: Theta(n^2.807) - Strassen`,

  python: `# Reading a recurrence off the code, then solving it with the Master Theorem.

import math


# T(n) = 2T(n/2) + n
#   a = 2 (two recursive calls)
#   b = 2 (each on half the input)
#   f(n) = n (the merge)
# Watershed: n^(log2 2) = n. f(n) = n matches it -> CASE 2.
# T(n) = Theta(n log n)
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)


def merge(left, right):
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    out.extend(left[i:])
    out.extend(right[j:])
    return out


# T(n) = T(n/2) + 1
#   a = 1, b = 2, f(n) = 1
# Watershed: n^(log2 1) = n^0 = 1 -> CASE 2. T(n) = Theta(log n)
def binary_search(arr, target, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low > high:
        return -1

    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return binary_search(arr, target, mid + 1, high)
    return binary_search(arr, target, low, mid - 1)


# A calculator for the three cases.
# Compares f(n) = n^f_exp against the watershed n^(log_b a).
def master_theorem(a, b, f_exp):
    watershed = math.log(a) / math.log(b)   # log_b(a)
    eps = 1e-9

    if f_exp < watershed - eps:
        return f"Case 1: T(n) = Theta(n^{watershed:.3f})"
    if abs(f_exp - watershed) <= eps:
        return f"Case 2: T(n) = Theta(n^{watershed:.3f} log n)"
    return f"Case 3: T(n) = Theta(n^{f_exp}) - verify a*f(n/b) <= c*f(n)"


print(master_theorem(2, 2, 1))   # Case 2: Theta(n log n)
print(master_theorem(4, 2, 1))   # Case 1: Theta(n^2)
print(master_theorem(2, 2, 2))   # Case 3: Theta(n^2)
print(master_theorem(7, 2, 2))   # Case 1: Theta(n^2.807) - Strassen`,

  java: `// Reading a recurrence off the code, then solving it with the Master Theorem.

import java.util.Arrays;

public class MasterTheoremDemo {

    // T(n) = 2T(n/2) + n
    //   a = 2, b = 2, f(n) = n
    // Watershed: n^(log2 2) = n. f(n) matches it -> CASE 2.
    // T(n) = Theta(n log n)
    static int[] mergeSort(int[] arr) {
        if (arr.length <= 1) return arr;

        int mid = arr.length / 2;
        int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
        int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
        return merge(left, right);
    }

    static int[] merge(int[] left, int[] right) {
        int[] out = new int[left.length + right.length];
        int i = 0, j = 0, k = 0;
        while (i < left.length && j < right.length) {
            out[k++] = left[i] <= right[j] ? left[i++] : right[j++];
        }
        while (i < left.length) out[k++] = left[i++];
        while (j < right.length) out[k++] = right[j++];
        return out;
    }

    // T(n) = T(n/2) + 1
    //   a = 1, b = 2, f(n) = 1
    // Watershed: n^(log2 1) = 1 -> CASE 2. T(n) = Theta(log n)
    static int binarySearch(int[] arr, int target, int low, int high) {
        if (low > high) return -1;

        int mid = (low + high) / 2;
        if (arr[mid] == target) return mid;

        return arr[mid] < target
            ? binarySearch(arr, target, mid + 1, high)
            : binarySearch(arr, target, low, mid - 1);
    }

    // A calculator for the three cases.
    // Compares f(n) = n^fExp against the watershed n^(log_b a).
    static String masterTheorem(double a, double b, double fExp) {
        double watershed = Math.log(a) / Math.log(b);   // log_b(a)
        double eps = 1e-9;

        if (fExp < watershed - eps) {
            return String.format("Case 1: T(n) = Theta(n^%.3f)", watershed);
        }
        if (Math.abs(fExp - watershed) <= eps) {
            return String.format("Case 2: T(n) = Theta(n^%.3f log n)", watershed);
        }
        return String.format(
            "Case 3: T(n) = Theta(n^%.1f) - verify a*f(n/b) <= c*f(n)", fExp);
    }

    public static void main(String[] args) {
        System.out.println(masterTheorem(2, 2, 1));  // Case 2: Theta(n log n)
        System.out.println(masterTheorem(4, 2, 1));  // Case 1: Theta(n^2)
        System.out.println(masterTheorem(2, 2, 2));  // Case 3: Theta(n^2)
        System.out.println(masterTheorem(7, 2, 2));  // Case 1: Strassen
    }
}`,

  c: `/* Reading a recurrence off the code, then solving it with the Master Theorem. */

#include <stdio.h>
#include <math.h>
#include <stdlib.h>

/* T(n) = 2T(n/2) + n
     a = 2, b = 2, f(n) = n
   Watershed: n^(log2 2) = n. f(n) matches it -> CASE 2.
   T(n) = Theta(n log n) */
void merge(int arr[], int low, int mid, int high) {
    int n1 = mid - low + 1, n2 = high - mid;
    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));

    for (int i = 0; i < n1; i++) L[i] = arr[low + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = low;
    while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];

    free(L);
    free(R);
}

void mergeSort(int arr[], int low, int high) {
    if (low >= high) return;

    int mid = low + (high - low) / 2;
    mergeSort(arr, low, mid);        /* a = 2 calls  */
    mergeSort(arr, mid + 1, high);   /* b = 2        */
    merge(arr, low, mid, high);      /* f(n) = O(n)  */
}

/* T(n) = T(n/2) + 1
     a = 1, b = 2, f(n) = 1
   Watershed: n^(log2 1) = 1 -> CASE 2. T(n) = Theta(log n) */
int binarySearch(int arr[], int target, int low, int high) {
    if (low > high) return -1;

    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;

    return arr[mid] < target
        ? binarySearch(arr, target, mid + 1, high)
        : binarySearch(arr, target, low, mid - 1);
}

/* A calculator for the three cases.
   Compares f(n) = n^fExp against the watershed n^(log_b a). */
void masterTheorem(double a, double b, double fExp) {
    double watershed = log(a) / log(b);   /* log_b(a) */
    double eps = 1e-9;

    if (fExp < watershed - eps) {
        printf("Case 1: T(n) = Theta(n^%.3f)\\n", watershed);
    } else if (fabs(fExp - watershed) <= eps) {
        printf("Case 2: T(n) = Theta(n^%.3f log n)\\n", watershed);
    } else {
        printf("Case 3: T(n) = Theta(n^%.1f) - verify a*f(n/b) <= c*f(n)\\n", fExp);
    }
}

int main(void) {
    masterTheorem(2, 2, 1);   /* Case 2: Theta(n log n)  */
    masterTheorem(4, 2, 1);   /* Case 1: Theta(n^2)      */
    masterTheorem(2, 2, 2);   /* Case 3: Theta(n^2)      */
    masterTheorem(7, 2, 2);   /* Case 1: Strassen        */
    return 0;
}`,

  cpp: `// Reading a recurrence off the code, then solving it with the Master Theorem.

#include <iostream>
#include <cmath>
#include <string>
#include <vector>

// T(n) = 2T(n/2) + n
//   a = 2, b = 2, f(n) = n
// Watershed: n^(log2 2) = n. f(n) matches it -> CASE 2.
// T(n) = Theta(n log n)
std::vector<int> merge(const std::vector<int>& left,
                       const std::vector<int>& right) {
    std::vector<int> out;
    out.reserve(left.size() + right.size());

    size_t i = 0, j = 0;
    while (i < left.size() && j < right.size()) {
        out.push_back(left[i] <= right[j] ? left[i++] : right[j++]);
    }
    while (i < left.size()) out.push_back(left[i++]);
    while (j < right.size()) out.push_back(right[j++]);
    return out;
}

std::vector<int> mergeSort(const std::vector<int>& arr) {
    if (arr.size() <= 1) return arr;

    size_t mid = arr.size() / 2;
    auto left = mergeSort({arr.begin(), arr.begin() + mid});   // a = 2
    auto right = mergeSort({arr.begin() + mid, arr.end()});    // b = 2
    return merge(left, right);                                 // f(n) = O(n)
}

// T(n) = T(n/2) + 1
//   Watershed: n^(log2 1) = 1 -> CASE 2. T(n) = Theta(log n)
int binarySearch(const std::vector<int>& arr, int target, int low, int high) {
    if (low > high) return -1;

    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;

    return arr[mid] < target
        ? binarySearch(arr, target, mid + 1, high)
        : binarySearch(arr, target, low, mid - 1);
}

// A calculator for the three cases.
// Compares f(n) = n^fExp against the watershed n^(log_b a).
std::string masterTheorem(double a, double b, double fExp) {
    double watershed = std::log(a) / std::log(b);   // log_b(a)
    const double eps = 1e-9;

    if (fExp < watershed - eps) {
        return "Case 1: T(n) = Theta(n^" + std::to_string(watershed) + ")";
    }
    if (std::fabs(fExp - watershed) <= eps) {
        return "Case 2: T(n) = Theta(n^" + std::to_string(watershed) + " log n)";
    }
    return "Case 3: T(n) = Theta(n^" + std::to_string(fExp) +
           ") - verify a*f(n/b) <= c*f(n)";
}

int main() {
    std::cout << masterTheorem(2, 2, 1) << "\\n";  // Case 2: Theta(n log n)
    std::cout << masterTheorem(4, 2, 1) << "\\n";  // Case 1: Theta(n^2)
    std::cout << masterTheorem(2, 2, 2) << "\\n";  // Case 3: Theta(n^2)
    std::cout << masterTheorem(7, 2, 2) << "\\n";  // Case 1: Strassen
    return 0;
}`,
};

export default codeExamples;
