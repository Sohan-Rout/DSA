"use client";
import ComplexityGraph from "@/app/components/ui/graph";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// Unlike a plain queue, a deque grows and shrinks at either end, so elements
// are placed on fixed slots and the live run just moves within them. That way
// an item leaving the front and one leaving the rear both stay put visually.
const DequeStepDiagram = ({
  values,
  startSlot,
  slots,
  arrived,
  ghost,
  keyPrefix,
}) => {
  const boxSize = 40;
  const gap = 8;
  const paddingX = 8;
  const topPadding = 34;

  const width = slots * (boxSize + gap) - gap + paddingX * 2;
  const boxY = topPadding;

  const slotX = (slot) => paddingX + slot * (boxSize + gap);
  const slotCx = (slot) => slotX(slot) + boxSize / 2;
  const cx = (idx) => slotCx(startSlot + idx);

  const noteY = boxY + boxSize + 18;
  const footerY = boxY + boxSize + 34;
  const height = footerY + 8;

  const fillFor = (idx) => (idx === arrived ? "#10b981" : "#3b82f6");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="deque diagram"
    >
      <defs>
        <marker
          id={`${keyPrefix}-front-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#3b82f6" />
        </marker>
        <marker
          id={`${keyPrefix}-rear-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#10b981" />
        </marker>
      </defs>

      {values.length > 0 && (
        <>
          <text
            x={cx(0)}
            y="10"
            textAnchor="middle"
            className="fill-blue-500 dark:fill-blue-400"
            fontSize="10"
            fontWeight="700"
          >
            front
          </text>
          <line
            x1={cx(0)}
            y1="14"
            x2={cx(0)}
            y2={boxY - 3}
            stroke="#3b82f6"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-front-arrow)`}
          />
        </>
      )}

      {values.length > 1 && (
        <>
          <text
            x={cx(values.length - 1)}
            y="10"
            textAnchor="middle"
            className="fill-emerald-500 dark:fill-emerald-400"
            fontSize="10"
            fontWeight="700"
          >
            rear
          </text>
          <line
            x1={cx(values.length - 1)}
            y1="14"
            x2={cx(values.length - 1)}
            y2={boxY - 3}
            stroke="#10b981"
            strokeWidth="1.5"
            markerEnd={`url(#${keyPrefix}-rear-arrow)`}
          />
        </>
      )}

      {ghost && (
        <g>
          <rect
            x={slotX(ghost.slot)}
            y={boxY}
            width={boxSize}
            height={boxSize}
            rx="6"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.8"
          />
          <text
            x={slotCx(ghost.slot)}
            y={boxY + boxSize / 2 + 5}
            textAnchor="middle"
            className="fill-gray-400 dark:fill-gray-500"
            fontSize="14"
            fontWeight="700"
          >
            {ghost.value}
          </text>
          <text
            x={slotCx(ghost.slot)}
            y={noteY}
            textAnchor="middle"
            className="fill-amber-600 dark:fill-amber-400"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="700"
          >
            removed
          </text>
        </g>
      )}

      {values.map((val, idx) => (
        <g key={`${keyPrefix}-box-${idx}`}>
          <rect
            x={slotX(startSlot + idx)}
            y={boxY}
            width={boxSize}
            height={boxSize}
            rx="6"
            fill={fillFor(idx)}
            opacity={idx === arrived || idx === 0 ? "0.9" : "0.25"}
            stroke={fillFor(idx)}
            strokeWidth="2"
          />
          <text
            x={cx(idx)}
            y={boxY + boxSize / 2 + 5}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="14"
            fontWeight="700"
          >
            {val}
          </text>
        </g>
      ))}

      {arrived !== undefined && values.length > 1 && (
        <text
          x={cx(arrived)}
          y={noteY}
          textAnchor="middle"
          className="fill-emerald-600 dark:fill-emerald-400"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="700"
        >
          added
        </text>
      )}

      <text
        x={paddingX}
        y={footerY}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
        fontFamily="monospace"
      >
        size {values.length}
      </text>
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `A deque drops the "only one end" restriction of a normal queue: you can insert or remove elements at both the front and the rear, and both directions stay O(1).`,
    `Because it can act like a stack from one end and a queue from the other, a deque is genuinely a hybrid of the two. That flexibility is exactly why it turns up in algorithms that need fast access to both ends of a dataset at once.`,
  ];

  const characteristics = [
    {
      points: "Two open ends:",
      subpoints: ["Supports operations at both front and rear"],
    },
    {
      points: "Four core operations:",
      subpoints: [
        "addFront() - Insert at front",
        "addRear() - Insert at rear",
        "removeFront() - Delete from front",
        "removeRear() - Delete from rear",
      ],
    },
    {
      points: "Hybrid nature:",
      subpoints: ["Combines features of both stacks and queues"],
    },
  ];

  // Fixed slots 0-2: the run shifts within them so each end's action is clear.
  const example = [
    {
      points: "addRear(10): [10]",
      queue: [10],
      startSlot: 1,
      arrived: 0,
    },
    {
      points: "addRear(20): [10, 20] — rear grows to the right",
      queue: [10, 20],
      startSlot: 1,
      arrived: 1,
    },
    {
      points: "addFront(5): [5, 10, 20] — front grows to the left instead",
      queue: [5, 10, 20],
      startSlot: 0,
      arrived: 0,
    },
    {
      points: "removeRear(): Returns 20 → [5, 10]",
      queue: [5, 10],
      startSlot: 0,
      ghost: { value: 20, slot: 2 },
    },
    {
      points: "removeFront(): Returns 5 → [10]",
      queue: [10],
      startSlot: 1,
      ghost: { value: 5, slot: 0 },
    },
  ];

  const complexity = [
    { points: "addFront(): O(1)" },
    { points: "addRear(): O(1)" },
    { points: "removeFront(): O(1)" },
    { points: "removeRear(): O(1)" },
    { points: "peekFront(): O(1)" },
    { points: "peekRear(): O(1)" },
  ];

  const application = [
    { points: "Undo/Redo operations: Store history at both ends" },
    { points: "Palindrome checking: Compare front and rear elements" },
    { points: "Steal algorithms: Work stealing in parallel processing" },
    { points: "Sliding window problems: Efficient maximum/minimum tracking" },
    { points: "Browser history: Navigation in both directions" },
  ];

  const cases = [
    { points: "Input-Restricted Deque: Insertion only at one end" },
    { points: "Output-Restricted Deque: Deletion only at one end" },
    { points: "Palindrome Checker: Using deque properties" },
    { points: "Priority Deque: Combines deque and priority queue features" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is a Double-Ended Queue (Deque)? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is a Double-Ended Queue (Deque)?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[0]}
            </p>
          </div>
        </section>

        {/* Key Characteristics */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Key Characteristics
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Deques have these fundamental properties:
            </p>
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {characteristics.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  {item.subpoints && (
                    <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                      {item.subpoints.map((subitem, subindex) => (
                        <li
                          key={subindex}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {subitem}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* How Does It Work? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Both ends are live. Where a normal queue only lets the rear grow
              and the front shrink, a deque lets either pointer move in either
              direction. Follow this sequence on an initially empty deque:
            </p>

            <ol className="space-y-5 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {example.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                  <div className="mt-3 not-prose">
                    <DequeStepDiagram
                      keyPrefix={`dq-step${index}`}
                      values={item.queue}
                      startSlot={item.startSlot}
                      slots={3}
                      arrived={item.arrived}
                      ghost={item.ghost}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                Just inserted
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                Just removed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                Sitting in the deque
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Steps 2 and 3 are the whole idea: the same deque accepted a new
              element at the rear and then at the front, and the boxes already
              in it never moved. Use only addRear and removeFront and you have
              an ordinary FIFO queue; use only addRear and removeRear and you
              have a stack. That is why a deque is described as a hybrid of the
              two.
            </p>
          </div>
        </section>

        {/* Time Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time Complexity
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {complexity.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {item.points.split(":")[0]}:
                  </span>
                  <span className="ml-2">{item.points.split(":")[1]}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Every operation touches only a pointer at one end, never the
              elements in between, so all six stay flat as the deque grows:
            </p>

            <div className="mt-8">
              <ComplexityGraph
                bestCase={() => 1}
                averageCase={() => 1}
                worstCase={() => 1}
                maxN={25}
              />
            </div>
          </div>

          <InContentAd />
        </section>

        {/* Applications */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Applications
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Deques are used in:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {application.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Special Cases */}
        <section className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Special Cases
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Interesting deque variations:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {cases.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Additional Info */}
        <section className="p-6 border-t border-gray-100 dark:border-gray-700">
          <div className="prose dark:prose-invert max-w-none">
            <div className="px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph[1]}
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
