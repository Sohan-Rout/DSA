import Animation from "@/app/visualizer/trees/applications/syntax-trees/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/applications/syntax-trees/quiz";
import Content from "@/app/visualizer/trees/applications/syntax-trees/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/applications/syntax-trees" },
  title: "Syntax Trees or Expression Trees | Animation and Explanation",
  description:
    "Learn how a syntax tree (expression tree) represents an arithmetic expression's structure, how recursive-descent parsing builds one, and how post-order traversal evaluates it, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Syntax Trees",
    "Syntax Tree Algorithm",
    "Syntax Tree Visualization",
    "Expression Trees",
    "Expression Tree Algorithm",
    "Expression Tree Visualization",
    "Abstract Syntax Tree",
    "AST",
    "Recursive Descent Parsing",
    "Prefix Postfix Infix Notation",
    "Syntax Tree in JavaScript",
    "Expression Tree in JavaScript",
    "Syntax Tree in C",
    "Expression Tree in C",
    "Syntax Tree in Python",
    "Expression Tree in Python",
    "Syntax Tree in Java",
    "Expression Tree in Java",
    "Tree Applications",
    "DSA Trees",
    "Learn Trees",
    "Tree Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/trees/syntaxTrees.png",
        width: 1200,
        height: 630,
        alt: "Syntax Tree Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Syntax Trees", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Tree Applications" title="Syntax Trees" paths={paths} />
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
          <CodeBlock title="Syntax Tree Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.syntaxTrees}
            title="Syntax Trees"
            description="Mark Syntax Trees as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Decision Trees", url: "./decision-trees" },
              { text: "Huffman Coding", url: "./huffman-coding" },
              { text: "Heap Sort", url: "./heap-sort" },
              { text: "Post-order Traversal", url: "../traversal/post-order" },
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
