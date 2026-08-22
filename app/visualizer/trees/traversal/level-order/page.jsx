import Animation from "@/app/visualizer/trees/traversal/level-order/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/traversal/level-order/quiz";
import Content from "@/app/visualizer/trees/traversal/level-order/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/traversal/level-order" },
  title: "Level-order Traversal Visualizer",
  description:
    "Learn how level-order traversal (Breadth-First Search) works on a binary tree with an interactive visualizer showing the queue in action, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Level-order Traversal",
    "Breadth-First Search",
    "BFS Tree Traversal",
    "Tree Traversal",
    "Binary Tree Traversal",
    "Level-order Visualization",
    "Level-order Algorithm",
    "BFS Queue",
    "Shortest Path Unweighted Tree",
    "Level-order Traversal in JavaScript",
    "Level-order Traversal in C",
    "Level-order Traversal in Python",
    "Level-order Traversal in Java",
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
        alt: "Level-order Traversal Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Level-order Traversal", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Tree Traversal" title="Level-order (BFS)" paths={paths} />
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
          <CodeBlock title="Level-order Traversal Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.levelOrderTraversal}
            title="Level-order Traversal"
            description="Mark Level-order Traversal as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Pre-order Traversal", url: "../pre-order" },
              { text: "In-order Traversal", url: "../in-order" },
              { text: "Post-order Traversal", url: "../post-order" },
              { text: "Morris Traversal", url: "../morris" },
              { text: "BST Insertion", url: "../bst/insertion" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
