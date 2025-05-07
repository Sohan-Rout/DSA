"use client";
import Navbar from "@/app/components/navbarinner";
import Footer from "@/app/components/footer";
import ExploreOther from "@/app/components/ui/exploreOther";
import Content from "@/app/visualizer/stack/implementation/usingArray/content";
import CodeBlock from "@/app/visualizer/stack/implementation/usingArray/codeBlock";
import GoBackButton from "@/app/components/ui/goback";

const InfixToPostfixVisualizer = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto mt-10 px-4 sm:px-6 py-12">
        <div className="mt-6 sm:mt-5">
          <GoBackButton />
        </div>
        <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
          <span className="text-blue-600">Stack Implementation</span> Using
          Array
        </h1>
        <Content />
        <CodeBlock />
        <ExploreOther
          title="Explore other implementation"
          links={[{ text: "Using Linked List", url: "./usingLinkedList" }]}
        />
      </main>
      <div className="bg-gray-700 z-10 h-[1px]"></div>
      <Footer />
    </div>
  );
};

export default InfixToPostfixVisualizer;
