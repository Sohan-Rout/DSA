import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/stack/implementation/usingArray/content";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import Footer from "@/app/components/footer";
import ExploreOther from "@/app/components/ui/exploreOther";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
  alternates: { canonical: "/visualizer/stack/implementation/usingArray" },
  title:
    "Stack Implementation using Array | Learn Stack in DSA with JS, C, Python, Java Code",
  description:
    "Understand how to implement a Stack using an Array with visual explanations, animations, and complete code examples in JavaScript, C, Python, and Java. Perfect for DSA beginners and interview prep.",
  keywords: [
    "Stack using Array",
    "Stack Implementation",
    "Stack Implementation in JavaScript",
    "Stack Implementation in C",
    "Stack Implementation in Python",
    "Stack Implementation in Java",
    "DSA Stack",
    "Array Stack",
    "Data Structures Stack",
    "Stack Push Pop Array",
    "Learn Stack DSA",
    "Visualize Stack Implementation",
    "Stack Code Examples",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/stack/stackArray.png",
        width: 1200,
        height: 630,
        alt: "Stack Implementation using Array",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Stack : Implementation Using Array", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Stack" title="Implementation Using Array" paths={paths} />          <Content />
        </section>

        <section className="px-2">
          <CodeBlock title="Stack Implementation using Array" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.stackArray}
            title="Stack Implementation using Array"
            description="Mark Stack using Array as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section>
          <ExploreOther
            title="Explore other implementation"
            links={[{ text: "Using Linked List", url: "./usingLinkedList" }]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
