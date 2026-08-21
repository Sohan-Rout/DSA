import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import ModuleHeader from "@/app/components/modules/Header";
import PolicyContent from "@/app/components/policy/PolicyContent";

export const metadata = {
  openGraph: {
    url: "/cookies",
    siteName: "DSA Visualizer",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DSA Visualizer" }],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "/cookies" },
  title: "Cookie Policy",
  description:
    "Read the DSA Visualizer Cookie Policy to learn what cookies we use, why we use them, and how you can manage your cookie preferences.",
  robots: "index, follow",
};

const cookieSections = [
  {
    id: "1",
    title: "What Are Cookies",
    data: "Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.",
  },
  {
    id: "2",
    title: "Types of Cookies We Use",
    points: [
      "Essential Cookies: Required for basic site functionality and security",
      "Performance Cookies: Help us understand how visitors interact with our website",
      "Functionality Cookies: Remember your preferences and settings",
      "Analytics Cookies: Collect information about your usage patterns",
    ],
  },
  {
    id: "3",
    title: "How We Use Cookies",
    points: [
      "To authenticate users and prevent fraudulent use",
      "Remember your preferences and settings",
      "Analyze site traffic and usage patterns",
      "Improve our website performance and user experience",
      "Provide personalized content when available",
    ],
  },
  {
    id: "4",
    title: "Third-Party Cookies",
    data: "We use cookies from the following third-party services, each governed by its own privacy policy:",
    points: [
      "Google Analytics: measures site traffic and usage patterns",
      "Google AdSense: serves ads and may use cookies to personalize ads based on your visits to this and other sites",
      "Supabase: sets authentication cookies to keep you signed in",
      "Cloudflare Turnstile: sets cookies to verify you're not a bot on login and signup",
    ],
  },
  {
    id: "5",
    title: "Cookie Management",
    points: [
      "You can control cookie settings through your browser preferences",
      "Most browsers allow you to refuse or delete cookies",
      "Disabling essential cookies may affect website functionality, such as staying signed in",
      "You can opt out of Google Analytics using the Google Analytics Opt-out Browser Add-on, and manage Google ad personalization at adssettings.google.com",
    ],
  },
  {
    id: "6",
    title: "Your Choices",
    data: "You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website.",
  },
  {
    id: "7",
    title: "Updates to Cookie Policy",
    data: "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our operations. We encourage you to periodically review this page for the latest information.",
  },
  {
    id: "8",
    title: "Contact Information",
    data: "If you have any questions about our use of cookies, please contact us at",
    contact: "hello@dsavisualizer.in",
  },
];

export default function CookiePolicyPage() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Cookie Policy", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader
            category="Legal"
            title="Cookie Policy"
            paths={paths}
          />
          <PolicyContent
            intro="This Cookie Policy explains how we use cookies and similar technologies on our website. It describes the types of cookies we use, their purposes, and how you can manage your cookie preferences."
            sections={cookieSections}
            lastUpdated="August 2, 2026"
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
