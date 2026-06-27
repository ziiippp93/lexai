import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `Ты опытный российский юрист. Консультируешь по вопросам гражданского, трудового, семейного и уголовного права РФ. Отвечай чётко, профессионально, на русском языке. Всегда уточняй что это общая консультация и рекомендуй обратиться к адвокату для конкретного дела.`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    max_tokens: 2048,
  });

  const text = response.choices[0]?.message?.content ?? "";

  return Response.json({ text });
}
