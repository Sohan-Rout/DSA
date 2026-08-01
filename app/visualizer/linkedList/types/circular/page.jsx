import Animation from "@/app/visualizer/linkedList/types/circular/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
  title: 'Circular Linked List Algorithm | Interactive Learning & Step-by-Step Animation',
  description:
    'Master Circular Linked Lists with interactive visualizations, quizzes, and implementation code. Learn insertion, deletion, and traversal through animations and practice with hands-on exercises.',
  keywords: [
    'Circular Linked List Visualizer',
    'CLL Animation',
    'Visualize Circular Linked List',
    'Learn Circular Linked List',
    'Circular Linked List DSA',
    'Circular Linked List for Beginners',
    'Insertion in Circular Linked List',
    'Deletion in Circular Linked List',
    'Circular Linked List Traversal',
    'DSA Circular Linked List Visualization',
    'DSA Quiz Circular Linked List',
    'Circular Linked List Implementation Code',
    'DSA Learning Platform',
  ],
  robots: 'index, follow',
};
export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Circular", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Types" title="Circular Linked List" paths={paths} />
        </section>

        <section>
          <Animation />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}