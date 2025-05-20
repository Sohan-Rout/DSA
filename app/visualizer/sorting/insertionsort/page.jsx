import Animation from "@/app/visualizer/sorting/insertionsort/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Insertion Sort Algorithm | Learn with Interactive Animations',
  description: 'Understand how Insertion Sort works through step-by-step animations and test your knowledge with an interactive quiz. Includes code examples in JavaScript, C, Python, and Java. Perfect for beginners learning data structures and algorithms visually and through hands-on coding.',
  keywords: [
    'Insertion Sort Visualizer',
    'Insertion Sort Animation',
    'Insertion Sort Visualization',
    'DSA Insertion Sort',
    'Learn Insertion Sort',
    'Insertion Sort Quiz',
    'Sorting Algorithm Quiz',
    'Sorting Algorithm Visualization',
    'Step by Step Insertion Sort',
    'Interactive DSA Tool',
    'DSA for Beginners',
    'Insertion Sort Explained',
    'Practice Insertion Sort',
    'Interactive Insertion Sort Quiz',
    'Insertion Sort in JavaScript',
    'Insertion Sort in C',
    'Insertion Sort in Python',
    'Insertion Sort in Java',
    'Insertion Sort Code Examples',
  ],
  robots: 'index, follow',
};

export default function Page() {
  return(
    <>
      <Navbar/>
      <Animation />
    </>
  );
};