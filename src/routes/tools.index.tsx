import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Compass, TerminalSquare, Wrench } from "lucide-react";
import { tools, upcomingTools } from "@/content";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Tool Library - CyberSec" },
      { name: "description", content: "Deep-dive guides for essential ethical hacking tools: Nmap, Wireshark, Burp, Metasploit, and more." },
    ],
  }),
  component: ToolsIndex,
});

const onThisPage = [
  { id: "featured", title: "Featured Tools" },
  { id: "workflow", title: "How To Study Tools" },
  { id: "coming-soon", title: "Coming Soon" },
];

function ToolsIndex() {
  return (
    <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,880px)_240px]">
      <aside className="hidden lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto border-r border-border pr-4">
          <div className="border-b border-border pb-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Compass className="h-4 w-4 text-primary" />
              Reference
            </div>
            <Link to="/tools" className="block rounded-md bg-primary/15 px-3 py-2 text-sm text-primary">Tool Library</Link>
            <Link to="/cheatsheets" className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">Cheatsheets</Link>
            <Link to="/glossary" className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">Glossary</Link>
          </div>

          <div className="py-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Wrench className="h-4 w-4 text-primary" />
              Tools
            </div>
            <nav className="space-y-1">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  to="/tools/$slug"
                  params={{ slug: tool.slug }}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  {tool.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      <article className="min-w-0">
        <div className="mb-10 border-b border-border pb-8">
          <div className="mb-3 text-xs uppercase tracking-widest text-primary">Reference / Tool Library</div>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">Tool Library</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            Deep guides on the tools that matter: what each tool does, where it fits in a professional workflow,
            the commands worth memorizing, and the mistakes to avoid.
          </p>
        </div>

        <section id="featured" className="mb-10 scroll-mt-20">
          <h2 className="mb-4 font-display text-3xl font-semibold">Featured Tools</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                to="/tools/$slug"
                params={{ slug: tool.slug }}
                className="rounded-md border border-border bg-panel p-4 transition hover:border-primary/50 hover:bg-muted/40"
              >
                <div className="mb-2 flex items-center gap-2 font-display text-lg font-semibold">
                  <Wrench className="h-4 w-4 text-primary" />
                  {tool.title}
                </div>
                <p className="min-h-12 text-sm leading-6 text-muted-foreground">{tool.tagline}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{tool.difficulty}</span>
                  <span>/</span>
                  <span>{tool.estimatedMinutes} min</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="workflow" className="mb-10 scroll-mt-20">
          <h2 className="mb-4 font-display text-3xl font-semibold">How To Study Tools</h2>
          <ol className="space-y-3">
            {[
              "Start with the purpose: know what problem the tool solves before memorizing flags.",
              "Learn the safe baseline command, then add one option at a time so output stays explainable.",
              "Read results like evidence: record target, command, output, and what decision the output supports.",
              "Practice in labs first. Do not run offensive tooling against systems you do not own or have permission to test.",
            ].map((step, index) => (
              <li key={step} className="flex gap-3 rounded-md border border-border bg-panel p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{index + 1}</span>
                <span className="text-sm leading-6">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="coming-soon" className="scroll-mt-20">
          <h2 className="mb-4 font-display text-3xl font-semibold">Coming Soon</h2>
          <div className="flex flex-wrap gap-2">
            {upcomingTools.map((name) => (
              <span key={name} className="rounded-full border border-border bg-panel px-3 py-1 text-xs text-muted-foreground">
                <TerminalSquare className="mr-1 inline h-3 w-3" />
                {name}
              </span>
            ))}
          </div>
        </section>
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-20 border-l border-border pl-6">
          <div className="mb-3 font-display text-sm font-semibold">On this page</div>
          <nav className="space-y-1">
            {onThisPage.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block border-l-2 border-transparent px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-foreground"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
