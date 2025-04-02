import React from 'react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Link from 'next/link';

const Visualizer = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      {/* Full-page background */}
      <div className="fixed inset-0 dotted-background pointer-events-none z-1"></div>

      <main className="container mx-auto px-6 py-16 min-h-[calc(100vh-80px)]">
        <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Table Of <span className="text-blue-500">Contents</span>
        </h1>

        {/* Card with subtle 2px glow */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg
                        border border-gray-200 dark:border-gray-700
                        relative
                        hover:shadow-[0_0_0_2px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_0_2px_rgba(99,102,241,0.5)]
                        transition-all duration-300 ease-in-out">
          
          {/* Array Section */}
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Array
          </h2>
          
          <div className="ml-4 space-y-8">
            {/* Searching Algorithms */}
            <div>
              <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                Searching
              </h3>
              <ul className="ml-4 space-y-3">
                <li>
                  <Link href="/visualizer/searching/linearsearch" className="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
                    Linear Search
                  </Link>
                </li>
                <li>
                  <Link href="/visualizer/searching/binarysearch" className="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
                    Binary Search
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sorting Algorithms */}
            <div>
              <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                Sorting
              </h3>
              <ul className="ml-4 space-y-3">
                {['bubblesort', 'selectionsort', 'insertionsort', 'mergesort', 'quicksort'].map((sort) => (
                  <li key={sort}>
                    <Link href={`/visualizer/sorting/${sort}`} className="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
                      {sort.charAt(0).toUpperCase() + sort.slice(1).replace('sort', ' Sort')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stack Section */}
          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              Stack
            </h2>
            <ul className="ml-4 space-y-3">
              {['push-pop', 'peek', 'isempty'].map((op) => (
                <li key={op}>
                  <Link href={`/visualizer/stack/${op}`} className="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
                    {op.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Operation
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Queue Section */}
          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              Queue
            </h2>
            <ul className="ml-4 space-y-3">
              {['enqueue-dequeue', 'peek-front', 'isempty'].map((op) => (
                <li key={op}>
                  <Link href={`/visualizer/queue/${op}`} className="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
                    {op.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Operation
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <div>
        <div className="bg-gray-700 z-10 h-[1px]"></div>
      </div>
      <Footer/>
    </div>
  );
};

export default Visualizer;