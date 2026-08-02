import Animation from "@/app/visualizer/linkedList/operations/insertion/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import Content from "@/app/visualizer/linkedList/operations/insertion/content";
import Quiz from "@/app/visualizer/linkedList/operations/insertion/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";

export const metadata = {
    title: 'Linked List Insertion Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Learn how insertion works in Linked Lists with interactive animations, detailed explanations, and hands-on practice. Visualize each step of the insertion process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Insertion',
        'Insertion Animation Linked List',
        'Visualize Insertion in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Insertion',
        'Linked List Insertion Visualization',
        'Interactive Linked List',
        'Insertion Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Insertion Code Example',
        'Linked List Tutorial',
        'Insertion using C',
        'Insertion using Java',
        'Insertion using Javascript',
        'Insertion using Python',
        'Insertion using linked list',
    ],
    robots: 'index, follow',
};
export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Insertion", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Operations" title="Insertion" paths={paths} />
          <Content />
        </section>

        <section>
          <Animation />
        </section>

        <section className="px-6">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-2">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />
        </section>

        <section className="px-6">
          <CodeBlock title="Linked List Insertion Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.linkedListInsertion}
            title="Insertion"
            description="Mark Insertion as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Types"
            links={[
              { text: "Traversal", url: "./traversal" },
              { text: "Deletion", url: "./deletion" },
              { text: "Searching", url: "./search" },
              { text: "Merging", url: "./merge" },
              { text: "Comparison", url: "./comparison" },
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