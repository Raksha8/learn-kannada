"use client";

import { useState } from "react";
import { alphabet } from "../../data/alphabet";
import BackLink from "../components/BackLink";

const STORAGE_KEY = "kannada-alphabet-quiz-stats";

type Stats = Record<string, { correct: number; wrong: number }>;

function loadStats(): Stats {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveStats(stats: Stats) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "kn-IN";
  window.speechSynthesis.speak(utterance);
}

function pickQuestion() {
  const answerIndex = Math.floor(Math.random() * alphabet.length);
  const answer = alphabet[answerIndex];

  const distractors = alphabet
    .filter((_, i) => i !== answerIndex)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = [answer, ...distractors].sort(() => Math.random() - 0.5);

  return { answer, options };
}

export default function Quiz() {
  const [question, setQuestion] = useState(pickQuestion);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  function handleAnswer(transliteration: string) {
    if (selected) return;
    setSelected(transliteration);
    speak(question.answer.kannada);

    const isCorrect = transliteration === question.answer.transliteration;
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));

    const stats = loadStats();
    const key = question.answer.kannada;
    const entry = stats[key] ?? { correct: 0, wrong: 0 };
    if (isCorrect) entry.correct += 1;
    else entry.wrong += 1;
    stats[key] = entry;
    saveStats(stats);
  }

  function next() {
    setQuestion(pickQuestion());
    setSelected(null);
  }

  return (
    <main className="min-h-screen bg-background p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-md">
        <BackLink />
      </div>
      <h1 className="text-3xl font-bold text-accent mb-1">Alphabet Quiz</h1>
      <p className="text-text-muted mb-6">
        Score: {score.correct} / {score.total}
      </p>

      <div className="bg-surface rounded-2xl shadow p-6 w-full max-w-md border border-border-color">
        <p className="text-sm text-text-muted mb-2">How is this letter pronounced?</p>
        <p className="text-5xl text-foreground mb-6 text-center">{question.answer.kannada}</p>

        <div className="flex flex-col gap-3">
          {question.options.map((letter, i) => {
            const isCorrectAnswer = letter.transliteration === question.answer.transliteration;
            const isChosen = selected === letter.transliteration;

            let style = "border-border-color bg-surface hover:bg-surface-alt";
            if (selected) {
              if (isCorrectAnswer) style = "border-green-500 bg-green-500/10";
              else if (isChosen) style = "border-red-500 bg-red-500/10";
              else style = "border-border-color bg-surface opacity-60";
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(letter.transliteration)}
                disabled={!!selected}
                className={`border rounded-xl px-4 py-3 text-left transition-colors ${style}`}
              >
                {letter.transliteration}
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => speak(question.answer.kannada)}
              className="rounded-full border border-accent text-accent hover:bg-surface-alt px-4 py-2.5 transition-colors"
            >
              🔊
            </button>
            <button
              onClick={next}
              className="flex-1 rounded-full bg-accent hover:bg-accent-hover text-white py-2.5 transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
