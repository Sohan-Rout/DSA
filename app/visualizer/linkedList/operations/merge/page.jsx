import Animation from "@/app/visualizer/linkedList/operations/merge/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import Content from "@/app/visualizer/linkedList/operations/merge/content";
import Quiz from "@/app/visualizer/linkedList/operations/merge/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";

export const metadata = {
    openGraph: {
        url: "/visualizer/linkedList/operations/merge",
        siteName: "DSA Visualizer",
        images: [{ url: "/og.png", width: 1200, height: 630, alt: "DSA Visualizer" }],
        locale: "en_US",
        type: "website",
    },
    alternates: { canonical: "/visualizer/linkedList/operations/merge" },
    title: 'Linked List Merge Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Learn how merging works in Linked Lists with interactive animations, detailed explanations, and hands-on practice. Visualize each step of the merge process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Merge',
        'Merge Animation Linked List',
        'Visualize Merge in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Merge',
        'Linked List Merge Visualization',
        'Interactive Linked List',
        'Merge Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Merge Code Example',
        'Linked List Tutorial',
        'Merge using C',
        'Merge using Java',
        'Merge using Javascript',
        'Merge using Python',
        'Merge using linked list',
    ],
    robots: 'index, follow',
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Merge", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Operations" title="Merge" paths={paths} />
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
          <CodeBlock title="Linked List Merging Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.linkedListMerge}
            title="Merge"
            description="Mark Merge as done and view it on your dashboard"
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
              { text: "Reverse", url: "./reverse" },
            ]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}