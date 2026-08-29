import Animation from "@/app/visualizer/graph/algorithms/dijkstra/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/graph/algorithms/dijkstra/quiz";
import Content from "@/app/visualizer/graph/algorithms/dijkstra/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/graph/algorithms/dijkstra" },
  title: "Dijkstra's Algorithm Visualizer",
  description:
    "Learn how Dijkstra's algorithm finds the shortest weighted-distance path from a start vertex to every other vertex by greedily finalizing the closest unvisited vertex, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Dijkstra's Algorithm",
    "Dijkstra Algorithm",
    "Dijkstra's Shortest Path",
    "Dijkstra Algorithm Visualization",
    "Shortest Path Algorithm",
    "Weighted Graph Shortest Path",
    "Single Source Shortest Path",
    "Priority Queue Shortest Path",
    "Dijkstra's Algorithm in JavaScript",
    "Dijkstra Algorithm in JavaScript",
    "Dijkstra's Algorithm in C",
    "Dijkstra Algorithm in C",
    "Dijkstra's Algorithm in Python",
    "Dijkstra Algorithm in Python",
    "Dijkstra's Algorithm in Java",
    "Dijkstra Algorithm in Java",
    "Graph Algorithms",
    "DSA Graphs",
    "Learn Graphs",
    "Graph Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/graphs/dijkstraAlgorithm.png",
        width: 1200,
        height: 630,
        alt: "Dijkstra's Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Graph : Dijkstra's Algorithm", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Graph Algorithms" title="Dijkstra's Algorithm" paths={paths} />
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
          <CodeBlock title="Dijkstra's Algorithm Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.dijkstra}
            title="Dijkstra's Algorithm"
            description="Mark Dijkstra's Algorithm as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Topics"
            links={[
              { text: "Kruskal's Algorithm", url: "./kruskal" },
              { text: "Prim's Algorithm", url: "./prim" },
              { text: "Topological Sort", url: "./topological-sort" },
              { text: "Breadth-First Search", url: "../traversal/bfs" },
              { text: "Depth-First Search", url: "../traversal/dfs" },
              { text: "Adjacency List", url: "../representation/adjacency-list" },
              { text: "Adjacency Matrix", url: "../representation/adjacency-matrix" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
