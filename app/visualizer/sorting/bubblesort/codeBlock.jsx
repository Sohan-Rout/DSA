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
    javascript: `// Bubble Sort in JavaScript
function bubbleSort(arr) {
  let n = arr.length;
  
  // Outer loop for passes
  for (let i = 0; i < n - 1; i++) {
    // Inner loop for comparisons
    for (let j = 0; j < n - i - 1; j++) {
      // Swap if current element is greater than next
      if (arr[j] > arr[j + 1]) {
        // ES6 destructuring assignment for swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Usage example
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Unsorted array:", unsortedArray);
const sortedArray = bubbleSort(unsortedArray);
console.log("Sorted array:", sortedArray);`,

    python: `# Bubble Sort in Python
def bubble_sort(arr):
    n = len(arr)
    
    # Outer loop for passes
    for i in range(n - 1):
        # Inner loop for comparisons
        for j in range(n - i - 1):
            # Swap if current element is greater than next
            if arr[j] > arr[j + 1]:
                # Python tuple unpacking for swap
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Usage example
unsorted_array = [64, 34, 25, 12, 22, 11, 90]
print("Unsorted array:", unsorted_array)
sorted_array = bubble_sort(unsorted_array)
print("Sorted array:", sorted_array)`,

    java: `// Bubble Sort in Java
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        // Outer loop for passes
        for (int i = 0; i < n - 1; i++) {
            // Inner loop for comparisons
            for (int j = 0; j < n - i - 1; j++) {
                // Swap if current element is greater than next
                if (arr[j] > arr[j + 1]) {
                    // Traditional swap using temp variable
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] unsortedArray = {64, 34, 25, 12, 22, 11, 90};
        System.out.print("Unsorted array: ");
        printArray(unsortedArray);
        
        bubbleSort(unsortedArray);
        
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

    c: `// Bubble Sort in C
#include <stdio.h>

void bubbleSort(int arr[], int n) {
    // Outer loop for passes
    for (int i = 0; i < n - 1; i++) {
        // Inner loop for comparisons
        for (int j = 0; j < n - i - 1; j++) {
            // Swap if current element is greater than next
            if (arr[j] > arr[j + 1]) {
                // Traditional swap using temp variable
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
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
    int unsortedArray[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(unsortedArray) / sizeof(unsortedArray[0]);
    
    printf("Unsorted array: ");
    printArray(unsortedArray, n);
    
    bubbleSort(unsortedArray, n);
    
    printf("Sorted array: ");
    printArray(unsortedArray, n);
    
    return 0;
}`,

    cpp: `// Bubble Sort in C++
#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    
    // Outer loop for passes
    for (int i = 0; i < n - 1; i++) {
        // Inner loop for comparisons
        for (int j = 0; j < n - i - 1; j++) {
            // Swap if current element is greater than next
            if (arr[j] > arr[j + 1]) {
                // Using std::swap for cleaner code
                swap(arr[j], arr[j + 1]);
            }
        }
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
    vector<int> unsortedArray = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Unsorted array: ";
    printArray(unsortedArray);
    
    bubbleSort(unsortedArray);
    
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
            Bubble Sort Implementation
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