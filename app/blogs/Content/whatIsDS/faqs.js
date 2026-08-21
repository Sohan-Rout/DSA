// Shared by content.jsx (rendered FAQ) and page.jsx (FAQPage JSON-LD).
// Keep this the single source of truth so the two never drift.
export const faqs = [
  {
    q: "Do I need to memorise every data structure?",
    a: "No. Six carry most of the weight: arrays, hash maps, stacks, queues, trees and graphs. Learn those properly and the rest are variations you can pick up when you meet them.",
  },
  {
    q: "What is the difference between a data structure and an algorithm?",
    a: "A data structure is how the data is arranged; an algorithm is what you do with it. Sorting is an algorithm, the array it sorts is the structure. Choosing the structure usually decides which algorithms are even available to you.",
  },
  {
    q: "Does the language change any of this?",
    a: "The concepts are identical everywhere. Only the names and the built-ins change — a Python dict, a Java HashMap and a JavaScript Map are the same idea with different labels.",
  },
];
