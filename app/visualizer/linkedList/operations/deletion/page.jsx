import Animation from "@/app/visualizer/linkedList/operations/deletion/animation";
import Navbar from "@/app/components/navbarinner";

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
  return (
    <>
      <Navbar/>
      <Animation/>
    </>
  );
};