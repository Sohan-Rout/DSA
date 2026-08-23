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
    canonical: "/design-algorithm/fundamentals/recurrence-relations/recursion-tree",
  },
  title: "Recursion Tree Method — Solve Recurrences by Summing Levels",
  description:
    "Learn the recursion tree method for solving recurrence relations: draw the calls as a tree, cost each level, and sum. Covers the anatomy of a tree, worked examples for T(n) = 2T(n/2) + n, 3T(n/4) + n², the unequal split T(n/3) + T(2n/3) + n, and the Master Theorem gap case 2T(n/2) + n/log n.",
  keywords: [
    "Recursion Tree Method",
    "Recursion Tree",
    "Solve Recurrence Relations",
    "Recurrence Relation",
    "Recursion Tree Examples",
    "Level Cost Recursion Tree",
    "Depth of Recursion Tree",
    "Number of Leaves Recursion Tree",
    "Unequal Subproblems Recurrence",
    "T(n/3) + T(2n/3) + n",
    "Geometric Series Recurrence",
    "Master Theorem Gap Case",
    "n log log n",
    "Merge Sort Recursion Tree",
    "Quick Sort Unbalanced Partition",
    "Algorithm Analysis",
    "Design and Analysis of Algorithms",
    "DAA Recursion Tree",
    "Time Complexity of Recursive Algorithms",
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
      name: "What is the recursion tree method?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is a technique for solving a recurrence by drawing the recursion as a tree, where each node holds the non-recursive cost of one call and its children are the subproblems it creates. You compute what each level of the tree costs, work out how deep the tree goes, and add the levels up. The total is the solution to the recurrence.",
      },
    },
    {
      "@type": "Question",
      name: "Is a recursion tree a proof?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not on its own. Drawing a few levels and extending the pattern with an ellipsis is an informal argument, not a rigorous one. Standard practice is to use the tree to find the answer and then confirm it with the substitution method, which supplies the induction the drawing lacks.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find the depth of a recursion tree?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ask how many times the input must shrink before it reaches the base case. If each level divides by b, the depth is log_b n. If each level subtracts a constant, the depth is proportional to n. Getting this wrong is the most common source of an incorrect answer, since the depth multiplies everything.",
      },
    },
    {
      "@type": "Question",
      name: "How many leaves does a recursion tree have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If every node has a children and the depth is log_b n, the leaf count is a^(log_b n), which equals n^(log_b a). That expression is exactly the watershed function from the Master Theorem, because the two methods are measuring the same thing: the total cost sitting at the bottom of the tree.",
      },
    },
    {
      "@type": "Question",
      name: "When is a recursion tree better than the Master Theorem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Whenever the Master Theorem does not apply — unequal subproblem sizes such as T(n/3) + T(2n/3), subtractive recurrences such as T(n - 1), or recurrences that fall into the theorem's gaps like T(n) = 2T(n/2) + n/log n. The tree handles all of these, because it makes no assumption about the shape of the recurrence.",
      },
    },
    {
      "@type": "Question",
      name: "What do the three recursion tree shapes mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If level costs decrease geometrically, the root dominates and the answer is Theta(f(n)). If every level costs the same, the answer is that cost times the depth. If level costs increase, the leaves dominate and the answer is Theta(n^(log_b a)). Those three shapes are precisely the three cases of the Master Theorem, seen from the other side.",
      },
    },
  ],
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Design & Algorithm", href: "/design-algorithm" },
    { name: "Recursion Tree Method", href: "" },
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
            title="Recursion Tree Method"
            paths={paths}
          />
          <Content />
        </section>

        <section className="px-2">
          <CodeBlock
            title="Summing the Levels in Code"
            codeExamples={codeExamples}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore other topics"
            links={[
              { text: "Master Theorem", url: "../master-theorem" },
              { text: "Substitution Method", url: "../substitution-method" },
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
