import Animation from "@/app/visualizer/sorting/bubblesort/animation";
import Navbar from "@/app/components/navbarinner";
import BackToTopButton from "@/app/components/ui/backtotop";
import Footer from "@/app/components/footer";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ArticleActions from "@/app/components/ui/ArticleActions";
import Content from "@/app/visualizer/sorting/bubblesort/content";
import Quiz from "@/app/visualizer/sorting/bubblesort/quiz";
import Code from "@/app/visualizer/sorting/bubblesort/codeBlock";
import ExploreOther from "@/app/components/ui/exploreOther";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Bubble Sort Algorithm | Step-by-Step Animation",
  description:
    "Visualize Bubble Sort in action with interactive animations, code examples in JavaScript, C, Python, and Java, and test your understanding with a dedicated Bubble Sort quiz. Learn how Bubble Sort works through comparisons and swaps in an easy-to-understand format.",
  keywords: [
    "Bubble Sort Visualizer",
    "Bubble Sort Animation",
    "Bubble Sort Algorithm",
    "Bubble Sort Quiz",
    "Sorting Algorithm Quiz",
    "Sorting Algorithm Visualization",
    "DSA Bubble Sort",
    "Learn Bubble Sort",
    "Sorting for Beginners",
    "Step by Step Bubble Sort",
    "Interactive Sorting Tool",
    "Bubble Sort in JavaScript",
    "Bubble Sort in C",
    "Bubble Sort in Python",
    "Bubble Sort in Java",
    "Bubble Sort Code Examples",
    "Practice Bubble Sort",
    "DSA Bubble Sort Quiz",
    "Interactive DSA Quiz",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/sorting/bubbleSort.png",
        width: 1200,
        height: 630,
        alt: "Bubble Sort Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visulaizer", href: "/visualizer" },
    { name: "Bubble Sort", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <div className="mt-10 sm:mt-10 mb-4">
            <Breadcrumbs paths={paths} />
          </div>
          <div className="flex items-center flex-col">
            <div className="flex">
              <p className="uppercase tracking-wide bg-green-500 dark:text-black px-4 py-1 mb-2 rounded-full">
                Sorting
              </p>
            </div>
            <h1 className="text-4xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-0">
              Bubble Sort
            </h1>
            <ArticleActions />
          </div>
          <div className="bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl my-10"></div>
          <Content />
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
          <Code />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.bubbleSort}
            title="Bubble Sort"
            description="Mark Bubble Sort as done and view it on your dashboard"
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
            {
              text: "Insertion Sort",
              url: "/visualizer/sorting/insertionsort",
            },
            { text: "Merge Sort", url: "/visualizer/sorting/mergesort" },
            { text: "Quick Sort", url: "/visualizer/sorting/quicksort" },
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
