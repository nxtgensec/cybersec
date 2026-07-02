import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "@/components/terminal/terminal";

export const Route = createFileRoute("/terminal")({
  head: () => ({
    meta: [
      { title: "Simulated Terminal — CyberSec" },
      { name: "description", content: "Full-screen simulated Kali-style terminal with virtual filesystem and command playground." },
    ],
  }),
  component: TerminalPage,
});

function TerminalPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4">
        <h1 className="font-display text-3xl font-bold">Simulated Terminal</h1>
        <p className="mt-1 text-sm text-muted-foreground">Practice safely. Type <span className="font-mono text-primary">help</span> to see supported commands.</p>
      </div>
      <div className="h-[70vh]">
        <Terminal className="h-full" />
      </div>
    </div>
  );
}
