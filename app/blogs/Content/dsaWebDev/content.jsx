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

const dailyTasks = [
  "Building responsive UIs with HTML, CSS and JavaScript.",
  "Working in frameworks like React, Next.js or Vue.",
  "Integrating REST and GraphQL endpoints.",
  "Wiring up state management.",
  "Tuning performance and accessibility.",
];

const whereItShows = [
  {
    title: "Rendering large lists",
    description:
      "A filter that runs in a nested loop is invisible at 50 rows and janky at 5,000. Recognising an O(n²) pass and replacing it with a hash lookup is the single most common win in front-end work.",
  },
  {
    title: "Search and autocomplete",
    description:
      "Scanning every record on each keystroke works until the dataset grows. A prefix structure or an index turns that into a near-instant lookup.",
  },
  {
    title: "State shape",
    description:
      "Deeply nested state is a tree, whether you think of it that way or not. Normalising it into a flat map keyed by id is a data-structure decision, and it removes a whole class of update bugs.",
  },
  {
    title: "Caching and deduplication",
    description:
      "Request caches, memoisation and de-duped fetches are all hash maps with an eviction rule. Knowing the rule is what stops the cache growing unbounded.",
  },
];

const complexityTable = [
  { op: "Find by id in an array", naive: "O(n) — scan", better: "O(1) — hash map" },
  { op: "Check membership repeatedly", naive: "O(n) — includes()", better: "O(1) — Set" },
  { op: "Merge two sorted lists", naive: "O(n log n) — concat + sort", better: "O(n) — two pointers" },
  { op: "Group items by key", naive: "O(n²) — filter per key", better: "O(n) — single pass" },
];

const practicalRoute = [
  {
    title: "Start from your own bugs",
    description:
      "The next time a list feels slow, work out the actual complexity of the code doing it. Real profiling beats abstract problems for motivation and for retention.",
  },
  {
    title: "Learn the four that pay immediately",
    description:
      "Arrays, hash maps, sets and trees cover almost everything front-end. Everything else can wait until a problem asks for it.",
  },
  {
    title: "Rebuild something you already use",
    description:
      "Write your own memoise, your own debounce with a queue, or a simple LRU cache. You will never forget a structure you have implemented once.",
  },
];

const faqs = [
  {
    q: "Can I get a web dev job without DSA?",
    a: "Plenty of people do, particularly at agencies and smaller product teams where portfolio work carries the interview. It becomes much harder at companies that run algorithmic screens, which includes most large ones.",
  },
  {
    q: "How much is enough for front-end work?",
    a: "Complexity analysis, arrays, hash maps, sets and a working understanding of trees will cover the overwhelming majority of day-to-day decisions. Dynamic programming rarely appears outside interviews.",
  },
  {
    q: "Isn't the framework handling performance for me?",
    a: "It handles rendering. It cannot fix an algorithm you wrote that does redundant work — and re-render optimisation itself depends on understanding what changed, which is a data question.",
  },
];

const BlogContent = () => (
  <ArticleShell
    category="Web Development"
    title="Is Data Structures and Algorithms Important for Web Developers?"
    deck="Not the interview answer — where DSA genuinely changes the code you ship, and how much of it is actually worth learning."
    date="May 17, 2025"
    readTime="8 min read"
    image="/blog/dsaWebDev.png"
    imageAlt="Data structures applied to web development"
    imageCaption="Most front-end performance problems are algorithm problems in disguise."
    url="https://www.dsavisualizer.in/blogs/Content/dsaWebDev"
    hashtags="#WebDev #DSA #Programming"
  >
    <P>
      If you build for the web, you have probably wondered whether learning data
      structures and algorithms is genuinely necessary. Modern web development
      looks like composing components and calling APIs — where would a binary
      tree fit into that?
    </P>
    <P>It is a fair question, and the honest answer has two halves.</P>

    <Callout title="The short answer">
      You can ship good work without it. But the ceiling on what you can debug,
      optimise and design is set by it — and that ceiling shows up much earlier
      than most people expect.
    </Callout>

    <H2 id="what-we-do">What web developers actually do</H2>
    <P>A typical week looks something like this:</P>
    <CheckList items={dailyTasks} />
    <P>
      None of that obviously demands algorithm knowledge. The catch is that every
      one of those tasks has a scale at which the naive approach stops working,
      and it usually arrives without warning.
    </P>

    <H2 id="where">Where it actually shows up</H2>
    <P>
      Four places where this stops being theoretical in ordinary product work:
    </P>
    <Timeline items={whereItShows} />

    <H2 id="cost">The same task, two costs</H2>
    <P>
      Complexity analysis sounds academic until you see it as a menu of choices
      you make constantly:
    </P>
    <DataTable
      columns={["Task", "The obvious way", "The cheap way"]}
      rows={complexityTable.map((row) => [row.op, row.naive, row.better])}
    />
    <P>
      The right column is not cleverer code. It is the same code written by
      someone who recognised the shape of the problem.
    </P>

    <H2 id="how-much">How much is worth learning</H2>
    <P>
      Learning DSA in the context of web development beats learning it as
      abstract computer science — the concepts stick because they attach to
      problems you already have:
    </P>
    <Timeline items={practicalRoute} />

    <H2 id="pitfalls">Where people go wrong</H2>
    <BulletList
      items={[
        "Grinding dynamic programming for months, then never using it in the job.",
        "Learning structures with no idea which real problem each one solves.",
        "Assuming the framework will optimise away an inefficient algorithm — it won't.",
        "Skipping complexity analysis, which is the one part that pays off daily.",
      ]}
    />

    <H2 id="faq">Common questions</H2>
    <FAQ items={faqs} />

    <H2 id="verdict">The verdict</H2>
    <P>
      You can be a productive web developer without deep DSA knowledge. But
      understanding it makes you more versatile: you write code that survives
      growth, you can explain why something is slow rather than guessing, and
      technical interviews stop being a separate skill you have to cram for.
    </P>
    <P>
      Learn it in the context of the work, not as a parallel curriculum, and it
      stops feeling like a detour.
    </P>
  </ArticleShell>
);

export default BlogContent;
