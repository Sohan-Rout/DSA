import Animation from "@/app/visualizer/trees/algorithms/serialize-deserialize/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/algorithms/serialize-deserialize/quiz";
import Content from "@/app/visualizer/trees/algorithms/serialize-deserialize/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/algorithms/serialize-deserialize" },
  title: "Serialize a Binary Tree Visualizer",
  description:
    "Learn how to serialize a binary tree into a string using preorder traversal with null markers, and deserialize that string back into an identical tree, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Serialize and Deserialize Binary Tree",
    "Tree Serialization",
    "Binary Tree Serialization",
    "Tree Serialization Algorithm",
    "Binary Tree Serialization Algorithm",
    "Tree Serialization Visualization",
    "Binary Tree Serialization Visualization",
    "Encode and Decode Binary Tree",
    "Preorder Serialization",
    "Serialize Binary Tree in JavaScript",
    "Tree Serialization in JavaScript",
    "Serialize Binary Tree in C",
    "Tree Serialization in C",
    "Serialize Binary Tree in Python",
    "Tree Serialization in Python",
    "Serialize Binary Tree in Java",
    "Tree Serialization in Java",
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
        alt: "Tree Serialization and Deserialization Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Serialize/Deserialize", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Tree Algorithms" title="Serialize and Deserialize a Tree" paths={paths} />
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
          <CodeBlock title="Serialize and Deserialize Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.serializeDeserialize}
            title="Serialize and Deserialize a Tree"
            description="Mark Serialize/Deserialize as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Tree Diameter", url: "./tree-diameter" },
              { text: "Tree Isomorphism", url: "./tree-isomorphism" },
              { text: "Lowest Common Ancestor", url: "./lowest-common-ancestor" },
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
