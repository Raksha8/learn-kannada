"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kannada-streak";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

export function useStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = todayKey();
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { lastVisit: null, streak: 0 };

    if (data.lastVisit === today) {
      setStreak(data.streak);
      return;
    }

    const gap = data.lastVisit ? daysBetween(data.lastVisit, today) : null;
    const nextStreak = gap === 1 ? data.streak + 1 : 1;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ lastVisit: today, streak: nextStreak })
    );
    setStreak(nextStreak);
  }, []);

  return streak;
}
