import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const termsSections = [
  {
    id: "1",
    title: "Acceptance of Terms",
    data: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
  },
  {
    id: "2",
    title: "Use License",
    points: [
      "Permission is granted to temporarily use the materials on this website for personal, non-commercial transitory viewing only",
      "This is the grant of a license, not a transfer of title",
      "You may not modify or copy the materials, use them for any commercial purpose, or remove any copyright or proprietary notations",
    ],
  },
  {
    id: "3",
    title: "User Responsibilities",
    points: [
      "Provide accurate and complete information when required",
      "Maintain the confidentiality of your account credentials",
      "Notify us immediately of any unauthorized use of your account",
      "Use the service in compliance with all applicable laws and regulations",
    ],
  },
  {
    id: "4",
    title: "Intellectual Property",
    data: "All content, features, and functionality on this website, including but not limited to text, graphics, logos, and software, are the exclusive property of the company and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    id: "5",
    title: "Limitation of Liability",
    data: "In no event shall the company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
  },
  {
    id: "6",
    title: "Governing Law",
    data: "These Terms shall be governed and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions.",
  },
  {
    id: "7",
    title: "Changes to Terms",
    data: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.",
  },
  {
    id: "8",
    title: "Contact Information",
    data: "If you have any questions about these Terms, please contact us at",
    contact: "hello@dsavisualizer.in",
  },
];

const TermsOfServiceModal = ({ isOpen, onClose }) => {
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
            Terms of Service
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
            Please read these terms and conditions carefully before using our website and services. Your access to and use of the service is conditioned on your acceptance of and compliance with these terms.
          </p>

          {/* Terms sections */}
          <div className="space-y-6">
            <ul>
              {termsSections.map((item, index) => (
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
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceModal;