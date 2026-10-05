import { NextRequest, NextResponse } from "next/server";
import { askMistral, errorMessage, extractJson } from "@/lib/mistral";
import { Feedback } from "@/lib/types";

// POST /api/evaluate  { question, reference, answer }
export async function POST(req: NextRequest) {
  const { question, reference, answer } = await req.json();

  if (!answer || !answer.trim()) {
    return NextResponse.json({ error: "Please type an answer first." }, { status: 400 });
  }

  const prompt = `You are coaching a student who is preparing for an electronics job interview.

Question: ${question}
Key points of a good answer: ${reference}
Student's answer: ${answer}

Give a score from 0 to 10 using this guide:
- 0-2: wrong or not related to the question
- 3-4: correct idea but very short or incomplete
- 5-6: correct, but several important points are missing
- 7-8: good answer, only small points missing
- 9-10: complete and clear answer
A short answer that is fully correct should get about 4 or 5, not lower.

Speak directly to the student using "you". Reply ONLY with JSON in this format:
{"score": <number 0-10>, "feedback": "<2-3 sentences: what you did well, then what was missing>", "missing": ["point 1", "point 2"], "tip": "<one tip telling the student how to improve this answer in a real interview>"}`;

  try {
    const reply = await askMistral(prompt, 0.2, true);
    const result = extractJson<Feedback>(reply);

    // if the model did not send proper json, show the raw text
    return NextResponse.json(
      result ?? { score: "-", feedback: reply, missing: [], tip: "" }
    );
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 502 });
  }
}
