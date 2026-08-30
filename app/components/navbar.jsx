"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from '@/app/contexts/UserContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';
import UserMenu from '@/app/components/ui/UserMenu';
import { SERVICES, ABOUT, ChevronIcon, DesktopDropdown, MobileDropdown } from '@/app/components/ui/navMenus';

// Constants for navigation links
const NAV_LINKS = [
  { href: "/#hero", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#testimonial", label: "Reviews" }
];

// Theme toggle icons
const ThemeIcons = {
  light: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
  ),
  dark: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>
  )
};

// Menu toggle icons
const MenuIcons = {
  open: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  closed: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  // Desktop and mobile render separate triggers, so they need separate state —
  // sharing one flag meant opening either also "opened" the hidden other.
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUser();
  const { theme, toggleTheme } = useTheme();

const handleLogout = async () => {
  await supabase.auth.signOut();
  setUser(null); // Correctly update the user context
  router.push('/');
};

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-[calc(100%-2rem)] mx-4 mt-4 bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-700 text-black dark:text-white z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="text-xl md:text-2xl items-center flex font-bold tracking-tight hover:text-blue-500 transition duration-300"
          onClick={closeMobileMenu}
        >
          DSA<span className="text-blue-500">Visualizer</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          {NAV_LINKS.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-sm lg:text-base hover:text-blue-400 transition duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* About Dropdown — hover-driven, so it dismisses the avatar menu
              on enter rather than stacking on top of it. */}
          <li
            className="relative group"
            onMouseEnter={() => setIsUserMenuOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm dark:text-white lg:text-base text-gray-700 hover:text-blue-500 transition-colors duration-200">
              About
              <ChevronIcon />
            </button>
            <DesktopDropdown items={ABOUT} />
          </li>

          {/* Services Dropdown */}
          <li
            className="relative group"
            onMouseEnter={() => setIsUserMenuOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm dark:text-white lg:text-base text-gray-700 hover:text-blue-500 transition-colors duration-200">
              Services
              <ChevronIcon />
            </button>
            <DesktopDropdown items={SERVICES} />
          </li>
          
          {/* User Auth Section */}
          <li>
            {user ? (
              <UserMenu
                user={user}
                open={isUserMenuOpen}
                onOpenChange={setIsUserMenuOpen}
                onLogout={handleLogout}
              />
            ) : (
              <Link
                href="/login"
                className="ml-4 px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 flex items-center gap-2"
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
                Login/Signup
              </Link>
            )}
          </li>
          
          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
              aria-label="Toggle theme"
            >
              {ThemeIcons[theme]}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? MenuIcons.open : MenuIcons.closed}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/90 dark:bg-gray-900/90 rounded-xl backdrop-blur-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-128 py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 px-6">
          {NAV_LINKS.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="block py-2 font-medium hover:text-blue-400 transition duration-300"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Mobile About Dropdown */}
          <li>
            <div>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="w-full flex justify-between items-center py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:text-blue-600"
              >
                About
                <ChevronIcon isOpen={isAboutOpen} />
              </button>
              <MobileDropdown items={ABOUT} isOpen={isAboutOpen} />
            </div>
          </li>

          {/* Mobile Services Dropdown */}
          <li>
            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full flex justify-between items-center py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:text-blue-600"
              >
                Services
                <ChevronIcon isOpen={isServicesOpen} />
              </button>
              <MobileDropdown items={SERVICES} isOpen={isServicesOpen} />
            </div>
          </li>
          
          {/* Mobile User Auth Section */}
          <li>
            {user ? (
              <UserMenu
                user={user}
                open={isMobileUserMenuOpen}
                onOpenChange={setIsMobileUserMenuOpen}
                onLogout={handleLogout}
                onNavigate={closeMobileMenu}
              />
            ) : (
              <Link
                href="/login"
                className="block w-full text-center py-2 rounded-full font-medium bg-linear-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md mt-2"
                onClick={closeMobileMenu}
              >
                Login/Signup
              </Link>
            )}
          </li>
          
          {/* Mobile Theme Toggle */}
          <li className="pt-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 py-2 font-medium hover:text-blue-400 transition duration-300 w-full"
              aria-label="Toggle theme"
            >
              {ThemeIcons[theme]}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}