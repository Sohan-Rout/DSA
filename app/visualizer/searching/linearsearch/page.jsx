import LinearSearchAnimation from '@/app/visualizer/searching/linearsearch/animation';

export const metadata = {
  title: 'Searching Visualizer | Learn Linear and Binary Search',
  description: 'Visualize Linear and Binary Search algorithms with step-by-step animations. Understand how searching works in arrays for better DSA preparation.',
  keywords: [
    'Searching Visualizer',
    'Linear Search Animation',
    'Binary Search Animation',
    'DSA Searching Algorithms',
    'Learn Linear Search',
    'Learn Binary Search',
    'Search Algorithms DSA',
    'DSA for Beginners',
    'Algorithm Visualizer',
  ],
  robots: "index, follow",
}

export default function Page() {
  return (
    <LinearSearchAnimation />
  );
};