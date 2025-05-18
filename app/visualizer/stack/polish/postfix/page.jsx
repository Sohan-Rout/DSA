import Animation from "@/app/visualizer/stack/polish/postfix/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
    title: 'Postfix Notation using Stack | Learn Postfix Evaluation in DSA with Code in JS, C, Python, Java',
    description: 'Visualize how Postfix expressions are evaluated using a Stack through interactive animations and code examples in JavaScript, C, Python, and Java. Perfect for DSA beginners and technical interview preparation.',
    keywords: [
      'Postfix Notation',
      'Postfix Evaluation Stack',
      'Stack DSA',
      'Postfix Expression',
      'DSA Postfix',
      'Evaluate Postfix using Stack',
      'Learn Postfix Notation',
      'Postfix Evaluation in JavaScript',
      'Postfix Evaluation in C',
      'Postfix Evaluation in Python',
      'Postfix Evaluation in Java',
      'Stack Code Examples',
      'DSA Expression Evaluation',
    ],
    robots: "index, follow",
  };

export default function Page (){
    return(
      <>
        <Navbar/>
        <Animation />
      </>
    );
};