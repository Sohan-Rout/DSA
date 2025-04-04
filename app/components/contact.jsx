import React from 'react';

const ContactSection = () => {
  return (
    <section className="py-5 bg-white dark:bg-black text-gray-800 dark:text-gray-200 relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 dotted-background pointer-events-none"></div>

      <div className="container mx-auto px-6">
        {/* Centered Content */}
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Stay <span className="text-blue-500">Connected</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Subscribe to our newsletter for updates, tips, and insights on mastering data structures and algorithms.
          </p>

          {/* Newsletter Form */}
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-400 transition duration-300"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      {/* Divider Line */}
      <div>
        <div className="w-[80%] mx-auto h-[1px] border-gray-600 rounded-xl mt-14 bg-gray-600 z-10"></div>
      </div>
    </section>
  );
};

export default ContactSection;