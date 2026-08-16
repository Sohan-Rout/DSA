"use client";
import { useState } from "react";
import { FaCopy, FaCheck, FaCode } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
// Import the core only + the 5 languages we actually ship. The default
// "highlight.js" entry point bundles ~190 grammars (~900 KiB).
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);

const LANGUAGE_NAMES = {
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
  c: "C",
  cpp: "C++",
};

const escapeHtml = (code) =>
  code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export const highlightCode = (code, language) => {
  // Core-only build has no "plaintext" grammar, so fall back to escaped text.
  if (!hljs.getLanguage(language)) return escapeHtml(code);
  return hljs.highlight(code, { language }).value;
};

const CodeBlock = ({ title, codeExamples }) => {
  const languageIds = Object.keys(codeExamples);
  const [selectedLanguage, setSelectedLanguage] = useState(languageIds[0]);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto"
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
              {title}
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
          {languageIds.map((id) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedLanguage(id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedLanguage === id
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {LANGUAGE_NAMES[id] || id}
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
