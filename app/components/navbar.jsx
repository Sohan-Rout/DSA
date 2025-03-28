// components/Navbar.js
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on mount and apply it
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="w-full bg-white/30 dark:bg-black text-black dark:text-white py-4 px-6 fixed top-0 left-0 z-50 shadow-lg transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold tracking-tight hover:text-blue-400 transition duration-300"
        >
          DSA<span className="text-blue-500">Visualizer</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 md:space-x-8 items-center">
          <li>
            <Link href="/" className="text-sm md:text-base font-medium hover:text-blue-400 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/features" className="text-sm md:text-base font-medium hover:text-blue-400 transition duration-300">
              Features
            </Link>
          </li>
          <li>
            <Link href="/features" className="text-sm md:text-base font-medium hover:text-blue-400 transition duration-300">
              Prices
            </Link>
          </li>
          <li>
            <Link href="/visualizer" className="text-sm md:text-base font-medium hover:text-blue-400 transition duration-300">
              Visualizer
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-sm md:text-base font-medium hover:text-blue-400 transition duration-300">
              About
            </Link>
          </li>
          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}