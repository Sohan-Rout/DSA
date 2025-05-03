'use client';
import { useState, useRef } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Light mode style
import 'highlight.js/styles/github-dark.css'; // Dark mode style

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
    javascript: `// Insertion Sort in JavaScript
function insertionSort(arr) {
  // Start from the second element (index 1)
  for (let i = 1; i < arr.length; i++) {
    // Current element to be inserted
    let current = arr[i];
    // Compare with the sorted portion
    let j = i - 1;
    
    // Shift elements greater than current to the right
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    // Insert the current element in correct position
    arr[j + 1] = current;
  }
  return arr;
}

// Usage example
const unsortedArray = [12, 11, 13, 5, 6];
console.log("Unsorted array:", unsortedArray);
const sortedArray = insertionSort(unsortedArray);
console.log("Sorted array:", sortedArray);`,

    python: `# Insertion Sort in Python
def insertion_sort(arr):
    # Start from the second element (index 1)
    for i in range(1, len(arr)):
        # Current element to be inserted
        current = arr[i]
        # Compare with the sorted portion
        j = i - 1
        
        # Shift elements greater than current to the right
        while j >= 0 and arr[j] > current:
            arr[j + 1] = arr[j]
            j -= 1
        # Insert the current element in correct position
        arr[j + 1] = current
    return arr

# Usage example
unsorted_array = [12, 11, 13, 5, 6]
print("Unsorted array:", unsorted_array)
sorted_array = insertion_sort(unsorted_array)
print("Sorted array:", sorted_array)`,

    java: `// Insertion Sort in Java
public class InsertionSort {
    public static void insertionSort(int[] arr) {
        // Start from the second element (index 1)
        for (int i = 1; i < arr.length; i++) {
            // Current element to be inserted
            int current = arr[i];
            // Compare with the sorted portion
            int j = i - 1;
            
            // Shift elements greater than current to the right
            while (j >= 0 && arr[j] > current) {
                arr[j + 1] = arr[j];
                j--;
            }
            // Insert the current element in correct position
            arr[j + 1] = current;
        }
    }

    public static void main(String[] args) {
        int[] unsortedArray = {12, 11, 13, 5, 6};
        System.out.print("Unsorted array: ");
        printArray(unsortedArray);
        
        insertionSort(unsortedArray);
        
        System.out.print("Sorted array: ");
        printArray(unsortedArray);
    }
    
    // Helper method to print array
    private static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,

    c: `// Insertion Sort in C
#include <stdio.h>

void insertionSort(int arr[], int n) {
    // Start from the second element (index 1)
    for (int i = 1; i < n; i++) {
        // Current element to be inserted
        int current = arr[i];
        // Compare with the sorted portion
        int j = i - 1;
        
        // Shift elements greater than current to the right
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        // Insert the current element in correct position
        arr[j + 1] = current;
    }
}

// Function to print an array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int unsortedArray[] = {12, 11, 13, 5, 6};
    int n = sizeof(unsortedArray) / sizeof(unsortedArray[0]);
    
    printf("Unsorted array: ");
    printArray(unsortedArray, n);
    
    insertionSort(unsortedArray, n);
    
    printf("Sorted array: ");
    printArray(unsortedArray, n);
    
    return 0;
}`,

    cpp: `// Insertion Sort in C++
#include <iostream>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
    // Start from the second element (index 1)
    for (int i = 1; i < arr.size(); i++) {
        // Current element to be inserted
        int current = arr[i];
        // Compare with the sorted portion
        int j = i - 1;
        
        // Shift elements greater than current to the right
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        // Insert the current element in correct position
        arr[j + 1] = current;
    }
}

// Function to print an array
void printArray(const vector<int>& arr) {
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;
}

int main() {
    vector<int> unsortedArray = {12, 11, 13, 5, 6};
    
    cout << "Unsorted array: ";
    printArray(unsortedArray);
    
    insertionSort(unsortedArray);
    
    cout << "Sorted array: ";
    printArray(unsortedArray);
    
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
            Insertion Sort Implementation
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