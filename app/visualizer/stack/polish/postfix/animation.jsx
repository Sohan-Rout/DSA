import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import ExploreOther from '@/app/components/ui/exploreOther';
import Content from '@/app/visualizer/stack/polish/postfix/content';
import Operation from '@/app/visualizer/stack/polish/postfix/operation';

const PostfixSolver = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Infix to
          <span className="text-blue-600"> Prefix Visualizer</span>
        </h1>
        <Content/>
        <Operation/>
        <ExploreOther
          title="Explore Other Tools"
          links={[
            { text: "Prefix", url: "./prefix" },
          ]}
          className="mt-12"
        />
      </main>
      <div className="bg-gray-700 z-10 h-[1px]"></div>
      <Footer />
    </div>
  );
};

export default PostfixSolver;