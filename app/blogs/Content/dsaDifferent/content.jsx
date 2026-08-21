"use client";
import {
  ArticleShell,
  H2,
  P,
  Callout,
  Timeline,
  CheckList,
  BulletList,
  DataTable,
  FAQ,
} from "@/app/blogs/components/article";

const universalConcepts = [
  "Time complexity, and reasoning about it in Big O notation.",
  "Space complexity and the memory a structure really costs.",
  "How an abstract data type is expected to behave, independent of code.",
  "Algorithm design patterns — divide and conquer, greedy, two pointers.",
  "The problem-solving approach itself: recognising which shape a problem has.",
];

const languageNotes = [
  {
    title: "JavaScript",
    description:
      "Arrays are objects with integer keys, and plain objects double as hash maps that happen to preserve insertion order. There is no built-in heap, so a priority queue is something you write yourself. The single-threaded event loop also shapes how you design anything asynchronous.",
  },
  {
    title: "Python",
    description:
      "Lists are dynamic arrays and dictionaries are heavily optimised hash tables, so a lot of algorithms collapse into a couple of lines. Sorting is Timsort, and generator expressions let you iterate huge sequences without materialising them.",
  },
  {
    title: "Java",
    description:
      "The Collections framework hands you the structures directly — ArrayList, HashMap, PriorityQueue, TreeMap — with their complexity documented. In exchange you deal with generics, boxing costs, and the garbage collector's timing.",
  },
  {
    title: "C++",
    description:
      "The STL gives you vector, map, unordered_map and priority_queue, and manual memory control lets you get closer to the theoretical performance than anywhere else. That control is also the reason it is easier to get wrong.",
  },
];

const sameIdeaTable = [
  { concept: "Hash map", js: "Object / Map", py: "dict", java: "HashMap" },
  { concept: "Dynamic array", js: "Array", py: "list", java: "ArrayList" },
  { concept: "Set", js: "Set", py: "set", java: "HashSet" },
  { concept: "Priority queue", js: "— (write it)", py: "heapq", java: "PriorityQueue" },
];

const whereItMatters = [
  {
    title: "Performance-critical paths",
    description:
      "Two languages can implement the same algorithm at the same complexity and still differ by an order of magnitude in wall-clock time, because of memory layout and allocation behaviour.",
  },
  {
    title: "Interfacing between languages",
    description:
      "Serialising data across a boundary can quietly turn a cheap structure into an expensive one. A hash map crossing a JSON boundary becomes an object, and its guarantees change with it.",
  },
  {
    title: "Interviews",
    description:
      "You will be assessed on the concept, but you write in a specific language. Knowing that your language lacks a heap — and how you would improvise one — is the difference between stalling and continuing.",
  },
];

const protips = [
  "Learn DSA properly in one language first, then compare implementations — not the other way round.",
  "Read your standard library's implementation of the structures you use most.",
  "Benchmark rather than assuming; language performance folklore is often years out of date.",
  "Understand how your language's memory model affects the structures you build.",
  "Don't translate code between languages line by line — adapt it to that language's strengths.",
];

const faqs = [
  {
    q: "Does my choice of language make DSA harder?",
    a: "Only marginally, and mostly at the edges. Languages with richer standard libraries hide more of the implementation, which is convenient while learning and occasionally a gap later when you need to build the thing yourself.",
  },
  {
    q: "Will my DSA knowledge transfer if I switch languages?",
    a: "Almost entirely. The concepts are the transferable part; what you re-learn is which built-in maps to which concept, and where the performance surprises are.",
  },
  {
    q: "Which language should I learn DSA in?",
    a: "The one you already write most fluently. Struggling with unfamiliar syntax while learning an unfamiliar algorithm doubles the difficulty for no benefit.",
  },
];

const BlogContent = () => (
  <ArticleShell
    category="Programming Languages"
    title="Are Data Structures and Algorithms Different for Different Languages?"
    deck="The concepts are identical everywhere. What changes is what's built in, what you write yourself, and where the performance surprises hide."
    date="May 19, 2025"
    readTime="8 min read"
    image="/blog/dsaDifferent.png"
    imageAlt="Data structures compared across programming languages"
    imageCaption="Same ideas, different vocabulary — and occasionally different costs."
    url="https://www.dsavisualizer.in/blogs/Content/dsaDifferent"
    hashtags="#DSA #Programming #LearnToCode"
  >
    <P>
      A common question among people learning data structures and algorithms is
      whether any of it changes when you switch languages. Does a stack in Python
      behave like a stack in C++? Is recursion the same in JavaScript as in Java?
    </P>
    <P>
      The fundamentals stay put. The implementations, the built-ins and the
      performance characteristics do not.
    </P>

    <Callout title="The short answer">
      The <strong>concepts</strong> are language-agnostic and transfer almost
      completely. The <strong>implementations</strong> vary — which is why your
      knowledge moves with you, but your code does not.
    </Callout>

    <H2 id="universal">What stays the same everywhere</H2>
    <P>
      These do not change no matter what you write in, which is what makes the
      subject worth learning once:
    </P>
    <CheckList items={universalConcepts} />
    <P>
      A queue is first-in-first-out in every language that has ever existed. That
      guarantee is the concept; everything below is packaging.
    </P>

    <H2 id="vocabulary">The same idea, four names</H2>
    <P>
      Most of the apparent difference between languages is vocabulary. The same
      four structures, as each language spells them:
    </P>
    <DataTable
      columns={["Concept", "JavaScript", "Python", "Java"]}
      rows={sameIdeaTable.map((row) => [
        row.concept,
        row.js,
        row.py,
        row.java,
      ])}
    />
    <P>
      Note the last row: JavaScript has no built-in priority queue, so what is a
      one-line import elsewhere is something you implement yourself. That is the
      kind of difference worth knowing in advance.
    </P>

    <H2 id="languages">Where each language actually differs</H2>
    <Timeline items={languageNotes} />

    <H2 id="matters">When the differences start to matter</H2>
    <P>
      For most learning, they do not. Three situations where they genuinely do:
    </P>
    <Timeline items={whereItMatters} />

    <H2 id="approach">How to approach it</H2>
    <BulletList items={protips} />

    <H2 id="faq">Common questions</H2>
    <FAQ items={faqs} />

    <H2 id="takeaway">Key takeaway</H2>
    <P>
      Learn the core principles first, then learn how your primary language
      implements them. That order gives you a foundation that survives a change
      of job, framework or language, plus the practical detail you need today.
    </P>
    <P>
      Put differently: learn the idea once, and re-learn only the spelling.
    </P>
  </ArticleShell>
);

export default BlogContent;
