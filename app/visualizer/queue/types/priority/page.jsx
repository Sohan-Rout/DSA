import Animation from "@/app/visualizer/queue/types/priority/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/queue/types/priority/content";
import Quiz from "@/app/visualizer/queue/types/priority/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";

export const metadata = {
  title:
    "Priority Queue Algorithm | Visual Guide with Code in JavaScript, C, Python, Java",
  description:
    "Master Priority Queue in Data Structures with easy-to-understand visualizations and complete code examples in JavaScript, C, Python, and Java. Perfect for DSA learners and coding interview prep.",
  keywords: [
    "Priority Queue",
    "Priority Queue DSA",
    "Priority Queue Data Structure",
    "Priority Queue in JavaScript",
    "Priority Queue in C",
    "Priority Queue in Python",
    "Priority Queue in Java",
    "Priority Queue Examples",
    "DSA Queue Operations",
    "Learn Priority Queue",
    "Priority Queue Code",
    "Priority Queue Visualization",
    "DSA Visualizer",
    "Priority Queue for Interviews",
    "Priority Queue Tutorial",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/queue/priorityQueue.png",
        width: 1200,
        height: 630,
        alt: "Priority Queue Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Priority Queue", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Queue" title="Priority Queue" paths={paths} />          <Content />
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
          <CodeBlock title="Priority Queue Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.priorityQueue}
            title="Priority Queue"
            description="Mark Priority Queue as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Types"
            links={[
              { text: "Single Ended Queue", url: "./singleEnded" },
              { text: "Circular Queue", url: "./circular" },
              { text: "Double-Ended Queue", url: "./deque" },
              { text: "Multiple Queue", url: "./multiple" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
