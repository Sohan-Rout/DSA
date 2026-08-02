import Animation from "@/app/visualizer/queue/operations/isempty/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/queue/operations/isempty/content";
import Quiz from "@/app/visualizer/queue/operations/isempty/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from '@/app/components/ui/exploreOther';
import Footer from '@/app/components/footer';
import BackToTop from '@/app/components/ui/backtotop';

export const metadata = {
  title: "Queue Is Empty Operation | Learn with JS, C, Python, Java Code",
  description:
    "Learn how to check if a Queue is empty using interactive visualizations and complete code examples in JavaScript, C, Python, and Java. Ideal for DSA beginners and interview prep.",
  keywords: [
    "Queue Is Empty",
    "Is Empty Operation Queue",
    "Queue Empty Condition",
    "Queue Code in JavaScript",
    "Queue Code in C",
    "Queue Code in Python",
    "Queue Code in Java",
    "DSA Queue Check",
    "Queue Operations",
    "Visualize Queue",
    "Learn Queue DSA",
    "Queue Data Structure",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/queue/isEmpty.png",
        width: 1200,
        height: 630,
        alt: "isEmpty Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Queue : IsEmpty", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Queue" title="IsEmpty" paths={paths} />          <Content />
        </section>

        <section className="px-6">
          <Animation />
        </section>

        <section className="px-6">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />
        </section>

        <section className="px-6">
          <CodeBlock title="Queue Implementation (IsEmpty)" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.queueIsEmpty}
            title="Queue : IsEmpty"
            description="Mark queue : isEmpty as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
          title="Explore Other Operations"
          links={[
            { text: "Peek Front", url: "./peek-front" },
            { text: "Enqueue & Dequeue", url: "./enqueue-dequeue" },
            { text: "Is Full", url: "./isfull" },
          ]}
        />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
