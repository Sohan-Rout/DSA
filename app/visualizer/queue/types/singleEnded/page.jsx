import Animation from "@/app/visualizer/queue/types/singleEnded/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/queue/types/singleEnded/content";
import Quiz from "@/app/visualizer/queue/types/singleEnded/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from '@/app/components/ui/exploreOther';
import Footer from '@/app/components/footer';
import BackToTop from '@/app/components/ui/backtotop';

export const metadata = {
  alternates: { canonical: "/visualizer/queue/types/singleEnded" },
  title: "Single Ended Queue Visualizer",
  description:
    "Understand Single Ended Queue in Data Structures with animations and full code examples in JavaScript, C, Python, and Java. Ideal for beginners learning queue operations and preparing for interviews.",
  keywords: [
    "Single Ended Queue",
    "Single Ended Queue DSA",
    "Queue Data Structure",
    "Single Ended Queue in JavaScript",
    "Single Ended Queue in C",
    "Single Ended Queue in Python",
    "Single Ended Queue in Java",
    "DSA Queue Operations",
    "Learn Queue DSA",
    "Queue Code Examples",
    "DSA Visualizer",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/queue/singleEndedQueue.png",
        width: 1200,
        height: 630,
        alt: "Single Ended Queue Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Queue : Single Ended", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Queue" title="Single Ended" paths={paths} />          <Content />
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
          <CodeBlock title="Single Ended Queue Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.singleEnded}
            title="Single Ended"
            description="Mark Single Ended Queue as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
          title="Explore Other Types"
          links={[
            { text: "Double Ended Queue", url: "./deque" },
            { text: "Circular Queue", url: "./circular" },
            { text: "Multiple Queue", url: "./multiple" },
            { text: "Priority Queue", url: "./priority" },
          ]}
        />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
