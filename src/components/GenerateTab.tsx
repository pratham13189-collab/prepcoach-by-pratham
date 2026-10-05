"use client";

import { useState } from "react";
import { topics } from "@/lib/questions";

export default function GenerateTab() {
  const [topic, setTopic] = useState(topics[0]);
  const [level, setLevel] = useState("Beginner");
  const [count, setCount] = useState("3");
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, level, count }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) setError(data.error);
    else setQuestions(data.questions);
  };

  const selectStyle = "rounded border border-gray-400 p-2 text-sm";

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className={selectStyle}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectStyle}>
          <option>Beginner</option>
          <option>Intermediate</option>
        </select>
        <select value={count} onChange={(e) => setCount(e.target.value)} className={selectStyle}>
          <option>3</option>
          <option>5</option>
        </select>
        <button
          onClick={generate}
          disabled={loading}
          className="rounded bg-green-700 px-4 py-2 text-sm text-white disabled:bg-gray-400"
        >
          {loading ? "Please wait..." : "Generate"}
        </button>
      </div>

      <div className="rounded border bg-white p-4">
        {error && <p className="text-red-700">{error}</p>}
        {!error && questions.length === 0 && "Generated questions will appear here."}
        <ol className="list-decimal space-y-3 pl-5">
          {questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
