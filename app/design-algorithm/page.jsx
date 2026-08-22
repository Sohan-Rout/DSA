import React from 'react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import DesignAlgorithmClient from './DesignAlgorithmClient';

// Shape mirrors /visualizer:
//   { title, icon, info?: { About, ... }, subsections: [{ title, items: [{ name, path }] }] }
// A section may use a flat `items: [{ name, path }]` instead of `subsections`.
const sections = [
  {
    title: "Fundamentals of Algorithm Analysis",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3v18h18M7 15l4-5 3 3 5-7"
        />
      </svg>
    ),
    info: {
      About:
        "How to measure an algorithm instead of guessing: describe its growth with asymptotic notation, count the time and space it costs, solve the recurrences recursive algorithms produce, and average the cost of a sequence of operations with amortized analysis.",
    },
    subsections: [
      {
        title: "Basics",
        items: [
          {
            name: "Asymptotic Notation",
            path: "/design-algorithm/fundamentals/basics/asymptotic-notation",
          },
          {
            name: "Time & Space Complexity",
            path: "/design-algorithm/fundamentals/basics/time-space-complexity",
          },
        ],
      },
      {
        title: "Recurrence Relations",
        items: [
          {
            name: "Master Theorem",
            path: "/design-algorithm/fundamentals/recurrence-relations/master-theorem",
          },
          {
            name: "Substitution Method",
            path: "/design-algorithm/fundamentals/recurrence-relations/substitution-method",
          },
          {
            name: "Recursion Tree Method",
            path: "/design-algorithm/fundamentals/recurrence-relations/recursion-tree",
          },
        ],
      },
      {
        title: "Amortized Analysis",
        items: [
          {
            name: "Overview",
            path: "/design-algorithm/fundamentals/amortized-analysis",
          },
        ],
      },
    ],
  },
];

const DesignAlgorithm = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16 min-h-[calc(100vh-80px)] grow relative z-10">
        <div className="text-center mb-10 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Design & Analysis of{" "}
            <span className="text-blue-600 dark:text-blue-500">Algorithm</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Algorithm design techniques explained step by step
          </p>
        </div>

        <DesignAlgorithmClient initialSections={sections} />
      </main>
      <div className="w-full relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default DesignAlgorithm;
