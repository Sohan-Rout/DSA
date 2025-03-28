'use client';
import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import Feature from "@/app/components/feature";
import Prices from "@/app/components/price";
import About from "@/app/components/about";
import Contact from "@/app/components/contact";
import Footer from "@/app/components/footer";

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
      <Contact />
      <Footer />
    </div>
  );
}