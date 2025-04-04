import React from 'react';

const FAQSection = () => {
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
    <section className="py-16 bg-white dark:bg-black text-gray-800 dark:text-gray-200 relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 dotted-background pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Centered Content */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            <span className="text-blue-500">Frequently Asked</span> Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 text-center">
            Find answers to common questions about using DSA Visualizer
          </p>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  <span className="text-blue-500 mr-3">Q.</span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 pl-8">
                  <span className="text-blue-500 font-bold mr-2">A.</span>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Still have questions? We're here to help!
            </p>
            <a
              href="#contact"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div>
        <div className="w-[80%] mx-auto h-[1px] border-gray-600 rounded-xl mt-14 bg-gray-600 z-10"></div>
      </div>
    </section>
  );
};

export default FAQSection;