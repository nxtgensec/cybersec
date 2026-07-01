import { createFileRoute, Link } from "@tanstack/react-router";
import { labs } from "@/content/labs";
import { Clock, Layers } from "lucide-react";

export const Route = createFileRoute("/labs/")({
  head: () => ({
    meta: [
      { title: "Labs — CyberSec" },
      { name: "description", content: "Guided ethical hacking labs — recon, scanning, enumeration, exploitation, and priv-esc walkthroughs." },
    ],
  }),
  component: LabsIndex,
});

function LabsIndex() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-primary">Practical</div>
        <h1 className="mt-1 font-display text-4xl font-bold">Labs</h1>
        <p className="mt-2 text-muted-foreground">Hands-on guided walkthroughs. Set up the requirements, follow the steps, learn the pattern.</p>
      </div>
      <div className="grid gap-3">
        {labs.map((l) => (
          <Link
            key={l.slug}
            to="/labs/$slug"
            params={{ slug: l.slug }}
            className="flex items-center gap-4 rounded-lg border border-border bg-panel p-5 transition hover:border-primary/50"
          >
            <Layers className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <div className="font-display text-lg font-semibold">{l.title}</div>
              <div className="text-sm text-muted-foreground">{l.objective}</div>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full border border-border px-2 py-0.5">{l.category}</span>
                <Clock className="h-3 w-3" /><span>{l.minutes} min</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
