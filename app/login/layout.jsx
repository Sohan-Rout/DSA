// page.jsx is a client component and cannot export metadata, so the route's
// metadata lives here. noindex keeps the sign-in screen out of search results;
// follow is left on so the policy links it contains stay crawlable.
export const metadata = {
  title: "Sign In",
  description:
    "Sign in to DSA Visualizer to save your progress across modules. An account is optional — every visualizer is free to use without one.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function LoginLayout({ children }) {
  return children;
}
