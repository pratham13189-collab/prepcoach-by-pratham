"use client";

import { useState } from "react";

export default function ExplainTab() {
  const [concept, setConcept] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const explain = async () => {
    setLoading(true);
    setError("");
    setText("");

    const res = await fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ concept }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) setError(data.error);
    else setText(data.explanation);
  };

  return (
    <section>
      <div className="mb-3 flex gap-2">
        <input
          type="text"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="e.g. Schmitt trigger, DMA, PWM"
          className="flex-1 rounded border border-gray-400 p-2 text-sm"
        />
        <button
          onClick={explain}
          disabled={loading}
          className="rounded bg-green-700 px-4 py-2 text-sm text-white disabled:bg-gray-400"
        >
          {loading ? "Please wait..." : "Explain"}
        </button>
      </div>

      <div className="whitespace-pre-wrap rounded border bg-white p-4">
        {error ? <span className="text-red-700">{error}</span> : text || "The explanation will appear here."}
      </div>
    </section>
  );
}
