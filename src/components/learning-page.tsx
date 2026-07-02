import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  FileText,
  Layers,
  Wrench,
} from "lucide-react";
import { useEffect } from "react";
import { phases, tools } from "@/content";
import type { LearningTopic } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { Markdown } from "./markdown";

const pageSections = [
  { id: "overview", title: "Overview" },
  { id: "why", title: "Why It Matters" },
  { id: "scenario", title: "Real-World Scenario" },
  { id: "objectives", title: "Learning Objectives" },
  { id: "theory", title: "Core Theory" },
  { id: "workflow", title: "Step-by-Step Workflow" },
  { id: "commands", title: "Commands" },
  { id: "output", title: "Expected Output" },
  { id: "tools", title: "Tools Used" },
  { id: "mistakes", title: "Common Mistakes" },
  { id: "lab", title: "Mini Lab" },
  { id: "practice", title: "Practice Questions" },
  { id: "interview", title: "Interview Questions" },
  { id: "cheatsheet", title: "Cheatsheet" },
  { id: "references", title: "References" },
  { id: "summary", title: "Summary" },
];

export function LearningPage({ topic }: { topic: LearningTopic }) {
  const { completedPages, bookmarks, toggleComplete, toggleBookmark, recordView } = useProgress();
  const done = completedPages.includes(topic.slug);
  const bm = bookmarks.includes(topic.slug);
  const sections = pageSections.filter((section) => section.id !== "output" || topic.expectedOutput);

  useEffect(() => {
    recordView(topic.slug);
  }, [recordView, topic.slug]);

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,820px)_260px]">
      <aside className="hidden lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto border-r border-border pr-4">
          <DocsGroup title="Introduction" open>
            <DocsLink active={topic.slug === "reconnaissance"} to="/phases/$slug" slug="reconnaissance" label="Overview" />
            <DocsLink active={topic.slug === "scanning"} to="/phases/$slug" slug="scanning" label="Core Methodology" />
          </DocsGroup>

          <DocsGroup title="Ethical Hacking Phases" open icon={<Layers className="h-4 w-4" />}>
            {phases.map((phase) => (
              <DocsLink
                key={phase.slug}
                active={topic.slug === phase.slug}
                to="/phases/$slug"
                slug={phase.slug}
                label={phase.title}
              />
            ))}
          </DocsGroup>

          <DocsGroup title="Tool Library" open icon={<Wrench className="h-4 w-4" />}>
            {tools.map((tool) => (
              <DocsLink
                key={tool.slug}
                active={topic.slug === tool.slug}
                to="/tools/$slug"
                slug={tool.slug}
                label={tool.title}
              />
            ))}
          </DocsGroup>
        </div>
      </aside>

      <article className="min-w-0">
        <div className="mb-10 border-b border-border pb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <span>{topic.kind === "phase" ? "Ethical Hacking Phase" : topic.kind === "tool" ? "Tool Guide" : "Topic"}</span>
            <span className="text-muted-foreground">/</span>
            <span>{topic.difficulty}</span>
            <span className="text-muted-foreground">/</span>
            <Clock className="h-3 w-3" />
            <span>{topic.estimatedMinutes} min</span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">{topic.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{topic.tagline}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => toggleComplete(topic.slug)}
              className="flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 text-sm transition hover:border-primary/50"
            >
              {done ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Circle className="h-4 w-4" />}
              {done ? "Completed" : "Mark complete"}
            </button>
            <button
              onClick={() => toggleBookmark(topic.slug)}
              className="flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 text-sm transition hover:border-primary/50"
            >
              {bm ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              {bm ? "Bookmarked" : "Bookmark"}
            </button>
          </div>
        </div>

        <Section id="overview" title="Overview"><Markdown>{topic.overview}</Markdown></Section>
        <Section id="why" title="Why It Matters"><Markdown>{topic.whyItMatters}</Markdown></Section>
        <Section id="scenario" title="Real-World Scenario"><Markdown>{topic.realWorldScenario}</Markdown></Section>

        <Section id="objectives" title="Learning Objectives">
          <ul className="ml-5 list-disc space-y-2 text-muted-foreground">
            {topic.objectives.map((objective) => <li key={objective}>{objective}</li>)}
          </ul>
        </Section>

        <Section id="theory" title="Core Theory"><Markdown>{topic.theory}</Markdown></Section>

        <Section id="workflow" title="Step-by-Step Workflow">
          <ol className="space-y-3">
            {topic.workflow.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-md border border-border bg-panel p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{index + 1}</span>
                <span className="text-sm leading-6">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="commands" title="Commands">
          <CommandTable commands={topic.commands} />
        </Section>

        {topic.expectedOutput && (
          <Section id="output" title="Expected Output">
            <CodeBlock code={topic.expectedOutput.code} lang={topic.expectedOutput.lang} caption={topic.expectedOutput.caption} />
          </Section>
        )}

        <Section id="tools" title="Tools Used">
          <div className="flex flex-wrap gap-2">
            {topic.toolsUsed.map((tool) => (
              <span key={tool} className="rounded-full border border-border bg-panel px-3 py-1 text-xs font-mono text-muted-foreground">
                <Wrench className="mr-1 inline h-3 w-3" />{tool}
              </span>
            ))}
          </div>
        </Section>

        <Section id="mistakes" title="Common Mistakes">
          <ul className="ml-5 list-disc space-y-2 text-muted-foreground">
            {topic.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
          </ul>
        </Section>

        <Section id="lab" title="Mini Lab">
          <div className="rounded-md border border-primary/30 bg-primary/5 p-5">
            <div className="mb-2 text-sm font-semibold text-primary">Objective</div>
            <p className="mb-4 text-sm leading-6">{topic.miniLab.objective}</p>
            <div className="mb-2 text-sm font-semibold text-primary">Steps</div>
            <ol className="mb-4 ml-5 list-decimal space-y-2 text-sm text-muted-foreground">
              {topic.miniLab.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <div className="mb-1 text-sm font-semibold text-primary">Expected result</div>
            <p className="text-sm leading-6 text-muted-foreground">{topic.miniLab.expected}</p>
          </div>
        </Section>

        <Section id="practice" title="Practice Questions">
          <ul className="ml-5 list-decimal space-y-2 text-muted-foreground">
            {topic.practiceQuestions.map((question) => <li key={question}>{question}</li>)}
          </ul>
        </Section>

        <Section id="interview" title="Interview Questions">
          <ul className="ml-5 list-decimal space-y-2 text-muted-foreground">
            {topic.interviewQuestions.map((question) => <li key={question}>{question}</li>)}
          </ul>
        </Section>

        <Section id="cheatsheet" title="Cheatsheet">
          <CommandTable commands={topic.cheatsheet} compact />
        </Section>

        <Section id="references" title="References">
          <ul className="ml-5 list-disc space-y-2">
            {topic.references.map((reference) => (
              <li key={reference.url}>
                <a href={reference.url} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
                  {reference.label}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="summary" title="Summary"><Markdown>{topic.summary}</Markdown></Section>

        {topic.callouts?.map((callout) => (
          <Callout key={`${callout.type}-${callout.title ?? callout.body}`} type={callout.type} title={callout.title} body={callout.body} />
        ))}

        {topic.next && (
          <Link
            to={topic.next.kind === "phase" ? "/phases/$slug" : "/tools/$slug"}
            params={{ slug: topic.next.slug }}
            className="mt-8 flex items-center justify-between rounded-md border border-border bg-panel p-4 transition hover:border-primary/50"
          >
            <div>
              <div className="text-xs uppercase text-muted-foreground">Next</div>
              <div className="font-semibold">{topic.next.title}</div>
            </div>
            <ChevronRight className="h-5 w-5 text-primary" />
          </Link>
        )}
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-20 border-l border-border pl-6">
          <div className="mb-3 font-display text-sm font-semibold">On this page</div>
          <nav className="space-y-1">
            {sections.map((section) => (
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

function DocsGroup({ title, children, icon, open = false }: { title: string; children: React.ReactNode; icon?: React.ReactNode; open?: boolean }) {
  return (
    <div className="border-b border-border py-4 first:pt-0">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        {icon ?? <FileText className="h-4 w-4" />}
        <span>{title}</span>
        {open && <ChevronDown className="ml-auto h-4 w-4 text-primary" />}
      </div>
      <nav className="space-y-1">{children}</nav>
    </div>
  );
}

function DocsLink({ active, to, slug, label }: { active: boolean; to: "/phases/$slug" | "/tools/$slug"; slug: string; label: string }) {
  return (
    <Link
      to={to}
      params={{ slug }}
      className={`block rounded-md px-3 py-2 text-sm transition ${
        active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

function CommandTable({ commands, compact = false }: { commands: Array<{ cmd: string; desc: string }>; compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-terminal">
      <table className="w-full text-sm">
        {!compact && (
          <thead className="bg-panel">
            <tr>
              <th className="p-3 text-left font-semibold">Command</th>
              <th className="p-3 text-left font-semibold">Description</th>
            </tr>
          </thead>
        )}
        <tbody>
          {commands.map((command) => (
            <tr key={command.cmd} className="border-t border-border first:border-0">
              <td className="p-3 font-mono text-primary">{command.cmd}</td>
              <td className="p-3 text-muted-foreground">{command.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-20">
      <h2 className="mb-4 font-display text-3xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
