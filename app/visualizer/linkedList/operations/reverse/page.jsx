import Animation from "@/app/visualizer/linkedList/operations/reverse/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
    title: 'Linked List Reverse Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Explore how reversing a linked list works with interactive animations, clear explanations, and hands-on practice. Visualize each step of the reverse process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Reverse',
        'Reverse Animation Linked List',
        'Visualize Reverse in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Reverse',
        'Linked List Reverse Visualization',
        'Interactive Linked List',
        'Reverse Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Reverse Code Example',
        'Linked List Tutorial',
        'Reverse using C',
        'Reverse using Java',
        'Reverse using Javascript',
        'Reverse using Python',
        'Reverse linked list',
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