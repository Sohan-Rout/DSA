const codeExamples = {
  javascript: `// The divide-and-conquer template, then three algorithms that follow it.

// ---------- The shape every one of them shares ----------
// function solve(problem) {
//   if (isSmallEnough(problem)) return solveDirectly(problem);  // base case
//   const pieces  = divide(problem);                            // divide
//   const answers = pieces.map(solve);                          // conquer
//   return combine(answers);                                    // combine
// }

// ---------- 1. Binary search ----------
// T(n) = T(n/2) + O(1)  ->  Theta(log n)
// divide: look at the middle. conquer: recurse into one side.
// combine: nothing, the other half is discarded.
function binarySearch(arr, target, low = 0, high = arr.length - 1) {
  if (low > high) return -1;                     // base case

  const mid = low + Math.floor((high - low) / 2);
  if (arr[mid] === target) return mid;

  return arr[mid] < target
    ? binarySearch(arr, target, mid + 1, high)
    : binarySearch(arr, target, low, mid - 1);
}

// ---------- 2. Merge sort ----------
// T(n) = 2T(n/2) + O(n)  ->  Theta(n log n)
// divide: split in half (free). conquer: sort both.
// combine: merge, which is where the work is.
function mergeSort(arr) {
  if (arr.length <= 1) return arr;               // base case

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

// ---------- 3. Maximum subarray ----------
// T(n) = 2T(n/2) + O(n)  ->  Theta(n log n)
// The best slice is in the left half, the right half, or across the middle.
function maxSubarray(arr, low = 0, high = arr.length - 1) {
  if (low === high) return arr[low];             // base case

  const mid = low + Math.floor((high - low) / 2);

  const leftBest = maxSubarray(arr, low, mid);
  const rightBest = maxSubarray(arr, mid + 1, high);
  const crossBest = maxCrossing(arr, low, mid, high);

  return Math.max(leftBest, rightBest, crossBest);
}

// The crossing case cannot recurse, but one linear scan settles it.
function maxCrossing(arr, low, mid, high) {
  let sum = 0, leftSum = -Infinity;
  for (let i = mid; i >= low; i--) {
    sum += arr[i];
    if (sum > leftSum) leftSum = sum;
  }

  sum = 0;
  let rightSum = -Infinity;
  for (let i = mid + 1; i <= high; i++) {
    sum += arr[i];
    if (sum > rightSum) rightSum = sum;
  }

  return leftSum + rightSum;
}`,

  python: `# The divide-and-conquer template, then three algorithms that follow it.

# ---------- 1. Binary search ----------
# T(n) = T(n/2) + O(1)  ->  Theta(log n)
def binary_search(arr, target, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low > high:                          # base case
        return -1

    mid = low + (high - low) // 2
    if arr[mid] == target:
        return mid

    if arr[mid] < target:
        return binary_search(arr, target, mid + 1, high)
    return binary_search(arr, target, low, mid - 1)


# ---------- 2. Merge sort ----------
# T(n) = 2T(n/2) + O(n)  ->  Theta(n log n)
def merge_sort(arr):
    if len(arr) <= 1:                       # base case
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)


def merge(left, right):
    out = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    out.extend(left[i:])
    out.extend(right[j:])
    return out


# ---------- 3. Maximum subarray ----------
# T(n) = 2T(n/2) + O(n)  ->  Theta(n log n)
def max_subarray(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low == high:                         # base case
        return arr[low]

    mid = low + (high - low) // 2
    left_best = max_subarray(arr, low, mid)
    right_best = max_subarray(arr, mid + 1, high)
    cross_best = max_crossing(arr, low, mid, high)

    return max(left_best, right_best, cross_best)


def max_crossing(arr, low, mid, high):
    total, left_sum = 0, float('-inf')
    for i in range(mid, low - 1, -1):
        total += arr[i]
        left_sum = max(left_sum, total)

    total, right_sum = 0, float('-inf')
    for i in range(mid + 1, high + 1):
        total += arr[i]
        right_sum = max(right_sum, total)

    return left_sum + right_sum`,

  java: `// The divide-and-conquer template, then three algorithms that follow it.

public class DivideAndConquer {

    // ---------- 1. Binary search ----------
    // T(n) = T(n/2) + O(1)  ->  Theta(log n)
    public static int binarySearch(int[] arr, int target, int low, int high) {
        if (low > high) return -1;                  // base case

        int mid = low + (high - low) / 2;           // avoids overflow
        if (arr[mid] == target) return mid;

        return arr[mid] < target
            ? binarySearch(arr, target, mid + 1, high)
            : binarySearch(arr, target, low, mid - 1);
    }

    // ---------- 2. Merge sort ----------
    // T(n) = 2T(n/2) + O(n)  ->  Theta(n log n)
    public static void mergeSort(int[] arr, int low, int high) {
        if (low >= high) return;                    // base case

        int mid = low + (high - low) / 2;
        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }

    private static void merge(int[] arr, int low, int mid, int high) {
        int[] tmp = new int[high - low + 1];
        int i = low, j = mid + 1, k = 0;

        while (i <= mid && j <= high) {
            tmp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
        }
        while (i <= mid)  tmp[k++] = arr[i++];
        while (j <= high) tmp[k++] = arr[j++];

        System.arraycopy(tmp, 0, arr, low, tmp.length);
    }

    // ---------- 3. Maximum subarray ----------
    // T(n) = 2T(n/2) + O(n)  ->  Theta(n log n)
    public static int maxSubarray(int[] arr, int low, int high) {
        if (low == high) return arr[low];           // base case

        int mid = low + (high - low) / 2;
        int leftBest  = maxSubarray(arr, low, mid);
        int rightBest = maxSubarray(arr, mid + 1, high);
        int crossBest = maxCrossing(arr, low, mid, high);

        return Math.max(Math.max(leftBest, rightBest), crossBest);
    }

    private static int maxCrossing(int[] arr, int low, int mid, int high) {
        int sum = 0, leftSum = Integer.MIN_VALUE;
        for (int i = mid; i >= low; i--) {
            sum += arr[i];
            leftSum = Math.max(leftSum, sum);
        }

        sum = 0;
        int rightSum = Integer.MIN_VALUE;
        for (int i = mid + 1; i <= high; i++) {
            sum += arr[i];
            rightSum = Math.max(rightSum, sum);
        }

        return leftSum + rightSum;
    }
}`,

  c: `/* The divide-and-conquer template, then three algorithms that follow it. */
#include <stdio.h>
#include <limits.h>

/* ---------- 1. Binary search ----------
   T(n) = T(n/2) + O(1)  ->  Theta(log n) */
int binarySearch(int arr[], int target, int low, int high) {
    if (low > high) return -1;                  /* base case */

    int mid = low + (high - low) / 2;           /* avoids overflow */
    if (arr[mid] == target) return mid;

    if (arr[mid] < target)
        return binarySearch(arr, target, mid + 1, high);
    return binarySearch(arr, target, low, mid - 1);
}

/* ---------- 2. Merge sort ----------
   T(n) = 2T(n/2) + O(n)  ->  Theta(n log n) */
void merge(int arr[], int low, int mid, int high) {
    int tmp[high - low + 1];
    int i = low, j = mid + 1, k = 0;

    while (i <= mid && j <= high)
        tmp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
    while (i <= mid)  tmp[k++] = arr[i++];
    while (j <= high) tmp[k++] = arr[j++];

    for (i = 0; i < k; i++) arr[low + i] = tmp[i];
}

void mergeSort(int arr[], int low, int high) {
    if (low >= high) return;                    /* base case */

    int mid = low + (high - low) / 2;
    mergeSort(arr, low, mid);
    mergeSort(arr, mid + 1, high);
    merge(arr, low, mid, high);
}

/* ---------- 3. Maximum subarray ----------
   T(n) = 2T(n/2) + O(n)  ->  Theta(n log n) */
int maxCrossing(int arr[], int low, int mid, int high) {
    int sum = 0, leftSum = INT_MIN, i;
    for (i = mid; i >= low; i--) {
        sum += arr[i];
        if (sum > leftSum) leftSum = sum;
    }

    sum = 0;
    int rightSum = INT_MIN;
    for (i = mid + 1; i <= high; i++) {
        sum += arr[i];
        if (sum > rightSum) rightSum = sum;
    }

    return leftSum + rightSum;
}

int maxSubarray(int arr[], int low, int high) {
    if (low == high) return arr[low];           /* base case */

    int mid = low + (high - low) / 2;
    int leftBest  = maxSubarray(arr, low, mid);
    int rightBest = maxSubarray(arr, mid + 1, high);
    int crossBest = maxCrossing(arr, low, mid, high);

    int best = leftBest > rightBest ? leftBest : rightBest;
    return best > crossBest ? best : crossBest;
}`,

  cpp: `// The divide-and-conquer template, then three algorithms that follow it.
#include <bits/stdc++.h>
using namespace std;

// ---------- 1. Binary search ----------
// T(n) = T(n/2) + O(1)  ->  Theta(log n)
int binarySearch(const vector<int>& arr, int target, int low, int high) {
    if (low > high) return -1;                  // base case

    int mid = low + (high - low) / 2;           // avoids overflow
    if (arr[mid] == target) return mid;

    return arr[mid] < target
        ? binarySearch(arr, target, mid + 1, high)
        : binarySearch(arr, target, low, mid - 1);
}

// ---------- 2. Merge sort ----------
// T(n) = 2T(n/2) + O(n)  ->  Theta(n log n)
void merge(vector<int>& arr, int low, int mid, int high) {
    vector<int> tmp;
    tmp.reserve(high - low + 1);

    int i = low, j = mid + 1;
    while (i <= mid && j <= high)
        tmp.push_back(arr[i] <= arr[j] ? arr[i++] : arr[j++]);
    while (i <= mid)  tmp.push_back(arr[i++]);
    while (j <= high) tmp.push_back(arr[j++]);

    copy(tmp.begin(), tmp.end(), arr.begin() + low);
}

void mergeSort(vector<int>& arr, int low, int high) {
    if (low >= high) return;                    // base case

    int mid = low + (high - low) / 2;
    mergeSort(arr, low, mid);
    mergeSort(arr, mid + 1, high);
    merge(arr, low, mid, high);
}

// ---------- 3. Maximum subarray ----------
// T(n) = 2T(n/2) + O(n)  ->  Theta(n log n)
int maxCrossing(const vector<int>& arr, int low, int mid, int high) {
    int sum = 0, leftSum = INT_MIN;
    for (int i = mid; i >= low; i--) {
        sum += arr[i];
        leftSum = max(leftSum, sum);
    }

    sum = 0;
    int rightSum = INT_MIN;
    for (int i = mid + 1; i <= high; i++) {
        sum += arr[i];
        rightSum = max(rightSum, sum);
    }

    return leftSum + rightSum;
}

int maxSubarray(const vector<int>& arr, int low, int high) {
    if (low == high) return arr[low];           // base case

    int mid = low + (high - low) / 2;
    return max({ maxSubarray(arr, low, mid),
                 maxSubarray(arr, mid + 1, high),
                 maxCrossing(arr, low, mid, high) });
}`,
};

export default codeExamples;
