import React from 'react';
import { FiTarget, FiEye, FiCode, FiUsers } from 'react-icons/fi';

const AboutSection = () => {
  const features = [
    {
      icon: <FiTarget className="w-6 h-6" />,
      title: "Clear Mission",
      description: "Bridge theory and practice through visualization"
    },
    {
      icon: <FiEye className="w-6 h-6" />,
      title: "Visual Learning",
      description: "See algorithms come to life with animations"
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "Hands-on Practice",
      description: "Interactive coding environment"
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Community Focused",
      description: "Built for students and developers"
    }
  ];

  return (
    <section className="relative py-12 bg-gradient-to-b from-blue-50 to-white dark:from-black dark:to-black overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]" 
             style={{backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)'}}>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-blue-500 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
            About The Platform
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Revolutionizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-300">DSA Learning</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Transforming abstract concepts into tangible understanding through interactive visualization.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-500 dark:text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-10 shadow-lg overflow-hidden">
          <div className="relative">
            {/* Decorative element */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-xl"></div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 relative">
              <span className="text-blue-500">Our</span> Mission
            </h3>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                DSA Visualizer was created to bridge the gap between theoretical knowledge and practical understanding. We believe that seeing concepts in action is the key to mastering data structures and algorithms.
              </p>
              <p>
                Whether you're a student preparing for exams, a developer honing your skills, or an enthusiast exploring computer science, our tool makes learning engaging and effective through interactive visualizations and a user-friendly interface.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href='/#features'>
          <button className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 group overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Features
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-10"></div>
      </div>
    </section>
  );
};

export default AboutSection;