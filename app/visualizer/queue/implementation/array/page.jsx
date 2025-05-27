import Animation from "@/app/visualizer/queue/implementation/array/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Queue Implementation Using Array | Visualize Queue Operations in JS, C, Python, Java',
  description: 'Learn Queue implementation using arrays with real-time visualizations and code examples in JavaScript, C, Python, and Java. Understand how Enqueue and Dequeue work step-by-step without quizzes. Ideal for DSA beginners.',
  keywords: [
    'Queue Implementation',
    'Queue using Array',
    'Enqueue Dequeue Operations',
    'Queue Data Structure',
    'Queue Visualization',
    'DSA Queue Tutorial',
    'Queue in JavaScript',
    'Queue in C',
    'Queue in Python',
    'Queue in Java',
    'Learn Queue',
    'Interactive Queue Visualizer',
    'Array based Queue',
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