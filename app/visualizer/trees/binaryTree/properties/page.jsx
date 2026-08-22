import Animation from "@/app/visualizer/trees/binaryTree/properties/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/binaryTree/properties/quiz";
import Content from "@/app/visualizer/trees/binaryTree/properties/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/binaryTree/properties" },
  title: "Binary Tree Properties Explained",
  description:
    "Learn the core structural properties of Binary Trees, including height, depth, level, node count formulas, leaf vs internal nodes, and why balance matters, with an interactive tree builder, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Binary Tree Properties",
    "Binary Tree Height",
    "Binary Tree Depth",
    "Binary Tree Level",
    "Leaf Node vs Internal Node",
    "Binary Tree Node Count Formula",
    "Balanced Binary Tree",
    "Skewed Binary Tree",
    "Binary Tree Visualization",
    "DSA Binary Trees",
    "Binary Tree Height in JavaScript",
    "Binary Tree Height in C",
    "Binary Tree Height in Python",
    "Binary Tree Height in Java",
    "Learn Binary Trees DSA",
    "Binary Tree Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Binary Tree Properties Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Binary Tree Properties", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Trees" title="Binary Tree Properties" paths={paths} />
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
          <CodeBlock title="Binary Tree Height & Node Count" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.binaryTreeProperties}
            title="Binary Tree Properties"
            description="Mark Binary Tree Properties as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[{ text: "Binary Tree Types", url: "./types" }]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
