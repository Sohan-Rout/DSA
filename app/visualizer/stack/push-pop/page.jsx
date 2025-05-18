import Animation from "@/app/visualizer/stack/push-pop/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Stack Push and Pop Visualizer | Understand Stack Operations with Code in JS, C, Python, Java',
  description: 'Learn how Push and Pop operations work in a Stack using interactive animations and code examples in JavaScript, C, Python, and Java. Perfect for beginners and interview preparation to understand stack-based data structures clearly.',
  keywords: [
    'Stack Push',
    'Stack Pop',
    'Stack Operations',
    'Push and Pop Visualizer',
    'DSA Stack Animation',
    'Learn Stack Operations',
    'Stack DSA',
    'Stack in JavaScript',
    'Stack in C',
    'Stack in Python',
    'Stack in Java',
    'Push and Pop Code Examples',
    'Stack Data Structure',
    'Stack Visualization Tool',
  ],
  robots: "index, follow",
};

export default function Page() {
  return(
    <>
      <Navbar />
      <Animation />
    </>
  );
};