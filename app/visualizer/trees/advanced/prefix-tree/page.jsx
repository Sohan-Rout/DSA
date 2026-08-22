import Animation from "@/app/visualizer/trees/advanced/prefix-tree/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/advanced/prefix-tree/quiz";
import Content from "@/app/visualizer/trees/advanced/prefix-tree/content";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/trees/advanced/prefix-tree" },
  title: "Trie (Prefix Tree) Visualizer",
  description:
    "Learn how a Trie (Prefix Tree) stores words by sharing prefixes across paths, powering autocomplete and spell-checkers, with an interactive insertion and search visualizer, code examples in JavaScript, C, Python, and Java, and a quiz.",
  keywords: [
    "Trie",
    "Prefix Tree",
    "Trie Data Structure",
    "Trie Insertion",
    "Trie Search",
    "Autocomplete Data Structure",
    "Trie Visualization",
    "Trie vs Hash Set",
    "Trie in JavaScript",
    "Trie in C",
    "Trie in Python",
    "Trie in Java",
    "Advanced Trees",
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
        alt: "Trie (Prefix Tree) Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Trie (Prefix Tree)", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Advanced Trees" title="Trie (Prefix Tree)" paths={paths} />
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
          <CodeBlock title="Trie Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.trie}
            title="Trie (Prefix Tree)"
            description="Mark Trie (Prefix Tree) as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[
              { text: "Red-Black Tree", url: "./red-black" },
              { text: "B-Tree", url: "./b-trees" },
              { text: "Segment Tree", url: "./segment-trees" },
              { text: "Fenwick Tree", url: "./fenwick-tree" },
              { text: "AVL Balancing", url: "../bst/avl" },
              { text: "BST Insertion", url: "../bst/insertion" },
              { text: "BST Searching", url: "../bst/searching" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
