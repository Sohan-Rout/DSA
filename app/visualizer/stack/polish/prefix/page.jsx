import Animation from "@/app/visualizer/stack/polish/prefix/animation";
import Navbar from "@/app/components/navbarinner";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ArticleActions from "@/app/components/ui/ArticleActions";
import Content from '@/app/visualizer/stack/polish/prefix/content';

export const metadata = {
  title:
    "Prefix Notation using Stack | Learn Prefix Evaluation in DSA with Code in JS, C, Python, Java",
  description:
    "Understand how to evaluate Prefix expressions using a Stack with interactive animations and code examples in JavaScript, C, Python, and Java. Essential for mastering DSA concepts and preparing for interviews.",
  keywords: [
    "Prefix Notation",
    "Prefix Evaluation Stack",
    "Stack DSA",
    "Prefix Expression",
    "DSA Prefix",
    "Evaluate Prefix using Stack",
    "Learn Prefix Notation",
    "Prefix Evaluation in JavaScript",
    "Prefix Evaluation in C",
    "Prefix Evaluation in Python",
    "Prefix Evaluation in Java",
    "Stack Code Examples",
    "DSA Expression Evaluation",
  ],
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "/og/stack/prefix.png",
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
    { name: "Stack : Infix to prefix", href: "" },
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
              Infix to Prefix
            </h1>
            <ArticleActions />
          </div>
          <div className="bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl my-10"></div>
          <Content />
        </section>

        <section>
          <Animation />
        </section>
      </div>
    </>
  );
}
