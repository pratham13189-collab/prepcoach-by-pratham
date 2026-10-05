import { NextRequest, NextResponse } from "next/server";
import { askMistral, errorMessage } from "@/lib/mistral";

// POST /api/explain  { concept }
export async function POST(req: NextRequest) {
  const { concept } = await req.json();

  if (!concept || !concept.trim()) {
    return NextResponse.json({ error: "Enter a concept first." }, { status: 400 });
  }

  const prompt = `Explain "${concept}" the way it should be answered in an interview. Give: a 2 line definition, a simple example, and 2 common follow-up questions.`;

  try {
    const explanation = await askMistral(prompt, 0.4);
    return NextResponse.json({ explanation });
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 502 });
  }
}
