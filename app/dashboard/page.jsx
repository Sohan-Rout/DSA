"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/app/contexts/UserContext";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchModules();
    }
  }, [user]);

  async function fetchModules() {
    const { data: modulesData, error: modulesError } = await supabase
      .from("modules")
      .select("*");

    if (modulesError) {
      console.error(modulesError);
      return;
    }

    const { data: progressData, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id);

    if (progressError) {
      console.error(progressError);
      return;
    }

    const progressMap = {};
    progressData.forEach((item) => {
      progressMap[item.module_id] = item.is_done;
    });

    setModules(modulesData);
    setProgress(progressMap);
  }

  async function toggleDone(moduleId) {
    const newStatus = !progress[moduleId];

    const { error } = await supabase.from("user_progress").upsert({
      user_id: user.id,
      module_id: moduleId,
      is_done: newStatus,
    });

    if (error) {
      console.error(error);
      return;
    }

    setProgress((prev) => ({
      ...prev,
      [moduleId]: newStatus,
    }));
  }

  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">📈 Dashboard</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Track your progress and continue your learning journey!
      </p>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-6 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Progress: {progressPercent}%
      </p>

      <div className="space-y-4">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className={`flex items-center justify-between border rounded-lg p-4 ${
              progress[mod.id] ? "bg-green-50 dark:bg-green-900/30" : "bg-white dark:bg-zinc-900"
            }`}
          >
            <div>
              <h2 className="text-lg font-semibold">{mod.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{mod.description}</p>
            </div>
            <button
              onClick={() => toggleDone(mod.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition duration-300 ${
                progress[mod.id]
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {progress[mod.id] ? "Done" : "Mark as Done"}
            </button>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="mt-8 inline-block text-blue-600 hover:underline transition duration-300"
      >
        ← Back to Home
      </Link>
    </main>
  );
}