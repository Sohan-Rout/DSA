import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTop from "@/app/components/ui/backtotop";
import ExploreOther from "@/app/components/ui/exploreOther";
import CodeBlock from "@/app/components/modules/CodeBlock";
import codeExamples from "./code";
import Quiz from "@/app/visualizer/trees/binaryTree/types/quiz";
import Content from "@/app/visualizer/trees/binaryTree/types/content";

export const metadata = {
  title: 'Binary Tree Types | Learn Full, Complete, and Degenerate Binary Trees in DSA',
  description: 'Learn about Binary Tree types in Data Structures and Algorithms, including Full Binary Tree, Complete Binary Tree, and Degenerate Tree with clear visual explanations, animations, and code examples in JavaScript, C, Python, and Java.',
  keywords: [
    'Binary Tree',
    'Binary Tree Types',
    'Full Binary Tree',
    'Complete Binary Tree',
    'Degenerate Tree',
    'Binary Tree Visualization',
    'DSA Binary Trees',
    'Binary Tree Animation',
    'Binary Tree Implementation',
    'Binary Tree in JavaScript',
    'Binary Tree in C',
    'Binary Tree in Python',
    'Binary Tree in Java',
    'Learn Binary Trees DSA',
    'Binary Tree Quiz',
  ],
  robots: 'index, follow',
  openGraph: {
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Binary Tree Types Visualization',
      },
    ],
  },
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : Binary Tree Types", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Trees" title="Binary Tree Types" paths={paths} />
          <Content />
        </section>

        <section className="px-6">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
            Test Your Knowledge before moving forward!
          </p>
          <Quiz />
        </section>

        <section className="px-6">
          <CodeBlock title="Binary Tree Types Implementation" codeExamples={codeExamples} />
        </section>

        <section className="px-6">
          <ExploreOther
            title="Explore Other Tree Topics"
            links={[{ text: "Structure & Properties", url: "./properties" }]}
          />
        </section>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
}
