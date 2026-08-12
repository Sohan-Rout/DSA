import Animation from "@/app/visualizer/trees/algorithms/tree-diameter/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/algorithms/tree-diameter/quiz";
import Content from "@/app/visualizer/trees/algorithms/tree-diameter/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Tree Diameter | Animation and Explanation",
  description:
    "Learn how to find the diameter of a binary tree (the longest path between any two nodes) using a single post-order traversal, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Tree Diameter",
    "Diameter of a Binary Tree",
    "Tree Diameter Algorithm",
    "Diameter of a Binary Tree Algorithm",
    "Tree Diameter Visualization",
    "Diameter of a Binary Tree Visualization",
    "Longest Path in a Tree",
    "Binary Tree Height",
    "Tree Diameter in JavaScript",
    "Diameter of a Binary Tree in JavaScript",
    "Tree Diameter in C",
    "Diameter of a Binary Tree in C",
    "Tree Diameter in Python",
    "Diameter of a Binary Tree in Python",
    "Tree Diameter in Java",
    "Diameter of a Binary Tree in Java",
    "Tree Algorithms",
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
        alt: "Tree Diameter Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Tree Diameter", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Tree Algorithms" title="Tree Diameter" paths={paths} />
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
          <CodeBlock title="Tree Diameter Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.treeDiameter}
            title="Tree Diameter"
            description="Mark Tree Diameter as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Lowest Common Ancestor", url: "./lowest-common-ancestor" },
              { text: "Tree Isomorphism", url: "./tree-isomorphism" },
              { text: "Serialize/Deserialize", url: "./serialize-deserialize" },
              { text: "BST Insertion", url: "../bst/insertion" },
              { text: "AVL Balancing", url: "../bst/avl" },
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
