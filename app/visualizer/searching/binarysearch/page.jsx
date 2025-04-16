import Animation from "@/app/visualizer/searching/binarysearch/animation";

export const metadata = {
  title: 'Binary Search Visualizer | Step-by-Step Binary Search Animation',
  description: 'Visualize the Binary Search algorithm with intuitive step-by-step animations. Learn how binary search efficiently finds elements in sorted arrays. Perfect for DSA preparation and beginners.',
  keywords: [
    'Binary Search Visualizer',
    'Binary Search Animation',
    'Learn Binary Search',
    'Binary Search for Beginners',
    'Binary Search Step-by-Step',
    'Visualize Binary Search Algorithm',
    'DSA Binary Search',
    'Binary Search Explanation',
    'Binary Search Visualization Tool',
    'Efficient Searching Algorithms',
  ],
  robots: "index, follow",
};

export default function Page() {
  return (
    <Animation />
  );
};