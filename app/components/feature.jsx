'use client';
import React from 'react';
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

  return (
    <section className="relative overflow-hidden py-24">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-white dark:bg-black z-0"></div>

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

        {/* Desktop Grid (shows all cards) */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-8 h-full flex flex-col">
                {/* Icon Card */}
                <div className={`flex-shrink-0 w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center ${feature.color} mb-6 transition-all duration-500 hover:rotate-6 hover:scale-110`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <div className="flex-grow space-y-4">
                  <div>
                    <div className="text-xs font-semibold tracking-wider text-blue-500 dark:text-blue-400 uppercase mb-1">
                      Feature 0{index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3 mt-4">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 mt-1 w-5 h-5 ${feature.color} rounded-full flex items-center justify-center`}>
                          <svg className="w-3 h-3 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          ))}
        </div>

        {/* Mobile Carousel (hidden on desktop) */}
        <div className="md:hidden relative max-w-5xl mx-auto">
          {/* Floating background elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/10 rounded-full filter blur-3xl -z-10 animate-float-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full filter blur-3xl -z-10 animate-float-slower"></div>
          
          <div className="overflow-hidden rounded-3xl">
            <div className="flex space-x-4">
              {features.map((feature, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-lg">
                    <div className="p-8 flex flex-col">
                      {/* Icon Card */}
                      <div className={`flex-shrink-0 w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center ${feature.color} mb-6`}>
                        {feature.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-semibold tracking-wider text-blue-500 dark:text-blue-400 uppercase mb-1">
                            Feature 0{index + 1}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {feature.title}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                        
                        <ul className="space-y-3 mt-4">
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
        </div>

        {/* Divider */}
        <div className="w-[80%] mx-auto h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-20"></div>
      </div>
    </section>
  );
};

export default FeaturesSection;