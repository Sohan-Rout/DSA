import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Content from "@/app/blogs/Content/timeRequired/content";
import JsonLd from "@/app/blogs/components/JsonLd";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/app/blogs/lib/schema";
import { faqs } from "./faqs";

export const metadata = {
    alternates: { canonical: "/blogs/Content/timeRequired" },
    title: "How Long Does It Take to Learn DSA?",
    description:
        "Uncover how much time it takes to learn and master Data Structures and Algorithms (DSA) for web development. Get practical timelines, tips, and strategies for efficient DSA learning.",
    keywords: [
        "Time to Learn DSA",
        "DSA Mastery Timeline",
        "Data Structures",
        "Algorithms",
        "Learning Path",
        "Web Development",
        "Frontend",
        "Backend",
        "DSA Study Plan",
        "Coding Interview Preparation",
    ],
    authors: [{ name: "Sohan Rout", url: "https://www.linkedin.com/in/sohan-rout" }],
    openGraph: {
        title: "Time Required to Learn and Master DSA",
        description:
            "Find out how long it takes to learn and master DSA for web development. Explore realistic timelines, learning strategies, and tips for success.",
        url: "/blogs/Content/timeRequired",
        siteName: "DSA Visualizer",
        locale: "en_US",
        type: "article",
        publishedTime: "2025-06-20T08:00:00Z",
        modifiedTime: "2026-08-21T00:00:00Z",
        authors: ["Sohan Rout"],
        images: [
            {
                url: "./blog/timeRequired.png", // Replace with actual OG image
                width: 1200,
                height: 630,
                alt: "Time Required to Learn DSA",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Time Required to Learn and Master DSA",
        description:
            "How much time does it take to learn DSA? Get timelines, strategies, and tips for mastering Data Structures and Algorithms.",
        images: ["./blog/timeRequired.png"],
    },
    category: "Technology",
    robots: "index, follow",
};

const PATH = "/blogs/Content/timeRequired";

const schemas = [
  articleSchema({
    headline: metadata.title,
    description: metadata.description,
    path: PATH,
    image: "/blog/timeRequired.png",
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