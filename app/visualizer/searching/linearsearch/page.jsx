import LinearSearchAnimation from "@/app/visualizer/searching/linearsearch/animation";
import Navbar from "@/app/components/navbarinner";
import BackToTopButton from "@/app/components/ui/backtotop";
import Footer from "@/app/components/footer";
import ExploreOther from "@/app/components/ui/exploreOther";
import Code from "@/app/visualizer/searching/linearsearch/codeBlock";
import Quiz from "@/app/visualizer/searching/linearsearch/quiz";
import Content from "@/app/visualizer/searching/linearsearch/content";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ArticleActions from "@/app/components/ui/ArticleActions";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  title: "Linear Search Algorithm | Step-by-Step Animation",
  description:
    "Visualize the Linear Search algorithm with step-by-step animations, code examples in JavaScript, C, Python, and Java, and a Linear Search Quiz to test your understanding. Build a strong foundation in DSA through interactive learning.",
  keywords: [
    "Linear Search Visualizer",
    "Linear Search Visualization",
    "Linear Search Animation",
    "Learn Linear Search",
    "Linear Search for Beginners",
    "Step-by-Step Linear Search",
    "Visualize Linear Search Algorithm",
    "DSA Linear Search",
    "Algorithm Visualizer",
    "DSA Searching Algorithms",
    "Search Algorithms DSA",
    "Linear Search in JavaScript",
    "Linear Search in C",
    "Linear Search in Python",
    "Linear Search in Java",
    "Linear Search Code Examples",
    "Linear Search Quiz",
    "Interactive Linear Search Quiz",
    "DSA Quiz",
    "Quiz for Searching Algorithms",
    "Learn DSA with Quizzes",
    "Linear Search Practice",
    "Test Your Linear Search Skills",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/searching/linearSearch.png",
        width: 1200,
        height: 630,
        alt: "Linear Search Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linear Search", href: "" },
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
              Linear Search
            </h1>
            <ArticleActions />
          </div>
          <div className="bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl my-10"></div>
          <Content />
        </section>

        <section>
          <LinearSearchAnimation />
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
            moduleId={MODULE_MAPS.linearSearch}
            title="Linear Search"
            description="Mark linear search as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore other operations"
            links={[{ text: "Binary Search", url: "./binarysearch" }]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
