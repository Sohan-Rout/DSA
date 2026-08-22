import Animation from "@/app/visualizer/searching/binarysearch/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/searching/binarysearch/quiz";
import Content from '@/app/visualizer/searching/binarysearch/content';
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";

export const metadata = {
  alternates: { canonical: "/visualizer/searching/binarysearch" },
  title: "Binary Search Visualizer",
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
        url: "/og/searching/binarySearch.png",
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
    { name: "Visualizer", href: "/visualizer" },
    { name: "Binary Search", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-2 md:px-12">
          <ModuleHeader category="Searching" title="Binary Search" paths={paths} />          
          <Content />
        </section>

        <section className="px-2">
          <Animation />
        </section>

        <section className="px-2">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />
        </section>

        <section className="px-2">
          <CodeBlock title="Binary Search Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-2 md:px-12 my-12">
          <ModuleCard
            moduleId={MODULE_MAPS.binarySearch}
            title="Binary Search"
            description="Mark binary search as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-2">
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
