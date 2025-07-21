"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/app/contexts/UserContext";
import { toast } from "react-hot-toast";
import { TriangleAlert } from "lucide-react";

export default function ModuleCard({ moduleId, description, initialDone }) {
  const { user } = useUser();
  const [isDone, setIsDone] = useState(initialDone);

  async function toggleCompletion() {
    if (!user) {
      toast.custom((t) => (
        <div className="max-w-sm w-full bg-neutral-100 dark:bg-zinc-800 border border-blue-500 rounded-lg shadow-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <TriangleAlert size={50} className="dark:text-yellow-500 text-red-500" />
            <span className="text-sm text-gray-800 dark:text-gray-100">
              You are in guest mode. Login or signup to track your progress.
            </span>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                window.location.href = "/login";
                toast.dismiss(t.id);
              }}
              className="px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md flex items-center gap-2"
            >
              Login/Signup
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 rounded-full font-medium bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 border border-blue-500 dark:text-white text-black transition duration-300 shadow-lg flex items-center"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      ));
      return;
    }

    const { error } = await supabase.from("user_progress").upsert({
      user_id: user.id,
      module_id: moduleId,
      is_done: !isDone,
    });

    if (error) {
      console.error(error);
      return;
    }

    setIsDone(!isDone);
  }

  return (
    <div
      className={`border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto rounded-lg p-4 shadow-lg flex flex-col justify-between ${
        isDone ? "bg-green-50 dark:bg-green-900/30" : "bg-white dark:bg-zinc-950"
      }`}
    >
      <div className="my-4 px-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Done With the Learning
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <input
          type="checkbox"
          checked={isDone}
          onChange={toggleCompletion}
          className={`w-6 h-6 rounded cursor-pointer transition duration-300 ${
            isDone ? "accent-green-500 ring-2 ring-green-500" : "accent-blue-600"
          }`}
        />
      </div>
    </div>
  );
}