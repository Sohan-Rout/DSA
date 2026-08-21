// page.jsx is a client component and cannot export metadata, so the route's
// metadata lives here. The dashboard is per-user and has nothing to rank for.
export const metadata = {
  title: "Your Dashboard",
  description:
    "Track which DSA modules you have completed and pick up where you left off.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function DashboardLayout({ children }) {
  return children;
}
