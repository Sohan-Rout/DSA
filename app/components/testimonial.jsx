"use client";
import React, { useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Raman Jaiswal',
      email: '@ramanj001',
      review: `This is something which doesn't need words to explain dayummmmm it is good for beginners like us. This is something which actually needs to be appreciated. The visualizations are incredibly clear and the interactive elements make learning engaging. I've tried several platforms but none compare to the simplicity and effectiveness of this tool.`,
      stars: 5,
    },
    {
      name: 'Rahul Yadav',
      email: '@yadav.rahul05',
      review: `DSA Visualizer made understanding complex algorithms incredibly simple. Its intuitive design and step-by-step visuals helped me grasp DSA concepts faster than traditional methods. A must-use tool for learners! The interface might feel a bit cluttered or difficult to navigate for new users but seriously overall it's actually good. I particularly appreciate how it breaks down each step of the algorithms.`,
      stars: 4,
    },
    {
      name: 'Priya Sharma',
      email: '@priya.s',
      review: `As a visual learner, this tool has been revolutionary for me. Being able to see the algorithms in action with different speeds makes all the difference. The color coding helps distinguish between different operations clearly.`,
      stars: 5,
    },
    {
      name: 'Amit Patel',
      email: '@amit.p',
      review: `Excellent resource for interview preparation. The way it visualizes time and space complexity helps build intuition. I've recommended it to all my friends who are preparing for technical interviews.`,
      stars: 5,
    },
    {
      name: 'Neha Gupta',
      email: '@neha.g',
      review: `The breadth of algorithms covered is impressive. From basic sorting to advanced graph algorithms, everything is presented in an accessible way. The only suggestion I have is to add more real-world application examples for each algorithm.`,
      stars: 4,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(3);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedReviews, setExpandedReviews] = useState({});

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, testimonials.length));
  };

  const showLess = () => {
    setVisibleCount(3);
  };

  const toggleReview = (index) => {
    setExpandedReviews(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.stars >= parseInt(activeFilter));

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
    <section className="py-10 bg-white dark:bg-black overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                  {/* Floating background elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/10 rounded-full filter blur-3xl -z-10 animate-float-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full filter blur-3xl -z-10 animate-float-slower"></div>
          {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-300">Users Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trusted by students and professionals worldwide
          </p>
        </div>

        <div className="flex justify-center mb-8 flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveFilter('5')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeFilter === '5' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <span>5 Stars</span>
            <FaStar className="text-yellow-400" />
          </button>
          <button
            onClick={() => setActiveFilter('4')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeFilter === '4' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <span>4+ Stars</span>
            <FaStar className="text-yellow-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.slice(0, visibleCount).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-semibold mr-4">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.email}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <StarRating rating={testimonial.stars} />
              </div>
              
              <div className="relative">
                <p className={`text-gray-600 dark:text-gray-300 mb-4 ${!expandedReviews[index] && 'line-clamp-3'}`}>
                  {testimonial.review}
                </p>
                {testimonial.review.length > 150 && (
                  <button 
                    onClick={() => toggleReview(index)}
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    {expandedReviews[index] ? (
                      <>
                        <span>Show less</span>
                        <FaChevronUp size={12} />
                      </>
                    ) : (
                      <>
                        <span>Show more</span>
                        <FaChevronDown size={12} />
                      </>
                    )}
                  </button>
                )}
              </div>
              
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                Verified User • {testimonial.stars.toFixed(1)} Rating
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          {visibleCount < filteredTestimonials.length ? (
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Load More Testimonials
            </button>
          ) : visibleCount > 3 && (
            <button
              onClick={showLess}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-300"
            >
              Show Less
            </button>
          )}
        </div>

      {/* Divider */}
        <div className="w-[80%] mx-auto h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-20"></div>
      </div>
    </section>
  );
};

export default TestimonialSection;