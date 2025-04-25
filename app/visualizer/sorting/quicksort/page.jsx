import Animation from "@/app/visualizer/sorting/quicksort/animation";

export const metadata = {
  title: 'Quick Sort Visualizer | Fast Sorting Algorithm Animation',
  description: 'Learn how Quick Sort works with visual, step-by-step animations. Understand this efficient divide-and-conquer algorithm easily with our interactive tool.',
  keywords: [
    'Quick Sort Visualizer',
    'Quick Sort Animation',
    'Quick Sort Algorithm',
    'Sorting Algorithm Visualization',
    'DSA Quick Sort',
    'Learn Quick Sort',
    'Divide and Conquer Sorting',
    'Interactive Sorting Tool',
    'DSA for Beginners',
  ],
  robots: "index, follow",
};

export default function Page() {
  return(
    <Animation />
  );
};