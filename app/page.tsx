"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-accent mb-2">
        Learn Languages
      </h1>
      <p className="text-center text-text-muted mb-8 max-w-md">
        Choose a language to begin your learning journey
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <Link
          href="/kannada"
          className="bg-surface rounded-2xl shadow p-8 border border-border-color hover:bg-surface-alt transition-colors text-center"
        >
          <h2 className="text-3xl font-bold text-accent mb-2">ಕನ್ನಡ</h2>
          <p className="text-sm text-text-muted mb-1">Kannada</p>
          <p className="text-text-muted">South Indian language</p>
          <p className="text-accent font-semibold mt-4">Start Learning →</p>
        </Link>

        <Link
          href="/punjabi"
          className="bg-surface rounded-2xl shadow p-8 border border-border-color hover:bg-surface-alt transition-colors text-center"
        >
          <h2 className="text-3xl font-bold text-accent mb-2">ਪੰਜਾਬੀ</h2>
          <p className="text-sm text-text-muted mb-1">Punjabi</p>
          <p className="text-text-muted">North Indian language</p>
          <p className="text-accent font-semibold mt-4">Start Learning →</p>
        </Link>
      </div>
    </main>
  );
}
