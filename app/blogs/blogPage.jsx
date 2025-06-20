"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiChevronRight,
  FiClock,
  FiCalendar,
  FiTag,
  FiArrowRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import PopularTopics from "@/app/blogs/components/PopularTopics";
import blogData from "@/app/blogs/data/blogs.json";

const BlogPage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Filtered blogs
  const filteredBlogs = blogData.filter((blog) => {
    const matchesSearch =
      searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      activeCategory === "All" || blog.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Categories
  const categories = ["All", ...new Set(blogData.map((blog) => blog.category))];

  // Featured posts (latest 3 by date)
  const featuredPosts = [...blogData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Popular tags
  const popularTags = [
    "React",
    "JavaScript",
    "CSS",
    "TypeScript",
    "Web Dev",
    "Performance",
    "DSA",
  ];

  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <main className="container mx-auto max-w-6xl px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl mt-10 md:text-5xl font-bold text-zinc-800 dark:text-white mb-6 leading-tight"
          >
            Insights for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Modern Developers
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-10"
          >
            Cutting-edge tutorials, guides, and deep dives on web development,
            programming, and more.
          </motion.p>

          {/* Email Subscribe Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center gap-1 shadow-lg">
              <input
                type="email"
                placeholder="Enter your email to subscribe..."
                className="flex-1 w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg text-md font-medium hover:opacity-90 transition"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-2">
              By clicking "Subscribe", you agree to receive updates when new blogs are published.
            </p>
          </motion.div>
        </section>

        {/* Featured Posts */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-medium text-zinc-800 dark:text-white">
              Featured Articles
            </h2>
          </div>
          <div className="h-[2px] max-w-6xl rounded-full bg-gradient-to-l from-zinc-600 via-black to-zinc-600 mb-4"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left column: recent upload (big card) - vertical layout */}
            <motion.div
              key={featuredPosts[0].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="lg:col-span-6 bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-700/50"
            >
              <Link href={featuredPosts[0].slug}>
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={featuredPosts[0].image}
                    alt={featuredPosts[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {featuredPosts[0].category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                    <FiCalendar className="mr-1.5" />
                    <span className="mr-3">{featuredPosts[0].date}</span>
                    <FiClock className="mr-1.5" />
                    <span>{featuredPosts[0].readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-800 dark:text-white mb-3">
                    {featuredPosts[0].title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-3">
                    {featuredPosts[0].excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featuredPosts[0].tags.map((tag, i) => (
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

            {/* Right column: next 2 featured cards in vertical list-style layout */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {featuredPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex gap-4 items-start bg-white dark:bg-zinc-800 rounded-xl p-4 shadow hover:shadow-md transition-shadow border border-zinc-100 dark:border-zinc-700/50"
                >
                  <div className="w-32 h-24 overflow-hidden rounded-md">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                      <FiCalendar className="mr-1.5" />
                      <span className="mr-3">{post.date}</span>
                      <FiClock className="mr-1.5" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-1">
                      <Link href={post.slug}>{post.title}</Link>
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tags */}
        <PopularTopics
          tags={popularTags}
          onTagClick={(tag) => {
            setSearchQuery(tag);
            setActiveCategory("All");
          }}
        />

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
                    : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"
                }`}
              >
                {category}{" "}
                {category !== "All" &&
                  `(${blogData.filter((b) => b.category === category).length})`}
              </button>
            ))}
          </div>
        </section>

        {/* Articles List */}
        <section>
          <h2 className="text-2xl font-medium text-zinc-800 dark:text-white mb-8">
            {activeCategory === "All" ? "All Blog Posts" : activeCategory}
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
                          <span className="mx-2 text-zinc-300 dark:text-zinc-600">
                            •
                          </span>
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
                  We couldn't find any articles matching your search. Try a
                  different term or browse our categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;
