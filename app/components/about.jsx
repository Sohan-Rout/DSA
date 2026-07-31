import React from "react";
import { IoMdInformationCircle } from "react-icons/io";

const AboutSection = () => {
  return (
    <section className="relative py-10 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-4">
          <span className="flex items-center justify-center gap-2 text-blue-500 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
            <IoMdInformationCircle className="text-xl" />
            About The Platform
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Revolutionizing{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-300">
              DSA Learning
            </span>
          </h1>
        </div>

        {/* Mission Statement */}
        <div className="max-w-5xl mx-auto text-neutral-600 dark:text-neutral-300 p-8 md:p-10 overflow-hidden">
            <p className="text-center text-lg">
              DSA Visualizer was created to bridge the gap between theoretical
              knowledge and practical understanding. We believe that seeing
              concepts in action is the key to mastering data structures and
              algorithms. Whether you{"\'"}re a student preparing for exams, a
              developer honing your skills, or an enthusiast exploring computer
              science, our tool makes learning engaging and effective through
              interactive visualizations and a user-friendly interface.
            </p>
        </div>
        {/* Divider */}
        <div className="mt-20 mx-auto h-px max-w-4xl bg-linear-to-r rounded-sm from-transparent via-blue-200 dark:via-blue-800 to-transparent"></div>
      </div>
    </section>
  );
};

export default AboutSection;
