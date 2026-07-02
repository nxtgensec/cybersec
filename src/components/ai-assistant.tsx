import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const busy = status === "submitted" || status === "streaming";

  const submit = () => {
    if (!input.trim() || busy) return;
    sendMessage({ text: input.trim() });
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg glow-primary transition hover:scale-105"
        aria-label="Toggle AI Assistant"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 flex h-[560px] w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-border-strong bg-panel shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="flex-1">
              <div className="font-semibold">CyberSec AI Assistant</div>
              <div className="text-xs text-muted-foreground">Ethical hacking topics only</div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-auto p-4">
            {messages.length === 0 && (
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Ask me about:</p>
                <ul className="list-disc space-y-1 pl-5 text-xs">
                  <li>Explain an Nmap flag or output line</li>
                  <li>How does a specific CVE work?</li>
                  <li>Suggest a lab for privilege escalation</li>
                  <li>Generate a Bash reverse shell one-liner</li>
                </ul>
              </div>
            )}
            {messages.map((m) => {
              const text = (m.parts ?? []).map((p: any) => (p.type === "text" ? p.text : "")).join("");
              return (
                <div key={m.id} className={cn("rounded-lg p-3 text-sm", m.role === "user" ? "ml-6 bg-primary/10 border border-primary/20" : "mr-6 bg-card border border-border")}>
                  <div className="mb-1 text-xs font-semibold text-muted-foreground">
                    {m.role === "user" ? "You" : "Assistant"}
                  </div>
                  <Markdown>{text}</Markdown>
                </div>
              );
            })}
            {busy && <div className="mr-6 rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground">Thinking…</div>}
          </div>

          <div className="border-t border-border bg-card p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
                placeholder="Ask about ethical hacking…"
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                disabled={busy}
              />
              <button
                onClick={submit}
                disabled={busy || !input.trim()}
                className="rounded-md bg-primary px-3 text-primary-foreground disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
