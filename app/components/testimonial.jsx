"use client";
import React, { useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Raman Jaiswal',
      email: 'ramanj001@gmail.com',
      review: `This is something which doesn't need words to explain dayummmmm it is good for beginners like us. This is something which actually needs to be appreciated`,
      stars: 5,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(3);
  const [activeFilter, setActiveFilter] = useState('all');

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, testimonials.length));
  };

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.stars >= parseInt(activeFilter));

  // Function to generate initials from name
  const getInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <section className="py-16 bg-white dark:bg-black overflow-hidden relative">
        {/* Dotted Background */}
      <div className="absolute inset-0 dotted-background pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Trusted by students and professionals worldwide
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveFilter('5')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeFilter === '5' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <span>5 Stars</span>
            <FaStar className="text-yellow-400" />
          </button>
          <button
            onClick={() => setActiveFilter('4')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeFilter === '4' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <span>4+ Stars</span>
            <FaStar className="text-yellow-400" />
          </button>
        </div>

        {/* Testimonial Grid - Now properly responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.slice(0, visibleCount).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  {/* Initials Avatar with blue-600 background */}
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold mr-4">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
                      {testimonial.email}
                    </p>
                  </div>
                </div>
                <StarRating rating={testimonial.stars} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "{testimonial.review}"
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Verified User
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredTestimonials.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Load More Testimonials
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialSection;