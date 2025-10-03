"use client";
import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/app/contexts/UserContext";
import Link from "next/link";
import ActivityDashboard from "@/app/components/dashboard/ActivityDashboard";
import Footer from "@/app/components/footer";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState({});
  const [showAllCompleted, setShowAllCompleted] = useState(false);

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

  return (
    <section className="bg-white dark:bg-neutral-900 min-h-screen">
      <div>
        <Navbar />
      </div>
      <main className="max-w-4xl mx-auto px-4 py-24">
        {user && (
          <div className="flex justify-start mb-4">
            <div className="bg-gradient-to-br from-blue-600 shadow-md to-blue-400 rounded-full px-6 py-2">
              <span className="text-lg text-white dark:text-white">
              Welcome, {user.user_metadata?.name || user.email.split("@")[0]}
            </span>
            </div>
          </div>
        )}

        {user && (
          <div className="mb-8">
            <ActivityDashboard userId={user.id} />
          </div>
        )}

        <section className="mb-8">
          <h2 className="text-xl text-gray-800 dark:text-gray-200 mb-4">Modules Completed</h2>
          {(() => {
            const completedModules = modules.filter((mod) => progress[mod.id]?.is_done);
            if (completedModules.length > 0) {
              const modulesToShow = showAllCompleted ? completedModules : completedModules.slice(0, 3);
              return (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {modulesToShow.map((mod) => (
                      <div
                        key={mod.id}
                        className="border dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-neutral-950 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <img
                            src={`/modules/${mod.image}`}
                            alt={mod.title}
                            className="w-full h-40 object-cover rounded-md mb-2"
                          />
                          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 py-2">{mod.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{mod.description}</p>
                        </div>
                        <div className="mt-2 text-right text-xs flex justify-end">
                          <div className="bg-amber-500 px-2 rounded-full py-1">
                            <p className="text-black">Conquered : {new Date(progress[mod.id].updated_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {completedModules.length > 3 && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setShowAllCompleted(!showAllCompleted)}
                        className="px-4 py-2 rounded-lg font-medium bg-gradient-to-br from-blue-600 to-blue-500 text-white hover:bg-blue-700 shadow-lg transition duration-300"
                      >
                        {showAllCompleted ? "Show Less" : "Load More"}
                      </button>
                    </div>
                  )}
                </>
              );
            } else {
              return (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    You haven't completed any modules yet.
                  </p>
                  <Link
                    href="/visualizer"
                    className="px-4 py-2 rounded-full font-medium bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                  >
                    Start Learning
                  </Link>
                </div>
              );
            }
          })()}
        </section>
      </main>

      <div>
       <Footer />
      </div>
    </section>
  );
}