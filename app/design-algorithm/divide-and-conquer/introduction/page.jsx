import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Content from "./content";

export const metadata = {
  alternates: {
    canonical: "/design-algorithm/divide-and-conquer/introduction",
  },
  title: "Divide and Conquer: Introduction with Examples",
  description:
    "Learn the divide and conquer algorithm design paradigm: the divide, conquer and combine steps, the general template, how it produces the recurrence T(n) = aT(n/b) + f(n), worked examples including merge sort, binary search and maximum subarray, and how it differs from dynamic programming and greedy algorithms.",
  keywords: [
    "Divide and Conquer",
    "Divide and Conquer Algorithm",
    "Divide Conquer Combine",
    "Divide and Conquer Examples",
    "Divide and Conquer vs Dynamic Programming",
    "Algorithm Design Paradigm",
    "Merge Sort Divide and Conquer",
    "Binary Search Divide and Conquer",
    "Maximum Subarray Divide and Conquer",
    "Karatsuba Multiplication",
    "Strassen Matrix Multiplication",
    "Recurrence Relation",
    "Master Theorem",
    "Decrease and Conquer",
    "Design and Analysis of Algorithms",
    "DAA Divide and Conquer",
    "Time Complexity of Recursive Algorithms",
    "DSA Interview Preparation",
  ],
  robots: "index, follow",
};

// FAQ answers mirror the "Frequently Asked Questions" section in content.jsx.
// Keep the two in sync: structured data that does not match the visible page
// is a manual-action risk.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is divide and conquer in simple terms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is a problem-solving strategy with three steps: break a problem into smaller versions of the same problem, solve those recursively, and combine their answers into the answer for the original. Merge sort is the standard example: sort the left half, sort the right half, then merge the two sorted halves.",
      },
    },
    {
      "@type": "Question",
      name: "What are the three steps of divide and conquer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Divide, conquer and combine. Divide splits the input into smaller instances of the same problem. Conquer solves those instances recursively, stopping at a base case small enough to answer directly. Combine merges the subproblem answers into the final result.",
      },
    },
    {
      "@type": "Question",
      name: "How is divide and conquer different from dynamic programming?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both break a problem into subproblems, but divide and conquer assumes the subproblems are independent, so each is solved once and never seen again. Dynamic programming is for overlapping subproblems, where the same subproblem appears many times, so the answers are stored and reused instead of recomputed.",
      },
    },
    {
      "@type": "Question",
      name: "Why is divide and conquer often faster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because the work drops off quickly as you descend. If each level either discards part of the input (binary search) or does only linear work while the sizes halve (merge sort), the total is O(log n) or O(n log n) rather than O(n) or O(n squared). The gain comes from the shape of the recursion, not from recursion itself.",
      },
    },
    {
      "@type": "Question",
      name: "How do you find the time complexity of a divide-and-conquer algorithm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Write its recurrence in the form T(n) = aT(n/b) + f(n), where a is the number of recursive calls, b is the factor the input shrinks by, and f(n) is the work outside the calls. Then solve it with the Master Theorem, a recursion tree, or the substitution method.",
      },
    },
    {
      "@type": "Question",
      name: "Is binary search a divide-and-conquer algorithm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It divides the sorted range in half, conquers by recursing into the half that could contain the target, and needs no combine step because the other half is discarded. Its recurrence is T(n) = T(n/2) + O(1), which solves to Theta(log n).",
      },
    },
  ],
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Design & Algorithm", href: "/design-algorithm" },
    { name: "Introduction to Divide and Conquer", href: "" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader
            category="Divide and Conquer"
            title="Introduction to Divide and Conquer"
            paths={paths}
          />
          <Content />
        </section>

        <section className="px-2">
          <CodeBlock
            title="The Template and Three Algorithms That Follow It"
            codeExamples={codeExamples}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore other topics"
            // Absolute paths: ExploreOther renders a plain <a>, so a relative
            // "../x" resolves against the parent directory and 404s.
            links={[
              { text: "Binary Search", url: "/visualizer/searching/binarysearch" },
              { text: "Merge Sort", url: "/visualizer/sorting/mergesort" },
              { text: "Quick Sort", url: "/visualizer/sorting/quicksort" },
              {
                text: "Master Theorem",
                url: "/design-algorithm/fundamentals/recurrence-relations/master-theorem",
              },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
