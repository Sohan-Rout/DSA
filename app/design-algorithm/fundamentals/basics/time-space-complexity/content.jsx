"use client";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import { useTheme } from "@/app/contexts/ThemeContext";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

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
  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 last:mb-0">
    {children}
  </p>
);

const CodeSample = ({ children, caption }) => (
  <div className="not-prose my-4">
    <pre className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 px-4 py-3 text-sm leading-relaxed">
      <code className="font-mono text-gray-800 dark:text-gray-200">{children}</code>
    </pre>
    {caption && (
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{caption}</p>
    )}
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

  const whyNotSeconds = [
    {
      points: "The number depends on the machine.",
      subpoints: [
        "The same code times differently on a laptop, a phone and a server, so a measurement in seconds says as much about the hardware as it does about the algorithm.",
      ],
    },
    {
      points: "The number depends on the input you happened to pick.",
      subpoints: [
        "Sorting an already-sorted array can be dramatically faster or slower than sorting a shuffled one, depending on the algorithm.",
      ],
    },
    {
      points: "The number tells you nothing about tomorrow's input.",
      subpoints: [
        "Knowing that a function takes 40 ms on 1,000 records does not tell you whether 1,000,000 records will take 40 seconds or 11 hours. The growth rate does.",
      ],
    },
    {
      points: "You often need the answer before you write the code.",
      subpoints: [
        "Complexity analysis lets you reject an approach on paper instead of discovering the problem after a week of implementation.",
      ],
    },
  ];

  const constantOps = [
    { points: "Arithmetic and comparison on fixed-size numbers: a + b, a < b, a % b." },
    { points: "Assigning to a variable, reading a variable." },
    { points: "Indexing an array: arr[i]." },
    { points: "Following a reference or pointer: node.next." },
    { points: "Calling a function — the call itself, not the work inside it." },
  ];

  const countingRows = [
    ["let total = 0;", "1", "Runs once."],
    ["let i = 0;", "1", "Runs once."],
    ["i < arr.length", "n + 1", "Checked once per iteration, plus the final failing check."],
    ["i++", "n", "Once per iteration."],
    ["total += arr[i];", "n", "Once per iteration."],
    ["return total;", "1", "Runs once."],
  ];

  const caseRows = [
    ["Best case", "The target is the first element", "O(1)", "1 comparison"],
    ["Average case", "The target is somewhere in the middle", "O(n)", "≈ n/2 comparisons"],
    ["Worst case", "The target is last, or absent", "O(n)", "n comparisons"],
  ];

  const loopRows = [
    ["for (i = 0; i < n; i++)", "O(n)", "The counter increases by a constant, so it takes n steps to reach n."],
    ["for (i = 0; i < n; i += 3)", "O(n)", "n/3 iterations — still linear, because constants are dropped."],
    [
      "for (i = 1; i < n; i *= 2)",
      "O(log n)",
      "The counter doubles, so it reaches n after log₂n steps.",
    ],
    [
      "for (i = 0; i < n; i++) for (j = 0; j < n; j++)",
      "O(n²)",
      "The inner loop runs n times for each of the n outer iterations.",
    ],
    [
      "for (i = 0; i < n; i++) for (j = i; j < n; j++)",
      "O(n²)",
      "n + (n−1) + … + 1 = n(n+1)/2 iterations, which is still quadratic.",
    ],
    [
      "for (i = 0; i < n; i++) for (j = 0; j < m; j++)",
      "O(n · m)",
      "Two independent sizes must both appear — do not collapse this to O(n²).",
    ],
    [
      "for (i = 0; i < n; i++) for (j = 1; j < n; j *= 2)",
      "O(n log n)",
      "A logarithmic loop nested inside a linear one.",
    ],
    [
      "while (low <= high) { ... mid ... }",
      "O(log n)",
      "Each iteration discards half the remaining range, as in binary search.",
    ],
  ];

  const spaceCounts = [
    {
      points: "Auxiliary space — the extra memory your algorithm allocates.",
      subpoints: [
        "Temporary arrays, hash maps, the recursion call stack, and any buffers you create.",
        "This is what people almost always mean when they quote a space complexity.",
      ],
    },
    {
      points: "Input space — the memory the input itself occupies.",
      subpoints: [
        "Total space complexity = input space + auxiliary space, but the input is usually excluded because you had to store it either way.",
      ],
    },
    {
      points: "The call stack — the part everyone forgets.",
      subpoints: [
        "Every pending recursive call holds its parameters and local variables in memory, so recursion depth is a real space cost.",
      ],
    },
  ];

  const stackRows = [
    ["Iterative loop", "O(1)", "No frames are stacked; the loop reuses the same variables."],
    ["Linear recursion (factorial, linked-list traversal)", "O(n)", "n frames are open at the deepest point."],
    ["Binary search, recursive", "O(log n)", "The depth is the number of halvings."],
    ["Merge sort", "O(n)", "O(log n) of stack plus O(n) for the merge buffer — the buffer dominates."],
    ["Quick sort (with tail-call on the larger side)", "O(log n)", "Depth is O(log n) when partitions are balanced, O(n) in the worst case."],
    ["DFS on a graph", "O(V)", "A path can, in the worst case, contain every vertex."],
  ];

  const tradeoffs = [
    {
      points: "Memoization trades memory for repeated work.",
      subpoints: [
        "Naive recursive Fibonacci is O(2ⁿ) time and O(n) space. Caching each result makes it O(n) time and O(n) space — an enormous win for a small, bounded cost.",
      ],
    },
    {
      points: "Hash maps trade memory for lookup speed.",
      subpoints: [
        "Scanning an array for duplicates is O(n²) time and O(1) space. A hash set makes it O(n) time and O(n) space.",
      ],
    },
    {
      points: "Counting sort trades memory for a linear sort.",
      subpoints: [
        "It sorts in O(n + k) time by allocating a bucket for every possible value — fast when the value range k is small, wasteful when it is huge.",
      ],
    },
    {
      points: "In-place algorithms trade speed or simplicity for memory.",
      subpoints: [
        "Heap sort sorts in O(n log n) time with O(1) auxiliary space, but it is slower in practice than merge sort, which needs O(n) extra memory.",
      ],
    },
  ];

  const dsRows = [
    ["Array (static)", "O(1)", "O(n)", "O(n)", "O(n)", "Access by index is the one thing arrays do instantly."],
    ["Dynamic array", "O(1)", "O(n)", "O(1)*", "O(n)", "*Amortized for appends; a resize copy is O(n)."],
    ["Singly linked list", "O(n)", "O(n)", "O(1)", "O(1)", "Insert/delete are O(1) only when you already hold the node."],
    ["Hash table", "—", "O(1)", "O(1)", "O(1)", "Average case; degrades to O(n) with heavy collisions."],
    ["Balanced BST", "O(log n)", "O(log n)", "O(log n)", "O(log n)", "Keeps data sorted, unlike a hash table."],
    ["Binary heap", "O(1) (min/max)", "O(n)", "O(log n)", "O(log n)", "Only the extreme element is cheap to reach."],
  ];

  const sortRows = [
    ["Bubble sort", "O(n)", "O(n²)", "O(n²)", "O(1)", "Yes"],
    ["Selection sort", "O(n²)", "O(n²)", "O(n²)", "O(1)", "No"],
    ["Insertion sort", "O(n)", "O(n²)", "O(n²)", "O(1)", "Yes"],
    ["Merge sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)", "Yes"],
    ["Quick sort", "O(n log n)", "O(n log n)", "O(n²)", "O(log n)", "No"],
    ["Heap sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(1)", "No"],
    ["Counting sort", "O(n + k)", "O(n + k)", "O(n + k)", "O(k)", "Yes"],
  ];

  const budgetRows = [
    ["n ≤ 10–12", "O(n!)", "Permutations, brute-force travelling salesman."],
    ["n ≤ 20–25", "O(2ⁿ)", "Subset enumeration, bitmask dynamic programming."],
    ["n ≤ 500", "O(n³)", "Floyd–Warshall, matrix multiplication."],
    ["n ≤ 5,000", "O(n²)", "Nested loops over all pairs."],
    ["n ≤ 10⁶", "O(n log n)", "Sorting, heaps, divide and conquer."],
    ["n ≤ 10⁸", "O(n)", "A single pass, prefix sums, counting."],
    ["n is huge", "O(log n) / O(1)", "Binary search, direct formula, hash lookup."],
  ];

  const recipe = [
    {
      points: "Decide what n actually is.",
      subpoints: [
        "The number of array elements, the number of nodes and edges, the length of the string, the number of digits — name it before you count anything.",
      ],
    },
    {
      points: "Find the deepest, most-repeated block of work.",
      subpoints: [
        "The complexity is almost always decided by the innermost statement of the deepest loop or the recursion.",
      ],
    },
    {
      points: "Count how many times that block runs, in terms of n.",
      subpoints: ["Multiply nested loops, add sequential ones."],
    },
    {
      points: "Check whether every operation inside is really O(1).",
      subpoints: [
        "Slicing a list, concatenating strings, or calling `in` on an array inside a loop quietly adds a factor of n.",
      ],
    },
    {
      points: "Drop constants and lower-order terms.",
      subpoints: ["3n² + 10n + 50 becomes O(n²)."],
    },
    {
      points: "Repeat the whole process for memory.",
      subpoints: [
        "Count the largest data structure alive at any one moment, and add the maximum recursion depth.",
      ],
    },
  ];

  const mistakes = [
    {
      points: "Assuming a built-in function is free.",
      subpoints: [
        "arr.includes(x), list.index(x), string concatenation in a loop and array.shift() are not O(1). A single innocent-looking call inside a loop is the most common cause of an accidental O(n²).",
      ],
    },
    {
      points: "Collapsing two different sizes into one.",
      subpoints: [
        "Looping over n rows and m columns is O(n · m). Writing O(n²) is only correct when n and m are genuinely the same quantity.",
      ],
    },
    {
      points: "Forgetting the recursion stack in space analysis.",
      subpoints: [
        'A recursive function that allocates nothing is still not O(1) space — a depth-n recursion holds n frames, which is exactly why deep recursion throws a "maximum call stack size exceeded" error.',
      ],
    },
    {
      points: "Confusing the worst case with Big-O.",
      subpoints: [
        "They are separate axes. Big-O is an upper bound on growth; best/average/worst describes which input you are analysing. You can legitimately say an algorithm is O(1) in the best case.",
      ],
    },
    {
      points: "Ignoring constants entirely in real code.",
      subpoints: [
        "Two O(n) passes over a billion items really is twice as slow as one. Asymptotics choose the approach; constants decide whether the implementation is good.",
      ],
    },
    {
      points: "Counting the output as auxiliary space when it is required.",
      subpoints: [
        "If a problem asks you to return an array of n results, that array is output space, not overhead. State clearly which convention you are using.",
      ],
    },
  ];

  const faqs = [
    {
      q: "Is time complexity the same as running time?",
      a: "No. Running time is a measurement in seconds on one machine with one input. Time complexity is a function describing how the operation count grows as the input grows. Two programs with the same complexity can differ tenfold in seconds; the complexity still tells you which one wins as n gets large.",
    },
    {
      q: "Which matters more, time or space?",
      a: "On modern hardware, time usually matters more, because memory is comparatively cheap and plentiful. The exception is any environment with a hard memory ceiling — embedded devices, large datasets that must stay in RAM, or a competitive-programming problem with a 256 MB limit — where an O(n) algorithm that allocates O(n²) memory simply cannot run.",
    },
    {
      q: "Does an O(1) algorithm always beat an O(n) one?",
      a: "Asymptotically yes, but not necessarily at the sizes you care about. O(1) only means the cost does not grow with n; that constant could be enormous. For small inputs, a simple O(n) scan often beats a clever O(1) structure with expensive setup.",
    },
    {
      q: "How do I find the space complexity of a recursive function?",
      a: "Take the maximum depth of the recursion tree and multiply it by the space each frame uses, then add any data structures allocated outside the recursion. Depth, not the total number of calls, is what counts — only the frames on the current path are alive at once.",
    },
    {
      q: "What does amortized complexity mean here?",
      a: "It is the average cost per operation across a long sequence of operations, rather than the cost of the worst single one. Appending to a dynamic array is O(n) on the rare resize, but O(1) amortized, because those expensive resizes are spread over many cheap appends.",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <Section title="What Are Time and Space Complexity?">
          <P>
            Every algorithm consumes two resources: the work it performs and the
            memory it holds while performing it. <b>Time complexity</b> describes
            how the number of operations grows as the input grows.{" "}
            <b>Space complexity</b> describes how the amount of memory grows as
            the input grows. Both are written as functions of the input size,
            conventionally called <b>n</b>, and both are expressed with
            asymptotic notation such as O(n) or O(log n).
          </P>
          <P>
            The word &quot;grows&quot; is the important one. Neither measure is
            interested in a single number — not milliseconds, not kilobytes. Both
            answer the same shaped question: <i>if the input doubles, what
            happens?</i> An O(n) algorithm does twice the work. An O(n²)
            algorithm does four times the work. An O(log n) algorithm does one
            extra step. That difference is the whole reason the subject exists,
            because it decides whether your program still works when the data
            gets big.
          </P>
        </Section>

        <Section title="Why Not Just Measure Seconds and Megabytes?">
          <P>
            Timing code with a stopwatch is genuinely useful — it is called
            benchmarking, and you should do it before optimising anything. But it
            cannot replace complexity analysis, for four reasons:
          </P>
          <List items={whyNotSeconds} />
          <Callout>
            Benchmarking tells you how fast your program is <b>today, on this
            machine, with this data</b>. Complexity tells you how fast it will
            still be next year, when the data is a hundred times larger.
          </Callout>
        </Section>

        <Section title="The Machine Model Behind the Count">
          <P>
            To count operations at all, you need to agree on what one operation
            is. Analysis uses a simplified machine called the <b>RAM model</b>,
            in which each of the following costs one unit of time:
          </P>
          <List items={constantOps} />
          <P>
            The model is a deliberate simplification — it ignores CPU caches,
            branch prediction and memory latency, all of which matter in real
            benchmarks. What it buys you is a count that is independent of any
            particular processor, which is exactly what makes complexity
            portable knowledge rather than a property of your laptop.
          </P>
        </Section>

        <Section title="Counting Operations: A Worked Example">
          <P>
            Take a function that sums an array. To find its time complexity, count
            how many times each line executes for an input of size n:
          </P>
          <CodeSample>{`function sumArray(arr) {
  let total = 0;                     // 1 operation
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];                 // runs n times
  }
  return total;                      // 1 operation
}`}</CodeSample>
          <Table
            headers={["Statement", "Times executed", "Why"]}
            rows={countingRows}
          />
          <P>
            Adding the column gives T(n) = 3n + 4. Now apply the two
            simplification rules: drop the lower-order term (the constant 4) and
            drop the constant factor (the 3). What remains is <b>O(n)</b> — the
            cost is proportional to the number of elements, which matches the
            intuition that you must look at every element to add it up.
          </P>
          <P>
            The space analysis of the same function is shorter. It allocates
            exactly two variables, <code>total</code> and <code>i</code>, no
            matter whether the array holds ten elements or ten million. That is{" "}
            <b>O(1)</b> auxiliary space.
          </P>
        </Section>

        <Section title="Best, Worst and Average Case">
          <P>
            Two inputs of the same size can cost wildly different amounts, so a
            single number is often not enough. Linear search is the classic
            illustration — it stops as soon as it finds the target:
          </P>
          <CodeSample>{`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;   // may exit on the first iteration
  }
  return -1;                           // or run all the way to the end
}`}</CodeSample>
          <Table
            headers={["Case", "Input that causes it", "Complexity", "Comparisons"]}
            rows={caseRows}
            firstColMono={false}
          />
          <P>
            The average case assumes every position is equally likely, which
            gives n/2 comparisons — still O(n) after dropping the constant. In
            practice the worst case is quoted most often, because it is the only
            one that comes with a guarantee. The average case matters when an
            algorithm&apos;s worst case is rare and pathological, which is
            precisely the argument for using quick sort despite its O(n²) worst
            case.
          </P>
          <Callout>
            Best, average and worst describe <b>which input</b> you are analysing.
            O, Ω and Θ describe <b>which kind of bound</b> you are stating. They
            are independent choices, so &quot;the worst case is Θ(n²)&quot; and
            &quot;the best case is O(1)&quot; are both well-formed statements.
          </Callout>
        </Section>

        <Section title="Time Complexity of Common Loop Patterns">
          <P>
            Most analysis in practice comes down to recognising loop shapes. These
            patterns cover the large majority of code you will ever need to
            analyse:
          </P>
          <Table
            headers={["Loop pattern", "Complexity", "Reasoning"]}
            rows={loopRows}
          />
          <P>
            Two rules generate every row in that table. <b>Nested loops
            multiply</b>, because the inner loop restarts for each outer
            iteration. <b>Sequential loops add</b>, and since the sum is
            dominated by its largest term, an O(n) loop followed by an O(n²) loop
            is simply O(n²).
          </P>

          <InContentAd />
        </Section>

        <Section title="Analysing Recursive Code">
          <P>
            A recursive function does not wear its cost on its sleeve, because the
            work is spread across a tree of calls. The standard technique is to
            write a <b>recurrence relation</b> — an equation that defines the cost
            of size n in terms of smaller sizes — and then solve it.
          </P>
          <CodeSample>{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;             // O(1)
  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid));  // T(n/2)
  const right = mergeSort(arr.slice(mid));     // T(n/2)
  return merge(left, right);                   // O(n)
}`}</CodeSample>
          <P>
            Reading that directly off the code gives T(n) = 2T(n/2) + O(n): two
            subproblems of half the size, plus a linear merge. Solving it yields
            O(n log n) — there are log₂n levels of recursion, and every level does
            a total of O(n) work merging.
          </P>
          <P>
            Solving recurrences is a topic of its own, with three standard tools:
            the Master Theorem, the substitution method and the recursion tree
            method. Each has its own module in this series.
          </P>
        </Section>

        <Section title="What Space Complexity Actually Counts">
          <P>
            Space complexity is measured the same way as time — as growth, not as
            a byte count — but it is split into parts that are easy to confuse:
          </P>
          <List items={spaceCounts} />
          <P>
            Unless a problem says otherwise, &quot;space complexity&quot; means
            auxiliary space. An in-place sort that rearranges the array it was
            given is O(1) space, even though the array itself occupies n slots,
            because the algorithm added nothing of its own.
          </P>
        </Section>

        <Section title="The Hidden Cost of the Call Stack">
          <P>
            Recursion allocates memory even when your code contains no{" "}
            <code>new</code>, no array literal and no map. Each pending call keeps
            a stack frame alive, and the peak is set by the <b>depth</b> of the
            recursion, not by the total number of calls:
          </P>
          <Table
            headers={["Algorithm", "Stack space", "Why"]}
            rows={stackRows}
            firstColMono={false}
          />
          <P>
            This is the difference between an iterative and a recursive solution
            that otherwise look equivalent. Iterative binary search is O(1)
            space; the recursive version is O(log n). For binary search that
            difference is negligible, but for a recursion that descends n levels
            deep it is the difference between running and crashing.
          </P>
        </Section>

        <Section title="The Time–Space Trade-off">
          <P>
            Time and space can very often be exchanged for one another. Spending
            memory to avoid recomputation is the single most productive
            optimisation in algorithm design:
          </P>
          <List items={tradeoffs} />
          <P>
            The trade-off is not automatically worth taking. Extra memory means
            extra allocation, worse cache behaviour and, past a point, no memory
            left at all. The judgement is always the same question: is the work I
            am saving larger than the cost of the memory I am spending?
          </P>
        </Section>

        <Section title="Complexity of Common Data Structure Operations">
          <P>
            Choosing a data structure is choosing a set of complexities. This
            table is the reason a hash map is not always better than an array, and
            why a linked list is not always better than a dynamic array:
          </P>
          <Table
            headers={["Structure", "Access", "Search", "Insert", "Delete", "Notes"]}
            rows={dsRows}
            firstColMono={false}
          />
          <P>
            Read it as a set of trade-offs rather than a ranking. Hash tables give
            the best average lookup but lose all ordering, and their worst case is
            linear. Balanced trees are slower per operation but keep the data
            sorted, which makes range queries possible. Arrays have the best
            constant factors of anything on the list, because contiguous memory is
            what CPU caches are built for.
          </P>
        </Section>

        <Section title="Time and Space of Common Sorting Algorithms">
          <P>
            Sorting is where complexity analysis pays off most visibly, because
            the algorithms differ in every column:
          </P>
          <Table
            headers={["Algorithm", "Best", "Average", "Worst", "Space", "Stable"]}
            rows={sortRows}
            firstColMono={false}
          />
          <P>
            Insertion sort&apos;s O(n) best case on nearly-sorted data is why real
            library sorts fall back to it for small or almost-ordered subarrays.
            Quick sort is usually the fastest in practice despite its O(n²) worst
            case, because its constant factors are small and it needs no merge
            buffer. Counting sort escapes the O(n log n) lower bound entirely by
            not comparing elements at all — which it can only do because it
            assumes the keys are small integers.
          </P>
        </Section>

        <Section title="What Complexity Do You Actually Need?">
          <P>
            A modern processor handles very roughly 10⁸ simple operations per
            second. Working backwards from that gives a practical table: given the
            largest input you must support, this is the complexity you need to
            aim for.
          </P>
          <Table
            headers={["Input size", "Complexity you can afford", "Typical technique"]}
            rows={budgetRows}
            firstColMono={false}
          />
          <P>
            Used in reverse, the table is a strong hint. If a problem states that n
            can be up to 200,000, an O(n²) solution would need roughly 4 × 10¹⁰
            operations and is hopeless — so the intended answer is almost
            certainly O(n log n) or better, and you can stop trying to make nested
            loops work.
          </P>
        </Section>

        <Section title="A Recipe for Analysing Any Function">
          <List items={recipe} ordered />
        </Section>

        <Section title="Common Mistakes and Misconceptions">
          <List items={mistakes} />
        </Section>

        <Section title="Frequently Asked Questions">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Key Takeaways">
          <List
            items={[
              { points: "Complexity measures growth as a function of input size, not seconds or bytes." },
              { points: "Time complexity counts operations; space complexity counts the memory alive at the peak, including the recursion stack." },
              { points: "Nested loops multiply, sequential loops add, and only the dominant term survives." },
              { points: "Best, average and worst case describe the input; O, Ω and Θ describe the bound. They are independent." },
              { points: "Memory can usually be traded for speed — memoization, hashing and precomputed tables are all the same bargain." },
              { points: "Let the input size pick your target complexity before you start writing code." },
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
