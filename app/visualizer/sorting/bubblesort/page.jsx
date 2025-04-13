import Animation from "@/app/visualizer/sorting/bubblesort/animation";

export const metadata = {
  title: 'Sorting Visualizer | Visualize Sorting Algorithms Easily',
  description: 'Interactive sorting algorithm visualizer. Understand how Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort work with step-by-step animations.',
  keywords: [
    'Sorting Visualizer',
    'DSA Sorting',
    'Bubble Sort Animation',
    'Selection Sort Animation',
    'Insertion Sort',
    'Merge Sort Visualizer',
    'Quick Sort Algorithm',
    'Learn Sorting Algorithms',
    'DSA for Beginners',
  ],
  robots: "index, follow",
};

export default function Page() {
  return (
    <Animation />
  );
};