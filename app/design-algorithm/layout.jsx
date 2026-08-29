// Route-level metadata for /design-algorithm. Nested module pages bring their
// own chrome (navbarinner + Footer) like every other module in the app, so this
// layout stays a passthrough rather than wrapping children in a shell.
export const metadata = {
  alternates: { canonical: "/design-algorithm" },
  title: 'Design & Analysis of Algorithms',
  description:
    'Learn the design and analysis of algorithms — asymptotic notation, time and space complexity, recurrence relations (Master Theorem, substitution, recursion tree) and amortized analysis, explained step by step.',
  keywords: [
    'Design and Analysis of Algorithms',
    'DAA',
    'Algorithm Analysis',
    'Asymptotic Notation',
    'Big O Notation',
    'Time Complexity',
    'Space Complexity',
    'Recurrence Relations',
    'Master Theorem',
    'Substitution Method',
    'Recursion Tree Method',
    'Amortized Analysis',
  ],
  robots: 'index, follow',
};

export default function DesignAlgorithmLayout({ children }) {
  return children;
}
