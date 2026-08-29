"use client";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// The method is a loop, not a straight line: a failed proof sends you back to
// strengthen the guess rather than to abandon it. The diagram makes that cycle
// explicit, because it is the part people get stuck on.
const MethodFlow = () => {
  const W = 360;
  const H = 230;

  const box = (x, y, w, h, label, sublabel, color) => (
    <g key={`${label}-${x}-${y}`}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="8"
        fill={color}
        opacity="0.12"
        stroke={color}
        strokeWidth="2"
      />
      <text
        x={x + w / 2}
        y={sublabel ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        className="fill-gray-800 dark:fill-gray-100"
        fontSize="11"
        fontWeight="700"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 11}
          textAnchor="middle"
          fill="#64748b"
          fontSize="9"
        >
          {sublabel}
        </text>
      )}
    </g>
  );

  return (
    <figure className="not-prose my-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full"
        style={{ maxWidth: `${W}px` }}
        role="img"
        aria-label="Flow of the substitution method: guess, prove by induction, and strengthen the guess if the proof fails"
      >
        <defs>
          <marker id="sub-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#94a3b8" />
          </marker>
        </defs>

        {box(100, 14, 160, 40, "1. Guess the bound", "from a recursion tree or a known form", "#3b82f6")}
        {box(100, 92, 160, 40, "2. Prove it by induction", "assume for smaller n, show for n", "#3b82f6")}
        {box(100, 172, 160, 40, "Done — bound proved", "with explicit c and n₀", "#10b981")}

        {/* Down arrows */}
        <line x1={180} y1={54} x2={180} y2={88} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#sub-arrow)" />
        <line x1={180} y1={132} x2={180} y2={168} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#sub-arrow)" />
        <text x={188} y={152} fill="#10b981" fontSize="9" fontWeight="700">
          algebra closes
        </text>

        {/* Feedback loop */}
        <path
          d="M100,112 L40,112 L40,34 L100,34"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#sub-arrow)"
        />
        <text x={36} y={78} textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="700">
          off by
        </text>
        <text x={36} y={89} textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="700">
          a term
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        When the algebra leaves you a term short, the guess needs strengthening —
        that dashed path is the method, not a failure of it.
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

// A multi-line derivation. Each step is its own line so the algebra can be
// followed without horizontal scrolling on a phone.
const Derivation = ({ steps, caption }) => (
  <div className="not-prose my-4">
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 px-4 py-3">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-3 py-0.5">
          <code className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
            {step.expr}
          </code>
          {step.note && (
            <span className="font-sans text-xs text-gray-500 dark:text-gray-400 self-center whitespace-nowrap">
              {step.note}
            </span>
          )}
        </div>
      ))}
    </div>
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

