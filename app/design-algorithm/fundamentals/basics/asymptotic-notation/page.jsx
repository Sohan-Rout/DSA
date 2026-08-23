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
    canonical: "/design-algorithm/fundamentals/basics/asymptotic-notation",
  },
  title: "Asymptotic Notation — Big-O, Big-Ω and Big-Θ Explained",
  description:
    "Understand asymptotic notation from the ground up: the formal definitions of Big-O, Big-Omega and Big-Theta, how little-o and little-omega differ, the common growth rates from O(1) to O(n!), the rules for simplifying an operation count, and the mistakes to avoid. Part of the Design & Analysis of Algorithms series.",
  keywords: [
    "Asymptotic Notation",
    "Asymptotic Analysis",
    "Big O Notation",
    "Big O Notation Explained",
    "Big Omega Notation",
    "Big Theta Notation",
    "Little o Notation",
    "Little omega Notation",
    "Upper Bound Algorithm",
    "Lower Bound Algorithm",
    "Tight Bound Algorithm",
    "Growth Rate of Algorithms",
    "Order of Growth",
    "Algorithm Analysis",
    "Design and Analysis of Algorithms",
    "DAA Asymptotic Notation",
    "Time Complexity Notation",
    "Asymptotic Notation for Beginners",
    "Asymptotic Notation Examples",
    "Big O vs Big Theta",
    "Common Time Complexities",
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
      name: "What is the difference between Big-O and Big-Theta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Big-O is only a ceiling: it says the algorithm grows no faster than the given function, so an O(n) algorithm is technically also O(n^2). Big-Theta is a two-sided claim — the function is both an upper and a lower bound — so it pins the growth rate exactly. Theta is the stronger statement, and you can only make it when the best and worst cases share the same growth.",
      },
    },
    {
      "@type": "Question",
      name: "Why do we ignore constants and lower-order terms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because they stop mattering as n grows. In 3n^2 + 5n + 7, the quadratic term accounts for 84% of the total at n = 10 and over 99.9% at n = 10,000. The constant 3 depends on your language and hardware anyway, so keeping it would make the answer machine-specific — exactly what asymptotic notation exists to avoid.",
      },
    },
    {
      "@type": "Question",
      name: "Is Big-O the same thing as the worst case?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, though they are quoted together so often that they get confused. Big-O describes a kind of bound; best, average and worst describe which input you are analysing. You can state a Big-O bound on the best case, and it is perfectly valid to say that linear search is O(1) in the best case and O(n) in the worst.",
      },
    },
    {
      "@type": "Question",
      name: "Does the base of the logarithm matter in O(log n)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Changing base multiplies by a constant — log2(n) = log10(n) / log10(2) — and constants are dropped, so log2(n), log10(n) and ln(n) are all written O(log n). This is why binary search and a search that splits into ten parts have the same complexity even though one is measurably faster.",
      },
    },
    {
      "@type": "Question",
      name: "Can an algorithm be both O(n) and O(n^2)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and this is the most common source of confusion. Big-O is an upper bound, and n really does grow no faster than n^2, so the statement is true — just uselessly loose. By convention you always quote the tightest upper bound you can prove, which is why nobody writes O(n^2) for a single loop.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find the asymptotic notation of a piece of code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Count how many times the innermost, most-repeated statement runs as a function of the input size, multiplying for nested loops and adding for sequential ones. Then drop every constant factor and every term except the fastest-growing one. What remains is the notation.",
      },
    },
  ],
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Design & Algorithm", href: "/design-algorithm" },
    { name: "Asymptotic Notation", href: "" },
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
            title="Asymptotic Notation"
            paths={paths}
          />
          <Content />
        </section>

        <section className="px-2">
          <CodeBlock
            title="Reading the Notation Off the Loop Structure"
            codeExamples={codeExamples}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore other topics"
            links={[
              { text: "Time & Space Complexity", url: "../time-space-complexity" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
