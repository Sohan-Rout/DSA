import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Location & Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">123 Algorithm Avenue</p>
            <p className="text-gray-400 mb-2">Data Structures City, DS 54321</p>
            <p className="text-gray-400">
              Email:{' '}
              <a 
                href="mailto:support@dsavisualizer.com" 
                className="hover:text-blue-500 transition duration-300 break-words"
              >
                support@dsavisualizer.com
              </a>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-500 transition duration-300 block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-blue-500 transition duration-300 block">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/visualizer" className="hover:text-blue-500 transition duration-300 block">
                  Visualizer
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500 transition duration-300 block">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest DSA tips and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto sm:mx-0">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-12 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DSA Visualizer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;