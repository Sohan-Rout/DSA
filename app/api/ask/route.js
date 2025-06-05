import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req) {
  const { prompt } = await req.json();

  const systemPrompt = `
You're an expert DSA tutor helping beginners. 
Explain only DSA concepts with code, examples, and clarity.
Don't talk about anything else. Stay focused on Data Structures and Algorithms.
`;

  let completion;
  let error;
  for (let i = 0; i < 3; i++) {
    try {
      completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      });
      break; // exit loop on success
    } catch (err) {
      error = err;
      console.error(`Attempt ${i + 1} failed:`, err.message);
      if (i === 2) {
        return new Response(
          JSON.stringify({ error: "OpenAI API failed after 3 attempts", message: err.message }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }

  const response = completion.choices[0].message.content;
  return new Response(JSON.stringify({ response }), {
    headers: { "Content-Type": "application/json" },
  });
}