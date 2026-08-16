import Animation from "@/app/visualizer/trees/bst/searching/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/bst/searching/quiz";
import Content from "@/app/visualizer/trees/bst/searching/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Binary Search Tree Searching | Step-by-Step Animation & Explanation",
  description:
    "Learn how searching works in a Binary Search Tree with an interactive visualizer, a step-by-step comparison-path walkthrough, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Binary Search Tree Searching",
    "BST Search",
    "BST Searching Visualization",
    "BST Search Algorithm",
    "Binary Search Tree Animation",
    "Search in BST",
    "BST Search in JavaScript",
    "BST Search in C",
    "BST Search in Python",
    "BST Search in Java",
    "DSA Binary Search Tree",
    "Learn Binary Search Trees",
    "BST Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Binary Search Tree Searching Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : BST Searching", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Binary Search Tree" title="Searching" paths={paths} />
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
          <CodeBlock title="Binary Search Tree Searching Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.bstSearching}
            title="BST Searching"
            description="Mark BST Searching as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "BST Insertion", url: "./insertion" },
              { text: "BST Deletion", url: "./deletion" },
              { text: "AVL Balancing", url: "./avl" },
              { text: "Lowest Common Ancestor", url: "../algorithms/lowest-common-ancestor" },
              { text: "Binary Tree Types", url: "../binaryTree/types" },
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
