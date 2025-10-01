import Animation from "@/app/visualizer/trees/binaryTree/types/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Binary Tree Types | Learn Full, Complete, and Degenerate Binary Trees in DSA',
  description: 'Learn about Binary Tree types in Data Structures and Algorithms, including Full Binary Tree, Complete Binary Tree, and Degenerate Tree with clear visual explanations, animations, and code examples in JavaScript, C, Python, and Java.',
  keywords: [
    'Binary Tree',
    'Binary Tree Types',
    'Full Binary Tree',
    'Complete Binary Tree',
    'Degenerate Tree',
    'Binary Tree Visualization',
    'DSA Binary Trees',
    'Binary Tree Animation',
    'Binary Tree Implementation',
    'Binary Tree in JavaScript',
    'Binary Tree in C',
    'Binary Tree in Python',
    'Binary Tree in Java',
    'Learn Binary Trees DSA',
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