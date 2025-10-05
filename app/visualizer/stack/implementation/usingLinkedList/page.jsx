import Navbar from "@/app/components/navbarinner";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ArticleActions from "@/app/components/ui/ArticleActions";
import Content from "@/app/visualizer/stack/implementation/usingLinkedList/content";
import Code from "@/app/visualizer/stack/implementation/usingLinkedList/codeBlock";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import Footer from "@/app/components/footer";
import ExploreOther from "@/app/components/ui/exploreOther";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
  title:
    "Stack Implementation using Linked List | Learn Stack in DSA with JS, C, Python, Java Code",
  description:
    "Explore how to implement a Stack using a Linked List with step-by-step visual explanations, animations, and complete code in JavaScript, C, Python, and Java. Ideal for DSA learners and coding interview prep.",
  keywords: [
    "Stack using Linked List",
    "Stack Implementation",
    "Stack Implementation in JavaScript",
    "Stack Implementation in C",
    "Stack Implementation in Python",
    "Stack Implementation in Java",
    "Linked List Stack",
    "DSA Stack",
    "Data Structures Stack",
    "Stack Push Pop Linked List",
    "Learn Stack DSA",
    "Visualize Stack Implementation",
    "Stack Code Examples",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/stack/stackLinkedList.png",
        width: 1200,
        height: 630,
        alt: "Stack Implementation using Linked List",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Stack : Implementation Using Linked List", href: "" },
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
                Stack
              </p>
            </div>
            <h1 className="text-4xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-0">
              Implementation Using Linked List
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
            moduleId={MODULE_MAPS.stackLinkedList}
            title="Stack Implementation using Linked List"
            description="Mark Stack using Linked List as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section>
          <ExploreOther
          title="Explore other implementation"
          links={[
            { text: "Using Array", url: "./usingArray" },
          ]}
        />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
