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
    <section className="py-20 bg-white dark:bg-black text-gray-800 dark:text-gray-200 relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 dotted-background pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            <span className="text-blue-500">Why</span> Choose DSA Visualizer?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover powerful features to enhance your learning and understanding of data structures and algorithms.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="min-w-full px-4">
                  <div
                    className={`flex flex-col ${
                      feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'
                    } items-center gap-8 md:gap-12 max-w-5xl mx-auto`}
                  >
                    <div className="md:w-1/2">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                    <div className="md:w-1/2 w-full">
                      <div className="bg-gray-100 dark:bg-black rounded-lg overflow-hidden shadow-lg aspect-[3/2] flex items-center justify-center p-2">
                        {/* Container for both images */}
                        <div className="relative w-full h-full">
                          {/* Light mode image */}
                          <div className="absolute inset-0 flex items-center justify-center dark:hidden">
                            <img
                              src={feature.lightImage}
                              alt={`Illustration of ${feature.title}`}
                              className="object-contain w-full h-full rounded-lg"
                              style={{ maxHeight: '100%', maxWidth: '100%' }}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          {/* Dark mode image */}
                          <div className="absolute inset-0 items-center justify-center hidden dark:flex">
                            <img
                              src={feature.darkImage}
                              alt={`Illustration of ${feature.title}`}
                              className="object-contain w-full h-full rounded-lg"
                              style={{ maxHeight: '100%', maxWidth: '100%' }}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 dark:bg-gray-600 text-white p-3 rounded-full hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 dark:bg-gray-600 text-white p-3 rounded-full hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors"
          >
            ❯
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index
                    ? 'bg-gray-800 dark:bg-gray-400'
                    : 'bg-gray-400 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
      <div>
        <div className="w-[80%] h-[1px] border-gray-600 rounded-xl mx-auto mt-14 bg-gray-600 z-10"></div>
      </div>
      </div>
    </section>
  );
};

export default FeaturesSection;