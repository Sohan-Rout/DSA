'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiSend, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const TestimonialsSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/send-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          review: formData.review,
          rating: formData.rating,
          to: 'routsohan2006@gmail.com', // Your email address
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit review');
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        review: '',
        rating: 5
      });
    } catch (err) {
      setError(err.message || 'Failed to submit review. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-white dark:bg-black overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute -top-10 -left-20 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/10 rounded-full filter blur-3xl -z-10 animate-float-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full filter blur-3xl -z-10 animate-float-slower"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Share <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">Your Experience</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We value your feedback to help us improve our services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 max-w-2xl mx-auto border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Your review has been submitted successfully.</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center mx-auto"
                >
                  Submit Another Review <FiArrowRight className="ml-2" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <FiStar
                          className={`w-7 h-7 ${star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600 fill-gray-100 dark:fill-gray-800'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    placeholder="Share your thoughts about your experience..."
                    rows={5}
                    value={formData.review}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 transition-all"
                    required
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-800"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Review <FiSend className="ml-2" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

{/* Divider */}
        <div className="mt-20 mx-auto h-[1px] max-w-4xl bg-gradient-to-r rounded-sm from-transparent via-blue-200 dark:via-blue-800 to-transparent"></div>
    </section>
  );
};

export default TestimonialsSection;