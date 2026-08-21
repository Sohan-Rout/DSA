import Animation from "@/app/visualizer/graph/algorithms/kruskal/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/graph/algorithms/kruskal/quiz";
import Content from "@/app/visualizer/graph/algorithms/kruskal/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/graph/algorithms/kruskal" },
  title: "Kruskal's Algorithm | Animation and Explanation",
  description:
    "Learn how Kruskal's algorithm builds a minimum spanning tree by greedily accepting the cheapest edge that doesn't create a cycle, using Union-Find, with an interactive visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Kruskal's Algorithm",
    "Kruskal Algorithm",
    "Kruskal's Algorithm Visualization",
    "Minimum Spanning Tree",
    "MST Algorithm",
    "Union-Find",
    "Disjoint Set",
    "Greedy Graph Algorithms",
    "Kruskal's Algorithm in JavaScript",
    "Kruskal Algorithm in JavaScript",
    "Kruskal's Algorithm in C",
    "Kruskal Algorithm in C",
    "Kruskal's Algorithm in Python",
    "Kruskal Algorithm in Python",
    "Kruskal's Algorithm in Java",
    "Kruskal Algorithm in Java",
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
        alt: "Kruskal's Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Graph : Kruskal's Algorithm", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Graph Algorithms" title="Kruskal's Algorithm" paths={paths} />
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
          <CodeBlock title="Kruskal's Algorithm Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.kruskal}
            title="Kruskal's Algorithm"
            description="Mark Kruskal's Algorithm as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Topics"
            links={[
              { text: "Prim's Algorithm", url: "./prim" },
              { text: "Topological Sort", url: "./topological-sort" },
              { text: "Dijkstra's Algorithm", url: "./dijkstra" },
              { text: "Breadth-First Search", url: "../traversal/bfs" },
              { text: "Depth-First Search", url: "../traversal/dfs" },
              { text: "Adjacency List", url: "../representation/adjacency-list" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
