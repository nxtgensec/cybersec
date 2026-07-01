import { createFileRoute, Link } from "@tanstack/react-router";
import { tools, upcomingTools } from "@/content";
import { Wrench, Clock } from "lucide-react";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Tool Library — CyberSec" },
      { name: "description", content: "Deep-dive guides for the essential ethical hacking tools: Nmap, Wireshark, Burp, Metasploit, and more." },
    ],
  }),
  component: ToolsIndex,
});

function ToolsIndex() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-primary">Reference</div>
        <h1 className="mt-1 font-display text-4xl font-bold">Tool Library</h1>
        <p className="mt-2 text-muted-foreground">Deep guides on the tools that matter — how they work, when to use them, and how not to.</p>
      </div>

      <h2 className="mb-3 font-display text-lg font-semibold">Featured</h2>
      <div className="mb-10 grid gap-3 md:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.slug}
            to="/tools/$slug"
            params={{ slug: t.slug }}
            className="rounded-lg border border-border bg-panel p-4 transition hover:border-primary/50"
          >
            <div className="mb-1 flex items-center gap-2 font-display text-lg font-semibold">
              <Wrench className="h-4 w-4 text-primary" /> {t.title}
            </div>
            <div className="text-sm text-muted-foreground">{t.tagline}</div>
            <div className="mt-2 text-xs text-muted-foreground">{t.difficulty} · {t.estimatedMinutes} min</div>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 font-display text-lg font-semibold">Coming soon</h2>
      <div className="flex flex-wrap gap-2">
        {upcomingTools.map((n) => (
          <span key={n} className="rounded-full border border-border bg-panel px-3 py-1 text-xs text-muted-foreground">
            <Clock className="mr-1 inline h-3 w-3" />{n}
          </span>
        ))}
      </div>
    </div>
  );
}
