'use client';
import React from 'react';
import Navbar from '@/app/components/navbar';
import Link from 'next/link';

const Visualizer = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Table of <span className="text-blue-500">Contents</span>
        </h1>

        {/* Table of Contents */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Array
          </h2>
          <div className="ml-4">
            <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-4">
              Searching
            </h3>
            <ul className="ml-4 space-y-3">
              <li>
                <Link
                  href="/visualizer/searching/linearsearch"
                  className="text-lg text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                >
                  Linear Search
                </Link>
              </li>
              <li>
                <Link
                  href="/visualizer/searching/binarysearch"
                  className="text-lg text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                >
                  Binary Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Visualizer;