import Animation from "@/app/visualizer/sorting/bubblesort/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Bubble Sort Algorithm | Step-by-Step Animation',
  description: 'Visualize Bubble Sort in action with interactive animations, code examples in JavaScript, C, Python, and Java, and test your understanding with a dedicated Bubble Sort quiz. Learn how Bubble Sort works through comparisons and swaps in an easy-to-understand format.',
  keywords: [
    'Bubble Sort Visualizer',
    'Bubble Sort Animation',
    'Bubble Sort Algorithm',
    'Bubble Sort Quiz',
    'Sorting Algorithm Quiz',
    'Sorting Algorithm Visualization',
    'DSA Bubble Sort',
    'Learn Bubble Sort',
    'Sorting for Beginners',
    'Step by Step Bubble Sort',
    'Interactive Sorting Tool',
    'Bubble Sort in JavaScript',
    'Bubble Sort in C',
    'Bubble Sort in Python',
    'Bubble Sort in Java',
    'Bubble Sort Code Examples',
    'Practice Bubble Sort',
    'DSA Bubble Sort Quiz',
    'Interactive DSA Quiz',
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