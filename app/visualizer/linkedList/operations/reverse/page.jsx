import Animation from "@/app/visualizer/linkedList/operations/reverse/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import Content from "@/app/visualizer/linkedList/operations/reverse/content";
import Quiz from "@/app/visualizer/linkedList/operations/reverse/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";

export const metadata = {
    openGraph: {
        url: "/visualizer/linkedList/operations/reverse",
        siteName: "DSA Visualizer",
        images: [{ url: "/og.png", width: 1200, height: 630, alt: "DSA Visualizer" }],
        locale: "en_US",
        type: "website",
    },
    alternates: { canonical: "/visualizer/linkedList/operations/reverse" },
    title: 'Linked List Reverse Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Explore how reversing a linked list works with interactive animations, clear explanations, and hands-on practice. Visualize each step of the reverse process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Reverse',
        'Reverse Animation Linked List',
        'Visualize Reverse in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Reverse',
        'Linked List Reverse Visualization',
        'Interactive Linked List',
        'Reverse Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Reverse Code Example',
        'Linked List Tutorial',
        'Reverse using C',
        'Reverse using Java',
        'Reverse using Javascript',
        'Reverse using Python',
        'Reverse linked list',
    ],
    robots: 'index, follow',
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Reverse", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Operations" title="Reverse" paths={paths} />
          <Content />
        </section>

        <section>
          <Animation />
        </section>

        <section className="px-2">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-2">
            Test Your Knowledge Before Moving Forward!
          </p>
          <Quiz />
        </section>

        <section className="px-2">
          <CodeBlock title="Linked List Reversal Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.linkedListReverse}
            title="Reverse"
            description="Mark Reverse as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
            title="Explore Other Operations"
            links={[
              { text: "Insertion", url: "./insertion" },
              { text: "Deletion", url: "./deletion" },
              { text: "Traversal", url: "./traversal" },
              { text: "Comparison", url: "./comparison" },
              { text: "Searching", url: "./search" },
              { text: "Merging", url: "./merge" },
            ]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}