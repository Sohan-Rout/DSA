import Animation from "@/app/visualizer/trees/advanced/segment-trees/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/advanced/segment-trees/quiz";
import Content from "@/app/visualizer/trees/advanced/segment-trees/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Segment Trees | Range Query & Update Animation and Explanation",
  description:
    "Learn how Segment Trees answer range queries and point updates in O(log n) by caching combined results over ranges, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Segment Tree",
    "Segment Tree Range Query",
    "Segment Tree Point Update",
    "Range Sum Query",
    "Segment Tree Visualization",
    "Segment Tree vs Prefix Sum",
    "Segment Tree in JavaScript",
    "Segment Tree in C",
    "Segment Tree in Python",
    "Segment Tree in Java",
    "Advanced Trees",
    "DSA Trees",
    "Learn Trees",
    "Tree Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/trees/segmentTrees.png",
        width: 1200,
        height: 630,
        alt: "Segment Tree Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Segment Tree", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Advanced Trees" title="Segment Tree" paths={paths} />
          <Content />
        </section>

        <section className="px-2">
          <Animation />
        </section>

        <section className="px-2">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />
        </section>

        <section className="px-2">
          <CodeBlock title="Segment Tree Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.segmentTree}
            title="Segment Tree"
            description="Mark Segment Tree as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Fenwick Tree", url: "./fenwick-tree" },
              { text: "B-Tree", url: "./b-trees" },
              { text: "Trie (Prefix Tree)", url: "./prefix-tree" },
              { text: "Red-Black Tree", url: "./red-black" },
              { text: "AVL Balancing", url: "../bst/avl" },
              { text: "BST Insertion", url: "../bst/insertion" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
