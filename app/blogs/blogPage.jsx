'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiSearch, FiChevronRight, FiClock, FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const BlogPage = () => {
  const blogData = [
    {
      id: 1,
      title: "Is Data Structures and Algorithms Important for Web Developers?",
      excerpt: "Explore why understanding data structures and algorithms can help web developers write efficient, scalable, and maintainable code.",
      date: "May 17, 2025",
      readTime: "8 min read",
      slug: "/blogs/Content/dsaWebDev",
      category: "Web Development",
      tags: ["DSA", "Web Development", "Algorithms"],
      image: "/blog/dsaWebDev.png"
    },
    {
      id: 2,
      title: "Are Data Structures and Algorithms Different for Different Languages?",
      excerpt: "Explore the differences in data structures and algorithms across various programming languages and how it impacts implementation.",
      date: "May 19, 2025",
      readTime: "5 min read",
      slug: "/blogs/Content/dsaDifferent",
      category: "Programming Languages",
      tags: ["DSA", "Programming Languages", "Algorithms"],
      image: "/blog/dsaDifferent.png"
    },
    {
      id: 3,
      title: "What Are Data Structures? A Beginner-Friendly Guide",
      excerpt: "Confused by terms like arrays, stacks, or linked lists? This guide breaks down data structures in a simple, relatable way. Understand what they are, why they matter, and how they form the backbone of every efficient program.",
      date: "May 23, 2025",
      readTime: "10 min read",
      slug: "/blogs/Content/whatIsDS",
      category: "Computer Science Fundamentals ",
      tags: ["Data Structures", "DSA", "Algorithms", "Beginner Programming"],
      image: "/blog/whatIsDS.png"
    },
  ];

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Filtered blogs
  const filteredBlogs = blogData.filter(blog => {
    const matchesSearch = searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Categories
  const categories = ['All', ...new Set(blogData.map(blog => blog.category))];

  // Featured posts (first 3)
  const featuredPosts = blogData.slice(0, 3);

  // Popular tags
  const popularTags = ['React', 'JavaScript', 'CSS', 'TypeScript', 'Web Dev', 'Performance', 'DSA'];

  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-zinc-800 dark:text-white mb-6 leading-tight"
          >
            Insights for <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Modern Developers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-10"
          >
            Cutting-edge tutorials, guides, and deep dives on web development, programming, and more.
          </motion.p>
          
          {/* Animated Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            ref={searchRef}
            className={`relative max-w-2xl mx-auto transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search articles, topics, guides..."
                className="w-full p-4 pl-12 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-xl" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>

            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="p-2 text-sm text-zinc-500 border-b border-zinc-100 dark:border-zinc-700">
                    Recent searches
                  </div>
                  {['React Hooks', 'CSS Grid', 'TypeScript'].map((term, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSearchQuery(term);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-3 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors flex items-center"
                    >
                      <FiSearch className="mr-3 text-zinc-400" />
                      {term}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Featured Posts */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">Featured Articles</h2>
            <Link href="#" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              View all <FiChevronRight className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-700/50"
              >
                <Link href={post.slug}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                      <FiCalendar className="mr-1.5" />
                      <span className="mr-3">{post.date}</span>
                      <FiClock className="mr-1.5" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2.5 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-zinc-700 dark:text-zinc-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg'
                    : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {category} {category !== 'All' && `(${blogData.filter(b => b.category === category).length})`}
              </button>
            ))}
          </div>
        </section>

        {/* Articles List */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-8">
            {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
            <span className="text-zinc-500 dark:text-zinc-400 text-base font-normal ml-2">
              ({filteredBlogs.length} articles)
            </span>
          </h2>

          <div className="space-y-8">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((post) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <Link href={post.slug}>
                    <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-zinc-100 dark:border-zinc-700/50">
                      <div className="md:w-1/3">
                        <div className="aspect-video overflow-hidden rounded-xl relative">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center mb-3">
                          <span className="text-xs font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                            {post.category}
                          </span>
                          <span className="mx-2 text-zinc-300 dark:text-zinc-600">•</span>
                          <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                            <FiCalendar className="mr-1.5" /> {post.date}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag, i) => (
                              <span 
                                key={i}
                                className="text-xs px-2.5 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-zinc-700 dark:text-zinc-300"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
                            Read article <FiArrowRight className="ml-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  No articles found
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto">
                  We couldn't find any articles matching your search. Try a different term or browse our categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Popular Tags */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-6">
            Explore Popular Topics
          </h2>
          <div className="flex flex-wrap gap-3">
            {popularTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery(tag);
                  setActiveCategory('All');
                }}
                className="px-5 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all"
              >
                #{tag}
              </motion.button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;