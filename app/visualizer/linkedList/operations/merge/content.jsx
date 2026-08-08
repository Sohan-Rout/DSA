"use client";
import { useEffect, useState } from "react";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";
const Content = () => {

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateTheme = () => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
    };

    updateTheme();

    window.addEventListener("storage", updateTheme);
    window.addEventListener("themeChange", updateTheme);

    return () => {
      window.removeEventListener("storage", updateTheme);
      window.removeEventListener("themeChange", updateTheme);
    };
  }, []);

  const overview = [
    `Merging two linked lists means weaving their nodes together into a single ordered chain. The common technique is a two-pointer walk: look at both current heads, pick whichever is smaller, attach it to the result, and move that pointer forward.`,
    `This trick only pays off when both lists were already sorted going in — you end up with a fully sorted merged list without ever needing to run a separate sort afterward.`
  ];

  const mergeSteps = [
    { step: "Create a dummy node to act as the starting point of the merged list" },
    { step: "Use a pointer (current) to track the last node in the merged list" },
    { step: "While both lists are non-empty, compare the current nodes" },
    { step: "Attach the smaller node to the merged list and move that list's pointer forward" },
    { step: "Once one list is exhausted, link the remaining part of the other list to the merged list" },
    { step: "Return the node next to dummy as the head of the merged list" }
  ];

  const edgeCases = [
    "Both lists are empty",
    "One list is empty",
    "All nodes in one list are smaller than the other",
    "Lists have overlapping values",
    "Input lists are not sorted (may result in unsorted merged list)"
  ];

  const bestPractices = [
    "Ensure both input lists are sorted before merging",
    "Always use a dummy node to simplify edge case handling",
    "Track edge conditions where one list might be empty",
    "Avoid modifying original input lists if immutability is required",
    "Consider recursive merging for a concise approach (at the cost of stack space)"
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Overview */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Merging Two Linked Lists
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            {overview.map((para, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {para}
              </p>
            ))}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Tip:</strong> Merging is efficient when input lists are already sorted and doesn’t require extra space beyond a few pointers.
              </p>
            </div>
          </div>
        </section>

        {/* Merge Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Steps to Merge</h2>
          <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
            {mergeSteps.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                {item.step}
              </li>
            ))}
          </ol>
        </section>

        {/* Edge Cases */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edge Cases</h2>
          <ul className="list-disc pl-5 space-y-2 marker:text-yellow-500 dark:marker:text-yellow-400">
            {edgeCases.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
            ))}
          </ul>
        </section>

        {/* Best Practices */}
        <section className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2 marker:text-green-500 dark:marker:text-green-400">
            {bestPractices.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
            ))}
          </ul>
        </section>

        <InContentAd />
      </article>
      <NewsletterEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;