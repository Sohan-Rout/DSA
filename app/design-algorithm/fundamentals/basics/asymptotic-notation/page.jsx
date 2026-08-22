import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
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

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Design & Algorithm", href: "/design-algorithm" },
    { name: "Asymptotic Notation", href: "" },
  ];

  return (
    <>
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
          <ExploreOther
            title="Explore other topics"
            links={[
              { text: "Time & Space Complexity", url: "../complexity" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
