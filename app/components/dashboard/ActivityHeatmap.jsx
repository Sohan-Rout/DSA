import React, { useMemo } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// GitHub-style: only every other row is labelled so the column stays readable.
const LABELLED_ROWS = new Set([1, 3, 5]);

const LEVEL_CLASS = [
  "bg-grid-0",
  "bg-grid-1",
  "bg-grid-2",
  "bg-grid-3",
  "bg-grid-4",
];

// Local YYYY-MM-DD. toISOString() would shift the date for anyone west of
// UTC, which silently mis-buckets activity by a day.
function toKey(date) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

/**
 * `activity` accepts either an array of date strings (binary: active/not) or a
 * Map/object of date -> count. Counts render as graded intensity; a bare list
 * renders every active day at level 2 so it still reads as a heatmap.
 */
function ActivityHeatmap({ activityDates = [], counts = null, weeks: weekCount = 26 }) {
  const { weeks, monthLabels, total, activeDays } = useMemo(() => {
    const countMap =
      counts instanceof Map
        ? counts
        : new Map(
            counts
              ? Object.entries(counts)
              : activityDates.map((d) => [d, 1])
          );

    // Walk back to the Sunday that starts the earliest visible week so the
    // grid always has clean 7-day columns.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(today);
    const start = new Date(today);
    start.setDate(start.getDate() - (weekCount * 7 - 1));
    start.setDate(start.getDate() - start.getDay());

    const cols = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      const col = [];
      for (let i = 0; i < 7; i++) {
        if (cursor > end) {
          col.push(null);
        } else {
          const key = toKey(cursor);
          col.push({ key, date: new Date(cursor), count: countMap.get(key) ?? 0 });
        }
        cursor.setDate(cursor.getDate() + 1);
      }
      cols.push(col);
    }

    // Month label sits above the first column that contains that month's 1st-7th.
    const labels = cols.map((col) => {
      const first = col.find(Boolean);
      if (!first) return "";
      return first.date.getDate() <= 7
        ? first.date.toLocaleString("default", { month: "short" })
        : "";
    });

    let sum = 0;
    let days = 0;
    countMap.forEach((c) => {
      sum += c;
      if (c > 0) days += 1;
    });

    return { weeks: cols, monthLabels: labels, total: sum, activeDays: days };
  }, [activityDates, counts, weekCount]);

  // Scale levels against the busiest day so the ramp always uses its full range.
  const max = useMemo(
    () => weeks.flat().reduce((m, c) => (c && c.count > m ? c.count : m), 0),
    [weeks]
  );

  const levelFor = (count) => {
    if (!count) return 0;
    if (max <= 1) return 2;
    return Math.min(4, Math.max(1, Math.ceil((count / max) * 4)));
  };

  return (
    <figure className="m-0">
      <figcaption className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-sm font-medium text-fg">
          {activeDays} active {activeDays === 1 ? "day" : "days"}
        </h3>
        <span className="text-xs text-fg-subtle">
          Last {weekCount} weeks
        </span>
      </figcaption>

      {/* The grid is wider than a phone; it scrolls in its own track so the
          page body never scrolls sideways. */}
      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex min-w-max gap-1">
          <div
            className="grid shrink-0 gap-1 pr-1 pt-5"
            style={{ gridTemplateRows: "repeat(7, 0.75rem)" }}
            aria-hidden="true"
          >
            {WEEKDAYS.map((day, i) => (
              <div
                key={day}
                className="flex h-3 items-center text-[10px] leading-none text-fg-subtle"
              >
                {LABELLED_ROWS.has(i) ? day : ""}
              </div>
            ))}
          </div>

          <div>
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: `repeat(${weeks.length}, 0.75rem)` }}
              aria-hidden="true"
            >
              {monthLabels.map((label, i) => (
                <div
                  key={i}
                  className="h-4 text-[10px] leading-4 text-fg-subtle"
                >
                  {label}
                </div>
              ))}
            </div>

            <div
              className="grid grid-flow-col gap-1"
              style={{ gridTemplateRows: "repeat(7, 0.75rem)" }}
              role="img"
              aria-label={`Activity heatmap: ${activeDays} active days out of the last ${weekCount * 7}.`}
            >
              {weeks.map((col, ci) =>
                col.map((cell, ri) =>
                  cell === null ? (
                    <div key={`${ci}-${ri}`} className="h-3 w-3" />
                  ) : (
                    <div
                      key={cell.key}
                      title={`${cell.date.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })} — ${cell.count || "no"} ${
                        cell.count === 1 ? "activity" : "activities"
                      }`}
                      className={`h-3 w-3 rounded-[3px] ring-1 ring-inset ring-black/[0.04] transition-colors duration-150 dark:ring-white/[0.04] ${
                        LEVEL_CLASS[levelFor(cell.count)]
                      }`}
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-fg-subtle">
        <span>Less</span>
        {LEVEL_CLASS.map((cls) => (
          <span
            key={cls}
            className={`h-3 w-3 rounded-[3px] ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.04] ${cls}`}
          />
        ))}
        <span>More</span>
      </div>
    </figure>
  );
}

export default ActivityHeatmap;
