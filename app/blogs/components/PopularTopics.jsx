'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const PopularTopics = ({ tags, onTagClick }) => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <section className="mt-20 mb-5">
      <h2 className="text-3xl font-medium text-zinc-800 dark:text-white mb-2">
        Explore Popular Topics
      </h2>
      <div className='h-[2px] max-w-6xl rounded-full bg-gradient-to-l from-zinc-600 via-black to-zinc-600 mb-6'></div>
      <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
        <div className="relative w-full md:w-2/3">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 dark:text-zinc-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search articles..."
            onChange={(e) => onTagClick(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-500 transition w-full md:w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L16 12.414V19a1 1 0 01-.553.894l-4 2A1 1 0 0110 21v-8.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 justify-center mb-4">
          {tags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTagClick(tag)}
              className="px-5 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all"
            >
              #{tag}
            </motion.button>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularTopics;