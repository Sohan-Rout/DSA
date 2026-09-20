"use client";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import BackendEngineerCard from "@/app/components/ui/BackendEngineerCard";
import InContentAd from "@/app/components/ads/InContentAd";
import MobileEmbedCarousel from "@/app/components/ui/MobileEmbedCarousel";

// The three steps drawn as one picture: a problem splitting into subproblems,
// those being solved, and the answers flowing back up. Seeing the shape once
// makes every later recurrence easier to read.
const DivideConquerDiagram = () => {
  const W = 380;
  const H = 240;

  const levels = [
    { y: 28, xs: [190], label: "n" },
    { y: 110, xs: [110, 270], label: "n/2" },
    { y: 192, xs: [65, 155, 225, 315], label: "n/4" },
  ];

  return (
    <figure className="not-prose my-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full"
        style={{ maxWidth: `${W}px` }}
        role="img"
        aria-label="A problem of size n splitting into two subproblems of size n/2, then four of size n/4, with results combining back up the tree"
      >
        {/* Edges */}
        {levels.slice(0, -1).map((level, li) =>
          level.xs.map((x, xi) => {
            const children = levels[li + 1].xs.slice(xi * 2, xi * 2 + 2);
            return children.map((cx) => (
              <line
                key={`edge-${li}-${xi}-${cx}`}
                x1={x}
                y1={level.y + 14}
                x2={cx}
                y2={levels[li + 1].y - 14}
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
            ));
          })
        )}

        {/* Nodes */}
        {levels.map((level, li) =>
          level.xs.map((x) => (
            <g key={`node-${li}-${x}`}>
              <rect
                x={x - 22}
                y={level.y - 14}
                width="44"
                height="28"
                rx="6"
                fill="#3b82f6"
                opacity="0.18"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text
                x={x}
                y={level.y + 4}
                textAnchor="middle"
                className="fill-gray-800 dark:fill-gray-100"
                fontSize="11"
                fontWeight="600"
              >
                {level.label}
              </text>
            </g>
          ))
        )}

        {/* Step labels down the left edge */}
        <text x="6" y="32" fontSize="9" fontWeight="600" className="fill-gray-500 dark:fill-gray-400">
          divide
        </text>
        {/* sits below the leaf row rather than beside it, so it cannot
            collide with the leftmost node */}
        <text x="6" y="228" fontSize="9" fontWeight="600" className="fill-gray-500 dark:fill-gray-400">
          conquer
        </text>

        {/* Combine arrow travelling back up */}
        <line
          x1={W - 14}
          y1={196}
          x2={W - 14}
          y2={40}
          stroke="#10b981"
          strokeWidth="2"
          markerEnd="url(#dc-arrow)"
        />
        <text
          x={W - 20}
          y={120}
          fontSize="9"
          fontWeight="600"
          textAnchor="middle"
          transform={`rotate(-90 ${W - 20} 120)`}
          className="fill-emerald-600 dark:fill-emerald-400"
        >
          combine
        </text>
        <defs>
          <marker
            id="dc-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        Divide until the problem is trivial, conquer the small pieces, then
        combine the answers on the way back up.
      </figcaption>
    </figure>
  );
};

const Section = ({ title, children }) => (
  <section className="p-6 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
      <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full shrink-0"></span>
      {title}
    </h2>
    <div className="prose dark:prose-invert max-w-none">{children}</div>
  </section>
);

const P = ({ children }) => (
  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 last:mb-0">{children}</p>
);

const Formula = ({ children }) => (
  <div className="not-prose my-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 px-4 py-3">
    <code className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
      {children}
    </code>
  </div>
);

const CodeSample = ({ children, caption }) => (
  <div className="not-prose my-4">
    <pre className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 px-4 py-3 text-sm leading-relaxed">
      <code className="font-mono text-gray-800 dark:text-gray-200">{children}</code>
    </pre>
    {caption && <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{caption}</p>}
  </div>
);

