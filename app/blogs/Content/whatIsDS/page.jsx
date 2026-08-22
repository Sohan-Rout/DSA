import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Content from "@/app/blogs/Content/whatIsDS/content";
import JsonLd from "@/app/blogs/components/JsonLd";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/app/blogs/lib/schema";
import { faqs } from "./faqs";

export const metadata = {
  alternates: { canonical: "/blogs/Content/whatIsDS" },
  title: "What Are Data Structures?",
  description:
    "Confused by arrays, stacks, or linked lists? This beginner-friendly guide breaks down what data structures are, their types, and why they matter for every aspiring programmer.",
  keywords: [
    "Data Structures",
    "Beginner Programming",
    "DSA",
    "Arrays",
    "Stacks",
    "Linked Lists",
    "Programming Basics",
    "Computer Science",
    "Coding for Beginners",
    "Programming Concepts"
  ],
  authors: [{ name: "Sohan Rout", url: "https://www.linkedin.com/in/sohan-rout" }],
  openGraph: {
    title: "What Are Data Structures? A Beginner-Friendly Guide",
    description:
      "Understand the fundamentals of data structures in simple terms. A must-read guide for anyone new to programming and computer science.",
    url: "/blogs/Content/whatIsDS",
    siteName: "DSA Visualizer",
    locale: "en_US",
    type: "article",
    publishedTime: "2025-05-23T08:00:00Z",
    modifiedTime: "2026-08-21T00:00:00Z",
    authors: ["Sohan Rout"],
    images: [
      {
        url: "./blog/whatIsDS.png", // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Beginner’s Guide to Data Structures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Are Data Structures? A Beginner-Friendly Guide",
    description:
      "Kickstart your programming journey by learning what data structures are and how they work. Explained in a simple, visual way.",
    images: ["./blog/whatIsDS.png"],
  },
  category: "Data Structures & Algorithms",
  robots: "index, follow",
};

const PATH = "/blogs/Content/whatIsDS";

const schemas = [
  articleSchema({
    headline: metadata.title,
    description: metadata.description,
    path: PATH,
    image: "/blog/whatIsDS.png",
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