import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const cookieSections = [
  {
    id: "1",
    title: "What Are Cookies",
    data: "Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.",
  },
  {
    id: "2",
    title: "Types of Cookies We Use",
    points: [
      "Essential Cookies: Required for basic site functionality and security",
      "Performance Cookies: Help us understand how visitors interact with our website",
      "Functionality Cookies: Remember your preferences and settings",
      "Analytics Cookies: Collect information about your usage patterns",
    ],
  },
  {
    id: "3",
    title: "How We Use Cookies",
    points: [
      "To authenticate users and prevent fraudulent use",
      "Remember your preferences and settings",
      "Analyze site traffic and usage patterns",
      "Improve our website performance and user experience",
      "Provide personalized content when available",
    ],
  },
  {
    id: "4",
    title: "Third-Party Cookies",
    data: "We may also use cookies from trusted third-party services for analytics, performance monitoring, and other functionality. These third parties have their own privacy policies governing cookie usage.",
  },
  {
    id: "5",
    title: "Cookie Management",
    points: [
      "You can control cookie settings through your browser preferences",
      "Most browsers allow you to refuse or delete cookies",
      "Disabling essential cookies may affect website functionality",
      "You can opt-out of analytics cookies using our cookie preferences tool",
    ],
  },
  {
    id: "6",
    title: "Your Choices",
    data: "You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website.",
  },
  {
    id: "7",
    title: "Updates to Cookie Policy",
    data: "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our operations. We encourage you to periodically review this page for the latest information.",
  },
  {
    id: "8",
    title: "Contact Information",
    data: "If you have any questions about our use of cookies, please contact us at",
    contact: "hello@dsavisualizer.in",
  },
];

const CookiePolicyModal = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with fade-in animation */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal container with slide-up animation */}
      <div className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 max-w-3xl w-full rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 max-h-[90vh] flex flex-col">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Cookie Policy
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6">
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            This Cookie Policy explains how we use cookies and similar technologies on our website. It describes the types of cookies we use, their purposes, and how you can manage your cookie preferences.
          </p>

          {/* Cookie policy sections */}
          <div className="space-y-6">
            <ul>
              {cookieSections.map((item, index) => (
                <li key={index} className='mb-3'>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <div className='flex'>
                      <span className="w-6 h-6 font-poppins font-semibold bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">{item.id}</span>
                      <h3 className="text-xl font-semibold mb-2 flex items-center">
                        {item.title}
                      </h3>
                    </div>
                    {item.points && <ul className="space-y-2 text-gray-600 dark:text-gray-300 pl-9">
                      {item.points.map((subitem, subindex) => (
                        <li key={subindex} className='list-disc text-blue-500'>
                          <span className='text-gray-600 dark:text-gray-300'>{subitem}</span>
                        </li>
                      ))}
                    </ul>}
                    <p className="text-gray-600 dark:text-gray-300 pl-9">{item.data}</p>
                    {item.contact && (
                      <span className="font-medium pl-9 text-blue-600 dark:text-blue-400">{item.contact}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional cookie information */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              🍪 Cookie Duration
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Session cookies are temporary and expire when you close your browser. Persistent cookies remain on your device for a set period or until you delete them.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: May 17, 2025
            </p>
          </div>
        </div>

        {/* Footer with close button */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            Accept & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyModal;