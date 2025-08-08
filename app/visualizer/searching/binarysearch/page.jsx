import Animation from "@/app/visualizer/searching/binarysearch/animation";
import Navbar from "@/app/components/navbarinner";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/visualizer/searching/binarysearch/codeBlock";
import Quiz from "@/app/visualizer/searching/binarysearch/quiz";
import Content from '@/app/visualizer/searching/binarysearch/content';
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ArticleActions from "@/app/components/ui/ArticleActions";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Binary Search Algorithm | Step-by-Step Animation",
  description:
    "Visualize the Binary Search algorithm with intuitive step-by-step animations, code examples in JavaScript, C, Python, and Java, and an interactive Binary Search Quiz to test your knowledge. Perfect for DSA preparation and beginners learning efficient search algorithms.",
  keywords: [
    "Binary Search Visualizer",
    "Binary Search Visualization",
    "Binary Search Animation",
    "Learn Binary Search",
    "Binary Search for Beginners",
    "Binary Search Step-by-Step",
    "Visualize Binary Search Algorithm",
    "DSA Binary Search",
    "Binary Search Explanation",
    "Binary Search Visualization Tool",
    "Efficient Searching Algorithms",
    "Binary Search in JavaScript",
    "Binary Search in C",
    "Binary Search in Python",
    "Binary Search in Java",
    "Binary Search Code Examples",
    "Binary Search Quiz",
    "Interactive Binary Search Quiz",
    "DSA Quiz",
    "Quiz for Binary Search",
    "Learn DSA with Quizzes",
    "Binary Search Practice",
    "Test Your Binary Search Skills",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/binarySearch.png",
        width: 1200,
        height: 630,
        alt: "Binary Search Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visulaizer", href: "/visualizer" },
    { name: "Binary Search", href: "" },
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
                Searching
              </p>
            </div>
            <h1 className="text-4xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-0">
              Binary Search
            </h1>
            <ArticleActions />
          </div>
          <div className="bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl my-10"></div>
          <Content />
        </section>

        <section>
          <Animation />
        </section>

        <section>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />
        </section>

        <section>
          <CodeBlock />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.binarySearch}
            title="Binary Search"
            description="Mark binary search as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section>
          <ExploreOther
            title="Explore other operations"
            links={[{ text: "Linear Search", url: "./linearsearch" }]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
