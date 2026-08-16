import Animation from "@/app/visualizer/trees/bst/deletion/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/bst/deletion/quiz";
import Content from "@/app/visualizer/trees/bst/deletion/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Binary Search Tree Deletion | Step-by-Step Animation & Explanation",
  description:
    "Learn how deletion works in a Binary Search Tree, covering leaf, one-child, and two-children cases, plus in-order successor replacement, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Binary Search Tree Deletion",
    "BST Deletion",
    "BST Deletion Visualization",
    "BST Deletion Algorithm",
    "In-order Successor",
    "Binary Search Tree Animation",
    "Delete from BST",
    "BST Deletion in JavaScript",
    "BST Deletion in C",
    "BST Deletion in Python",
    "BST Deletion in Java",
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
        alt: "Binary Search Tree Deletion Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : BST Deletion", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Binary Search Tree" title="Deletion" paths={paths} />
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
          <CodeBlock title="Binary Search Tree Deletion Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.bstDeletion}
            title="BST Deletion"
            description="Mark BST Deletion as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "BST Insertion", url: "./insertion" },
              { text: "BST Searching", url: "./searching" },
              { text: "AVL Balancing", url: "./avl" },
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
