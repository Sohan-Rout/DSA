import React from 'react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import VisualizerClient from './VisualizerClient';

export const metadata = {
  title: 'Algorithm Visualizer | DSA Visualizer',
  description: 'Explore visual representations and source code for various DSA algorithms including searching, sorting, stacks, queues, trees, and stack-based expression evaluation like Polish Notation using arrays and linked lists. Interactive and beginner-friendly!',
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
    'Circular Linked List',
    'Prefix Notation',
    'Postfix Notation',
    'Polish Notation',
    'Stack using Array',
    'Stack using Linked List',
    'Prefix using Stack',
    'Postfix using Stack',
    'Polish Notation Implementation',
    'Queue using Array',
    'Queue using Linked List',
    'Circular Queue',
    'Priority Queue',
    'Deque',
    'Queue Operations',
    'Code for DSA Algorithms',
    'Code for Data Structures',
    'Interactive Code Samples',
    'DSA with Code'
  ],
  robots: 'index, follow',
};

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
      subsections: [
        {
          title: 'Operations',
          items: [
            { name: 'Push & Pop', path: '/visualizer/stack/push-pop' },
            { name: 'Peek', path: '/visualizer/stack/peek' },
            { name: 'Is Empty', path: '/visualizer/stack/isempty' },
            { name: 'Is Full', path: '/visualizer/stack/isfull' },
          ],
        },
        {
          title: 'Polish Notations Evaluation',
          items: [
            { name: 'Postfix', path: '/visualizer/stack/polish/postfix' },
            { name: 'Prefix', path: '/visualizer/stack/polish/prefix' },
          ],
        },
        {
          title: 'Implementation',
          items: [
            { name: 'Using Array', path: '/visualizer/stack/implementation/usingArray' },
            { name: 'Using Linked List', path: '/visualizer/stack/implementation/usingLinkedList' },
          ],
        },
      ],
    },
    {
      title: 'Queue',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
      subsections: [
        {
          title: 'Operations',
          items: [
            { name: 'Enqueue & Dequeue', path: '/visualizer/queue/operations/enqueue-dequeue' },
            { name: 'Peek Front', path: '/visualizer/queue/operations/peek-front' },
            { name: 'Is Empty', path: '/visualizer/queue/operations/isempty' },
            { name: 'Is Full', path: '/visualizer/queue/operations/isfull' },
          ]
        },
        {
          title: 'Types',
          items: [
            { name: 'Single Ended Queue', path: '/visualizer/queue/types/singleEnded' },
            { name: 'Double Ended Queue (Deque)', path: '/visualizer/queue/types/deque' },
            { name: 'Circular Queue', path: '/visualizer/queue/types/circular' },
            { name: 'Priority Queue', path: '/visualizer/queue/types/priority' },
            { name: 'Multiple Queue', path: '/visualizer/queue/types/multiple' },
          ]
        },
        {
          title: 'Implementation',
          items: [
            { name: 'Using Array', path: '/visualizer/queue/implementation/array' },
            { name: 'Using Linked List', path: '/visualizer/queue/implementation/linkedList' },
          ]
        }
      ],
    },
    {
      title: 'Linked List',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5l7 7-7 7" />
        </svg>
      ),
      subsections: [
        {
          title: 'Types',
          items: [
            { name: 'Singly Linked List', path: '/visualizer/linkedList/types/singly' },
            { name: 'Doubly Linked List', path: '/visualizer/linkedList/types/doubly' },
            { name: 'Circular Linked List', path: '/visualizer/linkedList/types/circular' },
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

  const Visualizer = () => {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200 flex flex-col">
        <Navbar />
        <div className="fixed inset-0 dotted-background pointer-events-none z-0"></div>
        <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16 min-h-[calc(100vh-80px)] flex-grow relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Algorithm <span className="text-blue-600 dark:text-blue-500">Visualizer</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Interactive visual representations of computer science concepts
            </p>
          </div>
          
          <VisualizerClient initialSections={sections} />
        </main>
        <div className="bg-black w-full relative z-10">
          <div className="bg-gray-700 z-10 h-[1px]"></div>
          <Footer />
        </div>
      </div>
    );
  };
  
  export default Visualizer;