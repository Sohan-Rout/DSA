"use client";
import { faqs } from "./faqs";
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

// The questions worth answering before writing any code
const understanding = [
  "What is the problem actually asking?",
  "What is the brute-force approach?",
  "Why is that approach inefficient?",
  "What observation leads to the optimised solution?",
  "Which data structure or algorithm fits the problem?",
  "What is the time complexity?",
  "What changes if the constraints are different?",
];

// Signal in the problem statement → technique it usually points at
const patternRows = [
  ["A contiguous portion of an array", "Sliding window"],
  ["Repeatedly needing the smallest or largest item", "Heap"],
  ["Relationships between objects", "Graphs"],
  ["Repeated choices over overlapping subproblems", "Dynamic programming"],
  ["Looking up whether something was seen before", "Hash map"],
];

const optimisationQuestions = [
  "Can this O(n²) solution become O(n)?",
  "Is this extra data structure actually needed?",
  "Can memory be traded for speed?",
  "Is there a pattern being missed?",
];

const loop = [
  {
    title: "Try the problem first",
    description:
      "Don't open the solution immediately. Give yourself real time to think about it.",
  },
  {
    title: "Name what you're stuck on",
    description:
      "Is it the data structure, the algorithm, the optimisation, or just understanding what the question wants?",
  },
  {
    title: "Read an explanation, not just the code",
    description:
      "The goal is the reasoning behind the approach, not a snippet that passes the test cases.",
  },
  {
    title: "Close it and implement it yourself",
    description:
      "This step is the one that does the work. Typing it from memory is very different from reading it.",
  },
  {
    title: "Come back to it later",
    description:
      "If you can solve the same problem days later without help, you have actually learned something.",
  },
];

