import Animation from "@/app/visualizer/linkedList/operations/merge/animation";
import Navbar from "@/app/components/navbarinner";
import ModuleHeader from "@/app/components/modules/Header";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";

export const metadata = {
    title: 'Linked List Merge Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Learn how merging works in Linked Lists with interactive animations, detailed explanations, and hands-on practice. Visualize each step of the merge process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Merge',
        'Merge Animation Linked List',
        'Visualize Merge in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Merge',
        'Linked List Merge Visualization',
        'Interactive Linked List',
        'Merge Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Merge Code Example',
        'Linked List Tutorial',
        'Merge using C',
        'Merge using Java',
        'Merge using Javascript',
        'Merge using Python',
        'Merge using linked list',
    ],
    robots: 'index, follow',
};

export default function Page() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Linked List : Merge", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Operations" title="Merge" paths={paths} />
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