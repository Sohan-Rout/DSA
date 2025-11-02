import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import Feature from "@/app/components/feature";
import About from "@/app/components/about";
import Review from "@/app/components/review";
import Testimonial from "@/app/components/testimonial";
import Faq from "@/app/components/faq";
import Footer from "@/app/components/footer";
import BottomAd from "./components/ads/bottom";

export const metadata = {
  title: 'DSA Visualizer | Visualize & Learn DSA the Smart Way',
  description: 'Master Data Structures and Algorithms with interactive visualizations. Perfect for students, beginners, and interview prep. Visualize Stack, Queue, Tree, Graph, Sorting & more.',
  keywords: [
    'DSA Visualizer',
    'Algorithm Visualizer',
    'Learn DSA',
    'Practice DSA Problems',
    'DSA Quizzes',
    'Interactive DSA',
    'Sorting Algorithms',
    'Searching Algorithms',
    'Stack',
    'Queue',
    'Tree',
    'Linked List',
    'Heap Sort',
    'Tree Traversal',
    'Linear Search',
    'Bubble Sort',
    'Singly Linked List',
    'Doubly Linked List',
    'Circular Linked List',
    'Data Structures for Beginners',
    'DSA Practice Platform',
    'Quiz for DSA',
    'Algorithm Quiz',
    'Interactive Algorithm Quiz',
    'Learn DSA with Quizzes'
  ],
  robots: 'index, follow',
};

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div id="hero">
          <Hero />
        </div>
        <div id="testimonial">
          <Testimonial/>
        </div>
        <div id="features">
          <Feature />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="faq">
          <Faq />
        </div>
        <div id="review">
          <Review/>
        </div>
        <Footer />
      </div>

      {/* Floating Ad — always visible at bottom */}
      <BottomAd />
    </>
  );
}