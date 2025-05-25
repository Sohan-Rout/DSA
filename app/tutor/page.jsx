"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AITutorPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Auth check
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  // Load user's chat history
  useEffect(() => {
    const loadChats = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (data.length === 0) {
        // Show greeting if first-time user
        const welcome = {
          message: "Welcome to your DSA journey! 🎓 Ask me anything about DSA.",
          response: "",
          from: "system",
        };
        setChats([welcome]);
      } else {
        setChats(data);
      }
    };

    loadChats();
  }, [user]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const input = message.trim();
    setMessage("");
    setLoading(true);

    const newChat = { user_id: user.id, message: input };

    // Add user message to UI
    setChats((prev) => [...prev, { message: input, response: "Thinking..." }]);

    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
    });

    const { response } = await res.json();

    // Store to Supabase
    await supabase.from("chats").insert([
      {
        user_id: user.id,
        message: input,
        response,
      },
    ]);

    setChats((prev) =>
      prev.map((chat, i) =>
        i === prev.length - 1 ? { ...chat, response } : chat
      )
    );
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💬 Your DSA Tutor</h1>
      <div className="space-y-2 mb-4 max-h-[70vh] overflow-y-auto">
        {chats.map((chat, i) => (
          <div key={i} className="bg-gray-100 p-3 rounded">
            <p><strong>You:</strong> {chat.message}</p>
            {chat.response && (
              <p><strong>AI:</strong> {chat.response}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Ask your DSA doubt..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Wait..." : "Send"}
        </button>
      </div>
    </div>
  );
}