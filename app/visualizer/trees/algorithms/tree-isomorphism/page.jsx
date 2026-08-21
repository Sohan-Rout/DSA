import Animation from "@/app/visualizer/trees/algorithms/tree-isomorphism/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/algorithms/tree-isomorphism/quiz";
import Content from "@/app/visualizer/trees/algorithms/tree-isomorphism/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/algorithms/tree-isomorphism" },
  title: "Tree Isomorphism | Animation and Explanation",
  description:
    "Learn how to check whether two binary trees are isomorphic (identical once children can be freely swapped at any node) with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Tree Isomorphism",
    "Binary Tree Isomorphism",
    "Isomorphic Trees",
    "Tree Isomorphism Algorithm",
    "Isomorphic Trees Algorithm",
    "Tree Isomorphism Visualization",
    "Isomorphic Trees Visualization",
    "Flip Equivalent Binary Trees",
    "Tree Isomorphism in JavaScript",
    "Isomorphic Trees in JavaScript",
    "Tree Isomorphism in C",
    "Isomorphic Trees in C",
    "Tree Isomorphism in Python",
    "Isomorphic Trees in Python",
    "Tree Isomorphism in Java",
    "Isomorphic Trees in Java",
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
        alt: "Tree Isomorphism Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Tree Isomorphism", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Tree Algorithms" title="Tree Isomorphism" paths={paths} />
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
          <CodeBlock title="Tree Isomorphism Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.treeIsomorphism}
            title="Tree Isomorphism"
            description="Mark Tree Isomorphism as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Tree Diameter", url: "./tree-diameter" },
              { text: "Lowest Common Ancestor", url: "./lowest-common-ancestor" },
              { text: "Serialize/Deserialize", url: "./serialize-deserialize" },
              { text: "BST Insertion", url: "../bst/insertion" },
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
