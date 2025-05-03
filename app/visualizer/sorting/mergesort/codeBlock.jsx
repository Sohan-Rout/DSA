'use client';
import { useState, useRef } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';

export const highlightCode = (code, language) => {
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  return hljs.highlight(code, { language: validLanguage }).value;
};

const Content = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const topRef = useRef(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExamples = {
    javascript: `// Merge Sort in JavaScript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex++]);
    } else {
      result.push(right[rightIndex++]);
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Usage
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log("Original:", arr);
console.log("Sorted:", mergeSort(arr));`,

    python: `# Merge Sort in Python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    left_idx, right_idx = 0, 0
    
    while left_idx < len(left) and right_idx < len(right):
        if left[left_idx] < right[right_idx]:
            result.append(left[left_idx])
            left_idx += 1
        else:
            result.append(right[right_idx])
            right_idx += 1
    
    result.extend(left[left_idx:])
    result.extend(right[right_idx:])
    return result

# Usage
arr = [38, 27, 43, 3, 9, 82, 10]
print("Original:", arr)
print("Sorted:", merge_sort(arr))`,

    java: `// Merge Sort in Java
public class MergeSort {
    public static void mergeSort(int[] arr) {
        if (arr.length <= 1) return;
        
        int mid = arr.length / 2;
        int[] left = new int[mid];
        int[] right = new int[arr.length - mid];
        
        System.arraycopy(arr, 0, left, 0, mid);
        System.arraycopy(arr, mid, right, 0, arr.length - mid);
        
        mergeSort(left);
        mergeSort(right);
        merge(arr, left, right);
    }
    
    private static void merge(int[] arr, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;
        
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }
        
        while (i < left.length) {
            arr[k++] = left[i++];
        }
        
        while (j < right.length) {
            arr[k++] = right[j++];
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        System.out.print("Original: ");
        printArray(arr);
        
        mergeSort(arr);
        
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

    c: `// Merge Sort in C
#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;
    
    int L[n1], R[n2];
    
    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
    
    i = 0; j = 0; k = l;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int size = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original: ");
    printArray(arr, size);
    
    mergeSort(arr, 0, size - 1);
    
    printf("Sorted: ");
    printArray(arr, size);
    
    return 0;
}`,

    cpp: `// Merge Sort in C++
#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
    
    int i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void printArray(const vector<int>& arr) {
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;
}

int main() {
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    
    cout << "Original: ";
    printArray(arr);
    
    mergeSort(arr, 0, arr.size() - 1);
    
    cout << "Sorted: ";
    printArray(arr);
    
    return 0;
}`
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto" ref={topRef}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Merge Sort Implementation
          </h3>
          <button
            onClick={() => copyToClipboard(codeExamples[selectedLanguage])}
            className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <FaCheck className="text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FaCopy />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedLanguage === lang.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto transition-colors duration-300">
          <pre className="text-sm">
            <code 
              className={`language-${selectedLanguage}`}
              dangerouslySetInnerHTML={{ 
                __html: highlightCode(codeExamples[selectedLanguage], selectedLanguage) 
              }} 
            />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Content;