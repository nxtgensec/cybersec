import { createFileRoute, notFound } from "@tanstack/react-router";
import { labs } from "@/content/labs";
import { CodeBlock } from "@/components/code-block";
import { Callout } from "@/components/callout";

export const Route = createFileRoute("/labs/$slug")({
  head: ({ params }) => {
    const lab = labs.find((l) => l.slug === params.slug);
    return {
      meta: [
        { title: `${lab?.title || "Lab"} — CyberSec` },
        { name: "description", content: lab?.objective || "" },
      ],
    };
  },
  loader: ({ params }) => {
    const lab = labs.find((l) => l.slug === params.slug);
    if (!lab) throw notFound();
    return lab;
  },
  component: LabPage,
});

function LabPage() {
  const lab = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-2 text-xs uppercase tracking-widest text-primary">{lab.category} · {lab.minutes} min</div>
      <h1 className="font-display text-4xl font-bold">{lab.title}</h1>
      <p className="mt-2 text-muted-foreground">{lab.objective}</p>

      <h2 className="mt-8 mb-2 font-display text-xl font-semibold">Requirements</h2>
      <ul className="ml-5 list-disc text-sm text-muted-foreground">
        {lab.requirements.map((r) => <li key={r}>{r}</li>)}
      </ul>

      <h2 className="mt-8 mb-2 font-display text-xl font-semibold">Steps</h2>
      <ol className="space-y-4">
        {lab.steps.map((s, i) => (
          <li key={i} className="rounded-lg border border-border bg-panel p-4">
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
              <div className="flex-1">
                <div className="text-sm">{s.instruction}</div>
                {s.command && <CodeBlock lang="bash" code={s.command} />}
                {s.expected && <div className="mt-2 rounded bg-terminal p-2 font-mono text-xs text-terminal-foreground">{s.expected}</div>}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <Callout type="tip" title="AI hints">
        Ask the AI Assistant (bottom right) any of these prompts if you get stuck:
        <ul className="mt-2 list-disc pl-5 text-xs">
          {lab.aiPrompts.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </Callout>

      <h2 className="mt-8 mb-2 font-display text-xl font-semibold">Solution Summary</h2>
      <p className="text-sm text-muted-foreground">{lab.solutionSummary}</p>
    </div>
  );
}
