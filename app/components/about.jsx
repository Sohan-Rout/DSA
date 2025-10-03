import React from 'react';
import { IoMdInformationCircle } from "react-icons/io";

const AboutSection = () => {
  return (
    <section className="relative py-10 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="flex items-center justify-center gap-2 text-blue-500 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
            <IoMdInformationCircle className='text-xl'/>
            About The Platform
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Revolutionizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-300">DSA Learning</span>
          </h2>
        </div>

        {/* Mission Statement */}
        <div className="max-w-6xl mx-auto bg-white dark:bg-neutral-950 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-10 shadow-lg overflow-hidden">
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
{/* Divider */}
        <div className="mt-20 mx-auto h-[1px] max-w-4xl bg-gradient-to-r rounded-sm from-transparent via-blue-200 dark:via-blue-800 to-transparent"></div>
      </div>
    </section>
  );
};

export default AboutSection;