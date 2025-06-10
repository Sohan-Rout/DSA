'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/contexts/UserContext';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUser();

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="fixed w-[calc(100%-2rem)] mx-4 mt-4 bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-700 text-black dark:text-white z-50 shadow-lg transition-all duration-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo/Brand */}
          <Link
            href="/visualizer"
            className="text-xl md:text-2xl flex items-center font-bold tracking-tight hover:text-blue-500 transition duration-300"
          >
            DSA<span className="text-blue-500">Visualizer</span>
          </Link>

          {/* Hamburger Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/blogs"
              className="relative pr-2 py-2 font-medium text-black dark:text-white bg-transparent overflow-hidden items-center transition-all duration-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <span className="z-[1] flex items-center gap-2">
                Blogs
              </span>
            </Link>
            <Link
              href="https://learn.dsavisualizer.in/"
              className="relative pr-2 py-2 font-medium text-black dark:text-white bg-transparent overflow-hidden items-center transition-all duration-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <span className="z-[1] flex items-center gap-2">
                Start with Basics
              </span>
            </Link>
            {user ? (
              <>
                <span className="text-green-600 font-medium">
                  Welcome, {user.email.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md items-center gap-2 flex"
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
            )}
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-2 animate-fade-in-down">
            <Link
              href="/blogs"
              onClick={closeMenu}
              className="px-4 py-2 rounded font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Blogs
            </Link>
            <Link
              href="https://learn.dsavisualizer.in/"
              onClick={closeMenu}
              className="px-4 py-2 rounded font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Start with Basics
            </Link>
            {user ? (
              <>
                <span className="text-green-600 font-medium px-4 py-2">
                  Welcome, {user.email.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md flex items-center gap-2"
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
            )}
            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                closeMenu();
              }}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 self-start flex items-center gap-2"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <>
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
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
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
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        )}
      </nav>
    </>
  );
}