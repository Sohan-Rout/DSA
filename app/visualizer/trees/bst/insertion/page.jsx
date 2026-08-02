import Animation from "@/app/visualizer/trees/bst/insertion/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/bst/insertion/quiz";
import Content from "@/app/visualizer/trees/bst/insertion/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Binary Search Tree Insertion | Step-by-Step Animation & Explanation",
  description:
    "Learn how insertion works in a Binary Search Tree with an interactive visualizer, a step-by-step comparison-path walkthrough, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Binary Search Tree Insertion",
    "BST Insertion",
    "BST Insertion Visualization",
    "BST Insertion Algorithm",
    "Binary Search Tree Animation",
    "Insert into BST",
    "BST Insertion in JavaScript",
    "BST Insertion in C",
    "BST Insertion in Python",
    "BST Insertion in Java",
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
        alt: "Binary Search Tree Insertion Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : BST Insertion", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Binary Search Tree" title="Insertion" paths={paths} />
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
          <CodeBlock title="Binary Search Tree Insertion Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.bstInsertion}
            title="BST Insertion"
            description="Mark BST Insertion as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
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
