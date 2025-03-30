'use client';
import React from 'react';
import Navbar from '@/app/components/navbar';

const Visualizer = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
          DSA Visualizer
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Welcome to the interactive DSA Visualizer! Start exploring data structures and algorithms with real-time visualizations.
        </p>
        {/* Placeholder for visualizer content */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-300">
            This is where the visualizer will go. Add your visualization logic or components here!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Visualizer;