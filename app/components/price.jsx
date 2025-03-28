import React from 'react';

const SubscriptionCard = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          <span className="text-blue-500">Choose</span> Your Plan
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto subscription-cards">
          {/* Free Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:border-purple-700 hover:ring-2 hover:ring-purple-200 dark:hover:ring-purple-500 hover:ring-opacity-50">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Free
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Rs 0<span className="text-lg font-normal">/month</span>
            </p>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-center justify-between">
                <span>Visualizer</span>
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </li>
              <li className="flex items-center justify-between">
                <span>Data Input & Understanding</span>
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </li>
              <li className="flex items-center justify-between">
                <span>AI Support Assistance</span>
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </li>
              <li className="flex items-center justify-between">
                <span>Learning Tracker</span>
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </li>
            </ul>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Available forever
              </p>
            </div>
          </div>

          {/* Premium Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:border-purple-700 hover:ring-2 hover:ring-purple-200 dark:hover:ring-purple-500 hover:ring-opacity-50">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Premium
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Rs 199<span className="text-lg font-normal">/month</span>
            </p>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-center justify-between">
                <span>Visualizer</span>
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </li>
              <li className="flex items-center justify-between">
                <span>Data Input & Understanding</span>
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </li>
              <li className="flex items-center justify-between">
                <span>AI Support Assistance</span>
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </li>
              <li className="flex items-center justify-between">
                <span>Learning Tracker</span>
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </li>
            </ul>
            <div className="mt-6 text-center">
              <a
                href="#"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Get Premium
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionCard;