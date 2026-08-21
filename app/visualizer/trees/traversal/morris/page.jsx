import Animation from "@/app/visualizer/trees/traversal/morris/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/traversal/morris/quiz";
import Content from "@/app/visualizer/trees/traversal/morris/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/traversal/morris" },
  title: "Morris Traversal | O(1) Space Tree Traversal Animation & Explanation",
  description:
    "Learn how Morris traversal visits a binary tree in-order using O(1) extra space by threading temporary links instead of a stack or queue, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Morris Traversal",
    "Morris In-order Traversal",
    "Threaded Binary Tree",
    "O(1) Space Tree Traversal",
    "Tree Traversal",
    "Binary Tree Traversal",
    "Morris Traversal Visualization",
    "Morris Traversal Algorithm",
    "Morris Traversal in JavaScript",
    "Morris Traversal in C",
    "Morris Traversal in Python",
    "Morris Traversal in Java",
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
        alt: "Morris Traversal Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Morris Traversal", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Tree Traversal" title="Morris Traversal" paths={paths} />
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
          <CodeBlock title="Morris Traversal Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.morrisTraversal}
            title="Morris Traversal"
            description="Mark Morris Traversal as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "In-order Traversal", url: "../in-order" },
              { text: "Pre-order Traversal", url: "../pre-order" },
              { text: "Post-order Traversal", url: "../post-order" },
              { text: "Level-order Traversal", url: "../level-order" },
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
