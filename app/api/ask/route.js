import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { prompt } = await req.json();

  const systemPrompt = `
You're an expert DSA tutor helping beginners. 
Explain only DSA concepts with code, examples, and clarity.
Don't talk about anything else. Stay focused on Data Structures and Algorithms.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
  });

  const response = completion.choices[0].message.content;
  return new Response(JSON.stringify({ response }), {
    headers: { "Content-Type": "application/json" },
  });
}