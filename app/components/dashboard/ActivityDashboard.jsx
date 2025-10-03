import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import StreakCounter from "@/app/components/dashboard/StreakCounter";
import ActivityHeatmap from "@/app/components/dashboard/ActivityHeatmap";
import {ChartNoAxesCombined} from "lucide-react";

function ActivityDashboard({ userId }) {
  const [activityDates, setActivityDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchActivity() {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_activity")
        .select("activity_date")
        .eq("user_id", userId);

      if (!error && data) {
        const dates = data.map(
          (item) => new Date(item.activity_date).toISOString().split("T")[0]
        );
        setActivityDates(dates);
      }
      setLoading(false);
    }

    fetchActivity();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
        Loading activity...
      </div>
    );
  }

  return (
    <main className="rounded-xl bg-white border border-gray-200 dark:border-gray-700 dark:bg-neutral-950 p-4">
      <div className="flex items-center gap-2">
        <ChartNoAxesCombined className="text-black dark:text-white"/>
        <h1 className="font-poppins text-lg text-black dark:text-white">Your Stats</h1>
      </div>
      <div className="flex items-center justify-center flex-row space-x-6">
        <StreakCounter activityDates={activityDates} />
        <ActivityHeatmap activityDates={activityDates} />
      </div>
    </main>
  );
}

export default ActivityDashboard;
