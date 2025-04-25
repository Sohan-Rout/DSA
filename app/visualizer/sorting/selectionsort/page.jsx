import Animation from "@/app/visualizer/sorting/selectionsort/animation";

export const metadata = {
  title: 'Selection Sort Visualizer | Simple Sorting Animation',
  description: 'Visualize Selection Sort in action with step-by-step animations. A beginner-friendly way to understand this simple sorting algorithm using comparisons and swaps.',
  keywords: [
    'Selection Sort Visualizer',
    'Selection Sort Animation',
    'Selection Sort Algorithm',
    'DSA Selection Sort',
    'Learn Selection Sort',
    'Sorting Algorithm Visualization',
    'Interactive Sorting Tool',
    'Sorting for Beginners',
    'Step by Step Sorting',
  ],
  robots: "index, follow",
};

export default function Page() {
  return(
    <Animation />
  );
};