// Streak maths over a set of YYYY-MM-DD day keys.
//
// Everything works on day keys rather than Date arithmetic: comparing
// timestamps means a `new Date()` carrying a time-of-day never lands exactly
// on a midnight-anchored row, and DST shifts make "one day" 23 or 25 hours.

const DAY_MS = 86400000;

export function toDayKey(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function shiftKey(key, days) {
  const [y, m, d] = key.split("-").map(Number);
  // Local noon dodges the DST edges where midnight +1 day lands back on itself.
  const dt = new Date(y, m - 1, d, 12);
  dt.setDate(dt.getDate() + days);
  return toDayKey(dt);
}

/**
 * @param {string[]} dayKeys - may contain duplicates and arrive unsorted.
 * @returns {{ current: number, longest: number, activeDays: number }}
 */
export function computeStreaks(dayKeys) {
  const unique = [...new Set(dayKeys)].sort();
  if (unique.length === 0) return { current: 0, longest: 0, activeDays: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < unique.length; i++) {
    run = shiftKey(unique[i - 1], 1) === unique[i] ? run + 1 : 1;
    if (run > longest) longest = run;
  }

  // The current streak survives if the user was active today OR yesterday —
  // otherwise it would read 0 all morning until they visit.
  const present = new Set(unique);
  const todayKey = toDayKey(new Date());
  let cursor = present.has(todayKey) ? todayKey : shiftKey(todayKey, -1);
  if (!present.has(cursor)) return { current: 0, longest, activeDays: unique.length };

  let current = 0;
  while (present.has(cursor)) {
    current += 1;
    cursor = shiftKey(cursor, -1);
  }

  return { current, longest, activeDays: unique.length };
}

export { DAY_MS };
