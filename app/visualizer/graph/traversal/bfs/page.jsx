import Animation from "@/app/visualizer/graph/traversal/bfs/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/graph/traversal/bfs/quiz";
import Content from "@/app/visualizer/graph/traversal/bfs/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Breadth-First Search (BFS) | Animation and Explanation",
  description:
    "Learn how Breadth-First Search explores a graph outward one distance-ring at a time using a queue, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Breadth-First Search",
    "BFS",
    "Breadth-First Search Algorithm",
    "BFS Algorithm",
    "Breadth-First Search Visualization",
    "BFS Visualization",
    "Graph Traversal",
    "Shortest Path Unweighted Graph",
    "Breadth-First Search in JavaScript",
    "BFS in JavaScript",
    "Breadth-First Search in C",
    "BFS in C",
    "Breadth-First Search in Python",
    "BFS in Python",
    "Breadth-First Search in Java",
    "BFS in Java",
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
        alt: "Breadth-First Search Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Graph : Breadth-First Search", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Graph Traversal" title="Breadth-First Search" paths={paths} />
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
          <CodeBlock title="Breadth-First Search Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.graphBfs}
            title="Breadth-First Search"
            description="Mark Breadth-First Search as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Topics"
            links={[
              { text: "Depth-First Search", url: "./dfs" },
              { text: "Dijkstra's Algorithm", url: "../algorithms/dijkstra" },
              { text: "Adjacency List", url: "../representation/adjacency-list" },
              { text: "Adjacency Matrix", url: "../representation/adjacency-matrix" },
              { text: "Binary Search", url: "../../searching/binarysearch" },
              { text: "Structure & Properties", url: "../../trees/binaryTree/properties" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
