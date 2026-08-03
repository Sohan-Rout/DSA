import Animation from "@/app/visualizer/graph/algorithms/prim/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/graph/algorithms/prim/quiz";
import Content from "@/app/visualizer/graph/algorithms/prim/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Prim's Algorithm | Animation and Explanation",
  description:
    "Learn how Prim's algorithm builds a minimum spanning tree by growing outward from a start vertex, always pulling in the cheapest edge to a new vertex, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Prim's Algorithm",
    "Prim Algorithm",
    "Prim's Algorithm Visualization",
    "Minimum Spanning Tree",
    "MST Algorithm",
    "Prim vs Kruskal",
    "Greedy Graph Algorithms",
    "Prim's Algorithm in JavaScript",
    "Prim Algorithm in JavaScript",
    "Prim's Algorithm in C",
    "Prim Algorithm in C",
    "Prim's Algorithm in Python",
    "Prim Algorithm in Python",
    "Prim's Algorithm in Java",
    "Prim Algorithm in Java",
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
        alt: "Prim's Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Graph : Prim's Algorithm", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Graph Algorithms" title="Prim's Algorithm" paths={paths} />
          <Content />
        </section>

        <section className="px-6">
          <Animation />
        </section>

        <section className="px-6">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />
        </section>

        <section className="px-6">
          <CodeBlock title="Prim's Algorithm Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.prim}
            title="Prim's Algorithm"
            description="Mark Prim's Algorithm as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Topics"
            links={[
              { text: "Kruskal's Algorithm", url: "./kruskal" },
              { text: "Topological Sort", url: "./topological-sort" },
              { text: "Dijkstra's Algorithm", url: "./dijkstra" },
              { text: "Breadth-First Search", url: "../traversal/bfs" },
              { text: "Depth-First Search", url: "../traversal/dfs" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
