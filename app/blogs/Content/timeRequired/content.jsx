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

const masterySignals = [
  "You recognise which pattern a new problem belongs to, before writing anything.",
  "You reach for the right structure without looking it up.",
  "You can state the time and space cost of your approach, and why.",
  "You can explain the trade-off out loud, not just code it.",
  "When an approach stalls halfway, you can debug your own reasoning rather than starting over.",
];

const factors = [
  {
    title: "Where you're starting from",
    description:
      "A working developer who already writes loops, recursion, and classes comfortably skips the first few weeks entirely. Someone new to programming should budget two to three extra months before DSA proper.",
  },
  {
    title: "Hours per week, not total hours",
    description:
      "Ten hours spread across five days beats ten hours on a Sunday, every time. Recall is built by spacing, so the calendar matters as much as the clock.",
  },
  {
    title: "What you're aiming at",
    description:
      "Passing a screening round is a far smaller target than being fluent. Interview readiness is a subset of mastery, and it arrives much sooner.",
  },
  {
    title: "Whether you revisit anything",
    description:
      "Solving 300 problems once teaches less than solving 150 twice. Learners who never revisit tend to plateau around month four.",
  },
];

const timelines = [
  {
    title: "0–3 months · Foundations",
    description:
      "Arrays, strings, hashing, recursion, and basic complexity analysis. You can solve most easy problems unaided, though slowly. Expect to feel like you're memorising rather than understanding — that's normal at this stage.",
  },
  {
    title: "3–6 months · Breadth",
    description:
      "Trees, graphs, heaps, and the traversal patterns that keep reappearing. Medium problems stop feeling random and start falling into recognisable families.",
  },
  {
    title: "6–9 months · Interview readiness",
    description:
      "Dynamic programming, harder mediums, and — the real difference — speed under time pressure. You can talk through an approach while writing it.",
  },
  {
    title: "12+ months · Fluency",
    description:
      "Patterns surface almost immediately, unfamiliar hard problems are approachable, and the trade-offs carry over into system design decisions.",
  },
];

const hoursTable = [
  { pace: "5 hrs / week", ready: "~12 months", note: "Alongside a full-time job" },
  { pace: "10 hrs / week", ready: "~6–7 months", note: "The common sustainable pace" },
  { pace: "20 hrs / week", ready: "~3–4 months", note: "Between jobs, or full-time study" },
];

const roadmap = [
  { title: "Weeks 1–2", description: "Arrays, Strings, HashMaps" },
  { title: "Weeks 3–4", description: "Stacks, Queues, Recursion" },
  { title: "Weeks 5–6", description: "Linked Lists, Trees" },
  { title: "Weeks 7–8", description: "Heaps, Binary Trees, BSTs" },
  { title: "Weeks 9–10", description: "Graphs, DFS / BFS" },
  { title: "Weeks 11–12", description: "DP, Tries, Bit Manipulation" },
];

const method = [
  {
    title: "Learn, code, then leave it",
    description:
      "Read or watch the idea once, then implement it from an empty file. Close the tab before you start — copying along teaches your fingers, not your memory.",
  },
  {
    title: "Return after a gap",
    description:
      "Redo anything you got wrong three to seven days later. The second attempt is where the pattern actually sticks.",
  },
  {
    title: "Write the pattern down in your own words",
    description:
      "One or two lines per problem: what signalled the approach. Re-reading your own phrasing beats re-reading someone else's explanation.",
  },
  {
    title: "Volume last, not first",
    description:
      "Grinding problem counts only pays off once the underlying structure makes sense. Before that it is expensive pattern-matching with no foundation.",
  },
];

const traps = [
  "Watching tutorials passively — it feels productive and teaches almost nothing.",
  "Skipping recursion because it's uncomfortable, then hitting a wall at trees and DP.",
  "Chasing a new problem every session and never revisiting an old one.",
  "Optimising for problem count instead of pattern coverage.",
  "Starting dynamic programming in month one, bouncing off it, and concluding you're bad at this.",
];

const checkpoints = [
  {
    title: "End of month 1",
    description:
      "You can write a binary search and a hash-map frequency count from memory, and explain why each is O(log n) and O(n).",
  },
  {
    title: "End of month 3",
    description:
      "Given an unseen easy problem, you pick an approach within a couple of minutes rather than staring at it.",
  },
  {
    title: "End of month 6",
    description:
      "You solve most mediums in under 40 minutes and can narrate your reasoning while coding.",
  },
];

