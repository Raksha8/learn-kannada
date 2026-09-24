"use client";

import { useState } from "react";
import BackLink from "../components/BackLink";

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
    <main className="min-h-screen bg-yellow-50 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-md">
        <BackLink />
      </div>
      <h1 className="text-3xl font-bold text-orange-600 mb-1">Translate</h1>
      <p className="text-gray-500 mb-6 text-center">English → Kannada</p>

      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-md border border-orange-100">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type an English sentence..."
          className="w-full border border-orange-200 rounded-xl p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
          rows={3}
        />
        <button
          onClick={handleTranslate}
          disabled={loading || !input.trim()}
          className="mt-3 w-full rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-2.5 transition-colors"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {result && (
          <div className="mt-5 bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-2xl text-orange-900">{result}</p>
            <button
              onClick={() => speak(result)}
              className="mt-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1.5 transition-colors"
            >
              🔊 Speak
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
