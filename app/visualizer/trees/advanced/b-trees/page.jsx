import Animation from "@/app/visualizer/trees/advanced/b-trees/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/advanced/b-trees/quiz";
import Content from "@/app/visualizer/trees/advanced/b-trees/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/advanced/b-trees" },
  title: "B-Trees | Node Split Insertion Animation and Explanation",
  description:
    "Learn how B-Trees stay balanced by splitting full multi-key nodes, why they're the standard on-disk index structure for databases and filesystems, with an interactive insertion visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "B-Tree",
    "B Tree Insertion",
    "B Tree Node Split",
    "Self-Balancing Tree",
    "B Tree Properties",
    "B Tree Visualization",
    "Database Index Structure",
    "B Tree vs BST",
    "B Tree in JavaScript",
    "B Tree in C",
    "B Tree in Python",
    "B Tree in Java",
    "Advanced Trees",
    "DSA Trees",
    "Learn Trees",
    "Tree Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "B-Tree Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : B-Tree", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Advanced Trees" title="B-Tree" paths={paths} />
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
          <CodeBlock title="B-Tree Insertion Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.bTree}
            title="B-Tree"
            description="Mark B-Tree as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Red-Black Tree", url: "./red-black" },
              { text: "Trie (Prefix Tree)", url: "./prefix-tree" },
              { text: "Segment Tree", url: "./segment-trees" },
              { text: "Fenwick Tree", url: "./fenwick-tree" },
              { text: "AVL Balancing", url: "../bst/avl" },
              { text: "BST Insertion", url: "../bst/insertion" },
              { text: "In-order Traversal", url: "../traversal/in-order" },
              { text: "Structure & Properties", url: "../binaryTree/properties" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
