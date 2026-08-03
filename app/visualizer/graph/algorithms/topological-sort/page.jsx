import Animation from "@/app/visualizer/graph/algorithms/topological-sort/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/graph/algorithms/topological-sort/quiz";
import Content from "@/app/visualizer/graph/algorithms/topological-sort/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Topological Sort | Animation and Explanation",
  description:
    "Learn how Topological Sort orders a directed acyclic graph's vertices so every dependency comes before what depends on it, using Kahn's in-degree algorithm, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Topological Sort",
    "Topological Sort Algorithm",
    "Topological Sort Visualization",
    "Kahn's Algorithm",
    "Directed Acyclic Graph",
    "DAG",
    "Dependency Resolution Algorithm",
    "Cycle Detection Graph",
    "Topological Sort in JavaScript",
    "Kahn's Algorithm in JavaScript",
    "Topological Sort in C",
    "Kahn's Algorithm in C",
    "Topological Sort in Python",
    "Kahn's Algorithm in Python",
    "Topological Sort in Java",
    "Kahn's Algorithm in Java",
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
        alt: "Topological Sort Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Graph : Topological Sort", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Graph Algorithms" title="Topological Sort" paths={paths} />
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
          <CodeBlock title="Topological Sort Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.topologicalSort}
            title="Topological Sort"
            description="Mark Topological Sort as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Topics"
            links={[
              { text: "Prim's Algorithm", url: "./prim" },
              { text: "Kruskal's Algorithm", url: "./kruskal" },
              { text: "Dijkstra's Algorithm", url: "./dijkstra" },
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
