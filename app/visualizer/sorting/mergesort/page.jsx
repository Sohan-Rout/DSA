import Animation from "@/app/visualizer/sorting/mergesort/animation";

export const metadata = {
  title: 'Merge Sort Visualizer | Step-by-Step Algorithm Animation',
  description: 'Explore how Merge Sort works with interactive, step-by-step visualizations. Perfect for beginners learning efficient divide-and-conquer sorting algorithms.',
  keywords: [
    'Merge Sort Visualizer',
    'Merge Sort Animation',
    'Merge Sort Algorithm',
    'Divide and Conquer Sorting',
    'Sorting Algorithm Visualization',
    'Learn Merge Sort',
    'DSA Merge Sort',
    'Sorting for Beginners',
    'Interactive Merge Sort Tool',
  ],
  robots: "index, follow",
};

export default function Page() {
  return(
    <Animation />
  );
};