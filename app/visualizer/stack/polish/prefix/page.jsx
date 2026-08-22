import Animation from "@/app/visualizer/stack/polish/prefix/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/stack/polish/prefix/content";
import Quiz from "@/app/visualizer/stack/polish/postfix/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import Footer from "@/app/components/footer";
import ExploreOther from "@/app/components/ui/exploreOther";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
  alternates: { canonical: "/visualizer/stack/polish/prefix" },
  title:
    "Infix to Prefix Visualizer",
  description:
    "Understand how to evaluate Prefix expressions using a Stack with interactive animations and code examples in JavaScript, C, Python, and Java. Essential for mastering DSA concepts and preparing for interviews.",
  keywords: [
    "Prefix Notation",
    "Prefix Evaluation Stack",
    "Stack DSA",
    "Prefix Expression",
    "DSA Prefix",
    "Evaluate Prefix using Stack",
    "Learn Prefix Notation",
    "Prefix Evaluation in JavaScript",
    "Prefix Evaluation in C",
    "Prefix Evaluation in Python",
    "Prefix Evaluation in Java",
    "Stack Code Examples",
    "DSA Expression Evaluation",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/stack/prefix.png",
        width: 1200,
        height: 630,
        alt: "Stack infix to prefix",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Stack : Infix to prefix", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Stack" title="Infix to Prefix" paths={paths} />          <Content />
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
          <CodeBlock title="PreFix implementation using Stack" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.prefix}
            title="Polish : Prefix Notation"
            description="Mark Polish : prefix as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section>
          <ExploreOther
          title="Explore other conversions"
          links={[
            { text: "Infix to Postfix", url: "./postfix" },
          ]}
        />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
