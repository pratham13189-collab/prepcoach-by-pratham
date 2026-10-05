"use client";

import { useState } from "react";
import PracticeTab from "@/components/PracticeTab";
import GenerateTab from "@/components/GenerateTab";
import ExplainTab from "@/components/ExplainTab";

const tabs = ["Practice", "Generate Questions", "Explain Concept"];

export default function Home() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen">
      <header className="bg-brand py-5 text-center text-white">
        <h1 className="text-3xl font-bold">Prepcoach by PRATHAM</h1>
        <p className="mt-1 text-sm opacity-80">Interview preparation for electronics jobs</p>
      </header>

      <nav className="my-4 flex flex-wrap justify-center gap-2">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`rounded border border-brand px-4 py-2 text-sm ${
              active === i ? "bg-brand text-white" : "bg-white text-brand"
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="mx-auto max-w-3xl px-4">
        {active === 0 && <PracticeTab />}
        {active === 1 && <GenerateTab />}
        {active === 2 && <ExplainTab />}
      </main>

      <footer className="my-8 text-center text-xs text-gray-500">
           Pratham&apos;s Project | Electronics &amp; Communication Engineering
      </footer>
    </div>
  );
}
