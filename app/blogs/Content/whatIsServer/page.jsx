import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Content from "@/app/blogs/Content/whatIsServer/content";
import JsonLd from "@/app/blogs/components/JsonLd";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/app/blogs/lib/schema";
import { faqs } from "./faqs";

export const metadata = {
  alternates: { canonical: "/blogs/Content/whatIsServer" },
  title: "What Is a Server? A Beginner's Guide",
  description:
    "A server is a computer that answers requests from other computers. Learn how the client-server model works, where websites live, and what makes a server.",
  keywords: [
    "what is a server",
    "what is a server in computer",
    "what is a web server",
    "client server model",
    "how do servers work",
    "server vs computer",
    "what happens when you visit a website",
    "where are websites stored",
    "data center",
    "backend basics",
  ],
  authors: [{ name: "Sohan Rout", url: "https://www.linkedin.com/in/sohan-rout" }],
  openGraph: {
    title: "What Is a Server? A Beginner's Guide",
    description:
      "What a server is, where it lives, and what happens between your click and the page appearing.",
    url: "/blogs/Content/whatIsServer",
    siteName: "DSA Visualizer",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-09-17T08:00:00Z",
    modifiedTime: "2026-09-17T08:00:00Z",
    authors: ["Sohan Rout"],
    images: [
      {
        url: "/blog/whatIsServer.png",
        width: 1200,
        height: 630,
        alt: "A browser sending a request to a server and receiving a response",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is a Server? A Beginner's Guide",
    description:
      "Every click starts with a request to a computer somewhere else. Here is what that computer is and what it does.",
    images: ["/blog/whatIsServer.png"],
  },
  category: "Backend",
  robots: "index, follow",
};

const PATH = "/blogs/Content/whatIsServer";

const schemas = [
  articleSchema({
    headline: metadata.title,
    description: metadata.description,
    path: PATH,
    image: "/blog/whatIsServer.png",
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
