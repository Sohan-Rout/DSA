import Animation from "@/app/visualizer/stack/isempty/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Stack Visualizer | Learn Stack with Animation and IsEmpty Operation in JS, C, Python, Java',
  description: 'Visualize how Stack works in DSA using interactive animations, including the isEmpty operation. Great for beginners and interview prep. Includes code examples in JavaScript, C, Python, and Java.',
  keywords: [
    'Stack DSA',
    'Stack Visualizer',
    'Learn Stack',
    'DSA Animation',
    'Stack isEmpty Operation',
    'Check if Stack is Empty',
    'Stack Implementation in JavaScript',
    'Stack Implementation in C',
    'Stack in Python',
    'Stack in Java',
    'Stack Code Examples',
    'Interactive Stack Tool',
  ],
  robots: "index, follow",
};

export default function Page() {
  return(
    <>
      <Navbar/>
      <Animation />
    </>
  );
};