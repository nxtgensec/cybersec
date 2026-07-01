import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, CheckCircle2, Circle, Clock, Wrench, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import type { LearningTopic } from "@/content/types";
import { CodeBlock } from "./code-block";
import { Callout } from "./callout";
import { Markdown } from "./markdown";
import { useProgress } from "@/lib/progress";

export function LearningPage({ topic }: { topic: LearningTopic }) {
  const { completedPages, bookmarks, toggleComplete, toggleBookmark, recordView } = useProgress();
  const done = completedPages.includes(topic.slug);
  const bm = bookmarks.includes(topic.slug);

  useEffect(() => { recordView(topic.slug); }, [topic.slug]);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero */}
      <div className="mb-8 border-b border-border pb-6">
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
          <span>{topic.kind === "phase" ? "Ethical Hacking Phase" : topic.kind === "tool" ? "Tool" : "Topic"}</span>
          <span>·</span>
          <span>{topic.difficulty}</span>
          <span>·</span>
          <Clock className="h-3 w-3" />
          <span>{topic.estimatedMinutes} min</span>
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight">{topic.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{topic.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
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
        <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
          {topic.objectives.map((o) => <li key={o}>{o}</li>)}
        </ul>
      </Section>

      <Section id="theory" title="Core Theory"><Markdown>{topic.theory}</Markdown></Section>

      <Section id="workflow" title="Step-by-Step Workflow">
        <ol className="space-y-2">
          {topic.workflow.map((w, i) => (
            <li key={i} className="flex gap-3 rounded-md border border-border bg-panel p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
              <span className="text-sm">{w}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="commands" title="Commands">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-panel"><tr>
              <th className="p-3 text-left font-semibold">Command</th>
              <th className="p-3 text-left font-semibold">Description</th>
            </tr></thead>
            <tbody>
              {topic.commands.map((c) => (
                <tr key={c.cmd} className="border-t border-border">
                  <td className="p-3 font-mono text-primary">{c.cmd}</td>
                  <td className="p-3 text-muted-foreground">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {topic.expectedOutput && (
        <Section id="output" title="Expected Output">
          <CodeBlock code={topic.expectedOutput.code} lang={topic.expectedOutput.lang} caption={topic.expectedOutput.caption} />
        </Section>
      )}

      <Section id="tools" title="Tools Used">
        <div className="flex flex-wrap gap-2">
          {topic.toolsUsed.map((t) => (
            <span key={t} className="rounded-full border border-border bg-panel px-3 py-1 text-xs font-mono text-muted-foreground">
              <Wrench className="mr-1 inline h-3 w-3" />{t}
            </span>
          ))}
        </div>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
          {topic.commonMistakes.map((m) => <li key={m}>{m}</li>)}
        </ul>
      </Section>

      <Section id="lab" title="Mini Lab">
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div className="mb-2 text-sm font-semibold text-primary">Objective</div>
          <p className="mb-4 text-sm">{topic.miniLab.objective}</p>
          <div className="mb-2 text-sm font-semibold text-primary">Steps</div>
          <ol className="mb-4 ml-5 list-decimal space-y-1 text-sm text-muted-foreground">
            {topic.miniLab.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          <div className="mb-1 text-sm font-semibold text-primary">Expected result</div>
          <p className="text-sm text-muted-foreground">{topic.miniLab.expected}</p>
        </div>
      </Section>

      <Section id="practice" title="Practice Questions">
        <ul className="ml-5 list-decimal space-y-1 text-muted-foreground">
          {topic.practiceQuestions.map((q) => <li key={q}>{q}</li>)}
        </ul>
      </Section>

      <Section id="interview" title="Interview Questions">
        <ul className="ml-5 list-decimal space-y-1 text-muted-foreground">
          {topic.interviewQuestions.map((q) => <li key={q}>{q}</li>)}
        </ul>
      </Section>

      <Section id="cheatsheet" title="Cheatsheet">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <tbody>
              {topic.cheatsheet.map((c) => (
                <tr key={c.cmd} className="border-t border-border first:border-0">
                  <td className="p-2 font-mono text-primary">{c.cmd}</td>
                  <td className="p-2 text-muted-foreground">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="references" title="References">
        <ul className="ml-5 list-disc space-y-1">
          {topic.references.map((r) => (
            <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">{r.label}</a></li>
          ))}
        </ul>
      </Section>

      <Section id="summary" title="Summary"><Markdown>{topic.summary}</Markdown></Section>

      {topic.callouts?.map((c, i) => (
        <Callout key={i} type={c.type} title={c.title} body={c.body} />
      ))}

      {topic.next && (
        <Link
          to={topic.next.kind === "phase" ? "/phases/$slug" : "/tools/$slug"}
          params={{ slug: topic.next.slug }}
          className="mt-8 flex items-center justify-between rounded-lg border border-border bg-panel p-4 transition hover:border-primary/50"
        >
          <div>
            <div className="text-xs uppercase text-muted-foreground">Next</div>
            <div className="font-semibold">{topic.next.title}</div>
          </div>
          <ChevronRight className="h-5 w-5 text-primary" />
        </Link>
      )}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-8 scroll-mt-20">
      <h2 className="mb-3 font-display text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
