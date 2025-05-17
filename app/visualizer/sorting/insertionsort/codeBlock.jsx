'use client';
import { useState, useRef } from 'react';
import { FaCopy, FaCheck, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';

export const highlightCode = (code, language) => {
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  return hljs.highlight(code, { language: validLanguage }).value;
};

const CodeBlock = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const topRef = useRef(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' }
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
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

  return (
    <div 
          className="max-w-4xl mx-auto"
          ref={topRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-2 sm:mb-0">
                <FaCode className="text-blue-500 mr-2 text-lg" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Insertion Sort Implementation
                </h3>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(codeExamples[selectedLanguage])}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors text-gray-800 dark:text-gray-100 text-sm font-medium"
                aria-label="Copy code"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center text-green-600 dark:text-green-400"
                    >
                      <FaCheck className="mr-1" /> Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <FaCopy className="mr-1" /> Copy Code
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
    
            {/* Language Selector */}
            <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
              {languages.map((lang) => (
                <motion.button
                  key={lang.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedLanguage === lang.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {lang.name}
                </motion.button>
              ))}
            </div>
    
            {/* Code Block */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLanguage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-x-auto p-4 bg-gray-900 text-white"
                >
                  <pre className="text-sm leading-relaxed">
                    <code 
                      className={`language-${selectedLanguage}`}
                      dangerouslySetInnerHTML={{ 
                        __html: highlightCode(codeExamples[selectedLanguage], selectedLanguage) 
                      }} 
                    />
                  </pre>
                </motion.div>
              </AnimatePresence>
    
              {/* Language indicator (shown on hover) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-3 right-3 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
                  >
                    {selectedLanguage.toUpperCase()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
  );
};

export default CodeBlock;