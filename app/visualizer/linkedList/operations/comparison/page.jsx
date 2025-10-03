import Animation from "@/app/visualizer/linkedList/operations/comparison/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
    title: 'Linked List Comparison Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Learn how comparison works in Linked Lists with interactive animations, detailed explanations, and hands-on practice. Visualize each step of the comparison process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Comparison',
        'Comparison Animation Linked List',
        'Visualize Comparison in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Comparison',
        'Linked List Comparison Visualization',
        'Interactive Linked List',
        'Comparison Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Comparison Code Example',
        'Linked List Tutorial',
        'Comparison using C',
        'Comparison using Java',
        'Comparison using Javascript',
        'Comparison using Python',
        'Comparison using linked list',
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