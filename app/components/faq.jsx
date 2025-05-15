'use client';
import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiHelpCircle, FiMail } from 'react-icons/fi';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is DSA Visualizer?",
      answer: "DSA Visualizer is an interactive learning tool that helps you understand Data Structures and Algorithms through visual representations. It provides step-by-step animations of how different algorithms work."
    },
    {
      question: "Is this tool suitable for beginners?",
      answer: "Absolutely! Our visualizations are designed to make complex concepts accessible to learners at all levels. Beginners can see exactly how data structures operate, while advanced users can use it to refine their understanding."
    },
    {
      question: "Can I use this to prepare for coding interviews?",
      answer: "Yes! Many users find our visualizations particularly helpful for interview preparation. Seeing algorithms in action helps reinforce understanding better than just reading pseudocode."
    },
    {
      question: "Are there plans to add more data structures?",
      answer: "We're continuously expanding our collection. Currently working on adding Trees and Graphs visualizations - stay tuned for updates!"
    }
  ];

  return (
    <section className="relative py-6 bg-white dark:bg-black overflow-hidden">
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
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-flex items-center justify-center gap-2 text-blue-500 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
            <FiHelpCircle className="w-5 h-5" />
            Need Help?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-300">Asked Questions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Quick answers to common questions about our platform
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 ${activeIndex === index ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  <span className="text-blue-500 mr-3">Q{index + 1}.</span>
                  {faq.question}
                </h3>
                <span className="text-blue-500 dark:text-blue-400 ml-4">
                  {activeIndex === index ? (
                    <FiChevronUp className="w-6 h-6" />
                  ) : (
                    <FiChevronDown className="w-6 h-6" />
                  )}
                </span>
              </button>
              <div 
                className={`px-6 pb-6 pt-0 text-gray-600 dark:text-gray-300 transition-all duration-300 ${activeIndex === index ? 'block opacity-100' : 'hidden opacity-0'}`}
              >
                <div className="pl-8 border-l-2 border-blue-500/30">
                  <p className="flex">
                    <span className="text-blue-500 font-bold mr-2">A.</span>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="max-w-3xl mx-auto mt-16 text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400 mx-auto mb-6">
            <FiMail className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Our team is ready to help you with any additional questions you might have.
          </p>
          <button className="relative px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 group overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Contact Support
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-20"></div>
      </div>
    </section>
  );
};

export default FAQSection;