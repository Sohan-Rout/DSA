'use client';
import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import Feature from "@/app/components/feature";
import About from "@/app/components/about";
import Contact from "@/app/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <Feature />
      <About />
      <Contact />
    </div>
  );
}