import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import ListedOnSection from "@/app/components/ui/ListedOnSection";
import BackToTopButton from "@/app/components/ui/backtotop";
import ModuleHeader from "@/app/components/modules/Header";
import InfoContent from "@/app/components/info/InfoContent";

export const metadata = {
  openGraph: {
    url: "/about",
    siteName: "DSA Visualizer",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DSA Visualizer" }],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "/about" },
  title: "About Us",
  description:
    "Learn who builds DSA Visualizer, why it exists, and what the platform covers — 67 interactive algorithm modules, quizzes and code examples, free and without a signup.",
  keywords: [
    "About DSA Visualizer",
    "Who made DSA Visualizer",
    "DSA learning platform",
    "Algorithm visualization tool",
  ],
  robots: "index, follow",
};

const aboutSections = [
  {
    title: "Why this site exists",
    paragraphs: [
      "Most people meet data structures and algorithms as static text: a paragraph of theory, a block of pseudocode, and a diagram that shows one frozen moment of a process that is fundamentally about change. The hard part of a sorting algorithm is not its final state — it is what happens in between, and that is exactly the part a textbook cannot show you.",
      "DSA Visualizer was built to close that gap. Every module animates the algorithm step by step, so you watch pointers move, elements swap, and nodes link and unlink in real time. Once you have seen quicksort partition an array, the code stops being something you memorise and starts being something you recognise.",
    ],
  },
  {
    title: "What you'll find here",
    paragraphs: [
      "The platform covers 67 interactive modules across seven areas of data structures and algorithms:",
    ],
    points: [
      "Sorting — bubble, selection, insertion, merge and quick sort",
      "Searching — linear and binary search",
      "Stack — push/pop, peek, isEmpty, isFull, infix-to-postfix and infix-to-prefix conversion, plus array and linked-list implementations",
      "Queue — enqueue/dequeue, peek, circular, priority and double-ended queues",
      "Linked List — singly, doubly and circular, with traversal, insertion, deletion, search, reversal and merge operations",
      "Trees — binary trees, BSTs, AVL balancing, traversals, and advanced structures including tries, segment trees, Fenwick trees, red-black trees and B-trees",
      "Graphs — BFS, DFS, Dijkstra, Prim, Kruskal and topological sort, with adjacency list and matrix representations",
    ],
  },
  {
    title: "How each module is built",
    paragraphs: [
      "Every module follows the same structure, so once you learn your way around one, you know your way around all of them. You get an interactive animation you control, a written explanation of how the algorithm works, a complexity breakdown with a graph showing how it scales, and runnable code examples.",
      "Code is provided in five languages — JavaScript, Python, Java, C and C++ — because the concept is the same everywhere and only the syntax changes. There are 63 quizzes across the modules so you can check whether you actually absorbed something rather than just watching it happen.",
    ],
  },
  {
    title: "Free, and no account needed",
    paragraphs: [
      "Every visualizer and article on this site is free to use, and you do not need to sign up to use any of them. Creating an account is entirely optional — it exists only so the site can remember which modules you have completed and show you your progress on a dashboard.",
      "The project is also open source. If you find a bug, disagree with an explanation, or want to add a module, the repository is public and contributions are welcome.",
    ],
    links: [
      {
        text: "View the source on GitHub",
        href: "https://github.com/Sohan-Rout/DSA",
        external: true,
      },
      { text: "Browse the visualizers", href: "/visualizer" },
    ],
  },
  {
    title: "Who builds it",
    paragraphs: [
      "DSA Visualizer is built and maintained by Sohan Rout, a developer who kept running into the same problem while learning algorithms: the explanations that made sense were the ones that moved. The site started as a way to build those explanations, and grew into the platform it is now.",
      "It is an independent project rather than a company product, which means feedback reaches the person who can act on it directly. If something is wrong or unclear, saying so genuinely changes the site.",
    ],
    links: [
      { text: "Get in touch", href: "/contact" },
      {
        text: "LinkedIn",
        href: "https://www.linkedin.com/in/sohan-rout",
        external: true,
      },
    ],
  },
  {
    title: "Writing and articles",
    paragraphs: [
      "Alongside the visualizers, the blog covers the questions people actually ask when starting out — how long learning DSA really takes, whether it matters for web development, whether algorithms differ between programming languages, and what data structures are in the first place. The articles aim to give straight answers with realistic expectations rather than motivational filler.",
    ],
    links: [{ text: "Read the blog", href: "/blogs" }],
  },
];

export default function AboutPage() {
  const paths = [
    { name: "Home", href: "/" },
    { name: "About", href: "" },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="py-20 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <section className="px-6 md:px-12">
          <ModuleHeader category="About" title="About DSA Visualizer" paths={paths} />
          <InfoContent
            intro="DSA Visualizer is a free, interactive platform for learning data structures and algorithms by watching them run, rather than reading about them running."
            sections={aboutSections}
            footnote="Last updated: August 21, 2026"
          />

          <ListedOnSection className="mt-8" />
        </section>
      </div>

      <BackToTopButton />
      <Footer />
    </>
  );
}
