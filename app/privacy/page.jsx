import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import ModuleHeader from "@/app/components/modules/Header";
import PolicyContent from "@/app/components/policy/PolicyContent";

export const metadata = {
  title: "Privacy Policy | DSA Visualizer",
  description:
    "Read the DSA Visualizer Privacy Policy to learn how we collect, use, and protect your information when you use our interactive DSA learning platform.",
  robots: "index, follow",
};

const policySections = [
  {
    id: "1",
    title: "Information We Collect",
    points: [
      "Account information: name, email address, and authentication data when you sign up or log in (including via Google sign-in), handled through our authentication provider, Supabase",
      "Usage data: pages visited, modules completed, and progress data, so we can show your dashboard and activity history",
      "Technical data: IP address, browser type, and device information, collected automatically by our analytics and security providers",
      "Messages you send us through the contact or review forms",
    ],
  },
  {
    id: "2",
    title: "How We Use Your Information",
    points: [
      "To provide and maintain our services, including your account, dashboard, and saved progress",
      "To improve user experience and service quality",
      "To send important updates or respond to support emails",
      "To detect and prevent spam or abuse (e.g. via Cloudflare Turnstile on login/signup)",
      "To measure site performance and usage trends",
    ],
  },
  {
    id: "3",
    title: "Third-Party Services",
    data: "We use the following third-party services, each of which may process data according to its own privacy policy:",
    points: [
      "Supabase — authentication and database storage for accounts and progress data",
      "Google Analytics — website usage analytics",
      "Google AdSense — displays ads and may use cookies to personalize them based on your visits to this and other sites; you can manage ad personalization at adssettings.google.com",
      "Cloudflare Turnstile — bot/spam protection on login and signup",
      "Vercel — hosting and performance analytics",
    ],
  },
  {
    id: "4",
    title: "Cookies",
    data: "We use cookies and similar technologies as described in our Cookie Policy, including cookies set by Google Analytics and Google AdSense. You can control cookies through your browser settings.",
  },
  {
    id: "5",
    title: "Data Retention",
    data: "We retain account and progress data for as long as your account is active. You can request deletion of your account and associated data at any time by contacting us.",
  },
  {
    id: "6",
    title: "Children's Privacy",
    data: "This website is not directed at children under the age of 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can remove it.",
  },
  {
    id: "7",
    title: "Your Rights",
    data: "You have the right to request access, correction, or deletion of your personal data at any time by contacting us.",
  },
  {
    id: "8",
    title: "Contact Information",
    data: "For any privacy-related questions, please contact us at",
    contact: "hello@dsavisualizer.in",
  },
];

export default function PrivacyPolicyPage() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "" },
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
            title="Privacy Policy"
            paths={paths}
          />
          <PolicyContent
            intro="Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services."
            sections={policySections}
            lastUpdated="August 2, 2026"
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
