import Animation from "@/app/visualizer/linkedList/operations/traversal/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import Content from "@/app/visualizer/linkedList/operations/traversal/content";
import Quiz from "@/app/visualizer/linkedList/operations/traversal/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";

export const metadata = {
    openGraph: {
        url: "/visualizer/linkedList/operations/traversal",
        siteName: "DSA Visualizer",
        images: [{ url: "/og.png", width: 1200, height: 630, alt: "DSA Visualizer" }],
        locale: "en_US",
        type: "website",
    },
    alternates: { canonical: "/visualizer/linkedList/operations/traversal" },
    title: 'Linked List Traversal Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Explore how traversal works in Linked Lists with interactive animations, clear explanations, and hands-on practice. Visualize each step of the traversal process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Traversal',
        'Traversal Animation Linked List',
        'Visualize Traversal in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Traversal',
        'Linked List Traversal Visualization',
        'Interactive Linked List',
        'Traversal Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Traversal Code Example',
        'Linked List Tutorial',
        'Traversal using C',
        'Traversal using Java',
        'Traversal using Javascript',
        'Traversal using Python',
        'Traversal using linked list',
    ],
    robots: 'index, follow',
};
export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Traversal", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Operations" title="Traversal" paths={paths} />
          <Content />
        </section>

        <section>
          <Animation />
        </section>

        <section className="px-2">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-2">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />
        </section>

        <section className="px-2">
          <CodeBlock title="Linked List Traversal Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.linkedListTraversal}
            title="Linked List Traversal"
            description="Mark Linked List Traversal as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Operations"
            links={[
              { text: "Insertion", url: "./insertion" },
              { text: "Deletion", url: "./deletion" },
              { text: "Compare", url: "./comparison" },
              { text: "Merge", url: "./merge" },
              { text: "Searching", url: "./search" },
              { text: "Reverse", url: "./reverse" },
            ]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}