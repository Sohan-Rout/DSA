'use client';
import React, { useState, useEffect } from 'react';
import { FiCode, FiBookOpen, FiAward, FiCpu, FiTrendingUp, FiZap } from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    {
      title: "Interactive Visualizations",
      description: "See algorithms in action with step-by-step animations that turn complex concepts into clear, interactive visuals.",
      icon: <FiCpu className="w-8 h-8" />,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      benefits: [
        "Real-time algorithm tracing",
        "Adjustable animation speeds",
        "Interactive node manipulation"
      ]
    },
    {
      title: "Comprehensive Learning",
      description: "Master DSA from basic arrays to advanced graph algorithms with structured learning paths.",
      icon: <FiBookOpen className="w-8 h-8" />,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      benefits: [
        "100+ DSA topics covered",
        "Beginner to advanced levels",
        "Practical implementation examples"
      ]
    },
    {
      title: "Knowledge Testing",
      description: "Reinforce learning with inbuilt quizzes and get immediate feedback on your progress.",
      icon: <FiAward className="w-8 h-8" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      benefits: [
        "Topic-specific challenges",
        "Performance analytics",
        "Competitive coding practice"
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Auto-transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % features.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <section className="relative overflow-hidden py-24">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-black dark:to-black z-0"></div>
      {/* Dotted Background */}
      <div className="absolute inset-0 dotted-background pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-300">DSA Mastery</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Modern tools designed to transform how you understand algorithms
          </p>
        </div>

        {/* Modern Card Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Floating background elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/10 rounded-full filter blur-3xl -z-10 animate-float-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full filter blur-3xl -z-10 animate-float-slower"></div>
          
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="min-w-full px-4">
                  <div 
                    className={`bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${hoveredIndex === index ? 'scale-[1.02] shadow-xl' : ''}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                      {/* Icon Card */}
                      <div className={`flex-shrink-0 w-24 h-24 ${feature.bgColor} rounded-2xl flex items-center justify-center ${feature.color} transition-all duration-500 ${hoveredIndex === index ? 'rotate-6 scale-110' : ''}`}>
                        {feature.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-6">
                        <div>
                          <div className="text-xs font-semibold tracking-wider text-blue-500 dark:text-blue-400 uppercase mb-1">
                            Feature 0{index + 1}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            {feature.title}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                          {feature.description}
                        </p>
                        
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {feature.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className={`flex-shrink-0 mt-1 w-5 h-5 ${feature.color} rounded-full flex items-center justify-center`}>
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modern Navigation */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prevSlide}
              className="w-14 h-14 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group hover:shadow-md"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <div className="flex items-center gap-2 mx-4">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-8 bg-blue-600 dark:bg-blue-400'
                      : 'w-4 bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-14 h-14 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group hover:shadow-md"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[80%] mx-auto h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-20"></div>
      </div>
    </section>
  );
};

export default FeaturesSection;