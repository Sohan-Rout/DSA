import Animation from "@/app/visualizer/linkedList/operations/traversal/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
    title: 'Linked List Traversal Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Explore how traversal works in Linked Lists with interactive animations, clear explanations, and hands-on practice. Visualize each step of the traversal process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Traversal',
        'Traversal Animation Linked List',
        'Visualize Traversal in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Traversal',
        'Linked List Traversal Visualization',
        'Interactive Linked List',
        'Traversal Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Traversal Code Example',
        'Linked List Tutorial',
        'Traversal using C',
        'Traversal using Java',
        'Traversal using Javascript',
        'Traversal using Python',
        'Traversal using linked list',
    ],
    robots: 'index, follow',
};
export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Traversal", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Operations" title="Traversal" paths={paths} />
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