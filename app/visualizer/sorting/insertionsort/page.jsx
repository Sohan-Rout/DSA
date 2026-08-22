import Animation from "@/app/visualizer/sorting/insertionsort/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/sorting/insertionsort/content";
import Quiz from "@/app/visualizer/sorting/insertionsort/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ExploreOther from "@/app/components/ui/exploreOther";
import BackToTopButton from "@/app/components/ui/backtotop";
import Footer from "@/app/components/footer";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/sorting/insertionsort" },
  title: "Insertion Sort Visualizer",
  description:
    "Understand how Insertion Sort works through step-by-step animations and test your knowledge with an interactive quiz. Includes code examples in JavaScript, C, Python, and Java. Perfect for beginners learning data structures and algorithms visually and through hands-on coding.",
  keywords: [
    "Insertion Sort Visualizer",
    "Insertion Sort Animation",
    "Insertion Sort Visualization",
    "DSA Insertion Sort",
    "Learn Insertion Sort",
    "Insertion Sort Quiz",
    "Sorting Algorithm Quiz",
    "Sorting Algorithm Visualization",
    "Step by Step Insertion Sort",
    "Interactive DSA Tool",
    "DSA for Beginners",
    "Insertion Sort Explained",
    "Practice Insertion Sort",
    "Interactive Insertion Sort Quiz",
    "Insertion Sort in JavaScript",
    "Insertion Sort in C",
    "Insertion Sort in Python",
    "Insertion Sort in Java",
    "Insertion Sort Code Examples",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/sorting/insertionSort.png",
        width: 1200,
        height: 630,
        alt: "Insertion Sort Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Insertion Sort", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Sorting" title="Insertion Sort" paths={paths} />          <Content />
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
          <CodeBlock title="Insertion Sort Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.insertionSort}
            title="Insertion Sort"
            description="Mark Insertion Sort as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
          <ExploreOther
          title="Explore Sorting Algorithms"
          links={[
            { text: "Selection Sort", url: "/visualizer/sorting/selectionsort" },
            { text: "Bubble Sort", url: "/visualizer/sorting/bubblesort" },
            { text: "Merge Sort", url: "/visualizer/sorting/mergesort" },
            { text: "Quick Sort" , url: "/visualizer/sorting/quicksort"},
            { text: "Heap Sort", url: "/algorithms/sorting/heap" },
          ]}
        />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}