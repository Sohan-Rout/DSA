const codeExamples = {
  javascript: `// Sifts the node at index i down so it and its descendants satisfy the
// max-heap property, considering only the first heapSize elements.
function siftDown(arr, heapSize, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < heapSize && arr[left] > arr[largest]) largest = left;
  if (right < heapSize && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    siftDown(arr, heapSize, largest);
  }
}

function heapSort(arr) {
  const n = arr.length;

  // Phase 1: build a max-heap out of the whole array
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, n, i);
  }

  // Phase 2: repeatedly move the root (current max) to the end
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    siftDown(arr, end, 0); // heap shrinks by one each time
  }

  return arr;
}

// Usage example
heapSort([9, 5, 8, 2, 4, 7]); // [2, 4, 5, 7, 8, 9]`,

  python: `# Sifts the node at index i down so it and its descendants satisfy the
# max-heap property, considering only the first heap_size elements.
def sift_down(arr, heap_size, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < heap_size and arr[left] > arr[largest]:
        largest = left
    if right < heap_size and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        sift_down(arr, heap_size, largest)

def heap_sort(arr):
    n = len(arr)

    # Phase 1: build a max-heap out of the whole array
    for i in range(n // 2 - 1, -1, -1):
        sift_down(arr, n, i)

    # Phase 2: repeatedly move the root (current max) to the end
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        sift_down(arr, end, 0)  # heap shrinks by one each time

    return arr

# Usage example
heap_sort([9, 5, 8, 2, 4, 7])  # [2, 4, 5, 7, 8, 9]`,

  c: `#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Sifts the node at index i down so it and its descendants satisfy the
// max-heap property, considering only the first heapSize elements.
void siftDown(int arr[], int heapSize, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < heapSize && arr[left] > arr[largest]) largest = left;
    if (right < heapSize && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        siftDown(arr, heapSize, largest);
    }
}

void heapSort(int arr[], int n) {
    // Phase 1: build a max-heap out of the whole array
    for (int i = n / 2 - 1; i >= 0; i--) {
        siftDown(arr, n, i);
    }

    // Phase 2: repeatedly move the root (current max) to the end
    for (int end = n - 1; end > 0; end--) {
        swap(&arr[0], &arr[end]);
        siftDown(arr, end, 0); // heap shrinks by one each time
    }
}

int main() {
    int arr[] = {9, 5, 8, 2, 4, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    heapSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,

  java: `public class HeapSort {

    // Sifts the node at index i down so it and its descendants satisfy the
    // max-heap property, considering only the first heapSize elements.
    static void siftDown(int[] arr, int heapSize, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < heapSize && arr[left] > arr[largest]) largest = left;
        if (right < heapSize && arr[right] > arr[largest]) largest = right;

        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            siftDown(arr, heapSize, largest);
        }
    }

    static void heapSort(int[] arr) {
        int n = arr.length;

        // Phase 1: build a max-heap out of the whole array
        for (int i = n / 2 - 1; i >= 0; i--) {
            siftDown(arr, n, i);
        }

        // Phase 2: repeatedly move the root (current max) to the end
        for (int end = n - 1; end > 0; end--) {
            int temp = arr[0];
            arr[0] = arr[end];
            arr[end] = temp;
            siftDown(arr, end, 0); // heap shrinks by one each time
        }
    }

    public static void main(String[] args) {
        int[] arr = {9, 5, 8, 2, 4, 7};
        heapSort(arr);
        for (int v : arr) System.out.print(v + " ");
    }
}`,
};

export default codeExamples;
