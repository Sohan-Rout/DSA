import Animation from "@/app/visualizer/trees/bst/avl/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/bst/avl/quiz";
import Content from "@/app/visualizer/trees/bst/avl/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "AVL Tree Balancing | Step-by-Step Rotation Animation & Explanation",
  description:
    "Learn how AVL trees self-balance a Binary Search Tree with rotations — Left-Left, Right-Right, Left-Right, Right-Left — with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "AVL Tree",
    "AVL Tree Balancing",
    "AVL Rotation",
    "Self-Balancing Binary Search Tree",
    "Left-Left Rotation",
    "Right-Right Rotation",
    "Left-Right Rotation",
    "Right-Left Rotation",
    "AVL Tree Visualization",
    "AVL Tree in JavaScript",
    "AVL Tree in C",
    "AVL Tree in Python",
    "AVL Tree in Java",
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
        alt: "AVL Tree Balancing Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : AVL Balancing", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Binary Search Tree" title="Balancing (AVL)" paths={paths} />
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
          <CodeBlock title="AVL Tree Insertion Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.bstAvl}
            title="AVL Tree Balancing"
            description="Mark AVL Tree Balancing as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "BST Insertion", url: "./insertion" },
              { text: "BST Deletion", url: "./deletion" },
              { text: "BST Searching", url: "./searching" },
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
