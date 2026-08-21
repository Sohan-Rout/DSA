"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiArrowLeft, FiCheck, FiCopy, FiShare2 } from "react-icons/fi";

/**
 * Shared building blocks for every blog article, so the four posts stay one
 * design instead of four diverging copies of the same template.
 */

export const H2 = ({ children, id }) => (
  <h2
    id={id}
    className="scroll-mt-28 mt-14 mb-4 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
  >
    {children}
  </h2>
);

export const P = ({ children }) => (
  <p className="mb-5 text-[17px] leading-[1.75] text-zinc-700 dark:text-zinc-300">
    {children}
  </p>
);

// An accent rule rather than a filled slab: it emphasises without damming the read
export const Callout = ({ title, children }) => (
  <aside className="my-8 border-l-2 border-blue-500 pl-5 sm:pl-6">
    {title && (
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        {title}
      </p>
    )}
    <div className="text-[17px] leading-[1.75] text-zinc-700 dark:text-zinc-300">
      {children}
    </div>
  </aside>
);

// Sequences and grouped points read down one rail, so order stays obvious and
// nothing wraps into columns on a phone
export const Timeline = ({ items }) => (
  <ol className="relative my-8 ml-1 space-y-7 border-l border-zinc-200 dark:border-zinc-800">
    {items.map((item, index) => (
      <li key={index} className="relative ml-6">
        <span
          aria-hidden="true"
          className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-zinc-950"
        />
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
          {item.title}
        </h3>
        <p className="mt-1 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {item.description}
        </p>
      </li>
    ))}
  </ol>
);

export const CheckList = ({ items }) => (
  <ul className="my-6 space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex gap-3">
        <FiCheck
          aria-hidden="true"
          className="mt-1 h-4 w-4 shrink-0 text-blue-500"
        />
        <span className="text-[17px] leading-[1.7] text-zinc-700 dark:text-zinc-300">
          {item}
        </span>
      </li>
    ))}
  </ul>
);

export const BulletList = ({ items }) => (
  <ul className="my-6 space-y-3">
    {items.map((item, index) => (
      <li
        key={index}
        className="flex gap-3 text-[17px] leading-[1.7] text-zinc-700 dark:text-zinc-300"
      >
        <span
          aria-hidden="true"
          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700"
        />
        {item}
      </li>
    ))}
  </ul>
);

// table-fixed so it shrinks to fit a phone instead of scrolling sideways
export const DataTable = ({ columns, rows }) => (
  <div className="my-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
    <table className="w-full table-fixed text-left text-sm">
      <thead className="bg-zinc-50 dark:bg-zinc-900">
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="px-3 sm:px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={`px-3 sm:px-4 py-3 break-words ${
                  cellIndex === 0
                    ? "font-medium text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const FigureCard = ({ title, description, note, image }) => (
  <figure className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
    {image && (
      <div className="relative h-32 bg-zinc-50 dark:bg-zinc-900 p-4">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 640px) 360px, 100vw"
          className="object-contain p-4"
        />
      </div>
    )}
    <figcaption className="border-t border-zinc-200 dark:border-zinc-800 p-4">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mt-1 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      {note && (
        <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">{note}</p>
      )}
    </figcaption>
  </figure>
);

export const FAQ = ({ items }) => (
  <dl className="my-6 divide-y divide-zinc-200 dark:divide-zinc-800">
    {items.map((item) => (
      <div key={item.q} className="py-5">
        <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
          {item.q}
        </dt>
        <dd className="mt-2 text-[17px] leading-[1.7] text-zinc-600 dark:text-zinc-400">
          {item.a}
        </dd>
      </div>
    ))}
  </dl>
);

/**
 * The page frame: header, hero image, body slot, and share footer.
 */
export const ArticleShell = ({
  category,
  title,
  deck,
  date,
  readTime,
  image,
  imageAlt,
  imageCaption,
  url,
  hashtags = "#DSA #Programming",
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
        return;
      } catch {
        // dismissed — fall through to copying
      }
    }
    copyLink();
  };

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(
        `Just read this insightful blog: ${title} ${hashtags}`
      )}`,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
  ];

  return (
    <article className="mx-auto max-w-3xl px-5 sm:px-6 pt-28 pb-24">
      <header>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <FiArrowLeft aria-hidden="true" />
          All articles
        </Link>

        <p className="mt-8 text-sm font-medium text-blue-600 dark:text-blue-400">
          {category}
        </p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h1>
        {deck && (
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {deck}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-zinc-200 dark:border-zinc-800 py-3">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            <span>{date}</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <button
              onClick={copyLink}
              aria-label="Copy link to this article"
              className="rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              {copied ? (
                <span className="text-blue-600 dark:text-blue-400">Copied</span>
              ) : (
                <FiCopy />
              )}
            </button>
            <button
              onClick={share}
              aria-label="Share this article"
              className="rounded-lg px-2.5 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              <FiShare2 />
            </button>
          </div>
        </div>
      </header>

      {image && (
        <figure className="my-10">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={image}
              alt={imageAlt || ""}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              priority
              className="object-cover"
            />
          </div>
          {imageCaption && (
            <figcaption className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              {imageCaption}
            </figcaption>
          )}
        </figure>
      )}

      <div>{children}</div>

      <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Share this article
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {shareLinks.map((social) => (
            <button
              key={social.name}
              onClick={() => window.open(social.url, "_blank", "noopener")}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              {social.name}
            </button>
          ))}
        </div>

        <Link
          href="/blogs"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
        >
          <FiArrowLeft aria-hidden="true" />
          Back to all articles
        </Link>
      </footer>
    </article>
  );
};
