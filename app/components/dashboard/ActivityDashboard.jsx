import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Flame, Trophy, CalendarCheck } from "lucide-react";
import ActivityHeatmap from "@/app/components/dashboard/ActivityHeatmap";
import StatTile from "@/app/components/dashboard/StatTile";
import { computeStreaks, toDayKey } from "@/lib/streaks";

function StatsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-line bg-card p-4">
            <div className="flex items-center gap-2.5">
              <div className="skeleton h-8 w-8 rounded-lg" />
              <div className="skeleton h-3 w-24 rounded" />
            </div>
            <div className="skeleton mt-3 h-8 w-12 rounded" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
        <div className="skeleton h-3 w-28 rounded" />
        <div className="skeleton mt-4 h-24 w-full rounded" />
      </div>
    </div>
  );
}

function ActivityDashboard({ userId, modulesCompleted = null }) {
  const [dayKeys, setDayKeys] = useState([]);
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    async function fetchActivity() {
      setLoading(true);
      setError(null);

      // Only the window the heatmap actually draws — this table grows one row
      // per user per day forever, so an unbounded select gets slower every day.
      const since = new Date();
      since.setDate(since.getDate() - 400);

      const { data, error } = await supabase
        .from("user_activity")
        .select("activity_date, count")
        .eq("user_id", userId)
        .gte("activity_date", toDayKey(since))
        .order("activity_date", { ascending: true });

      if (cancelled) return;
      if (error) {
        setError(error.message);
      } else {
        const rows = data ?? [];
        setDayKeys(rows.map((r) => toDayKey(r.activity_date)));
        // The unique constraint guarantees one row per day, so no accumulation
        // is needed. `count` is absent until the column migration runs; fall
        // back to 1 so the grid still renders as binary activity.
        setCounts(
          new Map(rows.map((r) => [toDayKey(r.activity_date), r.count ?? 1]))
        );
      }
      setLoading(false);
    }

    fetchActivity();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const { current, longest } = useMemo(() => computeStreaks(dayKeys), [dayKeys]);

  if (loading) return <StatsSkeleton />;

  if (error) {
    return (
      <div className="rounded-xl border border-line bg-card p-6 text-center">
        <p className="text-sm text-fg-muted">Couldn&apos;t load your activity.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          icon={Flame}
          tone="streak"
          value={current}
          label="Current streak"
          hint={current === 0 ? "Visit today to start one" : `${current === 1 ? "day" : "days"} in a row`}
        />
        <StatTile
          icon={Trophy}
          tone="accent"
          value={longest}
          label="Longest streak"
          hint={longest > 0 && longest === current ? "You're at your best" : "Personal best"}
        />
        <StatTile
          icon={CalendarCheck}
          value={modulesCompleted ?? "—"}
          label="Modules done"
          hint="Across all topics"
        />
      </div>

      <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
        <ActivityHeatmap activityDates={dayKeys} counts={counts} />
      </div>
    </div>
  );
}

export default ActivityDashboard;
