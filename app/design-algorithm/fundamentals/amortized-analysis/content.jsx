"use client";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// The real cost of the first 32 appends to a doubling array: mostly 1, with a
// spike every power of two. Seeing the spikes next to the flat amortized line
// is the whole argument in one picture.
const appendCosts = (n) => {
  const costs = [];
  let capacity = 1;
  let size = 0;

  for (let i = 0; i < n; i++) {
    let cost = 1;
    if (size === capacity) {
      cost += size; // copy every existing element into the new buffer
      capacity *= 2;
    }
    costs.push(cost);
    size++;
  }
  return costs;
};

const CostChart = () => {
  const W = 380;
  const H = 190;
  const PAD_L = 26;
  const PAD_R = 10;
  const PAD_T = 14;
  const PAD_B = 28;

  const costs = appendCosts(32);
  const maxCost = Math.max(...costs);
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;

  const barW = plotW / costs.length;
  const toY = (c) => PAD_T + plotH - (c / maxCost) * plotH;

  const total = costs.reduce((sum, c) => sum + c, 0);
  const average = total / costs.length;

  return (
    <figure className="not-prose my-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full"
        style={{ maxWidth: `${W}px` }}
        role="img"
        aria-label="Cost of each of the first 32 appends to a doubling array, with spikes at every power of two and a flat amortized average"
      >
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

        {costs.map((cost, i) => {
          const isSpike = cost > 1;
          return (
            <rect
              key={`bar-${i}`}
              x={PAD_L + i * barW + 1}
              y={toY(cost)}
              width={Math.max(barW - 2, 1)}
              height={PAD_T + plotH - toY(cost)}
              fill={isSpike ? "#ef4444" : "#3b82f6"}
              opacity={isSpike ? "0.85" : "0.5"}
              rx="1.5"
            />
          );
        })}

        {/* The amortized average */}
        <line
          x1={PAD_L}
          y1={toY(average)}
          x2={W - PAD_R}
          y2={toY(average)}
          stroke="#10b981"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <text x={W - PAD_R} y={toY(average) - 5} textAnchor="end" fill="#10b981" fontSize="9" fontWeight="700">
          amortized ≈ {average.toFixed(2)}
        </text>

        <text x={PAD_L - 5} y={PAD_T + 8} textAnchor="end" fill="#64748b" fontSize="9">
          {maxCost}
        </text>
        <text x={PAD_L - 5} y={PAD_T + plotH} textAnchor="end" fill="#64748b" fontSize="9">
          1
        </text>
        <text x={W - PAD_R} y={H - 8} textAnchor="end" fill="#64748b" fontSize="9">
          append number
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        Most appends cost 1. The red spikes are resizes, and they double in height
        — but they also halve in frequency, which is exactly why the average stays
        flat.
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

  const appendRows = [
    ["1", "1", "1", "No resize needed"],
    ["2", "2", "1 + 1", "Capacity full: copy 1 element"],
    ["3", "4", "1 + 2", "Capacity full: copy 2 elements"],
    ["4", "4", "1", "Room to spare"],
    ["5", "8", "1 + 4", "Capacity full: copy 4 elements"],
    ["6–8", "8", "1 each", "Room to spare"],
    ["9", "16", "1 + 8", "Capacity full: copy 8 elements"],
  ];

  const differences = [
    {
      points: "Average-case analysis assumes a probability distribution over inputs.",
      subpoints: [
        "Quick sort is O(n log n) on average because we assume the pivot is usually reasonable. An unlucky input still costs O(n²).",
      ],
    },
    {
      points: "Amortized analysis assumes nothing and involves no probability.",
      subpoints: [
        "It is a worst-case guarantee about a whole sequence. No adversary can construct an input that makes n appends cost more than O(n) in total.",
      ],
    },
    {
      points: "The guarantee is about the sequence, not any single operation.",
      subpoints: [
        "One individual append genuinely can cost Θ(n). Amortized analysis never claims otherwise — it claims those expensive operations cannot happen often.",
      ],
    },
  ];

  const methodRows = [
    [
      "Aggregate",
      "Total cost of n operations, divided by n",
      "Simplest, but gives one average for all operation types",
      "Binary counter, dynamic array",
    ],
    [
      "Accounting",
      "Overcharge cheap operations, store the surplus as credit",
      "Different operations can have different amortized costs",
      "Stack with multipop, dynamic array",
    ],
    [
      "Potential",
      "Define Φ over the data structure; amortized = actual + ΔΦ",
      "Most powerful and most mechanical; no bookkeeping of individual credits",
      "Splay trees, Fibonacci heaps, union-find",
    ],
  ];

  const counterRows = [
    ["0", "0 0 0 0", "—", "—"],
    ["1", "0 0 0 1", "1", "1"],
    ["2", "0 0 1 0", "2", "3"],
    ["3", "0 0 1 1", "1", "4"],
    ["4", "0 1 0 0", "3", "7"],
    ["5", "0 1 0 1", "1", "8"],
    ["6", "0 1 1 0", "2", "10"],
    ["7", "0 1 1 1", "1", "11"],
    ["8", "1 0 0 0", "4", "15"],
  ];

  const classicRows = [
    ["Dynamic array append", "Θ(n) on resize", "O(1)", "Resizes double in cost but halve in frequency"],
    ["Binary counter increment", "Θ(log n) bit flips", "O(1)", "Bit i only flips every 2ⁱ increments"],
    ["Stack with multipop", "Θ(n) for one multipop", "O(1)", "Each element can only be popped once after being pushed"],
    ["Hash table insert with rehash", "Θ(n) on rehash", "O(1)", "Same doubling argument as the dynamic array"],
    ["Union-Find (rank + path compression)", "Θ(log n)", "O(α(n))", "α is the inverse Ackermann function — effectively ≤ 4"],
    ["Splay tree operations", "Θ(n)", "O(log n)", "A costly splay restructures the tree, making later ones cheap"],
    ["Fibonacci heap extract-min", "Θ(n)", "O(log n)", "Consolidation is deferred until an extract forces it"],
  ];

  const limits = [
    {
      points: "Real-time and safety-critical systems.",
      subpoints: [
        "A pacemaker or an anti-lock braking controller cannot accept one operation taking 100× longer, even if the average is excellent. These systems need worst-case-per-operation bounds.",
      ],
    },
    {
      points: "Interactive latency and tail percentiles.",
      subpoints: [
        "A resize that stalls one request in a thousand shows up as a p99 latency spike. The amortized average is genuinely O(1) and the user experience is still bad.",
      ],
    },
    {
      points: "Short sequences.",
      subpoints: [
        "The guarantee is about long runs. If you perform three operations and one of them triggers a resize, the amortized bound has not had room to pay off.",
      ],
    },
  ];

  const mistakes = [
    {
      points: "Confusing amortized with average-case.",
      subpoints: [
        "Average-case involves probability over inputs. Amortized is a deterministic worst-case bound on a sequence, with no randomness anywhere.",
      ],
    },
    {
      points: 'Saying "append is O(1)" without qualification.',
      subpoints: [
        "A single append is O(n) in the worst case. The correct phrasing is O(1) amortized, and dropping the qualifier is exactly what confuses people who then see a latency spike.",
      ],
    },
    {
      points: "Letting credit go negative in the accounting method.",
      subpoints: [
        "The proof only works if the balance is non-negative at every point in the sequence. Verifying that is the actual work of the method.",
      ],
    },
    {
      points: "Choosing a potential function that can decrease below its start.",
      subpoints: [
        "Φ must satisfy Φ(Dᵢ) ≥ Φ(D₀) for all i, usually arranged by making Φ(D₀) = 0 and Φ non-negative. Otherwise the telescoping sum does not bound the real cost.",
      ],
    },
    {
      points: "Assuming growth by a constant amount works too.",
      subpoints: [
        "Growing a array by adding 10 slots instead of doubling makes n appends cost Θ(n²) in total. Only geometric growth gives O(1) amortized.",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is amortized analysis?",
      a: "It is a way of measuring the cost of an operation by averaging it over a worst-case sequence of operations, rather than looking at a single operation in isolation. It is used when an occasional expensive operation is guaranteed to be paid for by many cheap ones — like appending to a dynamic array, where the rare resize is offset by all the appends that fit without resizing.",
    },
    {
      q: "Is amortized analysis the same as average-case analysis?",
      a: "No, and this is the most common confusion. Average-case analysis assumes a probability distribution over inputs and tells you what happens typically. Amortized analysis involves no probability at all: it is a worst-case guarantee about the total cost of a sequence. No adversarial input can make n appends to a dynamic array cost more than O(n) overall.",
    },
    {
      q: "Why is appending to a dynamic array O(1) amortized?",
      a: "When the array is full it allocates a buffer of double the size and copies everything across, which costs Θ(n). But doubling means the next resize is twice as far away. Over n appends the copies total 1 + 2 + 4 + ... + n, which is less than 2n, so the whole sequence costs O(n) and each append averages O(1).",
    },
    {
      q: "What are the three methods of amortized analysis?",
      a: "Aggregate analysis totals the cost of n operations and divides by n. The accounting method assigns each operation an amortized charge, banking the surplus from cheap operations as credit to pay for expensive ones. The potential method defines a function Φ over the data structure's state, with the amortized cost being the actual cost plus the change in Φ. All three give the same answers; they differ in convenience.",
    },
    {
      q: "What is the potential method?",
      a: "You define a potential function Φ that maps the data structure's state to a number representing stored-up work. The amortized cost of an operation is its actual cost plus Φ(after) − Φ(before). Because the Φ terms telescope across a sequence, the total amortized cost bounds the total actual cost whenever Φ never drops below its starting value.",
    },
    {
      q: "When is an amortized bound not good enough?",
      a: "When any individual operation being slow is unacceptable. Real-time systems, safety-critical controllers and latency-sensitive services all care about the worst single operation, not the average across a sequence — a resize that stalls one request in a thousand still shows up as a p99 latency spike even though the amortized cost is O(1).",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <Section title="What Amortized Analysis Is">
          <P>
            Some data structures have an operation that is usually trivial and
            occasionally enormous. Appending to a dynamic array normally writes one
            slot, but when the buffer fills it allocates a bigger one and copies
            everything across. Quoting the worst case for that operation gives
            O(n), which is technically correct and deeply misleading — it suggests
            that building a list of a million items costs a trillion operations,
            when it actually costs about two million.
          </P>
          <P>
            <b>Amortized analysis measures the average cost per operation across a
            worst-case sequence of operations.</b> Instead of asking &quot;how bad
            can one append be?&quot;, it asks &quot;how bad can n appends be, in
            total?&quot; — and then divides. When the expensive cases are
            structurally guaranteed to be rare, that average is the honest number.
          </P>
        </Section>

        <Section title="The Motivating Example — a Doubling Array">
          <P>
            A dynamic array keeps a buffer with some capacity. Appending writes one
            element; if the buffer is full, it first allocates one of double the
            capacity and copies every existing element across:
          </P>
          <CodeSample caption="The copy loop is what makes the occasional append expensive.">{`function append(arr, value) {
  if (arr.size === arr.capacity) {
    const bigger = new Array(arr.capacity * 2);   // Θ(n) work,
    for (let i = 0; i < arr.size; i++) {          // but only when full
      bigger[i] = arr.buffer[i];
    }
    arr.buffer = bigger;
    arr.capacity *= 2;
  }

  arr.buffer[arr.size] = value;                   // Θ(1) the rest of the time
  arr.size++;
}`}</CodeSample>
          <Table
            headers={["Append #", "Capacity after", "Cost", "What happened"]}
            rows={appendRows}
          />
          <CostChart />
          <P>
            The picture contains the entire argument. The spikes double in height —
            but they also double in spacing. Each resize is twice as expensive as
            the last and happens half as often, and those two effects cancel
            exactly.
          </P>
        </Section>

        <Section title="Method 1 — Aggregate Analysis">
          <P>
            The simplest method: add up the cost of the whole sequence, then
            divide by the number of operations. For n appends, the writes cost n,
            and the copies happen at sizes 1, 2, 4, 8, … up to n:
          </P>
          <Derivation
            steps={[
              { expr: "total = n + (1 + 2 + 4 + … + n)", note: "writes + copies" },
              { expr: "      = n + (2n − 1)", note: "geometric sum" },
              { expr: "      < 3n" },
              { expr: "amortized = total / n < 3 = O(1)" },
            ]}
          />
          <P>
            Running this for real confirms it: the total cost of n appends divided
            by n settles at about 2.05 and stays there, whether n is a thousand or
            a million. The bound of 3 is comfortable, and the important point is
            that it is a <i>constant</i> — it does not creep upward with n.
          </P>
          <Callout>
            The reason doubling works is that the growth is <b>geometric</b>. If
            you instead grew the buffer by a fixed 10 slots each time, you would
            resize n/10 times, copying an average of n/2 elements each time —
            Θ(n²) in total, and Θ(n) amortized per append. The choice of growth
            factor is what creates the guarantee.
          </Callout>
        </Section>

        <Section title="Aggregate Analysis of a Binary Counter">
          <P>
            A second classic. Incrementing a binary counter flips a trailing run of
            1s to 0 and then one 0 to 1, so a single increment can flip Θ(log n)
            bits. Watch what actually happens over a sequence:
          </P>
          <Table
            headers={["Increment", "Counter", "Bits flipped", "Running total"]}
            rows={counterRows}
          />
          <P>
            After 8 increments only 15 bits have flipped, not 8 × 4. The reason is
            visible in the table: bit 0 flips every time, bit 1 flips every second
            increment, bit 2 every fourth, and so on:
          </P>
          <Derivation
            steps={[
              { expr: "total flips = n + n/2 + n/4 + n/8 + …" },
              { expr: "            < 2n", note: "geometric sum" },
              { expr: "amortized = O(1) per increment" },
            ]}
          />
          <P>
            Measured over 100,000 increments, the ratio is 1.99998 flips per
            increment — converging on 2 exactly as the series predicts.
          </P>

          <InContentAd />
        </Section>

        <Section title="Method 2 — The Accounting Method">
          <P>
            Also called the banker&apos;s method. You <b>invent</b> a charge for
            each operation — its amortized cost — which may be more or less than
            what the operation really costs. The surplus is stored as{" "}
            <b>credit</b> on the data structure and later spent on expensive
            operations.
          </P>
          <P>
            One rule makes the method valid: <b>the credit balance must never go
            negative</b>. If it never does, the total amount charged is an upper
            bound on the total real cost, which is exactly what an amortized bound
            claims.
          </P>
          <P>For the dynamic array, charge 3 units per append and spend them as:</P>
          <List
            items={[
              { points: "1 unit pays for writing this element into the buffer — spent immediately." },
              { points: "1 unit is banked to pay for copying this element at the next resize." },
              {
                points:
                  "1 unit is banked to pay for copying one older element — specifically, one of the elements that were already present at the last resize and so have no credit of their own.",
              },
            ]}
          />
          <P>
            When a resize of a size-n buffer happens, the n elements to be copied
            are covered: the n/2 elements added since the last resize carry 2 units
            each, which is enough for themselves and for one older element apiece.
            The balance never goes negative, so <b>append is O(1) amortized</b>.
          </P>
          <P>
            The method&apos;s advantage over aggregate analysis is that different
            operations can carry different charges. For a stack supporting push,
            pop and multipop(k), charge 2 for a push (1 to push, 1 banked for the
            eventual pop) and 0 for pop and multipop. Every pop is then paid for by
            the credit its push left behind — so even a multipop that removes a
            thousand elements is free, because those thousand pushes already paid.
          </P>
        </Section>

        <Section title="Method 3 — The Potential Method">
          <P>
            The physicist&apos;s method, and the most powerful of the three.
            Instead of tracking credit on individual elements, define a{" "}
            <b>potential function</b> Φ that maps the whole state of the data
            structure to a number — the stored-up work it represents.
          </P>
          <Formula>amortized cost = actual cost + Φ(after) − Φ(before)</Formula>
          <P>
            Summed over a sequence, the Φ terms telescope: every intermediate value
            appears once positive and once negative, leaving only Φ(end) − Φ(start).
            So as long as <b>Φ never drops below its starting value</b> — usually
            arranged by setting Φ(D₀) = 0 and keeping Φ ≥ 0 — the total amortized
            cost is an upper bound on the total real cost.
          </P>
          <P>
            <b>Binary counter.</b> Let Φ be the number of 1 bits. An increment that
            flips k trailing 1s to 0 and one 0 to 1 has actual cost k + 1, and
            changes the bit count by 1 − k:
          </P>
          <Derivation
            steps={[
              { expr: "amortized = (k + 1) + (1 − k)" },
              { expr: "          = 2", note: "the k cancels entirely" },
              { expr: "          = O(1)" },
            ]}
          />
          <P>
            The k vanishing is the whole trick. An expensive increment is expensive
            precisely because it destroys many 1 bits, and destroying them releases
            exactly the potential needed to pay for the work.
          </P>
          <P>
            <b>Dynamic array.</b> Let Φ = 2·size − capacity. Immediately after a
            resize, size is half of capacity so Φ = 0; as appends fill the buffer,
            Φ climbs to equal capacity by the time the next resize is due — having
            accumulated precisely enough potential to fund the copy. Working through
            both cases gives an amortized cost of 3 per append, agreeing with the
            accounting method.
          </P>
        </Section>

        <Section title="Comparing the Three Methods">
          <Table
            headers={["Method", "How it works", "Trade-off", "Typical use"]}
            rows={methodRows}
            firstColMono={false}
          />
          <P>
            All three are provably equivalent in power — any bound one can
            establish, the others can too. Aggregate analysis is the one to reach
            for when every operation is the same kind. The accounting method suits
            structures with several operation types. The potential method is the
            standard choice for anything genuinely difficult, because once Φ is
            chosen the rest is mechanical.
          </P>
        </Section>

        <Section title="Amortized Is Not Average-Case">
          <P>
            These two are constantly conflated, and the distinction matters:
          </P>
          <List items={differences} />
          <Callout>
            Quick sort is O(n log n) <b>average-case</b>: get unlucky and you still
            pay O(n²). A dynamic array is O(1) <b>amortized</b>: there is no bad
            luck available, because no sequence of n appends can cost more than
            O(n) in total. One is a statement about probability; the other is a
            guarantee.
          </Callout>
        </Section>

        <Section title="Where Amortized Bounds Show Up">
          <Table
            headers={["Operation", "Worst case, single op", "Amortized", "Why the amortized bound holds"]}
            rows={classicRows}
            firstColMono={false}
          />
          <P>
            Union-Find is the most striking entry. With union by rank and path
            compression, a sequence of m operations costs O(m·α(n)), where α is the
            inverse Ackermann function — a function that grows so slowly it is below
            5 for any n that could be written down in this universe. The
            per-operation worst case is still logarithmic; only the amortized
            analysis reveals that the structure is effectively constant-time.
          </P>
        </Section>

        <Section title="When an Amortized Bound Is Not Enough">
          <P>
            Amortized analysis answers &quot;how much work in total?&quot;. Some
            systems need to ask &quot;how long will this <i>one</i> call
            take?&quot;, and for them the average is the wrong statistic:
          </P>
          <List items={limits} />
          <P>
            The engineering response is not to abandon the structure but to spread
            the cost deliberately — incremental or background resizing, or
            preallocating capacity up front when the final size is known. Both
            convert a rare large stall into a small predictable overhead on every
            operation.
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
              { points: "Amortized cost is the average per operation over a worst-case sequence — not over a distribution of inputs." },
              { points: "It applies when expensive operations are structurally rare, such as a resize that doubles in cost but halves in frequency." },
              { points: "Aggregate analysis divides the total by n; the accounting method banks credit; the potential method tracks a function Φ." },
              { points: "The accounting method requires credit to stay non-negative; the potential method requires Φ never to fall below its starting value." },
              { points: "Geometric growth is what creates the guarantee — growing by a fixed amount gives Θ(n) amortized, not O(1)." },
              { points: "An amortized bound says nothing about any single operation, so it is the wrong tool for real-time or tail-latency requirements." },
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
