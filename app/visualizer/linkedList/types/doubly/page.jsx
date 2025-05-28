import Animation from "@/app/visualizer/linkedList/types/doubly/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Doubly Linked List Implementation | Visualize Doubly Linked List in JS, C, Python, Java',
  description: 'Explore Doubly Linked List implementation with interactive animations and code examples in JavaScript, C, Python, and Java. Learn insertion, deletion, and traversal from both directions. Perfect for DSA beginners and interview preparation.',
  keywords: [
    'Doubly Linked List Implementation',
    'DLL Visualization',
    'Doubly Linked List in JavaScript',
    'Doubly Linked List in C',
    'Doubly Linked List in Python',
    'Doubly Linked List in Java',
    'DSA Doubly Linked List',
    'Bidirectional Linked List',
    'Insertion in DLL',
    'Deletion in DLL',
    'DLL Operations',
    'Learn Doubly Linked List',
    'DSA for Beginners',
    'Interactive Linked List Visualizer',
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