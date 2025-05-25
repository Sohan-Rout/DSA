import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req) {
  const { prompt } = await req.json();

  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const response = chat.choices[0].message.content;

  return new Response(JSON.stringify({ response }), {
    headers: { "Content-Type": "application/json" },
  });
}