"use client";

import { alphabet } from "../../data/alphabet";
import Accordion from "../components/Accordion";
import BackLink from "../components/BackLink";

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "kn-IN";
  window.speechSynthesis.speak(utterance);
}

export default function Alphabet() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <BackLink />
      </div>
      <h1 className="text-3xl font-bold text-center text-accent mb-2">
        Kannada Alphabet
      </h1>
      <p className="text-center text-text-muted mb-8">
        Start here — learn to recognize the letters before moving to phrases.
      </p>

      <div className="max-w-4xl mx-auto space-y-4">
        <Accordion title="Vowels (ಸ್ವರಗಳು — Svaragaḻu)" defaultOpen>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {alphabet
              .filter((a) => a.type === "vowel")
              .map((letter, i) => (
                <button
                  key={i}
                  onClick={() => speak(letter.kannada)}
                  className="bg-surface-alt hover:opacity-80 rounded-xl p-4 border border-border-color flex flex-col items-center gap-1 transition-opacity"
                >
                  <span className="text-3xl text-foreground">{letter.kannada}</span>
                  <span className="text-sm text-text-muted">{letter.transliteration}</span>
                </button>
              ))}
          </div>
        </Accordion>

        <Accordion title="Consonants (ವ್ಯಂಜನಗಳು — Vyañjanagaḻu)">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {alphabet
              .filter((a) => a.type === "consonant")
              .map((letter, i) => (
                <button
                  key={i}
                  onClick={() => speak(letter.kannada)}
                  className="bg-surface-alt hover:opacity-80 rounded-xl p-4 border border-border-color flex flex-col items-center gap-1 transition-opacity"
                >
                  <span className="text-3xl text-foreground">{letter.kannada}</span>
                  <span className="text-sm text-text-muted">{letter.transliteration}</span>
                </button>
              ))}
          </div>
        </Accordion>
      </div>
    </main>
  );
}
