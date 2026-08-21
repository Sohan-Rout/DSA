// Shared by content.jsx (rendered FAQ) and page.jsx (FAQPage JSON-LD).
// Keep this the single source of truth so the two never drift.
export const faqs = [
  {
    q: "Can I get a web dev job without DSA?",
    a: "Plenty of people do, particularly at agencies and smaller product teams where portfolio work carries the interview. It becomes much harder at companies that run algorithmic screens, which includes most large ones.",
  },
  {
    q: "How much is enough for front-end work?",
    a: "Complexity analysis, arrays, hash maps, sets and a working understanding of trees will cover the overwhelming majority of day-to-day decisions. Dynamic programming rarely appears outside interviews.",
  },
  {
    q: "Isn't the framework handling performance for me?",
    a: "It handles rendering. It cannot fix an algorithm you wrote that does redundant work — and re-render optimisation itself depends on understanding what changed, which is a data question.",
  },
];
