import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Location & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">123 Algorithm Lane</p>
            <p className="text-gray-400 mb-2">Code City, Techland</p>
            <p className="text-gray-400">
              Email:{' '}
              <a href="mailto:support@dsavisualizer.com" className="hover:text-blue-500 transition duration-300">
                support@dsavisualizer.com
              </a>
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-500 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-blue-500 transition duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/visualizer" className="hover:text-blue-500 transition duration-300">
                  Visualizer
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500 transition duration-300">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest DSA tips and updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DSA Visualizer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;