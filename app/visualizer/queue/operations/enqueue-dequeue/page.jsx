import Animation from "@/app/visualizer/queue/operations/enqueue-dequeue/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Enqueue and Dequeue Operations in Queue | Learn Queue with JS, C, Python, Java Code',
  description: 'Visualize and understand the Enqueue and Dequeue operations in a Queue with real-time animations and code examples in JavaScript, C, Python, and Java. Perfect for DSA beginners and interview preparation.',
  keywords: [
    'Enqueue Operation',
    'Dequeue Operation',
    'Queue Operations',
    'Queue DSA',
    'Queue Enqueue Dequeue',
    'Learn Queue',
    'Queue Visualization',
    'Interactive DSA Tools',
    'Queue Data Structure',
    'Queue Code Examples',
    'Enqueue Dequeue in JavaScript',
    'Enqueue Dequeue in C',
    'Enqueue Dequeue in Python',
    'Enqueue Dequeue in Java',
  ],
  robots: "index, follow",
};

export default function Page() {
  return (
    <>
      <Navbar/>
      <Animation />
    </>
  );
};