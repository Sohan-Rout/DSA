import Animation from "@/app/visualizer/sorting/insertionsort/animation";

export const metadata = {
  title: 'Insertion Sort Visualizer | Learn with Interactive Animations',
  description: 'Understand how Insertion Sort works through step-by-step animations. Ideal for beginners learning data structures and algorithms through visual tools.',
  keywords: [
    'Insertion Sort Visualizer',
    'Insertion Sort Animation',
    'DSA Insertion Sort',
    'Learn Insertion Sort',
    'Sorting Algorithm Visualization',
    'Step by Step Insertion Sort',
    'Interactive DSA Tool',
    'DSA for Beginners',
    'Insertion Sort Explained',
  ],
  robots: "index, follow",
};

export default function Page() {
  return(
    <Animation />
  );
};