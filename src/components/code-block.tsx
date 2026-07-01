import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  code,
  lang,
  caption,
  className,
}: {
  code: string;
  lang?: string;
  caption?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={cn("group my-4 overflow-hidden rounded-lg border border-border bg-terminal", className)}>
      <div className="flex items-center justify-between border-b border-border/60 bg-panel px-3 py-1.5 text-xs">
        <span className="font-mono text-muted-foreground">
          {lang || "bash"}
          {caption ? ` · ${caption}` : ""}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="flex items-center gap-1 rounded px-2 py-0.5 text-muted-foreground transition hover:bg-muted hover:text-primary"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-terminal-foreground">{code}</code>
      </pre>
    </div>
  );
}
