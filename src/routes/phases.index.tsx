import { createFileRoute, Link } from "@tanstack/react-router";
import { phases } from "@/content";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/phases/")({
  head: () => ({
    meta: [
      { title: "Ethical Hacking Phases — CyberSec" },
      { name: "description", content: "The six phases of ethical hacking: Reconnaissance, Scanning, Enumeration, Vulnerability Assessment, Exploitation, and Post-Exploitation." },
    ],
  }),
  component: PhasesIndex,
});

function PhasesIndex() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-primary">Curriculum</div>
        <h1 className="mt-1 font-display text-4xl font-bold">The Six Phases</h1>
        <p className="mt-2 text-muted-foreground">Every real engagement follows this arc. Master the flow, then master the depth.</p>
      </div>
      <div className="space-y-3">
        {phases.map((p, i) => (
          <Link
            key={p.slug}
            to="/phases/$slug"
            params={{ slug: p.slug }}
            className="group flex items-center gap-4 rounded-lg border border-border bg-panel p-5 transition hover:border-primary/50"
          >
            <div className="font-mono text-2xl font-bold text-primary/60">0{i + 1}</div>
            <div className="flex-1">
              <div className="font-display text-xl font-semibold">{p.title}</div>
              <div className="text-sm text-muted-foreground">{p.tagline}</div>
              <div className="mt-1 text-xs text-muted-foreground">{p.difficulty} · {p.estimatedMinutes} min</div>
            </div>
            <ArrowRight className="h-5 w-5 text-primary opacity-0 transition group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}
