import Animation from "@/app/visualizer/queue/operations/enqueue-dequeue/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/queue/operations/enqueue-dequeue/content";
import Quiz from "@/app/visualizer/queue/operations/enqueue-dequeue/quiz";
import Code from "@/app/visualizer/queue/operations/enqueue-dequeue/codeBlock";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";

export const metadata = {
  title:
    "Enqueue and Dequeue Operations in Queue | Learn Queue with JS, C, Python, Java Code",
  description:
    "Visualize and understand the Enqueue and Dequeue operations in a Queue with real-time animations and code examples in JavaScript, C, Python, and Java. Perfect for DSA beginners and interview preparation.",
  keywords: [
    "Enqueue Operation",
    "Dequeue Operation",
    "Queue Operations",
    "Queue DSA",
    "Queue Enqueue Dequeue",
    "Learn Queue",
    "Queue Visualization",
    "Interactive DSA Tools",
    "Queue Data Structure",
    "Queue Code Examples",
    "Enqueue Dequeue in JavaScript",
    "Enqueue Dequeue in C",
    "Enqueue Dequeue in Python",
    "Enqueue Dequeue in Java",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/queue/enqueueDequeue.png",
        width: 1200,
        height: 630,
        alt: "Enqueue Dequeue Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Enqueue-Dequeue", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Queue" title="Enqueue & Dequeue" paths={paths} />
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
            moduleId={MODULE_MAPS.enqueueDequeue}
            title="Enqueue Dequeue"
            description="Mark queue : enqueue & dequeue as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Operations"
            links={[
              { text: "Peek Front", url: "./peek-front" },
              { text: "Is Empty", url: "./isempty" },
              { text: "Is Full", url: "./isfull" },
            ]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
