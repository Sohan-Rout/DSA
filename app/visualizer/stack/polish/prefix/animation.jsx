import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import ExploreOther from '@/app/components/ui/exploreOther';
import Content from '@/app/visualizer/stack/polish/prefix/content';
import Operation from '@/app/visualizer/stack/polish/prefix/operation';

const PrefixSolver = () => {
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
            { text: "Postfix", url: "/postfix-calculator" },
          ]}
          className="mt-12"
        />
      </main>
      <Footer />
    </div>
  );
};

export default PrefixSolver;