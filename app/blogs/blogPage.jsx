'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Content from '@/app/blogs/content';

const BlogPage = () => {
   // Carousel state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  // Handle next slide
  const nextSlide = () => {
    setCurrentSlideIndex((prev) => 
      prev === Math.ceil(blogData.length / 3) - 1 ? 0 : prev + 1
    );
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentSlideIndex((prev) => 
      prev === 0 ? Math.ceil(blogData.length / 3) - 1 : prev - 1
    );
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlideIndex]);

  // Calculate visible blogs based on current slide
  const visibleBlogs = () => {
    const startIndex = currentSlideIndex * 3;
    return blogData.slice(startIndex, startIndex + 3);
  };

  // Blog data array
  const blogData = [
    {
      id: 1,
      title: "Is data structures and algorithms important for web developers",
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
      title: "Are data structures and algorithms different for different languages",
      excerpt: "Explore the differences in data structures and algorithms across various programming languages and how it impacts implementation.",
      date: "May 19, 2025",
      readTime: "5 min read",
      slug: "/blogs/Content/dsaDifferent",
      category: "Programming Languages",
      tags: ["DSA", "Programming Languages", "Algorithms"],
      image: "/blog/dsaDifferent.png"
    },
  ];

  // Trending topics
  const trendingTopics = [
    { id: 1, title: "Web Dev DSA", slug: "/blogs/Content/dsaWebDev" }
  ];

  // State for random blogs and search
  const [randomBlogs, setRandomBlogs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  // Get random blogs on component mount
  useEffect(() => {
    const shuffled = [...blogData].sort(() => 0.5 - Math.random());
    setRandomBlogs(shuffled.slice(0, 3));
  }, []);

  // Trending slider auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trendingTopics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.length > 2) {
      const matched = blogData.filter(blog => 
        blog.title.toLowerCase().includes(query) || 
        blog.tags.some(tag => tag.toLowerCase().includes(query))
      ).slice(0, 5);
      setSearchSuggestions(matched);
    } else {
      setSearchSuggestions([]);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mt-14 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-zinc-100 mb-6">
            Welcome to Our Tech Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-zinc-300 max-w-3xl mx-auto">
            Discover the latest in web development, programming tips, and cutting-edge technologies.
          </p>
        </section>

        {/* Search Bar */}
        <section className="mb-16">
          <div className="relative max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search blog posts..."
                className="flex-1 p-3 border border-gray-300 dark:border-zinc-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <FiSearch className="mr-2" />
                Search
              </button>
            </form>
            
            {searchSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg">
                {searchSuggestions.map(blog => (
                  <Link 
                    key={blog.id}
                    href={blog.slug}
                    className="block p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer border-b border-gray-100 dark:border-zinc-700 last:border-b-0"
                    onClick={() => setSearchSuggestions([])}
                  >
                    <div className="font-medium dark:text-zinc-100">{blog.title}</div>
                    <div className="text-sm text-gray-500 dark:text-zinc-400">{blog.category}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Modern Carousel for Featured Blogs */}
        <section className="mb-16 relative">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-100">
              Featured Posts
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                aria-label="Previous slide"
              >
                <FiChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                aria-label="Next slide"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div 
            className="relative overflow-hidden"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlideIndex * 100}%)`
              }}
            >
              {blogData.map((blog) => (
                <div 
                  key={blog.id}
                  className="border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg overflow-hidden hover:shadow-md dark:hover:shadow-zinc-700/30 transition-all duration-300 group min-w-full"
                >
                  <div className="h-48 bg-gray-200 dark:bg-zinc-700 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-gray-500 dark:text-zinc-400">{blog.category}</span>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-zinc-100 my-2 group-hover:text-black dark:group-hover:text-white transition-colors">
                      <Link href={blog.slug}>{blog.title}</Link>
                    </h3>
                    <p className="text-gray-600 dark:text-zinc-300 mb-4">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-zinc-400">
                      <span>{blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(blogData.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className={`w-3 h-3 rounded-full ${currentSlideIndex === index ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-zinc-600'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section>
          <Content />
        </section>
      </main>
    </div>
  );
};
 
export default BlogPage;