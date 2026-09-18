import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Content from "@/app/blogs/Content/leetcodeIsHard/content";
import JsonLd from "@/app/blogs/components/JsonLd";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/app/blogs/lib/schema";
import { faqs } from "./faqs";

export const metadata = {
  alternates: { canonical: "/blogs/Content/leetcodeIsHard" },
  title: "LeetCode Is Harder Than It Looks",
  description:
    "Understanding a LeetCode problem and knowing how to start are two different skills. Why the approach is the hard part, and how to build pattern recognition.",
  keywords: [
    "leetcode is hard",
    "how to approach leetcode problems",
    "dsa pattern recognition",
    "stuck on leetcode",
    "how to get better at leetcode",
    "coding interview preparation",
    "dsa practice",
    "leetcode patterns",
    "sliding window",
    "dynamic programming",
  ],
  authors: [{ name: "Sohan Rout", url: "https://www.linkedin.com/in/sohan-rout" }],
  openGraph: {
    title: "LeetCode Is Harder Than It Looks",
    description:
      "The hard part was never writing the code. It's knowing how to approach a problem you have never seen before.",
    url: "/blogs/Content/leetcodeIsHard",
    siteName: "DSA Visualizer",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-09-18T08:00:00Z",
    modifiedTime: "2026-09-18T08:00:00Z",
    authors: ["Sohan Rout"],
    images: [
      {
        url: "/blog/leetcodeIsHard.png",
        width: 1200,
        height: 630,
        alt: "A LeetCode-style problem with a blank editor beside it",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeetCode Is Harder Than It Looks",
    description:
      "You read the problem. You understand it. And then nothing. Why knowing DSA and solving DSA problems are two different skills.",
    images: ["/blog/leetcodeIsHard.png"],
  },
  category: "DSA",
  robots: "index, follow",
};

const PATH = "/blogs/Content/leetcodeIsHard";

const schemas = [
  articleSchema({
    headline: metadata.title,
    description: metadata.description,
    path: PATH,
    image: "/blog/leetcodeIsHard.png",
    datePublished: metadata.openGraph.publishedTime,
    dateModified: metadata.openGraph.modifiedTime,
    section: metadata.category,
  }),
  faqSchema(faqs),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: metadata.title, path: PATH },
  ]),
];

const page = () => {
  return (
    <main className="bg-white dark:bg-zinc-950">
      <JsonLd schemas={schemas} />
      <Navbar />
      <Content />
      <Footer />
    </main>
  );
};

export default page;
