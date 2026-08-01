import Animation from "@/app/visualizer/stack/isempty/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Content from "@/app/visualizer/stack/isempty/content";
import Quiz from "@/app/visualizer/stack/isempty/quiz";
import Code from "@/app/visualizer/stack/isempty/codeBlock";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import ExploreOther from "@/app/components/ui/exploreOther";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
  title:
    "Stack is empty Visualizer | Learn Stack IsEmpty Operation in JS, C, Python, Java",
  description:
    "Visualize how Stack isEmpty operation works in DSA using interactive animations. Great for beginners and interview prep. Includes code examples in JavaScript, C, Python, and Java.",
  keywords: [
    "Stack DSA",
    "Stack Visualizer",
    "Learn Stack",
    "DSA Animation",
    "Stack isEmpty Operation",
    "Check if Stack is Empty",
    "Stack Implementation in JavaScript",
    "Stack Implementation in C",
    "Stack in Python",
    "Stack in Java",
    "Stack Code Examples",
    "Interactive Stack Tool",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/stack/isEmpty.png",
        width: 1200,
        height: 630,
        alt: "Stack isEmpty Visualization",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Stack : IsEmpty", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Stack" title="IsEmpty Operation" paths={paths} />
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
            moduleId={MODULE_MAPS.isEmpty}
            title="Stack isEmpty"
            description="Mark Stack : isEmpty as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section>
          <ExploreOther
            title="Explore other operations"
            links={[
              { text: "Push & Pop", url: "/visualizer/stack/push-pop" },
              { text: "Peek", url: "/visualizer/stack/peek" },
              { text: "Is Full", url: "/visualizer/stack/isfull" },
            ]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
