import Animation from "@/app/visualizer/linkedList/types/singly/animation";

export const metadata = {
  title: 'Singly Linked List Visualizer | Learn Linked Lists with Animation',
  description: 'Visualize the operations of a Singly Linked List including insertion, deletion, and traversal. Understand how linked lists work with interactive step-by-step animations. Ideal for DSA and coding interviews.',
  keywords: [
    'Singly Linked List Visualizer',
    'Linked List Animation',
    'Visualize Singly Linked List',
    'Learn Linked List',
    'Linked List for Beginners',
    'Linked List DSA',
    'DSA Linked List Visualization',
    'Insertion in Linked List',
    'Deletion in Linked List',
    'Linked List Operations Animated',
  ],
  robots: "index, follow",
};

export default function Page() {
  return (
    <Animation />
  );
};