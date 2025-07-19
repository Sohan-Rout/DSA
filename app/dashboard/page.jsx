"use client";
import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/app/contexts/UserContext";
import Link from "next/link";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

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
      progressMap[item.module_id] = {
        is_done: item.is_done,
        updated_at: item.updated_at
      };
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
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div>
        <Navbar />
      </div>
      <main className="max-w-4xl mx-auto px-4 py-24">
        {user && (
          <div className="flex justify-end mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Welcome, {user.user_metadata?.name || user.email.split("@")[0]}
            </span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start mb-8">
          <div className="md:col-span-2 space-y-4">
            {modules.filter((mod) => progress[mod.id]?.is_done).length > 0 ? (
              modules
                .filter((mod) => progress[mod.id]?.is_done)
                .map((mod) => (
                  <div
                    key={mod.id}
                    className="border rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">{mod.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{mod.description}</p>
                    </div>
                    <div className="mt-2 text-right text-xs text-gray-400 dark:text-gray-500">
                      Completed on: {new Date(progress[mod.id].updated_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                Start learning and mark modules as completed to see your progress here.
              </div>
            )}
          </div>
          <div className="border rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-sm">
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">
              📅 Learning Streak
            </h3>
            <Calendar
              onChange={setDate}
              value={date}
              className="w-full rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`flex items-center justify-between border rounded-lg p-4 ${
                progress[mod.id] ? "bg-green-50 dark:bg-green-900/30" : "bg-white dark:bg-zinc-900"
              }`}
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{mod.title}</h2>
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
    </div>
  );
}