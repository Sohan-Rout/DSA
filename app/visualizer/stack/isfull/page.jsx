import Animation from "@/app/visualizer/stack/isfull/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/stack/isfull/content";
import Quiz from "@/app/visualizer/stack/isfull/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from '@/app/components/ui/exploreOther';
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
  alternates: { canonical: "/visualizer/stack/isfull" },
  title:
    "Stack isFull Visualizer",
  description:
    "Understand how to check if a Stack is full using interactive animations and code examples in JavaScript, C, Python, and Java. A simple guide for beginners and DSA interview preparation.",
  keywords: [
    "Stack Is Full",
    "Is Full Operation Stack",
    "Stack Full Condition",
    "Stack Capacity Check",
    "DSA Stack Animation",
    "Learn Stack Operations",
    "Stack in JavaScript",
    "Stack in C",
    "Stack in Python",
    "Stack in Java",
    "Stack Code Examples",
    "Stack Overflow Condition",
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
    { name: "Stack : IsFull", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Stack" title="IsFull Operation" paths={paths} />          <Content />
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
          <CodeBlock title="Stack IsFull Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.isFull}
            title="Stack isFull"
            description="Mark Stack : isFull as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section>
          <ExploreOther
            title="Explore other operations"
            links={[
              { text: "Peek", url: "/visualizer/stack/peek" },
              { text: "Is Empty", url: "/visualizer/stack/isempty" },
              { text: "Push Pop", url: "/visualizer/stack/push-pop" },
            ]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
