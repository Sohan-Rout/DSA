// components/HeroSection.js
import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-800 dark:text-gray-200 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 dotted-background pointer-events-none"></div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900 dark:text-white">
            Master Data Structures & Algorithms with Interactive Visualizations
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">
            Learn, explore, and understand complex DSA concepts through dynamic, step-by-step visualizations designed for students, developers, and enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Start Visualizing Now
            </a>
            <a
              href="#"
              className="bg-transparent border border-gray-400 dark:border-gray-600 hover:border-amber-500 hover:text-amber-500 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Visual Element - Rotating Cube */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 perspective-1000 flex items-center justify-center">
            {/* Cube Container */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 animate-spin3d preserve-3d">
              {/* Cube Faces */}
              <div className="absolute w-full h-full bg-amber-500/40 dark:bg-amber-600/40 border border-amber-700/50 dark:border-amber-400/50 transform translate-z">
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">1</span>
              </div>
              <div className="absolute w-full h-full bg-amber-500/40 dark:bg-amber-600/40 border border-amber-700/50 dark:border-amber-400/50 transform rotate-y-90 translate-z">
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">2</span>
              </div>
              <div className="absolute w-full h-full bg-amber-500/40 dark:bg-amber-600/40 border border-amber-700/50 dark:border-amber-400/50 transform rotate-y-180 translate-z">
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">3</span>
              </div>
              <div className="absolute w-full h-full bg-amber-500/40 dark:bg-amber-600/40 border border-amber-700/50 dark:border-amber-400/50 transform rotate-y-270 translate-z">
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">4</span>
              </div>
              <div className="absolute w-full h-full bg-amber-500/40 dark:bg-amber-600/40 border border-amber-700/50 dark:border-amber-400/50 transform rotate-x-90 translate-z">
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">5</span>
              </div>
              <div className="absolute w-full h-full bg-amber-500/40 dark:bg-amber-600/40 border border-amber-700/50 dark:border-amber-400/50 transform rotate-x-270 translate-z">
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;