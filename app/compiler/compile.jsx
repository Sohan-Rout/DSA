"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { FiCode, FiX, FiPlay, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { loader } from '@monaco-editor/react';
import githubDark from 'monaco-themes/themes/GitHub Dark.json';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function FloatingCompiler() {
  const [selectedLanguage, setSelectedLanguage] = useState(50); // Default to C
  const [languageMode, setLanguageMode] = useState('c');
  const [code, setCode] = useState(`#include <stdio.h>\n\nint main() {\n  printf("Hello World!\\n");\n  return 0;\n}`);
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEditorDidMount = async (editor, monaco) => {
  monaco.editor.defineTheme('github-dark', githubDark);
  monaco.editor.setTheme('github-dark');
};

  const languages = [
    { id: 50, name: "C", mode: "c" },
    { id: 54, name: "C++", mode: "cpp" },
    { id: 62, name: "Java", mode: "java" },
    { id: 71, name: "Python", mode: "python" },
    { id: 63, name: "JavaScript", mode: "javascript" },
  ];

  useEffect(() => {
    const lang = languages.find(l => l.id === selectedLanguage);
    if (lang) setLanguageMode(lang.mode);
  }, [selectedLanguage]);

  const handleRun = async () => {
    setLoading(true);
    setOutput("Running...");
    setErrors([]);

    try {
      const response = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
        {
          source_code: code,
          language_id: selectedLanguage,
          stdin: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
        }
      );

      if (response.data.stderr) {
        setErrors(parseErrors(response.data.stderr));
      }
      setOutput(response.data.stdout || response.data.stderr || response.data.compile_output || "No output");
    } catch (error) {
      setOutput("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const parseErrors = (errorString) => {
    // Basic error parsing - can be enhanced for specific languages
    const errorLines = errorString.split('\n').filter(line => line.trim());
    return errorLines.map(line => ({
      message: line,
      lineNumber: line.match(/line (\d+)/)?.[1] || 0
    }));
  };

  const beautifyCode = () => {
    // Simple beautify logic - in a real app you might use a library
    setCode(prev => {
      // Basic indentation for C-like languages
      if ([50, 54, 62].includes(selectedLanguage)) {
        return prev.split('\n')
          .map(line => line.trim() === '}' ? '  ' + line : line)
          .join('\n');
      }
      return prev;
    });
  };

  return (
    <div>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bottom-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50 transition-all duration-300 flex items-center justify-center"
          style={{ width: '12', height: '12' }}
        >
          <FiCode size={24} />
        </button>
      )}
      {/* Floating Compiler Panel */}
        {isOpen && (
          <div
            className={`fixed rounded-lg right-0 bottom-0 ${isExpanded ? 'h-[calc(100vh-80px)] w-[40%]' : 'h-[calc(66vh-80px)] w-[30%]'} bg-white dark:bg-gray-800 shadow-xl border-l border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 flex flex-col`}
            style={{ marginTop: 20 }}
          >
            {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-black bg-gray-50 dark:bg-gray-900">
            <h2 className="font-semibold text-gray-800 dark:text-white">Code Compiler</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                title={isExpanded ? "Minimize" : "Maximize"}
              >
                {isExpanded ? <FiMinimize2 /> : <FiMaximize2 />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                title="Close"
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center p-2 space-x-2 bg-gray-50 dark:bg-zinc-900">
            <select
              className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 text-sm"
              onChange={(e) => setSelectedLanguage(Number(e.target.value))}
              value={selectedLanguage}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
            <button
              onClick={beautifyCode}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-sm"
            >
              Beautify
            </button>
            <button
              onClick={handleRun}
              disabled={loading}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm flex items-center disabled:opacity-50"
            >
              <FiPlay className="mr-1" size={14} />
              {loading ? "Running..." : "Run"}
            </button>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <MonacoEditor
              height="100%"
              language={languageMode}
              value={code}
              onChange={(value) => setCode(value)}
  onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                renderWhitespace: 'selection',
                tabSize: 2,
              }}
              onValidate={(markers) => {
                // Handle syntax errors
                setErrors(markers.map(marker => ({
                  lineNumber: marker.startLineNumber,
                  message: marker.message
                })));
              }}
            />
          </div>

          {/* Output/Errors Panel */}
          <div className="border-t border-gray-200 dark:border-gray-700 flex flex-col" style={{ height: '30%' }}>
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button className="px-4 py-2 text-sm font-medium border-b-2 border-blue-500 text-blue-600 dark:text-blue-400">
                Output
              </button>
              {errors.length > 0 && (
                <button className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400">
                  Errors ({errors.length})
                </button>
              )}
            </div>
            <div className="flex-1 overflow-auto p-3 bg-black text-white font-mono text-sm">
              {errors.length > 0 ? (
                <div className="space-y-2">
                  {errors.map((error, i) => (
                    <div key={i} className="text-red-400">
                      Line {error.lineNumber}: {error.message}
                    </div>
                  ))}
                </div>
              ) : (
                <pre className="whitespace-pre-wrap">{output || "Your output will appear here..."}</pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}