const faqs = [
  {
    q: "Can I learn DSA in a month?",
    a: "You can cover the syllabus in a month. You will not retain much of it. A month of intense study is roughly equivalent to the first foundations block, and it fades quickly without revisiting.",
  },
  {
    q: "Do I need to finish DSA before applying for jobs?",
    a: "No. Most screening rounds sit in the easy-to-medium band. Six months of consistent work usually clears that bar, and the rest keeps improving while you interview.",
  },
  {
    q: "Which language should I use?",
    a: "Whichever you already write fluently. Fighting unfamiliar syntax while learning an unfamiliar algorithm doubles the difficulty for no benefit.",
  },
  {
    q: "How many problems is enough?",
    a: "Coverage matters more than count. Roughly 150–200 problems spread across every major pattern, each revisited once, beats 500 clustered in whatever the site recommended.",
  },
];

const BlogContent = () => (
  <ArticleShell
    category="DSA"
    title="Time Required to Learn and Master DSA"
    deck="Honest timelines for going from your first array problem to genuine fluency — and what actually decides which end of the range you land on."
    date="June 20, 2025"
    readTime="10 min read"
    image="/blog/timeRequired.png"
    imageAlt="A learning timeline for data structures and algorithms"
    imageCaption="Consistency moves this timeline far more than raw talent does."
    url="https://www.dsavisualizer.in/blogs/Content/timeRequired"
    hashtags="#DSA #Programming #LearnToCode"
  >
    <P>
      If you&apos;re a student, a working developer, or switching careers,
      you&apos;ve probably asked some version of the same question: how long
      will this take? It gets answered badly almost everywhere — either
      &quot;three months!&quot; from someone selling a course, or &quot;it
      depends&quot; from someone who doesn&apos;t want to commit.
    </P>
    <P>
      It does depend, but not on anything mysterious. The variables are known,
      and once you plug yours in the range narrows considerably.
    </P>

    <Callout title="The short answer">
      Around <strong>250–300 focused hours</strong> gets most people to
      interview-ready. At ten hours a week that is roughly six months. True
      fluency — unseen hard problems, trade-offs in design discussions — takes a
      year or more of continued practice.
    </Callout>

    <H2 id="finish-line">First, define the finish line</H2>
    <P>
      &quot;Mastering DSA&quot; is uselessly vague as a goal, and vague goals are
      why people feel like they are never finished. Mastery isn&apos;t knowing
      syntax or having solved a particular number of problems. It looks like
      this:
    </P>
    <CheckList items={masterySignals} />
    <P>
      Notice that none of those are &quot;solved 500 problems&quot;. Problem
      count is a proxy that stops correlating with skill fairly early.
    </P>

    <H2 id="factors">What actually moves your timeline</H2>
    <P>
      Four things account for most of the variation between two people studying
      the same material:
    </P>
    <Timeline items={factors} />

    <H2 id="timelines">Realistic timelines</H2>
    <P>
      Assuming steady, deliberate practice rather than cramming, this is the
      shape the journey usually takes:
    </P>
    <Timeline items={timelines} />
    <P>
      Those bands assume roughly ten hours a week. Because the total is closer
      to fixed than the duration is, your pace sets the calendar:
    </P>
    <DataTable
      columns={["Pace", "Interview-ready", "Typically"]}
      rows={hoursTable.map((row) => [row.pace, row.ready, row.note])}
    />
    <P>
      The trap in the bottom row is burnout. Twenty hours a week is only faster
      if you sustain it for all four months, and most people don&apos;t.
    </P>

    <H2 id="roadmap">A 12-week roadmap</H2>
    <P>
      This covers the foundations block at eight to ten hours a week. Each
      section leans on the one before it, so resist skipping ahead to dynamic
      programming before recursion feels comfortable.
    </P>
    <Timeline items={roadmap} />

    <H2 id="method">How to spend the hours</H2>
    <P>
      The gap between finishing in six months and still grinding at two years is
      almost always method, not ability. Four habits do most of the compressing:
    </P>
    <Timeline items={method} />

    <H2 id="traps">What slows people down</H2>
    <P>Predictably, and in roughly this order of damage:</P>
    <BulletList items={traps} />

    <H2 id="checkpoints">Checkpoints: are you on track?</H2>
    <P>
      Rather than measuring by problems solved, check whether you can do these:
    </P>
    <Timeline items={checkpoints} />
    <Callout>
      If a checkpoint slips by a month, that is normal and not a signal to
      restart. If it slips by three, the method is usually the problem — revisit
      the habits above before adding more hours.
    </Callout>

    <H2 id="faq">Common questions</H2>
    <FAQ items={faqs} />

    <H2 id="verdict">The verdict</H2>
    <P>
      Three months to be dangerous, six to nine to be interview-ready, a year or
      more to be genuinely fluent. Those numbers barely move with talent and
      move enormously with consistency.
    </P>
    <P>
      So pick a pace you can actually hold for six months rather than the one
      that looks impressive for two weeks. The timeline mostly takes care of
      itself after that.
    </P>
  </ArticleShell>
);

export default BlogContent;
