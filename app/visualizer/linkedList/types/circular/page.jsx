import Animation from "@/app/visualizer/linkedList/types/circular/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import Content from "./content";
import Quiz from "./quiz";
import Code from "./codeBlock";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";

export const metadata = {
  title: 'Circular Linked List Algorithm | Interactive Learning & Step-by-Step Animation',
  description:
    'Master Circular Linked Lists with interactive visualizations, quizzes, and implementation code. Learn insertion, deletion, and traversal through animations and practice with hands-on exercises.',
  keywords: [
    'Circular Linked List Visualizer',
    'CLL Animation',
    'Visualize Circular Linked List',
    'Learn Circular Linked List',
    'Circular Linked List DSA',
    'Circular Linked List for Beginners',
    'Insertion in Circular Linked List',
    'Deletion in Circular Linked List',
    'Circular Linked List Traversal',
    'DSA Circular Linked List Visualization',
    'DSA Quiz Circular Linked List',
    'Circular Linked List Implementation Code',
    'DSA Learning Platform',
    'Circular Linked List in JavaScript',
    'Circular Linked List in C',
    'Circular Linked List in Python',
    'Circular Linked List in Java',
    'Singly Circular Linked List',
    'Doubly Circular Linked List',
    'Circular Linked List vs Linear Linked List',
    'Circular Linked List Time Complexity',
    'Round Robin Scheduling Data Structure',
    'Circular Buffer Implementation',
    'Circular Linked List Interview Questions',
    'Circular Linked List Code Examples',
    'Interactive DSA Visualizer',
  ],
  robots: 'index, follow',
  openGraph: {
    images: [
      {
        // TODO: swap in a dedicated /og/linkedList/circular.png once it's ready; using the site-wide OG image as a placeholder for now.
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Circular Linked List Visualization',
      },
    ],
  },
};
export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Circular", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Types" title="Circular Linked List" paths={paths} />
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
          <Code />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.circularLinkedList}
            title="Circular Linked List"
            description="Mark Circular Linked List as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Types"
            links={[
              { text: "Singly Linked List", url: "./singly" },
              { text: "Doubly Linked List", url: "./doubly" },
            ]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}