import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { linuxCategories, linuxCommands } from "@/content/linux";
import { Terminal } from "@/components/terminal/terminal";

export const Route = createFileRoute("/linux")({
  head: () => ({
    meta: [
      { title: "Linux Practice Center — CyberSec" },
      { name: "description", content: "Learn every essential Linux command a pentester uses — with a live simulated terminal to practice in." },
    ],
  }),
  component: LinuxPage,
});

function LinuxPage() {
  const [cat, setCat] = useState<string>(linuxCategories[0]);
  const filtered = linuxCommands.filter((c) => c.category === cat);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-primary">Foundations</div>
        <h1 className="mt-1 font-display text-4xl font-bold">Linux Practice Center</h1>
        <p className="mt-2 text-muted-foreground">Learn the commands, then try them in the simulated terminal.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {linuxCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-md border px-3 py-1.5 text-xs transition ${
                  cat === c
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border bg-panel text-muted-foreground hover:border-primary/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {filtered.map((c) => (
              <div key={c.cmd} id={c.cmd} className="scroll-mt-20 rounded-lg border border-border bg-panel p-3">
                <div className="font-mono text-sm text-primary">{c.cmd}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.desc}</div>
                {c.example && <div className="mt-1 font-mono text-xs text-foreground/70">$ {c.example}</div>}
                {c.output && <div className="mt-1 whitespace-pre-wrap font-mono text-xs text-terminal-foreground">{c.output}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:h-[70vh]">
          <Terminal className="h-full" />
        </div>
      </div>
    </div>
  );
}
