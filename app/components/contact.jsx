import React from 'react';

const ContactSection = () => {
  return (
    <section className="py-16 bg-gray-100 text-gray-800">
      <div className="container mx-auto px-6">
        {/* Centered Content */}
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Stay <span className='text-amber-500'>Connected</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for updates, tips, and insights on mastering data structures and algorithms.
          </p>

          {/* Newsletter Form */}
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;