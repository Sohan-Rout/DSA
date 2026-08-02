import Animation from "@/app/visualizer/queue/operations/isfull/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/queue/operations/isfull/content";
import Quiz from '@/app/visualizer/queue/operations/isfull/quiz';
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from '@/app/components/ui/exploreOther';
import Footer from '@/app/components/footer';
import BackToTop from '@/app/components/ui/backtotop';

export const metadata = {
  title: "Queue Is Full Operation | Learn with JS, C, Python, Java Code",
  description:
    "Understand how to check if a Queue is full using interactive visualizations and detailed code examples in JavaScript, C, Python, and Java. Perfect for mastering DSA and technical interviews.",
  keywords: [
    "Queue Is Full",
    "Is Full Operation Queue",
    "Queue Full Condition",
    "Queue Capacity Check",
    "Queue Code in JavaScript",
    "Queue Code in C",
    "Queue Code in Python",
    "Queue Code in Java",
    "Queue DSA",
    "Learn Queue Operations",
    "Queue Data Structure",
    "Visualize Queue",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/queue/isFull.png",
        width: 1200,
        height: 630,
        alt: "isFull Algorithm Visualization",
      },
    ],
  },
};

export default function page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Queue : IsFull", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Queue" title="IsFull" paths={paths} />          <Content />
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
          <CodeBlock title="Queue IsFull Operation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
                  <ModuleCard
                    moduleId={MODULE_MAPS.queueIsFull}
                    title="Queue : IsFull"
                    description="Mark queue : isFull as done and view it on your dashboard"
                    initialDone={false}
                  />
                </section>

                <section className="px-6">
                  <ExploreOther
          title="Explore Other Operations"
          links={[
            { text: "Peek Front", url: "./peek-front" },
            { text: "Enqueue & Dequeue", url: "./enqueue-dequeue" },
            { text: "Is Empty", url: "./isempty" },
          ]}
        />
                </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
