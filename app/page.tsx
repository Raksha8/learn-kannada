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
          className="bg-orange-50 hover:bg-orange-100 rounded-xl p-4 border border-orange-100 flex flex-col items-start gap-1 text-left transition-colors"
        >
          <p className="text-2xl text-orange-900">{phrase.kannada}</p>
          <p className="text-sm text-gray-500">{phrase.transliteration}</p>
          <p className="text-sm text-gray-500">{phrase.meaning}</p>
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
    <main className="min-h-screen bg-yellow-50 p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-orange-600 mb-1">
        ಕನ್ನಡ ಕಲಿಯಿರಿ
      </h1>
      <p className="text-center text-gray-400 text-sm mb-1">Kannaḍa Kaliyiri</p>
      <p className="text-center text-gray-500 mb-4">Learn Kannada</p>

      {streak > 0 && (
        <p className="text-center text-orange-600 font-medium mb-4">
          🔥 {streak} day streak
        </p>
      )}

      <button
        onClick={() => speak(word.kannada)}
        className="block mx-auto mb-8 bg-white rounded-2xl shadow p-5 border border-orange-200 text-center hover:bg-orange-50 transition-colors max-w-xs"
      >
        <p className="text-xs text-orange-400 uppercase tracking-wide mb-2">Word of the Day</p>
        <p className="text-3xl text-orange-900">{word.kannada}</p>
        <p className="text-sm text-gray-500 mt-1">{word.transliteration}</p>
        <p className="text-sm text-gray-500">{word.meaning}</p>
      </button>

      <div className="text-center mb-8 flex justify-center gap-3">
        <Link
          href="/alphabet"
          className="inline-block rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 transition-colors"
        >
          Learn the Alphabet →
        </Link>
        <Link
          href="/quiz"
          className="inline-block rounded-full border border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-2 transition-colors"
        >
          Alphabet Quiz →
        </Link>
        <Link
          href="/translate"
          className="inline-block rounded-full border border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-2 transition-colors"
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
