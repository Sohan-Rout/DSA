import Animation from "@/app/visualizer/queue/types/deque/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
    title: 'Double Ended Queue (Deque) | Learn with JS, C, Python, Java Code',
    description: 'Explore Double Ended Queue (Deque) in Data Structures with visual animations and full code implementations in JavaScript, C, Python, and Java. Perfect for mastering DSA concepts and interview preparation.',
    keywords: [
      'Double Ended Queue',
      'Double Ended Queue Visualizer',
      'Deque in DSA',
      'DSA Deque',
      'Double Ended Queue in JavaScript',
      'Deque in C',
      'Deque in Python',
      'Deque in Java',
      'DSA Queue Operations',
      'Learn Deque DSA',
      'Deque Code Examples',
      'DSA Visualizer'
    ],
    robots: 'index, follow',
  };

export default function Page(){
    return(
      <>
        <Navbar/>
        <Animation/>
      </>
    );
};