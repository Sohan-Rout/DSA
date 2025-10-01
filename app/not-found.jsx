"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiHome, FiZap } from 'react-icons/fi';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: '404 Not Found',
        page_path: window.location.pathname,
      });
    }
  }, []);

  useEffect(() => {
    document.body.classList.add('page-loaded');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-blue-600/10 rounded-full filter blur-3xl animate-float-slower"></div>
      </div>

      <div className="max-w-md w-full space-y-6 transform transition-all duration-500 opacity-0 translate-y-10 page-loaded:opacity-100 page-loaded:translate-y-0 relative z-10">
        {/* Broken plug animation */}
        <div className="relative mx-auto w-40 h-40 mb-8">
          {/* Plug base */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-gray-300 dark:bg-gray-600 rounded-lg">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-500 dark:bg-gray-800 rounded-lg">
          {/* Plug pins - broken animation */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-6">
              <div className="relative">
                <div className="w-3 h-8 bg-gray-400 dark:bg-gray-500 rounded-t-sm animate-bounce-pin-1"></div>
                <div className="absolute top-0 left-1/2 w-1 h-2 bg-yellow-400 transform -translate-x-1/2 animate-spark-1 opacity-0"></div>
              </div>
              <div className="relative">
                <div className="w-3 h-10 bg-gray-400 dark:bg-gray-500 rounded-t-sm animate-bounce-pin-2"></div>
                <div className="absolute top-0 left-1/2 w-1 h-2 bg-yellow-400 transform -translate-x-1/2 animate-spark-2 opacity-0"></div>
              </div>
            </div>
            </div>
            {/* Red cross icon */}
            <div className="absolute top-1/2 left-1/2 w-10 h-10 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
                <div className="absolute w-10 h-2 bg-red-400 rounded-full rotate-45"></div>
                <div className="absolute w-10 h-2 bg-red-400 rounded-full -rotate-45"></div>
            </div>
            </div>
          <FiZap className="absolute top-4 left-1/2 w-8 h-8 text-yellow-400 transform -translate-x-1/2 animate-pulse opacity-0" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Connection Lost
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            The page you're trying to reach seems to be unplugged or doesn't exist.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <FiArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <a
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <FiHome className="w-5 h-5" />
            Return Home
          </a>
        </div>

        {/* Footer note */}
        <p className="pt-12 text-sm text-gray-500 dark:text-gray-400">
          Still stuck? <a href="/contact" className="text-blue-500 dark:text-blue-400 hover:underline">Contact support</a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;