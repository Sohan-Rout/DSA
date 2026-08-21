"use client";
import {
  ArticleShell,
  H2,
  P,
  Callout,
  Timeline,
  CheckList,
  FigureCard,
  FAQ,
} from "@/app/blogs/components/article";

const importancePoints = [
  "Efficiency: the right structure makes programs faster and less memory-hungry.",
  "Scalability: what works for 100 records should still work for 100,000.",
  "Problem solving: most coding problems are really a question of picking the right structure.",
  "Real-world use: from social feeds to navigation systems, they are everywhere.",
];

const dataStructures = [
  {
    title: "Array",
    description:
      "A row of boxes, each holding a value at a numbered position. Reading position 4 is instant, but inserting in the middle means shifting everything after it.",
    note: "Best for ordered items you mostly read",
    image: "/blog/DSimage/array.png",
  },
  {
    title: "Stack (LIFO)",
    description:
      "A stack of plates — you add and remove from the top only. The last thing in is the first thing out.",
    note: "Best for undo history and backtracking",
    image: "/blog/DSimage/stack.png",
  },
  {
    title: "Queue (FIFO)",
    description:
      "People standing in line. The first to arrive is the first served, and nobody jumps ahead.",
    note: "Best for scheduling and task processing",
    image: "/blog/DSimage/queue.png",
  },
  {
    title: "Linked List",
    description:
      "A chain of nodes, each holding a value and the address of the next. There is no fixed size, and inserting means rewriting one link.",
    note: "Best for frequent insertions and removals",
    image: "/blog/DSimage/linkedList.png",
  },
  {
    title: "Tree",
    description:
      "Starts at a root and branches out. Each step down usually halves what is left to search, which is where the speed comes from.",
    note: "Best for hierarchies and fast lookup",
    image: "/blog/DSimage/tree.png",
  },
  {
    title: "Graph",
    description:
      "Nodes connected by edges, with no required shape. Any node can link to any other, which is how real networks behave.",
    note: "Best for networks, maps and recommendations",
    image: "/blog/DSimage/graph.png",
  },
];

const wardrobe = [
  {
    title: "Everything in one pile",
    description:
      "Storing all your data in a single unstructured list. Finding one item means checking every item — fine for ten things, painful for ten thousand.",
  },
  {
    title: "A drawer per category",
    description:
      "Choosing a structure that matches the shape of the data. You go straight to the right drawer instead of searching the whole room.",
  },
  {
    title: "Labelled and indexed",
    description:
      "Adding a hash map or an index on top. Now you find any item in roughly one step, no matter how much you own.",
  },
];

const buildIt = [
  "Store the names in an array so they keep their order.",
  "Add a hash table so searching by name is instant rather than a scan.",
  "Sort the array to display contacts alphabetically.",
  "Notice that each requirement pushed you toward a different structure — that is the whole skill.",
];

const faqs = [
  {
    q: "Do I need to memorise every data structure?",
    a: "No. Six carry most of the weight: arrays, hash maps, stacks, queues, trees and graphs. Learn those properly and the rest are variations you can pick up when you meet them.",
  },
  {
    q: "What is the difference between a data structure and an algorithm?",
    a: "A data structure is how the data is arranged; an algorithm is what you do with it. Sorting is an algorithm, the array it sorts is the structure. Choosing the structure usually decides which algorithms are even available to you.",
  },
  {
    q: "Does the language change any of this?",
    a: "The concepts are identical everywhere. Only the names and the built-ins change — a Python dict, a Java HashMap and a JavaScript Map are the same idea with different labels.",
  },
];

const BlogContent = () => (
  <ArticleShell
    category="Computer Science Fundamentals"
    title="What Are Data Structures? A Beginner-Friendly Guide"
    deck="Arrays, stacks, linked lists — what the words actually mean, why each one exists, and how to tell which to reach for."
    date="May 23, 2025"
    readTime="7 min read"
    image="/blog/whatIsDS.png"
    imageAlt="An illustration of common data structures"
    imageCaption="Six structures cover the vast majority of everyday programming."
    url="https://www.dsavisualizer.in/blogs/Content/whatIsDS"
    hashtags="#DSA #DataStructures #LearnToCode"
  >
    <P>
      If you&apos;re new to coding, you&apos;ve probably come across terms like
      array, stack, or linked list and thought, &quot;what does that even
      mean?&quot; You&apos;re not alone. These are all data structures, and they
      are simply different ways of arranging information so a program can work
      with it efficiently.
    </P>
    <P>
      This guide breaks down what they are, why they matter, and introduces the
      handful you will actually use — in plain language, with the trade-off for
      each one spelled out.
    </P>

    <Callout title="In one line">
      A data structure is a way to organise data so that the operations you care
      about are cheap. Every structure is fast at something and slow at
      something else — choosing one is choosing which.
    </Callout>

    <H2 id="what-is-it">What is a data structure?</H2>
    <P>
      Think of organising a wardrobe. Shirts in one drawer, socks in a box, coats
      on hangers. Nothing is stored more efficiently in the abstract, but finding
      a specific sock becomes far quicker because the arrangement matches how you
      search.
    </P>
    <P>Data works the same way, and the difference shows up as you scale:</P>
    <Timeline items={wardrobe} />

    <H2 id="why">Why they matter</H2>
    <P>Four reasons this is worth your time early rather than late:</P>
    <CheckList items={importancePoints} />
    <P>
      The practical version: a badly chosen structure does not just run slower,
      it makes some features impractical to build at all.
    </P>

    <H2 id="types">The six you will actually use</H2>
    <P>
      Each of these exists because it makes one operation cheap. The note under
      each card is the job it is genuinely good at.
    </P>
    <div className="my-8 grid gap-5 sm:grid-cols-2">
      {dataStructures.map((item) => (
        <FigureCard key={item.title} {...item} />
      ))}
    </div>

    <H2 id="example">Seeing it in one small app</H2>
    <P>
      Suppose you build a contact list. Watch how each new requirement pulls in a
      different structure:
    </P>
    <CheckList items={buildIt} />

    <H2 id="faq">Common questions</H2>
    <FAQ items={faqs} />

    <H2 id="final">Final thoughts</H2>
    <P>
      Data structures are the toolbox every programmer carries. You do not need
      all of them on day one — start with arrays and hash maps, add stacks and
      queues when a problem calls for order, then move on to trees and graphs.
    </P>
    <P>
      Practise each one by building something small with it rather than reading
      about it. What felt like intimidating jargon becomes ordinary vocabulary
      surprisingly quickly.
    </P>
  </ArticleShell>
);

export default BlogContent;
