'use client';
import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
    </div>
  );
}