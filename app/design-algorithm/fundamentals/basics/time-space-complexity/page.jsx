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
    canonical: "/design-algorithm/fundamentals/basics/time-space-complexity",
  },
  title: "Time and Space Complexity — A Complete Guide with Examples",
  description:
    "A complete guide to time and space complexity: how to count operations, analyse loops and recursion, the hidden cost of the call stack, best/average/worst case, the time-space trade-off, complexity tables for common data structures and sorting algorithms, and how to pick a target complexity from the input size.",
  keywords: [
    "Time Complexity",
    "Space Complexity",
    "Time and Space Complexity",
    "Time Complexity Analysis",
    "Space Complexity Analysis",
    "How to Calculate Time Complexity",
    "Auxiliary Space",
    "Best Case Average Case Worst Case",
    "Time Complexity of Loops",
    "Time Complexity of Recursion",
    "Call Stack Space",
    "Time Space Trade-off",
    "Data Structure Time Complexity",
    "Sorting Algorithm Complexity",
    "Complexity Cheat Sheet",
    "Big O Time Complexity",
    "Algorithm Analysis",
    "Design and Analysis of Algorithms",
    "DAA Time Complexity",
    "Amortized Complexity",
    "DSA Interview Preparation",
    "Competitive Programming Constraints",
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
      name: "Is time complexity the same as running time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Running time is a measurement in seconds on one machine with one input. Time complexity is a function describing how the operation count grows as the input grows. Two programs with the same complexity can differ tenfold in seconds; the complexity still tells you which one wins as n gets large.",
      },
    },
    {
      "@type": "Question",
      name: "Which matters more, time or space?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On modern hardware, time usually matters more, because memory is comparatively cheap and plentiful. The exception is any environment with a hard memory ceiling — embedded devices, large datasets that must stay in RAM, or a competitive-programming problem with a 256 MB limit — where an O(n) algorithm that allocates O(n^2) memory simply cannot run.",
      },
    },
    {
      "@type": "Question",
      name: "Does an O(1) algorithm always beat an O(n) one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Asymptotically yes, but not necessarily at the sizes you care about. O(1) only means the cost does not grow with n; that constant could be enormous. For small inputs, a simple O(n) scan often beats a clever O(1) structure with expensive setup.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find the space complexity of a recursive function?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Take the maximum depth of the recursion tree and multiply it by the space each frame uses, then add any data structures allocated outside the recursion. Depth, not the total number of calls, is what counts — only the frames on the current path are alive at once.",
      },
    },
    {
      "@type": "Question",
      name: "What does amortized complexity mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is the average cost per operation across a long sequence of operations, rather than the cost of the worst single one. Appending to a dynamic array is O(n) on the rare resize, but O(1) amortized, because those expensive resizes are spread over many cheap appends.",
      },
    },
  ],
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Design & Algorithm", href: "/design-algorithm" },
    { name: "Time & Space Complexity", href: "" },
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
            title="Time & Space Complexity"
            paths={paths}
          />
          <Content />
        </section>

        <section className="px-2">
          <CodeBlock
            title="Complexity in Practice — Two Solutions, Two Trade-offs"
            codeExamples={codeExamples}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore other topics"
            links={[
              { text: "Asymptotic Notation", url: "../asymptotic-notation" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
