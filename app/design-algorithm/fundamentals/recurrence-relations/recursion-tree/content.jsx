"use client";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// A recursion tree drawn from a level description. Each node carries the size
// of its subproblem; the right-hand column carries what that whole level costs,
// which is the number the method actually cares about.
const RecursionTreeFigure = ({ levels, caption, ariaLabel, keyPrefix }) => {
  const W = 400;
  const rowH = 58;
  const H = levels.length * rowH + 26;

  const nodeW = 38;
  const nodeH = 21;
  const plotL = 16;
  const plotR = 296;
  const costX = W - 6;

  const toX = (t) => plotL + t * (plotR - plotL);
  const rowY = (i) => 20 + i * rowH;

  return (
    <figure className="not-prose my-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full"
        style={{ maxWidth: `${W}px` }}
        role="img"
        aria-label={ariaLabel}
      >
        {/* Edges first so nodes paint over them */}
        {levels.map((level, li) =>
          li === 0
            ? null
            : level.nodes.map((node, ni) => {
                const parent = levels[li - 1].nodes[node.p];
                if (!parent) return null;
                return (
                  <line
                    key={`${keyPrefix}-edge-${li}-${ni}`}
                    x1={toX(parent.x)}
                    y1={rowY(li - 1) + nodeH / 2}
                    x2={toX(node.x)}
                    y2={rowY(li) - nodeH / 2}
                    stroke="#94a3b8"
                    strokeWidth="1.4"
                  />
                );
              })
        )}

        {levels.map((level, li) => (
          <g key={`${keyPrefix}-row-${li}`}>
            {level.nodes.map((node, ni) => (
              <g key={`${keyPrefix}-node-${li}-${ni}`}>
                <rect
                  x={toX(node.x) - nodeW / 2}
                  y={rowY(li) - nodeH / 2}
                  width={nodeW}
                  height={nodeH}
                  rx="6"
                  fill="#3b82f6"
                  opacity="0.15"
                  stroke="#3b82f6"
                  strokeWidth="1.8"
                />
                <text
                  x={toX(node.x)}
                  y={rowY(li) + 4}
                  textAnchor="middle"
                  className="fill-gray-800 dark:fill-gray-100"
                  fontSize="10"
                  fontWeight="600"
                >
                  {node.label}
                </text>
              </g>
            ))}

            {/* Dotted rule leading the eye to the level's total */}
            <line
              x1={plotR + 6}
              y1={rowY(li)}
              x2={costX - 42}
              y2={rowY(li)}
              stroke="#cbd5e1"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <text
              x={costX}
              y={rowY(li) + 4}
              textAnchor="end"
              fill="#ef4444"
              fontSize="10"
              fontWeight="700"
            >
              {level.cost}
            </text>
          </g>
        ))}
      </svg>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
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

const Callout = ({ children }) => (
  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">{children}</p>
  </div>
);

const Content = () => {
  const { theme } = useTheme();

  const mergeTree = [
    { nodes: [{ x: 0.5, label: "n" }], cost: "n" },
    {
      nodes: [
        { x: 0.25, label: "n/2", p: 0 },
        { x: 0.75, label: "n/2", p: 0 },
      ],
      cost: "n",
    },
    {
      nodes: [
        { x: 0.12, label: "n/4", p: 0 },
        { x: 0.38, label: "n/4", p: 0 },
        { x: 0.62, label: "n/4", p: 1 },
        { x: 0.88, label: "n/4", p: 1 },
      ],
      cost: "n",
    },
  ];

  const unevenTree = [
    { nodes: [{ x: 0.5, label: "n" }], cost: "n" },
    {
      nodes: [
        { x: 0.27, label: "n/3", p: 0 },
        { x: 0.73, label: "2n/3", p: 0 },
      ],
      cost: "n",
    },
    {
      nodes: [
        { x: 0.13, label: "n/9", p: 0 },
        { x: 0.4, label: "2n/9", p: 0 },
        { x: 0.6, label: "2n/9", p: 1 },
        { x: 0.88, label: "4n/9", p: 1 },
      ],
      cost: "n",
    },
  ];

  const anatomy = [
    {
      points: "A node holds the non-recursive cost of one call.",
      subpoints: [
        "Not the total cost of that call — only the f(n) part. The recursive work is represented by the node's children.",
      ],
    },
    {
      points: "A node's children are the subproblems it spawns.",
      subpoints: [
        "T(n) = 2T(n/2) + n gives every node two children, each labelled with half its parent's size.",
      ],
    },
    {
      points: "A level's cost is the sum across that row.",
      subpoints: [
        "This is the quantity the method is built around: how much the whole recursion spends at depth i.",
      ],
    },
    {
      points: "The depth is how many times you can shrink n before hitting the base case.",
      subpoints: [
        "Dividing by b gives depth log_b n. Subtracting a constant gives depth n — a much taller tree.",
      ],
    },
    {
      points: "The leaves are the base cases.",
      subpoints: [
        "For a-way branching over depth log_b n there are a^(log_b n) = n^(log_b a) of them, and each costs Θ(1).",
      ],
    },
  ];

  const mergeRows = [
    ["0", "1", "n", "1 × n = n"],
    ["1", "2", "n/2", "2 × n/2 = n"],
    ["2", "4", "n/4", "4 × n/4 = n"],
    ["i", "2ⁱ", "n/2ⁱ", "2ⁱ × n/2ⁱ = n"],
    ["log₂n", "n", "1", "n × Θ(1) = Θ(n)"],
  ];

  const quadRows = [
    ["0", "1", "n²", "n²"],
    ["1", "3", "(n/4)² = n²/16", "3n²/16"],
    ["2", "9", "(n/16)² = n²/256", "9n²/256"],
    ["i", "3ⁱ", "n²/16ⁱ", "(3/16)ⁱ · n²"],
  ];

  const shapeRows = [
    [
      "Decreasing",
      "Each level costs less than the one above",
      "The root dominates; the series converges",
      "Θ(f(n))",
      "Case 3",
    ],
    [
      "Constant",
      "Every level costs the same",
      "Cost = one level × the depth",
      "Θ(f(n) · log n)",
      "Case 2",
    ],
    [
      "Increasing",
      "Each level costs more than the one above",
      "The leaves dominate the sum",
      "Θ(n^(log_b a))",
      "Case 1",
    ],
  ];

  const compareRows = [
    [
      "Recursion tree",
      "Any recurrence",
      "Draw and sum",
      "The answer plus the intuition — but informally",
    ],
    [
      "Master Theorem",
      "T(n) = aT(n/b) + f(n) only",
      "Almost none",
      "A rigorous Θ bound, instantly",
    ],
    [
      "Substitution",
      "Any recurrence",
      "Needs a guess up front",
      "A rigorous proof of a bound you already have",
    ],
  ];

  const steps = [
    {
      points: "Draw the root and label it with f(n), not T(n).",
      subpoints: ["The node holds only the work done outside the recursive calls."],
    },
    {
      points: "Expand two or three levels until the pattern is obvious.",
      subpoints: [
        "You are looking for how the node count and the per-node size change from one row to the next.",
      ],
    },
    {
      points: "Write the cost of a general level i.",
      subpoints: ["Number of nodes at depth i, multiplied by the cost of one node at depth i."],
    },
    {
      points: "Find the depth of the tree.",
      subpoints: [
        "Solve for when the subproblem size reaches 1 — log_b n for division, n for subtraction.",
      ],
    },
    {
      points: "Sum the level costs, and add the leaves.",
      subpoints: [
        "Whether the sum is geometric, arithmetic or harmonic decides everything.",
      ],
    },
    {
      points: "Verify the result with the substitution method.",
      subpoints: [
        "The tree is an argument, not a proof. Induction is what makes it rigorous.",
      ],
    },
  ];

  const mistakes = [
    {
      points: "Putting T(n) in a node instead of f(n).",
      subpoints: [
        "A node's own cost is only the non-recursive work. Writing T(n) double-counts everything below it.",
      ],
    },
    {
      points: "Assuming every leaf sits at the same depth.",
      subpoints: [
        "That is only true for equal splits. In T(n) = T(n/3) + T(2n/3) + n one branch bottoms out far sooner than the other, and levels below that depth cost less than n.",
      ],
    },
    {
      points: "Treating the tree as a proof.",
      subpoints: [
        'A drawing with an "…" in it is an argument by pattern. Textbooks pair every tree with a substitution proof for exactly this reason.',
      ],
    },
    {
      points: "Getting the depth wrong for subtractive recurrences.",
      subpoints: [
        "T(n) = T(n − 1) + n has depth n, not log n. The tree is a single chain of n nodes.",
      ],
    },
    {
      points: "Summing a geometric series as though it were constant.",
      subpoints: [
        "If levels shrink by a constant ratio, the total is a constant multiple of the first level — do not multiply by the depth.",
      ],
    },
    {
      points: "Forgetting the leaves.",
      subpoints: [
        "In a bottom-heavy tree, the leaf row is the entire answer, and it is the one row the level formula usually does not cover.",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is the recursion tree method?",
      a: "It is a technique for solving a recurrence by drawing the recursion as a tree, where each node holds the non-recursive cost of one call and its children are the subproblems it creates. You compute what each level of the tree costs, work out how deep the tree goes, and add the levels up. The total is the solution to the recurrence.",
    },
    {
      q: "Is a recursion tree a proof?",
      a: "Not on its own. Drawing a few levels and extending the pattern with an ellipsis is an informal argument, not a rigorous one. Standard practice is to use the tree to find the answer and then confirm it with the substitution method, which supplies the induction the drawing lacks.",
    },
    {
      q: "How do I find the depth of a recursion tree?",
      a: "Ask how many times the input must shrink before it reaches the base case. If each level divides by b, the depth is log_b n. If each level subtracts a constant, the depth is proportional to n. Getting this wrong is the most common source of an incorrect answer, since the depth multiplies everything.",
    },
    {
      q: "How many leaves does a recursion tree have?",
      a: "If every node has a children and the depth is log_b n, the leaf count is a^(log_b n), which equals n^(log_b a). That expression is exactly the watershed function from the Master Theorem, because the two methods are measuring the same thing: the total cost sitting at the bottom of the tree.",
    },
    {
      q: "When is a recursion tree better than the Master Theorem?",
      a: "Whenever the Master Theorem does not apply — unequal subproblem sizes such as T(n/3) + T(2n/3), subtractive recurrences such as T(n − 1), or recurrences that fall into the theorem's gaps like T(n) = 2T(n/2) + n/log n. The tree handles all of these, because it makes no assumption about the shape of the recurrence.",
    },
    {
      q: "What do the three tree shapes mean?",
      a: "If level costs decrease geometrically, the root dominates and the answer is Θ(f(n)). If every level costs the same, the answer is that cost times the depth. If level costs increase, the leaves dominate and the answer is Θ(n^(log_b a)). Those three shapes are precisely the three cases of the Master Theorem, seen from the other side.",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <Section title="What the Recursion Tree Method Is">
          <P>
            A recursive algorithm does not do all its work in one place. It does a
            little at the top, hands the rest to smaller copies of itself, and
            those copies do the same. The recursion tree method makes that
            structure visible: <b>draw the calls as a tree, work out what each
            level costs, and add the levels up</b>.
          </P>
          <P>
            Of the three standard techniques it is the only one that both derives
            an answer and explains it. The Master Theorem gives you a result with
            no insight into where it came from. The substitution method proves a
            result you must already have guessed. The recursion tree shows you
            where the time actually goes — and it works on recurrences the other
            two cannot express.
          </P>
        </Section>

        <Section title="Anatomy of a Recursion Tree">
          <List items={anatomy} />
          <Callout>
            The single most important rule: <b>a node holds f(n), not T(n)</b>.
            The node is the work one call does by itself; everything the call
            delegates is represented by the nodes hanging beneath it. Labelling a
            node T(n) counts the whole subtree twice.
          </Callout>
        </Section>

        <Section title="Worked Example 1 — T(n) = 2T(n/2) + n">
          <P>
            The merge sort recurrence. Each call does n units of work merging, then
            hands two half-size problems to its children:
          </P>
          <RecursionTreeFigure
            keyPrefix="merge"
            levels={mergeTree}
            ariaLabel="Recursion tree for T(n) = 2T(n/2) + n, with every level costing n"
            caption="Node counts double while sizes halve, so the two effects cancel exactly."
          />
          <Table
            headers={["Level i", "Nodes", "Cost of each", "Level total"]}
            rows={mergeRows}
          />
          <P>
            Every level costs n. The size reaches 1 after log₂n halvings, so there
            are log₂n levels above the leaves, and the leaf row contributes Θ(n):
          </P>
          <Derivation
            steps={[
              { expr: "T(n) = n + n + n + … + n", note: "log₂n levels" },
              { expr: "     = n · log₂n + Θ(n)", note: "levels plus leaves" },
              { expr: "     = Θ(n log n)" },
            ]}
          />
          <P>
            The tree also explains <i>why</i> the answer has that shape, which the
            Master Theorem never does. The n log n is a product of two independent
            facts: each level costs n because doubling and halving cancel, and
            there are log n levels because halving reaches 1 that fast.
          </P>

          <InContentAd />
        </Section>

        <Section title="Worked Example 2 — When the Levels Shrink">
          <P>
            Solve T(n) = 3T(n/4) + n². Now the node count triples while each
            subproblem&apos;s cost drops by a factor of 16, so the levels do{" "}
            <i>not</i> balance:
          </P>
          <Table
            headers={["Level i", "Nodes", "Cost of each", "Level total"]}
            rows={quadRows}
          />
          <P>
            Each level costs 3/16 of the one above it. That is a decreasing
            geometric series, and a geometric series is dominated by its first
            term — so instead of multiplying by the depth, sum the series:
          </P>
          <Derivation
            steps={[
              { expr: "T(n) ≤ n² · Σ (3/16)ⁱ", note: "i from 0 to ∞" },
              { expr: "     = n² · 1 / (1 − 3/16)", note: "geometric sum" },
              { expr: "     = (16/13) · n²" },
              { expr: "     = Θ(n²)", note: "the root dominates" },
            ]}
          />
          <P>
            The leaves are negligible here: there are 3^(log₄n) = n^(log₄3) ≈
            n^0.79 of them, far fewer than the n² work done at the root. Computing
            the ratio T(n)/n² numerically converges to 1.2308, which is 16/13
            exactly — the constant the series predicts.
          </P>
        </Section>

        <Section title="The Three Shapes a Tree Can Take">
          <P>
            Every recursion tree falls into one of three patterns, and identifying
            which one you have is the whole method:
          </P>
          <Table
            headers={["Shape", "Level costs", "What dominates", "Total", "Master Theorem"]}
            rows={shapeRows}
            firstColMono={false}
          />
          <P>
            The last column is not a coincidence. <b>The Master Theorem is this
            table, proved once in general.</b> Its three cases are these three
            shapes, and its watershed function n^(log_b a) is just the leaf count.
            Understanding the tree means the theorem stops being three rules to
            memorise and becomes one idea with three outcomes.
          </P>
        </Section>

        <Section title="Worked Example 3 — Unequal Subproblems">
          <P>
            Solve T(n) = T(n/3) + T(2n/3) + n. There is no single b here, so the
            Master Theorem cannot even state this recurrence. The tree handles it
            without complaint:
          </P>
          <RecursionTreeFigure
            keyPrefix="uneven"
            levels={unevenTree}
            ariaLabel="Lopsided recursion tree for T(n) = T(n/3) + T(2n/3) + n"
            caption="The split is uneven, but the sizes on each full row still add to n."
          />
          <P>
            The children of any node have sizes summing to its own, so every
            complete level still costs exactly n. What changes is the depth, which
            is now different depending on which branch you follow:
          </P>
          <List
            items={[
              {
                points: "The shortest path divides by 3 each step.",
                subpoints: ["It reaches the base case after log₃n levels."],
              },
              {
                points: "The longest path multiplies by 2/3 each step.",
                subpoints: ["It survives for log_{3/2}n levels — the height of the tree."],
              },
            ]}
          />
          <P>
            Above the shortest leaf, every level costs exactly n; below it, levels
            cost at most n. That brackets the total between n·log₃n and
            n·log_{"{3/2}"}n. Both are Θ(n log n) — the bases differ only by a
            constant factor — so <b>T(n) = Θ(n log n)</b>.
          </P>
          <Callout>
            This is the practical case that matters most: it is the recurrence for
            quick sort with a consistently lopsided pivot. Even a split as bad as
            1-to-2 at every single step still gives n log n. Quick sort only
            degrades to n² when the split is as extreme as 1-to-(n−1).
          </Callout>
        </Section>

        <Section title="Worked Example 4 — Filling a Master Theorem Gap">
          <P>
            Solve T(n) = 2T(n/2) + n/log n. The Master Theorem is silent here: the
            watershed is n, and n/log n is smaller than n but not{" "}
            <i>polynomially</i> smaller, so it falls between Cases 1 and 2. The
            tree simply computes it.
          </P>
          <P>
            At depth i there are 2ⁱ nodes, each of size n/2ⁱ, so each costs
            (n/2ⁱ)/log(n/2ⁱ) = (n/2ⁱ)/(log n − i). Multiplying by the node count:
          </P>
          <Derivation
            steps={[
              { expr: "level i cost = 2ⁱ · (n/2ⁱ)/(log n − i)" },
              { expr: "             = n / (log n − i)", note: "the 2ⁱ cancels" },
              { expr: "T(n) = Σ n/(log n − i)", note: "i from 0 to log n − 1" },
              { expr: "     = n · (1 + 1/2 + 1/3 + … + 1/log n)", note: "reindexed" },
              { expr: "     = n · H(log n)", note: "a harmonic sum" },
              { expr: "     = Θ(n log log n)", note: "since H(m) ≈ ln m" },
            ]}
          />
          <P>
            The harmonic series is what the Master Theorem&apos;s gap is hiding.
            Neither geometric nor constant, it sums to a logarithm — giving an
            answer, n log log n, that none of the three cases could have produced.
            Evaluating the recurrence numerically confirms it: T(n)/(n log log n)
            settles at about 0.72 and stays there as n grows.
          </P>
        </Section>

        <Section title="A Method You Can Follow Every Time">
          <List items={steps} ordered />
          <Formula>
            T(n) = Σ (cost of level i) + (cost of the leaves)
          </Formula>
        </Section>

        <Section title="How It Compares to the Other Two Methods">
          <Table
            headers={["Method", "Works on", "Effort", "What you get"]}
            rows={compareRows}
            firstColMono={false}
          />
          <P>
            In practice the tree and substitution are used together: the tree finds
            the answer, and induction proves it. The Master Theorem is the shortcut
            you reach for first, and the tree is what you fall back on the moment
            the recurrence stops fitting its template.
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
              { points: "Draw the calls as a tree, cost each level, and sum the levels plus the leaves." },
              { points: "A node holds f(n) — the non-recursive work — never T(n)." },
              { points: "Level costs either shrink, stay equal or grow, and those three shapes are the Master Theorem's three cases." },
              { points: "Depth is log_b n when the input is divided and n when it is decremented; the depth multiplies everything." },
              { points: "A geometric series is dominated by its first term — sum it, do not multiply it by the depth." },
              { points: "The tree gives you the answer and the intuition; use substitution to turn it into a proof." },
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
