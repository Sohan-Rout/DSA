import Animation from "@/app/visualizer/graph/traversal/dfs/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/graph/traversal/dfs/quiz";
import Content from "@/app/visualizer/graph/traversal/dfs/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Depth-First Search (DFS) | Animation and Explanation",
  description:
    "Learn how Depth-First Search plunges as deep as possible down one path before backtracking, using a stack (explicit or via recursion), with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Depth-First Search",
    "DFS",
    "Depth-First Search Algorithm",
    "DFS Algorithm",
    "Depth-First Search Visualization",
    "DFS Visualization",
    "Graph Traversal",
    "Recursive DFS",
    "Depth-First Search in JavaScript",
    "DFS in JavaScript",
    "Depth-First Search in C",
    "DFS in C",
    "Depth-First Search in Python",
    "DFS in Python",
    "Depth-First Search in Java",
    "DFS in Java",
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
        alt: "Depth-First Search Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Graph : Depth-First Search", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Graph Traversal" title="Depth-First Search" paths={paths} />
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
          <CodeBlock title="Depth-First Search Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.graphDfs}
            title="Depth-First Search"
            description="Mark Depth-First Search as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Topics"
            links={[
              { text: "Breadth-First Search", url: "./bfs" },
              { text: "Dijkstra's Algorithm", url: "../algorithms/dijkstra" },
              { text: "Adjacency List", url: "../representation/adjacency-list" },
              { text: "Adjacency Matrix", url: "../representation/adjacency-matrix" },
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
