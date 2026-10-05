import { NextRequest, NextResponse } from "next/server";
import { askMistral, errorMessage, extractJson } from "@/lib/mistral";

// POST /api/generate  { topic, level, count }
export async function POST(req: NextRequest) {
  const { topic, level, count } = await req.json();
  const n = Math.min(Number(count) || 3, 5);

  const prompt = `Generate ${n} ${level} level interview questions on "${topic}" for an electronics engineer job. Reply ONLY with JSON: {"questions": ["q1", "q2"]}`;

  try {
    const reply = await askMistral(prompt, 0.8, true);
    const result = extractJson<{ questions: string[] }>(reply);

    if (!result || !Array.isArray(result.questions)) {
      return NextResponse.json(
        { error: "Could not read the AI reply, try again." },
        { status: 502 }
      );
    }
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 502 });
  }
}
