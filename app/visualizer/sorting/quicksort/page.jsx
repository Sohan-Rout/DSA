import Animation from "@/app/visualizer/sorting/quicksort/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/sorting/quicksort/content";
import Quiz from "@/app/visualizer/sorting/quicksort/quiz";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import ExploreOther from "@/app/components/ui/exploreOther";
import BackToTopButton from "@/app/components/ui/backtotop";
import Footer from "@/app/components/footer";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title:
    "Quick Sort Algorithm | Learn with Interactive Animations",
  description:
    "Learn how Quick Sort works with step-by-step animations and test your knowledge with an interactive quiz. Includes code examples in JavaScript, C, Python, and Java. Perfect for beginners learning this efficient divide-and-conquer sorting algorithm visually and through hands-on coding.",
  keywords: [
    "Quick Sort Visualizer",
    "Quick Sort Animation",
    "Quick Sort Visualization",
    "Quick Sort Algorithm",
    "Quick Sort Quiz",
    "Sorting Algorithm Quiz",
    "Divide and Conquer Sorting",
    "Sorting Algorithm Visualization",
    "Learn Quick Sort",
    "DSA Quick Sort",
    "Practice Quick Sort",
    "Interactive Quick Sort Tool",
    "Test Quick Sort Knowledge",
    "Quick Sort in JavaScript",
    "Quick Sort in C",
    "Quick Sort in Python",
    "Quick Sort in Java",
    "Quick Sort Code Examples",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/sorting/quickSort.png",
        width: 1200,
        height: 630,
        alt: "Quick Sort Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Quick Sort", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Sorting" title="Quick Sort" paths={paths} />          <Content />
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
          <CodeBlock title="Quick Sort Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.quickSort}
            title="Quick Sort"
            description="Mark Quick Sort as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Sorting Algorithms"
            links={[
              {
                text: "Selection Sort",
                url: "/visualizer/sorting/selectionsort",
              },
              { text: "Bubble Sort", url: "/visualizer/sorting/bubblesort" },
              {
                text: "Insertion Sort",
                url: "/visualizer/sorting/insertionsort",
              },
              { text: "Merge Sort", url: "/visualizer/sorting/mergesort" },
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
