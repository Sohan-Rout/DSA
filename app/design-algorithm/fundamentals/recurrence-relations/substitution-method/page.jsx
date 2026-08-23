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
    canonical:
      "/design-algorithm/fundamentals/recurrence-relations/substitution-method",
  },
  title: "Substitution Method — Solve Recurrences by Induction",
  description:
    "Learn the substitution method for solving recurrence relations: guess the bound, then prove it by mathematical induction. Covers full worked proofs for T(n) = 2T(n/2) + n and T(n) = T(n-1) + n, matching lower bounds, why the constant must come out unchanged, strengthening the inductive hypothesis, and changing variables.",
  keywords: [
    "Substitution Method",
    "Substitution Method Recurrence",
    "Solve Recurrence Relations",
    "Recurrence Relation",
    "Mathematical Induction Algorithm Analysis",
    "Inductive Hypothesis",
    "Strengthening the Inductive Hypothesis",
    "Guess and Verify Method",
    "Prove Time Complexity",
    "Merge Sort Recurrence Proof",
    "T(n) = T(n-1) + n",
    "Change of Variables Recurrence",
    "Recursion Tree",
    "Master Theorem Alternative",
    "Algorithm Analysis",
    "Design and Analysis of Algorithms",
    "DAA Substitution Method",
    "Upper Bound Lower Bound Proof",
    "Big O Proof by Induction",
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
      name: "What is the substitution method for solving recurrences?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is a two-step technique: guess the form of the solution, then prove that guess correct by mathematical induction. You assume the bound holds for all inputs smaller than n, substitute that assumption into the recurrence, and show the same bound comes out for n itself. The name refers to substituting the inductive hypothesis into the recurrence.",
      },
    },
    {
      "@type": "Question",
      name: "When should I use substitution instead of the Master Theorem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Whenever the recurrence does not have the form T(n) = aT(n/b) + f(n) with constant a and b — unequal subproblem sizes, subtractive recurrences like T(n - 1), non-constant a — or when it falls into one of the Master Theorem's gaps. Substitution works on any recurrence; the Master Theorem is faster but far narrower.",
      },
    },
    {
      "@type": "Question",
      name: "How do I come up with the initial guess?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually from a recursion tree: sketch it, sum the levels roughly, and use that as your guess. You can also match the recurrence against a familiar one, or prove loose upper and lower bounds first and tighten from both sides. The guess does not need to be inspired — it needs to be checkable.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my substitution proof fail even though the guess is right?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Almost always because the inductive hypothesis is too weak. If the algebra leaves you at cn + 1 when you needed cn, subtract a lower-order term from the hypothesis — assume T(n) <= cn - d instead of T(n) <= cn. The stronger statement is paradoxically easier to prove, because the extra -d absorbs the leftover term.",
      },
    },
    {
      "@type": "Question",
      name: "Why can the base case start at n = 2 instead of n = 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because asymptotic notation only claims something for n >= n0, and you get to choose n0. This matters for bounds like cn log n, which equals 0 at n = 1 and so can never dominate T(1). Starting the induction at n = 2 and n = 3 is legitimate, and the recurrence never depends on T(1) once n is large enough.",
      },
    },
    {
      "@type": "Question",
      name: "Can the substitution method prove a lower bound as well?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The structure is identical, with <= replaced by >= throughout, and the constant chosen small enough rather than large enough. To establish Theta you prove both directions — an O bound and an Omega bound with the same function.",
      },
    },
  ],
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Design & Algorithm", href: "/design-algorithm" },
    { name: "Substitution Method", href: "" },
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
            title="Substitution Method"
            paths={paths}
          />
          <Content />
        </section>

        <section className="px-2">
          <CodeBlock
            title="Sanity-Checking a Guess Before You Prove It"
            codeExamples={codeExamples}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore other topics"
            links={[
              { text: "Master Theorem", url: "../master-theorem" },
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
