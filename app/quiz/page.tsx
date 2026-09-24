"use client";

import { useState } from "react";
import { alphabet } from "../../data/alphabet";

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
    <main className="min-h-screen bg-yellow-50 p-4 sm:p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-orange-600 mb-1">Alphabet Quiz</h1>
      <p className="text-gray-500 mb-6">
        Score: {score.correct} / {score.total}
      </p>

      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-md border border-orange-100">
        <p className="text-sm text-gray-400 mb-2">How is this letter pronounced?</p>
        <p className="text-5xl text-orange-900 mb-6 text-center">{question.answer.kannada}</p>

        <div className="flex flex-col gap-3">
          {question.options.map((letter, i) => {
            const isCorrectAnswer = letter.transliteration === question.answer.transliteration;
            const isChosen = selected === letter.transliteration;

            let style = "border-orange-200 bg-white hover:bg-orange-50";
            if (selected) {
              if (isCorrectAnswer) style = "border-green-500 bg-green-50";
              else if (isChosen) style = "border-red-500 bg-red-50";
              else style = "border-orange-100 bg-white opacity-60";
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
          <button
            onClick={next}
            className="mt-6 w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 transition-colors"
          >
            Next →
          </button>
        )}
      </div>
    </main>
  );
}
