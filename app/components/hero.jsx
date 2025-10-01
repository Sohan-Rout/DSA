"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import { event } from '@/lib/gtag';

const HeroSection = () => {
  const router = useRouter();
  

  const handleStartVisualizing = () => {
    event({
      action: 'click_start_visualizing',
      category: 'Hero',
      label: 'Start Visualizing Button'
    });
    router.push("/visualizer");
  };

  const name = [{ name: "Sohan" }, { name: "Johan" }, { name: "Lorem" }];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
      <section className="min-h-screen py-10 flex items-start md:items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-900 text-gray-900 dark:text-gray-100 relative overflow-hidden">
  {/* Notification Bar */}
<div className="hidden md:block absolute mt-14 top-12 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-md px-4">
  <div className="bg-white dark:bg-neutral-950 border border-blue-200 dark:border-blue-900 rounded-full shadow-lg py-2 px-4 flex items-center justify-between">
    <span className="text-sm font-medium text-blue-500 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-2 text-blue-500 animate-draw"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
          className="path"
        />
      </svg>
      New: New Blogs added!
    </span>
<Link href="./blogs">
  <button className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-700">
    <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-4 w-4 transform transition-transform duration-300 hover:translate-x-1"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 5l7 7-7 7"
  />
</svg>
  </button>
</Link>
  </div>
</div>

  {/* Abstract background elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
  </div>

      <div className="container top-4 mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold leading-snug md:leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
              Master DSA
            </span>
            <br />
            Through Interactive Visualization
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
            See algorithms come to life in your mind's eye before you code them.
            The way developers actually think.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={handleStartVisualizing}
              className="relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Visualizing Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {name.map((item, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold"
                  >
                    {getInitials(item.name)}
                  </div>
                ))}
              </div>
              <span>1,000+ Active Learners</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.45/5 (200+ Reviews)</span>
            </div>
          </div>
        </div>

        {/* Person image with automatic background removal effect */}
<div className="lg:w-1/2 lg:h-full flex justify-center items-center mt-10 lg:mt-0 relative">
  <div className="relative w-full h-full max-w-lg">
    <Image
      src="/GurlThinking.png"
      alt="Person thinking about algorithms"
      width={1200}
      height={1200}
      className="w-full z-20 h-full max-h-[400px] lg:max-h-[600px] object-contain drop-shadow-2xl"
      style={{
        filter: "drop-shadow(0 20px 13px rgba(0, 0, 0, 0.1))",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 98%)",
      }}
      priority
    />

    {/* Floating algorithm elements - adjusted for mobile */}
    <div className="absolute top-[15%] -right-4 w-16 h-16 lg:w-24 lg:h-24 bg-white/90 dark:bg-black rounded-full flex items-center justify-center shadow-lg animate-float border-2 border-gray-300 dark:border-blue-500">
      <div className="text-xs lg:text-base font-mono font-semibold text-center p-1 lg:p-2">
        O(1)
      </div>
    </div>

    <div className="absolute top-[40%] -right-8 w-20 h-20 lg:w-28 lg:h-28 bg-white/90 dark:bg-black rounded-full flex items-center justify-center shadow-lg animate-float animation-delay-2000 border-2 border-gray-300 dark:border-blue-500">
      <div className="text-sm lg:text-lg font-mono font-semibold text-center p-2 lg:p-3">
        <span className="text-blue-600 dark:text-blue-400">Hash</span>
        Map
      </div>
    </div>

    <div className="absolute top-[25%] z-[-1] left-[-5] w-20 h-20 lg:w-24 lg:h-24 bg-white/90 dark:bg-black rounded-full flex items-center justify-center shadow-lg animate-float animation-delay-1000 border-2 border-gray-300 dark:border-blue-500">
      <div className="text-xs lg:text-base font-mono font-semibold text-center">
        Queue
      </div>
    </div>

    {/* Additional thought bubbles - adjusted for mobile */}
    <div className="absolute z-[-1] top-[10%] left-5 w-14 h-14 lg:w-20 lg:h-20 bg-white/90 dark:bg-black rounded-full flex items-center justify-center shadow-lg animate-float animation-delay-1500 border-2 border-gray-300 dark:border-blue-500">
      <div className="text-xs lg:text-sm font-mono font-semibold text-center">
        Stack
      </div>
    </div>

    <div className="absolute top-[5%] right-12 w-14 h-14 lg:w-20 lg:h-20 bg-white/90 dark:bg-black rounded-full flex items-center justify-center shadow-lg animate-float animation-delay-2500 border-2 border-gray-300 dark:border-blue-500">
      <div className="text-xs lg:text-sm font-mono font-semibold text-center">
        Tree
      </div>
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default HeroSection;