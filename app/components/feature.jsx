'use client';
import React, { useState, useEffect } from 'react';

const FeaturesSection = () => {
  const features = [
    {
      title: "Interactive Visualizations",
      description:
        "See algorithms in action. Step-by-step animations turn data structures into clear, interactive visuals helping you understand every move in real-time.",
      lightImage: "/interactive.png",
      darkImage: "/interactive.png",
      reverse: true,
    },
    {
      title: "Comprehensive Learning",
      description:
        "Explore a wide range of DSA topics with detailed explanations and examples. From basic arrays to advanced graph algorithms, we've got everything covered with clear, concise explanations.",
      lightImage: "/comprehensiveLight.png",
      darkImage: "/comprehensiveDark.png",
      reverse: true,
    },
    {
      title: "Test Your Knowledge",
      description:
        "Reinforce your learning with inbuilt quizzes under each topic. Immediate feedback helps you identify areas that need more practice and track your progress.",
      lightImage: "/quizLight.png",
      darkImage: "/quizDark.png",
      reverse: true,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [features.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

   return (
    <section className="relative overflow-hidden">
      {/* Gradient transition from hero blue to white */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200/25 via-blue-100 to-white dark:from-gray-950 dark:to-black z-0"></div>
      {/* Subtle grid pattern */}
        <div className="absolute inset-0 dotted-background"></div>
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Section Heading with modern styling */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-300">DSA Learning</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Interactive tools designed to transform how you understand and master data structures and algorithms.
          </p>
        </div>

        {/* Modern Carousel */}
        <div className="relative">
          {/* Floating background element for depth */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200/30 dark:bg-blue-800/20 rounded-full filter blur-3xl -z-10"></div>
          
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className={`flex flex-col ${feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 max-w-6xl mx-auto`}>
                    {/* Text Content */}
                    <div className="md:w-1/2 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 text-xl">{index + 1}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-3">
                        {feature.benefits?.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Image Content */}
                    <div className="md:w-1/2 w-full">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
                        {/* Light mode image */}
                        <div className="absolute inset-0 flex items-center justify-center dark:hidden p-4">
                          <img
                            src={feature.lightImage}
                            alt={`Illustration of ${feature.title}`}
                            className="object-contain w-full h-full rounded-lg"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        {/* Dark mode image */}
                        <div className="absolute inset-0 items-center justify-center hidden dark:flex p-4">
                          <img
                            src={feature.darkImage}
                            alt={`Illustration of ${feature.title}`}
                            className="object-contain w-full h-full rounded-lg"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        {/* Floating elements */}
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-200/40 dark:bg-blue-800/30 rounded-full filter blur-xl -z-10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modern Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-8 bg-blue-600 dark:bg-blue-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Added line */}
      <div>
        <div className="w-[80%] mx-auto h-[1px] border-gray-600 rounded-xl mt-14 bg-gray-600 z-10"></div>
      </div>
      </div>
    </section>
  );
};

export default FeaturesSection;