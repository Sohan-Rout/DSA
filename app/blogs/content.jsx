'use client';
import { FiCopy, FiBookmark, FiShare2 } from 'react-icons/fi';
import { useState } from 'react';

const BlogContent = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      {/* Article Header */}
      <header className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-black text-white dark:bg-zinc-700 dark:text-zinc-200">
            Data Structures
          </span>
          <div className="flex space-x-3 text-gray-500 dark:text-zinc-400">
            <button 
              onClick={handleCopy}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Copy link"
            >
              {copied ? <span className="text-xs">Copied!</span> : <FiCopy />}
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" 
              aria-label="Bookmark"
            >
              <FiBookmark />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" 
              aria-label="Share"
            >
              <FiShare2 />
            </button>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-zinc-100 mb-4 leading-tight">
          How to Study Data Structures & Algorithms Effectively in 2025
        </h1>
        
        <div className="flex items-center text-gray-500 dark:text-zinc-400 text-sm">
          <span>Published on May 17, 2025</span>
          <span className="mx-2">•</span>
          <span>7 min read</span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative w-full h-64 md:h-96 bg-gray-100 dark:bg-zinc-800 rounded-xl mb-12 overflow-hidden">
        <img 
          src='/DSA.png' 
          alt="Data Structures and Algorithms visualization"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-30 dark:opacity-50"></div>
        <div className="absolute bottom-6 left-6 text-white dark:text-zinc-100">
          <p className="text-sm">Visualization tools help understand complex DSA concepts</p>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="text-xl text-gray-700 dark:text-zinc-300 leading-relaxed mb-8">
          Data Structures and Algorithms (DSA) form the computational foundation of modern software development. 
          In 2025, with AI-assisted coding becoming prevalent, understanding core DSA principles is more valuable than ever 
          for making architectural decisions and optimizing solutions.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-100 mb-6 pb-2 border-b border-gray-200 dark:border-zinc-700">
            1. Master the Fundamentals Through Visualization
          </h2>
          <p className="mb-4 dark:text-zinc-300">
            Begin with core structures: arrays, hash tables, trees (binary, AVL, Red-Black), and graphs. Modern tools like:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 dark:text-zinc-300">
            <li><strong className="dark:text-zinc-100">DSA Visualizer</strong></li>
            <li><strong className="dark:text-zinc-100">AlgoViz</strong> (real-time code visualization)</li>
            <li><strong className="dark:text-zinc-100">Neo4j Bloom</strong> (for graph algorithms)</li>
          </ul>
          <p className="dark:text-zinc-300">
            These tools provide immediate feedback on how operations affect memory and time complexity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-100 mb-6 pb-2 border-b border-gray-200 dark:border-zinc-700">
            2. Implement in Multiple Languages
          </h2>
          <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg mb-4">
            <p className="mb-2 font-medium dark:text-zinc-200">Try implementing each structure in:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['TypeScript', 'Rust', 'Python', 'Go'].map((lang) => (
                <span 
                  key={lang} 
                  className="px-3 py-1 bg-white dark:bg-zinc-700 rounded-full text-sm text-center shadow-sm dark:text-zinc-200"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <p className="dark:text-zinc-300">
            Comparing implementations reveals language-specific optimizations and tradeoffs.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-100 mb-6 pb-2 border-b border-gray-200 dark:border-zinc-700">
            3. Modern Practice Platforms
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {[
              { name: 'LeetCode', feature: 'AI-assisted hints' },
              { name: 'CodeSignal', feature: 'Virtual whiteboard' },
              { name: 'AlgoExpert', feature: 'Video solutions' }
            ].map((platform) => (
              <div 
                key={platform.name} 
                className="border dark:border-zinc-700 p-4 rounded-lg hover:shadow-md dark:hover:shadow-zinc-700/30 transition-shadow"
              >
                <h3 className="font-bold mb-1 dark:text-zinc-100">{platform.name}</h3>
                <p className="text-sm text-gray-600 dark:text-zinc-400">{platform.feature}</p>
              </div>
            ))}
          </div>
          <p className="dark:text-zinc-300">
            Focus on pattern recognition - most interview problems are variations of 15-20 core patterns.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-100 mb-6 pb-2 border-b border-gray-200 dark:border-zinc-700">
            4. Build Practical Applications
          </h2>
          <p className="mb-4 dark:text-zinc-300">
            Modern DSA applications include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 dark:text-zinc-300">
            <li>Real-time collaborative editors (operational transforms)</li>
            <li>Blockchain (Merkle trees)</li>
            <li>Recommendation systems (graph algorithms)</li>
          </ul>
          <p className="dark:text-zinc-300">
            These projects demonstrate applied DSA knowledge beyond academic exercises.
          </p>
        </section>

        <section className="bg-black dark:bg-zinc-800 text-white dark:text-zinc-100 p-8 rounded-xl mb-12">
          <h3 className="text-xl font-bold mb-4">Pro Tip: Spaced Repetition</h3>
          <p className="mb-2">
            Use tools like Anki or RemNote to schedule algorithm reviews at optimal intervals:
          </p>
          <ul className="list-disc pl-6 opacity-90">
            <li>First review: 1 day after learning</li>
            <li>Second review: 3 days later</li>
            <li>Third review: 1 week later</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black dark:text-zinc-100 mb-4">Conclusion</h2>
          <p className="text-lg dark:text-zinc-300">
            In 2025, DSA mastery means understanding both classical computer science and modern applications. 
            Combine visualization tools, multi-language implementation, pattern recognition, and practical projects 
            to build deep, lasting knowledge that stands out in technical interviews and real-world development.
          </p>
        </section>
      </div>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-zinc-700">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-black dark:text-zinc-100 mb-2">Share this article</h3>
            <div className="flex space-x-3">
              {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                <button 
                  key={social}
                  className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors dark:border-zinc-600 dark:text-zinc-300"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogContent;