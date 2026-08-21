import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import ModuleHeader from "@/app/components/modules/Header";
import PolicyContent from "@/app/components/policy/PolicyContent";

export const metadata = {
  openGraph: {
    url: "/terms",
    siteName: "DSA Visualizer",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DSA Visualizer" }],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "/terms" },
  title: "Terms of Service | DSA Visualizer",
  description:
    "Read the DSA Visualizer Terms of Service covering acceptance of terms, use license, user responsibilities, and intellectual property.",
  robots: "index, follow",
};

const termsSections = [
  {
    id: "1",
    title: "Acceptance of Terms",
    data: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
  },
  {
    id: "2",
    title: "Eligibility",
    data: "You must be at least 13 years old to use this website. If you are under the age of majority in your jurisdiction, you may only use the service under the supervision of a parent or legal guardian.",
  },
  {
    id: "3",
    title: "Use License",
    points: [
      "Permission is granted to temporarily use the materials on this website for personal, non-commercial transitory viewing only",
      "This is the grant of a license, not a transfer of title",
      "You may not modify or copy the materials, use them for any commercial purpose, or remove any copyright or proprietary notations",
    ],
  },
  {
    id: "4",
    title: "User Accounts & Responsibilities",
    points: [
      "Provide accurate and complete information when required",
      "Maintain the confidentiality of your account credentials",
      "Notify us immediately of any unauthorized use of your account",
      "Use the service in compliance with all applicable laws and regulations",
    ],
  },
  {
    id: "5",
    title: "Termination",
    data: "We may suspend or terminate your access to the service at any time, without notice, if you violate these Terms or engage in conduct we determine, in our sole discretion, to be harmful to the service or other users. You may also stop using the service and request deletion of your account at any time.",
  },
  {
    id: "6",
    title: "Third-Party Services",
    data: "The service uses third-party providers, including Supabase (authentication and data storage), Google Analytics and Google AdSense (analytics and advertising), Cloudflare Turnstile (bot protection), and Vercel (hosting). Your use of features backed by these providers is also subject to their respective terms.",
  },
  {
    id: "7",
    title: "Intellectual Property",
    data: "All content, features, and functionality on this website, including but not limited to text, graphics, logos, and software, are the exclusive property of the company and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    id: "8",
    title: "Disclaimer of Warranties",
    data: "This website and its content are provided \"as is\" and \"as available\" without warranties of any kind, express or implied. We do not warrant that the service will be uninterrupted, error-free, or completely secure.",
  },
  {
    id: "9",
    title: "Limitation of Liability",
    data: "In no event shall the company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
  },
  {
    id: "10",
    title: "Governing Law",
    data: "These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of India.",
  },
  {
    id: "11",
    title: "Changes to Terms",
    data: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.",
  },
  {
    id: "12",
    title: "Contact Information",
    data: "If you have any questions about these Terms, please contact us at",
    contact: "hello@dsavisualizer.in",
  },
];

export default function TermsOfServicePage() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Terms of Service", href: "" },
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
            title="Terms of Service"
            paths={paths}
          />
          <PolicyContent
            intro="Please read these terms and conditions carefully before using our website and services. Your access to and use of the service is conditioned on your acceptance of and compliance with these terms."
            sections={termsSections}
            lastUpdated="August 2, 2026"
          />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
