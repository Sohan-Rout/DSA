import Animation from "@/app/visualizer/queue/operations/peek-front/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/queue/operations/peek-front/content";
import Quiz from "@/app/visualizer/queue/operations/peek-front/quiz";
import Code from "@/app/visualizer/queue/operations/peek-front/codeBlock";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from '@/app/components/ui/exploreOther';
import Footer from '@/app/components/footer';
import BackToTop from '@/app/components/ui/backtotop';

export const metadata = {
  title: "Queue Peek Front Operation | Learn with JS, C, Java, Python Code",
  description:
    "Understand the Peek Front operation in Queue with interactive animations and code examples in JavaScript, C, Python, and Java. Ideal for DSA beginners and interview preparation.",
  keywords: [
    "Queue Peek Front",
    "Queue peek front Visulaization",
    "Peek Front Operation",
    "Queue DSA",
    "Queue Front Element",
    "Queue Peek in JavaScript",
    "Queue Peek in C",
    "Queue Peek in Python",
    "Queue Peek in Java",
    "Queue Data Structure",
    "DSA Queue Operations",
    "Peek Front Code Examples",
    "Queue Visualization",
    "Learn Queue DSA",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/queue/peekFront.png",
        width: 1200,
        height: 630,
        alt: "Peek Front Algorithm Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Peek Front", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Queue" title="Peek Front" paths={paths} />
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
            moduleId={MODULE_MAPS.peekFront}
            title="Peek Front"
            description="Mark queue : Peek Front as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section className="px-6">
          <ExploreOther
          title="Explore Other Operations"
          links={[
            { text: "Enqueue & Dequeue", url: "./enqueue-dequeue" },
            { text: "Is Full", url: "./isfull" },
            { text: "Is Empty", url: "./isempty" },
          ]}
        />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
