"use client";

import { useMemo, useState } from "react";
import { phrases } from "../../data/phrases";

const STORAGE_KEY = "kannada-quiz-stats";

type Direction = "kn-to-en" | "en-to-kn";

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
  const direction: Direction = Math.random() < 0.5 ? "kn-to-en" : "en-to-kn";
  const answerIndex = Math.floor(Math.random() * phrases.length);
  const answer = phrases[answerIndex];

  const distractors = phrases
    .filter((_, i) => i !== answerIndex)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = [answer, ...distractors].sort(() => Math.random() - 0.5);

  return { direction, answer, options };
}

export default function Quiz() {
  const [question, setQuestion] = useState(pickQuestion);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const prompt = useMemo(
    () =>
      question.direction === "kn-to-en"
        ? question.answer.kannada
        : question.answer.meaning,
    [question]
  );

  function optionLabel(p: (typeof phrases)[number]) {
    return question.direction === "kn-to-en" ? p.meaning : p.kannada;
  }

  function handleAnswer(p: (typeof phrases)[number]) {
    if (selected) return;
    setSelected(optionLabel(p));

    const isCorrect = p.kannada === question.answer.kannada;
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
      <h1 className="text-3xl font-bold text-orange-600 mb-1">Quiz</h1>
      <p className="text-gray-500 mb-6">
        Score: {score.correct} / {score.total}
      </p>

      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-md border border-orange-100">
        <p className="text-sm text-gray-400 mb-2">
          {question.direction === "kn-to-en" ? "What does this mean?" : "Which is correct?"}
        </p>
        <p className="text-3xl text-orange-900 mb-6">{prompt}</p>

        <div className="flex flex-col gap-3">
          {question.options.map((p, i) => {
            const label = optionLabel(p);
            const isCorrectAnswer = p.kannada === question.answer.kannada;
            const isChosen = selected === label;

            let style = "border-orange-200 bg-white hover:bg-orange-50";
            if (selected) {
              if (isCorrectAnswer) style = "border-green-500 bg-green-50";
              else if (isChosen) style = "border-red-500 bg-red-50";
              else style = "border-orange-100 bg-white opacity-60";
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(p)}
                disabled={!!selected}
                className={`border rounded-xl px-4 py-3 text-left transition-colors ${style}`}
              >
                {label}
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