const Table = ({ headers, rows, firstColMono = true }) => (
  <div className="not-prose my-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
    <table className="w-full text-sm text-left border-collapse">
      <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-700 dark:text-gray-300">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-3 font-semibold whitespace-nowrap">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-t border-gray-200 dark:border-gray-700">
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={
                  cellIndex === 0 && firstColMono
                    ? "px-4 py-3 font-mono text-gray-800 dark:text-gray-200 whitespace-nowrap"
                    : "px-4 py-3 text-gray-700 dark:text-gray-300"
                }
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const List = ({ items, ordered = false }) => {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`space-y-4 ${
        ordered ? "list-decimal" : "list-disc"
      } pl-5 marker:text-gray-500 dark:marker:text-gray-400`}
    >
      {items.map((item, index) => (
        <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
          {item.points}
          {item.subpoints && (
            <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
              {item.subpoints.map((subitem, subindex) => (
                <li key={subindex} className="text-gray-600 dark:text-gray-400">
                  {subitem}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </Tag>
  );
};

const Callout = ({ children }) => (
  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">{children}</p>
  </div>
);

const Content = () => {
  const { theme } = useTheme();

  const threeSteps = [
    {
      points: "Divide: break the problem into smaller instances of the same problem.",
      subpoints: [
        "The subproblems must be the same kind of problem, just smaller. Sorting half an array is still sorting; that is what makes the recursion legal.",
      ],
    },
    {
      points: "Conquer: solve the subproblems recursively.",
      subpoints: [
        "Once a piece is small enough to answer outright (one element, an empty range), you stop recursing and return directly. That is the base case.",
      ],
    },
    {
      points: "Combine: build the answer to the original from the subproblem answers.",
      subpoints: [
        "This is where the real work usually lives. Merge sort's merge step is the combine; binary search's combine is free, because it throws one half away.",
      ],
    },
  ];

  const classicRows = [
    ["Binary Search", "T(n) = T(n/2) + O(1)", "Θ(log n)", "Discards half the search range each step"],
    ["Merge Sort", "T(n) = 2T(n/2) + O(n)", "Θ(n log n)", "Sorts two halves, then merges"],
    ["Quick Sort (average)", "T(n) = 2T(n/2) + O(n)", "Θ(n log n)", "Partitions, then sorts both sides"],
    ["Maximum Subarray", "T(n) = 2T(n/2) + O(n)", "Θ(n log n)", "Best in left, right, or crossing the middle"],
    ["Karatsuba Multiplication", "T(n) = 3T(n/2) + O(n)", "Θ(n^1.585)", "Three half-size products instead of four"],
    ["Strassen's Matrix Multiply", "T(n) = 7T(n/2) + O(n²)", "Θ(n^2.807)", "Seven half-size products instead of eight"],
    ["Closest Pair of Points", "T(n) = 2T(n/2) + O(n)", "Θ(n log n)", "Closest in each half, then across the strip"],
  ];

  const paradigmRows = [
    [
      "Divide and Conquer",
      "Independent subproblems",
      "Splits, recurses, combines",
      "Merge sort, binary search",
    ],
    [
      "Dynamic Programming",
      "Overlapping subproblems",
      "Solves each subproblem once and stores it",
      "Fibonacci, edit distance",
    ],
    [
      "Greedy",
      "Locally optimal choice is globally safe",
      "Commits to one choice and never revisits",
      "Dijkstra, Huffman coding",
    ],
    [
      "Decrease and Conquer",
      "One subproblem, not several",
      "Shrinks the input by a constant or factor",
      "Insertion sort, Euclid's GCD",
    ],
  ];

  const whenRows = [
    [
      "The problem splits cleanly",
      "The pieces are the same problem on less data, and they do not depend on each other.",
    ],
    [
      "Combining is cheaper than solving",
      "If merging two answers costs O(n) but brute force costs O(n²), the recursion pays for itself.",
    ],
    [
      "The subproblems are independent",
      "If they overlap and get recomputed, you want dynamic programming instead.",
    ],
    [
      "The data supports splitting",
      "Random access makes halving an array free. Splitting a linked list in half costs a traversal.",
    ],
  ];

  const mistakes = [
    {
      points: "Forgetting the base case, or getting its boundary wrong.",
      subpoints: [
        "Every recursive branch must eventually reach a case that returns without recursing. A base case of n == 1 in a function that can be called with an empty range will recurse forever.",
      ],
    },
    {
      points: "Assuming the split is always free.",
      subpoints: [
        "Slicing an array to pass halves around copies them, which quietly turns an O(1) divide step into O(n). Passing low and high indices instead keeps it free.",
      ],
    },
    {
      points: "Using divide and conquer on overlapping subproblems.",
      subpoints: [
        "Computing Fibonacci by recursing on n-1 and n-2 re-solves the same values exponentially many times. Overlap is the signal to switch to dynamic programming.",
      ],
    },
    {
      points: "Expecting recursion alone to make something faster.",
      subpoints: [
        "The speedup comes from discarding work or from combining cheaply, not from recursing. T(n) = 2T(n/2) + O(n²) is still Θ(n²); splitting it gained nothing.",
      ],
    },
    {
      points: "Ignoring the cost of the call stack.",
      subpoints: [
        "A depth of log n is harmless, but an unbalanced split can reach depth n and overflow the stack. This is why quick sort recurses into the smaller side first.",
      ],
    },
  ];

  const recipe = [
    {
      points: "Identify the base case first.",
      subpoints: ["The smallest input you can answer without recursing, usually n = 0 or n = 1."],
    },
    {
      points: "Decide how to divide.",
      subpoints: ["How many pieces (a), and how much smaller each one is (b)."],
    },
    {
      points: "Recurse on the pieces.",
      subpoints: ["Trust the recursion to return correct answers for smaller inputs."],
    },
    {
      points: "Write the combine step.",
      subpoints: ["Turn the subproblem answers into the answer for the whole input."],
    },
    {
      points: "Write down the recurrence and solve it.",
      subpoints: [
        "T(n) = a·T(n/b) + f(n), where f(n) is the divide plus combine cost. Then apply the Master Theorem.",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is divide and conquer in simple terms?",
      a: "It is a problem-solving strategy with three steps: break a problem into smaller versions of the same problem, solve those recursively, and combine their answers into the answer for the original. Merge sort is the standard example: sort the left half, sort the right half, then merge the two sorted halves.",
    },
    {
      q: "What are the three steps of divide and conquer?",
      a: "Divide, conquer and combine. Divide splits the input into smaller instances of the same problem. Conquer solves those instances recursively, stopping at a base case small enough to answer directly. Combine merges the subproblem answers into the final result.",
    },
    {
      q: "How is divide and conquer different from dynamic programming?",
      a: "Both break a problem into subproblems, but divide and conquer assumes the subproblems are independent, so each is solved once and never seen again. Dynamic programming is for overlapping subproblems, where the same subproblem appears many times, so the answers are stored and reused instead of recomputed.",
    },
    {
      q: "Why is divide and conquer often faster?",
      a: "Because the work drops off quickly as you descend. If each level either discards part of the input (binary search) or does only linear work while the sizes halve (merge sort), the total is O(log n) or O(n log n) rather than O(n) or O(n²). The gain comes from the shape of the recursion, not from recursion itself.",
    },
    {
      q: "How do you find the time complexity of a divide-and-conquer algorithm?",
      a: "Write its recurrence in the form T(n) = aT(n/b) + f(n), where a is the number of recursive calls, b is the factor the input shrinks by, and f(n) is the work outside the calls. Then solve it with the Master Theorem, a recursion tree, or the substitution method.",
    },
    {
      q: "Is binary search a divide-and-conquer algorithm?",
      a: "Yes. It divides the sorted range in half, conquers by recursing into the half that could contain the target, and needs no combine step because the other half is discarded. Its recurrence is T(n) = T(n/2) + O(1), which solves to Θ(log n).",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <BackendEngineerCard theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} bordered={false} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <Section title="What Is Divide and Conquer?">
          <P>
            Divide and conquer is a strategy for designing algorithms, not an
            algorithm itself. The idea is that a problem you cannot answer
            directly often becomes easy once it is small enough, so instead of
            attacking the whole input at once, you break it into smaller copies
            of the same problem, solve those, and assemble the results.
          </P>
          <P>
            Merge sort is the standard illustration. To sort an array, sort its
            left half, sort its right half, then merge the two sorted halves into
            one. Notice that the instructions for sorting a half are the same
            instructions you started with. That self-similarity is what makes the
            recursion work.
          </P>
          <Callout>
            A technique counts as divide and conquer only when the subproblems are
            the <b>same problem on smaller input</b> and are <b>independent</b> of
            one another. If the pieces overlap and get re-solved, you are looking
            at dynamic programming instead.
          </Callout>
        </Section>

        <Section title="The Three Steps">
          <P>
            Every divide-and-conquer algorithm is built from the same three moves:
          </P>
          <List items={threeSteps} ordered />
          <DivideConquerDiagram />
          <P>
            The amount of work each algorithm does varies enormously between the
            divide step and the combine step, and that balance is what decides
            its running time. Binary search does almost nothing in either, but
            throws away half the input. Merge sort divides for free and pays for
            the merge. Quick sort pays during the divide and combines for free.
          </P>
        </Section>

        <Section title="The General Template">
          <P>
            Nearly every divide-and-conquer function has this skeleton. If you
            can fill in the four marked pieces, you have designed the algorithm:
          </P>
          <CodeSample caption="The base case is written first on purpose: without it, the recursion never terminates.">{`function solve(problem) {
  if (isSmallEnough(problem)) {      // 1. base case
    return solveDirectly(problem);
  }

  const pieces = divide(problem);     // 2. divide

  const answers = pieces.map(solve);  // 3. conquer (recurse)

  return combine(answers);            // 4. combine
}`}</CodeSample>
          <P>
            The recursion is easiest to reason about if you trust it: assume the
            recursive calls return correct answers for smaller inputs, and only
            verify that your combine step is right. Trying to trace every level
            of the call stack in your head is how divide and conquer starts to
            feel harder than it is.
          </P>
        </Section>

        <Section title="Where the Running Time Comes From">
          <P>
            Because the function calls itself, its cost is defined in terms of
            itself. That is a <b>recurrence relation</b>, and almost every
            divide-and-conquer algorithm produces one of the same shape:
          </P>
          <Formula>T(n) = a·T(n/b) + f(n)</Formula>
          <List
            items={[
              {
                points: "a — how many subproblems each call creates.",
                subpoints: ["Merge sort makes two recursive calls, so a = 2."],
              },
              {
                points: "b — the factor by which the input shrinks.",
                subpoints: ["Halving the array means b = 2."],
              },
              {
                points: "f(n) — the work done outside the recursive calls.",
                subpoints: ["The dividing plus the combining. For merge sort, the O(n) merge."],
              },
            ]}
          />
          <P>
            Reading a, b and f(n) off the code is mechanical, and once you have
            them the <b>Master Theorem</b> turns the recurrence straight into a
            complexity class. That is why the two topics are almost always taught
            together.
          </P>

          <InContentAd />
        </Section>

        <Section title="Classic Divide-and-Conquer Algorithms">
          <P>
            The same shape, with different values of a, b and f(n), produces very
            different running times:
          </P>
          <Table
            headers={["Algorithm", "Recurrence", "Complexity", "What the split does"]}
            rows={classicRows}
            firstColMono={false}
          />
          <P>
            Karatsuba and Strassen are worth a second look. Both beat the obvious
            algorithm purely by reducing <i>a</i>: doing three half-size
            multiplications instead of four, or seven instead of eight. Nothing
            else changes, and the exponent drops.
          </P>
        </Section>

        <Section title="A Worked Example: Maximum Subarray">
          <P>
            Given an array of positive and negative numbers, find the contiguous
            slice with the largest sum. Checking every slice costs O(n²). Divide
            and conquer does better by noticing that the best slice must be in
            exactly one of three places:
          </P>
          <List
            ordered
            items={[
              { points: "Entirely inside the left half — solve recursively." },
              { points: "Entirely inside the right half — solve recursively." },
              {
                points: "Crossing the midpoint.",
                subpoints: [
                  "This case cannot be recursive, but it is easy: extend left from the middle taking the best running sum, extend right the same way, and add the two. That is a single O(n) scan.",
                ],
              },
            ]}
          />
          <P>Take the largest of the three and you have the answer:</P>
          <Formula>T(n) = 2T(n/2) + O(n) → Θ(n log n)</Formula>
          <P>
            Two recursive calls on half the input, plus a linear crossing scan.
            The result improves on the O(n²) brute force, and the reasoning is
            the same reasoning merge sort uses.
          </P>
        </Section>

        <Section title="When Divide and Conquer Is the Right Tool">
          <Table
            headers={["Condition", "Why it matters"]}
            rows={whenRows}
            firstColMono={false}
          />
          <P>
            When these do not hold, the strategy stops paying. A problem whose
            subproblems overlap belongs to dynamic programming. A problem where
            combining costs as much as solving gains nothing from the split.
          </P>
        </Section>

        <Section title="How It Compares to Other Paradigms">
          <Table
            headers={["Paradigm", "Subproblems", "How it proceeds", "Examples"]}
            rows={paradigmRows}
            firstColMono={false}
          />
          <P>
            Decrease and conquer is the one most often confused with divide and
            conquer. It also shrinks the input, but produces a{" "}
            <b>single</b> subproblem rather than several. By that strict
            definition binary search is decrease and conquer, though almost every
            textbook still presents it as the introductory divide-and-conquer
            example, because the divide step and the analysis are identical.
          </P>
        </Section>

        <Section title="Advantages and Trade-offs">
          <List
            items={[
              {
                points: "It often lowers the complexity class outright.",
                subpoints: ["O(n²) sorting becomes O(n log n); O(n) searching becomes O(log n)."],
              },
              {
                points: "It parallelises naturally.",
                subpoints: [
                  "Independent subproblems can run on separate cores with no coordination, which is exactly what makes merge sort a good parallel sort.",
                ],
              },
              {
                points: "It uses the memory hierarchy well.",
                subpoints: [
                  "Subproblems eventually shrink enough to fit in cache, so the deeper levels run faster than their operation count suggests.",
                ],
              },
              {
                points: "But recursion costs stack space.",
                subpoints: [
                  "Depth is usually O(log n), which is fine, but an unbalanced split can reach O(n) and overflow.",
                ],
              },
              {
                points: "And the constant factors can bite.",
                subpoints: [
                  "For small inputs the call overhead outweighs the better complexity, which is why real sort implementations switch to insertion sort below roughly 16 elements.",
                ],
              },
            ]}
          />
        </Section>

        <Section title="A Recipe You Can Follow Every Time">
          <List items={recipe} ordered />
        </Section>

        <Section title="Common Mistakes">
          <List items={mistakes} />
        </Section>

        {/* Newsletter: inline, after the substantive sections and before the
            end matter. NewsletterEmbed renders null below 768px (desktop-only
            for mobile performance), so the wrapper hides at the same
            breakpoint, otherwise this leaves an empty padded box on phones. */}
        <section className="hidden border-b border-gray-100 p-6 md:block dark:border-gray-700">
          <NewsletterEmbed mobile={false} theme={theme} bordered={false} />
        </section>

        <Section title="Frequently Asked Questions">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">{faq.a}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Key Takeaways">
          <List
            items={[
              { points: "Divide and conquer is a design strategy: divide into smaller copies of the same problem, conquer them recursively, combine the answers." },
              { points: "It requires subproblems that are independent. Overlapping subproblems are dynamic programming's territory." },
              { points: "Every base case must be reachable, and it should be written before the recursive branch." },
              { points: "The cost always takes the form T(n) = aT(n/b) + f(n), where f(n) is the divide plus combine work." },
              { points: "Solve that recurrence with the Master Theorem to get the complexity." },
              { points: "The speedup comes from discarding work or combining cheaply — never from recursion on its own." },
            ]}
          />
        </Section>
      </article>
      <MobileEmbedCarousel theme={theme} />
    </main>
  );
};

export default Content;
