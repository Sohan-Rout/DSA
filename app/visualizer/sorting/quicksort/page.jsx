import Animation from "@/app/visualizer/sorting/quicksort/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Quick Sort Visualizer & Quiz | Fast Sorting Algorithm Animation with Code in JS, C, Python, Java',
  description: 'Learn how Quick Sort works with visual, step-by-step animations, interactive practice, and a quiz to test your understanding. Includes code examples in JavaScript, C, Python, and Java. Perfect for mastering this efficient divide-and-conquer algorithm during DSA preparation.',
  keywords: [
    'Quick Sort Visualizer',
    'Quick Sort Animation',
    'Quick Sort Algorithm',
    'Quick Sort Quiz',
    'Sorting Algorithm Quiz',
    'Sorting Algorithm Visualization',
    'DSA Quick Sort',
    'Learn Quick Sort',
    'Divide and Conquer Sorting',
    'Interactive Sorting Tool',
    'Practice Quick Sort',
    'Test Quick Sort Knowledge',
    'DSA for Beginners',
    'Quick Sort in JavaScript',
    'Quick Sort in C',
    'Quick Sort in Python',
    'Quick Sort in Java',
    'Quick Sort Code Examples',
  ],
  robots: "index, follow",
};

export default function Page() {
  return(
    <>
      <Navbar />
      <Animation />
    </>
  );
};