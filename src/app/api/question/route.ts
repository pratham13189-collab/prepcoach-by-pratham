import { NextRequest, NextResponse } from "next/server";
import { questionBank } from "@/lib/questions";

// GET /api/question?topic=Analog Electronics
export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic") ?? "All";

  const pool =
    topic === "All" ? Object.values(questionBank).flat() : questionBank[topic] ?? [];

  if (pool.length === 0) {
    return NextResponse.json({ error: "No questions for this topic" }, { status: 404 });
  }

  const q = pool[Math.floor(Math.random() * pool.length)];
  return NextResponse.json(q);
}
