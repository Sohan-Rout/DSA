import Animation from "@/app/visualizer/trees/applications/huffman-coding/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/applications/huffman-coding/quiz";
import Content from "@/app/visualizer/trees/applications/huffman-coding/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/applications/huffman-coding" },
  title: "Huffman Coding Visualizer",
  description:
    "Learn how Huffman Coding builds an optimal prefix-free binary code by repeatedly merging the two lowest-frequency symbols into a tree, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Huffman Coding",
    "Huffman Coding Algorithm",
    "Huffman Tree",
    "Huffman Coding Visualization",
    "Huffman Tree Visualization",
    "Huffman Compression",
    "Prefix-Free Codes",
    "Data Compression Algorithm",
    "Huffman Coding in JavaScript",
    "Huffman Coding in C",
    "Huffman Coding in Python",
    "Huffman Coding in Java",
    "Greedy Algorithms",
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
        alt: "Huffman Coding Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Huffman Coding", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Tree Applications" title="Huffman Coding" paths={paths} />
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
          <CodeBlock title="Huffman Coding Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.huffmanCoding}
            title="Huffman Coding"
            description="Mark Huffman Coding as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Heap Sort", url: "./heap-sort" },
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
