import { createFileRoute } from "@tanstack/react-router";
import { glossary } from "@/content/glossary";
import { useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Glossary — CyberSec" },
      { name: "description", content: "A searchable cybersecurity dictionary — CVE, CVSS, SUID, SSRF, Meterpreter, Kerberoasting, and more." },
    ],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const [q, setQ] = useState("");
  const filtered = glossary.filter(
    (g) => !q || g.term.toLowerCase().includes(q.toLowerCase()) || g.full.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">Glossary</h1>
        <p className="mt-1 text-muted-foreground">Terms every ethical hacker should know.</p>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms…"
          className="w-full rounded-md border border-border bg-panel py-2 pl-10 pr-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <div className="space-y-3">
        {filtered.map((g) => (
          <div key={g.term} id={g.term} className="scroll-mt-20 rounded-lg border border-border bg-panel p-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="font-display text-lg font-semibold text-primary">{g.term}</h3>
              <span className="text-xs text-muted-foreground">{g.short}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{g.full}</p>
            {g.related && (
              <div className="mt-2 text-xs text-muted-foreground">Related: {g.related.join(", ")}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
