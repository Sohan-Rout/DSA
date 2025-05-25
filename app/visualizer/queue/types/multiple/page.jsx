import Animation from "@/app/visualizer/queue/types/multiple/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Multiple Queue in DSA | Learn with JS, C, Python, Java Code',
  description: 'Understand Multiple Queue implementation in Data Structures through clear animations and complete code examples in JavaScript, C, Python, and Java. Ideal for DSA learning and technical interview preparation.',
  keywords: [
    'Multiple Queue',
    'Multiple Queue DSA',
    'DSA Queues',
    'Multiple Queue in JavaScript',
    'Multiple Queue in C',
    'Multiple Queue in Python',
    'Multiple Queue in Java',
    'Queue Data Structure',
    'Learn Multiple Queue',
    'DSA Queue Operations',
    'Queue Code Examples',
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