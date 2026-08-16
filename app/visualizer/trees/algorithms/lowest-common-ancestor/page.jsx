import Animation from "@/app/visualizer/trees/algorithms/lowest-common-ancestor/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/algorithms/lowest-common-ancestor/quiz";
import Content from "@/app/visualizer/trees/algorithms/lowest-common-ancestor/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Lowest Common Ancestor (LCA) | Animation and Explanation",
  description:
    "Learn how to find the Lowest Common Ancestor of two nodes in a Binary Search Tree by walking down from the root until their paths diverge, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Lowest Common Ancestor",
    "LCA",
    "Lowest Common Ancestor Binary Search Tree",
    "LCA Binary Search Tree",
    "Lowest Common Ancestor Binary Tree",
    "LCA Binary Tree",
    "Lowest Common Ancestor Algorithm",
    "LCA Algorithm",
    "Lowest Common Ancestor Visualization",
    "LCA Visualization",
    "Git Merge Base",
    "Lowest Common Ancestor in JavaScript",
    "LCA in JavaScript",
    "Lowest Common Ancestor in C",
    "LCA in C",
    "Lowest Common Ancestor in Python",
    "LCA in Python",
    "Lowest Common Ancestor in Java",
    "LCA in Java",
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
        alt: "Lowest Common Ancestor Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Lowest Common Ancestor", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Tree Algorithms" title="Lowest Common Ancestor" paths={paths} />
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
          <CodeBlock title="Lowest Common Ancestor Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.lowestCommonAncestor}
            title="Lowest Common Ancestor"
            description="Mark Lowest Common Ancestor as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Tree Diameter", url: "./tree-diameter" },
              { text: "Tree Isomorphism", url: "./tree-isomorphism" },
              { text: "Serialize/Deserialize", url: "./serialize-deserialize" },
              { text: "BST Searching", url: "../bst/searching" },
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
