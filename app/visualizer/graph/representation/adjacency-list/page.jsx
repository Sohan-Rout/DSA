import Animation from "@/app/visualizer/graph/representation/adjacency-list/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/graph/representation/adjacency-list/quiz";
import Content from "@/app/visualizer/graph/representation/adjacency-list/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/graph/representation/adjacency-list" },
  title: "Adjacency List Visualizer",
  description:
    "Learn how an adjacency list represents a graph as per-vertex neighbor lists, with an interactive visualizer showing both the graph and its list side by side, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Adjacency List",
    "Adjacency List Graph",
    "Adjacency List Algorithm",
    "Adjacency List Visualization",
    "Graph Representation",
    "Graph Data Structure",
    "Weighted Graph List",
    "Directed Graph List",
    "Adjacency List in JavaScript",
    "Adjacency List in C",
    "Adjacency List in Python",
    "Adjacency List in Java",
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
        alt: "Adjacency List Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Graph : Adjacency List", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Graph Representation" title="Adjacency List" paths={paths} />
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
          <CodeBlock title="Adjacency List Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.adjacencyList}
            title="Adjacency List"
            description="Mark Adjacency List as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Topics"
            links={[
              { text: "Adjacency Matrix", url: "./adjacency-matrix" },
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
