import Animation from "@/app/visualizer/trees/traversal/in-order/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/traversal/in-order/quiz";
import Content from "@/app/visualizer/trees/traversal/in-order/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/traversal/in-order" },
  title: "In-order Tree Traversal | Step-by-Step Animation & Explanation",
  description:
    "Learn how in-order traversal (Left, Root, Right) works on a binary tree with an interactive visualizer, a step-by-step visit-order walkthrough, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "In-order Traversal",
    "Inorder Traversal",
    "Tree Traversal",
    "Binary Tree Traversal",
    "In-order Visualization",
    "In-order Algorithm",
    "BST Sorted Order",
    "Validate BST",
    "In-order Traversal in JavaScript",
    "In-order Traversal in C",
    "In-order Traversal in Python",
    "In-order Traversal in Java",
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
        alt: "In-order Traversal Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : In-order Traversal", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Tree Traversal" title="In-order" paths={paths} />
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
          <CodeBlock title="In-order Traversal Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.inOrderTraversal}
            title="In-order Traversal"
            description="Mark In-order Traversal as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Pre-order Traversal", url: "../pre-order" },
              { text: "Post-order Traversal", url: "../post-order" },
              { text: "Level-order Traversal", url: "../level-order" },
              { text: "Morris Traversal", url: "../morris" },
              { text: "BST Insertion", url: "../bst/insertion" },
              { text: "BST Deletion", url: "../bst/deletion" },
              { text: "BST Searching", url: "../bst/searching" },
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
