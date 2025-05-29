import Navbar from "@/app/components/navbar";
import Practice from "@/app/compiler/practice";
import Footer from "@/app/components/footer";

export const metadata = {
  title: 'Practice Essential DSA Problems in JS, C, Python, Java | Code and Learn',
  description: 'Master Data Structures and Algorithms by solving a carefully curated set of essential problems in JavaScript, C, Python, and Java. Practice interactively, test your code, and build a strong foundation for interviews and real-world coding challenges.',
  keywords: [
    'Practice DSA Problems',
    'Essential Coding Problems',
    'DSA Practice JavaScript',
    'DSA Practice Python',
    'DSA Practice Java',
    'DSA Practice C',
    'Code DSA Online',
    'Test DSA Code',
    'Learn to Code DSA',
    'DSA Problem Set',
    'Must Solve DSA Questions',
    'DSA Interview Preparation',
    'Core DSA Problems',
    'Solve DSA in Multiple Languages',
    'Interactive DSA Coding Platform',
  ],
  robots: 'index, follow',
};

const CompilerPage = () => {
    return (
        <>
            <Navbar />
            <Practice />
            <Footer />
        </>
    );
};

export default CompilerPage;