import { createFileRoute, notFound } from "@tanstack/react-router";
import { phases, tools } from "@/content";
import { CodeBlock } from "@/components/code-block";

export const Route = createFileRoute("/cheatsheets/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${params.slug} cheatsheet — CyberSec` }],
  }),
  loader: ({ params }) => {
    const item = phases.find((p) => p.slug === params.slug) || tools.find((t) => t.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  component: CheatsheetPage,
});

function CheatsheetPage() {
  const item = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-bold">{item.title} Cheatsheet</h1>
      <CodeBlock
        lang="bash"
        code={item.cheatsheet.map((c: { desc: string; cmd: string }) => `# ${c.desc}\n${c.cmd}`).join("\n\n")}
      />
    </div>
  );
}
