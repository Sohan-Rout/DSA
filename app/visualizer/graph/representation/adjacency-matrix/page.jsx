import Animation from "@/app/visualizer/graph/representation/adjacency-matrix/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/graph/representation/adjacency-matrix/quiz";
import Content from "@/app/visualizer/graph/representation/adjacency-matrix/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/graph/representation/adjacency-matrix" },
  title: "Adjacency Matrix Visualizer",
  description:
    "Learn how an adjacency matrix represents a graph as a 2D grid of edges, with an interactive visualizer showing both the graph and its matrix side by side, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Adjacency Matrix",
    "Adjacency Matrix Graph",
    "Adjacency Matrix Algorithm",
    "Adjacency Matrix Visualization",
    "Graph Representation",
    "Graph Data Structure",
    "Weighted Graph Matrix",
    "Directed Graph Matrix",
    "Adjacency Matrix in JavaScript",
    "Adjacency Matrix in C",
    "Adjacency Matrix in Python",
    "Adjacency Matrix in Java",
    "Graph Algorithms",
    "DSA Graphs",
    "Learn Graphs",
    "Graph Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Adjacency Matrix Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Graph : Adjacency Matrix", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Graph Representation" title="Adjacency Matrix" paths={paths} />
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
          <CodeBlock title="Adjacency Matrix Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.adjacencyMatrix}
            title="Adjacency Matrix"
            description="Mark Adjacency Matrix as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Topics"
            links={[
              { text: "Adjacency List", url: "./adjacency-list" },
              { text: "Binary Search", url: "../../searching/binarysearch" },
              { text: "Structure & Properties", url: "../../trees/binaryTree/properties" },
              { text: "Heap Sort", url: "../../trees/applications/heap-sort" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
