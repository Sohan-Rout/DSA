"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/app/contexts/UserContext";

export default function ModuleCard({ moduleId, title, description, initialDone }) {
  const { user } = useUser();
  const [isDone, setIsDone] = useState(initialDone);

  async function toggleCompletion() {
    if (!user) return;

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
      className={`border rounded-lg p-4 shadow-sm flex flex-col justify-between ${
        isDone ? "bg-green-50 dark:bg-green-900/30" : "bg-white dark:bg-zinc-900"
      }`}
    >
      <div>
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <label className="mt-4 flex items-center space-x-2 cursor-pointer text-sm">
        <input
          type="checkbox"
          checked={isDone}
          onChange={toggleCompletion}
          className="accent-blue-600"
        />
        <span className="text-gray-700 dark:text-gray-300">
          {isDone ? "Marked as Done" : "Mark as Done"}
        </span>
      </label>
    </div>
  );
}