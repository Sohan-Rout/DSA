"use client";
import Navbar from "@/app/components/navbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/app/contexts/UserContext";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Compass } from "lucide-react";
import ActivityDashboard from "@/app/components/dashboard/ActivityDashboard";
import Footer from "@/app/components/footer";

const PREVIEW_COUNT = 6;

function ModulesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-line bg-card">
          <div className="skeleton aspect-16/10 w-full" />
          <div className="space-y-2 p-4">
            <div className="skeleton h-4 w-2/3 rounded" />
            <div className="skeleton h-3 w-full rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const fetchModules = useCallback(async (userId) => {
    setLoading(true);
    const [{ data: modulesData }, { data: progressData }] = await Promise.all([
      supabase.from("modules").select("*"),
      supabase.from("user_progress").select("*").eq("user_id", userId),
    ]);

    const progressMap = {};
    (progressData ?? []).forEach((item) => {
      progressMap[item.module_id] = {
        is_done: item.is_done,
        updated_at: item.updated_at,
      };
    });

    setModules(modulesData ?? []);
    setProgress(progressMap);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchModules(user.id);
    // Deliberately does NOT mark activity — reading your own stats isn't
    // studying. Activity is recorded from ModuleCard on the learning pages.
  }, [user, fetchModules, router]);

  const completed = useMemo(
    () => modules.filter((m) => progress[m.id]?.is_done),
    [modules, progress]
  );

  const shown = showAll ? completed : completed.slice(0, PREVIEW_COUNT);
  const firstName = user?.user_metadata?.name || user?.email?.split("@")[0] || "there";

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-28 pb-20 sm:px-6">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1.5 text-sm text-fg-muted">
            Here&apos;s how your learning is going.
          </p>
        </header>

        {user && (
          <section className="mb-10" aria-label="Your activity">
            <ActivityDashboard
              userId={user.id}
              modulesCompleted={loading ? null : completed.length}
            />
          </section>
        )}

        <section aria-labelledby="completed-heading">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2
              id="completed-heading"
              className="text-lg font-semibold tracking-tight text-fg"
            >
              Completed modules
            </h2>
            {!loading && completed.length > 0 && (
              <span className="text-sm tabular-nums text-fg-subtle">
                {completed.length} of {modules.length}
              </span>
            )}
          </div>

          {loading ? (
            <ModulesSkeleton />
          ) : completed.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line-strong bg-card px-6 py-14 text-center">
              <span
                className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent"
                aria-hidden="true"
              >
                <Compass size={20} strokeWidth={2.25} />
              </span>
              <h3 className="text-base font-medium text-fg">Nothing finished yet</h3>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-fg-muted">
                Work through a visualizer and mark it done — it&apos;ll show up
                here and feed your streak.
              </p>
              <Link
                href="/visualizer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-colors duration-150 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
              >
                Start learning
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((mod) => (
                  <li
                    key={mod.id}
                    className="group flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors duration-150 hover:bg-card-hover"
                  >
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-inset">
                      <Image
                        src={`/modules/${mod.image}`}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <span
                        className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-grid-4 text-white shadow-sm"
                        title="Completed"
                      >
                        <Check size={14} strokeWidth={3} />
                        <span className="sr-only">Completed</span>
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-sm font-semibold text-fg">{mod.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-fg-muted">
                        {mod.description}
                      </p>
                      <p className="mt-3 pt-3 text-xs text-fg-subtle border-t border-line">
                        Completed{" "}
                        <time dateTime={progress[mod.id].updated_at}>
                          {new Date(progress[mod.id].updated_at).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric", year: "numeric" }
                          )}
                        </time>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {completed.length > PREVIEW_COUNT && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAll((v) => !v)}
                    className="rounded-full border border-line-strong px-5 py-2 text-sm font-medium text-fg transition-colors duration-150 hover:bg-card-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
                  >
                    {showAll
                      ? "Show less"
                      : `Show all ${completed.length}`}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
