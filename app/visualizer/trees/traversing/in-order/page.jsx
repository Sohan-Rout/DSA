import Animation from "@/app/visualizer/trees/traversing/in-order/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
  title: 'Tree Visualizer | Learn Tree Data Structures with Animation',
  description: 'Visualize how Tree Data Structures work in DSA with interactive animations. Perfect for beginners and interview prep.',
  keywords: ['Tree DSA', 'Tree Visualizer', 'Learn Tree', 'Binary Tree', 'DSA Animation'],
  robots: "index, follow",
};

const TreeVisualizer = () => {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Trees : In-order Traversal", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Trees" title="In-order Traversal" paths={paths} />
        </section>

        <section>
          <Animation />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
};

export default TreeVisualizer;