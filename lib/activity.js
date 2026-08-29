import { supabase } from "@/lib/supabase";
import { toDayKey } from "@/lib/streaks";

// Events already sent this page-session, keyed by user + day + event key.
// Survives client-side navigation; resets on a hard reload, which at worst
// re-counts one module.
const sent = new Set();

/**
 * Records one unit of learning activity for today.
 *
 * Writes through the `mark_activity` RPC rather than a table upsert: the
 * increment (`count = count + 1`) can't be expressed via PostgREST, and the
 * function is SECURITY DEFINER so `user_activity` keeps its INSERT+SELECT
 * RLS policies. It derives the row's user from auth.uid(), so a client can
 * only ever mark its own days.
 *
 * Requires the unique constraint on (user_id, activity_date) — the RPC's
 * ON CONFLICT target.
 *
 * @param {string} userId  - used only for the client-side dedupe key.
 * @param {string} type    - stored on the row for the day's first write.
 * @param {string} [key]   - dedupe granularity. Defaults to `type`, so a bare
 *   call counts once per day. Pass something module-specific (e.g.
 *   `view:${moduleId}`) to count each distinct module once instead.
 */
const trackActivity = async (userId, type = "site_visit", key = type) => {
  if (!userId) return;

  const today = toDayKey(new Date());
  const guard = `${userId}:${today}:${key}`;
  if (sent.has(guard)) return;

  // Claim before awaiting so two concurrent mounts can't both fire.
  sent.add(guard);

  const { error } = await supabase.rpc("mark_activity", {
    p_day: today,
    p_type: type,
  });

  // Let a failed write be retried on the next mount.
  if (error) sent.delete(guard);
};

export { trackActivity };
