// Shared by content.jsx (rendered FAQ) and page.jsx (FAQPage JSON-LD).
// Keep this the single source of truth so the two never drift.
export const faqs = [
  {
    q: "Why is it so hard to start a LeetCode problem even after learning DSA?",
    a: "Because learning a concept and choosing a concept are two different skills. Knowing what a hash map or a sliding window is does not tell you which one a new problem needs. That second skill only comes from solving problems and seeing the same ideas from different angles.",
  },
  {
    q: "Should you look at the solution when you are stuck?",
    a: "Yes, but only after giving the problem real thought, and only to understand the approach rather than to copy the code. Read the reasoning, close the solution, and implement it yourself. If you can solve it again days later without help, you have actually learned it.",
  },
  {
    q: "How many LeetCode problems do you need to solve?",
    a: "The count matters less than the coverage. Hundreds of different-looking problems reduce to a relatively small number of techniques, so solving fifty problems across many patterns teaches you more than two hundred problems from the same few.",
  },
  {
    q: "What is pattern recognition in DSA?",
    a: "It is the habit of reading a problem and noticing which known technique fits. A contiguous portion of an array suggests a sliding window. Repeatedly needing the smallest or largest element suggests a heap. Relationships between objects suggest a graph. Repeated choices over overlapping subproblems suggest dynamic programming.",
  },
];
