'use client';
import { motion } from 'framer-motion';

const PopularTopics = ({ tags, onTagClick }) => {
  return (
    <section className="mt-20 mb-5">
      <h2 className="text-3xl font-medium text-zinc-800 dark:text-white mb-2">
        Explore Popular Topics
      </h2>
      <div className='h-[2px] max-w-6xl rounded-full bg-gradient-to-l from-zinc-600 via-black to-zinc-600 mb-6'></div>
      <div className="mb-6 max-w-md mx-auto relative">
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
      <div className="flex flex-wrap items-center gap-3 justify-center">
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
    </section>
  );
};

export default PopularTopics;