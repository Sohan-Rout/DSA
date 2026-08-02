const codeExamples = {
    javascript: `// Selection Sort in JavaScript
function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap the found minimum with the first element
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

// Usage
const arr = [64, 25, 12, 22, 11];
console.log("Original:", arr);
console.log("Sorted:", selectionSort([...arr]));`,

    python: `# Selection Sort in Python
def selection_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        # Find the minimum element in unsorted array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
                
        # Swap the found minimum with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Usage
arr = [64, 25, 12, 22, 11]
print("Original:", arr)
print("Sorted:", selection_sort(arr.copy()))`,

    java: `// Selection Sort in Java
public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in unsorted array
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            
            // Swap the found minimum with the first element
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        System.out.print("Original: ");
        printArray(arr);
        
        selectionSort(arr);
        
        System.out.print("Sorted: ");
        printArray(arr);
    }
    
    private static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,

    c: `// Selection Sort in C
#include <stdio.h>

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap the found minimum with the first element
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original: ");
    printArray(arr, n);
    
    selectionSort(arr, n);
    
    printf("Sorted: ");
    printArray(arr, n);
    
    return 0;
}`,

    cpp: `// Selection Sort in C++
#include <iostream>
#include <vector>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap the found minimum with the first element
        swap(arr[i], arr[minIdx]);
    }
}

void printArray(const vector<int>& arr) {
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    
    cout << "Original: ";
    printArray(arr);
    
    selectionSort(arr);
    
    cout << "Sorted: ";
    printArray(arr);
    
    return 0;
}`
  };

export default codeExamples;
