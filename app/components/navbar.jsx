"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from '@/app/contexts/UserContext';
import { supabase } from '@/lib/supabase';

// Constants for services dropdown items
const SERVICES = [
  {
    title: "Algorithm Visualizer",
    description: "Step-by-step algorithm visualization",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
    ),
    iconBg: "bg-purple-100 text-purple-600",
    href: "/visualizer"
  },
  {
    title: "Learn CS Basics",
    description: "Foundational programming concepts",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4h9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      </svg>
    ),
    iconBg: "bg-blue-100 text-blue-600",
    href: "https://learn.dsavisualizer.in/"
  },
  {
    title: "Blogs",
    description: "Tutorials & guides on development",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
    iconBg: "bg-orange-100 text-orange-600",
    href: "/blogs"
  }
];

const ABOUT = [
  {
    title: "About Us",
    description: "Our Mission",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
    ),
    iconBg: "bg-green-100 text-green-600",
    href: "/#about"
  },
  {
    title: "FAQs",
    description: "Quick answers to common questions about our platform",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h.01M12 12a1.5 1.5 0 10-1.5-1.5m0 0A1.5 1.5 0 0112 9m0 7h.01M21 12c0 4.418-4.03 8-9 8a9.99 9.99 0 01-5.197-1.45L3 20l1.462-3.414A8.986 8.986 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
</svg>
    ),
    iconBg: "bg-blue-100 text-blue-600",
    href: "/#faq"
  },
];

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

// Chevron icon for dropdowns
const ChevronIcon = ({ isOpen = false }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Service item component for both desktop and mobile
const ServiceItem = ({ title, description, icon, iconBg, href }) => (
  <Link
    href={href}
    className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 dark:text-white hover:bg-blue-50 dark:hover:bg-zinc-900 hover:text-blue-600 dark:hover:text-blue-600 transition-colors duration-150"
  >
    <div className="flex items-center gap-3">
      <div className={`p-1.5 rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </Link>
);

// Services dropdown component for desktop
const DesktopServicesDropdown = () => (
  <div className="absolute left-0 mt-2 w-64 origin-top-right dark:bg-black dark:ring-blue-400 bg-white rounded-lg shadow-xl ring-1 ring-gray-200 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 overflow-hidden">
    <div className="py-1">
      {SERVICES.map((service, index) => (
        <ServiceItem key={index} {...service} />
      ))}
    </div>
  </div>
);

// Services dropdown component for mobile
const MobileServicesDropdown = ({ isOpen }) => (
  <div className={`${isOpen ? 'block' : 'hidden'} pl-4 space-y-1`}>
    {SERVICES.map((service, index) => (
      <ServiceItem key={index} {...service} />
    ))}
  </div>
);

// Service item component for both desktop and mobile
const AboutItem = ({ title, description, icon, iconBg, href }) => (
  <Link
    href={href}
    className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 dark:text-white hover:bg-blue-50 dark:hover:bg-zinc-900 hover:text-blue-600 dark:hover:text-blue-600 transition-colors duration-150"
  >
    <div className="flex items-center gap-3">
      <div className={`p-1.5 rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </Link>
);

// Abut dropdown component for desktop
const AboutServicesDropdown = () => (
  <div className="absolute left-0 mt-2 w-64 origin-top-right dark:bg-black dark:ring-blue-400 bg-white rounded-lg shadow-xl ring-1 ring-gray-200 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 overflow-hidden">
    <div className="py-1">
      {ABOUT.map((about, index) => (
        <AboutItem key={index} {...about} />
      ))}
    </div>
  </div>
);

// Services dropdown component for mobile
const MobileAboutDropdown = ({ isOpen }) => (
  <div className={`${isOpen ? 'block' : 'hidden'} pl-4 space-y-1`}>
    {ABOUT.map((about, index) => (
      <AboutItem key={index} {...about} />
    ))}
  </div>
);

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUser();

const handleLogout = async () => {
  await supabase.auth.signOut();
  setUser(null); // Correctly update the user context
  router.push('/');
};

  // Load theme from localStorage on mount and apply it
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    window.dispatchEvent(new Event("themeChange"));
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-[calc(100%-2rem)] mx-4 mt-4 bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-700 text-black dark:text-white z-50 transition-all duration-300 ${
        isScrolled ? "shadow-xl" : "shadow-md"
      }`}
    >
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
                className="text-sm lg:text-base font-medium hover:text-blue-400 transition duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Services Dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1 text-sm dark:text-white lg:text-base font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200">
              About
              <ChevronIcon />
            </button>
            <AboutServicesDropdown />
          </li>
          
          {/* Services Dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1 text-sm dark:text-white lg:text-base font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200">
              Services
              <ChevronIcon />
            </button>
            <DesktopServicesDropdown />
          </li>
          
          {/* User Auth Section */}
          <li>
            {user ? (
              <div className="relative">
                <img
                  src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.email)}`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-4 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md flex items-center gap-2"
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
          mobileMenuOpen ? "max-h-auto py-auto" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col space-y-15 px-6">
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
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full flex justify-between items-center py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:text-blue-600"
              >
                About
                <ChevronIcon isOpen={isServicesOpen} />
              </button>
              <MobileAboutDropdown isOpen={isServicesOpen} />
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
              <MobileServicesDropdown isOpen={isServicesOpen} />
            </div>
          </li>
          
          {/* Mobile User Auth Section */}
          <li>
            {user ? (
              <div className="relative">
                <img
                  src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.email)}`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                        closeMobileMenu();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md mt-2"
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