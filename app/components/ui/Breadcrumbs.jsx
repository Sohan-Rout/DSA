"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Breadcrumbs({ paths }) {
  return (
    <nav className="flex flex-wrap items-center gap-y-1 text-sm text-gray-600 dark:text-gray-300" aria-label="Breadcrumb">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center">
          <Link
            href={path.href}
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            {path.name}
          </Link>
          {index !== paths.length - 1 && (
            <ChevronRight className="mx-1.5 sm:mx-2 h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
          )}
        </div>
      ))}
    </nav>
  );
}