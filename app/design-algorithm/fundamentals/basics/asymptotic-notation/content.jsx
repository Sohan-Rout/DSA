"use client";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// Plots f(n) against a scaled bound c*g(n) so the reader can see what "for all
// n >= n0" actually means: the bound only has to hold to the right of n0.
const BoundDiagram = ({ curves, n0, nMax = 12, caption, keyPrefix }) => {
  const W = 340;
  const H = 190;
  const PAD_L = 34;
  const PAD_R = 12;
  const PAD_T = 14;
  const PAD_B = 30;

  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;

  const samples = 60;
  const yMax = Math.max(
    ...curves.flatMap((curve) =>
      Array.from({ length: samples + 1 }, (_, i) => curve.fn((i / samples) * nMax))
    )
  );

  const toX = (n) => PAD_L + (n / nMax) * plotW;
  const toY = (y) => PAD_T + plotH - (y / yMax) * plotH;

  const points = (fn) =>
    Array.from({ length: samples + 1 }, (_, i) => {
      const n = (i / samples) * nMax;
      return `${toX(n).toFixed(1)},${toY(fn(n)).toFixed(1)}`;
    }).join(" ");

  return (
    <figure className="not-prose my-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full"
        style={{ maxWidth: `${W}px` }}
        role="img"
        aria-label={caption}
      >
        {/* Region where the bound is guaranteed to hold */}
        <rect
          x={toX(n0)}
          y={PAD_T}
          width={W - PAD_R - toX(n0)}
          height={plotH}
          fill="#3b82f6"
          opacity="0.07"
        />

        {/* Axes */}
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + plotH} stroke="#94a3b8" strokeWidth="1" />
        <line
          x1={PAD_L}
          y1={PAD_T + plotH}
          x2={W - PAD_R}
          y2={PAD_T + plotH}
          stroke="#94a3b8"
          strokeWidth="1"
        />

        {/* n0 marker */}
        <line
          x1={toX(n0)}
          y1={PAD_T}
          x2={toX(n0)}
          y2={PAD_T + plotH}
          stroke="#64748b"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <text
          x={toX(n0)}
          y={PAD_T + plotH + 14}
          textAnchor="middle"
          fill="#64748b"
          fontSize="10"
          fontWeight="700"
        >
          n₀
        </text>

        {curves.map((curve) => (
          <polyline
            key={`${keyPrefix}-${curve.label}`}
            points={points(curve.fn)}
            fill="none"
            stroke={curve.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={curve.dashed ? "5 4" : undefined}
          />
        ))}

        <text x={PAD_L - 6} y={PAD_T + 8} textAnchor="end" fill="#64748b" fontSize="9">
          cost
        </text>
        <text
          x={W - PAD_R}
          y={PAD_T + plotH + 22}
          textAnchor="end"
          fill="#64748b"
          fontSize="9"
        >
          input size (n)
        </text>
      </svg>

      <figcaption className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
        {curves.map((curve) => (
          <span key={`${keyPrefix}-key-${curve.label}`} className="flex items-center gap-1.5">
            <span
              className="inline-block w-4 h-0.5 rounded-full"
              style={{ backgroundColor: curve.color }}
            ></span>
            {curve.label}
          </span>
        ))}
      </figcaption>
      {caption && (
        <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">{caption}</p>
      )}
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

  const whyPoints = [
    {
      points: "Hardware and language differences cancel out.",
      subpoints: [
        "The same algorithm in C and in Python differs by a constant factor, and that factor disappears in asymptotic notation.",
      ],
    },
    {
      points: "It answers the question that actually matters: what happens as the input grows?",
      subpoints: [
        "An O(n log n) sort beats an O(n²) sort on large inputs no matter whose laptop runs it.",
      ],
    },
    {
      points: "It gives a common vocabulary.",
      subpoints: ['Saying "this is O(n)" is precise, while "this is fast" is not.'],
    },
    {
      points: "It lets you reject a design before you build it.",
      subpoints: [
        "If a problem has a million inputs and your idea is quadratic, you know it is wrong on paper — no prototype required.",
      ],
    },
  ];

  const simplify = [
    { points: "Start with the exact operation count.", detail: "T(n) = 3n² + 5n + 7" },
    {
      points: "Drop the lower-order terms — they grow slower and become irrelevant.",
      detail: "T(n) ≈ 3n²",
    },
    {
      points: "Drop the constant factor — it does not change the shape of the curve.",
      detail: "T(n) = Θ(n²)",
    },
  ];

  const dominanceRows = [
    ["n = 10", "300", "50", "7", "357", "84%"],
    ["n = 100", "30,000", "500", "7", "30,507", "98.3%"],
    ["n = 1,000", "3,000,000", "5,000", "7", "3,005,007", "99.8%"],
    ["n = 10,000", "300,000,000", "50,000", "7", "300,050,007", "99.98%"],
  ];

  const glanceRows = [
    ["O(g)", "Grows no faster than g", "≤", "Upper bound", "n² + n = O(n²)"],
    ["Ω(g)", "Grows at least as fast as g", "≥", "Lower bound", "n² + n = Ω(n²)"],
    ["Θ(g)", "Grows exactly like g", "=", "Tight bound", "n² + n = Θ(n²)"],
    ["o(g)", "Grows strictly slower than g", "<", "Strict upper bound", "n = o(n²)"],
    ["ω(g)", "Grows strictly faster than g", ">", "Strict lower bound", "n² = ω(n)"],
  ];

  const properties = [
    {
      points: "Transitivity — it holds for all five notations.",
      subpoints: ["If f = O(g) and g = O(h), then f = O(h)."],
    },
    {
      points: "Reflexivity — for O, Ω and Θ only.",
      subpoints: [
        "f = O(f), f = Ω(f) and f = Θ(f) are always true. The strict forms are not reflexive: f is never o(f).",
      ],
    },
    {
      points: "Symmetry — Θ only.",
      subpoints: ["If f = Θ(g), then g = Θ(f). O and Ω are not symmetric."],
    },
    {
      points: "Transpose symmetry — O and Ω are mirrors.",
      subpoints: [
        "f = O(g) if and only if g = Ω(f). The same relationship links o and ω.",
      ],
    },
    {
      points: "The sum rule — the larger term absorbs the smaller.",
      subpoints: [
        "O(f) + O(g) = O(max(f, g)). This is why sequential blocks of code collapse to whichever is slowest.",
      ],
    },
    {
      points: "The product rule — nested work multiplies.",
      subpoints: [
        "O(f) × O(g) = O(f × g). This is why an O(log n) loop inside an O(n) loop is O(n log n).",
      ],
    },
  ];

  const limitRows = [
    ["0", "f grows strictly slower", "f = o(g), and therefore also f = O(g)"],
    ["a positive constant c", "They grow at the same rate", "f = Θ(g)"],
    ["∞", "f grows strictly faster", "f = ω(g), and therefore also f = Ω(g)"],
  ];

  const growth = [
    { name: "O(1)", label: "Constant", example: "Array index access, hash lookup", at1000: "1" },
    { name: "O(log n)", label: "Logarithmic", example: "Binary search, balanced tree lookup", at1000: "≈ 10" },
    { name: "O(√n)", label: "Root", example: "Trial-division primality test", at1000: "≈ 32" },
    { name: "O(n)", label: "Linear", example: "Linear search, single pass", at1000: "1,000" },
    { name: "O(n log n)", label: "Linearithmic", example: "Merge sort, heap sort", at1000: "≈ 10,000" },
    { name: "O(n²)", label: "Quadratic", example: "Bubble sort, all-pairs comparison", at1000: "1,000,000" },
    { name: "O(n³)", label: "Cubic", example: "Naive matrix multiplication", at1000: "10⁹" },
    { name: "O(2ⁿ)", label: "Exponential", example: "Subset enumeration", at1000: "astronomical" },
    { name: "O(n!)", label: "Factorial", example: "Brute-force travelling salesman", at1000: "astronomical" },
  ];

  const rules = [
    {
      points: "Constant factors are dropped.",
      subpoints: ["O(3n) is written O(n); O(n/2) is also O(n)."],
    },
    {
      points: "Only the dominant term survives.",
      subpoints: ["O(n² + n log n + 100) collapses to O(n²)."],
    },
    {
      points: "Sequential blocks add, so the larger one wins.",
      subpoints: ["A loop of O(n) followed by a loop of O(n²) is O(n²)."],
    },
    {
      points: "Nested loops multiply.",
      subpoints: ["An O(n) loop inside another O(n) loop is O(n²)."],
    },
    {
      points: "The base of a logarithm does not matter.",
      subpoints: [
        "log₂n and log₁₀n differ by a constant factor, so both are written O(log n).",
      ],
    },
    {
      points: "Different input sizes stay separate.",
      subpoints: [
        "A loop over n nested in a loop over m is O(n · m) — collapsing it to O(n²) is only correct if n and m are the same quantity.",
      ],
    },
  ];

  const usage = [
    {
      points: "Big-O is the default in engineering and interviews.",
      subpoints: [
        'When someone asks "what is the complexity of your solution?", they expect a Big-O answer, and they expect it to be the tightest one you can justify.',
      ],
    },
    {
      points: "Big-Ω is how you talk about problems, not algorithms.",
      subpoints: [
        "\"Comparison sorting is Ω(n log n)\" is a statement about every possible algorithm, and it is what makes merge sort provably optimal.",
      ],
    },
    {
      points: "Big-Θ is what textbooks use when the bound is exact.",
      subpoints: [
        "Θ is the honest choice for algorithms whose cost does not depend on the input arrangement, like heap sort or a full array traversal.",
      ],
    },
    {
      points: "Little-o and little-ω appear mostly in proofs.",
      subpoints: [
        "They are useful when you need to argue that one term becomes negligible compared to another, which is common when solving recurrences.",
      ],
    },
  ];

  const mistakes = [
    {
      points: 'Treating Big-O as "the worst case".',
      subpoints: [
        "Notation and case are independent. You can state a Big-O bound on the best case, and a Big-Ω bound on the worst case.",
      ],
    },
    {
      points: "Writing O(2n) or O(n + 5).",
      subpoints: ["Both are just O(n) — the point of the notation is to discard that detail."],
    },
    {
      points: "Using O where Θ is meant.",
      subpoints: [
        "Every O(n) algorithm is also O(n²), because O is only an upper bound. Θ is the claim that the bound is tight.",
      ],
    },
    {
      points: "Reading the equals sign as equality.",
      subpoints: [
        'f(n) = O(g(n)) really means "f belongs to the set O(g)". That is why you can write n = O(n²) but never O(n²) = n — the relation only runs one way.',
      ],
    },
    {
      points: "Forgetting that constants matter for small n.",
      subpoints: [
        "An O(n log n) algorithm with a huge constant can lose to an O(n²) one on tiny inputs — which is why real sort implementations switch to insertion sort for short subarrays.",
      ],
    },
    {
      points: "Assuming a smaller notation always means a faster program.",
      subpoints: [
        "Asymptotics compare growth, not speed at your actual input size. They tell you which algorithm wins eventually, not which wins today.",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is the difference between Big-O and Big-Θ?",
      a: "Big-O is only a ceiling: it says the algorithm grows no faster than the given function, so an O(n) algorithm is technically also O(n²). Big-Θ is a two-sided claim — the function is both an upper and a lower bound — so it pins the growth rate exactly. Θ is the stronger statement, and you can only make it when the best and worst cases share the same growth.",
    },
    {
      q: "Why do we ignore constants and lower-order terms?",
      a: "Because they stop mattering as n grows. In 3n² + 5n + 7, the quadratic term accounts for 84% of the total at n = 10 and over 99.9% at n = 10,000. The constant 3 depends on your language and hardware anyway, so keeping it would make the answer machine-specific — exactly what asymptotic notation exists to avoid.",
    },
    {
      q: "Is Big-O the same thing as the worst case?",
      a: "No, though they are quoted together so often that they get confused. Big-O describes a kind of bound; best, average and worst describe which input you are analysing. You can state a Big-O bound on the best case, and it is perfectly valid to say that linear search is O(1) in the best case and O(n) in the worst.",
    },
    {
      q: "Does the base of the logarithm matter in O(log n)?",
      a: "No. Changing base multiplies by a constant — log₂n = log₁₀n / log₁₀2 — and constants are dropped, so log₂n, log₁₀n and ln n are all written O(log n). This is why binary search and a search that splits into ten parts have the same complexity even though one is measurably faster.",
    },
    {
      q: "Can an algorithm be both O(n) and O(n²)?",
      a: "Yes, and this is the most common source of confusion. Big-O is an upper bound, and n really does grow no faster than n², so the statement is true — just uselessly loose. By convention you always quote the tightest upper bound you can prove, which is why nobody writes O(n²) for a single loop.",
    },
    {
      q: "How do I find the asymptotic notation of a piece of code?",
      a: "Count how many times the innermost, most-repeated statement runs as a function of the input size, multiplying for nested loops and adding for sequential ones. Then drop every constant factor and every term except the fastest-growing one. What remains is the notation.",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <Section title="What is Asymptotic Notation?">
          <P>
            Asymptotic notation is a language for describing how the cost of an
            algorithm grows as its input gets larger. Instead of measuring an
            algorithm in seconds — which depends on the machine, the compiler and
            the mood of your operating system — we count the operations it
            performs as a function of the input size <b>n</b>, and then keep only
            the part of that function that matters when n becomes large.
          </P>
          <P>
            &quot;Asymptotic&quot; means &quot;as n approaches infinity&quot;. A
            function that costs 3n² + 5n + 7 operations and one that costs n²
            operations are treated as the same shape, because for large n they
            both curve upward like a parabola. That shape is what the notation
            captures, and it is the single most useful thing to know about an
            algorithm before you commit to writing it.
          </P>
        </Section>

        <Section title="Why Do We Need It?">
          <List items={whyPoints} />
          <Callout>
            Asymptotic notation is deliberately imprecise. Throwing away
            constants is not a limitation of the technique — it is the entire
            point, because it is what makes a complexity claim true on every
            machine rather than on yours.
          </Callout>
        </Section>

        <Section title="From an Operation Count to a Notation">
          <P>
            Every asymptotic bound starts life as an exact count and then gets
            simplified twice:
          </P>
          <ol className="space-y-4 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
            {simplify.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                {item.points}
                <div className="mt-2 not-prose">
                  <code className="inline-block font-mono text-sm bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded">
                    {item.detail}
                  </code>
                </div>
              </li>
            ))}
          </ol>
          <P>
            Both simplifications are safe for the same reason: for large enough n,
            the n² term dwarfs everything else, and multiplying by 3 does not
            change which curve is on top.
          </P>
        </Section>

        <Section title="Watching the Dominant Term Take Over">
          <P>
            The claim that lower-order terms &quot;stop mattering&quot; is easy to
            assert and easy to verify. Here is T(n) = 3n² + 5n + 7 broken into its
            three parts:
          </P>
          <Table
            headers={["n", "3n²", "5n", "7", "Total", "Share from 3n²"]}
            rows={dominanceRows}
            firstColMono={false}
          />
          <P>
            At n = 10 the smaller terms still contribute a sixth of the total. By
            n = 10,000 they contribute less than a fiftieth of one percent. Since
            asymptotic analysis is about the behaviour as n keeps growing, keeping
            those terms would add precision that is already noise — and would make
            the answer depend on details no two machines agree on.
          </P>
        </Section>

        <Section title="Big-O — the Upper Bound">
          <P>
            Big-O says an algorithm grows <i>no faster than</i> some function. It
            is the ceiling.
          </P>
          <Formula>
            f(n) = O(g(n)) ⟺ ∃ c &gt; 0, n₀ &gt; 0 such that 0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀
          </Formula>
          <P>
            Read it as: you are allowed to scale g(n) by any constant c you like,
            and you are allowed to ignore all small inputs before some cutoff n₀.
            If after that point your scaled g(n) stays above f(n) forever, then f
            is O(g).
          </P>
          <BoundDiagram
            keyPrefix="bigo"
            n0={5.5}
            curves={[
              { label: "c·g(n)", fn: (n) => n * n, color: "#ef4444", dashed: true },
              { label: "f(n)", fn: (n) => 0.5 * n * n + 3 * n + 5, color: "#3b82f6" },
            ]}
            caption="Past n₀ the red ceiling stays above f(n) — that is all Big-O requires."
          />
          <P>
            Because it is only a ceiling, an O(n) algorithm is technically also
            O(n²) and O(2ⁿ). Those statements are true but useless, so by
            convention we quote the tightest upper bound we can prove.
          </P>
        </Section>

        <Section title="Proving a Big-O Bound by Hand">
          <P>
            The definition asks you to produce two numbers: a constant c and a
            cutoff n₀. Producing them is easier than it looks, because you are
            allowed to be generous. To show that 3n² + 5n + 7 = O(n²):
          </P>
          <List
            ordered
            items={[
              {
                points: "Rewrite every term so it is measured against n².",
                subpoints: [
                  "For n ≥ 1 we know n ≤ n² and 1 ≤ n², so 5n ≤ 5n² and 7 ≤ 7n².",
                ],
              },
              {
                points: "Add the inequalities together.",
                subpoints: ["3n² + 5n + 7 ≤ 3n² + 5n² + 7n² = 15n², for all n ≥ 1."],
              },
              {
                points: "Read off the witnesses.",
                subpoints: [
                  "c = 15 and n₀ = 1 satisfy the definition, so 3n² + 5n + 7 = O(n²) is proved.",
                ],
              },
            ]}
          />
          <P>
            Note how crude the bound is — 15n² is five times larger than the
            function it bounds. That is fine. The definition never asks for the
            smallest possible c, only for <i>some</i> c that works, which is
            exactly why constant factors carry no information in the final answer.
          </P>

          <InContentAd />
        </Section>

        <Section title="Big-Ω — the Lower Bound">
          <P>
            Big-Ω is the mirror image: the algorithm grows <i>at least as fast
            as</i> the given function. It is the floor.
          </P>
          <Formula>
            f(n) = Ω(g(n)) ⟺ ∃ c &gt; 0, n₀ &gt; 0 such that 0 ≤ c·g(n) ≤ f(n) for all n ≥ n₀
          </Formula>
          <BoundDiagram
            keyPrefix="omega"
            n0={3}
            curves={[
              { label: "f(n)", fn: (n) => 0.5 * n * n + 3 * n + 5, color: "#3b82f6" },
              { label: "c·g(n)", fn: (n) => 0.3 * n * n, color: "#10b981", dashed: true },
            ]}
            caption="Past n₀ the green floor stays below f(n)."
          />
          <P>
            Ω is how we express the hardness of a <i>problem</i> rather than an
            algorithm. &quot;Any comparison-based sort is Ω(n log n)&quot; means no
            such algorithm can ever do better, which is why merge sort at
            O(n log n) is considered optimal. A lower bound on a problem is a much
            stronger and much harder result than an upper bound on one algorithm:
            it is a statement about every algorithm that could ever be written.
          </P>
        </Section>

        <Section title="Big-Θ — the Tight Bound">
          <P>
            Θ is the strongest of the three: it holds when the same function is
            both an upper and a lower bound, so the growth rate is pinned exactly.
          </P>
          <Formula>
            f(n) = Θ(g(n)) ⟺ ∃ c₁, c₂ &gt; 0, n₀ &gt; 0 such that c₁·g(n) ≤ f(n) ≤ c₂·g(n) for all n ≥ n₀
          </Formula>
          <BoundDiagram
            keyPrefix="theta"
            n0={4}
            curves={[
              { label: "c₂·g(n)", fn: (n) => n * n, color: "#ef4444", dashed: true },
              { label: "f(n)", fn: (n) => 0.5 * n * n + 3 * n + 5, color: "#3b82f6" },
              { label: "c₁·g(n)", fn: (n) => 0.3 * n * n, color: "#10b981", dashed: true },
            ]}
            caption="f(n) is sandwiched between two scaled copies of the same g(n) — that is Θ."
          />
          <P>
            Equivalently: f(n) = Θ(g(n)) if and only if f(n) = O(g(n)) and
            f(n) = Ω(g(n)). Merge sort is Θ(n log n) because it never does better
            and never does worse. Quick sort is <i>not</i> Θ(n log n) — its worst
            case is Θ(n²), so only a per-case statement is honest.
          </P>
        </Section>

        <Section title="Little-o and Little-ω">
          <P>
            The lowercase forms are the strict versions. Big-O allows f and g to
            grow at the same rate; little-o does not.
          </P>
          <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
            <li className="text-gray-700 dark:text-gray-300 pl-2">
              <b>f(n) = o(g(n))</b> — f grows strictly slower than g. The bound
              must hold for <i>every</i> constant c, not just some c. Example:
              n = o(n²), but n is not o(n).
            </li>
            <li className="text-gray-700 dark:text-gray-300 pl-2">
              <b>f(n) = ω(g(n))</b> — f grows strictly faster than g. Example:
              n² = ω(n).
            </li>
          </ul>
          <P>
            The difference between O and o is the difference between &quot;there
            exists a c&quot; and &quot;for every c&quot;. Because n² = O(n²) but
            n² ≠ o(n²), the strict forms rule out the case where the two functions
            grow at the same rate.
          </P>
        </Section>

        <Section title="The Five Notations at a Glance">
          <Table
            headers={["Notation", "Meaning", "Analogy", "Role", "Example"]}
            rows={glanceRows}
          />
          <P>
            The middle column is a useful mnemonic but not a perfect one. Unlike
            numbers, two functions need not be comparable at all — you can
            construct oscillating functions where neither is O of the other — so
            treat the ≤ / ≥ / = analogy as intuition rather than as a theorem.
          </P>
        </Section>

        <Section title="Properties You Can Rely On">
          <P>
            These properties are what let you manipulate complexity expressions
            without going back to the definition each time:
          </P>
          <List items={properties} />
        </Section>

        <Section title="Comparing Growth Rates with Limits">
          <P>
            When two functions are hard to compare by eye — is n log n bigger than
            n^1.5? — the limit test settles it mechanically. Evaluate the ratio as
            n approaches infinity:
          </P>
          <Formula>lim (n → ∞) f(n) / g(n)</Formula>
          <Table
            headers={["The limit is", "Interpretation", "Conclusion"]}
            rows={limitRows}
            firstColMono={false}
          />
          <P>
            For the example above, n log n divided by n^1.5 is log n / n^0.5, which
            tends to 0, so n log n = o(n^1.5) — the linearithmic function is the
            smaller of the two. This test is also the quickest way to confirm the
            standard ordering: 1 &lt; log n &lt; √n &lt; n &lt; n log n &lt; n²
            &lt; n³ &lt; 2ⁿ &lt; n!.
          </P>
        </Section>

        <Section title="Common Growth Rates">
          <P>
            Ordered from best to worst. The last column is roughly how many
            operations you perform at n = 1,000.
          </P>
          <div className="not-prose overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 my-4">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 font-semibold">Notation</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Typical example</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">At n = 1,000</th>
                </tr>
              </thead>
              <tbody>
                {growth.map((row, index) => (
                  <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.label}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.example}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {row.at1000}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            The jump from O(n log n) to O(n²) is where most interview problems
            live, and the jump from O(n²) to O(2ⁿ) is where problems stop being
            solvable by brute force at any realistic size.
          </P>
        </Section>

        <Section title="Deriving the Notation from Code">
          <P>
            In practice you rarely write a proof. You read the loop structure and
            apply the sum and product rules:
          </P>
          <CodeSample caption="Sequential blocks add, so the quadratic block decides the answer.">{`function analyse(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {   // O(n)
    sum += arr[i];
  }

  for (let i = 0; i < arr.length; i++) {   // O(n) x O(n)
    for (let j = 0; j < arr.length; j++) { //   = O(n^2)
      if (arr[i] === arr[j]) sum++;
    }
  }

  return sum;                              // O(1)
}
// Total: O(n) + O(n^2) + O(1) = O(n^2)`}</CodeSample>
          <CodeSample caption="A doubling counter reaches n in log₂n steps, so the outer loop is logarithmic.">{`function analyseTwo(n) {
  let count = 0;
  for (let i = 1; i < n; i *= 2) {         // O(log n)
    for (let j = 0; j < n; j++) {          //   x O(n)
      count++;
    }
  }
  return count;                            // Total: O(n log n)
}`}</CodeSample>
        </Section>

        <Section title="Rules for Simplifying">
          <List items={rules} ordered />
        </Section>

        <Section title="Where Each Notation Is Used in Practice">
          <List items={usage} />
        </Section>

        <Section title="Common Mistakes">
          <List items={mistakes} />
          <Callout>
            Notation describes the <b>growth rate</b>; best/average/worst describes{" "}
            <b>which input</b> you are talking about. Pick one from each column and
            your statement will be unambiguous — for example, &quot;quick sort is
            Θ(n²) in the worst case and Θ(n log n) on average&quot;.
          </Callout>
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
              { points: "Asymptotic notation describes growth as n → ∞, not speed at any particular size." },
              { points: "O is an upper bound, Ω is a lower bound, Θ is both at once, and o and ω are their strict versions." },
              { points: "A bound only has to hold past some cutoff n₀, and you may scale g(n) by any constant — which is why constants never survive." },
              { points: "Always quote the tightest bound you can justify; a loose O is true but says nothing." },
              { points: "The equals sign in f = O(g) means set membership, so the relation only reads left to right." },
              { points: "The limit test decides any comparison you cannot make by eye." },
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
