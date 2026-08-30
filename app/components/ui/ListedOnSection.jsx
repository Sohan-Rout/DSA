"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { LISTINGS } from "@/app/components/ui/FeaturedOn";

/**
 * Full "We're listed on" section for the About page — the directory listings
 * with their verification links, rendered from the same LISTINGS array the
 * hero and footer pills use.
 *
 * Card styling mirrors InfoContent's article so the two read as one column.
 */
export default function ListedOnSection({ className = "" }) {
  return (
    <section
      aria-labelledby="listed-on-heading"
      className={`mx-auto max-w-3xl ${className}`}
    >
      <h2
        id="listed-on-heading"
        className="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
      >
        We&rsquo;re listed on
      </h2>

      {/* divide-* draws the separator only *between* items, so the rule count
          stays correct however many listings the array grows to. It runs
          horizontally when the row stacks on narrow screens. */}
      <ul className="grid divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white sm:grid-flow-col sm:auto-cols-fr sm:divide-x sm:divide-y-0 dark:divide-gray-700 dark:border-gray-700 dark:bg-neutral-950">
        {LISTINGS.map(({ name, href, Mark }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-center gap-3 p-5 transition-colors duration-150 hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none dark:hover:bg-neutral-900 dark:focus-visible:bg-neutral-900"
            >
              <Mark className="h-9 w-9 shrink-0 text-gray-900 dark:text-white" />
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-gray-900 dark:text-white">
                  {name}
                </span>
                <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                  View our listing
                </span>
              </span>
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="shrink-0 text-gray-400 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-gray-500"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