const Callout = ({ children, tone = "blue" }) => {
  const tones = {
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
  };
  return (
    <div className={`mt-6 p-4 rounded-lg border ${tones[tone]}`}>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">{children}</p>
    </div>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const whenToUse = [
    {
      points: "The subproblems are different sizes.",
      subpoints: [
        "T(n) = T(n/3) + T(2n/3) + n has no single b, so the Master Theorem cannot express it.",
      ],
    },
    {
      points: "The input shrinks by subtraction rather than division.",
      subpoints: [
        "T(n) = T(n − 1) + n is a decrease-and-conquer recurrence, outside the Master Theorem's form entirely.",
      ],
    },
    {
      points: "The recurrence falls in a Master Theorem gap.",
      subpoints: [
        "T(n) = 2T(n/2) + n/log n sits between Cases 1 and 2, where the theorem gives no answer.",
      ],
    },
    {
      points: "You already suspect the answer and want to confirm it.",
      subpoints: [
        "A recursion tree produces a fast guess but a loose argument; substitution turns that guess into a proof.",
      ],
    },
  ];

  const inductionParts = [
    {
      points: "The inductive hypothesis — the bound you are assuming.",
      subpoints: [
        "Assume the bound holds for every input smaller than n, for example T(k) ≤ ck log k for all k < n.",
      ],
    },
    {
      points: "The inductive step — the algebra.",
      subpoints: [
        "Substitute that assumption into the recurrence and show the same bound comes out for n. This is the step the method is named after.",
      ],
    },
    {
      points: "The base case — where the induction starts.",
      subpoints: [
        "Show the bound holds for one or more small values of n directly, choosing c large enough to make it true.",
      ],
    },
  ];

  const compareRows = [
    [
      "Master Theorem",
      "T(n) = aT(n/b) + f(n) only",
      "Almost none — three cases",
      "A tight Θ bound, instantly",
    ],
    [
      "Recursion tree",
      "Any recurrence",
      "Draw the tree, sum the levels",
      "A good guess, and usually the intuition",
    ],
    [
      "Substitution",
      "Any recurrence",
      "Guess first, then prove by induction",
      "A rigorous proof of a bound you already suspect",
    ],
  ];

  const guessing = [
    {
      points: "Draw a recursion tree first.",
      subpoints: [
        "Summing the levels loosely gives you the shape of the answer, which is exactly what substitution needs as input.",
      ],
    },
    {
      points: "Match it against a recurrence you already know.",
      subpoints: [
        "T(n) = 2T(n/2 + 17) + n looks unfamiliar, but the +17 stops mattering for large n, so the answer is the merge sort answer: O(n log n).",
      ],
    },
    {
      points: "Prove loose bounds first, then squeeze.",
      subpoints: [
        "If you can show O(n²) easily and Ω(n) easily, you know the truth is somewhere between, and you can narrow from both ends.",
      ],
    },
    {
      points: "Beware of guesses that are off by only a logarithm.",
      subpoints: [
        "The difference between O(n) and O(n log n) is invisible in a sloppy tree sum but fatal in the algebra.",
      ],
    },
  ];

  const mistakes = [
    {
      points: "Declaring victory with the wrong constant.",
      subpoints: [
        "Ending at (c + 1)n and calling it O(n) is the single most common error. The constant must come out unchanged — you must reach ≤ cn, not ≤ (c+1)n.",
      ],
    },
    {
      points: "Forgetting the base case.",
      subpoints: [
        "An inductive step without a base case proves nothing. It is also where you pin down c, since the base case is what forces c to be large enough.",
      ],
    },
    {
      points: "Insisting the base case must be n = 1.",
      subpoints: [
        "cn log n is 0 at n = 1, so no c makes T(1) ≤ c·1·log 1 work. Asymptotic notation only cares about large n, so start the induction at n = 2 and n = 3 instead.",
      ],
    },
    {
      points: "Hiding the constant inside asymptotic notation mid-proof.",
      subpoints: [
        'Writing "T(n) ≤ 2·O(n/2) + n = O(n)" looks fine and is wrong, because O() absorbs a constant that is silently growing at every level. Always carry an explicit c.',
      ],
    },
    {
      points: "Giving up when the guess is a term short.",
      subpoints: [
        "Being off by a constant usually means the hypothesis needs strengthening by a lower-order term, not that the guess was wrong.",
      ],
    },
    {
      points: "Proving only the upper bound and claiming Θ.",
      subpoints: [
        "Θ needs both directions. The Ω proof is the same argument with the inequalities reversed.",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is the substitution method for solving recurrences?",
      a: "It is a two-step technique: guess the form of the solution, then prove that guess correct by mathematical induction. You assume the bound holds for all inputs smaller than n, substitute that assumption into the recurrence, and show the same bound comes out for n itself. The name refers to substituting the inductive hypothesis into the recurrence.",
    },
    {
      q: "When should I use substitution instead of the Master Theorem?",
      a: "Whenever the recurrence does not have the form T(n) = aT(n/b) + f(n) with constant a and b — unequal subproblem sizes, subtractive recurrences like T(n − 1), non-constant a — or when it falls into one of the Master Theorem's gaps. Substitution works on any recurrence; the Master Theorem is faster but far narrower.",
    },
    {
      q: "How do I come up with the initial guess?",
      a: "Usually from a recursion tree: sketch it, sum the levels roughly, and use that as your guess. You can also match the recurrence against a familiar one, or prove loose upper and lower bounds first and tighten from both sides. The guess does not need to be inspired — it needs to be checkable.",
    },
    {
      q: "Why does my proof fail even though the guess is right?",
      a: "Almost always because the inductive hypothesis is too weak. If the algebra leaves you at cn + 1 when you needed cn, subtract a lower-order term from the hypothesis — assume T(n) ≤ cn − d instead of T(n) ≤ cn. The stronger statement is paradoxically easier to prove, because the extra −d absorbs the leftover term.",
    },
    {
      q: "Why can the base case start at n = 2 instead of n = 1?",
      a: "Because asymptotic notation only claims something for n ≥ n₀, and you get to choose n₀. This matters for bounds like cn log n, which equals 0 at n = 1 and so can never dominate T(1). Starting the induction at n = 2 and n = 3 is legitimate, and the recurrence never depends on T(1) once n is large enough.",
    },
    {
      q: "Can substitution prove a lower bound as well?",
      a: "Yes. The structure is identical, with ≤ replaced by ≥ throughout, and the constant chosen small enough rather than large enough. To establish Θ you prove both directions — an O bound and an Ω bound with the same function.",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <Section title="What the Substitution Method Is">
          <P>
            The substitution method solves a recurrence in two steps:{" "}
            <b>guess the form of the answer, then prove it correct by
            mathematical induction</b>. The name comes from the second step —
            you substitute the inductive hypothesis into the recurrence and check
            that the same bound survives.
          </P>
          <P>
            That structure makes it the odd one out among the three techniques.
            The Master Theorem and the recursion tree both <i>derive</i> an
            answer; substitution <i>verifies</i> one you already have. It cannot
            tell you what the solution is. What it can do — and neither of the
            others can — is turn a plausible answer into a proof, for a
            recurrence of any shape whatsoever.
          </P>
          <MethodFlow />
        </Section>

        <Section title="When You Need It">
          <P>
            If a recurrence fits T(n) = aT(n/b) + f(n), the Master Theorem answers
            it in one line and you should use that. Substitution earns its keep
            when the Master Theorem cannot help:
          </P>
          <List items={whenToUse} />
          <Table
            headers={["Method", "Works on", "Effort", "What you get"]}
            rows={compareRows}
            firstColMono={false}
          />
          <Callout>
            In practice the recursion tree and substitution are partners, not
            rivals. The tree produces the guess; substitution proves it. Textbook
            solutions that say &quot;by the recursion tree we expect O(n log n),
            which we now verify&quot; are describing exactly this pairing.
          </Callout>
        </Section>

        <Section title="What an Induction Proof Requires">
          <P>
            Since the method is induction, every proof has the same three parts.
            Missing any one of them means you have not proved anything:
          </P>
          <List items={inductionParts} />
          <P>
            One rule governs the whole exercise: <b>the constant must come out
            unchanged</b>. If you assume T(k) ≤ ck and the algebra ends at
            (c + 1)n, you have not proved T(n) ≤ cn — you have proved a weaker
            statement with a constant that grows at every level, which over log n
            levels is not a constant at all.
          </P>
        </Section>

        <Section title="Worked Example 1 — T(n) = 2T(n/2) + n">
          <P>
            This is the merge sort recurrence. A recursion tree suggests
            O(n log n), so that is the guess.
          </P>
          <P>
            <b>Inductive hypothesis.</b> Assume T(k) ≤ ck log k for all k &lt; n,
            for some constant c &gt; 0 to be fixed later.
          </P>
          <P>
            <b>Inductive step.</b> Substitute the hypothesis with k = n/2:
          </P>
          <Derivation
            steps={[
              { expr: "T(n) = 2T(n/2) + n" },
              { expr: "     ≤ 2 · c(n/2) log(n/2) + n", note: "by the hypothesis" },
              { expr: "     = cn log(n/2) + n" },
              { expr: "     = cn (log n − log 2) + n", note: "log of a quotient" },
              { expr: "     = cn log n − cn + n", note: "log₂2 = 1" },
              { expr: "     ≤ cn log n", note: "whenever −cn + n ≤ 0, i.e. c ≥ 1" },
            ]}
          />
          <P>
            The bound closes with the same c it started with, so the step holds for
            any c ≥ 1.
          </P>
          <P>
            <b>Base case.</b> Here the induction cannot start at n = 1: the bound
            cn log n equals 0 when n = 1, and T(1) = 1 is not ≤ 0. This is not a
            problem — asymptotic claims only need to hold for n ≥ n₀, so start at
            n = 2 and n = 3 instead. With T(1) = 1, the recurrence gives T(2) = 4
            and T(3) = 5. Then:
          </P>
          <Derivation
            steps={[
              { expr: "T(2) = 4 ≤ c · 2 log 2 = 2c", note: "holds when c ≥ 2" },
              { expr: "T(3) = 5 ≤ c · 3 log 3 ≈ 4.75c", note: "holds when c ≥ 1.06" },
            ]}
          />
          <P>
            Choosing c = 2 satisfies the base cases and the inductive step at once.
            Therefore <b>T(n) = O(n log n)</b>.
          </P>

          <InContentAd />
        </Section>

        <Section title="Proving the Matching Lower Bound">
          <P>
            An upper bound alone does not give Θ. The Ω proof is the same argument
            with every inequality reversed, and with c chosen small enough rather
            than large enough. Guess T(n) ≥ cn log n:
          </P>
          <Derivation
            steps={[
              { expr: "T(n) = 2T(n/2) + n" },
              { expr: "     ≥ 2 · c(n/2) log(n/2) + n", note: "by the hypothesis" },
              { expr: "     = cn log n − cn + n" },
              { expr: "     ≥ cn log n", note: "whenever n − cn ≥ 0, i.e. c ≤ 1" },
            ]}
          />
          <P>
            So T(n) = Ω(n log n) with c = 1. Combined with the upper bound,
            <b> T(n) = Θ(n log n)</b> — the same answer the Master Theorem gives
            through Case 2, now proved from first principles.
          </P>
        </Section>

        <Section title="Worked Example 2 — a Recurrence the Master Theorem Cannot Touch">
          <P>
            Solve T(n) = T(n − 1) + n, with T(1) = 1. The input shrinks by
            subtraction, so there is no b and the Master Theorem does not apply at
            all. A recursion tree is a single chain costing n, n−1, n−2, …, which
            sums to about n²/2 — so guess O(n²).
          </P>
          <P>
            <b>Inductive hypothesis.</b> Assume T(k) ≤ ck² for all k &lt; n.
          </P>
          <Derivation
            steps={[
              { expr: "T(n) = T(n − 1) + n" },
              { expr: "     ≤ c(n − 1)² + n", note: "by the hypothesis" },
              { expr: "     = c(n² − 2n + 1) + n" },
              { expr: "     = cn² − 2cn + c + n" },
              { expr: "     = cn² − (2c − 1)n + c" },
              { expr: "     ≤ cn²", note: "whenever (2c − 1)n ≥ c, true for c ≥ 1, n ≥ 1" },
            ]}
          />
          <P>
            <b>Base case.</b> T(1) = 1 ≤ c · 1² holds for c ≥ 1. Taking c = 1
            satisfies everything, so <b>T(n) = O(n²)</b> — which matches the exact
            answer n(n+1)/2.
          </P>
        </Section>

        <Section title="The Classic Trap — a Proof That Looks Right and Is Not">
          <P>
            Suppose you guessed O(n) for the merge sort recurrence instead. Assume
            T(k) ≤ ck and substitute:
          </P>
          <Derivation
            steps={[
              { expr: "T(n) = 2T(n/2) + n" },
              { expr: "     ≤ 2 · c(n/2) + n" },
              { expr: "     = cn + n" },
              { expr: "     = (c + 1)n" },
              { expr: "     ≠ ≤ cn", note: "the constant grew — the proof fails" },
            ]}
          />
          <Callout tone="amber">
            It is tempting to write &quot;= cn + n = O(n)&quot; and move on. That
            step is the trap. O(n) hides a constant that is being incremented at
            every one of the log n levels, so what looks like a constant is really
            growing without bound. The guess O(n) is simply wrong here, and the
            algebra is telling you so.
          </Callout>
          <P>
            The lesson generalises: <b>always carry an explicit constant through
            the algebra</b>. Asymptotic notation inside an inductive proof conceals
            precisely the thing the proof is supposed to check.
          </P>
        </Section>

        <Section title="Strengthening the Hypothesis">
          <P>
            Sometimes the guess is correct but the proof still fails by a single
            term. Take T(n) = 2T(⌊n/2⌋) + 1 and guess O(n):
          </P>
          <Derivation
            steps={[
              { expr: "T(n) ≤ 2 · c⌊n/2⌋ + 1" },
              { expr: "     ≤ cn + 1", note: "so close — but not ≤ cn" },
            ]}
          />
          <P>
            The guess is right; the hypothesis is too weak. The fix is
            counter-intuitive: <b>prove something stronger</b>. Subtract a
            lower-order term and assume T(k) ≤ ck − d for a constant d &gt; 0:
          </P>
          <Derivation
            steps={[
              { expr: "T(n) ≤ 2(c⌊n/2⌋ − d) + 1" },
              { expr: "     ≤ cn − 2d + 1" },
              { expr: "     ≤ cn − d", note: "whenever d ≥ 1" },
            ]}
          />
          <P>
            The stronger hypothesis carries a spare −d through the induction, and
            that spare term absorbs the leftover +1. Since ck − d is still O(k),
            proving the stronger statement proves the original one. Being handed a
            <i> stronger</i> assumption is what makes the step work — a genuinely
            useful trick, and one worth recognising when a proof stalls one term
            away from closing.
          </P>
        </Section>

        <Section title="Changing Variables">
          <P>
            Some recurrences become familiar after a substitution of a different
            kind — renaming the variable. Consider T(n) = 2T(√n) + log n, which
            fits none of the standard patterns.
          </P>
          <P>
            Let m = log₂n, so that n = 2^m and √n = 2^(m/2). Define
            S(m) = T(2^m). The recurrence becomes:
          </P>
          <Formula>S(m) = 2·S(m/2) + m</Formula>
          <P>
            That is the merge sort recurrence, so S(m) = Θ(m log m) by Case 2 of
            the Master Theorem. Translating back with m = log n:
          </P>
          <Formula>T(n) = Θ(log n · log log n)</Formula>
          <P>
            The technique is worth remembering whenever a recurrence involves √n or
            repeated square roots: taking a logarithm turns the square root into a
            halving, and halving is something every method already handles.
          </P>
        </Section>

        <Section title="How to Make a Good Guess">
          <List items={guessing} />
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
              { points: "Substitution is guess-then-prove: it verifies an answer rather than deriving one." },
              { points: "Every proof needs an inductive hypothesis, an inductive step, and a base case — and the base case is where c gets pinned down." },
              { points: "The constant must survive the algebra unchanged; ending at (c + 1)n is a failed proof, not a successful one." },
              { points: "Never let asymptotic notation into the middle of the induction — it hides the constant you are checking." },
              { points: "A proof that fails by one term usually needs a stronger hypothesis, such as ck − d instead of ck." },
              { points: "It works on any recurrence, which is why it is the fallback when the Master Theorem does not apply." },
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
