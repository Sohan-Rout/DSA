import Animation from "@/app/visualizer/stack/implementation/usingLinkedList/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
    title: 'Stack Implementation using Linked List | Learn Stack in DSA with JS, C, Python, Java Code',
    description: 'Explore how to implement a Stack using a Linked List with step-by-step visual explanations, animations, and complete code in JavaScript, C, Python, and Java. Ideal for DSA learners and coding interview prep.',
    keywords: [
      'Stack using Linked List',
      'Stack Implementation',
      'Stack Implementation in JavaScript',
      'Stack Implementation in C',
      'Stack Implementation in Python',
      'Stack Implementation in Java',
      'Linked List Stack',
      'DSA Stack',
      'Data Structures Stack',
      'Stack Push Pop Linked List',
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