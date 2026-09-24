"use client";

import { phrases } from "../data/phrases";

const categoryLabels: Record<string, string> = {
  greetings: "Greetings",
  numbers: "Numbers",
  food: "Food",
  directions: "Directions",
  questions: "Common Questions",
};

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "kn-IN";
  window.speechSynthesis.speak(utterance);
}

export default function Home() {
  const categories = Array.from(new Set(phrases.map((p) => p.category)));

  return (
    <main className="min-h-screen bg-yellow-50 p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-orange-600 mb-2">
        ಕನ್ನಡ ಕಲಿಯಿರಿ
      </h1>
      <p className="text-center text-gray-500 mb-8">Learn Kannada</p>

      <div className="max-w-4xl mx-auto space-y-10">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="text-2xl font-semibold text-orange-700 mb-4 border-b border-orange-200 pb-1">
              {categoryLabels[category] ?? category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {phrases
                .filter((p) => p.category === category)
                .map((phrase, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow p-5 border border-orange-100 flex flex-col gap-1"
                  >
                    <p className="text-3xl text-orange-900">{phrase.kannada}</p>
                    <p className="text-sm text-gray-500">{phrase.transliteration}</p>
                    <p className="text-sm text-gray-500">{phrase.meaning}</p>
                    <button
                      onClick={() => speak(phrase.kannada)}
                      className="mt-3 self-start rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1.5 transition-colors"
                    >
                      🔊 Speak
                    </button>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
