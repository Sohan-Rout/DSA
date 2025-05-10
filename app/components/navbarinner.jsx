'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [theme, setTheme] = useState('light');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const openAuthModal = (showLoginForm = true) => {
    setShowLogin(showLoginForm);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white dark:bg-black text-black dark:text-white py-4 px-6 fixed top-0 left-0 z-50 shadow-lg transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-xl md:text-2xl flex items-center font-bold tracking-tight hover:text-blue-500 transition duration-300"
          >
            DSA<span className="text-blue-500">Visualizer</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            {/* Premium Page */}
            <Link
              href="/premium"
              className="hidden md:flex px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-md items-center"
            >
              Premium
            </Link>

            {/* Dashboard Page */}
            <Link
              href="/dashboard"
              className="hidden md:flex px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition duration-300 shadow-md items-center"
            >
              Dashboard
            </Link>

            {/* Login/Signup Button - Desktop */}
            <Link
              href="/login"
              className="hidden md:flex px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Login / Signup
            </Link>

            {/* Mobile Login Icon */}
            <Link
              href="/login"
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
              aria-label="Login or Signup"
            >
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Theme Toggle */}
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
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Optional Auth Modal (still present, unused by nav buttons) */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 animate-fade-in">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
            >
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                {showLogin ? 'Login' : 'Sign Up'} Coming Soon!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're working hard to bring you this feature. Check back later!
              </p>
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                {showLogin ? 'Need to sign up instead?' : 'Already have an account?'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}