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
      name: 'Pratham Batra',
      email: '@Co-founder, Geekroom',
      review: `This is damn impressive seriously, no words. It genuinely feels like a strong alternative to platforms like GeeksforGeeks and W3Schools. Honestly, as a user, this feels even better. Everything is perfect. The only thing I'd love to see next is a custom code feature based on user input. But overall, this is fantastic.`,
      stars: 4,
    },
    {
      name: 'Arnav Gupta',
      email: '@Co-founder, Geekroom',
      review: `DSA Visualizer, this could be the upcoming game-changer. When you're stuck on LeetCode or trying to debug your logic, it helps you actually see what your code is doing at each step. Whether you're just starting out or deep into competitive programming, this is something which can make learning DSA so much more intuitive and less frustrating. Well! my opinion says in the future, I'd love to see a built-in compiler or a feature where users can test their own code with custom inputs — that would take it to the next level. But even now, it's incredibly helpful and super polished!”`,
      stars: 4,
    },
    {
      name: 'Rahul Yadav',
      email: '@yadav.rahul05',
      review: `DSA Visualizer made understanding complex algorithms incredibly simple. Its intuitive design and step-by-step visuals helped me grasp DSA concepts faster than traditional methods. A must-use tool for learners! The interface might feel a bit cluttered or difficult to navigate for new users but seriously overall it's actually good. I particularly appreciate how it breaks down each step of the algorithms.`,
      stars: 4,
    },
    {
      name: 'kartik',
      email: '@kartik2005221',
      review: `This platform made DSA so much easier to grasp. Everything's in one place — topics, visualizations, and practice. It really helped me connect the dots between theory and how things actually work.`,
      stars: 5,
    },
    {
      name: 'Vansh Saini',
      email: '@Vanshsaini9311',
      review: `The data structure application website is an excellent platform for both beginners and advanced learners. It offers clear, interactive demonstrations of essential data structures like stacks, queues, trees, and graphs. The real-time visualizations make complex topics easier to understand, and the practical examples enhance learning. The clean, responsive design and user-friendly navigation add to its appeal. Whether you're a student or a developer, this site is a valuable resource for strengthening your understanding of algorithms and data structures.`,
      stars: 5,
    },
    {
      name: 'Priya Sharma',
      email: '@priya.s',
      review: `As a visual learner, this tool has been revolutionary for me. Being able to see the algorithms in action with different speeds makes all the difference. The color coding helps distinguish between different operations clearly.`,
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

  const loadMore = () => setVisibleCount(prev => Math.min(prev + 3, testimonials.length));
  const showLess = () => setVisibleCount(3);
  const toggleReview = (index) => setExpandedReviews(prev => ({ ...prev, [index]: !prev[index] }));

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
    <section className="pb-10 bg-gradient-to-b from-white to-white dark:from-neutral-900 dark:to-neutral-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our <span className="text-blue-500 dark:text-blue-400">Users Say</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Trusted by students and professionals worldwide
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12 gap-3">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === 'all' ? 'bg-blue-500 text-white shadow-md' : 'bg-white dark:bg-neutral-950 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-black border border-gray-200 dark:border-blue-500'}`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveFilter('5')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeFilter === '5' ? 'bg-blue-500 text-white shadow-md' : 'bg-white dark:bg-neutral-950 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-black border border-gray-200 dark:border-blue-500'}`}
          >
            <span>5 Stars</span>
            <FaStar className="text-yellow-400" />
          </button>
          <button
            onClick={() => setActiveFilter('4')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeFilter === '4' ? 'bg-blue-500 text-white shadow-md' : 'bg-white dark:bg-neutral-950 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-black border border-gray-200 dark:border-blue-500'}`}
          >
            <span>4+ Stars</span>
            <FaStar className="text-yellow-400" />
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.slice(0, visibleCount).map((testimonial, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Avatar and Info */}
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-gray-800 dark:bg-gray-700 text-white flex items-center justify-center text-xl font-semibold mr-4">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.email}
                    </p>
                  </div>
                </div>
                
                {/* Star Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.stars} />
                </div>
                
                {/* Review Text */}
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
                          <span>Read more</span>
                          <FaChevronDown size={12} />
                        </>
                      )}
                    </button>
                  )}
                </div>
                
                {/* Footer */}
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  Verified User • {testimonial.stars.toFixed(1)} Rating
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          {visibleCount < filteredTestimonials.length ? (
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Load More
            </button>
          ) : visibleCount > 3 && (
            <button
              onClick={showLess}
              className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              Show Less
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="mt-10 mx-auto h-[1px] max-w-4xl bg-gradient-to-r rounded-sm from-transparent via-blue-200 dark:via-blue-800 to-transparent"></div>
      </div>
    </section>
  );
};

export default TestimonialSection;