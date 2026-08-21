import Animation from "@/app/visualizer/stack/peek/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/stack/peek/content";
import Quiz from "@/app/visualizer/stack/peek/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from '@/app/components/ui/exploreOther';
import Footer from '@/app/components/footer';
import BackToTopButton from '@/app/components/ui/backtotop';

export const metadata = {
  alternates: { canonical: "/visualizer/stack/peek" },
  title:
    "Stack Peek Visualizer | Understand Peek Operation in Stack with Code in JS, C, Python, Java",
  description:
    "Learn how the Peek operation works in a Stack using interactive animations and code examples in JavaScript, C, Python, and Java. Perfect for beginners and DSA interview preparation.",
  keywords: [
    "Stack Peek",
    "Peek Operation Stack",
    "Stack Top Element",
    "Peek in DSA",
    "DSA Stack Animation",
    "Learn Stack Operations",
    "Stack in JavaScript",
    "Stack in C",
    "Stack in Python",
    "Stack in Java",
    "Peek Operation Example",
    "Stack Code Examples",
    "Top of Stack",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/stack/peek.png",
        width: 1200,
        height: 630,
        alt: "Stack Peek Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Stack : Peek", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Stack" title="Peek Operation" paths={paths} />          <Content />
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
          <CodeBlock title="Stack Peek Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.peek}
            title="Stack Peek"
            description="Mark Stack : Peek as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
          title="Explore other operations"
          links={[
            { text: "Push & Pop", url: "/visualizer/stack/push-pop" },
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
