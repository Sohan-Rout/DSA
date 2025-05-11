import React from 'react';

const SubscriptionCard = () => {
  return (
    <section className="py-6 bg-white dark:bg-black text-gray-800 dark:text-gray-200 relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 dotted-background pointer-events-none"></div>

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          <span className="text-blue-500">Choose</span> Your Plan
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 transform hover:scale-102 hover:shadow-lg hover:border-blue-500 hover:ring-2 hover:ring-blue-200 dark:hover:ring-blue-500 hover:ring-opacity-50">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Free
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Rs 0<span className="text-lg font-normal">/month</span>
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-base">
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
                <span>Quizzes</span>
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 transform hover:scale-102 hover:shadow-lg hover:border-blue-500 hover:ring-2 hover:ring-blue-200 dark:hover:ring-blue-500 hover:ring-opacity-50 relative">
            {/* Recommended Tag */}
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-bl-lg">
              Recommended
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Premium
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Rs 199<span className="text-lg font-normal">/month</span>
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-base">
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
                <span>Quizzes</span>
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
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Get Premium
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div>
        <div className="w-[80%] h-[1px] border-gray-600 rounded-xl mx-auto mt-14 bg-gray-600 z-10"></div>
      </div>
    </section>
  );
};

export default SubscriptionCard;