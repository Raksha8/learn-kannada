"use client";

import { useState } from "react";
import Link from "next/link";

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "kn-IN";
  window.speechSynthesis.speak(utterance);
}

export default function Translate() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleTranslate() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResult(data.translated);
    } catch {
      setError("Translation failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-md">
        <Link href="/kannada" className="inline-flex items-center gap-1 text-accent hover:text-accent-hover mb-4">
          ← Back
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-accent mb-1">Translate</h1>
      <p className="text-text-muted mb-6 text-center">English → Kannada</p>

      <div className="bg-surface rounded-2xl shadow p-6 w-full max-w-md border border-border-color">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type an English sentence..."
          className="w-full bg-transparent border border-border-color rounded-xl p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          rows={3}
        />
        <button
          onClick={handleTranslate}
          disabled={loading || !input.trim()}
          className="mt-3 w-full rounded-full bg-accent hover:bg-accent-hover disabled:opacity-50 text-white py-2.5 transition-colors"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {result && (
          <div className="mt-5 bg-surface-alt rounded-xl p-4 border border-border-color">
            <p className="text-2xl text-foreground">{result}</p>
            <button
              onClick={() => speak(result)}
              className="mt-3 rounded-full bg-accent hover:bg-accent-hover text-white text-sm px-4 py-1.5 transition-colors"
            >
              🔊 Speak
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
