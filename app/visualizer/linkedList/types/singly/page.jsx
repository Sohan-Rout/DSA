import Animation from "@/app/visualizer/linkedList/types/singly/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Singly Linked List Implementation | Visualize Linked List in JS, C, Python, Java',
  description: 'Explore Singly Linked List implementation with interactive visualizations and real-time code examples in JavaScript, C, Python, and Java. Learn insertion, deletion, and traversal with step-by-step animations. Perfect for DSA beginners and interview preparation.',
  keywords: [
    'Singly Linked List Implementation',
    'Singly Linked List Visualization',
    'Linked List in JavaScript',
    'Linked List in C',
    'Linked List in Python',
    'Linked List in Java',
    'DSA Linked List',
    'Linked List Operations',
    'Insertion in Linked List',
    'Deletion in Linked List',
    'Traverse Linked List',
    'Learn Linked List',
    'Visualize Linked List',
    'DSA for Beginners',
    'Interactive Linked List Tool',
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