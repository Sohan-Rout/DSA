import Animation from "@/app/visualizer/sorting/insertionsort/animation";
import Navbar from "@/app/components/navbarinner";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ArticleActions from "@/app/components/ui/ArticleActions";
import Content from "@/app/visualizer/sorting/insertionsort/content";
import Quiz from "@/app/visualizer/sorting/insertionsort/quiz";
import Code from "@/app/visualizer/sorting/insertionsort/codeBlock";
import ExploreOther from "@/app/components/ui/exploreOther";
import BackToTopButton from "@/app/components/ui/backtotop";
import Footer from "@/app/components/footer";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Insertion Sort Algorithm | Learn with Interactive Animations",
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
              Insertion Sort
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
            moduleId={MODULE_MAPS.insertionSort}
            title="Insertion Sort"
            description="Mark Insertion Sort as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
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