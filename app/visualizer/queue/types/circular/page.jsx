import Animation from "@/app/visualizer/queue/types/circular/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
    title: 'Circular Queue | Learn with JS, C, Python, Java Code',
    description: 'Understand how Circular Queue works in Data Structures using animations and complete code examples in JavaScript, C, Python, and Java. Ideal for DSA beginners and interview preparation.',
    keywords: [
      'Circular Queue',
      'Circular Queue Visualizer',
      'Circular Queue DSA',
      'Circular Queue in JavaScript',
      'Circular Queue in C',
      'Circular Queue in Python',
      'Circular Queue in Java',
      'Queue Data Structure',
      'DSA Queue Operations',
      'Learn Circular Queue',
      'Circular Queue Code Examples',
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