"use client";

import React from "react";

/**
 * Compact "Listed on" pill for the hero CTA row.
 *
 * Logos rather than vendors' full badges: badges don't compose — five of them
 * is a wall — whereas marks stay legible in a row for as long as the list
 * grows. Adding a directory is one entry in LISTINGS.
 *
 * The marks are drawn as inline SVG instead of the vendors' PNGs because both
 * ship with an opaque background (white for Product Hunt, pale blue for
 * LaunchBuff) that reads as a visible tile in dark mode. Neutral parts use
 * currentColor so they invert with the theme; brand colours stay fixed.
 *
 * `variant="onDark"` is for the footer, which is hard-coded `bg-black` in both
 * themes — the token palette would paint a white card on it.
 */

const ProductHuntMark = (props) => (
  <svg viewBox="0 0 24 24" role="img" aria-label="Product Hunt" {...props}>
    <circle cx="12" cy="12" r="12" fill="#DA552F" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M9.2 6.4h4A3.4 3.4 0 0 1 13.2 13.2h-1.6v4.4H9.2Zm2.4 2.4v2.4h1.6a1.2 1.2 0 0 0 0-2.4Z"
    />
  </svg>
);

const LaunchBuffMark = (props) => (
  <svg viewBox="0 0 24 24" role="img" aria-label="LaunchBuff" {...props}>
    <rect x="3.8" y="3" width="7.5" height="18" rx="1.4" fill="currentColor" />
    <rect x="12.7" y="3" width="7.5" height="10.4" rx="1.4" fill="#ED8A0A" />
    <rect x="12.7" y="14.9" width="7.5" height="5.8" rx="1.4" fill="currentColor" />
  </svg>
);

/**
 * Single source of truth for directory listings — the hero pill, the footer
 * pill, and the About page section all render from this. Adding a directory is
 * one entry here and it appears in all three.
 */
export const LISTINGS = [
  {
    name: "Product Hunt",
    href: "https://www.producthunt.com/products/dsa-visualizer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-dsa-visualizer",
    Mark: ProductHuntMark,
  },
  {
    name: "LaunchBuff",
    href: "https://launchbuff.com/products/dsa-visualizer-znscln",
    Mark: LaunchBuffMark,
  },
];

const VARIANTS = {
  default: {
    // shadow-lg matches the primary CTA it sits beside; the tint stays neutral
    // so the pill reads as secondary next to the button's blue glow.
    shell:
      "border-line bg-card/70 shadow-lg shadow-black/5 backdrop-blur-sm dark:shadow-black/40",
    label: "text-fg-muted",
    rule: "bg-line",
    // text-fg drives the LaunchBuff mark's currentColor rectangles.
    link: "text-fg hover:bg-card-hover ring-offset-canvas",
  },
  onDark: {
    shell: "border-white/10 bg-white/5",
    label: "text-gray-400",
    rule: "bg-white/15",
    link: "text-white hover:bg-white/10 ring-offset-black",
  },
};

export default function FeaturedOn({ className = "", variant = "default" }) {
  const v = VARIANTS[variant] ?? VARIANTS.default;

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-xl border px-4 py-3 ${v.shell} ${className}`}
    >
      <span className={`text-sm font-medium whitespace-nowrap ${v.label}`}>
        Listed on
      </span>
      <span aria-hidden="true" className={`h-5 w-px ${v.rule}`} />
      <ul className="flex items-center gap-1">
        {LISTINGS.map(({ name, href, Mark }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={`DSA Visualizer on ${name}`}
              className={`flex h-8 w-8 items-center justify-center rounded-lg opacity-80 ring-offset-2 transition-all duration-150 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${v.link}`}
            >
              <Mark className="h-5 w-5" />
              <span className="sr-only">{`DSA Visualizer on ${name}`}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
