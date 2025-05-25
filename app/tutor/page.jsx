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

  // Check auth
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

  // Load chats
  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (data) setChats(data);
    };
    fetchChats();
  }, [user]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const input = message.trim();
    setChats((prev) => [...prev, { message: input, response: "Thinking..." }]);
    setMessage("");

    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
    });

    const { response } = await res.json();

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
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Tutor (DSA Assistant)</h1>
      <div className="space-y-2 mb-4">
        {chats.map((chat, i) => (
          <div key={i} className="bg-gray-100 p-2 rounded">
            <p><strong>You:</strong> {chat.message}</p>
            <p><strong>AI:</strong> {chat.response}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Ask your DSA doubt..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}