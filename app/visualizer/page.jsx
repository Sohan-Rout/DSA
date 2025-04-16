import React from 'react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Link from 'next/link';

export const metadata = {
  title: 'Algorithm Visualizer | DSA Visualizer',
  description: 'Explore visual representations of various DSA algorithms including searching, sorting, stacks, queues, and trees. Interactive and beginner-friendly!',
  keywords: [
    'DSA Visualizer',
    'Algorithm Visualizer',
    'Data Structures',
    'Searching Algorithms',
    'Sorting Algorithms',
    'Stack',
    'Queue',
    'Tree',
    'Linear Search',
    'Bubble Sort',
    'Tree Traversal',
    'Heap Sort',
    'Linked List',
    'Singly Linked List',
    'Doubly Linked List',
    'Circular Linked List'
  ],
  robots: 'index, follow',
};

const Visualizer = () => {
  const sections = [
    {
      title: 'Array',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      ),
      subsections: [
        {
          title: 'Searching',
          items: [
            { name: 'Linear Search', path: '/visualizer/searching/linearsearch' },
            { name: 'Binary Search', path: '/visualizer/searching/binarysearch' },
          ],
        },
        {
          title: 'Sorting',
          items: [
            { name: 'Bubble Sort', path: '/visualizer/sorting/bubblesort' },
            { name: 'Selection Sort', path: '/visualizer/sorting/selectionsort' },
            { name: 'Insertion Sort', path: '/visualizer/sorting/insertionsort' },
            { name: 'Merge Sort', path: '/visualizer/sorting/mergesort' },
            { name: 'Quick Sort', path: '/visualizer/sorting/quicksort' },
          ],
        },
      ],
    },
    {
      title: 'Stack',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      items: [
        { name: 'Push & Pop', path: '/visualizer/stack/push-pop' },
        { name: 'Peek', path: '/visualizer/stack/peek' },
        { name: 'Is Empty', path: '/visualizer/stack/isempty' },
      ],
    },
    {
      title: 'Queue',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
      items: [
        { name: 'Enqueue & Dequeue', path: '/visualizer/queue/enqueue-dequeue' },
        { name: 'Peek Front', path: '/visualizer/queue/peek-front' },
        { name: 'Is Empty', path: '/visualizer/queue/isempty' },
      ],
    },
    {
      title: 'Linked List',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l7 7-7 7" />
        </svg>
      ),
      subsections: [
        {
          title: 'Types',
          items: [
            { name: 'Singly Linked List', path: '/visualizer/linkedList/types/singly' },
            { name: 'Doubly Linked List', path: '/visualizer/linkedList/types/doubly' },
            { name: 'Circular Linked List', path: '/visualizer/linkedlist/types/circular' },
          ],
        },
        {
          title: 'Operations',
          items: [
            { name: 'Insertion', path: '/visualizer/linkedlist/operations/insertion' },
            { name: 'Deletion', path: '/visualizer/linkedlist/operations/deletion' },
            { name: 'Finding an Element', path: '/visualizer/linkedlist/operations/search' },
            { name: 'Merging Two Lists', path: '/visualizer/linkedlist/operations/merge' },
            { name: 'Comparison', path: '/visualizer/linkedlist/operations/comparison' },
          ],
        },
      ],
    },
    {
      title: 'Tree',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h6m-6 4h6m0-8h6m6 0h-6m6 4h-6m-6-8v12m6-12v12" />
        </svg>
      ),
      subsections: [
        {
          title: 'Traversal',
          items: [
            { name: 'Pre-order Traversal', path: '/visualizer/trees/traversing/pre-order' },
            { name: 'In-order Traversal', path: '/visualizer/trees/traversing/in-order' },
            { name: 'Post-order Traversal', path: '/visualizer/trees/traversing/post-order' },
          ],
        },
        {
          title: 'Sorting',
          items: [
            { name: 'Heap Sort', path: '/visualizer/trees/sorting/heapsort' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200 flex flex-col">
      <Navbar />
      <div className="fixed inset-0 dotted-background pointer-events-none z-0"></div>
      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-16 min-h-[calc(100vh-80px)] flex-grow relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Algorithm <span className="text-blue-600 dark:text-blue-500">Visualizer</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Interactive visual representations of computer science concepts
          </p>
        </div>
        <div className="max-w-6xl mx-auto space-y-8">
          {sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-[0_0_0_2px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_0_2px_rgba(99,102,241,0.5)] hover:-translate-y-1"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center bg-gray-50 dark:bg-gray-700/50">
                <div className="text-blue-600 dark:text-blue-400 mr-3">{section.icon}</div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
              </div>
              <div className="p-6">
                {section.subsections ? (
                  <div className="space-y-8">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">{subsection.title}</h3>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                          {subsection.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              href={item.path}
                              className="group/item block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-800 dark:text-gray-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                  {item.name}
                                </span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-400 group-hover/item:text-blue-500 transition-colors"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.path}
                        className="group/item block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-800 dark:text-gray-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                            {item.name}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400 group-hover/item:text-blue-500 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <div className="bg-black w-full relative z-10">
        <div className="bg-gray-700 z-10 h-[1px]"></div>
        <Footer />
      </div>
    </div>
  );
};

export default Visualizer;