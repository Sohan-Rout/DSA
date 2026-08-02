import Animation from "@/app/visualizer/stack/push-pop/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/stack/push-pop/content";
import Quiz from "@/app/visualizer/stack/push-pop/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ExploreOther from "@/app/components/ui/exploreOther";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import Footer from '@/app/components/footer';
import BackToTopButton from '@/app/components/ui/backtotop';

export const metadata = {
  title:
    "Stack Push & Pop Visualizer & Quiz | Learn Stack Operations with Code in JS, C, Python, Java",
  description:
    "Understand Stack Push and Pop operations through step-by-step animations and test your knowledge with an interactive quiz. Includes code examples in JavaScript, C, Python, and Java. Ideal for beginners and interview preparation to master stack-based data structures visually and through hands-on coding.",
  keywords: [
    "Stack Push Visualizer",
    "Stack Pop Visualizer",
    "Push and Pop Animation",
    "Stack Operations",
    "Stack Algorithm",
    "Stack Quiz",
    "Data Structure Visualization",
    "Learn Stack Push",
    "Learn Stack Pop",
    "Interactive Stack Tool",
    "Practice Stack Operations",
    "Test Stack Knowledge",
    "Stack in JavaScript",
    "Stack in C",
    "Stack in Python",
    "Stack in Java",
    "Stack Code Examples",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/stack/pushPop.png",
        width: 1200,
        height: 630,
        alt: "Stack Push and Pop Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Stack : Push & Pop", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Stack" title="Push & Pop" paths={paths} />          <Content />
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
          <CodeBlock title="Stack Push & Pop Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.pushPop}
            title="Stack Push Pop"
            description="Mark Stack : Push & Pop as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore other operations"
            links={[
              { text: "Peek", url: "/visualizer/stack/peek" },
              { text: "Is Empty", url: "/visualizer/stack/isempty" },
              { text: "Is Full", url: "/visualizer/stack/isfull" },
            ]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
