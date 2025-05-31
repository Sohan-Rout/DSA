import Animation from "@/app/visualizer/linkedList/types/circular/animation";
import Navbar from "@/app/components/navbar";

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
  return (
    <>
      <Navbar/>
      <Animation/>
    </>
  );
};