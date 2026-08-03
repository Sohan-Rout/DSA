import Animation from "@/app/visualizer/trees/applications/heap-sort/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/applications/heap-sort/quiz";
import Content from "@/app/visualizer/trees/applications/heap-sort/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Heap Sort | Animation and Explanation",
  description:
    "Learn how Heap Sort builds a max-heap from an array and repeatedly extracts the largest element to sort in place, with an interactive visualizer showing both the array and its heap tree, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Heap Sort",
    "Heap Sort Algorithm",
    "Heap Sort Visualization",
    "Max Heap",
    "Max Heap Sort",
    "Binary Heap",
    "Binary Heap Sort",
    "Heapify",
    "Heap Sort in JavaScript",
    "Heap Sort in C",
    "Heap Sort in Python",
    "Heap Sort in Java",
    "Sorting Algorithms",
    "Tree Applications",
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
        alt: "Heap Sort Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Heap Sort", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Tree Applications" title="Heap Sort" paths={paths} />
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
          <CodeBlock title="Heap Sort Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.heapSort}
            title="Heap Sort"
            description="Mark Heap Sort as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Huffman Coding", url: "./huffman-coding" },
              { text: "Decision Trees", url: "./decision-trees" },
              { text: "Syntax Trees", url: "./syntax-trees" },
              { text: "Tree Diameter", url: "../algorithms/tree-diameter" },
              { text: "Lowest Common Ancestor", url: "../algorithms/lowest-common-ancestor" },
              { text: "Level-order Traversal", url: "../traversal/level-order" },
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
