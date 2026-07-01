import { useEffect, useState } from "react";

const KEY = "cybersec-progress-v1";

type ProgressState = {
  completedPages: string[];
  bookmarks: string[];
  recentlyViewed: string[];
  quizScores: Record<string, number>;
};

const empty: ProgressState = {
  completedPages: [],
  bookmarks: [],
  recentlyViewed: [],
  quizScores: {},
};

function read(): ProgressState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

function write(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("cybersec:progress"));
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(empty);
  useEffect(() => {
    setState(read());
    const h = () => setState(read());
    window.addEventListener("cybersec:progress", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("cybersec:progress", h);
      window.removeEventListener("storage", h);
    };
  }, []);

  const update = (fn: (s: ProgressState) => ProgressState) => {
    const next = fn(read());
    write(next);
    setState(next);
  };

  return {
    ...state,
    toggleComplete: (slug: string) =>
      update((s) => ({
        ...s,
        completedPages: s.completedPages.includes(slug)
          ? s.completedPages.filter((p) => p !== slug)
          : [...s.completedPages, slug],
      })),
    toggleBookmark: (slug: string) =>
      update((s) => ({
        ...s,
        bookmarks: s.bookmarks.includes(slug)
          ? s.bookmarks.filter((p) => p !== slug)
          : [...s.bookmarks, slug],
      })),
    recordView: (slug: string) =>
      update((s) => ({
        ...s,
        recentlyViewed: [slug, ...s.recentlyViewed.filter((x) => x !== slug)].slice(0, 10),
      })),
    setQuizScore: (slug: string, score: number) =>
      update((s) => ({ ...s, quizScores: { ...s.quizScores, [slug]: score } })),
    reset: () => update(() => empty),
  };
}
