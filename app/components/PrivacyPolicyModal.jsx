import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
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
            Privacy Policy
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
            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          {/* Policy sections */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">1</span>
                Information We Collect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 pl-9">
                We collect personal information like name, email address, and usage data (IP, browser, etc.) to provide and improve our services.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">2</span>
                How We Use Your Information
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 pl-9">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>To provide and maintain our services</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>Improve user experience and service quality</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>Send important updates or support emails</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">3</span>
                Your Rights
              </h3>
              <p className="text-gray-600 dark:text-gray-300 pl-9">
                You have the right to request access, correction, or deletion of your personal data at any time by contacting us.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">4</span>
                Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 pl-9">
                For any privacy-related questions, please contact us at <span className="font-medium text-blue-600 dark:text-blue-400">support@dsavisualizer.com</span>.
              </p>
            </div>
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
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;