const BlogContent = () => (
  <ArticleShell
    category="DSA"
    title="LeetCode Is Harder Than It Looks"
    deck="The hard part was never writing the code. It's knowing how to approach a problem you have never seen before."
    date="Sep 18, 2026"
    readTime="7 min read"
    image="/blog/leetcodeIsHard.webp"
    imageAlt="A LeetCode-style problem with a blank editor beside it"
    imageCaption="You understand the question. The editor is still empty. That gap is the real difficulty."
    url="https://www.dsavisualizer.in/blogs/Content/leetcodeIsHard"
    hashtags="#DSA #LeetCode #CodingInterview"
  >
    <P>
      Most people starting out with LeetCode assume the hardest part will be
      writing the code. It usually isn&apos;t. The harder part is working out
      how to approach the problem in the first place.
    </P>
    <P>
      You can understand arrays, hash maps, binary search, dynamic programming,
      graphs and every other topic on its own. But when a completely new problem
      appears, knowing which of those to reach for is surprisingly difficult.
      Anyone who has spent real time on LeetCode knows the feeling: you read the
      problem, you understand what it&apos;s asking, you look at the examples,
      and then nothing. No idea how to start.
    </P>
    <P>
      That gap is one of the most frustrating parts of learning DSA, and it
      doesn&apos;t get discussed nearly enough. Concepts make sense when
      they&apos;re explained one at a time. Applying them to an unfamiliar
      problem is a separate skill entirely.
    </P>

    <Callout title="The real difficulty">
      Knowing DSA and solving DSA problems are two different things. The first
      is learning what the tools are. The second is recognising which tool a
      problem needs.
    </Callout>

    <H2 id="knowing-vs-solving">Knowing DSA and solving problems are not the same</H2>
    <P>
      You can know what a hash map is. You can know what a stack is. You can
      understand binary search and the basics of dynamic programming. But when
      someone hands you a new problem and says &ldquo;solve this,&rdquo; none of
      that knowledge tells you which piece of it applies. That is where the real
      difficulty begins.
    </P>
    <P>
      Take a problem involving an array. The instinct is to reach for loops and
      brute force. But the intended solution might use a sliding window, or a
      hash map might make the whole thing collapse into something simple.
      Sometimes the difference between being stuck for thirty minutes and
      finishing in five is just recognising the underlying pattern, and that
      recognition takes practice to build.
    </P>

    <H2 id="not-the-code">The problem usually isn&apos;t the code</H2>
    <P>
      When a problem won&apos;t crack, the temptation is to go straight to the
      solution. Almost everyone does this. But there is a real difference
      between looking at a solution and understanding it. You can paste in some
      code, submit it, see the green &ldquo;Accepted,&rdquo; and move on. Meet a
      slightly different version of that problem tomorrow and you are back at
      the start.
    </P>
    <P>The part that actually transfers is being able to answer these:</P>
    <CheckList items={understanding} />
    <P>
      Once problems get approached this way, LeetCode stops being about
      memorising solutions and starts being about recognising patterns.
    </P>

    <H2 id="patterns">Patterns make a huge difference</H2>
    <P>
      Hundreds of different-looking problems reduce to a relatively small number
      of common techniques. That realisation changes how the whole exercise
      feels. You start noticing signals in the problem statement itself:
    </P>
    <DataTable
      columns={["What the problem mentions", "What it often points to"]}
      rows={patternRows}
    />
    <P>
      None of these are rules, and plenty of problems break them. But the more
      problems you solve, the more these connections start forming on their own.
      Getting there requires seeing the same ideas explained from several
      different angles, not just once.
    </P>

    <H2 id="multiple-approaches">Seeing several approaches to one problem</H2>
    <P>
      One of the more useful things in DSA practice is watching the same problem
      get solved more than one way. You start with brute force. Then you notice
      a hash map removes the inner loop. Then perhaps a particular pattern makes
      it faster still. Laid next to each other, that progression is far easier
      to follow than a single finished answer, and it is where an intuition for
      complexity actually comes from.
    </P>
    <P>You start asking yourself:</P>
    <BulletList items={optimisationQuestions} />
    <P>
      Those questions are worth much more in an interview than remembering the
      answer to one specific problem.
    </P>

    <H2 id="feedback-loop">A feedback loop that works</H2>
    <P>
      Practice improves a lot when it follows a deliberate loop rather than
      bouncing between random solutions on the internet:
    </P>
    <Timeline items={loop} />
    <P>
      The benefit isn&apos;t solving a problem instantly. It is having somewhere
      sensible to go when you are completely stuck, so that being stuck turns
      into progress instead of a dead end.
    </P>

    <H2 id="where-to-practice">Where to go when you don&apos;t know how to start</H2>
    <P>
      At some point most people realise they don&apos;t want another list of
      LeetCode questions. They want to understand the reasoning behind the
      questions, so that a stuck moment leads to a thought process rather than
      to a block of final code.
    </P>
    <P>
      That means practising somewhere the explanation matters as much as the
      answer. The DSA section of{" "}
      <a
        href="https://scaleengineer.com"
        target="_blank"
        rel="noopener"
        className="font-medium text-blue-600 dark:text-blue-400 underline underline-offset-4 decoration-blue-600/30 hover:decoration-blue-600"
      >
        Scale Engineer
      </a>{" "}
      is built along those lines: LeetCode-style problems organised by
      difficulty, pattern, data structure and algorithm, with multiple
      approaches to the same problem, complexity analysis and walkthroughs
      alongside them. The useful shift is going from &ldquo;here is the
      solution, memorise it&rdquo; to &ldquo;why does this approach work, and
      why is it better than the obvious one?&rdquo; That distinction matters a
      great deal when you are preparing for interviews.
    </P>
    <P>
      However you practise, the pattern to aim for is the same: try it yourself,
      read the reasoning when you are stuck, then come back and implement it
      without looking. Over time you start recognising similar problems, which
      is the actual goal. Nobody wants to memorise five hundred solutions. You
      want to reach the point where a new problem makes you think,
      &ldquo;I&apos;ve seen something like this before.&rdquo;
    </P>

    <H2 id="faq">Common questions</H2>
    <FAQ items={faqs} />

    <H2 id="what-it-should-feel-like">What good DSA preparation feels like</H2>
    <P>
      Not memorising hundreds of answers. Not solving problems to move a counter
      up. Just gradually getting better at looking at a problem, breaking it
      down, recognising the pattern, and working out where to start.
    </P>
    <P>
      Because once you know how to start, solving the problem is the easy part.
    </P>
  </ArticleShell>
);

export default BlogContent;
