import Animation from "@/app/visualizer/trees/traversal/pre-order/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/traversal/pre-order/quiz";
import Content from "@/app/visualizer/trees/traversal/pre-order/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Pre-order Tree Traversal | Step-by-Step Animation & Explanation",
  description:
    "Learn how pre-order traversal (Root, Left, Right) works on a binary tree with an interactive visualizer, a step-by-step visit-order walkthrough, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Pre-order Traversal",
    "Preorder Traversal",
    "Tree Traversal",
    "Binary Tree Traversal",
    "Pre-order Visualization",
    "Pre-order Algorithm",
    "Tree Serialization",
    "Prefix Notation",
    "Pre-order Traversal in JavaScript",
    "Pre-order Traversal in C",
    "Pre-order Traversal in Python",
    "Pre-order Traversal in Java",
    "DSA Binary Tree",
    "Learn Binary Trees",
    "Tree Traversal Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Pre-order Traversal Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Pre-order Traversal", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Tree Traversal" title="Pre-order" paths={paths} />
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
          <CodeBlock title="Pre-order Traversal Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.preOrderTraversal}
            title="Pre-order Traversal"
            description="Mark Pre-order Traversal as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "In-order Traversal", url: "../in-order" },
              { text: "Post-order Traversal", url: "../post-order" },
              { text: "Level-order Traversal", url: "../level-order" },
              { text: "BST Insertion", url: "../bst/insertion" },
              { text: "BST Deletion", url: "../bst/deletion" },
              { text: "BST Searching", url: "../bst/searching" },
              { text: "AVL Balancing", url: "../bst/avl" },
              { text: "Binary Tree Types", url: "../binaryTree/types" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
