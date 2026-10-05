"use client";

import { useState } from "react";
import { topics } from "@/lib/questions";
import { Feedback, Question } from "@/lib/types";

export default function PracticeTab() {
  const [topic, setTopic] = useState("All");
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getQuestion = async () => {
    const res = await fetch(`/api/question?topic=${encodeURIComponent(topic)}`);
    const data = await res.json();
    setQuestion(data);
    setAnswer("");
    setFeedback(null);
    setError("");
  };

  const submitAnswer = async () => {
    if (!question) {
      setError("Get a question first.");
      return;
    }
    setLoading(true);
    setError("");
    setFeedback(null);

    const res = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: question.question,
        reference: question.reference,
        answer,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) setError(data.error);
    else setFeedback(data);
  };

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <label htmlFor="topic">Topic:</label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded border border-gray-400 p-2 text-sm"
        >
          <option>All</option>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <button onClick={getQuestion} className="rounded bg-green-700 px-4 py-2 text-sm text-white">
          New Question
        </button>
      </div>

      <div className="rounded border bg-white p-4">
        {question ? question.question : 'Click "New Question" to start.'}
      </div>

      <textarea
        rows={6}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="my-3 w-full rounded border border-gray-400 p-2 text-sm"
      />

      <button
        onClick={submitAnswer}
        disabled={loading}
        className="rounded bg-green-700 px-4 py-2 text-sm text-white disabled:bg-gray-400"
      >
        {loading ? "Please wait..." : "Get Feedback"}
      </button>

      {error && <p className="mt-3 text-red-700">{error}</p>}

      {feedback && (
        <div className="mt-3 rounded border bg-white p-4">
          <p className="text-2xl font-bold text-brand">Score: {feedback.score}/10</p>
          <p className="my-2">{feedback.feedback}</p>
          {feedback.missing?.length > 0 && (
            <>
              <p className="font-semibold">Points you missed:</p>
              <ul className="list-disc pl-6">
                {feedback.missing.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </>
          )}
          {feedback.tip && (
            <p className="mt-2">
              <span className="font-semibold">Tip:</span> {feedback.tip}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
