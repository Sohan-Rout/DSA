import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import Feature from "@/app/components/feature";
import Prices from "@/app/components/price";
import About from "@/app/components/about";
import TestimonialsSection from "@/app/components/testimonial";
import Faq from "@/app/components/faq";
import Contact from "@/app/components/contact";
import Footer from "@/app/components/footer";

export const metadata = {
  title: 'DSA Visualizer | Learn, Visualize & Practice Algorithms',
  description: 'Master Data Structures and Algorithms with visual animations and interactive practice problems. Explore sorting, searching, stacks, queues, trees, and linked lists—all in one beginner-friendly platform.',
  keywords: [
    'DSA Visualizer',
    'Algorithm Visualizer',
    'Learn DSA',
    'Practice DSA Problems',
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
    'DSA Practice Platform'
  ],
  robots: 'index, follow',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="features">
        <Feature />
      </div>
      <div id="pricing">
        <Prices />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="faq">
        <Faq />
      </div>
      <Contact />
      <div id="testimonial">
        <TestimonialsSection/>
      </div>
      <Footer />
    </div>
  );
}