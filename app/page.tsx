"use client";

import Link from "next/link";
import { phrases } from "../data/phrases";
import Accordion from "./components/Accordion";
import { useStreak } from "./useStreak";

const categoryLabels: Record<string, string> = {
  greetings: "Greetings",
  pronouns: "Pronouns (I, You, He, She...)",
  numbers: "Numbers",
  food: "Food",
  directions: "Directions",
  questions: "Common Questions",
};

const categoryOrder = ["greetings", "pronouns", "numbers", "food", "directions", "questions"];

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "kn-IN";
  window.speechSynthesis.speak(utterance);
}

function PhraseGrid({ items }: { items: typeof phrases }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {items.map((phrase, i) => (
        <button
          key={i}
          onClick={() => speak(phrase.kannada)}
          className="bg-surface-alt hover:opacity-80 rounded-xl p-4 border border-border-color flex flex-col items-start gap-1 text-left transition-opacity"
        >
          <p className="text-2xl text-foreground">{phrase.kannada}</p>
          <p className="text-sm text-text-muted">{phrase.transliteration}</p>
          <p className="text-sm text-text-muted">{phrase.meaning}</p>
        </button>
      ))}
    </div>
  );
}

function wordOfTheDay() {
  const daysSinceEpoch = Math.floor(Date.now() / 86400000);
  return phrases[daysSinceEpoch % phrases.length];
}

export default function Home() {
  const streak = useStreak();
  const word = wordOfTheDay();

  return (
    <main className="min-h-screen bg-background p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-accent mb-1">
        ಕನ್ನಡ ಕಲಿಯಿರಿ
      </h1>
      <p className="text-center text-text-muted text-sm mb-1">Kannaḍa Kaliyiri</p>
      <p className="text-center text-text-muted mb-4">Learn Kannada</p>

      {streak > 0 && (
        <p className="text-center text-accent font-medium mb-4">
          🔥 {streak} day streak
        </p>
      )}

      <button
        onClick={() => speak(word.kannada)}
        className="w-full max-w-4xl mx-auto mb-6 flex items-center gap-4 bg-surface rounded-2xl shadow p-4 border border-border-color hover:bg-surface-alt transition-colors text-left"
      >
        <span className="text-xs font-semibold text-accent uppercase tracking-wide shrink-0">
          Word of<br />the Day
        </span>
        <span className="text-3xl text-foreground">{word.kannada}</span>
        <span className="text-sm text-text-muted">
          {word.transliteration}
          <br />
          {word.meaning}
        </span>
        <span className="ml-auto text-accent text-xl shrink-0">🔊</span>
      </button>

      <div className="max-w-4xl mx-auto mb-8 grid grid-cols-3 gap-2 sm:gap-3">
        <Link
          href="/alphabet"
          className="rounded-xl bg-accent hover:bg-accent-hover text-white text-sm sm:text-base px-3 py-3 text-center transition-colors"
        >
          Learn the Alphabet →
        </Link>
        <Link
          href="/quiz"
          className="rounded-xl border border-accent text-accent hover:bg-surface-alt text-sm sm:text-base px-3 py-3 text-center transition-colors"
        >
          Alphabet Quiz →
        </Link>
        <Link
          href="/translate"
          className="rounded-xl border border-accent text-accent hover:bg-surface-alt text-sm sm:text-base px-3 py-3 text-center transition-colors"
        >
          Translate →
        </Link>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {categoryOrder.map((category) => {
          const items = phrases.filter((p) => p.category === category);

          if (category === "numbers") {
            return (
              <Accordion key={category} title={categoryLabels[category]}>
                <div className="space-y-3">
                  {Array.from({ length: 10 }, (_, tens) => {
                    const start = tens * 10 + 1;
                    const end = start + 9;
                    const group = items.filter((p) => {
                      const n = Number(p.meaning);
                      return n >= start && n <= end;
                    });
                    return (
                      <Accordion key={start} title={`${start}–${end}`}>
                        <PhraseGrid items={group} />
                      </Accordion>
                    );
                  })}
                </div>
              </Accordion>
            );
          }

          return (
            <Accordion key={category} title={categoryLabels[category]}>
              <PhraseGrid items={items} />
            </Accordion>
          );
        })}
      </div>
    </main>
  );
}
