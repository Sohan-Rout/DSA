"use client";
import { useState } from 'react';
import { FiSearch, FiFilter, FiChevronDown, FiExternalLink, FiCode } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const DsaPracticePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Curated list of pattern-based problems
  const problems = [
    // Array Patterns
    { id: 1, title: "Two Sum", difficulty: "easy", topic: "array", pattern: "Two Pointers" },
    { id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "easy", topic: "array", pattern: "Sliding Window" },
    { id: 3, title: "Contains Duplicate", difficulty: "easy", topic: "array", pattern: "Hash Set" },
    { id: 4, title: "Product of Array Except Self", difficulty: "medium", topic: "array", pattern: "Prefix Sum" },
    { id: 5, title: "Maximum Subarray", difficulty: "medium", topic: "array", pattern: "Kadane's Algorithm" },
    { id: 6, title: "3Sum", difficulty: "medium", topic: "array", pattern: "Two Pointers" },
    { id: 7, title: "Merge Intervals", difficulty: "medium", topic: "array", pattern: "Merge Intervals" },
    { id: 8, title: "Find Minimum in Rotated Sorted Array", difficulty: "medium", topic: "array", pattern: "Binary Search" },
    
    // Linked List Patterns
    { id: 9, title: "Reverse Linked List", difficulty: "easy", topic: "linked-list", pattern: "In-place Reversal" },
    { id: 10, title: "Merge Two Sorted Lists", difficulty: "easy", topic: "linked-list", pattern: "Merge Lists" },
    { id: 11, title: "Linked List Cycle", difficulty: "easy", topic: "linked-list", pattern: "Fast & Slow Pointers" },
    { id: 12, title: "Remove Nth Node From End of List", difficulty: "medium", topic: "linked-list", pattern: "Two Pointers" },
    
    // Tree Patterns
    { id: 13, title: "Invert Binary Tree", difficulty: "easy", topic: "tree", pattern: "Tree Traversal" },
    { id: 14, title: "Maximum Depth of Binary Tree", difficulty: "easy", topic: "tree", pattern: "Tree Traversal" },
    { id: 15, title: "Validate Binary Search Tree", difficulty: "medium", topic: "tree", pattern: "BST Validation" },
    { id: 16, title: "Binary Tree Level Order Traversal", difficulty: "medium", topic: "tree", pattern: "BFS" },
    
    // Graph Patterns
    { id: 17, title: "Number of Islands", difficulty: "medium", topic: "graph", pattern: "DFS" },
    { id: 18, title: "Clone Graph", difficulty: "medium", topic: "graph", pattern: "BFS" },
    { id: 19, title: "Course Schedule", difficulty: "medium", topic: "graph", pattern: "Topological Sort" },
    
    // Dynamic Programming Patterns
    { id: 20, title: "Climbing Stairs", difficulty: "easy", topic: "dp", pattern: "1D DP" },
    { id: 21, title: "House Robber", difficulty: "medium", topic: "dp", pattern: "1D DP" },
    { id: 22, title: "Longest Increasing Subsequence", difficulty: "medium", topic: "dp", pattern: "1D DP" },
    { id: 23, title: "Coin Change", difficulty: "medium", topic: "dp", pattern: "Unbounded Knapsack" },
    
    // Miscellaneous Patterns
    { id: 24, title: "Merge k Sorted Lists", difficulty: "hard", topic: "heap", pattern: "Merge K Sorted" },
    { id: 25, title: "Find Median from Data Stream", difficulty: "hard", topic: "heap", pattern: "Two Heaps" },
  ];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         problem.pattern.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === 'all' || problem.topic === topicFilter;
    
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getTopicColor = (topic) => {
    switch (topic) {
      case 'array': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'linked-list': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'tree': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'graph': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'dp': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'heap': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const navigateToProblem = (id) => {
    router.push(`/problems/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-zinc-950 dark:to-black p-6">
      <div className="max-w-6xl mx-auto mt-10 pt-10">
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
            placeholder="Search problems or patterns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Difficulty Filter */}
          <div className="relative">
            <button
              onClick={() => setShowDifficultyDropdown(!showDifficultyDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              <FiFilter />
              <span>{difficultyFilter === 'all' ? 'All Difficulties' : difficultyFilter}</span>
              <FiChevronDown />
            </button>
            {showDifficultyDropdown && (
              <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-gray-200 dark:border-zinc-700">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setDifficultyFilter('all');
                      setShowDifficultyDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    All Difficulties
                  </button>
                  <button
                    onClick={() => {
                      setDifficultyFilter('easy');
                      setShowDifficultyDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => {
                      setDifficultyFilter('medium');
                      setShowDifficultyDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => {
                      setDifficultyFilter('hard');
                      setShowDifficultyDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    Hard
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Topic Filter */}
          <div className="relative">
            <button
              onClick={() => setShowTopicDropdown(!showTopicDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              <FiFilter />
              <span>{topicFilter === 'all' ? 'All Topics' : topicFilter.replace('-', ' ')}</span>
              <FiChevronDown />
            </button>
            {showTopicDropdown && (
              <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-gray-200 dark:border-zinc-700">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setTopicFilter('all');
                      setShowTopicDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    All Topics
                  </button>
                  <button
                    onClick={() => {
                      setTopicFilter('array');
                      setShowTopicDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    Array
                  </button>
                  <button
                    onClick={() => {
                      setTopicFilter('linked-list');
                      setShowTopicDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    Linked List
                  </button>
                  <button
                    onClick={() => {
                      setTopicFilter('tree');
                      setShowTopicDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    Tree
                  </button>
                  <button
                    onClick={() => {
                      setTopicFilter('graph');
                      setShowTopicDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    Graph
                  </button>
                  <button
                    onClick={() => {
                      setTopicFilter('dp');
                      setShowTopicDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    Dynamic Programming
                  </button>
                  <button
                    onClick={() => {
                      setTopicFilter('heap');
                      setShowTopicDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                  >
                    Heap
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Test Your Own Code Button */}
          <button
            onClick={() => router.push('/playground')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FiCode />
            <span>PlayGround</span>
          </button>
        </div>
        
        {/* Problems List */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-100 dark:bg-zinc-700 p-4 font-medium text-gray-700 dark:text-white">
            <div className="col-span-6">Problem</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Topic</div>
            <div className="col-span-2">Pattern</div>
          </div>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <div 
                key={problem.id} 
                className="grid grid-cols-12 p-4 border-b border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer"
                onClick={() => navigateToProblem(problem.id)}
              >
                <div className="col-span-6 font-medium dark:text-white">
                  <div className="flex items-center">
                    {problem.title}
                    <FiExternalLink className="ml-2 text-sm opacity-70" />
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTopicColor(problem.topic)}`}>
                    {problem.topic.replace('-', ' ')}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-gray-600 dark:text-gray-300">
                  {problem.pattern}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No problems found matching your filters. Try adjusting your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DsaPracticePage;