import Animation from "@/app/visualizer/linkedList/operations/deletion/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import Content from "@/app/visualizer/linkedList/operations/deletion/content";
import Quiz from "@/app/visualizer/linkedList/operations/deletion/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";

export const metadata = {
    title: 'Linked List Deletion Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Learn how deletion works in Linked Lists with interactive animations, detailed explanations, and hands-on practice. Visualize each step of the deletion process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Deletion',
        'Deletion Animation Linked List',
        'Visualize Deletion in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Deletion',
        'Linked List Deletion Visualization',
        'Interactive Linked List',
        'Deletion Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Deletion Code Example',
        'Linked List Tutorial',
        'Deletion using C',
        'Deletion using Java',
        'Deletion using Javascript',
        'Deletion using Python',
        'Deletion using linked list',
    ],
    robots: 'index, follow',
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Deletion", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Operations" title="Deletion" paths={paths} />
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
          <CodeBlock title="Linked List Deletion Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.linkedListDeletion}
            title="Deletion"
            description="Mark Deletion as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Types"
            links={[
              { text: "Insertion", url: "./insertion" },
              { text: "Searching", url: "./search" },
              { text: "Merge Lists", url: "./merge" },
              { text: "Comparison", url: "./comparison" },
            ]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}