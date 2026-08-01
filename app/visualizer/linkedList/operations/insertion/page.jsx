import Animation from "@/app/visualizer/linkedList/operations/insertion/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
    title: 'Linked List Insertion Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Learn how insertion works in Linked Lists with interactive animations, detailed explanations, and hands-on practice. Visualize each step of the insertion process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Insertion',
        'Insertion Animation Linked List',
        'Visualize Insertion in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Insertion',
        'Linked List Insertion Visualization',
        'Interactive Linked List',
        'Insertion Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Insertion Code Example',
        'Linked List Tutorial',
        'Insertion using C',
        'Insertion using Java',
        'Insertion using Javascript',
        'Insertion using Python',
        'Insertion using linked list',
    ],
    robots: 'index, follow',
};
export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Insertion", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Operations" title="Insertion" paths={paths} />
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