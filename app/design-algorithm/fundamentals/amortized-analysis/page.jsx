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
    canonical: "/design-algorithm/fundamentals/amortized-analysis",
  },
  title: "Amortized Analysis — Aggregate, Accounting and Potential Methods",
  description:
    "Learn amortized analysis: why an occasional expensive operation does not make a data structure slow. Covers the dynamic array doubling argument, the binary counter, all three methods (aggregate, accounting, potential), how amortized differs from average-case, and when an amortized bound is not good enough.",
  keywords: [
    "Amortized Analysis",
    "Amortized Time Complexity",
    "Aggregate Analysis",
    "Accounting Method",
    "Banker's Method",
    "Potential Method",
    "Potential Function",
    "Amortized vs Average Case",
    "Dynamic Array Doubling",
    "Dynamic Array Amortized O(1)",
    "Binary Counter Increment",
    "Stack Multipop",
    "Union Find Inverse Ackermann",
    "Splay Tree Amortized",
    "Fibonacci Heap",
    "Hash Table Rehashing",
    "Algorithm Analysis",
    "Design and Analysis of Algorithms",
    "DAA Amortized Analysis",
    "Tail Latency",
    "DSA Interview Preparation",
  ],
  robots: "index, follow",
};

// FAQ answers mirror the "Frequently Asked Questions" section in content.jsx.
// Keep the two in sync — structured data that does not match the visible page
// is a manual-action risk.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is amortized analysis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is a way of measuring the cost of an operation by averaging it over a worst-case sequence of operations, rather than looking at a single operation in isolation. It is used when an occasional expensive operation is guaranteed to be paid for by many cheap ones — like appending to a dynamic array, where the rare resize is offset by all the appends that fit without resizing.",
      },
    },
    {
      "@type": "Question",
      name: "Is amortized analysis the same as average-case analysis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, and this is the most common confusion. Average-case analysis assumes a probability distribution over inputs and tells you what happens typically. Amortized analysis involves no probability at all: it is a worst-case guarantee about the total cost of a sequence. No adversarial input can make n appends to a dynamic array cost more than O(n) overall.",
      },
    },
    {
      "@type": "Question",
      name: "Why is appending to a dynamic array O(1) amortized?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When the array is full it allocates a buffer of double the size and copies everything across, which costs Theta(n). But doubling means the next resize is twice as far away. Over n appends the copies total 1 + 2 + 4 + ... + n, which is less than 2n, so the whole sequence costs O(n) and each append averages O(1).",
      },
    },
    {
      "@type": "Question",
      name: "What are the three methods of amortized analysis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aggregate analysis totals the cost of n operations and divides by n. The accounting method assigns each operation an amortized charge, banking the surplus from cheap operations as credit to pay for expensive ones. The potential method defines a function Phi over the data structure's state, with the amortized cost being the actual cost plus the change in Phi. All three give the same answers; they differ in convenience.",
      },
    },
    {
      "@type": "Question",
      name: "What is the potential method in amortized analysis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You define a potential function Phi that maps the data structure's state to a number representing stored-up work. The amortized cost of an operation is its actual cost plus Phi(after) minus Phi(before). Because the Phi terms telescope across a sequence, the total amortized cost bounds the total actual cost whenever Phi never drops below its starting value.",
      },
    },
    {
      "@type": "Question",
      name: "When is an amortized bound not good enough?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When any individual operation being slow is unacceptable. Real-time systems, safety-critical controllers and latency-sensitive services all care about the worst single operation, not the average across a sequence — a resize that stalls one request in a thousand still shows up as a p99 latency spike even though the amortized cost is O(1).",
      },
    },
  ],
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Design & Algorithm", href: "/design-algorithm" },
    { name: "Amortized Analysis", href: "" },
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
            category="Fundamentals"
            title="Amortized Analysis"
            paths={paths}
          />
          <Content />
        </section>

        <section className="px-2">
          <CodeBlock
            title="Measuring the Amortized Cost Yourself"
            codeExamples={codeExamples}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore other topics"
            links={[
              { text: "Time & Space Complexity", url: "../basics/time-space-complexity" },
              { text: "Asymptotic Notation", url: "../basics/asymptotic-notation" },
              { text: "Master Theorem", url: "../recurrence-relations/master-theorem" },
              { text: "Recursion Tree Method", url: "../recurrence-relations/recursion-tree" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
