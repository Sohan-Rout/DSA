import Animation from "@/app/visualizer/trees/advanced/fenwick-tree/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/advanced/fenwick-tree/quiz";
import Content from "@/app/visualizer/trees/advanced/fenwick-tree/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Fenwick Tree (Binary Indexed Tree) | Update & Query Animation and Explanation",
  description:
    "Learn how a Fenwick Tree (Binary Indexed Tree) answers prefix and range sum queries with fast point updates using just one array and the lowbit trick, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Fenwick Tree",
    "Binary Indexed Tree",
    "BIT Data Structure",
    "Fenwick Tree Update",
    "Fenwick Tree Query",
    "Prefix Sum Query",
    "Range Sum Query",
    "Fenwick Tree vs Segment Tree",
    "Fenwick Tree Visualization",
    "Fenwick Tree in JavaScript",
    "Fenwick Tree in C",
    "Fenwick Tree in Python",
    "Fenwick Tree in Java",
    "Advanced Trees",
    "DSA Trees",
    "Tree Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Fenwick Tree (Binary Indexed Tree) Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Fenwick Tree", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Advanced Trees" title="Fenwick Tree (BIT)" paths={paths} />
          <Content />
        </section>

        <section className="px-6">
          <Animation />
        </section>

        <section className="px-6">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />
        </section>

        <section className="px-6">
          <CodeBlock title="Fenwick Tree Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.fenwickTree}
            title="Fenwick Tree (BIT)"
            description="Mark Fenwick Tree (BIT) as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Segment Tree", url: "./segment-trees" },
              { text: "B-Tree", url: "./b-trees" },
              { text: "Trie (Prefix Tree)", url: "./prefix-tree" },
              { text: "Red-Black Tree", url: "./red-black" },
              { text: "AVL Balancing", url: "../bst/avl" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
