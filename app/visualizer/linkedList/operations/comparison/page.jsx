import Animation from "@/app/visualizer/linkedList/operations/comparison/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import Content from "@/app/visualizer/linkedList/operations/comparison/content";
import Quiz from "@/app/visualizer/linkedList/operations/comparison/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";

export const metadata = {
    title: 'Linked List Comparison Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Learn how comparison works in Linked Lists with interactive animations, detailed explanations, and hands-on practice. Visualize each step of the comparison process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Comparison',
        'Comparison Animation Linked List',
        'Visualize Comparison in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Comparison',
        'Linked List Comparison Visualization',
        'Interactive Linked List',
        'Comparison Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Comparison Code Example',
        'Linked List Tutorial',
        'Comparison using C',
        'Comparison using Java',
        'Comparison using Javascript',
        'Comparison using Python',
        'Comparison using linked list',
    ],
    robots: 'index, follow',
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Comparison", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Operations" title="Comparison" paths={paths} />
          <Content />
        </section>

        <section>
          <Animation />
        </section>

        <section className="px-2">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-2">
            Test Your Knowledge Before Moving Forward!
          </p>
          <Quiz />
        </section>

        <section className="px-2">
          <CodeBlock title="Linked List Comparison Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.linkedListComparison}
            title="Comparison"
            description="Mark Comparison as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Operations"
            links={[
              { text: "Insertion", url: "./insertion" },
              { text: "Deletion", url: "./deletion" },
              { text: "Traversal", url: "./traversal" },
              { text: "Merging", url: "./merge" },
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