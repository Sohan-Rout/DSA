import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import ExploreOther from '@/app/components/ui/exploreOther';
import Content from'@/app/visualizer/stack/implementation/usingLinkedList/content';
import CodeBlock from'@/app/visualizer/stack/implementation/usingLinkedList/codeBlock';

const InfixToPostfixVisualizer = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto mt-10 px-4 sm:px-6 py-16">
        <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
          <span className="text-blue-600">Stack Implementation</span> Using Linked List
        </h1>
        <Content />
        <CodeBlock/>
        <ExploreOther
          title="Explore other implementation"
          links={[
            { text: "Using Array", url: "./usingArray" },
          ]}
        />
      </main>
      <div className="bg-gray-700 z-10 h-[1px]"></div>
      <Footer />
    </div>
  );
};

export default InfixToPostfixVisualizer;