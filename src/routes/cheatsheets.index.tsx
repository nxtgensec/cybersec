import { createFileRoute, Link } from "@tanstack/react-router";
import { phases, tools } from "@/content";
import { linuxCommands } from "@/content/linux";
import { CodeBlock } from "@/components/code-block";

export const Route = createFileRoute("/cheatsheets/")({
  head: () => ({
    meta: [
      { title: "Cheatsheets — CyberSec" },
      { name: "description", content: "Quick-reference cheatsheets for every phase and tool." },
    ],
  }),
  component: CheatsheetsIndex,
});

function CheatsheetsIndex() {
  const all = [
    ...phases.map((p) => ({ slug: p.slug, kind: "phases", title: `${p.title} cheatsheet`, count: p.cheatsheet.length })),
    ...tools.map((t) => ({ slug: t.slug, kind: "tools", title: `${t.title} cheatsheet`, count: t.cheatsheet.length })),
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">Cheatsheets</h1>
        <p className="mt-1 text-muted-foreground">Every phase and tool page has an inline cheatsheet. Also see the Linux command reference below.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {all.map((c) => (
          <Link
            key={`${c.kind}-${c.slug}`}
            to={c.kind === "phases" ? "/phases/$slug" : "/tools/$slug"}
            params={{ slug: c.slug }}
            hash="cheatsheet"
            className="rounded-lg border border-border bg-panel p-4 transition hover:border-primary/50"
          >
            <div className="font-semibold">{c.title}</div>
            <div className="text-xs text-muted-foreground">{c.count} entries</div>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 mb-3 font-display text-2xl font-semibold">Linux one-liners</h2>
      <CodeBlock
        lang="bash"
        code={linuxCommands.slice(0, 25).map((c) => `# ${c.desc}\n${c.example || c.cmd}`).join("\n\n")}
      />
    </div>
  );
}
