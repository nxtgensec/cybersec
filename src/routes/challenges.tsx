import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { quizzes } from "@/content/quizzes";
import { CheckCircle2, XCircle } from "lucide-react";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/challenges")({
  head: () => ({
    meta: [
      { title: "Challenges — CyberSec" },
      { name: "description", content: "Test your knowledge with per-phase quizzes and command-recall challenges." },
    ],
  }),
  component: Challenges,
});

function Challenges() {
  const [activeSet, setActiveSet] = useState(quizzes[0].slug);
  const set = quizzes.find((q) => q.slug === activeSet)!;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">Challenges</h1>
        <p className="mt-1 text-muted-foreground">One quiz per phase. Answers are stored locally with your progress.</p>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {quizzes.map((q) => (
          <button
            key={q.slug}
            onClick={() => setActiveSet(q.slug)}
            className={`rounded-md border px-3 py-1.5 text-xs transition ${
              activeSet === q.slug
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border bg-panel text-muted-foreground hover:border-primary/30"
            }`}
          >
            {q.title}
          </button>
        ))}
      </div>
      <Quiz key={set.slug} set={set} />
    </div>
  );
}

function Quiz({ set }: { set: (typeof quizzes)[number] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const { setQuizScore } = useProgress();

  const score = set.questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);

  return (
    <div className="space-y-4">
      {set.questions.map((q, i) => (
        <div key={i} className="rounded-lg border border-border bg-panel p-4">
          <div className="mb-3 font-semibold">{i + 1}. {q.q}</div>
          <div className="space-y-1.5">
            {q.choices.map((c, j) => {
              const chosen = answers[i] === j;
              const correct = submitted && j === q.answer;
              const wrong = submitted && chosen && j !== q.answer;
              return (
                <label
                  key={j}
                  className={`flex cursor-pointer items-center gap-2 rounded border p-2 text-sm ${
                    correct ? "border-primary/60 bg-primary/10" : wrong ? "border-danger/60 bg-danger/10" : chosen ? "border-primary/40 bg-primary/5" : "border-border"
                  }`}
                >
                  <input type="radio" name={`q-${i}`} className="accent-primary" checked={chosen} onChange={() => setAnswers((a) => ({ ...a, [i]: j }))} />
                  <span>{c}</span>
                  {correct && <CheckCircle2 className="ml-auto h-4 w-4 text-primary" />}
                  {wrong && <XCircle className="ml-auto h-4 w-4 text-danger" />}
                </label>
              );
            })}
          </div>
          {submitted && q.explain && <div className="mt-2 text-xs text-muted-foreground">{q.explain}</div>}
        </div>
      ))}
      {!submitted ? (
        <button
          onClick={() => { setSubmitted(true); setQuizScore(set.slug, score); }}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          disabled={Object.keys(answers).length !== set.questions.length}
        >
          Submit
        </button>
      ) : (
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-center">
          <div className="font-display text-2xl font-bold text-primary">{score} / {set.questions.length}</div>
          <div className="text-sm text-muted-foreground">Saved to your local progress.</div>
        </div>
      )}
    </div>
  );
}
