import Animation from "@/app/visualizer/queue/implementation/linkedList/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Queue Implementation Using Linked List | Visualize Queue in JS, C, Python, Java',
  description: 'Explore Queue implementation using Linked List with real-time visualizations and code examples in JavaScript, C, Python, and Java. Understand how Enqueue and Dequeue work in a dynamic memory structure. Perfect for DSA beginners and interview prep.',
  keywords: [
    'Queue Implementation',
    'Queue using Linked List',
    'Enqueue Dequeue Operations',
    'Queue Data Structure',
    'Linked List Queue',
    'Queue Visualization',
    'DSA Queue Tutorial',
    'Queue in JavaScript',
    'Queue in C',
    'Queue in Python',
    'Queue in Java',
    'Learn Queue',
    'Interactive DSA Tools',
    'DSA with Linked List',
    'DSA for Beginners',
  ],
  robots: 'index, follow',
};

export default function Page() {
  return (
    <>
      <Navbar/>
      <Animation />
    </>
  );
};