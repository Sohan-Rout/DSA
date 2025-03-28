// components/FeaturesSection.js
import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            <span className="text-blue-500">Why</span> Choose DSA Visualizer?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover powerful features to enhance your learning and understanding of data structures and algorithms.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl hover:border-purple-700 hover:ring-2 hover:ring-purple-200 dark:hover:ring-purple-500 hover:ring-opacity-50 perspective-1000">
            <div className="relative w-full h-48 transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
              {/* Front Face (Title) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 backface-hidden">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 transition duration-300 transform hover:scale-110">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-white">
                  Interactive Visualizations
                </h3>
              </div>
              {/* Back Face (Info) */}
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 backface-hidden rotate-y-180">
                <p className="text-gray-600 dark:text-gray-300 text-center px-4">
                  See algorithms and data structures come to life with real-time, step-by-step animations.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl hover:border-purple-700 hover:ring-2 hover:ring-purple-200 dark:hover:ring-purple-500 hover:ring-opacity-50 perspective-1000">
            <div className="relative w-full h-48 transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
              {/* Front Face (Title) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 backface-hidden">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 transition duration-300 transform hover:scale-110">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-white">
                  Comprehensive Learning
                </h3>
              </div>
              {/* Back Face (Info) */}
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 backface-hidden rotate-y-180">
                <p className="text-gray-600 dark:text-gray-300 text-center px-4">
                  Explore a wide range of DSA topics with detailed explanations and examples.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl hover:border-purple-700 hover:ring-2 hover:ring-purple-200 dark:hover:ring-purple-500 hover:ring-opacity-50 perspective-1000">
            <div className="relative w-full h-48 transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
              {/* Front Face (Title) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 backface-hidden">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 transition duration-300 transform hover:scale-110">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-white">
                  Fast & Intuitive
                </h3>
              </div>
              {/* Back Face (Info) */}
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 backface-hidden rotate-y-180">
                <p className="text-gray-600 dark:text-gray-300 text-center px-4">
                  Quickly grasp concepts with a user-friendly interface and smooth performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;