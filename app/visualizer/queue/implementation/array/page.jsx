import Navbar from "@/app/components/navbarinner";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ArticleActions from "@/app/components/ui/ArticleActions";
import Content from "@/app/visualizer/queue/implementation/array/content";
import Code from "@/app/visualizer/queue/implementation/array/codeblock";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from '@/app/components/ui/exploreOther';
import Footer from '@/app/components/footer';
import BackToTop from '@/app/components/ui/backtotop';

export const metadata = {
  title:
    "Queue Implementation Using Array | Visualize Queue Operations in JS, C, Python, Java",
  description:
    "Learn Queue implementation using arrays with real-time visualizations and code examples in JavaScript, C, Python, and Java. Understand how Enqueue and Dequeue work step-by-step without quizzes. Ideal for DSA beginners.",
  keywords: [
    "Queue Implementation",
    "Queue using Array",
    "Enqueue Dequeue Operations",
    "Queue Data Structure",
    "Queue Visualization",
    "DSA Queue Tutorial",
    "Queue in JavaScript",
    "Queue in C",
    "Queue in Python",
    "Queue in Java",
    "Learn Queue",
    "Interactive Queue Visualizer",
    "Array based Queue",
    "DSA for Beginners",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/queue/queueArray.png",
        width: 1200,
        height: 630,
        alt: "Implementation of Queue using Array Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Queue using Array", href: "" },
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
              Using Array
            </h1>
            <ArticleActions />
          </div>
          <div className="bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl my-10"></div>
          <Content />
        </section>

        <section className="px-6">
          <Code />
        </section>

        <section className="px-6 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.queueArray}
            title="Queue Using Array"
            description="Mark Queue implementation using Array as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
          title="Explore other implementation"
          links={[{ text: "Using Linked List", url: "./linkedList" }]}
        />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
