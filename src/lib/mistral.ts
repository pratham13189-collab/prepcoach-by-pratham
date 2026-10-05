// src/lib/mistral.ts
// AI helper for Prepcoach-AI.
// File name is kept the same so the API routes need no changes.
// Now uses Groq's free API (OpenAI-compatible) through the built-in fetch.

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT =
  "You are an experienced interviewer for electronics and embedded engineering jobs. " +
  "Keep answers clear, technically correct and at the level of a fresh graduate " +
  "or a candidate with 1-2 years of experience.";

// Sends one prompt to the AI and returns the text reply
export async function askMistral(
  userPrompt: string,
  temperature = 0.4,
  jsonMode = false
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === "your_key_here") {
    throw new Error("API key missing. Add GROQ_API_KEY to the .env.local file.");
  }

  const body: Record<string, unknown> = {
    model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
    temperature,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
  };

  // ask for JSON output when the route needs it
  if (jsonMode) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (res.status === 401) throw new Error("Invalid API key.");
  if (res.status === 429) {
    throw new Error("Rate limit reached (free tier). Wait a minute and retry.");
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;

  if (typeof content !== "string" || content.length === 0) {
    throw new Error("Empty reply from the AI.");
  }
  return content;
}

// Converts an error into a short message for the user
export function errorMessage(err: unknown): string {
  const e = err as { message?: string };
  return e.message ?? "Something went wrong.";
}

// Pulls a JSON object out of the AI reply
export function extractJson<T>(text: string): T | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as T;
  } catch {
    return null;
  }
}
