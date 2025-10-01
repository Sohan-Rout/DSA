import Animation from "@/app/visualizer/stack/polish/postfix/animation";
import Navbar from "@/app/components/navbarinner";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ArticleActions from "@/app/components/ui/ArticleActions";
import Content from "@/app/visualizer/stack/polish/postfix/content";
import Quiz from "@/app/visualizer/stack/polish/postfix/quiz";
import Code from "@/app/visualizer/stack/polish/postfix/codeBlock";
import ModuleCard from "@/app/components/ui/ModuleCard";
import { MODULE_MAPS } from "@/lib/modulesMap";
import Footer from "@/app/components/footer";
import ExploreOther from "@/app/components/ui/exploreOther";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
  title:
    "Postfix Notation using Stack | Learn Postfix Evaluation in DSA with Code in JS, C, Python, Java",
  description:
    "Visualize how Postfix expressions are evaluated using a Stack through interactive animations and code examples in JavaScript, C, Python, and Java. Perfect for DSA beginners and technical interview preparation.",
  keywords: [
    "Postfix Notation",
    "Postfix Evaluation Stack",
    "Stack DSA",
    "Postfix Expression",
    "DSA Postfix",
    "Evaluate Postfix using Stack",
    "Learn Postfix Notation",
    "Postfix Evaluation in JavaScript",
    "Postfix Evaluation in C",
    "Postfix Evaluation in Python",
    "Postfix Evaluation in Java",
    "Stack Code Examples",
    "DSA Expression Evaluation",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/stack/postfix.png",
        width: 1200,
        height: 630,
        alt: "Stack infix to postfix",
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Stack : Infix to postfix", href: "" },
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
              Infix to Postfix
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
            moduleId={MODULE_MAPS.postfix}
            title="Polish : Postfix Notation"
            description="Mark Polish : postfix as done and view it on your dashboard"
            initialDone={false}
          />
        </section>

        <section>
          <ExploreOther
            title="Explore other conversions"
            links={[{ text: "Infix to Prefix", url: "./prefix" }]}
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
