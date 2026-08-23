"use client";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// A three-level recursion tree for T(n) = a*T(n/b) + f(n). Seeing that every
// level costs the same amount is what makes the n log n result obvious.
const RecursionTree = () => {
  const W = 360;
  const H = 210;
  const nodeR = 16;

  const levels = [
    { y: 30, xs: [180], label: "n" },
    { y: 100, xs: [110, 250], label: "n/2" },
    { y: 170, xs: [70, 150, 210, 290], label: "n/4" },
  ];

  return (
    <figure className="not-prose my-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full"
        style={{ maxWidth: `${W}px` }}
        role="img"
        aria-label="Recursion tree for T(n) = 2T(n/2) + n, showing each level costing n"
      >
        {/* Edges */}
        {levels.slice(0, -1).map((level, li) =>
          level.xs.map((x, xi) => {
            const children = levels[li + 1].xs.slice(xi * 2, xi * 2 + 2);
            return children.map((cx) => (
              <line
                key={`edge-${li}-${xi}-${cx}`}
                x1={x}
                y1={level.y + nodeR}
                x2={cx}
                y2={levels[li + 1].y - nodeR}
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
              <circle
                cx={x}
                cy={level.y}
                r={nodeR}
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
                fontSize="10"
                fontWeight="600"
              >
                {level.label}
              </text>
            </g>
          ))
        )}

        {/* Per-level cost */}
        {levels.map((level, li) => (
          <text
            key={`cost-${li}`}
            x={W - 6}
            y={level.y + 4}
            textAnchor="end"
            fill="#ef4444"
            fontSize="10"
            fontWeight="700"
          >
            = n
          </text>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        T(n) = 2T(n/2) + n. Each level doubles the number of subproblems and halves
        their size, so every level costs n. With log₂n levels, the total is n log n.
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
                    ? "px-4 py-3 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap"
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

  const parts = [
    {
      points: "a — how many subproblems each call creates.",
      subpoints: [
        "Merge sort makes two recursive calls, so a = 2. It must be a constant ≥ 1; it does not have to equal b.",
      ],
    },
    {
      points: "b — the factor by which the input shrinks.",
      subpoints: [
        "Halving the array means b = 2. It must be a constant greater than 1, otherwise the recursion never reaches the base case.",
      ],
    },
    {
      points: "f(n) — everything the call does outside the recursion.",
      subpoints: [
        "The splitting, the merging, the partitioning, the combining. For merge sort this is the O(n) merge.",
      ],
    },
  ];

  const levelRows = [
    ["0", "1", "n", "f(n)"],
    ["1", "a", "n/b", "a · f(n/b)"],
    ["2", "a²", "n/b²", "a² · f(n/b²)"],
    ["i", "aⁱ", "n/bⁱ", "aⁱ · f(n/bⁱ)"],
    ["log_b n (leaves)", "a^(log_b n) = n^(log_b a)", "1", "Θ(n^(log_b a))"],
  ];

  const caseRows = [
    [
      "Case 1",
      "f(n) = O(n^(log_b a − ε))",
      "The leaves dominate",
      "T(n) = Θ(n^(log_b a))",
    ],
    [
      "Case 2",
      "f(n) = Θ(n^(log_b a))",
      "Every level costs the same",
      "T(n) = Θ(n^(log_b a) · log n)",
    ],
    [
      "Case 3",
      "f(n) = Ω(n^(log_b a + ε)) and regularity holds",
      "The root dominates",
      "T(n) = Θ(f(n))",
    ],
  ];

  const exampleRows = [
    ["T(n) = 2T(n/2) + n", "2", "2", "n¹", "Case 2", "Θ(n log n)", "Merge sort"],
    ["T(n) = T(n/2) + 1", "1", "2", "n⁰ = 1", "Case 2", "Θ(log n)", "Binary search"],
    ["T(n) = 4T(n/2) + n", "4", "2", "n²", "Case 1", "Θ(n²)", "—"],
    ["T(n) = 9T(n/3) + n", "9", "3", "n²", "Case 1", "Θ(n²)", "—"],
    ["T(n) = 7T(n/2) + n²", "7", "2", "n^2.807", "Case 1", "Θ(n^log₂7)", "Strassen"],
    ["T(n) = 2T(n/2) + n²", "2", "2", "n¹", "Case 3", "Θ(n²)", "—"],
    ["T(n) = 3T(n/4) + n log n", "3", "4", "n^0.793", "Case 3", "Θ(n log n)", "—"],
    ["T(n) = 8T(n/2) + n³", "8", "2", "n³", "Case 2", "Θ(n³ log n)", "—"],
  ];

  const failRows = [
    [
      "T(n) = 2T(n/2) + n/log n",
      "f is smaller than n but not polynomially smaller",
      "Falls in the gap below Case 2. (The true answer, Θ(n log log n), needs a recursion tree.)",
    ],
    [
      "T(n) = 2ⁿT(n/2) + n",
      "a is not a constant",
      "The theorem assumes a fixed number of subproblems.",
    ],
    [
      "T(n) = 0.5T(n/2) + n",
      "a < 1",
      "You cannot have half a subproblem.",
    ],
    [
      "T(n) = T(n − 1) + n",
      "The input shrinks by subtraction, not division",
      "This is a decrease-and-conquer recurrence; use the substitution method instead.",
    ],
    [
      "T(n) = T(n/3) + T(2n/3) + n",
      "The subproblems have different sizes",
      "The theorem needs every subproblem to be the same size. Use a recursion tree.",
    ],
    [
      "T(n) = T(n/2) + n(2 − cos n)",
      "The regularity condition fails",
      "f grows fast enough for Case 3, but it oscillates, so a·f(n/b) ≤ c·f(n) does not hold.",
    ],
  ];

  const recipe = [
    {
      points: "Put the recurrence in standard form and read off a, b and f(n).",
      subpoints: ["T(n) = aT(n/b) + f(n), with a ≥ 1 and b > 1 both constant."],
    },
    {
      points: "Compute the watershed function n^(log_b a).",
      subpoints: [
        "This is the total cost of the leaves. Use log_b a = log a / log b if the exponent is not obvious.",
      ],
    },
    {
      points: "Compare f(n) with n^(log_b a).",
      subpoints: [
        "Polynomially smaller → Case 1. The same → Case 2. Polynomially larger → Case 3.",
      ],
    },
    {
      points: "For Case 3 only, verify the regularity condition.",
      subpoints: ["a · f(n/b) ≤ c · f(n) for some constant c < 1 and all large n."],
    },
    {
      points: "Write the answer that the matching case gives you.",
      subpoints: [
        "Case 1 → Θ(n^(log_b a)); Case 2 → Θ(n^(log_b a) log n); Case 3 → Θ(f(n)).",
      ],
    },
  ];

  const mistakes = [
    {
      points: "Forgetting that the difference must be polynomial.",
      subpoints: [
        "Case 1 needs f to be smaller by a factor of n^ε for some ε > 0. Being smaller by a factor of log n is not enough, and that recurrence falls into the gap where the theorem says nothing.",
      ],
    },
    {
      points: "Skipping the regularity condition in Case 3.",
      subpoints: [
        "It holds for every polynomial f, which is why it is easy to forget — but it is part of the case, and there are standard exercises built on functions where it fails.",
      ],
    },
    {
      points: "Applying it to subtract-and-conquer recurrences.",
      subpoints: [
        "T(n) = T(n − 1) + n is not of the form aT(n/b) + f(n). The Master Theorem cannot touch it.",
      ],
    },
    {
      points: "Mixing up a and b.",
      subpoints: [
        "a is how many calls you make; b is how much smaller each one is. In T(n) = 4T(n/2) + n they are different numbers, and swapping them changes the answer from Θ(n²) to Θ(n log n).",
      ],
    },
    {
      points: "Worrying about floors and ceilings.",
      subpoints: [
        "T(⌊n/2⌋) and T(⌈n/2⌉) give the same asymptotic answer as T(n/2). You can safely ignore them.",
      ],
    },
    {
      points: "Assuming the theorem covers every divide-and-conquer algorithm.",
      subpoints: [
        "Quick sort's worst case is T(n) = T(n − 1) + n, and its average case involves unequal splits. Neither is a Master Theorem problem.",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is the Master Theorem used for?",
      a: "It gives the asymptotic running time of a divide-and-conquer algorithm directly from its recurrence, without expanding a recursion tree or guessing and proving a bound. If a recurrence has the form T(n) = aT(n/b) + f(n) with constant a ≥ 1 and b > 1, you compare f(n) against n^(log_b a) and read the answer off one of three cases.",
    },
    {
      q: "What do a, b and f(n) mean?",
      a: "a is the number of subproblems each call creates, b is the factor by which the input size shrinks in each subproblem, and f(n) is the work done outside the recursive calls — the dividing and combining. For merge sort, a = 2, b = 2 and f(n) = n, because it makes two half-size calls and merges in linear time.",
    },
    {
      q: "Why does merge sort come out as Θ(n log n)?",
      a: "For merge sort, n^(log_b a) = n^(log₂2) = n, and f(n) = n as well. Since they match, Case 2 applies and the answer is Θ(n log n). Intuitively, each level of the recursion tree costs a total of n, and there are log₂n levels.",
    },
    {
      q: "When does the Master Theorem not apply?",
      a: "When a or b is not constant, when a < 1 or b ≤ 1, when the subproblems have different sizes, when the input shrinks by subtraction rather than division, when f(n) differs from n^(log_b a) by less than a polynomial factor, or when the Case 3 regularity condition fails. In all of those situations use a recursion tree or the substitution method.",
    },
    {
      q: "What is the regularity condition and why does it exist?",
      a: "It requires that a·f(n/b) ≤ c·f(n) for some constant c < 1 and all sufficiently large n. It says the work at each level really does shrink geometrically as you go down the tree, which is what lets the root's cost dominate the total. It holds automatically for polynomial f, so it usually needs no more than a line to check.",
    },
    {
      q: "What is the difference between the Master Theorem and the recursion tree method?",
      a: "The Master Theorem is a shortcut — three cases, no work, but it only fits recurrences of one exact shape. The recursion tree method is a general technique that works on any recurrence, including unequal splits and subtractive ones, at the cost of doing the summation yourself. The Master Theorem is really just the recursion tree argument, solved once in general.",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <Section title="What Problem Does the Master Theorem Solve?">
          <P>
            A divide-and-conquer algorithm describes its own cost in terms of
            itself. Merge sort sorts an array by sorting two half-arrays and
            merging the results, so its running time obeys T(n) = 2T(n/2) + n.
            That equation is called a <b>recurrence relation</b>, and it is not an
            answer — you cannot look at it and say how fast merge sort is.
          </P>
          <P>
            Solving the recurrence means turning it into a closed form like
            Θ(n log n). There are three standard ways to do that: expand it into a
            recursion tree and sum the levels, guess an answer and prove it by
            induction (the substitution method), or — when the recurrence has the
            right shape — apply the <b>Master Theorem</b> and simply read the
            answer off. This page is about the third.
          </P>
          <Callout>
            The Master Theorem is a lookup table, not a technique. Its entire value
            is that somebody already did the recursion tree summation in general,
            so you can skip straight to the result.
          </Callout>
        </Section>

        <Section title="The Standard Form">
          <P>
            The theorem applies to recurrences that can be written in exactly this
            shape:
          </P>
          <Formula>T(n) = a·T(n/b) + f(n), where a ≥ 1 and b &gt; 1 are constants</Formula>
          <List items={parts} />
          <P>
            If your recurrence does not fit this template — different-sized
            subproblems, a subtractive step, a non-constant a — the Master Theorem
            does not apply, and no amount of rearranging will change that. The
            section on limitations below covers what to do instead.
          </P>
        </Section>

        <Section title="Reading a, b and f(n) Off the Code">
          <P>
            In practice you extract the recurrence from the function body. Every
            recursive call contributes to a and b; everything else contributes to
            f(n):
          </P>
          <CodeSample caption="Two calls on half the input, plus a linear merge: T(n) = 2T(n/2) + n.">{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;              // base case: O(1)

  const mid  = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid));   // a = 2 calls
  const right = mergeSort(arr.slice(mid));      // b = 2 (half the size)

  return merge(left, right);                    // f(n) = O(n)
}`}</CodeSample>
          <CodeSample caption="One call on half the input, constant work outside: T(n) = T(n/2) + 1.">{`function binarySearch(arr, target, low, high) {
  if (low > high) return -1;                    // base case: O(1)

  const mid = Math.floor((low + high) / 2);     // f(n) = O(1)
  if (arr[mid] === target) return mid;

  return arr[mid] < target                      // a = 1 call
    ? binarySearch(arr, target, mid + 1, high)  // b = 2 (half the range)
    : binarySearch(arr, target, low, mid - 1);
}`}</CodeSample>
        </Section>

        <Section title="Where the Three Cases Come From">
          <P>
            Picture the recursion as a tree. The root is the original problem, each
            node has a children, and sizes shrink by a factor of b as you descend:
          </P>
          <RecursionTree />
          <Table
            headers={["Level", "Subproblems", "Size of each", "Cost of the level"]}
            rows={levelRows}
          />
          <P>
            The recursion stops when the size reaches 1, which takes log_b n
            levels, and the bottom level holds n^(log_b a) leaves. So the total
            cost is a contest between two quantities: the work at the leaves,
            which is Θ(n^(log_b a)), and the work at the root, which is f(n).
          </P>
          <P>
            <b>That contest has exactly three outcomes</b>, and those outcomes are
            the three cases. Either the leaves win, or the root wins, or neither
            does and every level contributes equally.
          </P>

          <InContentAd />
        </Section>

        <Section title="The Three Cases">
          <Table
            headers={["Case", "Condition on f(n)", "What it means", "Result"]}
            rows={caseRows}
            firstColMono={false}
          />
          <P>
            The function n^(log_b a) that f is compared against is sometimes called
            the <b>watershed function</b>. Computing it is always the first step,
            because all three conditions are stated relative to it.
          </P>
          <P>
            The ε in Cases 1 and 3 matters more than it looks. It requires f to be{" "}
            <i>polynomially</i> smaller or larger — smaller or larger by a factor
            of n^ε for some ε &gt; 0. Being smaller by a factor of log n does not
            qualify, and that is precisely the gap where the theorem gives no
            answer at all.
          </P>
          <P>
            Case 2 also has a commonly used extended form: if
            f(n) = Θ(n^(log_b a) · log^k n) for some k ≥ 0, then
            T(n) = Θ(n^(log_b a) · log^(k+1) n). This is what handles
            T(n) = 2T(n/2) + n log n, giving Θ(n log² n).
          </P>
        </Section>

        <Section title="Worked Example — Case 2 (Merge Sort)">
          <P>Solve T(n) = 2T(n/2) + n.</P>
          <List
            ordered
            items={[
              { points: "Identify the parts.", subpoints: ["a = 2, b = 2, f(n) = n."] },
              {
                points: "Compute the watershed function.",
                subpoints: ["n^(log_b a) = n^(log₂2) = n¹ = n."],
              },
              {
                points: "Compare.",
                subpoints: ["f(n) = n and the watershed is n. They are the same, so Case 2 applies."],
              },
              {
                points: "Apply Case 2.",
                subpoints: ["T(n) = Θ(n^(log_b a) · log n) = Θ(n log n)."],
              },
            ]}
          />
          <P>
            This matches the recursion tree above: every level costs n, and there
            are log₂n levels.
          </P>
        </Section>

        <Section title="Worked Example — Case 1 (Leaves Dominate)">
          <P>Solve T(n) = 4T(n/2) + n.</P>
          <List
            ordered
            items={[
              { points: "Identify the parts.", subpoints: ["a = 4, b = 2, f(n) = n."] },
              {
                points: "Compute the watershed function.",
                subpoints: ["n^(log₂4) = n² — four subproblems of half the size produce n² leaves."],
              },
              {
                points: "Compare.",
                subpoints: [
                  "f(n) = n is polynomially smaller than n²: n = O(n^(2−ε)) with ε = 1. Case 1 applies.",
                ],
              },
              { points: "Apply Case 1.", subpoints: ["T(n) = Θ(n^(log_b a)) = Θ(n²)."] },
            ]}
          />
          <P>
            The linear work at the root is irrelevant here — the tree branches so
            fast that almost all the cost sits in the leaves.
          </P>
        </Section>

        <Section title="Worked Example — Case 3 (Root Dominates)">
          <P>Solve T(n) = 2T(n/2) + n².</P>
          <List
            ordered
            items={[
              { points: "Identify the parts.", subpoints: ["a = 2, b = 2, f(n) = n²."] },
              { points: "Compute the watershed function.", subpoints: ["n^(log₂2) = n."] },
              {
                points: "Compare.",
                subpoints: [
                  "f(n) = n² is polynomially larger than n: n² = Ω(n^(1+ε)) with ε = 1. Case 3 is a candidate.",
                ],
              },
              {
                points: "Check the regularity condition.",
                subpoints: [
                  "a·f(n/b) = 2·(n/2)² = n²/2 ≤ c·n² holds with c = 1/2 < 1, so the condition is satisfied.",
                ],
              },
              { points: "Apply Case 3.", subpoints: ["T(n) = Θ(f(n)) = Θ(n²)."] },
            ]}
          />
          <P>
            Here the quadratic work at the top level swamps everything below it, so
            the recursion contributes nothing asymptotically.
          </P>
        </Section>

        <Section title="A Reference Table of Common Recurrences">
          <Table
            headers={["Recurrence", "a", "b", "n^(log_b a)", "Case", "Solution", "Algorithm"]}
            rows={exampleRows}
          />
          <P>
            Strassen&apos;s matrix multiplication is the most interesting row. It
            replaces eight recursive multiplications with seven, dropping a from 8
            to 7 — and since the answer is Θ(n^(log₂a)), that single change takes
            the running time from Θ(n³) to roughly Θ(n^2.807). It is a direct,
            practical demonstration that a is the parameter worth fighting over.
          </P>
        </Section>

        <Section title="A Recipe You Can Follow Every Time">
          <List items={recipe} ordered />
        </Section>

        <Section title="When the Master Theorem Does Not Apply">
          <P>
            The theorem is narrow by design, and recognising when it does not fit
            is as important as applying it when it does:
          </P>
          <Table
            headers={["Recurrence", "Why it fails", "What to do instead"]}
            rows={failRows}
          />
          <P>
            The first row is the classic gap case. Here f(n) = n/log n is smaller
            than the watershed n, but only by a logarithmic factor, not a
            polynomial one — so Case 1 does not apply, and it is not equal to n
            either, so Case 2 does not apply. The theorem is simply silent, and you
            need a recursion tree to find the real answer.
          </P>
        </Section>

        <Section title="Common Mistakes">
          <List items={mistakes} />
        </Section>

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
              { points: "The Master Theorem solves T(n) = aT(n/b) + f(n) for constant a ≥ 1 and b > 1." },
              { points: "Everything hinges on comparing f(n) with the watershed function n^(log_b a)." },
              { points: "Case 1: leaves dominate → Θ(n^(log_b a)). Case 2: levels tie → Θ(n^(log_b a) log n). Case 3: root dominates → Θ(f(n))." },
              { points: "The difference in Cases 1 and 3 must be polynomial; a log factor is not enough, and that gap is where the theorem stays silent." },
              { points: "Case 3 is not finished until you have checked the regularity condition a·f(n/b) ≤ c·f(n)." },
              { points: "Unequal splits, subtractive recurrences and non-constant a all fall outside the theorem — reach for a recursion tree instead." },
            ]}
          />
        </Section>
      </article>
      <NewsletterEmbed mobile theme={theme} />
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;
