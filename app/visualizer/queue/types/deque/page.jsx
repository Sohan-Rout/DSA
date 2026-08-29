import Animation from "@/app/visualizer/queue/types/deque/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/queue/types/deque/content";
import Quiz from "@/app/visualizer/queue/types/deque/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from '@/app/components/ui/exploreOther';
import Footer from '@/app/components/footer';
import BackToTop from '@/app/components/ui/backtotop';

export const metadata = {
  alternates: { canonical: "/visualizer/queue/types/deque" },
  title: "Deque Visualizer (Double Ended Queue)",
  description:
    "Explore Double Ended Queue (Deque) in Data Structures with visual animations and full code implementations in JavaScript, C, Python, and Java. Perfect for mastering DSA concepts and interview preparation.",
  keywords: [
    "Double Ended Queue",
    "Double Ended Queue Visualizer",
    "Deque in DSA",
    "DSA Deque",
    "Double Ended Queue in JavaScript",
    "Deque in C",
    "Deque in Python",
    "Deque in Java",
    "DSA Queue Operations",
    "Learn Deque DSA",
    "Deque Code Examples",
    "DSA Visualizer",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/queue/doubleEndedQueue.png",
        width: 1200,
        height: 630,
        alt: "Double Ended Queue Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Queue : Double Ended", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Queue" title="Double Ended" paths={paths} />          <Content />
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
          <CodeBlock title="Double Ended Queue Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.doubleEnded}
            title="Double Ended"
            description="Mark Double Ended Queue as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
          title="Explore Other Types"
          links={[
            { text: "Single Ended Queue", url: "./singleEnded" },
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
