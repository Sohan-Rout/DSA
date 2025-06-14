import Animation from "@/app/visualizer/linkedList/operations/merge/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
    title: 'Linked List Merge Algorithm | Interactive Visualization & Step-by-Step Guide',
    description:
        'Learn how merging works in Linked Lists with interactive animations, detailed explanations, and hands-on practice. Visualize each step of the merge process and master linked list algorithms efficiently.',
    keywords: [
        'Linked List Merge',
        'Merge Animation Linked List',
        'Visualize Merge in Linked List',
        'Linked List Algorithm',
        'DSA Linked List Merge',
        'Linked List Merge Visualization',
        'Interactive Linked List',
        'Merge Step-by-Step',
        'Linked List Learning',
        'Data Structures Animation',
        'DSA Practice Linked List',
        'Merge Code Example',
        'Linked List Tutorial',
        'Merge using C',
        'Merge using Java',
        'Merge using Javascript',
        'Merge using Python',
        'Merge using linked list',
    ],
    robots: 'index, follow',
};

export default function Page() {
  return (
    <>
      <Navbar/>
      <Animation/>
    </>
  );
};