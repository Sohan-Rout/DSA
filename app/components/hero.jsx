'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  const handleStartVisualizing = () => {
    router.push("/visualizer");
  }

  const name = [
    { name : 'Sohan' },
    { name : 'Johan' },
    { name : 'Lorem' },
  ];

  // Function to generate initials from name
  const getInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-950/95 dark:to-black text-gray-900 dark:text-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 dotted-background"></div>
      </div>

      <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
              Master DSA
            </span><br />
            Through Interactive Visualizations
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
            Unlock complex data structures and algorithms with our dynamic, hands-on visualizer. Perfect for students, developers, and coding enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={handleStartVisualizing}
              className="relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Visualizing Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            <a
              href="#features"
              className="px-8 py-4 border border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              Explore Features
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {name.map((item, index) => (
                  <div key={index} className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {getInitials(item.name)}
                  </div>
                ))}
              </div>
              <span>1,000+ Active Learners</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.45/5 (200+ Reviews)</span>
            </div>
          </div>
        </div>

        {/* Visual Element - Rotating Cube (same layout, updated content) */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 perspective-1000 flex items-center justify-center">
            {/* Cube Container */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 animate-spin3d preserve-3d">
              {/* Cube Faces with DSA content */}
              <div className="absolute w-full h-full bg-white/75 dark:bg-gray-900/75 border border-gray-600 transform translate-z flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="text-blue-600 dark:text-blue-100 text-xl font-bold mb-2">Linked List</div>
                  <div className="flex justify-center">
                    {['A', 'B', 'C', 'D'].map((item, i) => (
                      <div key={i} className="relative">
                        <div className="w-8 h-8 bg-white/90 dark:bg-blue-900/80 rounded flex items-center justify-center border border-blue-200 text-sm">
                          {item}
                        </div>
                        {i < 3 && (
                          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-blue-600"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute w-full h-full bg-white/75 dark:bg-gray-900/75 border border-gray-600 transform rotate-y-90 translate-z flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="text-blue-600 dark:text-blue-100 text-xl font-bold mb-2">Binary Tree</div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-white/90 dark:bg-blue-900/80 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700 mb-2">
                      R
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-4 bg-blue-600 dark:bg-blue-400"></div>
                        <div className="w-6 h-6 bg-white/90 dark:bg-blue-900/80 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700 text-xs">
                          L
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-4 bg-blue-600 dark:bg-blue-400"></div>
                        <div className="w-6 h-6 bg-white/90 dark:bg-blue-900/80 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700 text-xs">
                          R
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-full h-full bg-white/75 dark:bg-gray-900/75 border border-gray-600 transform rotate-y-180 translate-z flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="text-blue-600 dark:text-blue-100 text-xl font-bold mb-2">Sorting</div>
                  <div className="flex items-end justify-center h-16 gap-1">
                    {[3, 6, 2, 8, 5, 7, 1, 4].map((height, i) => (
                      <div 
                        key={i}
                        className="w-2 bg-gradient-to-t from-white to-blue-100 dark:from-blue-400 dark:to-blue-600 rounded-t-sm"
                        style={{ height: `${height * 6}px` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute w-full h-full bg-white/75 dark:bg-gray-900/75 border border-gray-600 transform rotate-y-270 translate-z flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="text-blue-600 dark:text-blue-100 text-xl font-bold mb-2">Graph</div>
                  <div className="relative w-24 h-24 mx-auto">
                    {['A', 'B', 'C', 'D'].map((node, i) => (
                      <div 
                        key={i}
                        className="absolute w-6 h-6 bg-white/90 dark:bg-blue-900/80 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700 text-xs"
                        style={{
                          top: `${Math.sin(i * Math.PI/2) * 30 + 50}%`,
                          left: `${Math.cos(i * Math.PI/2) * 30 + 50}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {node}
                      </div>
                    ))}
                    {[[0,1], [1,2], [2,3], [3,0], [0,2]].map(([from, to], i) => (
                      <div 
                        key={i}
                        className="absolute w-full h-full top-0 left-0"
                        style={{
                          '--from-x': `${Math.cos(from * Math.PI/2) * 30 + 50}%`,
                          '--from-y': `${Math.sin(from * Math.PI/2) * 30 + 50}%`,
                          '--to-x': `${Math.cos(to * Math.PI/2) * 30 + 50}%`,
                          '--to-y': `${Math.sin(to * Math.PI/2) * 30 + 50}%`,
                        }}
                      >
                        <div 
                          className="absolute w-0.5 bg-white/80 dark:bg-blue-400 origin-top-left"
                          style={{
                            top: 'var(--from-y)',
                            left: 'var(--from-x)',
                            width: 'calc(sqrt(pow(var(--to-x) - var(--from-x), 2) + pow(var(--to-y) - var(--from-y), 2))',
                            height: '2px',
                            transform: 'rotate(atan2(var(--to-y) - var(--from-y), var(--to-x) - var(--from-x)))',
                            transformOrigin: '0 0'
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute w-full h-full bg-white/75 dark:bg-gray-900/75 border border-gray-600 transform rotate-x-90 translate-z flex items-center justify-center">
                <div className="text-blue-600 dark:text-blue-100 text-xl font-bold">DSA Visualizer</div>
              </div>
              <div className="absolute w-full h-full bg-white/75 dark:bg-gray-900/75 border border-gray-600 transform rotate-x-270 translate-z flex items-center justify-center">
                <div className="text-blue-600 dark:text-blue-100 text-xl font-bold">Interactive</div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </section>
  );
};

export default HeroSection;