"use client";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// Plots f(n) against a scaled bound c*g(n) so the reader can see what "for all
// n >= n0" actually means: the bound only has to hold to the right of n0.
const BoundDiagram = ({
  curves,
  n0,
  nMax = 12,
  caption,
  keyPrefix,
}) => {
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
        <line
          x1={PAD_L}
          y1={PAD_T}
          x2={PAD_L}
          y2={PAD_T + plotH}
          stroke="#94a3b8"
          strokeWidth="1"
        />
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

        <text
          x={PAD_L - 6}
          y={PAD_T + 8}
          textAnchor="end"
          fill="#64748b"
          fontSize="9"
        >
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
        <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
          {caption}
        </p>
      )}
    </figure>
  );
};

const Formula = ({ children }) => (
  <div className="not-prose my-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 px-4 py-3">
    <code className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
      {children}
    </code>
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
      subpoints: [
        'Saying "this is O(n)" is precise, while "this is fast" is not.',
      ],
    },
  ];

  const simplify = [
    { points: "Start with the exact operation count.", detail: "T(n) = 3n² + 5n + 7" },
    { points: "Drop the lower-order terms — they grow slower and become irrelevant.", detail: "T(n) ≈ 3n²" },
    { points: "Drop the constant factor — it does not change the shape of the curve.", detail: "T(n) = Θ(n²)" },
  ];

  const growth = [
    { name: "O(1)", label: "Constant", example: "Array index access", at1000: "1" },
    { name: "O(log n)", label: "Logarithmic", example: "Binary search", at1000: "≈ 10" },
    { name: "O(n)", label: "Linear", example: "Linear search", at1000: "1,000" },
    { name: "O(n log n)", label: "Linearithmic", example: "Merge sort", at1000: "≈ 10,000" },
    { name: "O(n²)", label: "Quadratic", example: "Bubble sort", at1000: "1,000,000" },
    { name: "O(2ⁿ)", label: "Exponential", example: "Naive subset generation", at1000: "astronomical" },
    { name: "O(n!)", label: "Factorial", example: "Brute-force TSP", at1000: "astronomical" },
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
      points: "Forgetting that constants matter for small n.",
      subpoints: [
        "An O(n log n) algorithm with a huge constant can lose to an O(n²) one on tiny inputs — which is why real sort implementations switch to insertion sort for short subarrays.",
      ],
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Asymptotic Notation */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Asymptotic Notation?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Asymptotic notation is a language for describing how the cost of an
              algorithm grows as its input gets larger. Instead of measuring an
              algorithm in seconds — which depends on the machine, the compiler
              and the mood of your operating system — we count the operations it
              performs as a function of the input size <b>n</b>, and then keep
              only the part of that function that matters when n becomes large.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              &quot;Asymptotic&quot; means &quot;as n approaches infinity&quot;.
              A function that costs 3n² + 5n + 7 operations and one that costs n²
              operations are treated as the same shape, because for large n they
              both curve upward like a parabola. That shape is what the notation
              captures.
            </p>
          </div>
        </section>

        {/* Why do we need it */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Why Do We Need It?
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-4 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {whyPoints.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                  <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                    {item.subpoints.map((subitem, subindex) => (
                      <li key={subindex} className="text-gray-600 dark:text-gray-400">
                        {subitem}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* From an operation count to a notation */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            From an Operation Count to a Notation
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Every asymptotic bound starts life as an exact count and then gets
              simplified twice:
            </p>
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
            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Both simplifications are safe for the same reason: for large enough
              n, the n² term dwarfs everything else, and multiplying by 3 does not
              change which curve is on top.
            </p>
          </div>
        </section>

        {/* Big O */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Big-O — the Upper Bound
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Big-O says an algorithm grows <i>no faster than</i> some function.
              It is the ceiling.
            </p>
            <Formula>
              f(n) = O(g(n)) ⟺ ∃ c &gt; 0, n₀ &gt; 0 such that 0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀
            </Formula>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Read it as: you are allowed to scale g(n) by any constant c you
              like, and you are allowed to ignore all small inputs before some
              cutoff n₀. If after that point your scaled g(n) stays above f(n)
              forever, then f is O(g).
            </p>
            <BoundDiagram
              keyPrefix="bigo"
              n0={5.5}
              curves={[
                { label: "c·g(n)", fn: (n) => n * n, color: "#ef4444", dashed: true },
                { label: "f(n)", fn: (n) => 0.5 * n * n + 3 * n + 5, color: "#3b82f6" },
              ]}
              caption="Past n₀ the red ceiling stays above f(n) — that is all Big-O requires."
            />
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Because it is only a ceiling, an O(n) algorithm is technically also
              O(n²) and O(2ⁿ). Those statements are true but useless, so by
              convention we quote the tightest upper bound we can prove.
            </p>
          </div>
        </section>

        {/* Big Omega */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Big-Ω — the Lower Bound
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Big-Ω is the mirror image: the algorithm grows <i>at least as fast
              as</i> the given function. It is the floor.
            </p>
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
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Ω is how we express the hardness of a <i>problem</i> rather than an
              algorithm. &quot;Any comparison-based sort is Ω(n log n)&quot; means
              no such algorithm can ever do better, which is why merge sort at
              O(n log n) is considered optimal.
            </p>
          </div>
        </section>

        {/* Big Theta */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Big-Θ — the Tight Bound
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Θ is the strongest of the three: it holds when the same function is
              both an upper and a lower bound, so the growth rate is pinned
              exactly.
            </p>
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
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Equivalently: f(n) = Θ(g(n)) if and only if f(n) = O(g(n)) and
              f(n) = Ω(g(n)). Merge sort is Θ(n log n) because it never does
              better and never does worse. Quick sort is <i>not</i> Θ(n log n) —
              its worst case is Θ(n²), so only a per-case statement is honest.
            </p>

            <InContentAd />
          </div>
        </section>

        {/* little o and little omega */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Little-o and Little-ω
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The lowercase forms are the strict versions. Big-O allows f and g to
              grow at the same rate; little-o does not.
            </p>
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
            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              A useful analogy: O is ≤, Ω is ≥, Θ is =, o is &lt;, and ω is &gt;.
              The analogy is not perfect — unlike numbers, two functions need not
              be comparable at all — but it captures the intent.
            </p>
          </div>
        </section>

        {/* Growth rates */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Common Growth Rates
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Ordered from best to worst. The last column is roughly how many
              operations you do at n = 1,000.
            </p>
            <div className="not-prose overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
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
                    <tr
                      key={index}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {row.label}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {row.example}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {row.at1000}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              The jump from O(n log n) to O(n²) is where most interview problems
              live, and the jump from O(n²) to O(2ⁿ) is where problems stop being
              solvable by brute force.
            </p>
          </div>
        </section>

        {/* Rules */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Rules for Simplifying
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-4 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {rules.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                  <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                    {item.subpoints.map((subitem, subindex) => (
                      <li key={subindex} className="text-gray-600 dark:text-gray-400">
                        {subitem}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Mistakes */}
        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Common Mistakes
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-4 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {mistakes.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                  <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                    {item.subpoints.map((subitem, subindex) => (
                      <li key={subindex} className="text-gray-600 dark:text-gray-400">
                        {subitem}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Notation describes the <b>growth rate</b>; best/average/worst
                describes <b>which input</b> you are talking about. Pick one from
                each column and your statement will be unambiguous — for example,
                &quot;quick sort is Θ(n²) in the worst case and Θ(n log n) on
                average&quot;.
              </p>
            </div>
          </div>
        </section>
      </article>
      <NewsletterEmbed mobile theme={theme} />
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;
