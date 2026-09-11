/**
 * Complexity curves, drawn as inline SVG in the same visual language as the
 * BoundDiagram on the design-and-analysis pages: thin slate axes, no grid,
 * 2.5px rounded strokes and a colour key underneath.
 *
 * This replaced a recharts LineChart. recharts was ~370 KiB and had to be code
 * split and lazy-loaded behind an IntersectionObserver to keep it off the
 * critical path; a hand-drawn plot costs nothing, needs no placeholder box to
 * avoid layout shift, and server-renders, so the graph is in the HTML rather
 * than appearing after hydration.
 *
 * The prop shape is unchanged from the recharts version so the 49 module call
 * sites did not have to be touched.
 */

// Legend order is the order a reader expects: best, average, worst.
const CURVES = [
  { key: "bestCase", label: "Best Case", color: "#10b981", dashed: false },
  { key: "averageCase", label: "Average Case", color: "#3b82f6", dashed: true },
  { key: "worstCase", label: "Worst Case", color: "#ef4444", dashed: false },
];

// Paint order is not legend order. Curves coincide exactly in most modules —
// bubble sort's average and worst are both n², linear search's best and average
// are both n — and whichever is painted last wins. Average is therefore drawn
// last and dashed, so it stays visible whichever of the other two it lies on
// top of, and the solid line showing through its gaps identifies that one.
const PAINT_ORDER = ["worstCase", "bestCase", "averageCase"];

const W = 480;
const H = 260;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 18;
const PAD_B = 38;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;
const SAMPLES = 80;

const ComplexityGraph = ({
  bestCase = null,
  averageCase = null,
  worstCase = null,
  maxN = 100,
  title = "Time Complexity Analysis",
}) => {
  const fns = { bestCase, averageCase, worstCase };
  const active = CURVES.filter((c) => typeof fns[c.key] === "function");

  // Sample from n = 1: several modules plot log2(n), which is -Infinity at 0.
  const span = Math.max(1, maxN - 1);
  const ns = Array.from(
    { length: SAMPLES + 1 },
    (_, i) => 1 + (i / SAMPLES) * span
  );

  const valuesOf = (fn) => ns.map((n) => fn(n)).map((v) => (Number.isFinite(v) ? v : null));
  const series = active.map((c) => ({ ...c, values: valuesOf(fns[c.key]) }));

  const yMax = Math.max(
    1e-9,
    ...series.flatMap((s) => s.values.filter((v) => v !== null))
  );

  const toX = (n) => PAD_L + ((n - 1) / span) * PLOT_W;
  const toY = (y) => PAD_T + PLOT_H - (y / yMax) * PLOT_H;

  const pointsFor = (values) =>
    values
      .map((v, i) => (v === null ? null : `${toX(ns[i]).toFixed(1)},${toY(v).toFixed(1)}`))
      .filter(Boolean)
      .join(" ");

  if (active.length === 0) return null;

  return (
    <figure className="not-prose my-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full"
        style={{ maxWidth: `${W}px` }}
        role="img"
        aria-label={`${title}: ${active.map((c) => c.label).join(", ")} plotted against input size up to n = ${maxN}.`}
      >
        <line
          x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + PLOT_H}
          stroke="#94a3b8" strokeWidth="1"
        />
        <line
          x1={PAD_L} y1={PAD_T + PLOT_H} x2={W - PAD_R} y2={PAD_T + PLOT_H}
          stroke="#94a3b8" strokeWidth="1"
        />

        {PAINT_ORDER.map((k) => series.find((s) => s.key === k))
          .filter(Boolean)
          .map((s) => (
          <polyline
            key={s.key}
            points={pointsFor(s.values)}
            fill="none"
            stroke={s.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={s.dashed ? "6 4" : undefined}
          />
        ))}

        <text x={PAD_L - 6} y={PAD_T + 8} textAnchor="end" fill="#64748b" fontSize="10">
          cost
        </text>
        <text x={PAD_L} y={PAD_T + PLOT_H + 15} textAnchor="middle" fill="#64748b" fontSize="10">
          1
        </text>
        <text
          x={W - PAD_R} y={PAD_T + PLOT_H + 15}
          textAnchor="end" fill="#64748b" fontSize="10"
        >
          {maxN}
        </text>
        <text
          x={W - PAD_R} y={PAD_T + PLOT_H + 30}
          textAnchor="end" fill="#64748b" fontSize="10"
        >
          input size (n)
        </text>
      </svg>

      <figcaption className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
        {series.map((s) => (
          <span key={`key-${s.key}`} className="flex items-center gap-1.5">
            <span
              className="inline-block h-0.5 w-4 rounded-full"
              style={{
                backgroundColor: s.dashed ? "transparent" : s.color,
                backgroundImage: s.dashed
                  ? `repeating-linear-gradient(to right, ${s.color} 0 5px, transparent 5px 9px)`
                  : undefined,
              }}
            />
            {s.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
};

export default ComplexityGraph;
