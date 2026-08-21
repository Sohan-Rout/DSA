// Shared by content.jsx (rendered FAQ) and page.jsx (FAQPage JSON-LD).
// Keep this the single source of truth so the two never drift.
export const faqs = [
  {
    q: "Does my choice of language make DSA harder?",
    a: "Only marginally, and mostly at the edges. Languages with richer standard libraries hide more of the implementation, which is convenient while learning and occasionally a gap later when you need to build the thing yourself.",
  },
  {
    q: "Will my DSA knowledge transfer if I switch languages?",
    a: "Almost entirely. The concepts are the transferable part; what you re-learn is which built-in maps to which concept, and where the performance surprises are.",
  },
  {
    q: "Which language should I learn DSA in?",
    a: "The one you already write most fluently. Struggling with unfamiliar syntax while learning an unfamiliar algorithm doubles the difficulty for no benefit.",
  },
];
