import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import BackToTopButton from "@/app/components/ui/backtotop";
import ModuleHeader from "@/app/components/modules/Header";
import InfoContent from "@/app/components/info/InfoContent";
import ContactChannels from "@/app/components/info/ContactChannels";

const EMAIL = "hello@dsavisualizer.in";

export const metadata = {
  openGraph: {
    url: "/contact",
    siteName: "DSA Visualizer",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DSA Visualizer" }],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "/contact" },
  title: "Contact Us | DSA Visualizer",
  description:
    "Get in touch with DSA Visualizer — report a bug, correct an explanation, ask about privacy and your data, or suggest a new module. Every message reaches the person who maintains the site.",
  keywords: [
    "Contact DSA Visualizer",
    "DSA Visualizer support",
    "Report a bug",
    "DSA Visualizer email",
  ],
  robots: "index, follow",
};

const channels = [
  {
    title: "General enquiries",
    description:
      "Questions about the platform, feedback on a module, or anything that doesn't fit the other categories.",
    email: EMAIL,
    subject: "General enquiry",
  },
  {
    title: "Report a bug",
    description:
      "Something broken? An animation that stalls, a wrong result, or a page that won't load on your device.",
    email: EMAIL,
    subject: "Bug report",
  },
  {
    title: "Correct an explanation",
    description:
      "Found an error in an article, a complexity table, or a code example? Corrections are genuinely welcome.",
    email: EMAIL,
    subject: "Content correction",
  },
  {
    title: "Privacy and your data",
    description:
      "Request access to, correction of, or deletion of your account data under our Privacy Policy.",
    email: EMAIL,
    subject: "Privacy request",
  },
];

const contactSections = [
  {
    title: "What to expect",
    paragraphs: [
      "DSA Visualizer is an independent project maintained by one person, not a support desk. That means your message goes directly to the person who can actually fix the thing you are writing about — but it also means replies usually take two to three working days rather than arriving within the hour.",
      "Privacy and data-deletion requests are treated as a priority and handled as quickly as possible.",
    ],
  },
  {
    title: "Helping us fix things faster",
    paragraphs: [
      "If you are reporting a bug, a few details save a round of back-and-forth:",
    ],
    points: [
      "The page you were on — the full URL is ideal",
      "What you expected to happen, and what happened instead",
      "Your device and browser (for example, iPhone 13 / Safari, or Windows / Chrome)",
      "A screenshot or screen recording, if the problem is visual",
    ],
  },
  {
    title: "Contributing directly",
    paragraphs: [
      "The project is open source. If you are comfortable with GitHub, opening an issue or a pull request is often the fastest route — it keeps the discussion attached to the code and lets other contributors weigh in.",
    ],
    links: [
      {
        text: "Open an issue on GitHub",
        href: "https://github.com/Sohan-Rout/DSA/issues",
        external: true,
      },
      {
        text: "View the repository",
        href: "https://github.com/Sohan-Rout/DSA",
        external: true,
      },
    ],
  },
  {
    title: "Before you write",
    paragraphs: [
      "A few questions are answered elsewhere on the site and may save you the wait. The About page explains what the platform covers and who builds it, and the policy pages cover how data is handled.",
    ],
    links: [
      { text: "About the platform", href: "/about" },
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms" },
      { text: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export default function ContactPage() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="Contact" title="Contact Us" paths={paths} />

          <p className="max-w-3xl mx-auto mb-6 text-lg text-gray-600 dark:text-gray-300">
            The quickest way to reach us is email. Pick the category that fits and
            your message will arrive with the right subject line already filled in.
          </p>

          <ContactChannels channels={channels} />

          <InfoContent sections={contactSections} footnote="Last updated: August 21, 2026" />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
