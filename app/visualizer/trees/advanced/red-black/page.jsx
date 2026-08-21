import Animation from "@/app/visualizer/trees/advanced/red-black/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/advanced/red-black/quiz";
import Content from "@/app/visualizer/trees/advanced/red-black/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/advanced/red-black" },
  title: "Red-Black Tree | Insertion & Rotation Animation and Explanation",
  description:
    "Learn how Red-Black Trees self-balance using color rules and rotations, with an interactive insertion visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Red-Black Tree",
    "Red Black Tree Insertion",
    "Red Black Tree Rotation",
    "Self-Balancing Binary Search Tree",
    "Red Black Tree Properties",
    "Red Black Tree Visualization",
    "Red Black Tree vs AVL",
    "Red Black Tree in JavaScript",
    "Red Black Tree in C",
    "Red Black Tree in Python",
    "Red Black Tree in Java",
    "Advanced Trees",
    "DSA Binary Search Tree",
    "Learn Binary Search Trees",
    "BST Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/trees/redBlackTrees.png",
        width: 1200,
        height: 630,
        alt: "Red-Black Tree Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Red-Black Tree", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Advanced Trees" title="Red-Black Tree" paths={paths} />
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
          <CodeBlock title="Red-Black Tree Insertion Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.redBlackTree}
            title="Red-Black Tree"
            description="Mark Red-Black Tree as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "B-Tree", url: "./b-trees" },
              { text: "Trie (Prefix Tree)", url: "./prefix-tree" },
              { text: "Segment Tree", url: "./segment-trees" },
              { text: "Fenwick Tree", url: "./fenwick-tree" },
              { text: "AVL Balancing", url: "../bst/avl" },
              { text: "BST Insertion", url: "../bst/insertion" },
              { text: "BST Deletion", url: "../bst/deletion" },
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
