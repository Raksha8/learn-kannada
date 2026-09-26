"use client";

import Link from "next/link";
import { punjabiphrases } from "../../data/punjabi-phrases";
import Accordion from "../components/Accordion";
import { useStreak } from "../useStreak";

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
  utterance.lang = "pa-IN";
  window.speechSynthesis.speak(utterance);
}

function PhraseGrid({ items }: { items: typeof punjabiphrases }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {items.map((phrase, i) => (
        <button
          key={i}
          onClick={() => speak(phrase.gurmukhi)}
          className="bg-surface-alt hover:opacity-80 rounded-xl p-4 border border-border-color flex flex-col items-start gap-1 text-left transition-opacity"
        >
          <p className="text-2xl text-foreground">{phrase.gurmukhi}</p>
          <p className="text-sm text-text-muted">{phrase.transliteration}</p>
          <p className="text-sm text-text-muted">{phrase.meaning}</p>
        </button>
      ))}
    </div>
  );
}

export default function PunjabiHome() {
  const streak = useStreak();
  const daysSinceEpoch = Math.floor(Date.now() / 86400000);
  const word = punjabiphrases[daysSinceEpoch % punjabiphrases.length];

  return (
    <main className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-accent hover:text-accent-hover mb-4">
          ← Home
        </Link>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-accent mb-1">
        ਪੰਜਾਬੀ ਸਿੱਖੋ
      </h1>
      <p className="text-center text-text-muted text-sm mb-1">Learn Punjabi</p>
      <p className="text-center text-text-muted mb-4">(Beta - Alphabet & Phrases only)</p>

      <button
        onClick={() => speak(word.gurmukhi)}
        className="w-full max-w-4xl mx-auto mb-6 flex items-center gap-4 bg-surface rounded-2xl shadow p-4 border border-border-color hover:bg-surface-alt transition-colors text-left"
      >
        <span className="text-xs font-semibold text-accent uppercase tracking-wide shrink-0">
          Word of<br />the Day
        </span>
        <span className="text-3xl text-foreground">{word.gurmukhi}</span>
        <span className="text-sm text-text-muted">
          {word.transliteration}
          <br />
          {word.meaning}
        </span>
        <span className="ml-auto text-accent text-xl shrink-0">🔊</span>
      </button>

      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/punjabi/alphabet"
          className="block rounded-xl bg-accent hover:bg-accent-hover text-white text-sm sm:text-base px-3 py-3 text-center transition-colors w-full"
        >
          Learn the Alphabet →
        </Link>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {categoryOrder.map((category) => {
          const items = punjabiphrases.filter((p) => p.category === category);
          if (!items.length) return null;

          if (category === "numbers") {
            return (
              <Accordion key={category} title={categoryLabels[category]}>
                <PhraseGrid items={items} />
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
