"use client";

import { punjabialphabet } from "../../../data/punjabi-alphabet";
import Accordion from "../../components/Accordion";
import Link from "next/link";

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;

  // Try Punjabi first, then Hindi, then English as fallback
  const voices = window.speechSynthesis.getVoices();
  const punjabiVoice = voices.find(v => v.lang.startsWith("pa"));
  const hindiVoice = voices.find(v => v.lang.startsWith("hi"));
  const englishVoice = voices.find(v => v.lang.startsWith("en"));

  if (punjabiVoice) {
    utterance.voice = punjabiVoice;
    utterance.lang = "pa-IN";
  } else if (hindiVoice) {
    utterance.voice = hindiVoice;
    utterance.lang = "hi-IN";
  } else if (englishVoice) {
    utterance.voice = englishVoice;
    utterance.lang = "en-US";
  }

  window.speechSynthesis.speak(utterance);
}

export default function PunjabiAlphabet() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/punjabi" className="inline-flex items-center gap-1 text-accent hover:text-accent-hover mb-4">
          ← Back
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center text-accent mb-2">
        Punjabi Alphabet
      </h1>
      <p className="text-center text-text-muted mb-8">
        Learn to recognize the Gurmukhi script letters
      </p>

      <div className="max-w-4xl mx-auto space-y-4">
        <Accordion title="Vowels (ਸ਼ਬਦ — Shabd)" defaultOpen>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {punjabialphabet
              .filter((a) => a.type === "vowel")
              .map((letter, i) => (
                <button
                  key={i}
                  onClick={() => speak(letter.gurmukhi)}
                  className="bg-surface-alt hover:opacity-80 rounded-xl p-4 border border-border-color flex flex-col items-center gap-1 transition-opacity"
                >
                  <span className="text-3xl text-foreground">{letter.gurmukhi}</span>
                  <span className="text-sm text-text-muted">{letter.transliteration}</span>
                </button>
              ))}
          </div>
        </Accordion>

        <Accordion title="Consonants (ਵਿਅੰਜਨ — Vyañjan)">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {punjabialphabet
              .filter((a) => a.type === "consonant")
              .map((letter, i) => (
                <button
                  key={i}
                  onClick={() => speak(letter.gurmukhi)}
                  className="bg-surface-alt hover:opacity-80 rounded-xl p-4 border border-border-color flex flex-col items-center gap-1 transition-opacity"
                >
                  <span className="text-3xl text-foreground">{letter.gurmukhi}</span>
                  <span className="text-sm text-text-muted">{letter.transliteration}</span>
                </button>
              ))}
          </div>
        </Accordion>
      </div>
    </main>
  );
}
