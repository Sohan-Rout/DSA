import LinearSearchAnimation from '@/app/visualizer/searching/linearsearch/animation';
import Navbar from '@/app/components/navbarinner';

export const metadata = {
  title: 'Linear Search Visualizer & Quiz | Step-by-Step Animation with Code in JS, C, Python, Java',
  description: 'Visualize the Linear Search algorithm with step-by-step animations, code examples in JavaScript, C, Python, and Java, and a Linear Search Quiz to test your understanding. Build a strong foundation in DSA through interactive learning.',
  keywords: [
    'Linear Search Visualizer',
    'Linear Search Animation',
    'Learn Linear Search',
    'Linear Search for Beginners',
    'Step-by-Step Linear Search',
    'Visualize Linear Search Algorithm',
    'DSA Linear Search',
    'Algorithm Visualizer',
    'DSA Searching Algorithms',
    'Search Algorithms DSA',
    'Linear Search in JavaScript',
    'Linear Search in C',
    'Linear Search in Python',
    'Linear Search in Java',
    'Linear Search Code Examples',
    'Linear Search Quiz',
    'Interactive Linear Search Quiz',
    'DSA Quiz',
    'Quiz for Searching Algorithms',
    'Learn DSA with Quizzes',
    'Linear Search Practice',
    'Test Your Linear Search Skills',
  ],
  robots: "index, follow",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <LinearSearchAnimation />
    </>
  );
};