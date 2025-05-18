import Animation from "@/app/visualizer/stack/isfull/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Stack Is Full Visualizer | Check Full Condition in Stack with Code in JS, C, Python, Java',
  description: 'Understand how to check if a Stack is full using interactive animations and code examples in JavaScript, C, Python, and Java. A simple guide for beginners and DSA interview preparation.',
  keywords: [
    'Stack Is Full',
    'Is Full Operation Stack',
    'Stack Full Condition',
    'Stack Capacity Check',
    'DSA Stack Animation',
    'Learn Stack Operations',
    'Stack in JavaScript',
    'Stack in C',
    'Stack in Python',
    'Stack in Java',
    'Stack Code Examples',
    'Stack Overflow Condition',
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