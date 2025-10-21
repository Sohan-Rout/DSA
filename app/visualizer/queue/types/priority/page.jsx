import Animation from "@/app/visualizer/queue/types/priority/animation";
import Navbar from "@/app/components/navbarinner";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ArticleActions from "@/app/components/ui/ArticleActions";
import Content from "@/app/visualizer/queue/types/priority/content";
import Quiz from "@/app/visualizer/queue/types/priority/quiz";
import Code from "@/app/visualizer/queue/types/priority/codeBlock";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";

export const metadata = {
  title:
    "Priority Queue Algorithm | Visual Guide with Code in JavaScript, C, Python, Java",
  description:
    "Master Priority Queue in Data Structures with easy-to-understand visualizations and complete code examples in JavaScript, C, Python, and Java. Perfect for DSA learners and coding interview prep.",
  keywords: [
    "Priority Queue",
    "Priority Queue DSA",
    "Priority Queue Data Structure",
    "Priority Queue in JavaScript",
    "Priority Queue in C",
    "Priority Queue in Python",
    "Priority Queue in Java",
    "Priority Queue Examples",
    "DSA Queue Operations",
    "Learn Priority Queue",
    "Priority Queue Code",
    "Priority Queue Visualization",
    "DSA Visualizer",
    "Priority Queue for Interviews",
    "Priority Queue Tutorial",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/queue/priorityQueue.png",
        width: 1200,
        height: 630,
        alt: "Priority Queue Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Priority Queue", href: "" },
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
                Queue
              </p>
            </div>
            <h1 className="text-4xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-0">
              Priority Queue
            </h1>
            <ArticleActions />
          </div>
          <div className="bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl my-10"></div>
          <Content />
        </section>

        <section className="px-6">
          <Animation />
        </section>

        <section className="px-6">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />
        </section>

        <section className="px-6">
          <Code />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.priorityQueue}
            title="Priority Queue"
            description="Mark Priority Queue as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Types"
            links={[
              { text: "Single Ended Queue", url: "./singleEnded" },
              { text: "Circular Queue", url: "./circular" },
              { text: "Double-Ended Queue", url: "./deque" },
              { text: "Multiple Queue", url: "./multiple" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
