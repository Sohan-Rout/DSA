"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { motion, MotionConfig } from "framer-motion";
import PopularTopics from "@/app/blogs/components/PopularTopics";
import blogData from "@/app/blogs/data/blogs.json";

const BlogPage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filtered blogs, newest first so a new post lands at the top
  const filteredBlogs = [...blogData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((blog) => {
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

  // Popular tags, taken from the posts themselves so every chip returns results
  const popularTags = [...new Set(blogData.flatMap((blog) => blog.tags))];

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <main className="container mx-auto max-w-6xl px-6 pt-28 sm:pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              The DSA Visualizer Blog
            </p>
            <h1 className="mb-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-zinc-900 dark:text-white text-balance">
              Practical writing for people who build software
            </h1>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Guides, explainers and honest answers on programming, web
              development, computer science and the rest of the stack.
            </p>
          </motion.div>

          {/* Email Subscribe Section — hidden until the mailing list backend
              exists. The form has no submit handler yet, so re-enable this
              only once there is somewhere for the address to go. */}
          {/*
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row rounded-full bg-none items-center gap-1">
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
          */}
        </section>

        {/* Popular Tags */}
        <PopularTopics
          tags={popularTags}
          value={searchQuery}
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
                    ? "bg-linear-to-r from-blue-600 to-blue-400 text-white shadow-lg"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -3 }}
                  className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow hover:shadow-md transition-shadow border border-zinc-100 dark:border-zinc-700/50"
                >
                  <Link href={post.slug}>
                    <div className="flex flex-col h-full">
                      <div className="aspect-video overflow-hidden relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          // First row is now above the fold, so it carries the LCP image
                          priority={index < 3}
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-5 flex flex-col gap-3 grow">
                        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                          <div className="flex items-center">
                            <FiCalendar className="mr-1.5" />
                            <span>{post.date}</span>
                          </div>
                          <div className="text-blue-600 dark:text-blue-400 flex items-center font-medium">
                            Read article <FiArrowRight className="ml-1" />
                          </div>
                        </div>
                        <span className="inline-block text-xs font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-fit">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-bold text-zinc-800 dark:text-white">
                          {post.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-auto">
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
                  We couldn{"\'"}t find any articles matching your search. Try a
                  different term or browse our categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="px-5 py-2.5 bg-linear-to-r from-blue-600 to-blue-400 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
    </MotionConfig>
  );
};

export default BlogPage;