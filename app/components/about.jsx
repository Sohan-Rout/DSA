import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200 relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 dotted-background pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Centered Content */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-blue-500">About</span> DSA Visualizer
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Empowering learners to conquer data structures and algorithms with intuitive tools and visualizations.
          </p>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            DSA Visualizer was created to bridge the gap between theoretical knowledge and practical understanding. We believe that seeing concepts in action is the key to mastering data structures and algorithms. Whether you’re a student preparing for exams, a developer honing your skills, or an enthusiast exploring the world of computer science, our tool is designed to make learning engaging and effective.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            With interactive visualizations, detailed explanations, and a user-friendly interface, we aim to simplify complexity and inspire confidence in every user.
          </p>
          <a
            href="#"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
      {/* Added line */}
      <div>
        <div className="w-[80%] mx-auto h-[1px] border-gray-600 rounded-xl mt-14 bg-gray-600 z-10"></div>
      </div>
    </section>
  );
};

export default AboutSection;