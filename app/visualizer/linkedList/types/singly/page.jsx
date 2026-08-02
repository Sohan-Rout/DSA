import Animation from "@/app/visualizer/linkedList/types/singly/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/linkedList/types/singly/content";
import Quiz from "@/app/visualizer/linkedList/types/singly/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from '@/app/components/ui/exploreOther';
import BackToTopButton from '@/app/components/ui/backtotop';
import Footer from '@/app/components/footer';

export const metadata = {
  title:
    "Singly Linked List Implementation | Visualize Linked List in JS, C, Python, Java",
  description:
    "Explore Singly Linked List implementation with interactive visualizations and real-time code examples in JavaScript, C, Python, and Java. Learn insertion, deletion, and traversal with step-by-step animations. Perfect for DSA beginners and interview preparation.",
  keywords: [
    "Singly Linked List Implementation",
    "Singly Linked List Visualization",
    "Linked List in JavaScript",
    "Linked List in C",
    "Linked List in Python",
    "Linked List in Java",
    "DSA Linked List",
    "Linked List Operations",
    "Insertion in Linked List",
    "Deletion in Linked List",
    "Traverse Linked List",
    "Learn Linked List",
    "Visualize Linked List",
    "DSA for Beginners",
    "Interactive Linked List Tool",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/stack/isFull.png",
        width: 1200,
        height: 630,
        alt: "Stack isFull Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Singly", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Types" title="Singly Linked List" paths={paths} />          <Content />
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
          <CodeBlock title="Singly Linked List Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.isFull}
            title="Singly Linked List"
            description="Mark Singly Linked List as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section>
          <ExploreOther
          title="Explore Other Types"
          links={[
            { text: "Doubly Linked List", url: "./doubly" },
            { text: "Circular Linked List", url: "./circular" },
          ]}
        />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
