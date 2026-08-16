import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/queue/implementation/linkedList/content";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";

export const metadata = {
  title:
    "Queue Implementation Using Linked List | Visualize Queue in JS, C, Python, Java",
  description:
    "Explore Queue implementation using Linked List with real-time visualizations and code examples in JavaScript, C, Python, and Java. Understand how Enqueue and Dequeue work in a dynamic memory structure. Perfect for DSA beginners and interview prep.",
  keywords: [
    "Queue Implementation",
    "Queue using Linked List",
    "Enqueue Dequeue Operations",
    "Queue Data Structure",
    "Linked List Queue",
    "Queue Visualization",
    "DSA Queue Tutorial",
    "Queue in JavaScript",
    "Queue in C",
    "Queue in Python",
    "Queue in Java",
    "Learn Queue",
    "Interactive DSA Tools",
    "DSA with Linked List",
    "DSA for Beginners",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/queue/queueLinkedList.png",
        width: 1200,
        height: 630,
        alt: "Implementation of Queue using Linked List Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Queue using Linked List", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Queue" title="Using Linked List" paths={paths} />          <Content />
        </section>

        <section className="px-2">
          <CodeBlock title="Implementation Enqueue & Dequeue" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.queueLinkedList}
            title="Queue Using Linked List"
            description="Mark Queue implementation using Linked List as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore other implementation"
            links={[{ text: "Using Array", url: "./array" }]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
