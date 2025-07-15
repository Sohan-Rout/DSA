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
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const topRef = useRef(null);

  const languages = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
    { id: "c", name: "C" },
    { id: "cpp", name: "C++" },
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const codeExamples = {
    javascript: `class TreeTypes {
  static Full(capacity = 7) {
    const tree = Array.from({ length: capacity }, (_, i) => i + 1);
    console.log("Full Binary Tree (level):", tree.join(" "));
  }

  static Degenerate(count = 4) {
    const tree = Array.from({ length: count }, (_, i) => i + 1);
    console.log("Degenerate/Skewed (in-order):", tree.join(" -> "));
  }

  static Complete(count = 10) {
    const tree = Array.from({ length: count }, (_, i) => i + 1);
    console.log("Complete Binary Tree (level):", tree.join(" "));
  }
}

TreeTypes.Full(7);
TreeTypes.Degenerate(4);
TreeTypes.Complete(10);`,

    python: `class TreeTypes:
    @staticmethod
    def Full(capacity=7):
        tree = [i + 1 for i in range(capacity)]
        print("Full Binary Tree (level):", *tree)

    @staticmethod
    def Degenerate(count=4):
        tree = [i + 1 for i in range(count)]
        print("Degenerate/Skewed (in-order):", " -> ".join(map(str, tree)))

    @staticmethod
    def Complete(count=10):
        tree = [i + 1 for i in range(count)]
        print("Complete Binary Tree (level):", *tree)


if __name__ == "__main__":
    TreeTypes.Full(7)
    TreeTypes.Degenerate(4)
    TreeTypes.Complete(10)`,

    java: `public class TreeTypes {

    public static void Full(int capacity) {
        int[] tree = new int[capacity];
        for (int i = 0; i < capacity; i++) tree[i] = i + 1;
        System.out.print("Full Binary Tree (level):");
        for (int v : tree) System.out.print(" " + v);
        System.out.println();
    }

    public static void Degenerate(int count) {
        int[] tree = new int[count];
        for (int i = 0; i < count; i++) tree[i] = i + 1;
        System.out.print("Degenerate/Skewed (in-order):");
        for (int i = 0; i < count; i++) {
            System.out.print(i == 0 ? " " : " -> ");
            System.out.print(tree[i]);
        }
        System.out.println();
    }

    public static void Complete(int count) {
        int[] tree = new int[count];
        for (int i = 0; i < count; i++) tree[i] = i + 1;
        System.out.print("Complete Binary Tree (level):");
        for (int v : tree) System.out.print(" " + v);
        System.out.println();
    }

    public static void main(String[] args) {
        Full(7);
        Degenerate(4);
        Complete(10);
    }
}`,

    c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *tree;
    int size;
} TreeArray;

void Full(int capacity) {
    TreeArray t = { malloc(capacity * sizeof(int)), capacity };
    for (int i = 0; i < capacity; i++) t.tree[i] = i + 1;
    printf("Full Binary Tree (level):");
    for (int i = 0; i < capacity; i++) printf(" %d", t.tree[i]);
    printf("\n");
    free(t.tree);
}

void Degenerate(int count) {
    TreeArray t = { malloc(count * sizeof(int)), count };
    for (int i = 0; i < count; i++) t.tree[i] = i + 1;
    printf("Degenerate/Skewed (in-order):");
    for (int i = 0; i < count; i++) {
        printf(i ? " -> %d" : " %d", t.tree[i]);
    }
    printf("\n");
    free(t.tree);
}

void Complete(int count) {
    TreeArray t = { malloc(count * sizeof(int)), count };
    for (int i = 0; i < count; i++) t.tree[i] = i + 1;
    printf("Complete Binary Tree (level):");
    for (int i = 0; i < count; i++) printf(" %d", t.tree[i]);
    printf("\n");
    free(t.tree);
}

int main() {
    Full(7);
    Degenerate(4);
    Complete(10);
    return 0;
}`,

    cpp: `#include <iostream>
#include <vector>

class TreeTypes {
public:
    static void Full(int capacity = 7) {
        std::vector<int> tree(capacity);
        for (int i = 0; i < capacity; ++i) tree[i] = i + 1;
        std::cout << "Full Binary Tree (level):";
        for (int v : tree) std::cout << ' ' << v;
        std::cout << '\n';
    }

    static void Degenerate(int count = 4) {
        std::vector<int> tree(count);
        for (int i = 0; i < count; ++i) tree[i] = i + 1;
        std::cout << "Degenerate/Skewed (in-order):";
        for (int i = 0; i < count; ++i) {
            std::cout << (i ? " -> " : " ") << tree[i];
        }
        std::cout << '\n';
    }

    static void Complete(int count = 10) {
        std::vector<int> tree(count);
        for (int i = 0; i < count; ++i) tree[i] = i + 1;
        std::cout << "Complete Binary Tree (level):";
        for (int v : tree) std::cout << ' ' << v;
        std::cout << '\n';
    }
};

int main() {
    TreeTypes::Full(7);
    TreeTypes::Degenerate(4);
    TreeTypes::Complete(10);
    return 0;
}`,
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
              Binary tree types
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
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
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
                    __html: highlightCode(
                      codeExamples[selectedLanguage],
                      selectedLanguage
                    ),
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