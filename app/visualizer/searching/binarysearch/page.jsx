import Animation from "@/app/visualizer/searching/binarysearch/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Binary Search Visualizer & Quiz | Step-by-Step Animation with Code in JS, C, Python, Java',
  description: 'Visualize the Binary Search algorithm with intuitive step-by-step animations, code examples in JavaScript, C, Python, and Java, and an interactive Binary Search Quiz to test your knowledge. Perfect for DSA preparation and beginners learning efficient search algorithms.',
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
    'Binary Search in JavaScript',
    'Binary Search in C',
    'Binary Search in Python',
    'Binary Search in Java',
    'Binary Search Code Examples',
    'Binary Search Quiz',
    'Interactive Binary Search Quiz',
    'DSA Quiz',
    'Quiz for Binary Search',
    'Learn DSA with Quizzes',
    'Binary Search Practice',
    'Test Your Binary Search Skills',
  ],
  robots: "index, follow",
};

export default function Page() {
  return (
    <>
    <Navbar/>
    <Animation />
    </>
  );
};