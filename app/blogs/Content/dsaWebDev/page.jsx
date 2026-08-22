import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Content from "@/app/blogs/Content/dsaWebDev/content";
import JsonLd from "@/app/blogs/components/JsonLd";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/app/blogs/lib/schema";
import { faqs } from "./faqs";

export const metadata = {
  alternates: { canonical: "/blogs/Content/dsaWebDev" },
  title: "Is DSA Important for Web Developers?",
  description:
    "Discover how DSA can elevate your web development skills. Learn when and why understanding data structures and algorithms matters for frontend and backend web devs.",
  keywords: [
    "Data Structures",
    "Algorithms",
    "Web Development",
    "Frontend",
    "Backend",
    "DSA for Web Developers",
    "React",
    "JavaScript",
    "Performance Optimization",
    "Coding Interview Preparation",
  ],
  authors: [{ name: "Sohan Rout", url: "https://www.linkedin.com/in/sohan-rout" }],
  openGraph: {
    title: "Is Data Structures and Algorithms Important for Web Developers?",
    description:
      "Explore how learning DSA can boost your efficiency, optimize performance, and prepare you for tech interviews, even as a web developer.",
    url: "/blogs/Content/dsaWebDev",
    siteName: "DSA Visualizer",
    locale: "en_US",
    type: "article",
    publishedTime: "2025-05-17T08:00:00Z",
    modifiedTime: "2026-08-21T00:00:00Z",
    authors: ["Sohan Rout"],
    images: [
      {
        url: "./blog/dsaWebDev.png", // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "DSA for Web Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Is DSA Important for Web Developers?",
    description:
      "Think DSA is only for competitive programming? Think again. Here's how it benefits modern web developers.",
    images: ["./blog/dsaWebDev.png"],
  },
  category: "Technology",
  robots: "index, follow",
};

const PATH = "/blogs/Content/dsaWebDev";

const schemas = [
  articleSchema({
    headline: metadata.title,
    description: metadata.description,
    path: PATH,
    image: "/blog/dsaWebDev.png",
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
  return(
    <main className="bg-white dark:bg-zinc-950">
      <JsonLd schemas={schemas} />
      <Navbar/>
      <Content/>
      <Footer/>
    </main>
  );
}

export default page;