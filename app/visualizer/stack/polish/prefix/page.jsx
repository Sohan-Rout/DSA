import Animation from "@/app/visualizer/stack/polish/prefix/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
    title: 'Prefix Notation using Stack | Learn Prefix Evaluation in DSA with Code in JS, C, Python, Java',
    description: 'Understand how to evaluate Prefix expressions using a Stack with interactive animations and code examples in JavaScript, C, Python, and Java. Essential for mastering DSA concepts and preparing for interviews.',
    keywords: [
      'Prefix Notation',
      'Prefix Evaluation Stack',
      'Stack DSA',
      'Prefix Expression',
      'DSA Prefix',
      'Evaluate Prefix using Stack',
      'Learn Prefix Notation',
      'Prefix Evaluation in JavaScript',
      'Prefix Evaluation in C',
      'Prefix Evaluation in Python',
      'Prefix Evaluation in Java',
      'Stack Code Examples',
      'DSA Expression Evaluation',
    ],
    robots: "index, follow",
  };

export default function Page() {
    return(
      <>
        <Navbar/>
        <Animation/>
      </>
    );
};