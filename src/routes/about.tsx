import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CyberSec" },
      { name: "description", content: "About CyberSec — a documentation-style ethical hacking learning hub." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-4xl font-bold">About CyberSec</h1>
      <p className="text-muted-foreground">
        CyberSec is a documentation-first learning hub for ethical hacking. It combines conceptual
        theory, real-world workflows, a simulated terminal, guided labs, and an AI assistant into a
        single, no-login site.
      </p>
      <p className="text-muted-foreground">
        Every page is directly accessible. Progress and bookmarks are stored locally in your browser.
        Nothing you do here leaves your machine — except the AI assistant, which sends your questions
        to a language model for streaming responses.
      </p>
      <div className="rounded-lg border border-warning/40 bg-warning/5 p-4 text-sm">
        <strong>Ethical use only.</strong> The techniques on this site are for defensive learning and
        authorized security testing. Unauthorized access to computer systems is a criminal offence in
        virtually every jurisdiction.
      </div>
      <div className="text-xs text-muted-foreground">v1.0.0</div>
    </div>
  );
}
