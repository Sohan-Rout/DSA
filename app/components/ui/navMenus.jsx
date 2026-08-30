"use client";

import Link from "next/link";

// Shared by the marketing navbar and the inner (learning-page) navbar so the
// two can't drift apart.

export const SERVICES = [
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
    title: "Design & Analysis of Algorithms",
    description: "Complexity analysis and algorithm design techniques",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18"></path>
        <path d="M7 15l4-5 3 3 5-7"></path>
      </svg>
    ),
    iconBg: "bg-blue-100 text-blue-600",
    href: "/design-algorithm"
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

export const ABOUT = [
  {
    title: "About Us",
    description: "Our Mission",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    iconBg: "bg-green-100 text-green-600",
    href: "/about"
  },
  {
    title: "Contact Us",
    description: "Report a bug, suggest a module, or ask a question",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: "bg-amber-100 text-amber-600",
    href: "/contact"
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

export const ChevronIcon = ({ isOpen = false }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const DropdownItem = ({ title, description, icon, iconBg, href, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center justify-between gap-2 px-4 py-3 text-sm text-fg transition-colors duration-150 hover:bg-card-hover focus-visible:bg-card-hover focus-visible:outline-none"
  >
    <span className="flex items-center gap-3">
      <span className={`shrink-0 rounded-lg p-1.5 ${iconBg}`}>{icon}</span>
      <span>
        <span className="block font-medium">{title}</span>
        <span className="block text-xs text-fg-muted">{description}</span>
      </span>
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0 text-fg-subtle"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </Link>
);

/**
 * Hover/focus-triggered desktop panel. The `pt-2` lives on the positioned
 * wrapper rather than as a margin on the panel, so the gap between trigger and
 * menu stays inside the hover target — a margin there drops the hover mid-move.
 */
export const DesktopDropdown = ({ items }) => (
  <div className="invisible absolute top-full left-0 z-20 w-64 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
    <div className="overflow-hidden rounded-lg border border-line bg-card shadow-xl">
      {items.map((item) => (
        <DropdownItem key={item.href} {...item} />
      ))}
    </div>
  </div>
);

export const MobileDropdown = ({ items, isOpen, onItemClick }) => (
  <div className={`${isOpen ? "block" : "hidden"} space-y-1 pl-4`}>
    {items.map((item) => (
      <DropdownItem key={item.href} {...item} onClick={onItemClick} />
    ))}
  </div>
);
