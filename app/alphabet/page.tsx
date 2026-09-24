"use client";

import { alphabet } from "../../data/alphabet";
import Accordion from "../components/Accordion";

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "kn-IN";
  window.speechSynthesis.speak(utterance);
}

export default function Alphabet() {
  return (
    <main className="min-h-screen bg-yellow-50 p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
        Kannada Alphabet
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Start here — learn to recognize the letters before moving to phrases.
      </p>

      <div className="max-w-4xl mx-auto space-y-4">
        <Accordion title="Vowels (ಸ್ವರಗಳು)" defaultOpen>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {alphabet
              .filter((a) => a.type === "vowel")
              .map((letter, i) => (
                <button
                  key={i}
                  onClick={() => speak(letter.kannada)}
                  className="bg-orange-50 hover:bg-orange-100 rounded-xl p-4 border border-orange-100 flex flex-col items-center gap-1 transition-colors"
                >
                  <span className="text-3xl text-orange-900">{letter.kannada}</span>
                  <span className="text-sm text-gray-500">{letter.transliteration}</span>
                </button>
              ))}
          </div>
        </Accordion>

        <Accordion title="Consonants (ವ್ಯಂಜನಗಳು)">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {alphabet
              .filter((a) => a.type === "consonant")
              .map((letter, i) => (
                <button
                  key={i}
                  onClick={() => speak(letter.kannada)}
                  className="bg-orange-50 hover:bg-orange-100 rounded-xl p-4 border border-orange-100 flex flex-col items-center gap-1 transition-colors"
                >
                  <span className="text-3xl text-orange-900">{letter.kannada}</span>
                  <span className="text-sm text-gray-500">{letter.transliteration}</span>
                </button>
              ))}
          </div>
        </Accordion>
      </div>
    </main>
  );
}
