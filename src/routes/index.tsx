import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Terminal, Wrench, Bot, ArrowRight, BookOpen, Zap, Search } from "lucide-react";
import { phases } from "@/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberSec — Learn Ethical Hacking Like a Professional" },
      { name: "description", content: "Theory + Practical + AI + Linux + Labs. Learn ethical hacking end-to-end in a documentation-style interactive hub. No login required." },
      { property: "og:title", content: "CyberSec — Ethical Hacking Learning Hub" },
      { property: "og:description", content: "Interactive terminal, six-phase curriculum, tool library, AI assistant." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative -mt-8 overflow-hidden rounded-2xl border border-border bg-panel px-6 py-20 md:px-12 md:py-28">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 scan-lines opacity-30" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
            <Shield className="h-3 w-3" /> Ethical hacking, taught the right way
          </div>
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
            Learn Ethical Hacking<br />
            <span className="text-primary text-glow">Like a Professional</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Theory + Practical + AI + Linux + Labs — an interactive documentation hub for the complete ethical hacking lifecycle.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/phases" className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground glow-primary transition hover:scale-[1.02]">
              Start Learning <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/labs" className="flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm transition hover:border-primary/50">
              <Zap className="h-4 w-4" /> Explore Labs
            </Link>
            <Link to="/linux" className="flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm transition hover:border-primary/50">
              <Terminal className="h-4 w-4" /> Practice Linux
            </Link>
            <Link to="/tools" className="flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm transition hover:border-primary/50">
              <Wrench className="h-4 w-4" /> Tool Library
            </Link>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section>
        <div className="mb-6 text-center">
          <div className="text-xs uppercase tracking-widest text-primary">The Journey</div>
          <h2 className="mt-1 font-display text-3xl font-bold">Ethical Hacking Roadmap</h2>
          <p className="mt-2 text-muted-foreground">Six phases, one attacker's mindset. Click any phase to dive in.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {phases.map((p, i) => (
            <Link
              key={p.slug}
              to="/phases/$slug"
              params={{ slug: p.slug }}
              className="group relative overflow-hidden rounded-xl border border-border bg-panel p-6 transition hover:border-primary/50 hover:bg-card"
            >
              <div className="absolute right-4 top-4 font-mono text-3xl font-bold text-primary/20 group-hover:text-primary/40">0{i + 1}</div>
              <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Phase {i + 1}</div>
              <h3 className="mb-2 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{p.difficulty}</span>
                <span>·</span>
                <span>{p.estimatedMinutes} min</span>
                <span>·</span>
                <span>{p.toolsUsed.length} tools</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mb-6 text-center">
          <div className="text-xs uppercase tracking-widest text-primary">Everything you need</div>
          <h2 className="mt-1 font-display text-3xl font-bold">Learning, All in One Place</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, title: "Documentation-first theory", body: "Structured pages for every phase, tool, and concept." },
            { icon: Terminal, title: "Simulated Kali terminal", body: "In-browser shell with virtual filesystem and command playground." },
            { icon: Bot, title: "AI Assistant", body: "Ask questions, get command explanations, request hints — instantly." },
            { icon: Search, title: "Instant search", body: "Cmd/Ctrl + K across phases, tools, commands, and glossary." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-panel p-5">
              <f.icon className="mb-3 h-6 w-6 text-primary" />
              <div className="mb-1 font-semibold">{f.title}</div>
              <div className="text-sm text-muted-foreground">{f.body}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
