'use client';
import Content from "@/app/blogs/content";
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const BlogPage = () => {
  const otherBlogs = [
    {
      title: "Is data structures and algorithms important for web developers",
      excerpt: "Explore why understanding data structures and algorithms can help web developers write efficient, scalable, and maintainable code.",
      date: "May 20, 2025",
      readTime: "8 min read",
      slug: "/blogs/Content/dsaWebDev"
    },
    {
      title: "CSS Grid Mastery",
      excerpt: "Complete guide to modern layout techniques",
      date: "May 15, 2024",
      readTime: "10 min read",
      slug: "/blog/css-grid"
    },
    {
      title: "TypeScript Fundamentals",
      excerpt: "Why TypeScript is essential for modern development",
      date: "May 10, 2024",
      readTime: "6 min read",
      slug: "/blog/typescript-fundamentals"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 py-12">
        {/* Content Component */}
        <section id="content" className="mb-20 pt-10">
          <Content />
        </section>

        {/* Explore Other Blogs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-8 text-center">
            Explore Other Blogs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherBlogs.map((blog, index) => (
              <div 
                key={index}
                className="border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-6 hover:shadow-md dark:hover:shadow-zinc-700/30 transition-all duration-300 group"
              >
                <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-zinc-400">
                  <span>{blog.date}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-zinc-100 mb-3 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-zinc-300 mb-5">
                  {blog.excerpt}
                </p>
                <Link 
                  href={blog.slug}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  aria-label={`Read more about ${blog.title}`}
                >
                  Read more <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700/30 transition-colors"
            >
              View all blog posts
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};
 
export default BlogPage;