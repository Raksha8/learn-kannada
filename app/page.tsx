"use client";

import Link from "next/link";
import { phrases } from "../data/phrases";
import Accordion from "./components/Accordion";

const categoryLabels: Record<string, string> = {
  greetings: "Greetings",
  numbers: "Numbers",
  food: "Food",
  directions: "Directions",
  questions: "Common Questions",
};

const categoryOrder = ["greetings", "numbers", "food", "directions", "questions"];

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "kn-IN";
  window.speechSynthesis.speak(utterance);
}

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-50 p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-orange-600 mb-2">
        ಕನ್ನಡ ಕಲಿಯಿರಿ
      </h1>
      <p className="text-center text-gray-500 mb-4">Learn Kannada</p>
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
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {categoryOrder.map((category) => (
          <Accordion key={category} title={categoryLabels[category]}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {phrases
                .filter((p) => p.category === category)
                .map((phrase, i) => (
                  <div
                    key={i}
                    className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex flex-col gap-1"
                  >
                    <p className="text-2xl text-orange-900">{phrase.kannada}</p>
                    <p className="text-sm text-gray-500">{phrase.transliteration}</p>
                    <p className="text-sm text-gray-500">{phrase.meaning}</p>
                    <button
                      onClick={() => speak(phrase.kannada)}
                      className="mt-2 self-start rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1.5 transition-colors"
                    >
                      🔊 Speak
                    </button>
                  </div>
                ))}
            </div>
          </Accordion>
        ))}
      </div>
    </main>
  );
}
