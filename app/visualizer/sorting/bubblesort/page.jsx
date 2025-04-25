import Animation from "@/app/visualizer/sorting/bubblesort/animation";

export const metadata = {
  title: 'Bubble Sort Visualizer | Step-by-Step Animation',
  description: 'Visualize Bubble Sort in action with interactive animations. Learn how Bubble Sort works with comparisons and swaps in an easy-to-understand format.',
  keywords: [
    'Bubble Sort Visualizer',
    'Bubble Sort Animation',
    'Bubble Sort Algorithm',
    'Sorting Algorithm Visualization',
    'DSA Bubble Sort',
    'Learn Bubble Sort',
    'Sorting for Beginners',
    'Step by Step Bubble Sort',
    'Interactive Sorting Tool',
  ],
  robots: "index, follow",
};

export default function Page() {
  return (
    <Animation />
  );
};