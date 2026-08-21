import Animation from "@/app/visualizer/stack/polish/postfix/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/stack/polish/postfix/content";
import Quiz from "@/app/visualizer/stack/polish/postfix/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import Footer from "@/app/components/footer";
import ExploreOther from "@/app/components/ui/exploreOther";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
  alternates: { canonical: "/visualizer/stack/polish/postfix" },
  title:
    "Postfix Notation using Stack | Learn Postfix Evaluation in DSA with Code in JS, C, Python, Java",
  description:
    "Visualize how Postfix expressions are evaluated using a Stack through interactive animations and code examples in JavaScript, C, Python, and Java. Perfect for DSA beginners and technical interview preparation.",
  keywords: [
    "Postfix Notation",
    "Postfix Evaluation Stack",
    "Stack DSA",
    "Postfix Expression",
    "DSA Postfix",
    "Evaluate Postfix using Stack",
    "Learn Postfix Notation",
    "Postfix Evaluation in JavaScript",
    "Postfix Evaluation in C",
    "Postfix Evaluation in Python",
    "Postfix Evaluation in Java",
    "Stack Code Examples",
    "DSA Expression Evaluation",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/stack/postfix.png",
        width: 1200,
        height: 630,
        alt: "Stack infix to postfix",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Stack : Infix to postfix", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Stack" title="Infix to Postfix" paths={paths} />          <Content />
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
          <CodeBlock title="PostFix implementation using Stack" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.postfix}
            title="Polish : Postfix Notation"
            description="Mark Polish : postfix as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section>
          <ExploreOther
            title="Explore other conversions"
            links={[{ text: "Infix to Prefix", url: "./prefix" }]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
