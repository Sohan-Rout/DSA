import Animation from "@/app/visualizer/trees/applications/decision-trees/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/applications/decision-trees/quiz";
import Content from "@/app/visualizer/trees/applications/decision-trees/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Decision Trees | Animation and Explanation",
  description:
    "Learn how a decision tree greedily splits data using Gini impurity to build an interpretable classifier, with an interactive visualizer showing both the dataset and the resulting tree, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Decision Trees",
    "Decision Tree Algorithm",
    "Decision Tree Visualization",
    "Gini Impurity",
    "Gini Index",
    "Decision Tree Classifier",
    "Decision Tree Machine Learning",
    "CART Algorithm",
    "Decision Tree in JavaScript",
    "Decision Tree in C",
    "Decision Tree in Python",
    "Decision Tree in Java",
    "Machine Learning Trees",
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
        alt: "Decision Tree Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Decision Trees", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Tree Applications" title="Decision Trees" paths={paths} />
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
          <CodeBlock title="Decision Tree Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.decisionTrees}
            title="Decision Trees"
            description="Mark Decision Trees as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Huffman Coding", url: "./huffman-coding" },
              { text: "Heap Sort", url: "./heap-sort" },
              { text: "Syntax Trees", url: "./syntax-trees" },
              { text: "Tree Diameter", url: "../algorithms/tree-diameter" },
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
