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
    canonical: "/design-algorithm/fundamentals/recurrence-relations/master-theorem",
  },
  title: "Master Theorem — Solve Divide and Conquer Recurrences",
  description:
    "Learn the Master Theorem for solving divide-and-conquer recurrences of the form T(n) = aT(n/b) + f(n). Covers where the three cases come from, the watershed function, the regularity condition, worked examples for merge sort, binary search and Strassen's algorithm, and the recurrences the theorem cannot solve.",
  keywords: [
    "Master Theorem",
    "Master Method",
    "Master Theorem Examples",
    "Solve Recurrence Relations",
    "Recurrence Relation",
    "Divide and Conquer Recurrence",
    "T(n) = aT(n/b) + f(n)",
    "Master Theorem Cases",
    "Master Theorem Case 1 Case 2 Case 3",
    "Regularity Condition",
    "Watershed Function",
    "Merge Sort Recurrence",
    "Binary Search Recurrence",
    "Strassen Matrix Multiplication Complexity",
    "Recursion Tree",
    "Algorithm Analysis",
    "Design and Analysis of Algorithms",
    "DAA Master Theorem",
    "Time Complexity of Recursive Algorithms",
    "Master Theorem Limitations",
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
      name: "What is the Master Theorem used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It gives the asymptotic running time of a divide-and-conquer algorithm directly from its recurrence, without expanding a recursion tree or guessing and proving a bound. If a recurrence has the form T(n) = aT(n/b) + f(n) with constant a >= 1 and b > 1, you compare f(n) against n^(log_b a) and read the answer off one of three cases.",
      },
    },
    {
      "@type": "Question",
      name: "What do a, b and f(n) mean in the Master Theorem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "a is the number of subproblems each call creates, b is the factor by which the input size shrinks in each subproblem, and f(n) is the work done outside the recursive calls — the dividing and combining. For merge sort, a = 2, b = 2 and f(n) = n, because it makes two half-size calls and merges in linear time.",
      },
    },
    {
      "@type": "Question",
      name: "Why does merge sort come out as Theta(n log n)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For merge sort, n^(log_b a) = n^(log2 2) = n, and f(n) = n as well. Since they match, Case 2 applies and the answer is Theta(n log n). Intuitively, each level of the recursion tree costs a total of n, and there are log2(n) levels.",
      },
    },
    {
      "@type": "Question",
      name: "When does the Master Theorem not apply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When a or b is not constant, when a < 1 or b <= 1, when the subproblems have different sizes, when the input shrinks by subtraction rather than division, when f(n) differs from n^(log_b a) by less than a polynomial factor, or when the Case 3 regularity condition fails. In all of those situations use a recursion tree or the substitution method.",
      },
    },
    {
      "@type": "Question",
      name: "What is the regularity condition in the Master Theorem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It requires that a*f(n/b) <= c*f(n) for some constant c < 1 and all sufficiently large n. It says the work at each level really does shrink geometrically as you go down the tree, which is what lets the root's cost dominate the total. It holds automatically for polynomial f, so it usually needs no more than a line to check.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between the Master Theorem and the recursion tree method?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Master Theorem is a shortcut — three cases, no work, but it only fits recurrences of one exact shape. The recursion tree method is a general technique that works on any recurrence, including unequal splits and subtractive ones, at the cost of doing the summation yourself. The Master Theorem is really just the recursion tree argument, solved once in general.",
      },
    },
  ],
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Design & Algorithm", href: "/design-algorithm" },
    { name: "Master Theorem", href: "" },
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
            category="Recurrence Relations"
            title="Master Theorem"
            paths={paths}
          />
          <Content />
        </section>

        <section className="px-2">
          <CodeBlock
            title="From Code to Recurrence to Solution"
            codeExamples={codeExamples}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore other topics"
            links={[
              { text: "Substitution Method", url: "../substitution-method" },
              { text: "Recursion Tree Method", url: "../recursion-tree" },
              { text: "Asymptotic Notation", url: "../../basics/asymptotic-notation" },
              { text: "Time & Space Complexity", url: "../../basics/time-space-complexity" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
