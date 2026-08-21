import Animation from "@/app/visualizer/linkedList/types/doubly/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import Content from "@/app/visualizer/linkedList/types/doubly/content";
import Quiz from "@/app/visualizer/linkedList/types/doubly/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";

export const metadata = {
  openGraph: {
    url: "/visualizer/linkedList/types/doubly",
    siteName: "DSA Visualizer",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DSA Visualizer" }],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "/visualizer/linkedList/types/doubly" },
  title: 'Doubly Linked List Implementation | Visualize Doubly Linked List in JS, C, Python, Java',
  description: 'Explore Doubly Linked List implementation with interactive animations and code examples in JavaScript, C, Python, and Java. Learn insertion, deletion, and traversal from both directions. Perfect for DSA beginners and interview preparation.',
  keywords: [
    'Doubly Linked List Implementation',
    'DLL Visualization',
    'Doubly Linked List in JavaScript',
    'Doubly Linked List in C',
    'Doubly Linked List in Python',
    'Doubly Linked List in Java',
    'DSA Doubly Linked List',
    'Bidirectional Linked List',
    'Insertion in DLL',
    'Deletion in DLL',
    'DLL Operations',
    'Learn Doubly Linked List',
    'DSA for Beginners',
    'Interactive Linked List Visualizer',
  ],
  robots: 'index, follow',
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Doubly", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Types" title="Doubly Linked List" paths={paths} />
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
          <CodeBlock title="Doubly Linked List Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.doublyLinkedList}
            title="Doubly Linked List"
            description="Mark Doubly Linked List as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Types"
            links={[
              { text: "Singly Linked List", url: "./singly" },
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