import Animation from "@/app/visualizer/queue/types/priority/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Priority Queue Algorithm | Visual Guide with Code in JavaScript, C, Python, Java',
  description: 'Master Priority Queue in Data Structures with easy-to-understand visualizations and complete code examples in JavaScript, C, Python, and Java. Perfect for DSA learners and coding interview prep.',
  keywords: [
    'Priority Queue',
    'Priority Queue DSA',
    'Priority Queue Data Structure',
    'Priority Queue in JavaScript',
    'Priority Queue in C',
    'Priority Queue in Python',
    'Priority Queue in Java',
    'Priority Queue Examples',
    'DSA Queue Operations',
    'Learn Priority Queue',
    'Priority Queue Code',
    'Priority Queue Visualization',
    'DSA Visualizer',
    'Priority Queue for Interviews',
    'Priority Queue Tutorial'
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