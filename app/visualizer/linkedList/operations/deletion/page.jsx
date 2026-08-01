import Animation from "@/app/visualizer/linkedList/operations/deletion/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
    title: 'Linked List Deletion Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Learn how deletion works in Linked Lists with interactive animations, detailed explanations, and hands-on practice. Visualize each step of the deletion process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Deletion',
        'Deletion Animation Linked List',
        'Visualize Deletion in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Deletion',
        'Linked List Deletion Visualization',
        'Interactive Linked List',
        'Deletion Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Deletion Code Example',
        'Linked List Tutorial',
        'Deletion using C',
        'Deletion using Java',
        'Deletion using Javascript',
        'Deletion using Python',
        'Deletion using linked list',
    ],
    robots: 'index, follow',
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Deletion", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Operations" title="Deletion" paths={paths} />
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