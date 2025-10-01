import Animation from "@/app/visualizer/stack/implementation/usingArray/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Stack Implementation using Array | Learn Stack in DSA with JS, C, Python, Java Code',
  description: 'Understand how to implement a Stack using an Array with visual explanations, animations, and complete code examples in JavaScript, C, Python, and Java. Perfect for DSA beginners and interview prep.',
  keywords: [
    'Stack using Array',
    'Stack Implementation',
    'Stack Implementation in JavaScript',
    'Stack Implementation in C',
    'Stack Implementation in Python',
    'Stack Implementation in Java',
    'DSA Stack',
    'Array Stack',
    'Data Structures Stack',
    'Stack Push Pop Array',
    'Learn Stack DSA',
    'Visualize Stack Implementation',
    'Stack Code Examples',
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